<template>
<b-col md="4" lg="3" sm="12" class="redGradient userBox" v-bind:class="{open:open, notOpen:!open}" no-gutters v-on:mouseenter="animProfileBox(true)" v-on:mouseleave="animProfileBox(false)">
    <ul class="firstUl">
        <li class="content redGradient">
            <img class="profileIcon" src="./../assets/img/profile/default.svg" alt="Image du profil" />

            <span class="serif"><router-link :to="{name:'Login'}">Connexion</router-link></span>
            <ul>
                <li><router-link :to="{ name: 'UserAccount' }">Mon profil</router-link></li>
                <li><router-link :to="{ name: 'Cave' }">Ma cave</router-link></li>
                <li><router-link :to="{ name: 'Wishes' }">Ma liste de souhait</router-link></li>
                <li v-on:click="disconnect">Deconnexion</li>
            </ul>
        </li>
        <li>
            <svg height="30" width="60">
             <path d="M0 0 L30 30 L60 0 Z" fill="rgb(105,0,41)"/>
            </svg>
            <!--<svg width="150" height="150" viewBox="0 0 3 2">
              <rect width="1" height="1" x="2" fill="rgb(128,0,43)" />
          </svg>-->
        </li>
    </ul>
</b-col>
</template>


<script>
import Auth from '../auth/'

export default {
  name: 'userBox',
  data(){
      return {
          open:false
      }
  },
  methods:{
      animProfileBox:function(isOpen){
          this.open=isOpen;
      },
      disconnect:function(){
          Auth.logout();
         /* EventBusModal.$on('loading', loading => {

         })*/
      }

  },
  created(){
      console.log("USER : ");
      console.log(this.$store.state.usr.username);
  }
}
</script>
