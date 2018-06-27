<template>
    <div class="comment">
        <div class="signature">
            <p class="fleft">Ecrit par
                <router-link :to="{ name: 'otherUser', params: { username: user || 'unknown' } }">{{ user || 'unknown' }}</router-link>
                le {{ getDate}}

            </p>
            <p class="">
                    <GlassScore v-if="comment.like.vote>0" :score="getScore" :vote="comment.like.vote" :maxScore="comment.like.maxScore"  :color="true"/>
                    <span v-else>Ce commentaire n'a pas encore été noté. </span>
            </p>



                <!--<GlassVote :maxScore="comment.like.maxScore" v-on:newVote="addVote($event)" :id_comment="comment._id"/>-->
        </div>
        <div class="message">
                    <p v-html="comment.message"></p>
        </div>
        <GlassScore v-if="isVisible" class="fright" :maxScore="comment.like.maxScore"  :color="true" :readonly="false" v-on:newVote="addVote($event)" :id_comment="comment._id" :wine="false"/>
        <p v-else>Vous avez déjà noté ce commentaire</p>
    </div>
</template>
<script>
import {HTTP} from "../HTTP/http";
import Utils from "./../utils/";
import GlassScore from "./Wine/GlassScore";
import GlassVote from "./Wine/GlassVote";
import store from "./../store/"
export default {
    name: "comment",
    components:{GlassScore, GlassVote},
    props:{
        comment:{type:Object, default:{}}
    },
    data(){
        return{
            user:"",
            aVote:false
        }
    },
    created(){
        this.getUser()
    },
    computed:{
        getDate(){
            return Utils.dateLocale(this.comment.date)
        },
        getScore(){
            var score= Number((this.comment.like.score/this.comment.like.vote).toFixed(1));
            return score;
        },
        isVisible(){

            if(store.state.usr.username){

                if(store.state.usr.aVote.find(id_comment=>id_comment===this.comment._id)){
                    this.aVote=true
                }

                return !this.aVote;
            }else{
                return true;
            }
        }

    },
    methods:{
        addVote( newScore ){
            HTTP.put('comment/'+this.comment._id,{
                score:newScore
            }).then(response=>{
                this.comment.like.vote=this.comment.like.vote+1;
                this.comment.like.score+=newScore;
                store.commit("aVote", this.comment._id);
                this.aVote=true;
            })
        },
        getUser(){
            if(typeof(this.comment.author)!=="undefined"){
                HTTP.get('/user/'+this.comment.author).then(response=>{
                    this.user=response.data.username;
                    return response.data.username;
                });
            }
        }
    }
}
</script>
