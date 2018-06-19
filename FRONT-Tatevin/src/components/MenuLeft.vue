<template>

        <nav class="menuLeft redGradient" :class="getNumCol">
            <ul>
                <OngletMenu className="wineMenu" link="/vins" textOnglet="Vins" :numCol="numCol" />
                <OngletMenu className="wineStoryMenu" link="/comptoir" textOnglet="Le Comptoir (Histoires de vins)" :numCol="numCol"/>
                <OngletMenu className="learningMenu" link="/apprendre" textOnglet="Apprendre le vin" :numCol="numCol" />
                <OngletMenu className="dictionnaryMenu" link="/lexique" textOnglet="Lexique" :numCol="numCol"/>
                <OngletMenu className="userPageMenu" link="/recherche" textOnglet="Rechercher un vin" :numCol="numCol"/>
                <OngletMenu className="wineMenu" link="/account" textOnglet="Mon profil" :numCol="numCol"/>
                <OngletMenu className="caveMenu" link="/cave" textOnglet="Ma cave" :numCol="numCol"/>
                <OngletMenu className="wishesMenu" link="/liste-de-souhait" textOnglet="Ma liste de souhait" :numCol="numCol" />
            </ul>
        </nav>

</template>
<script>
import OngletMenu from './OngletMenu.vue';
export default {
    components:{OngletMenu},
    data:function(){
            return {numCol:1}
    },
  name: 'menuLeft',
  computed:{
      getNumCol:function(){
          var numCol=1;
          if(screen.height/11<100){numCol=2; this.numCol=2;}
          return "numCol"+numCol;
      }
  }
}

</script>
