<template>
    <header>
        <b-row align-h="between" no-gutters class="whiteGradient">
            <b-col md="2" sm="12">
                <a href="/"><img class="logo" src="./../assets/logo.svg" alt="Accueil" /></a>
            </b-col>
            <UserBox />

        </b-row>
    </header>
</template>
<script>
import UserBox from './UserBox.vue';
export default {
    components:{UserBox},
  name: 'header'
}
</script>
