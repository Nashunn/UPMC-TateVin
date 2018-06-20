<template>
        <b-row align-h="between" no-gutters class="whiteGradient" id="timIsHappy">
            <b-col md="2" sm="12">
                <router-link :to="{name:'Hello'}"><img class="logo" src="./../assets/logo.svg" alt="Accueil" /></router-link>
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
