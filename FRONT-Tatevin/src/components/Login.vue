<template>
    <section class="login">
        <h2>Login</h2>
        <form class="">
            <p class="">
                <label for="username">Username : </label>
                <input v-model="credentials.email" type="text" id="username" required/>
            </p>
            <p class="">
                <label for="password">Password : </label>
                <input v-model="credentials.password" type="password" id="password" required/>
            </p>
            <label for="checkbox">Je suis producteur </label> 
            <input type="checkbox" id="signProd" v-model="isProductor">
            <div class="btn-wrapper">
                <button @keyup.enter="submit()" @click="submit()" class="wine-btn btn-purple">Login</button>
            </div>
        </form>
    </section>
</template>
<script>
    import Auth from '../auth/'

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
                });
                
            }
        }
    }

</script>
