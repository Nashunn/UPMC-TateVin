<template>
    <div>
    <span class="note" v-for="n in 4" >
        {{ n }}
        <svg x="0px" y="0px"
      	 viewBox="0 0 21 21" style="enable-background:new 0 0 21 21;" width="19" height="20" >
      <polygon class="st0" points="1,0.9 7.2,16.4 9.4,16.4 9.4,20.4 5.4,20.4 5.4,21 9.4,21 11.4,21 15,21 15,20.4 11.4,20.4 11.4,16.4
      	13.5,16.4 19.7,0.9 19.7,0.9 "/>
      </svg>
  </span>
</div>
</template>

<script>
  export default {
    name: 'glass',
    props:{
        note:{type:Number}
    },
    data () {
      return {
          max:5
      }
    },
    mounted(){

    },
    methods:{

    }
  }
</script>
