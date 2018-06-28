<template>
    <section class="signup">
        <h2>Signup</h2>

        <form @submit.prevent="validateBeforeSubmit()" class="">
            <p class="">
                <label for="username">{{ this.isProductor ? "Name" : "Username" }} : </label>
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
            <p class="" v-show="!isProductor">
                <label for="birthday">Birth date : </label>
                <input v-model="credentials.birthday" type="date" id="birthday" />
            </p>
            <label for="checkbox">Etes-vous producteur ? : </label> 
            <input type="checkbox" id="checkbox" v-model="isProductor">
            <div v-show="isProductor" >
                <p class="">
                    <label for="siret">Siret : </label>
                    <input v-model="productor.siret" type="text" id="siret" />
                </p>
                <p class="">
                    <label for="website">Website : </label>
                    <input v-model="productor.website" type="text" id="website" />
                </p>
                <p class="">
                    <label for="adresse">Adresse : </label>
                    <input v-model="productor.adresse" type="text" id="adresse" />
                </p>
                <p class="">
                    <label for="phone">Phone : </label>
                    <input v-model="productor.phone" type="tel" size="20" id="phone"/>
                </p>
            </div>
            <p>
                <vue-dropzone
                    ref="userAvatar"
                    id="dropzone"
                    :options="dropzoneOptions"
                    @vdropzone-complete="afterComplete"
                />
            </p>
            <div class="btn-wrapper">
                <button type="submit" ref="btnSubmit" class="wine-btn btn-purple">Signup</button>
            </div>
            <p v-if="errors.length">
                <b>Please correct the following error(s):</b>
                <ul>
                    <li v-for="error in errors">{{ error }}</li>
                </ul>
            </p>
          </form>
    </section>
</template>

<script>
import {HTTP} from "../HTTP/http";
import auth from "../auth/index"
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.css";
    import {EventBusModal} from "./../events/";

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
                birthday: "",
                password: "",
                passwordConf: ""
            },
            productor:{},
            isProductor: false,
            errors:[],
        }
    },
    methods: {
        validateBeforeSubmit() {
            //add more security
            this.errors = [];
            if(this.isProductor)
            {
                if(!this.validAttribute(this.productor.siret, /^[0-9]{14}/ )) 
                    this.errors.push("Valid SIRET required.");
                if(!this.validAttribute(this.productor.website, /(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/ )) 
                    this.errors.push("Valid Website required.");

            }
            if(!this.errors.length) this.submit();;
        },
        validAttribute:function(attribute, regex) {
            var re = regex
            return re.test(attribute);
        },
        afterComplete(file) {
            console.log(file);
            this.credentials.avatar = file.dataURL;
        },
        created(){
            console.log(this.$store.state.usr);
                                EventBusModal.$emit("loading-loader", false);
        },
        submit() {
            if(!this.isProductor)
            {
                new Promise( (resolve, reject) => {
                    resolve(auth.signup(this, this.credentials, true));
                }).then(() => this.$router.push( '/'))
            }else{
                this.productor.username = this.credentials.username;
                this.productor.password = this.credentials.password;
                this.productor.email = this.credentials.email;
                this.productor.avatar = this.credentials.avatar;
                new Promise( (resolve, reject) => {
                    resolve(auth.signupProductor(this, this.productor, true));
                }).then(() => this.$router.push( '/'))
            }
        }
    }
}
</script>
