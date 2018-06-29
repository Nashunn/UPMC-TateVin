<template>
  <div class="hello">
      <h2>Liste de souhait</h2>
      <p>To do</p>
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

      })
    },
    methods:{
      test() {
        EventBusModal.$emit("loading", true);
      }
    }
  }
</script>
