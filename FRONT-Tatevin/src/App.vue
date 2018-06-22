<template>
    <div id="app">
        <b-container fluid class="main">
            <WineHeader/> <!-- Header -->
            <b-row no-gutters>
                <MenuLeft/>

                <div class="main-content">
                    <div v-show="isLoading" ><!-- loader --> </div>
                    <!-- Popups -->
                    <wine-popup v-show="showWinePopup"></wine-popup>
                    <Delete v-show="showDeletePopup"/>
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
    import WineHeader from './components/Menus/WineHeader.vue'
    import MenuLeft from './components/Menus/MenuLeft.vue'
    import WinePopup from "./components/Popup/Wine";
    import AddWine from "./components/Popup/AddWine";
    import Delete from "./components/Popup/Delete";
    import {EventBusModal} from "./events/";

    export default {
        components: {WineHeader, MenuLeft, WinePopup, Delete},
        name: 'app',
        data() {
            return {
                showWinePopup: false,
                showDeletePopup:false,
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
            EventBusModal.$on("Delete", showModal => {
                this.showDeletePopup = showModal;
            });
            EventBusModal.$on("AddWine", showModal => {
                this.showAddWinePopup = showModal;
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
