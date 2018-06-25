<template>
    <!-- Card -->
    <section id="userProfile">
        <b-container v-if="oUser.username.length > 0" class="bv-example-row">

            <div v-if="isEdit  "> <!-- && oUser.username === store.usr.username-->
                <p>
                    <vue-dropzone
                            ref="userAvatar"
                            id="dropzone"
                            :options="dropzoneOptions"
                            @vdropzone-complete="afterComplete"
                    />
                </p>
                <b-row>
                    <b-col sm="3"><label> Username </label></b-col>
                    <b-col sm="9">
                        <b-form-input v-model="uUser.username" type="text"></b-form-input>
                    </b-col>
                </b-row>

                <b-row>
                    <b-col sm="3"><label> Email </label></b-col>
                    <b-col sm="9">
                        <b-form-input v-model="uUser.email" type="email"></b-form-input>
                    </b-col>
                </b-row>

                <b-row>
                    <b-col sm="3"><label> Date de naissance </label></b-col>
                    <b-col sm="9">
                        <b-form-input v-model="uUser.birthday" type="date"></b-form-input>
                    </b-col>
                </b-row>

                <b-row>
                    <b-col sm="3"><label> Description </label></b-col><!-- wysiwyg-->
                    <b-col sm="9">
                        <b-form-input v-model="uUser.description" type="text"></b-form-input>
                    </b-col>
                </b-row>

                <!-- <b-row>
                     <b-col sm="3"><label> Ancien mot de passe </label></b-col>
                     <b-col sm="9"><b-form-input v-model="uUser.mdp" type="password"></b-form-input></b-col>
                 </b-row>

                 <b-row>
                     <b-col sm="3"><label> Nouveau mot de passe </label></b-col>
                     <b-col sm="9"><b-form-input v-model="uUser.mdpNew" type="password"></b-form-input></b-col>
                 </b-row>-->
                <button class="text-center" @click="update()">Mettre à jour</button>
                <button class="text-center" @click="isEdit=false">Cancel</button>
            </div>

            <div v-else>
                <b-img center :src="oUser.avatar" alt="center image"></b-img>

                <p v-if="isCurrentUser()" @click="isEdit=true">mod</p>
                <p v-else @click="add"> add </p>

                <b-row class="text-center">
                    <b-col cols="12" class="ink text-center">
                        {{oUser.username}}
                    </b-col>
                    <b-col cols="12" class="text-center">{{age}} ans</b-col>
                    <b-col class="text-center">{{oUser.description || 'Unknown description'}}</b-col>
                </b-row>
                <b-card no-body>
                    <b-tabs card>
                        <b-tab title="Dernières activités" active>
                            <!--v-if="!activite.length"-->
                            <h1 class="text-center">No activity 😭</h1>
                            <!-- <b-list-group v-else v-for="us in oUser.subscription">
                                <b-list-group-item ></b-list-group-item>
                            </b-list-group> -->
                        </b-tab>
                        <b-tab  :title="'Abonnement (' + (this.subsDetails.length || '0') + ')'">
                            <h1 class="text-center" v-if=" subsDetails.length === 0">No subs 😭</h1>
                            <b-list-group v-else v-for="us in subsDetails">
                                <b-list-group-item>
                                    <b-row>
                                        <b-col cols="2">
                                            <b-img :src="us.avatar" rounded="circle"  width="34" height="34" alt="img"/>
                                            </b-col>
                                            <b-col cols="8">  <router-link :to="'/user/'+us.username">{{us.username}}</router-link> </b-col>
                                            <b-col v-if="isCurrentUser" cols="2">
                                                <b-button @click="remove" class="right">-</b-button>
                                            </b-col>
                                            <b-col v-else>
                                                <b-button disabled v-if="isInSubs(us.username)" class="right">Déjà ajouté</b-button>
                                                <b-button @click="add" v-else class="right">+</b-button>

                                        </b-col>
                                    </b-row>

                                </b-list-group-item>
                            </b-list-group>
                        </b-tab>
                    </b-tabs>
                </b-card>
            </div>

        </b-container>
        <p v-else>
            No user found 🤔
        </p>

    </section>
    <!-- End card -->
</template>

<style>
    #userProfile {
        margin-top: 15px;
    }

    .ink {
        font-size: 22px;
        font-weight: bold;
        -webkit-text-decoration: #690029 solid underline;
        text-decoration: #690029 solid underline;
        -webkit-text-decoration-skip: ink;
        text-decoration-skip: ink;
    }
</style>
<script>
    import {EventBusModal} from "./../events/";
    import {HTTP} from "./../HTTP/http";
    import vue2Dropzone from "vue2-dropzone";
    import "vue2-dropzone/dist/vue2Dropzone.css";
    import store from './../store';
    import Vue from 'vue';
    import moment from 'moment-timezone'

    Vue.use(require('vue-moment'));
    export default {
        data() {
            return {
                dropzoneOptions: {
                    url: "https://httpbin.org/post",
                    thumbnailWidth: 150,
                    maxFiles: 1,
                    maxFilesize: 0.5,
                    addRemoveLinks: true,
                    headers: {"My-Awesome-Header": "header value"},
                    accept: function accept(file, done) {
                        done();
                    }
                },
                oUser: {
                    username: '',
                    birthday: '',
                    description: '',
                },
                subsDetails: [],
                isEdit: false,

            }
        },
        components: {
            vueDropzone: vue2Dropzone
        },
        computed: {
            age: function () {
                return moment().diff(new Date(this.oUser.birthday), 'years');
            },
            uUser: function () {
                var clone = Object.assign({}, this.oUser)
                //clone.mdpNew = '',
                //clone.mdp = ''  
                return clone;
            },
        },
        mounted() {
            this.loadUser(this.$route.params.username);
        },
        beforeRouteUpdate(to, from, next) {
            this.loadUser(to.params.username)
            next()
        },
        methods: {
            loadUser(path){
                EventBusModal.$emit("loading-loader", true);
                HTTP.get(`users/` + path).then(response => {
                    this.oUser = response.data[0];
                    console.log(this.oUser.subscription);
                    if (this.oUser.subscription.length !== 0)
                        HTTP.get(`usersByIds/`, { params: {subs: this.oUser.subscription} } ).then(response => {
                            this.subsDetails = response.data
                        })
                    EventBusModal.$emit("loading-loader", false);
                });
            },
            isInSubs(username) {
                return typeof (this.oUser.subscription.find(usr => usr.title === username)) !== 'undefined';
            },
            afterComplete(file) {
                console.log(file);
                this.uUser.avatar = file.dataURL;
            },
            isCurrentUser() {
                return this.oUser.username === store.state.usr.username
            },
            update() {
                EventBusModal.$emit("loading-loader", true);
                HTTP.put(`users/` + this.oUser.username, this.uUser).then(response => {
                    store.commit("instanceUser", response.data);
                    EventBusModal.$emit("loading-loader", false);
                    this.$router.push('/user')

                });
            },
            add() {
                EventBusModal.$emit("loading-loader", true);
                HTTP.put(`users/` + this.$route.params.username + '/' + this.oUser._id, {subs: this.oUser._id}).then(response => {
                    EventBusModal.$emit("loading-loader", false);
                })
            },
            remove() {
                EventBusModal.$emit("loading-loader", true);
                HTTP.delete(`users/` + this.$route.params.username + '/' + this.oUser.username).then(response => {
                    EventBusModal.$emit("loading-loader", false);
                });
            }
        },
    }
</script>

