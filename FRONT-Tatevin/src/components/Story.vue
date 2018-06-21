<template>
  <div class="hello">
        <p>Ma story !</p>
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
        title:{type:String}
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
