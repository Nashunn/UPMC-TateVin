<template>
    <section class="winesPage">
        <div class="mb-3">
            <button @click="displayCreateWine()" class="wine-btn btn-purple">Nouveau vin</button>
        </div>

        <h2>Vins</h2>
        <WineBloc v-for="(wine,index) in wines" :wineObP="wine" :key="index" />
    </section>
</template>

<script>
    import { HTTP } from "../HTTP/http";
    import {EventBusModal} from "./../events/";
    import WineBloc from './WineBloc';

    export default {
        name: 'WinesPage',
        components:{WineBloc},
        data () {
            return {
                wines: [],
            }
        },
        mounted(){
            // Get all wines
            HTTP.get('/wines').then(response=>{
                this.wines=response.data;

            }).then(()=>EventBusModal.$emit("loading-loader", false));
        },
        created(){
            EventBusModal.$emit("loading-loader", true);
        },
        methods:{
            displayCreateWine() {
                EventBusModal.$emit("winePopup", true);
            }
        }
    }
</script>
