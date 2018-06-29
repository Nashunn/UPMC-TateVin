<template>
    <section class="login">
        <h2>Connexion</h2>
        <b-alert :show="pbm"
             fade
             dismissible
             variant="danger"> L'email / le mot de passe n'est pas correct
        </b-alert>
        <b-form class="">
            <b-form-group label="Email :"
                    label-for="username">
                <b-form-input v-model="credentials.email" type="text" id="username" required/>
            </b-form-group>
            <b-form-group label="Mot de passe :"
                    label-for="password">
                <b-form-input v-model="credentials.password" type="password" id="password" required/>
            </b-form-group>

                <b-form-checkbox  id="signProd" v-model="isProductor">Je suis producteur </b-form-checkbox>
            </b-form-group>
            <b-form-group>
                <div class="btn-wrapper">
                    <button @keyup.enter="submit()" @click="submit()" class="wine-btn btn-purple" type="button">Se connecter</button>
                </div>
        </b-form-group>
        </b-form>
    </section>
</template>
<script>
    import Auth from '../auth/'
    import store from '../store/'
    import {EventBusModal} from "../events/";

    export default {
        name: 'login',
        data() {
            return {
                credentials: {
                    email: '',
                    password: ''
                },
                isProductor: false,
                error: '',
                pbm:false
            }
        },
        methods: {
            validateBeforeSubmit() {
                this.submit();
            },
            submit() {
                this.pbm=false;
                new Promise( (resolve, reject) => {
                    resolve(
                        Auth.login(this, this.credentials, "secretquote", this.isProductor)
                    )

                })

            }
        },
        created(){
            EventBusModal.$on("connexion", result=>{
                if(result){
                    this.pbm=false;
                    this.$router.push('/');
                }else{
                    this.pbm=true;
                }

            })
        }
    }

</script>
