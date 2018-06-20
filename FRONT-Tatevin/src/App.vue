<template>
  <div id="app">
      <b-container fluid class="main">
      <TimIsHappy />
      <b-row no-gutters>
             <MenuLeft />
            <main>
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

export default {
  components:{TimIsHappy, MenuLeft},
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
