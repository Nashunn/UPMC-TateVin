<template>
    <div class="wine-score-medal">
        <glass-score :score="score" :size="13"/>

        <div class="score">{{ score+"/"+maxScore || "Not noted" }}</div>
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
