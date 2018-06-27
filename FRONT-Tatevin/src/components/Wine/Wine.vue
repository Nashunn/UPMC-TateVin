<template>
    <section class="wine">
        <b-row class="mt-3 width-98">
            <div class="wine-title">
                <!--<div class="wine-color-bloc mr-3" v-bind:style="{ backgroundColor: wineColor }"></div>-->
                <WineColor :color="wine.type" class="icon wine-color-bloc mr-3"/>
                <h2 class="d-inline mob-not-inline text-wrap">{{ this.wine.name }}, {{ this.wine.millesime }}</h2>
            </div>

            <WineScoreMedal :score="wineGlobalScore.score" :vote="wineGlobalScore.nbVote"/>
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
            <WineBlockProperty title="Domaine" :desc="String(this.wine.domain)" />
            <WineBlockProperty title="Millésime" :desc="String(this.wine.millesime)"/>
            <WineBlockProperty title="Classification" :desc="String(this.wine.classification)" />
            <WineBlockProperty title="Cépages" :desc="String(this.wine.grape)" />
            <WineBlockProperty title="Conservation" :desc="String(this.wine.keep_in_cave)" />
            <WineBlockProperty title="Vin gazeux" :desc="String(this.wine.gaz)" />
            <WineBlockProperty title="Décantation" :desc="String(this.wine.decantation)" />
        </b-row>

        <b-row>
            <b-col cols="4" class="">
                <h4>Sensations visuelles</h4>
                <a @click="addTagChart('visual')">Que voyez vous ?</a>
                <chart :iData="opinion.visual" idChart="visual" ></chart>
            </b-col>

        </b-row>
        <div class="allComments">
            <button type="button" class="btn-purple"  @click="comment">Ajouter un commentaire</button>
            <div v-if="commentsHere">
                <Comment v-for="(comment, index) in wine.comments" :key="comment._id"  :comment="comment" />
            </div>
        </div>
        <AddTag v-show="showTagPopUp" :type="tagType"/>
    </section>

</template>

<script>
import {HTTP} from "../../HTTP/http";
import store from "./../../store";
import WineScoreMedal from "./WineScoreMedal";
import GlassScore from "./GlassScore";
import Comment from "./../Comment";
import WineBlockProperty from "./WineBlockProperty";
import WineColor from "./WineColor";
import Chart from "./../Chart";
import Tag from './../Tag';
import AddTag from './../Popup/AddTag';
import Autocomplete from './../Autocomplete';
import _ from 'lodash';
 import { EventBusModal } from "./../../events/";

export default {
    name: 'Wine',
    components: {
        WineScoreMedal,
        GlassScore,
        WineBlockProperty,
        Chart,
        Tag,
        Autocomplete,
        WineColor,
        Comment,
        AddTag
    },
    data() {
        return {
            wine: [],
            wineGlobalScore: 0,
            wineUserScore: 0,
            opinion:{
                smells:{
                    datas:[],
                    labels:[]
                },
                taste:{
                    datas:[],
                    labels:[]
                },
                visual:{
                    datas:[],
                    labels:[]
                },
            },
            commentsHere:false,
            showTagPopUp:false,
            tagType:""
        }
    },
    mounted() {
        // Get wine information
        this.getWineById();
        EventBusModal.$on('updateComments', comment=>{
            this.wine.comments.push(comment);
        });
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
                this.wine=response.data[0];
                this.wineGlobalScore=response.data[1];

                this.getUserScore();
                this.getOpinion( "all" );
            }).then(res=>{
                HTTP.get("/wineGetComments",{params:{comments:this.wine.comments}} ).then( response2=>{
                    this.wine.comments= response2.data;
                    this.commentsHere=true;
                })

            });
;
        },
        getOpinion( ) {
            console.log("FFF",this.wine._id)
            HTTP.get('/opinions/'+this.wine._id).then( response => {
                var s = _.map(response.data, "visual")
                var z = _.reduceRight( s , function(flattened, other) {
                      return flattened.concat(other);
                }, [])
                var x = _.groupBy(z)
                console.log(x)
                for (const [key, val] of Object.entries(x)) {
                    this.opinion.visual.labels.push(x[key][0])
                    this.opinion.visual.datas.push(x[key].length)
                    console.log(x[key][0] + " -> "+ x[key].length);
                }
            })


        },
        getUserScore() {
            let json = {
                wine_id: this.wine._id,
                user_id: store.state.usr._id,
            };

            HTTP.get('/opinions/', {params: json}).then(response=>{
                this.wineUserScore = (typeof response.data[0].score==="undefined")?0:response.data[0].score;
            });
        },
        setUserScore(newScore){
            this.wineUserScore=newScore;
            HTTP.put('/opinions/'+this.wine._id+'/'+store.state.usr._id, {score:newScore});

            this.getWineById();
        },
        comment(){
            EventBusModal.$emit("Comment", {showModal:true, from:"wine"});
        },addTagChart( type ){
            this.showTagPopUp=true;
            this.tagType=type;
        }
    },
    computed: {
        /*wineColor: function() {
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
        }*/
    },
    created(){
        EventBusModal.$on("addTag", showTagPopUp=>{
            this.showTagPopUp=showTagPopUp;
        })
    }
}
</script>
