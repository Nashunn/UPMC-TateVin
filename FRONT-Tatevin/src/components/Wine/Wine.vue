<template>
    <section class="wine">
        <b-row class="mt-3 width-98">
            <div class="wine-title">
                <div class="wine-color-bloc mr-3" v-bind:style="{ backgroundColor: wineColor }"></div>
                <h2 class="d-inline mob-not-inline text-wrap">{{ this.wine.name }}, {{ this.wine.millesime }}</h2>
            </div>

            <WineScoreMedal :score="3" :vote="42"/>
        </b-row>

        <b-row class="wine-bar width-98">
            <b-col class="score" md="6" sm="12">
                <div class="d-inline">Ma note : </div> {{this.wine.score}}
                <glass-score class="d-inline top-5-child" :score="3" :color="true"/>
            </b-col>
            <b-col class="cave text-center" md="3" sm="12">
                <span class="hover-underline" @click="addCave()">+ Ajouter à ma cave</span>
            </b-col>
            <b-col class="wishes text-center" md="3" sm="12">
                <span class="hover-underline"  @click="addWishes()">+ Ajouter à ma liste de souhait</span>
            </b-col>
        </b-row>

        <b-row class="width-98 mt-3">
            <b-col cols="6">
                <span class="hover-underline ml-1"  @click="addBarcode()">Ajouter un code barre</span>
            </b-col>
            <b-col cols="6" class="text-right">
                <span class="mr-1">Prix moyen : {{ "13" }} €</span>
            </b-col>
        </b-row>

        <p>{{this.wine.terroir}}</p>

        <b-row class="wine-properties width-98 mt-3">
            <WineBlockProperty title="Terroir" :desc=String(this.wine.terroir) />
            <WineBlockProperty title="Millésime" :desc=String(this.wine.millesime) />
            <WineBlockProperty title="Classification" :desc=String(this.wine.classification) />
            <WineBlockProperty title="Cépages" :desc=String(this.wine.grape) />
            <WineBlockProperty title="Conservation" :desc=String(this.wine.keep_in_cave) />
            <WineBlockProperty title="Vin gazeux" :desc=String(this.wine.gaz) />
            <WineBlockProperty title="Décantation" :desc=String(this.wine.decantation) />
        </b-row>

        <b-row>
            <b-col cols="4" class=""> 
                <chart idChart="gouts" ></chart>
            </b-col>
            
            <b-col cols="4" class=""> 
                <chart idChart="gous2"></chart>
            </b-col>
            
            <b-col cols="4" class=""> 
                <chart idChart="gouts3"></chart>
            </b-col>
        </b-row>
    </section>
</template>

<script>
import {HTTP} from "../../HTTP/http";
import WineScoreMedal from "./WineScoreMedal";
import GlassScore from "./GlassScore";
import WineBlockProperty from "./WineBlockProperty";
import Chart from "./../Chart";

export default {
    name: 'Wine',
    components: {
        WineScoreMedal,
        GlassScore,
        WineBlockProperty,
        Chart
    },
    data() {
        return {
            wine: [],
        }
    },
    mounted() {
        // Get wine information
        this.getWineById();
        this.getScores();
    },
    methods: {
        addCave() {
            console.log("todo");
        },
        addWishes() {
            console.log("todo");
        },
        addBarcode() {
            console.log("todo");
        },
        getWineById() {
            HTTP.get('/wine/'+this.$route.params.id).then(response=>{
                this.wine=response.data;
            });
        },
        getScores() {
            HTTP.get('/wine/'+this.$route.params.id).then(response=>{

            });
        },
    },
    computed: {
        wineColor: function() {
            switch (this.wine.type) {
                case "rouge":
                    return "#91141c";
                    break;
                case "rosee":
                    return "#ed9c8b";
                    break;
                case "blanc":
                    return "#fcfedf";
                    break;
                default:
                    return "#a2a2a2";
                    break;
            }
        }
    }
}
</script>
