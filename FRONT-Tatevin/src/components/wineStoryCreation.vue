<template>
    <section class="signup">
        <h2>Créez votre hitoire de vin</h2>

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
import store from './../store'


export default {
    name: 'Signup',
    components: {
        vueDropzone: vue2Dropzone
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
            error:'',
        }
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
        created(){
        },
        submit() {
            console.log(store.state.usr.username)
            HTTP.post("/wineStory", this.story).then(()=>this.$router.push('/wineStories'));
            /*
            new Promise( (resolve, reject) => {

                //resolve(auth.signup(this, this.story, true));
            }).then(() => this.$router.push( '/'))*/
        }
    }
}
</script>
