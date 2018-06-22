<template>
    <!-- Card -->
    <section id="userProfile">
        <b-container v-if="oUser.username" class="bv-example-row">
        <b-img center :src="oUser.avatar" alt="center image"></b-img>

            <b-row class="text-center">
                <b-col cols="12" class="ink text-center">{{oUser.username}}</b-col>
                <b-col cols="12" class="text-center">{{age}} ans </b-col>
                <b-col class="text-center">{{oUser.description || 'Unknown description'}}</b-col>
            </b-row>
            <b-card no-body>
                <b-tabs card>
                    <b-tab title="Dernières activités" active>
                        <!--v-if="!activite.length"-->
                        <h1 class="text-center" >No activity 😭</h1>
                        <!-- <b-list-group v-else v-for="us in oUser.subscription">
                            <b-list-group-item ></b-list-group-item>
                        </b-list-group> -->
                    </b-tab>
                    <b-tab title="Abonnements">
                        <h1 class="text-center" v-if="! oUser.subscription.length">No subs 😭</h1>
                        <b-list-group v-else v-for="us in oUser.subscription">
                            <b-list-group-item >

                                <b-row>
                                    <b-col cols="2">
                                        <b-img :src="us.avatar" rounded="circle"  width="34" height="34" alt="img"/>
                                    </b-col>
                                    <b-col cols="8"><span>{{us.username}}</span></b-col>
                                    <b-col cols="2">
                                        <b-button disabled v-if="isInSubs(us.username)" class="right">Déjà ajouté</b-button>
                                        <b-button v-else class="right">+</b-button>
                                    </b-col>
                                </b-row>


                            </b-list-group-item>
                        </b-list-group>
                    </b-tab>
                </b-tabs>
            </b-card>
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

    export default {
        data() {
            return {
                oUser: 'unknown',

            }
        },
        computed: {
            age: function () {
                let d1 = new Date().getFullYear();
                let d2 = new Date(this.oUser.birthday).getFullYear();
                return d1 - d2;
            }
        },
        mounted() {
            EventBusModal.$emit("loading-loader", true);
            HTTP.get(`users/` + this.$route.params.username).then(response => {
                this.oUser = response.data[0];
                console.log(this.oUser.subscription.length);
                EventBusModal.$emit("loading-loader", false);
            });
        },
        methods: {
            load() {
                HTTP.get(`users/` + this.$route.params.username).then(response => {
                    this.oUser = response.data[0];
                    console.log(this.oUser);
                });
            },
            isInSubs(username){
                return typeof (this.oUser.subscription.find( usr => usr.title === username)) !== 'undefined';
            }
        },
    }
</script>

