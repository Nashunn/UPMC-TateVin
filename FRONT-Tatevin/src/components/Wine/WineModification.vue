<template>
    <section class="wine-modification">
        <h2 class="d-inline mob-not-inline text-wrap">Edition d'une fiche de vin</h2>

        <div class="mb-3 mt-3">
            <button @click="SaveandGoToWine()" class="wine-btn btn-purple">Sauvegarder et revenir à la page de vin</button>
        </div>

        <div class="form">
            <!-- NOM -->
            <b-row class="mt-3">
                <b-col class="" md="3" sm="12">
                    <label class="mt-2" for="name">Nom</label>
                </b-col>

                <b-col md="9" sm="9">
                    <b-form-input
                        type="text"
                        id="name"
                        placeholder="Entrez le nom"
                        disabled="disabled"
                        v-model="wine.name"
                    />
                </b-col>
            </b-row>

            <!-- MILLESIME -->
            <b-row class="mt-3">
                <b-col class="" md="3" sm="12">
                    <label class="mt-2" for="millesime">Millésime</label>
                </b-col>

                <b-col md="9" sm="9">
                    <b-form-input
                        type="text"
                        id="millesime"
                        placeholder="Entrez le millésime"
                        disabled="disabled"
                        v-model="wine.millesime"
                    />
                </b-col>
            </b-row>

            <!-- TYPE VIN -->
            <b-row class="mt-3">
                <b-col class="" md="3" sm="12">
                    <label class="mt-2" for="type">Type</label>
                </b-col>
                <b-col md="9" sm="9">
                    <b-form-input
                            type="text"
                            id="type"
                            placeholder="Entrez le type de vin"
                            disabled="disabled"
                            :value="typeWine"
                    />
                </b-col>
            </b-row>

            <!-- TERROIR -->
            <b-row class="mt-3">
                <b-col class="" md="3" sm="12">
                    <label class="mt-2" for="terroir">Terroir</label>
                </b-col>
                <b-col md="9" sm="9">
                    <b-form-input
                        type="text"
                        id="terroir"
                        placeholder="Entrez le terroir"
                        v-model="wine.terroir"
                    />
                </b-col>
            </b-row>

            <!-- DOMAINE -->
            <b-row class="mt-3">
                <b-col class="" md="3" sm="12">
                    <label class="mt-2" for="domaine">Domaine</label>
                </b-col>
                <b-col md="9" sm="9">
                    <b-form-input
                        type="text"
                        id="domaine"
                        placeholder="Entrez le domaine"
                        v-model="wine.domain"
                    />
                </b-col>
            </b-row>

            <!-- CLASSIFICATION -->
            <b-row class="mt-3">
                <b-col class="" md="3" sm="12">
                    <label class="mt-2" for="classification">Classification</label>
                </b-col>
                <b-col md="9" sm="9">
                    <b-form-input
                        type="text"
                        id="classification"
                        placeholder="Entrez la classification"
                        v-model="wine.classification"
                    />
                </b-col>
            </b-row>

            <!-- GAZ -->
            <b-row class="mt-3">
                <b-col class="" md="3" sm="12">
                    <label class="mt-2" for="gaz">Vin gazeux</label>
                </b-col>
                <b-col md="9" sm="9">
                    <b-form-select
                        id="gaz"
                        v-model="wine.gaz"
                        :options="optionYesNo"
                    />
                </b-col>
            </b-row>

            <!-- RAISIN -->
            <b-row class="mt-3">
                <b-col class="" md="3" sm="12">
                    <label class="mt-2" for="cepage">Cépages</label>
                </b-col>
                <b-col md="9" sm="9">
                    <b-form-input
                        type="text"
                        id="cepage"
                        placeholder="Entrez les cépages (séparé par virgule)"
                        v-model="wine.grape"
                    />
                </b-col>
            </b-row>

            <!-- CONSERVATION -->
            <b-row class="mt-3">
                <b-col class="" md="3" sm="12">
                    <label class="mt-2" for="conservation">Conservation</label>
                </b-col>
                <b-col md="9" sm="9">
                    <b-form-select
                        id="conservation"
                        v-model="wine.keep_in_cave"
                        :options="optionYesNo"
                    />
                </b-col>
            </b-row>

            <!-- DATE DE DEGUSTATION -->
            <b-row class="mt-3">
                <b-col class="" md="3" sm="12">
                    <label class="mt-2" for="tasting_date">Date de dégustation</label>
                </b-col>
                <b-col md="9" sm="9">
                    <b-form-input
                        type="text"
                        id="tasting_date"
                        placeholder="Entrez la période de dégustation"
                        v-model="wine.tasting_date"
                    />
                </b-col>
            </b-row>

            <!-- DECANTATION -->
            <b-row class="mt-3">
                <b-col class="" md="3" sm="12">
                    <label class="mt-2" for="decantation">Carrafage</label>
                </b-col>
                <b-col md="9" sm="9">
                    <b-form-input
                            type="number"
                            id="decantation"
                            placeholder="Entrez la période de carrafage"
                            v-model="wine.decantation"
                    />
                </b-col>
            </b-row>
        </div>
        <div class="mb-3 mt-3">
            <button @click="SaveandGoToWine()" class="wine-btn btn-purple">Sauvegarder et revenir à la page de vin</button>
        </div>
    </section>
</template>

<script>
    import {HTTP} from "../../HTTP/http";

    export default {
        name: 'WineModification',
        data () {
            return {
                wine: [],
                optionYesNo: [
                    { value: null, text: 'Indiquez "Oui" ou "Non"', disabled: true },
                    { value: true", text: 'Oui' },
                    { value: false, text: 'Non' },
                ],  
            }
        },
        mounted() {
            // Get wine information
            this.getWineById();
        },
        methods:{
            getWineById() {
                HTTP.get('/wine/'+this.$route.params.id).then(response=>{
                    this.wine=response.data[0];
                });
            },
            SaveandGoToWine() {
                HTTP.put('/wine/'+this.$route.params.id, {params: this.wine} ).then(response=>{
                    console.log(response.data);
                });

                this.$router.push('/wine/'+this.$route.params.id);
            }
        },
        computed: {
            typeWine: function() {
                switch (this.wine.type) {
                    case "rouge":
                        return "Rouge";
                        break;
                    case "rosee":
                        return "Rosée";
                        break;
                    case "blanc":
                        return "Blanc";
                        break;
                    default:
                        return "Type inconnu";
                        break;
                }
            }
        }
    }
</script>
