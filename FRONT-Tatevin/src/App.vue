<template>
    <div id="app">
        <b-container fluid class="main">
            <TimIsHappy/> <!-- Header -->
            <b-row no-gutters>
                <MenuLeft/>
                <div class="main-content">
                    <div v-show="isLoading" ><!-- loader --> </div>
                    <!-- Popups -->
                    <wine-popup v-show="showWinePopup"></wine-popup>
                    <!-- End Popups -->

                    <router-view></router-view>
                </div>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'
    import TimIsHappy from './components/TimIsHappy.vue'
    import MenuLeft from './components/MenuLeft.vue'
    import WinePopup from "./components/Popup/Wine";
    import {EventBusModal} from "./events/";


    export default {
        components: {TimIsHappy, MenuLeft, WinePopup},
        name: 'app',
        data() {
            return {
                showWinePopup: false,
                isLoading: false,
            }
        },
        created(){
        },
        mounted() {
            EventBusModal.$on('loading-loader', loading => {
                this.isLoading = loading;
            });
            EventBusModal.$on("winePopup", showModal => {
                this.showWinePopup = showModal;
            });
        }
    }
</script>

<style>
    body {
        margin: 0;
    }

    .main {
        padding: 0;
    }
</style>
