<template>
    <div class="score-bar">

        <span v-if="!readonly && !wine">Noter ce commentaire : </span>

        <image-rating
            v-model="getScore"
            :src="imgPath"
            :increment="increment"
            :spacing="2"
            :inline="true"
            :read-only="readonly"
            :show-rating="false"
            :item-size="size"
            @rating-selected="submit"
        />
        <span v-if="readonly && !wine">{{getScore}}/5 • {{ vote }} votants</span>
    <!--<button @click="submit" v-if="!readonly" style="margin-bottom: 15px; line-height: normal; " class="ml-3 wine-btn btn-purple">Envoyer la note ! </button>-->
    </div>
</template>

<script>
    import VueRateIt from 'vue-rate-it';
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
            increment: {
                default: 0.5,
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
            },
            wine:{
                default:true,
                type:Boolean
            } //true : white, false : black
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
            },
            getScore:{
                get:function(){
                    if(this.score==0) return Number(this.scoreD);
                    return Number(this.score);
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
                    this.$emit('newVote', this.scoreD);
                }else{
                    EventBusModal.$emit('needConnect', true)
                }
            }
        }
    }
</script>
