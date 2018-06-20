<template>
        <b-row align-h="between" no-gutters class="whiteGradient" id="timIsHappy">
            <b-col md="2" sm="12">
                <a href="/"><img class="logo" src="./../assets/logo.svg" alt="Accueil" /></a>
            </b-col>
            <UserBox />
        </b-row>
</template>
<script>
import UserBox from './UserBox.vue';
export default {
    components:{UserBox},
  name: 'timIsHappy'
}
</script>
