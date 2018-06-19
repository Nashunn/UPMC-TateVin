<template>
<b-col cols="3" class="redGradient userBox" v-bind:class="{open:open, notOpen:!open}" no-gutters v-on:mouseenter="animProfileBox(true)" v-on:mouseleave="animProfileBox(false)">
    <ul class="redGradient">
        <li class="content">
            <img class="profileIcon" src="./../assets/img/profile/default.svg" alt="Image du profil" />
            <span class="serif">Connection</span>
            <ul>
                <li >Mon profil</li>
                <li>Ma cave</li>
                <li>Ma liste de souhait</li>
                <li>Deconnection</li>
            </ul>
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
