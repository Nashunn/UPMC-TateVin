<template>
    <div id="app">
        <loader v-show="isLoading" ><!-- loader --> </loader>
        <b-container fluid class="main">
            <WineHeader/> <!-- Header -->
            <b-row no-gutters>
                <MenuLeft/>

                <div class="main-content">
                    <!-- Popups -->
                    <wine-popup v-show="showWinePopup"></wine-popup>
                    <Delete v-show="showDeletePopup"/>
                    <Comment v-show="showCommentPopup"/>
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
    import Comment from "./components/Popup/Comment";
    import Loader from "./components/Loader";
    import {EventBusModal} from "./events/";

    export default {
        components: {WineHeader, MenuLeft, WinePopup, Delete, Loader, Comment},
        name: 'app',
        data() {
            return {
                showWinePopup: false,
                showDeletePopup:false,
                showCommentPopup:false,
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
            EventBusModal.$on("Comment", showModal => {
                this.showCommentPopup = showModal;
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
