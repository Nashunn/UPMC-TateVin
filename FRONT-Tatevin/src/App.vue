<template>
  <div id="app">
      <b-container fluid class="main">
      <Header />
      <b-row no-gutters>
         <b-col cols="1">
             <MenuLeft />
        </b-col>
        <b-col cols="11">
            <main>
              <img src="./assets/logo.png" alt="Vue.js PWA">
              <router-view></router-view>
            </main>
        </b-col>
    </b-row>
</b-container>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Header from './components/Header.vue'
import MenuLeft from './components/MenuLeft.vue'

export default {
  components:{Header, MenuLeft},
  name: 'app'
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
