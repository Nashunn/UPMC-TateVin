<template>
<b-col md="4" lg="3" sm="12" class="redGradient userBox" v-bind:class="{open:open, notOpen:!open}" no-gutters v-on:mouseenter="animProfileBox(true)" v-on:mouseleave="animProfileBox(false)">
    <ul class="firstUl">
        <li class="content redGradient">
            <b-img v-if="usr.avatar" rounded="circle" class="profileIcon mr-2" :src="usr.avatar" alt="Image du profil"/>
            <b-img v-if="!usr.avatar" class="profileIcon" :src="require('../../assets/img/profile/unknown.png')" alt="Image du profil"></b-img>
            
            <span class="serif">{{ usr.username?(usr.username):"Anonyme" }}</span>

            <ul v-if="usr.isProd">
                <li ><router-link :to="{ name: 'ProdAccount', params:{username: usr.username} }">Mon profil</router-link></li>
                <li  v-on:click="disconnect">Déconnexion</li>
            </ul>
        
            <ul v-if="usr.isProd === false">
                <li ><router-link :to="{ name: 'UserAccount', params:{username: usr.username} }">Mon profil</router-link></li>
                <li ><router-link :to="{ name: 'Cave' }">Ma cave</router-link></li>
                <li ><router-link :to="{ name: 'Wishes' }">Ma liste de souhait</router-link></li>
                <li  v-on:click="disconnect">Déconnexion</li>
            </ul>
        
            <ul v-if="!usr.username">
                <li ><router-link :to="{ name: 'Login' }">Se connecter</router-link></li>
                <li ><router-link :to="{ name: 'Signup' }">S'inscrire</router-link></li>

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
import Auth from '../../auth/index'

export default {
  name: 'userBox',
  data(){
      return {
          open:false,
      }
  },
    computed: {
        usr: function() {
            // `this` pointe sur l'instance vm
            return this.$store.state.usr
        }
    },
  methods:{
      animProfileBox:function(isOpen){
          this.open=isOpen;
      },
      disconnect:function(){
          Auth.logout(this);
         /* EventBusModal.$on('loading', loading => {

         })*/
      }

  }
}
</script>
