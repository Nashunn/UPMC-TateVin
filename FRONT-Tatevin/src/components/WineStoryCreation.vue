<template>
    <section class="signup">
        <h2>Créez votre histoire de vin</h2>
        <button type="button" @click="emptyForm">Reinitialiser le formulaire</button>
        <form @submit.prevent="validateBeforeSubmit()" class="">
            <p class="">
                <label for="username">Titre : </label>
                <input v-model="story.title" type="text"  required/>
            </p>
            <p class="">
                <label for="text">Votre histoire</label>
                <wysiwyg v-model="story.text"/>
            </p>
            <p>
                <vue-dropzone
                    ref="userAvatar"
                    id="dropzone"
                    :options="dropzoneOptions"
                    @vdropzone-complete="afterComplete"
                />
            </p>
            <h3>Vins associés</h3>
            <WineBloc v-for="(wine, index) in story.wines" :key="index" :wineObP="wine" value="-" :wineStory="true" v-on:addWine="removeWine(index)" />
            <h3>Associer un nouveau vin</h3>
            <Search :wineStory="true" v-on:addWine="addWine($event)"/>

            <h3>Tags associés</h3>
            <Tag v-for="(tag,index) in story.tags" :label="tag" v-on:deleteTag="deleteTag(index)" :canBeDelete="true" :key="index"/>
            <p v-show="tagExists">Le tag {{tagToAdd }} est déjà enregistré.</p>
            <p>Ajouter un tag :  <Autocomplete :items="tagList" ref="newTag"/> <b-button v-on:click="addTag">+</b-button></p>
            <div class="btn-wrapper">
                <button type="submit" ref="btnSubmit"><span v-if="creation">Créer</span> <span v-else>Modifier</span> l'histoire de vin</button>
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
import WineBloc from './WineBloc';
import Autocomplete from './Autocomplete';
import Search from './Search';

export default {
    name: 'wineStoryCreation',
    components: {
        vueDropzone: vue2Dropzone,
        Tag, Autocomplete, Search,WineBloc
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
                tags: [],
                author:store.state.usr.username
            },
            tagToAdd:"test",
            tagExists:false,
            indexTag:-1,
            tagList:[],
            error:'',
            creation:true
        }
    },
    created(){
            if(typeof(this.$route.params.id)!=="undefined"){
                HTTP.get('/wineStory/'+ this.$route.params.id).then(response=>{
                    this.story=response.data[0];
                    this.creation=false;
                }).then(()=>{
                 HTTP.get('/winesByStory/'+this.$route.params.id, {params:{wines:this.story.wines}}).then(response=>{
                        this.story.wines=response.data;

                    })
                });
            };
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
            this.story.image = file.dataURL;
        },

        submit() {

            if(this.creation){
                HTTP.post("/wineStory", this.story).then(()=>{
                    this.$router.push('/wineStories')
                });
            }else{
                HTTP.put("/wineStory/"+this.story._id, { params: this.story}).then(()=>{
                    this.$router.push('/story/'+this.$route.params.id);
                });
            }


        },
        emptyForm(){
            this.story={};
        },
        addTag(){

            var exist=true;

            if(typeof(this.story.tags.find(tag=>tag===this.$refs.newTag.search))==="undefined"){
                this.story.tags.push(this.$refs.newTag.search);
            }else{
                this.tagExists=true;
            }

        },
        deleteTag( index ){
            this.story.tags.splice(index,1);

        },
        initTag(){
            this.tagExists=false;
        },
        addWine( wine ){
            if(this.story.wines.indexOf(wine)==-1){
                this.story.wines.push(wine);
            }


        },
        removeWine( index ){
            this.story.wines.splice(index,1);

        }
    },
}
</script>
