<template>
        <div class="score-bar" v-if="isVisible && !aVote">
            <span>Noter ce commentaire : </span>
            <span v-for="j in maxScore" v-if="score>=j" @click="changeScore(j)"><icon name="glass" color="purple" ></icon></span>
            <span v-for="j in maxScore" v-if="score<j" @click="changeScore(j)"><icon name="glass" color="grey" ></icon></span>
            <button @click="submit">Envoyer la note ! </button>
        </div>
        <div v-else><p>Vous avez déjà noté ce commentaire</p></div>
</template>

<script>
    import store from "./../../store/";
    import {EventBusModal} from "../../events/";
    export default {
        name: 'GlassVote',
        props: {
            maxScore: {type:Number,default:5},
            id_comment:{type:String, default:"test"}
        },
        data(){
            return {
                score:0,
                aVote:false,
                exist:false
            }
        },
        computed: {
            emptyGlass: function() {
                return (this.maxScore - this.score);
            }
            ,isVisible(){
                if(store.state.usr.username){
                    if(store.state.usr.aVote.find(id_comment=>id_comment===this.id_comment)){
                        this.aVote=true
                    }
                    return !this.aVote;
                }else{
                    return true;
                }

            }
        },
        methods:{
            changeScore( newScore ){
                this.score=newScore;

            },submit(){
                if(typeof(store.state.usr.username)!=="undefined"){
                    this.$emit('newVote', this.score)
                }else{
                    EventBusModal.$emit('neadConnect', true)
                }
            }

        }
    }
</script>
