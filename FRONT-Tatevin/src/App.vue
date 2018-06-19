<template>
  <div id="app">
      <b-container fluid>
      <Header />
      <b-row>
         <b-col xl="1">
             <MenuLeft />
        </b-col>
        <b-col xl="11">
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

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  text-align: center;
  margin-top: 40px;
}

header {
  margin: 0;
  height: 56px;
  padding: 0 16px 0 24px;
  background-color: #35495E;
  color: #ffffff;
}

header span {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: .02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
}
</style>
