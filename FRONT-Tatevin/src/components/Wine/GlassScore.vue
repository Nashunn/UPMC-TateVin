<template>
    <div class="score-bar">
        <!--span v-for="i in score"><icon name="glass"></icon></span>
        <span v-for="o in emptyGlass">V</span-->

        <image-rating :src="imgPath" :increment="0.5" :inline="true" :item-size="20"></image-rating>
    </div>
</template>

<script>
    import VueRateIt from 'vue-rate-it';
    import ImgRating from './../../assets/wine-glass.png';

    export default {
        name: 'GlassScore',
        components: {
            'image-rating': VueRateIt.ImageRating
        },
        data: function() {
            return {
                rating: 3,
                imgPath:''
            }
        },
        created(){
            this.imgPath = ImgRating;
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
