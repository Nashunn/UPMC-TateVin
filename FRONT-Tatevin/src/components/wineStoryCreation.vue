<template>
    <section class="signup">
        <h2>Créez votre histoire de vin</h2>

        <form @submit.prevent="validateBeforeSubmit()" class="">
            <p class="">
                <label for="username">Titre : </label>
                <input v-model="story.title" type="text" id="username" required/>
            </p>
            <p>{{ story.title }}</p>
            <p class="">
                <label for="text">Votre histoire</label>
                <wysiwyg v-model="story.text" />
            </p>
            <p>{{ story.text }}</p>
            <p>
                <vue-dropzone
                    ref="userAvatar"
                    id="dropzone"
                    :options="dropzoneOptions"
                    @vdropzone-complete="afterComplete"
                />
            </p>
            <h3>Tags associés</h3>
            
            <Tag v-for="tag in story.tags" :label="tag" :key="tag"/>
            <p v-show="tagExists">Le tag {{tagToAdd }} est déjà enregistré.</p>
            <p>Ajouter un tag :  <Autocomplete :items="tagList" ref="newTag"/> <b-button v-on:click="addTag">+</b-button></p>
            <div class="btn-wrapper">
                <button type="submit" ref="btnSubmit">Signup</button>
            </div>
            <p>{{error}}</p>
        </form>
    </section>
</template>

<script>
import {HTTP} from "../HTTP/http";
import auth from "../auth/index"
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.css";
import store from './../store';
import Tag from './Tag';
import Autocomplete from './Autocomplete';

export default {
    name: 'Signup',
    components: {
        vueDropzone: vue2Dropzone,
        Tag, Autocomplete
    },
    data () {
        return {
            dropzoneOptions: {
                url: "https://httpbin.org/post",
                thumbnailWidth: 150,
                maxFiles: 1,
                maxFilesize: 0.5,
                addRemoveLinks: true,
                headers: { "My-Awesome-Header": "header value" },
                accept: function accept(file, done) {
                    done();
                }
            },
            story: {
                title: "",
                text: "",
                image: "",
                wines: [],
                tags: ["test"],
                author:store.state.usr.username
            },
            tagToAdd:"test",
            tagExists:false,
            tagList:[],
            error:'',
        }
    },
    created(){
            HTTP.post("/tags/", {type:"DIVERS"},{}).then(response=>{
                for(var i=0; i<response.data.length;i++){
                    this.tagList.push(response.data[i].label);
                };
            })
        },
    methods: {
        validateBeforeSubmit() {
            //add more security
            this.submit();
        },
        afterComplete(file) {
            console.log(file);
            this.story.image = file.dataURL;
        },
        
        submit() {
            
            HTTP.post("/wineStory", this.story).then(()=>{
                this.$router.push('/wineStories')
            });
            
        },
        addTag(){

            var exist=true;
            console.log(this.story.tags.find(tag=>tag===this.$refs.newTag.search));
            if(typeof(this.story.tags.find(tag=>tag===this.$refs.newTag.search))==="undefined"){
                this.story.tags.push(this.$refs.newTag.search);
            }else{
                this.tagExists=true;
            }
        },
        initTag(){
            this.tagExists=false;
        }
    },
}
</script>
