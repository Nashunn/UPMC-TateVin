<template>
    <section class="wine">
        <b-row class="mt-3 width-98">
            <div class="wine-title">
                <div class="wine-color-bloc mr-3" v-bind:style="{ backgroundColor: wineColor }"></div>
                <h2 class="d-inline mob-not-inline text-wrap">{{ this.wine.name }}, {{ this.wine.millesime }}</h2>
            </div>

            <WineScoreMedal :score="wineGlobalScore" :vote="(wineGlobalScore===0)?wineGlobalScore:wineGlobalScore.length"/>
        </b-row>

        <b-row class="wine-bar width-98">
            <b-col class="score" md="6" sm="12">
                <div class="d-inline">Ma note : </div>
                <glass-score  class="d-inline top-5-child" :score="wineUserScore" :readonly="false" :color="true" v-on:newVote="setUserScore($event)"/>
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
            <WineBlockProperty title="Terroir" :desc="String(this.wine.terroir)" />
            <WineBlockProperty title="Millésime" :desc="String(this.wine.millesime)"/>
            <WineBlockProperty title="Classification" :desc="String(this.wine.classification)" />
            <WineBlockProperty title="Cépages" :desc="String(this.wine.grape)" />
            <WineBlockProperty title="Conservation" :desc="String(this.wine.keep_in_cave)" />
            <WineBlockProperty title="Vin gazeux" :desc="String(this.wine.gaz)" />
            <WineBlockProperty title="Décantation" :desc="String(this.wine.decantation)" />
        </b-row>

        <b-row>
            <b-col cols="4" class="">
                <Tag v-for="(tag,index) in tags" :label="tag" v-on:deleteTag="deleteTag(index)" :canBeDelete="true" :key="index"/>
                <p v-show="tagExists">Le tag {{tagToAdd }} est déjà enregistré.</p>
                <p>Ajouter un tag :  <Autocomplete :items="tagList" ref="newTag"/> <b-button v-on:click="addTag">+</b-button> <b-button v-on:click="validateTags">Valider les tags</b-button></p>
                <chart :iData="smells" idChart="gouts" ></chart>
            </b-col>

            <b-col cols="4" class="">
                <chart :iData="smells" idChart="gous2"></chart>
            </b-col>

            <b-col cols="4" class="">
                <chart :iData="smells" idChart="gouts3"></chart>
            </b-col>
        </b-row>
    </section>
</template>

<script>
import {HTTP} from "../../HTTP/http";
import store from "./../../store";
import WineScoreMedal from "./WineScoreMedal";
import GlassScore from "./GlassScore";
import WineBlockProperty from "./WineBlockProperty";
import Chart from "./../Chart";
import Tag from './../Tag';
import Autocomplete from './../Autocomplete';
import _ from 'lodash';
export default {
    name: 'Wine',
    components: {
        WineScoreMedal,
        GlassScore,
        WineBlockProperty,
        Chart,
        Tag, 
        Autocomplete
    },
    data() {
        return {
            wine: [],
            wineGlobalScore: [],
            wineUserScore: 0,
            tagToAdd:"test",
            tagExists:false,
            indexTag:-1,
            tagList:[],
            tags:[],
            opinion:{},
            smells:{
                datas:[],
                labels:[]
            }
        }
    },
    mounted() {
        // Get wine information
        this.getWineById();
    },
    methods: {
        addCave() {
            console.log("todo");
        },
        addWishes() {
            console.log("todo");
        },
        addTag(){
             if(typeof(this.tags.find(tag=>tag===this.$refs.newTag.search))==="undefined"){
                this.tags.push(this.$refs.newTag.search);
            }else{
                this.tagExists=true;
            }
        },
        deleteTag( index ){
            this.tags.splice(index,1);
        },
        validateTags(){
            HTTP.put('/opinions/'+this.wine._id+'/'+store.state.usr._id, {smell:this.tags}).then(response=>{
                console.log(response)
            });
        },
        addBarcode() {
            console.log("todo");
        },
        getWineById() {
            HTTP.get('/wine/'+this.$route.params.id).then(response=>{
                this.wine=response.data;

                //get scores
                this.getScores();
                this.getUserScore();
                this.getOpinion();
            });
        },
        getOpinion() {
            console.log(this.wine._id)
            HTTP.get('/opinions/'+this.wine._id).then( response => {
                var s = _.map(response.data, 'smell')
                var z = _.reduceRight( s , function(flattened, other) {
                      return flattened.concat(other);
                }, [])
                var x = _.groupBy(z)
                console.log(x)
                for (const [key, val] of Object.entries(x)) {
                    this.smells.labels.push(x[key][0])
                    this.smells.datas.push(x[key].length)
                    console.log(x[key][0] + " -> "+ x[key].length);
                }
            })
          
        },
        getScores() {
            let json = {
                wine_id: this.wine._id,
            };

            HTTP.get('/opinions/', {params: json}).then(response=>{
                this.makeScoreAvg(response.data);
            });
        },
        setUserScore(newScore){
            this.wineUserScore=newScore;
            HTTP.put('/opinions/'+this.wine._id+'/'+store.state.usr._id, {score:newScore});
        },
        getUserScore() {
            let json = {
                wine_id: this.wine._id,
                user_id: store.state.usr._id,
            };

            HTTP.get('/opinions/', {params: json}).then(response=>{
                this.wineUserScore = (response.data.length===0)?0:response.data;
            });
        },
        makeScoreAvg(scoreArray) {
            if(scoreArray) {
                console.log("score array : ", scoreArray);
            }
            else {
                console.log("score array VIDE");
            }
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
    },
    created(){
    }
}
</script>
