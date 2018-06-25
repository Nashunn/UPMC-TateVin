<template>
    <div class="score-bar">
        <span v-for="i in score"><icon name="glass"></icon></span>
        <span v-for="o in emptyGlass">V</span>
    </div>
</template>

<script>
    import {ImageRating} from 'vue-rate-it';

    export default {
        name: 'GlassScore',
        components: {
            ImageRating
        },
        data: {
            src: "./../../assets/glass.svg",
            rating: 3,
        },
        props: {
            score: Number,
            vote: Number,
            maxScore: Number,
        },
        computed: {
            emptyGlass: function() {
                return (this.maxScore - this.score);
            }
        }
    }
</script>