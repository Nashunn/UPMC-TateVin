<template>
    <div class="score-bar">
        <span v-for="j in maxScore" v-if="score>=j" @click="changeScore(j)"><icon name="glass" color="purple" ></icon></span>
        <span v-for="j in maxScore" v-if="score<j" @click="changeScore(j)"><icon name="glass" color="grey" ></icon></span>
        <button @click="$emit('newVote', score)">Envoyer la note ! </button>
    </div>
</template>

<script>
    export default {
        name: 'GlassScore',
        props: {
            maxScore: {type:Number,default:5}
        },
        data(){
            return {
                score:0
            }
        },
        computed: {
            emptyGlass: function() {
                return (this.maxScore - this.score);
            }
        },
        methods:{
            changeScore( newScore ){
                this.score=newScore;
            }
        }
    }
</script>
