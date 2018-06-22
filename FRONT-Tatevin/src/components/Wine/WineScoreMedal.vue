<template>
    <div class="wine-score-medal">
        <div>
            <span v-for="i in score">Y</span>
            <span v-for="o in emptyGlass">!</span>
        </div>

        <div class="score">{{ score+"/"+maxScore || "Not noted" }}</div>
        <div class="nb-vote">{{ vote }} votant{{ vote>=1?"s":"" }}</div>
    </div>
</template>

<script>
    import {HTTP} from "../../HTTP/http";

    export default {
        name: 'WineScoreMedal',
        props: {
            score: Number,
            vote: Number,
        },
        data() {
            return {
                maxScore: 5,
            }
        },
        mounted() {
        },
        methods: {
        },
        computed: {
            emptyGlass: function() {
                return (this.maxScore - this.score);
            }
        }
    }
</script>
