<template>
    <section class="wine">
        <b-row class="mt-3">
            <div class="wine-color-bloc mr-3" v-bind:style="{ backgroundColor: wineColor }"></div>
            <h2 class="d-inline mob-not-inline">{{ this.wine.name }}, {{ this.wine.millesime }}</h2>

            <WineScoreMedal :score="3" :vote="42"/>
        </b-row>

        <b-row class="wine-bar">
            <b-col class="score" md="6" sm="12">
                <div class="d-inline">Ma note : </div> {{this.wine.score}}
                <glass-score class="d-inline" :score="3" :maxScore="5"/>
            </b-col>
            <b-col class="cave text-center" md="3" sm="12">
                + Ajouter à ma cave
            </b-col>
            <b-col class="wishes text-center" md="3" sm="12">
                + Ajouter à ma liste de souhait
            </b-col>
        </b-row>
    </section>
</template>

<script>
import {HTTP} from "../../HTTP/http";
import WineScoreMedal from "./WineScoreMedal";
import GlassScore from "./GlassScore";

export default {
    name: 'Wine',
    components: {
        WineScoreMedal,
        GlassScore,
    },
    data() {
        return {
            wine: [],
        }
    },
    mounted() {
        console.log("Page de vin : "+this.$route.params.id);
        HTTP.get('/wine/'+this.$route.params.id).then(response=>{
            this.wine=response.data;
        });
    },
    methods: {
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
                    return "#e2d992";
                    break;
                default:
                    return "#a2a2a2";
                    break;
            }
        }
    }
}
</script>
