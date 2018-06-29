<template>
    <section class="login">
        <h2>Connexion</h2>
        <b-alert :show="pbm"
             fade
             dismissible
             variant="danger"> L'email / le mot de passe n'est pas correct
        </b-alert>
        <form class="">
            <p class="">
                <label for="username">Email : </label>
                <input v-model="credentials.email" type="text" id="username" required/>
            </p>
            <p class="">
                <label for="password">Mot de passe : </label>
                <input v-model="credentials.password" type="password" id="password" required/>
            </p>
            <label for="checkbox">Je suis producteur </label>
            <input type="checkbox" id="signProd" v-model="isProductor">
            <div class="btn-wrapper">
                <button @keyup.enter="submit()" @click="submit()" class="wine-btn btn-purple" type="button">Se connecter</button>
            </div>
        </form>
    </section>
</template>
<script>
    import Auth from '../auth/'
    import store from '../store/'

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
                new Promise( (resolve, reject) => {
                    resolve(Auth.login(this, this.credentials, "secretquote", this.isProductor));
                }).then(() => {
                        this.$router.push('/');


                },()=>{this.pbm=true; alert("pbm")});

            }
        }
    }

</script>
