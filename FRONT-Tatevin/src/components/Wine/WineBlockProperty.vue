<template>
    <div class="wine-bloc-property greyGradient">
        <div class="title">{{ title }}</div>
        <div class="desc text-wrap"><span>{{ desc!=="null"?desc:"Non renseigné" }}</span></div>
        <div class="add-desc text-wrap hover-underline" v-if='desc==="null"' @click="goModify()"><span>Renseigner</span></div>
    </div>
</template>

<script>
    export default {
        name: 'WineBlockProperty',
        props: {
            title: String,
            desc: String,
        },
        methods: {
            goModify() {
                this.$router.push('/wine/m/'+this.$route.params.id);
            }
        },
    }
</script>
