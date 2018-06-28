<template>

    <div class="wineBloc" >

        <WineColor :color="wineOb.type" class="icon"/>
        <!--<GlassScore v-if="wine.like.vote>0" :score="getScore" :vote="comment.like.vote" :maxScore="comment.like.maxScore"  :color="true"/>-->
        <router-link :to="{ name: 'Wine', params: {id: wineOb._id } }">
            <span class="wineName">{{ wineOb.name }} ({{ wineOb.millesime }})</span>
        </router-link>
        <button v-if="wineStory" v-on:click="$emit('addWine', wineOb)" type="button">{{ value }}</button>
    </div>
    </template>
<script>
import {HTTP} from "../HTTP/http";
import WineColor from "./Wine/WineColor"
import GlassScore from "./Wine/GlassScore";

export default {
    name: 'wineBloc',
    components:{
        WineColor,
        GlassScore,
    },
    props:{
        wine:{type:String, default:""},
        wineStory:{type:Boolean, default:false},
        value:{type:String, default:""},
        wineObP:{type:Object, default:{}}
    },
     watch: { 
      	wineObP: function(newVal, oldVal) { // watch it
          this.wineOb = newVal
        }
      },
    data(){
        return {
            wineOb:{},
            wineScore: {},
        }
    },
    created(){
        if(this.wine!==""){
            HTTP.get("wine/"+this.wine).then(response=>{
                this.wineOb=response.data[0];
                this.wineScore=response.data[1];
            });
        }else{
            this.wineOb=this.wineObP;
        }

    }
}
</script>
