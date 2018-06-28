<template>
    <section class="wine">
        <!-- Popups -->
        <AddPrice v-show="showPricePopUp"/>
        <AddTag v-show="showTagPopUp" :type="tagType"/>
        <AddBarCode v-show="showScanPopUp"/>
        <!-- End Popups -->
        <b-row class="mt-3 width-98">
            <div class="wine-title">
                <!--<div class="wine-color-bloc mr-3" v-bind:style="{ backgroundColor: wineColor }"></div>-->
                <WineColor :color="wine.type" class="icon wine-color-bloc mr-3"/>
                <h2 class="d-inline mob-not-inline text-wrap">{{ this.wine.name }}, {{ this.wine.millesime }}</h2>
            </div>
            <WineScoreMedal :score="wineGlobalScore.score" :vote="wineGlobalScore.nbVote"/>
        </b-row>

        <b-row class="mt-3 width-98"><button @click="goModify()">Editer la fiche</button></b-row>
        <b-row class="mt-3 width-98" v-if="isProd()"><button @click="iAmProd()">Je suis le producteur</button></b-row>

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
                <span class="ml-1" >
                    <button v-if="typeof(wine.id)==='undefined'" @click="addBarCode()">Ajouter un code barre</button>
                    <span v-else>✔️Code barre enregistré</span>
                </span>
            </b-col>
            <b-col cols="6" class="text-right">
                <span class="ml-1" >
                    <span>Prix moyen :
                        {{ wineGlobalPrice.nb===0?
                            "Non-renseigné" :
                            (Number(wineGlobalPrice.price/wineGlobalPrice.nb)+' €')
                        }}
                    </span>

                    <div v-model="userHasSetPrice">
                        <button v-if="!userHasSetPrice" @click="addPrice()">Ajouter un prix</button>
                        <span v-else>✔️Vous avez déjà donné un prix pour ce vin</span>
                    </div>
                </span>
            </b-col>
        </b-row>

        <b-row class="wine-properties width-98 mt-3">
            <WineBlockProperty title="Terroir" :desc="String(this.wine.terroir)" />
            <WineBlockProperty title="Domaine" :desc="String(this.wine.domain)" />
            <WineBlockProperty title="Millésime" :desc="String(this.wine.millesime)"/>
            <WineBlockProperty title="Classification" :desc="String(this.wine.classification)" />
            <WineBlockProperty title="Cépages" :desc="String(this.wine.grape)" />
            <WineBlockProperty title="Conservation" :desc="String(this.wine.keep_in_cave?'Oui':'Non')" />
            <WineBlockProperty title="Vin gazeux" :desc="String(this.wine.gaz?'Oui':'Non')" />
            <WineBlockProperty title="Carrafage" :desc="String(this.wine.decantation===null?this.wine.decantation:this.wine.decantation+' min')" />
        </b-row>

        <b-row class="stats-graph text-center">
            <b-col md="4" sm="10" class="graph-wrapper">
                <div class="line-deco"></div>
                <h4 >Au regard</h4>
                <button @click="addTagChart('visual')">Donnez votre avis</button>
                <chart :iData="opinion.visual" idChart="visual"></chart>
            </b-col>
            <b-col md="4" sm="10" class="graph-wrapper">
                <div class="line-deco"></div>
                <h4>Au nez</h4>
                <button @click="addTagChart('smell')">Donnez votre avis</button>
                <chart :iData="opinion.smell" idChart="smell"></chart>
            </b-col>

            <b-col md="4" sm="10" class="graph-wrapper">
                <div class="line-deco"></div>
                <h4>En bouche</h4>
                <button @click="addTagChart('taste')">Donnez votre avis</button>
                <chart :iData="opinion.taste" idChart="taste"></chart>
            </b-col>
        </b-row>
        <div class="allComments mt-5">
            <div class="line-deco mb-3"></div>
            <button type="button" class="btn-purple" @click="comment">Ajouter un commentaire</button>
            <div v-if="commentsHere">
                <Comment v-for="(comment, index) in wine.comments" :key="comment._id"  :comment="comment" />
            </div>
        </div>
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
import AddBarCode from './../Popup/AddBarCode';
import AddPrice from './../Popup/AddPrice';
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
        AddTag,
        AddPrice,
        AddBarCode
    },
    data() {
        return {
            wine: [],
            wineGlobalScore: 0,
            wineGlobalPrice: 0,
            wineUserScore: 0,
            opinion:{
                smell:{
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
            userHasSetPrice: false,
            commentsHere:false,
            showTagPopUp:false,
            showScanPopUp:false,
            showPricePopUp:false,
            tagType:"",
            firstPageLoad:true
        }
    },
    mounted() {
        // Get wine information
        this.getWineById();
        //Get other informations
        this.getUserScore();
        this.getIfUserSetPrice();
        this.getOpinion("all");

        //Get comments
        EventBusModal.$on('updateComments', comment=>{
            this.wine.comments.push(comment);
        });
        EventBusModal.$on('addBarCode', showPopup=>{
            this.showScanPopUp=false;
        });

    },
    methods: {
        addCave() {
            console.log("todo");
        },
        addWishes() {
            console.log("todo");
        },
        isProd(){
            return store.state.usr.isProd === true
        },
        iAmProd(){

        },
        getWineById() {
            HTTP.get('/wine/'+this.$route.params.id).then(response=>{
                if(this.firstPageLoad)
                    this.wine=response.data[0];

                this.wineGlobalScore=response.data[1];
                this.wineGlobalPrice=response.data[2];

            }).then(response=>{
                if(this.firstPageLoad) {
                    HTTP.get("/wineGetComments", {params: {comments: this.wine.comments}}).then(response2 => {

                        this.wine.comments = response2.data;
                        this.commentsHere = true;
                    });
                    this.firstPageLoad = false;
                }
                EventBusModal.$emit("loading-loader", false)
            });
        },
        getOpinion( type ) {
            if(type==="all" || type==="visual"){
                HTTP.get('/opinions/'+this.$route.params.id).then( response => {
                    var s = _.map(response.data, 'visual');
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
            }
            if(type==="all" || type==="smell"){
                HTTP.get('/opinions/'+this.$route.params.id).then( response => {
                    var s = _.map(response.data, 'smell');
                    var z = _.reduceRight( s , function(flattened, other) {
                          return flattened.concat(other);
                    }, [])
                    var x = _.groupBy(z)
                    console.log(x)
                    for (const [key, val] of Object.entries(x)) {
                        this.opinion.smell.labels.push(x[key][0])
                        this.opinion.smell.datas.push(x[key].length)
                        console.log(x[key][0] + " -> "+ x[key].length);
                    }
                        console.log("VISUAL FINAL",this.opinion.smell.labels);
                })
            }
            if(type==="all" || type==="taste"){
                HTTP.get('/opinions/'+this.$route.params.id).then( response => {
                    var s = _.map(response.data, 'taste');
                    var z = _.reduceRight( s , function(flattened, other) {
                          return flattened.concat(other);
                    }, [])
                    var x = _.groupBy(z)
                    console.log(x)
                    for (const [key, val] of Object.entries(x)) {
                        this.opinion.taste.labels.push(x[key][0])
                        this.opinion.taste.datas.push(x[key].length)
                        console.log(x[key][0] + " -> "+ x[key].length);
                    }
                })
            }
        },
        getIfUserSetPrice() {
            let json = {
                wine_id: this.$route.params.id,
                user_id: store.state.usr._id,
            };

            HTTP.get("/opinions", {params: json}).then(response=> {
                if(typeof response.data[0].price === "undefined")
                    this.userHasSetPrice= false;
                else
                    this.userHasSetPrice= true;
            });
        },
        getUserScore() {
            let json = {
                wine_id: this.$route.params.id,
                user_id: store.state.usr._id,
            };

            HTTP.get('/opinions/', {params: json}).then(response=>{
                if(response.data.length === 0)
                    this.wineUserScore = 0;
                else
                    this.wineUserScore = (typeof response.data[0].score==="undefined")?0:response.data[0].score;
            });
        },
        setUserScore(newScore){
            this.wineUserScore=newScore;
            HTTP.put('/opinions/'+this.$route.params.id+'/'+store.state.usr._id, {score:newScore});

            this.getWineById();
        },
        comment(){
            EventBusModal.$emit("Comment", {showModal:true, from:"wine"});
        },
        addTagChart( type ){
            if(store.state.usr.username){
                this.showTagPopUp=true;
                this.tagType=type;
            }else{
                EventBusModal.$emit("neadConnect",true)
            }
        },
        addBarCode(){
            if(store.state.usr.username){
                this.showScanPopUp=true;
            }else{
                EventBusModal.$emit("neadConnect",true)
            }
        },
        addPrice() {
            if(store.state.usr.username){
                this.showPricePopUp=true;
            }else{
                EventBusModal.$emit("neadConnect",true)
            }
        },
        goModify() {
            this.$router.push('/wine/m/'+this.$route.params.id);
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
        EventBusModal.$emit("loading-loader", true);

        EventBusModal.$on("addTag", showTagPopUp=>{
            this.showTagPopUp=showTagPopUp;
        });

        EventBusModal.$on("tagAdded", type=>{
            this.$router.push("/wine/"+this.$route.params.id);
        });

        EventBusModal.$on("newBarCode", newBarCode=>{
            HTTP.put('/wineBarCode/'+this.$route.params.id, {barcode:newBarCode}).then(()=>{
                this.wine.id=newBarCode;
                this.showScanPopUp=false;
            })
        });

        EventBusModal.$on("addPricePopup", showPricePopup=>{
            this.showPricePopUp = showPricePopup;
        });

        EventBusModal.$on("priceWasAddByUser", () =>{
            this.getWineById();
        });
    }
}
</script>
