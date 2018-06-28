<template>
    <div class="hello" v-show="activity.length !== 0">
        <h1>Bienvenue sur Tâtevin !</h1>

        <p>La meilleure expérience de partage autour du vin.</p>

        <h2>Actualités</h2>
        <b-list-group v-for="ac in activity">
            <b-list-group-item >
                <b-row>
                    <b-col cols="3" class="text-center"> {{ ac.username }} </b-col>
                    <b-col cols="2">
                        <b-img :src="ac.type" rounded="circle"  width="34" height="34" alt="img"/>
                    </b-col>
                    <b-col cols="3" class="text-center">  {{ac.score ? ac.score + '/5' : ''}} </b-col>
                    <b-col cols="4" class="text-center">  <router-link :to="ac.road" v-if="ac.roadName">{{ac.roadName}}</router-link> </b-col>
                    <b-col cols="3" class="text-center"> {{ ac.date }} </b-col>

                </b-row>
            </b-list-group-item>
        </b-list-group>
        <WinesPage />
    </div>
</template>

<script>
 import { EventBusModal } from "./../events/";
 import WinesPage from "./WinesPage";
 import store from "./../store/";
import {HTTP} from "./../HTTP/http";
import HDVImage  from './../assets/img/hdv.svg'
import ScoreImage  from './../assets/img/like.svg'
    import Utils from "./../utils/";
    import _ from 'lodash';

    export default {
        name: 'hello',
        components:{WinesPage},
        data() {
            return {
                subs:[],
                mainUser:{},
                activity:[],
                allUser:[]

            }
        },
        created(){
            EventBusModal.$emit('loading-loader', false)

            var that = this;
            if(store.state.usr.username && !store.state.usr.isProd)
            {
                alert('user')
                HTTP.get(`users/` + store.state.usr.username).then(response => {
                    this.mainUser = response.data[0];
                    if (this.mainUser.subscription.length !== 0)
                        HTTP.get(`usersByIds/`, { params: {subs: this.mainUser.subscription} } ).then(response => {
                            this.subs = response.data
                            console.log("subs",this.subs);
                            this.subs.forEach(element => {
                                HTTP.get('users/'+element.username+'/activity').then(r => {
                                    var tmp = r.data
                                    console.log(tmp);
                                        new Promise( (resolve, reject) => {
                                                tmp.forEach(el => {
                                                resolve(
                                                    that.activityType(element   , element.username ))
                                                }
                                            )
                                        }).then(() => {
                                            this.activity.push(...tmp);
                                        });
                                });
                            });
                        })
                })
            }
            else{
                alert('chelou')

                HTTP.get(`users/sample/7`).then(response => {
                    this.allUser = response.data;
                    this.allUser.forEach(userSample => {
                        HTTP.get('users/'+ userSample.username +'/activity').then(async r => {
                            if(r.data.length){
                            var tmp = r.data
                                new Promise( (resolve, reject) => {
                                        tmp.forEach(el => {
                                        resolve(
                                            that.activityType(el, userSample.username ))
                                        }
                                    )
                                }).then(() => {
                                    this.activity.push(...tmp);
                                });
                            }

                        });
                    });

                })
            }
        },mounted(){

        },
        methods: {
              activityType: async function (ac, username) {
                if(ac.hasOwnProperty('food'))
                {
                    await HTTP.get("/wine/"+ac.id_wine).then( async response =>{
                        ac.roadName = await  response.data[0].name
                    })
                    ac.type = ScoreImage;
                    ac.road = "/wine/"+ac.id_wine
                    ac.date = Utils.dateLocaleHours(ac.date)
                    ac.username = username
                }

                if(ac.hasOwnProperty('title'))
                {
                    ac.type = HDVImage;
                    ac.road = "/story/"+ac.id
                    ac.date = Utils.dateLocaleHours(ac.date)
                    ac.roadName = _.truncate(ac.title, {'length': 25}),
                    ac.username = username
                }
            },
        }
    }
</script>
