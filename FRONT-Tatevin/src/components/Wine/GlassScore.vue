<template>
    <div class="score-bar">
        <image-rating
            v-model="score"
            :src="imgPath"
            :increment="0.5"
            :inline="true"
            :item-size="20"
        />
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
        },
        computed: {
        }
    }
</script>
