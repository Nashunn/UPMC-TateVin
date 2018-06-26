<template>
    <div class="comment">
        <p>Ecrit par <router-link :to="{ name: 'otherUser', params: { username: user || 'unknown' } }">{{ user || 'unknown' }}</router-link> le {{ getDate}} </p>
        <div>
            <div>
            Note :
                <GlassScore v-if="comment.like.vote>0" :score="getScore" :vote="comment.like.vote" :maxScore="comment.like.maxScore"  :color="true"/>
                <span v-else>Ce commentaire n'a pas encore été noté.{{ comment.like.vote }} </span>
            </div>
            <div>
                <GlassScore  :maxScore="comment.like.maxScore"  :color="true" :readonly="false" v-on:newVote="addVote($event)" :id_comment="comment._id" :wine="false"/>
                <!--<GlassVote :maxScore="comment.like.maxScore" v-on:newVote="addVote($event)" :id_comment="comment._id"/>-->
            </div>
        </div>
        <p v-html="comment.message"></p>
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
            user:""
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
            console.log("CALCUL", this.comment.like.score+" / "+this.comment.like.vote)
            var score= Number((this.comment.like.score/this.comment.like.vote).toFixed(1));
            return score;
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
