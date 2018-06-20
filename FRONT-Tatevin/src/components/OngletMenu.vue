<template>
    <li :class="className" v-bind:style="getSize" class="redGradient">
        <a :href="link">{{ textOnglet }}</a>
    </li>
</template>
<script>
export default {
  name: 'ongletMenu',
  props:{
      className:{type:String},
      link:{type:String},
      textOnglet:{type:String},
      numCol:{type:Number}
  },
  computed:{
      getSize:function(){
          var size=window.innerHeight/10*this.numCol;
          return {"margin":"5px "+size*0.05+"px", "height":size+"px", "width":size+"px"}
      }
  }
}

</script>
