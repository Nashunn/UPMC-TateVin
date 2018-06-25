<template>

    <div class="wines" >
        <router-link :to="{ name: 'Wine', params: {id: wineOb.id } }">
            {{ wineOb.name }} ({{ wineOb.millesime }})
        </router-link>
        <button v-if="wineStory" v-on:click="$emit('addWine', wine)" type="button">{{ value }}</button>
    </div>
    </template>
    <script>
    import {HTTP} from "../HTTP/http";
export default {
    name: 'wineBloc',
    props:{
        wine:{type:String, default:""},
        wineStory:{type:Boolean, default:false},
        value:{type:String, default:""}
    },
    data(){
        return {wineOb:{}}
    },
    created(){
        HTTP.get("wine/"+this.wine).then(response=>{
            this.wineOb=response.data;
        });
    }
}
</script>
