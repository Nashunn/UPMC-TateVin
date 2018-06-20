<template>
    <section class="signup">
        <h2>Signup</h2>

        <form @submit.prevent="validateBeforeSubmit()" class="">
            <p class="">
                <label for="username">Username : </label>
                <input v-model="credentials.username" type="text" id="username" required/>
            </p>
            <p class="">
                <label for="username">Email : </label>
                <input v-model="credentials.email" type="email" id="email" required/>
            </p>
            <p class="">
                <label for="password">Password : </label>
                <input v-model="credentials.password" type="password" id="password" required/>
            </p>
            <p class="">
                <label for="passwordconf">Password Confirmation : </label>
                <input v-model="credentials.passwordConf" type="password" id="passwordconf" required/>
            </p>
            <p class="">
                <label for="birthdate">Birth date : </label>
                <input v-model="credentials.birthdate" type="date" id="birthdate" required/>
            </p>
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
            credentials: {
                avatar: "",
                username: "",
                pseudo: "",
                email: "",
                birthdate: "",
                password: "",
                passwordConf: ""
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
            this.credentials.avatar = file.dataURL;
        },
        checkPass() {
            if (this.credentials.password !== this.credentials.passwordConf) {
                this.passMsg = "Passwords don't match !";
                this.$refs.btnSubmit.disabled = true;
            } else {
                this.passMsg = "Passwords matches !";
                this.$refs.btnSubmit.disabled = false;
            }
        },
        submit() {
            var that = this;
            console.log(this.credentials);

            /*var p1 = new Promise(function(resolve, reject) {
                resolve(auth.signup(this, that.credentials, "secretquote"));
            });

            p1
            .then(function(value) {
                console.log(value); // "Succès!"
                HTTP.get("/account").then(response => {
                    let user = response.data;
                    that.$store.commit("instanceUser",user);
                    console.log(user)
                    EventBusModal.$emit('usr-loaded', user);
                });
                throw "Inscription impossible";
            })
            .catch(function(e) {
                console.error(e);
            })
            .then(function(e) {
                that.error = e;
            });*/
        }
    }
}
</script>
