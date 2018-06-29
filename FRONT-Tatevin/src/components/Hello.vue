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
            this.createJSON()
            EventBusModal.$emit('loading-loader', false)
            var that = this;
            if(store.state.usr.username && !store.state.usr.isProd)
            {
                HTTP.get(`users/` + store.state.usr.username).then(response => {
                    this.mainUser = response.data[0];
                    if (this.mainUser.subscription.length !== 0)
                        HTTP.get(`usersByIds/`, { params: {subs: this.mainUser.subscription} } ).then(response => {
                            this.subs = response.data
                            console.log("subs",this.subs);
                            this.subs.forEach(element => {
                                this.getActivity(element.username)

                        })
                    })
                })
            }
            else{
                HTTP.get(`users/sample/15`).then(response => {
                    this.allUser = response.data;
                    this.allUser.forEach(userSample => {
                        HTTP.get('users/'+ userSample.username +'/activity').then(async r => {
                            this.getActivity(userSample.username);
                        });
                    });

                })
            }
        },mounted(){
        },
        methods: {
            createJSON(){
                
                var o = {} // empty Object
                var key = 'Orientation Sensor';
                o[key] = []; // empty Array, which you can push() values into


                var data = {
                    sampleTime: '1450632410296',
                    data: '76.36731:3.4651554:0.5665419'
                };
                var data2 = {
                    sampleTime: '1450632410296',
                    data: '78.15431:0.5247617:-0.20050584'
                };
                o[key].push(data);
                o[key].push(data2);
            },
            getActivity: function (username) {
                var that = this;
              HTTP.get('users/'+username+'/activity').then(r => {
                                    if(r.data.length){
                                    var tmp = r.data
                                    new Promise( (resolve, reject) => {
                                        tmp.forEach(el => {
                                        resolve(
                                            that.activityType(el, username ))
                                        }
                                        )
                                    }).then(() => {
                                        this.activity.push(...tmp);
                                    });
                                    }
                                });
            },
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
