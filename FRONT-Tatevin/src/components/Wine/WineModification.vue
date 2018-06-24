<template>
    <section class="wine-modification">
        <h2 class="d-inline mob-not-inline text-wrap">Modifier une fiche de vin</h2>

        <div class="mb-3 mt-3">
            <button @click="SaveandGoToWine()" class="wine-btn btn-purple">Sauvegarder et revenir à la page de vin</button>
        </div>

        <p>Todo</p>
        <p>Vin actuel : {{ this.wine.name}}, {{this.wine.millesime}}</p>
    </section>
</template>

<script>
    import {HTTP} from "../../HTTP/http";

    export default {
        name: 'WineModification',
        data () {
            return {
                wine: [],
            }
        },
        mounted() {
            // Get wine information
            this.getWineById();
        },
        methods:{
            getWineById() {
                HTTP.get('/wine/'+this.$route.params.id).then(response=>{
                    this.wine=response.data;
                });
            },
            SaveandGoToWine() {
                //todo save
                
                this.$router.push('/wine/'+this.$route.params.id);
            }
        }
    }
</script>
