<template>
  <div class="hello">
    <input type="file" accept="image/*" capture @change="setImg"/>
    <p v-if="msg !== 'None' "> CODE BARRE : <span style="color:deepskyblue">{{ msg }} </span> </p>
    <div v-if="wineFound">
        <p>Ce code barre est connu de la base</p>
        <WineBloc  :wineObP="wine"  :wineStory="wineStory" value="+" v-on:addWine="$emit('addWine', $event)"/>
    </div>
    <p v-if="src!=='' && !wineFound">Ce code barre est inconnu, souhaitez vous <router-link :to="{ name: 'Search', params: {} }">rechercher le vin par son nom ?</router-link></p>
    <div class="btn-wrapper " v-if="msg !== 'None' && addToWine && !wineFound">
         <b-button v-on:click="sendBarCode">Enregistrer le codebar</b-button>
    </div>
  </div>
</template>

<script>
  import Quagga from 'quagga';
 import {EventBusModal} from "../../events/"
 import {HTTP} from "./../../HTTP/http";
 import WineBloc from "./../WineBloc";
  export default {
      name:"BarcodeScan",
      components:{WineBloc},
      props:{
          addToWine:{type:Boolean, default:true},
          wineStory:{type:Boolean, default:false},
      },
    data() {
      return {
        src: "",
        msg: "None",
        wine:{},
        wineFound:false
      }
  },
  created(){
      EventBusModal.$on("addBarCode", isOver=>{
          if(!isOver){
              this.src="";
              this.msg="None";
              this.wine={};
              this.wineFound=false;
              ev.target.files[0]=null;
          }
      });
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

            this.msg = result.codeResult.code
            HTTP.get("/wineBarCode",{params:{barCode:result.codeResult.code}} ).then(response=>{

                this.wine=response.data;
                if(response.data!==null) this.wineFound=true;
            })
          } else {
            this.msg="not detected";
          }
        });
        },sendBarCode(){
            EventBusModal.$emit("newBarCode", this.msg);
        }
    }
  }
</script>
