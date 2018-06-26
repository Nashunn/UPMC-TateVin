<template>
    <div class="comment">
        <p>Ecrit par <router-link :to="'/user/'+getUser">{{ user }}</router-link> le {{ getDate}} </p>
        <div>
            <div>
            Note :
                <GlassScore v-if="comment.like.vote>0" :score="getScore" :vote="comment.like.vote" :maxScore="comment.like.maxScore" />
                <span v-else>Ce commentaire n'a pas encore été noté.{{ comment.like.vote }} </span>
            </div>
            <div>
                <span>Noter ce commentaire : </span>
                <GlassVote :maxScore="comment.like.maxScore" v-on:newVote="addVote($event)"/>
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
    },
    computed:{
        getDate(){
            return Utils.dateLocale(this.comment.date)
        },
        getUser(){
            if(typeof(this.comment.author)!=="undefined"){
                HTTP.get('/user/'+this.comment.author).then(response=>{
                    this.user=response.data.username;
                    return response.data;
                });
            }
        },getScore(){
            console.log("CALCUL", this.comment.like.score+" / "+this.comment.like.vote)
            var score= Math.round((this.comment.like.score/this.comment.like.vote));
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

            })
        }
    }
}
</script>
