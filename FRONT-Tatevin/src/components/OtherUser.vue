<template>
    <!-- Card -->
    <section  class="row">
        <p >tt {{oUsr.username}}</p>
        <h1 @click="load">{{msf}}</h1>
    </section>
    <!-- End card -->
</template>

<script>
    import {EventBusModal} from "./../events/";
    import {HTTP} from "./../HTTP/http";
    export default {
        data() {
            return {
                oUsr: '',
                msf:''
            }
        },
        created() {
            console.log(this.oUser);
            EventBusModal.$emit("loading-loader", true);
            HTTP.get(`users/`+ this.$route.params.username ).then(response => {
                this.oUser = response.data[0];
                console.log(this.oUser);
                this.msf = 'coucou'

                EventBusModal.$emit("loading-loader", false);
            });
        },
        methods:{
            load(){
                HTTP.get(`users/`+ this.$route.params.username ).then(response => {
                    this.oUser = response.data[0];
                    console.log(this.oUser);
                });
            }

        },
    }
</script>

