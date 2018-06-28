<template>
    <section class="wine">
        <b-alert :show="dismissCountDown"
            fade
             dismissible
             variant="success"
             @dismissed="dismissCountDown=0"
             @dismiss-count-down="countDownChanged">{{successMsg}}</b-alert>

        <b-row class="mt-3 width-98">
            <div class="wine-title">
                <!--<div class="wine-color-bloc mr-3" v-bind:style="{ backgroundColor: wineColor }"></div>-->
                <WineColor :color="wine.type" class="icon wine-color-bloc mr-3"/>
                <h2 class="d-inline mob-not-inline text-wrap">{{ this.wine.name }}, {{ this.wine.millesime }}</h2>
            </div>
            <WineScoreMedal :score="wineGlobalScore.score" :vote="wineGlobalScore.nbVote"/>
        </b-row>
        <b-row class="mt-3 width-98 endHeaderWine"><button @click="goModify()">Editer la fiche</button></b-row>
        <b-row class="mr-3 mt-3 width-98 d-inline" v-if="isProd()"><button @click="iAmProd()">Je suis le producteur</button></b-row>
        <b-row  class="mt-3 width-98 d-inline" v-if="isProd()"><button @click="showComment=true">Définir le vin</button></b-row>
        <b-row  class="mt-3 width-98 " v-show="showComment">
            <label class="w-25" for="name">Votre message</label>
            <wysiwyg v-model="commentProd" />
            <button @click="checkBeforeSubmitProdComment()">Valider</button>
        </b-row>

        <b-row  v-if="producer._id" class="prodBlocWine  width-98 ">
            <b-col>
                <b-row>
                    <p class="title">Le mot du producteur</p>
                </b-row>
                <b-row>
                    <p> {{wine.producer.comment}}</p>
                </b-row>
            </b-col>
            <b-col md="3" class="text-center">
                <b-row>
                    <b-img :src="producer.avatar" rounded="circle"  width="34" height="34" alt="img"/>
                    <p><router-link :to="{ name: 'ProdAccount', params: {username:producer.username} }">{{producer.username}}</router-link></p>
                </b-row>
                <b-row>
                    <span><a :href="'mailto:'+producer.email">{{producer.email}}</a></span>
                </b-row>
                <b-row>

                    <span><a :href="'tel:'+producer.phone">{{producer.phone}}</a></span>
                </b-row>
                <b-row>
                    <span><a :href="producer.website">{{producer.website}}</a></span>
                </b-row>
            </b-col>

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
                <a class="hover-underline ml-1"  @click="addBarCode()"><span v-if="typeof(wine.id)==='undefined'">Ajouter un code barre</span></a>
            </b-col>
            <b-col cols="6" class="text-right">
                <span class="mr-1">Prix moyen : {{ "13" }} €</span>
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
            <WineBlockProperty title="Carrafage" :desc="String(this.wine.decantation+' min')" />
        </b-row>

        <b-row class="stats-graph text-center">
            <b-col md="4" sm="10" class="graph-wrapper">
                <div class="line-deco"></div>
                <h4 >Au regard</h4>
                <button @click="addTagChart('visual')">Donnez votre avis</button>
                <chart :iData="opinion.visual" idChart="visual"  v-model="tagKey"></chart>
            </b-col>
            <b-col md="4" sm="10" class="graph-wrapper">
                <div class="line-deco"></div>
                <h4>Au nez</h4>
                <button @click="addTagChart('smell')">Donnez votre avis</button>
                <chart :iData="opinion.smell" idChart="smell"  v-model="tagKey"></chart>
            </b-col>

            <b-col md="4" sm="10" class="graph-wrapper">
                <div class="line-deco"></div>
                <h4>En bouche</h4>
                <button @click="addTagChart('taste')">Donnez votre avis</button>
                <chart :iData="opinion.taste" idChart="taste"  v-model="tagKey"></chart>
            </b-col>
        </b-row>
        <div class="allComments mt-5">
            <div class="line-deco mb-3"></div>
            <button type="button" class="btn-purple" @click="comment">Ajouter un commentaire</button>
            <div v-if="commentsHere">
                <Comment v-for="(comment, index) in wine.comments" :key="comment._id"  :comment="comment" />
            </div>
        </div>
        <AddTag v-show="showTagPopUp" :type="tagType" :visual="opinion.visual.labels" :taste="opinion.taste.labels" :smell="opinion.smell.labels"/>
        <AddBarCode v-show="showScanPopUp"/>
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
        AddBarCode
    },
    data() {
        return {
            wine: [],
            wineGlobalScore: 0,
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
            commentsHere:false,
            showTagPopUp:false,
            showScanPopUp:false,
            tagType:"",
            firstPageLoad:true,
            commentProd:'',
            showComment:false,
            producer:{},
            dismissSecs: 5,
            dismissCountDown: 0,
            successMsg: '',
            tagKey:0
        }
    },
    mounted() {
        // Get wine information
        this.getWineById();
        //Get other informations
        this.getUserScore();
        this.getOpinion("all");

        //Get comments
        EventBusModal.$on('updateComments', comment=>{
            this.wine.comments.push(comment);
        });
        EventBusModal.$on('addBarCode', showPopup=>{
            this.showScanPopUp=false;
        });
        EventBusModal.$on("tagAdded", type=>{
            this.getOpinion(type);
        })

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
            HTTP.put('producer/'+this.$route.params.id+'/'+ store.state.usr._id).then(response=>{
                this.successMsg = "Vous êtes le producteur de ce vin ! "
                this.showAlert()
            })
        },
        countDownChanged (dismissCountDown) {
            this.dismissCountDown = dismissCountDown
        },
        showAlert () {
            this.dismissCountDown = this.dismissSecs
        },
        checkBeforeSubmitProdComment () {
            this.error = "";
            if(this.commentProd === "")
                this.error = "Ne rien dire, c'est dire beaucoup trop.";
            else
                this.submitCommentProd();
        },
        submitCommentProd(){
            HTTP.put('producer/'+this.$route.params.id+'/'+ store.state.usr._id+'/comment', {commentProd:this.commentProd}).then(response=>{
                this.successMsg = "Vous avez commenté ce vin ! "
                this.showAlert()
            })
        },
        getWineById() {
            HTTP.get('/wine/'+this.$route.params.id).then(response=>{
                if(this.firstPageLoad)
                    this.wine=response.data[0];
                this.wineGlobalScore=response.data[1];
            }).then(response=>{
                if(this.firstPageLoad) {
                    HTTP.get("/wineGetComments", {params: {comments: this.wine.comments}}).then(response2 => {
                        this.wine.comments = response2.data;
                        this.commentsHere = true;
                    });
                    if(this.wine.producer)
                        HTTP.get("/producer/"+ this.wine.producer.id_Prod).then(resp => {
                            this.producer = resp.data[0];
                            console.log(this.producer)
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
        getPrice() {

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
        },addTagChart( type ){
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
        })

        EventBusModal.$on("newBarCode", newBarCode=>{
            HTTP.put('/wineBarCode/'+this.$route.params.id, {barcode:newBarCode}).then(()=>{
                this.wine.id=newBarCode;
                this.showScanPopUp=false;
            })
        })
    }
}
</script>
