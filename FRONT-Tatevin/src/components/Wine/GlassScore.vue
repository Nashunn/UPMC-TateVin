<template>
    <div class="score-bar">
        <image-rating
            v-model="score"
            :src="imgPath"
            :increment="0.5"
            :spacing="2"
            :inline="true"
            :read-only="readonly"
            :show-rating="false"
            :item-size="size"
        />
    </div>
</template>

<script>
    import VueRateIt from 'vue-rate-it';
    import ImgRating from './../../assets/wine-glass.png';
    import ImgRatingW from './../../assets/glassW.png';
    import ImgRatingB from './../../assets/glassB.png';

    export default {
        name: 'GlassScore',
        components: {
            'image-rating': VueRateIt.ImageRating
        },
        props: {
            score: {
                default: 0,
                type: Number
            },
            vote: {
                default: 0,
                type: Number
            },
            readonly: {
                default: true,
                type: Boolean
            },
            size: {
                default: 18,
                type: Number
            },
            color: {
                default: false,
                type: Boolean
            }, //true : white, false : black
        },
        data: function() {
            return {
                rating: 3,
            }
        },
        mounted(){

        },
        computed: {
            imgPath: function () {
                if(this.color === true)
                    return ImgRatingB;
                else
                    return ImgRatingW;
            }
        }
    }
</script>
