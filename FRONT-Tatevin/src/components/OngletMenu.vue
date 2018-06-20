<template>
    <li :class="className" v-bind:style="style" class="redGradient" >
        <router-link :to="{name:link}">{{ textOnglet }}</router-link>
    </li>
</template>
<script>
export default {
  name: 'ongletMenu',
  data(){
      return{ style:{} };
  },
  props:{
      className:{type:String},
      link:{type:String},
      textOnglet:{type:String},
      numCol:{type:Number}
  },
  methods:{
      getSize:function(){
          var size=window.innerHeight/10*this.numCol;
          console.log(size);
          this.style={"margin":"5px "+size*0.05+"px", "height":size+"px", "width":size+"px"};
          //return this.style;
      }
  },
  created(){
      this.getSize();
      var ob=this;
      window.addEventListener('resize', ()=>{
          this.getSize();
      });
  },
beforeDestroy: function () {
  window.removeEventListener('resize',this.getSize())
}
}

</script>
