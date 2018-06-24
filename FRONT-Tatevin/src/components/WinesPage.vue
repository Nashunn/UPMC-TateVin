<template>
    <section class="winesPage">
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

        }
    }
</script>
