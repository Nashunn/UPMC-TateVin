<template>
  <div class="hello">
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
