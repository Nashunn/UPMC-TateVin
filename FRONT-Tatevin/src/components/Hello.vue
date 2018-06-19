<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div id="scanner-container"></div>
    <input @click="startScanner" type="button" id="btn" value="Start/Stop the scanner"/>
    <input type="file" accept="image/*" capture @change="setImg"/>

  </div>
</template>

<script>
  import Quagga from 'quagga'; // ES6

  export default {
    name: 'hello',
    data() {
      return {
        msg: 'Hello Laura :) !!!',
        src: "",
      }
    },
    methods: {
      setImg(ev){
        const file = ev.target.files[0];
        const reader = new FileReader();

        reader.onload = e => this.$emit("load", e.target.result);
        var r = URL.createObjectURL(file)
        this.src= r;
        console.log(r);
        this.checkBarCode(ev)
      },
      checkBarCode(ev) {
        console.log(this.src);
        Quagga.decodeSingle({
        src: this.src,

        inputStream: {
          size: 800
        },
        patchSize: "medium",
        numOfWorkers: 8,  // Needs to be 0 when used within node
        decoder: {
          readers: [
            {
              format: "ean_reader",
              config: {}
            },
          ],
        },
        state: {
          inputStream: {
            size: 800,
            singleChannel: false
          },
          locator: {
            patchSize: "medium",
            halfSample: true
          },
          decoder: {
            readers: [{
              format: "ean_reader",
              config: {}
            }]
          },
          locate: true,
        }
      }, function (result) {
          alert('?')
        if (result.codeResult) {
          console.log("result", result.codeResult.code);
          alert(result.codeResult.code);
        } else {
          console.log("not detected");
        }
      });
    },
    startScanner() {
      alert("ok")
      Quagga.init({
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: document.querySelector('#scanner-container'),
          constraints: {
            width: 480,
            height: 320,
            facingMode: "environment"
          },
        },
        decoder: {
          readers: [
            "code_128_reader",
            "ean_reader",
            "ean_8_reader",
            "code_39_reader",
            "code_39_vin_reader",
            "codabar_reader",
            "upc_reader",
            "upc_e_reader",
            "i2of5_reader"
          ],
          debug: {
            showCanvas: true,
            showPatches: true,
            showFoundPatches: true,
            showSkeleton: true,
            showLabels: true,
            showPatchLabels: true,
            showRemainingPatchLabels: true,
            boxFromPatches: {
              showTransformed: true,
              showTransformedBox: true,
              showBB: true
            }
          }
        },

      }, function (err) {
        if (err) {
          console.log(err);
          return
        }

        console.log("Initialization finished. Ready to start");
        Quagga.start();

        // Set flag to is running
        _scannerIsRunning = true;
      });

      Quagga.onProcessed(function (result) {
        var drawingCtx = Quagga.canvas.ctx.overlay,
          drawingCanvas = Quagga.canvas.dom.overlay;

        if (result) {
          if (result.boxes) {
            drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
            result.boxes.filter(function (box) {
              return box !== result.box;
            }).forEach(function (box) {
              Quagga.ImageDebug.drawPath(box, {x: 0, y: 1}, drawingCtx, {color: "green", lineWidth: 2});
            });
          }

          if (result.box) {
            Quagga.ImageDebug.drawPath(result.box, {x: 0, y: 1}, drawingCtx, {color: "#00F", lineWidth: 2});
          }

          if (result.codeResult && result.codeResult.code) {
            Quagga.ImageDebug.drawPath(result.line, {x: 'x', y: 'y'}, drawingCtx, {color: 'red', lineWidth: 3});
          }
        }
      });


      Quagga.onDetected(function (result) {
        console.log("Barcode detected and processed : [" + result.codeResult.code + "]", result);
      });
    }
  }
  }
</script>
