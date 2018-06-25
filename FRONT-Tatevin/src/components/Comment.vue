<template>
    <div class="comment">
        <p>Ecrit par <router-link :to="'/user/'+getUser">{{ user }}</router-link> le {{ getDate}} </p>
        <p>Note :
            <Note note="4" />
        </p>
        <p v-html="comment.message"></p>
    </div>
</template>
<script>
import {HTTP} from "../HTTP/http";
import Utils from "./../utils/";
import Note from "./Note";
export default {
    name: "modalWine",
    components:{Note},
    props:{
        comment:{type:Object}
    },
    data(){
        return{
            user:""
        }
    },
    created(){

    },
    computed:{
        getDate(){
            return Utils.dateLocale(this.comment.date)
        },
        getUser(){
            if(typeof(this.comment.author)!=="undefined"){
                HTTP.get('/user/'+this.comment.author).then(response=>{
                    this.user=response.data.username;
                    return response.data;
                });
        }
        }

    }
}
</script>
