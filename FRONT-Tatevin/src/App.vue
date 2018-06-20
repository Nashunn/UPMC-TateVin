<template>
  <div id="app">
      <b-container fluid class="main">
      <TimIsHappy />
      <b-row no-gutters>
        <MenuLeft />
        <main>
          <wine-popup v-show="showWinePopup"></wine-popup>
          <router-view></router-view>
        </main>
      </b-row>
    </b-container>
  </div>
</template>

<script>
  import 'bootstrap/dist/css/bootstrap.css'
  import 'bootstrap-vue/dist/bootstrap-vue.css'
  import TimIsHappy from './components/TimIsHappy.vue'
  import MenuLeft from './components/MenuLeft.vue'
  import WinePopup from "./components/Popup/Wine";
  import { EventBusModal } from "./events/";


  export default {
    components:{TimIsHappy, MenuLeft, WinePopup},
    name: 'app',
    data() {
      return {
        showWinePopup: true,
      }
    },
    mounted() {
      EventBusModal.$on("winePopup", showModal => {
        this.showWinePopup = showModal;
      });
    }
  }
</script>

<style>
  body {
    margin: 0;
  }
  .main{
    padding:0;
  }
</style>
