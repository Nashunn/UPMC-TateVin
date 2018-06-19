<template>
  <div class="hello">
    <input type="file" accept="image/*" capture @change="setImg"/>
    <h1 v-if="msg !== 'None' "> CODE BARRE : <span style="color:deepskyblue">{{ msg }} </span> </h1>
  </div>
</template>

<script>
  import Quagga from 'quagga';

  export default {
    data() {
      return {
        src: "",
        msg: "None"
      }
    },
    methods: {
      setImg(ev) {
        const file = ev.target.files[0];
        const reader = new FileReader();
        reader.onload = e => this.$emit("load", e.target.result);
        this.src = URL.createObjectURL(file)
        this.checkBarCode(ev)
      },
      checkBarCode(ev) {
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
        }, (result) => {
          if (result.codeResult) {
            console.log("result", result.codeResult.code);
            this.msg = result.codeResult.code
          } else {
            console.log("not detected");
          }
        });
      }
    }
  }
</script>
