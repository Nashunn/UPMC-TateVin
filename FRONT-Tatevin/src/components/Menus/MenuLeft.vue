<template>
    <div id="menuLeft" :class="[getNumCol, isOpen ? 'open': 'notOpen']" v-on:click="openClose">
    <!--<div id="menuLeft" :class="[getNumCol]" v-on:click="openClose" :style="getMarginLeft">-->
        <nav class="redGradient" >
            <ul>
                <OngletMenu className="wineMenu" link="WinesPage" textOnglet="Vins" :numCol="numCol" />
                <OngletMenu className="wineStoryMenu" link="WineStories" textOnglet="Le Comptoir" :numCol="numCol"/>
                <OngletMenu className="learningMenu" link="Learning" textOnglet="Apprendre le vin" :numCol="numCol" />
                <OngletMenu className="dictionnaryMenu" link="Dictionnary" textOnglet="Lexique" :numCol="numCol"/>
                <OngletMenu className="searchMenu" link="Search" textOnglet="Rechercher un vin" :numCol="numCol"/>
                <OngletMenu className="userPageMenu" link="UserAccount" textOnglet="Mon profil" :numCol="numCol"/>
                <OngletMenu className="caveMenu" link="Cave" textOnglet="Ma cave" :numCol="numCol"/>
                <OngletMenu className="wishesMenu" link="Wishes" textOnglet="Ma liste de souhait" :numCol="numCol" />
            </ul>
        </nav>
        <div>
            <svg height="60" width="30">
             <path d="M0 0 L30 30 L0 60 Z" fill="rgb(128,0,43)"/>
            </svg>
        </div>
    </div>
</template>
<script>
import OngletMenu from './OngletMenu.vue';
export default {
    components:{OngletMenu},
    data:function(){
            return {
                numCol:1,
                isOpen:false
            }
    },
  name: 'menuLeft',
  computed:{
      getNumCol:function(){
          this.numColMethod();
          return "numCol"+this.numCol;
      },

  },
  methods:{
      openClose:function(){
          this.isOpen=!this.isOpen;
      },
      numColMethod:function(){
          this.numCol= window.innerHeight/10<100 ? 2:1;
      }
  },created(){
      var ob=this;
      window.addEventListener('resize', ()=>{
          this.numColMethod();
      });
  }
}

</script>
