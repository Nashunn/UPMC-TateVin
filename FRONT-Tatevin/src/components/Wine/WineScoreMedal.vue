<template>
    <div class="wine-score-medal">
        <glass-score :score="score" :size="13" :increment="0.01"/>

        <div class="score">{{ score!==null?(score+"/"+maxScore):"*/5" }}</div>
        <div class="nb-vote">{{ vote }} votant{{ vote>1?"s":"" }}</div>
    </div>
</template>

<script>
    import GlassScore from "./GlassScore";

    export default {
        name: 'WineScoreMedal',
        components: {
            GlassScore,
        },
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
    }
</script>
