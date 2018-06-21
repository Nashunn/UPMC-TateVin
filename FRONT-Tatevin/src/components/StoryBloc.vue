<template>
  <div class="hello">
        <p>Coucou <router-link :to="{ name: 'Story', params: { id:id} }">{{ title }}  {{ id }}</router-link></p>
  </div>
</template>

<script>
  import { EventBusModal } from "./../events/";

  export default {
    name: 'hello',
    data () {
      return {
      }
    },
    props:{
        title:{type:String},
        id:{type:String}
    },
    mounted(){
      EventBusModal.$on('loading', loading => {
        alert("coucou")
      })
    },
    methods:{
      test() {
        EventBusModal.$emit("loading", true);
      }
    }
  }
</script>
