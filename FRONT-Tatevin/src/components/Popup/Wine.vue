<template>
  <!-- Connection Popup -->
  <div class="row margin-bottom-0">
    <div class="popup-bg" v-on:click="close()"></div>
    <div class="popup connection col s10 offset-s2 pull-s1 m10 offset-m2 pull-m1">
      <div class="header">

        <div class="wrapper-logo">
        </div>

        <div class="wrapper-btn">
          <button @click="showLogin()" v-bind:class={selected:!showSignupPart} class="tb-btn btn-red col s12 m4">Connexion</button>
          <button @click="showSignup()" v-bind:class={selected:showSignupPart} class="tb-btn btn-red col s12 m4">Inscription</button>
        </div>
      </div>

    </div>
  </div>
  <!-- End Connection Popup -->
</template>

<script>
  import { EventBusModal } from "../../events/";

  export default {
    name: "modalLogin",

    methods: {
      close() {
        this.showModal = false;
        EventBusModal.$emit("change-state-login", this.showModal);
      },
      showLogin() {
        this.showSignupPart = false;
      },
      showSignup() {
        this.showSignupPart = true;
      },
    },
    data() {
      return {
        showModal: false,
        showSignupPart: false
      };
    }
  };
</script>
