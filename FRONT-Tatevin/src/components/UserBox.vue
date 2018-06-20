<template>
<b-col md="4" lg="3" sm="12" class="redGradient userBox" v-bind:class="{open:open, notOpen:!open}" no-gutters v-on:mouseenter="animProfileBox(true)" v-on:mouseleave="animProfileBox(false)">
    <ul class="firstUl">
        <li class="content redGradient">
            <img class="profileIcon" src="./../assets/img/profile/default.svg" alt="Image du profil" />

            <span class="serif"><a href="/login">Connexion</a></span>
            <ul>
                <li >Mon profil</li>
                <li>Ma cave</li>
                <li>Ma liste de souhait</li>
                <li>Deconnexion</li>
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
      }

  }
}
</script>
