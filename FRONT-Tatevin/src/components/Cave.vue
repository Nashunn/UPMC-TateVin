<template>
  <div class="cave">
      <h2>Votre cave</h2>
      <WineBloc v-for="(wine,index) in wines" :key="index" :wine="wine"  />
  </div>
</template>

<script>
  import { EventBusModal } from "./../events/";
 import {HTTP} from "./../HTTP/http";
 import store from "./../store";
  import WineBloc from "./WineBloc"

  export default {
    name: 'cave',
    components:{WineBloc},
    data () {
      return {
          wines:[]
      }
    },
    created(){
        if(store.state.usr.username){
            console.log("CAVE",store.state.usr.cave);
            HTTP.get('wineList/'+store.state.usr.cave).then(response=>{
                this.wines=response.data.wines;
                console.log(this.wines);
                EventBusModal.$emit("loading", false);
            })
        }else{

        }

    },
    methods:{
      test() {
        EventBusModal.$emit("loading", true);
      }
    }
  }
</script>
