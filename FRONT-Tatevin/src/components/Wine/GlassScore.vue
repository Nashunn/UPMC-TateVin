<template>
    <div class="score-bar" v-if="readonly || (!readonly && isVisible && !aVote)">

        <span v-if="!readonly">Noter ce commentaire : </span>

        <image-rating
            v-model="getScore"
            :src="imgPath"
            :increment="0.5"
            :spacing="2"
            :inline="true"
            :read-only="readonly"
            :show-rating="false"
            :item-size="size"
        />
        <span v-if="readonly && color">{{getScore}}/5 • {{ vote }} votants</span>
        <button @click="submit" v-if="!readonly">Envoyer la note ! </button>
    </div>
</template>

<script>
    import VueRateIt from 'vue-rate-it';
    import ImgRating from './../../assets/wine-glass.png';
    import ImgRatingW from './../../assets/glassW.png';
    import ImgRatingB from './../../assets/glassB.png';
    import store from "./../../store/";
    import {EventBusModal} from "../../events/";
    export default {
        name: 'GlassScore',
        components: {
            'image-rating': VueRateIt.ImageRating
        },
        props: {
            score: {
                default: 0,
                type: Number
            },
            vote: {
                default: 0,
                type: Number
            },
            readonly: {
                default: true,
                type: Boolean
            },
            size: {
                default: 18,
                type: Number
            },
            color: {
                default: false,
                type: Boolean
            }, //true : white, false : black
        },
        data: function() {
            return {
                rating: 3,
                aVote:false,
                exist:false,
                scoreD:0
            }
        },
        mounted(){

        },
        computed: {
            imgPath: function () {
                if(this.color === true)
                    return ImgRatingB;
                else
                    return ImgRatingW;
            },isVisible(){

                if(store.state.usr.username){

                    if(store.state.usr.aVote.find(id_comment=>id_comment===this.id_comment)){
                        this.aVote=true
                    }
                    return !this.aVote;
                }else{
                    return true;
                }
            },getScore:{
                get:function(){
                    if(this.score==0) return this.scoreD;
                    return this.score;
                },
                set:function( newScore ){
                    this.scoreD=newScore;

                }
            }
        },
        methods:{
            changeScore( newScore ){
                if(!this.readonly) this.scoreD=newScore;

            },submit(){
                if(store.state.usr.username){
                    this.$emit('newVote', this.scoreD)
                }else{
                    EventBusModal.$emit('neadConnect', true)
                }
            }
        }
    }
</script>
