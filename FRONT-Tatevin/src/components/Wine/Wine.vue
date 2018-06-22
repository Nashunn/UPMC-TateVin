<template>
    <section class="wine">
        <div class="wine-color-bloc mr-3" v-bind:style="{ backgroundColor: wineColor }"></div>
        <h2 class="d-inline">{{ this.wine.name }}, {{ this.wine.millesime }}</h2>
        <WineScoreMedal :score="4" :vote="42    "/>
    </section>
</template>

<script>
import {HTTP} from "../../HTTP/http";
import WineScoreMedal from "./WineScoreMedal";

export default {
    name: 'Wine',
    components: {
        WineScoreMedal,
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
                    return "#cb1621";
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
