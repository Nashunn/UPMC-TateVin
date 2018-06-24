<template>
    <section class="winesPage">
        <div class="mb-3">
            <button @click="displayCreateWine()" class="wine-btn btn-purple">Nouveau vin</button>
        </div>

        <h2>Vins</h2>
        <div class="wines" v-for="wine in wines">
            <router-link :to="{ name: 'Wine', params: {id: wine.id } }">
                {{ wine.name }} ({{ wine.millesime }})
            </router-link>
        </div>
    </section>
</template>

<script>
    import { HTTP } from "../HTTP/http";
    import {EventBusModal} from "./../events/";

    export default {
        name: 'WinesPage',
        data () {
            return {
                wines: [],
            }
        },
        mounted(){
            // Get all wines
            HTTP.get('/wines').then(response=>{
                console.log(response.data);
                this.wines=response.data;
            });
        },
        methods:{
            displayCreateWine() {
                EventBusModal.$emit("winePopup", true);
            }
        }
    }
</script>
