<template>
    <li :class="className" v-bind:style="getSize">
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
  },
  computed:{
      getSize:function(){
          var size=screen.height/10;
          return {"height":size+"px", "width":size+"px", "margin":size*0.1}
      }
  }
}

</script>
