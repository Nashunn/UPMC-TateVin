<template>
    <!-- Card -->
    <section id="userProfile">
                <b-img center :src="oUser.avatar" class="profile-img text-center" alt="profile image"></b-img>

                <div class="text-center mt-4 mb-4">
                    <b-col >
                        <b-button  class="wine-btn btn-purple">Contacter</b-button>
                        <span>{{oUser.email}}</span>
                        <b-button  class="wine-btn btn-purple">Appeler</b-button>
                        <span>{{oUser.phone}}</span>
                    </b-col>

                </div>

                <b-row class="text-center">
                    <b-col cols="12" class="ink text-center">
                        {{oUser.username}}
                    </b-col>
                    <b-col class="text-center mt-2">{{oUser.description || 'Pas de description'}}</b-col>
                </b-row>
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
    import HDVImage  from './../assets/img/hdv.svg'
    import ScoreImage  from './../assets/img/like.svg'
    import moment from 'moment-timezone'
    import Utils from "./../utils/";
    import _ from 'lodash';

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
                activity:{},
                isEdit: false,

            }
        },
        components: {
            vueDropzone: vue2Dropzone,
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
                var that =this;
                EventBusModal.$emit("loading-loader", true);
                HTTP.get(`producers/` + path).then(response => {
                    this.oUser = response.data[0];
                    EventBusModal.$emit("loading-loader", false);
                });
            },
            isInSubs(username) {
                return typeof (store.state.usr.subscription.find(usr => usr === username)) !== 'undefined';
            },
            afterComplete(file) {
                this.uUser.avatar = file.dataURL;
            },
            isCurrentUser() {
                return this.oUser.username === store.state.usr.username
            },
            activityType: async function (ac) {
                if(ac.hasOwnProperty('food'))
                {
                    await HTTP.get("/wine/"+ac.id_wine).then( async response =>{
                        ac.roadName = await  response.data[0].name
                    })
                    ac.type = ScoreImage;
                    ac.road = "/wine/"+ac.id_wine
                    ac.date = Utils.dateLocaleHours(ac.date)

                }
                /*if(ac.hasOwnProperty('like'))
                {
                    ac.type = "./../assets/img/like.svg";
                    ac.road = "/wine/"+ac.id_wine
                    ac.date = Utils.dateLocaleHours(ac.date)
                    await HTTP.get("/wine/"+ac.id_wine).then(async  response =>{
                        console.log("fffff",response)
                        ac.roadName = await response.data[0].name
                    })
                }*/
                if(ac.hasOwnProperty('title'))
                {
                    ac.type = HDVImage;
                    ac.road = "/story/"+ac.id
                    ac.date = Utils.dateLocaleHours(ac.date)
                    ac.roadName = _.truncate(ac.title, {'length': 25})
                }

            },
            update() {
                EventBusModal.$emit("loading-loader", true);
                HTTP.put(`users/` + this.oUser.username, this.uUser).then(response => {
                    store.commit("instanceUser", response.data);
                    EventBusModal.$emit("loading-loader", false);
                    this.$router.push('/user')
                });
            },
            add(idUserToAdd) {
                EventBusModal.$emit("loading-loader", true);
                HTTP.put(`users/` + store.state.usr.username + '/' + idUserToAdd).then(response => {
                    store.commit("incrementSubs", idUserToAdd);
                    EventBusModal.$emit("loading-loader", false);
                })
            },
            remove(idUserToRm) {
                EventBusModal.$emit("loading-loader", true);
                HTTP.delete(`users/` + store.state.usr.username + '/' + idUserToRm).then(response => {
                    this.subsDetails = this.subsDetails.filter( ids => ids._id !== idUserToRm);
                    store.commit("updateSubs", response.data);
                    EventBusModal.$emit("loading-loader", false);
                });
            }
        },
        d(){
            console.log(this.LLLL);
        }
    }
</script>
