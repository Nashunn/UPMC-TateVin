<template>
    <section class="login">
        <h2>Login</h2>
        <form class="">
            <p>fdddddp</p>
            <p class="">
                <label for="username">Username : </label>
                <input v-model="credentials.email" type="text" id="username" required/>
            </p>
            <p class="">
                <label for="password">Password : </label>
                <input v-model="credentials.password" type="password" id="password" required/>
            </p>
            <div class="btn-wrapper">
                <button @keyup.enter="submit()" @click="submit()" class="btn">Login</button>
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
                error: '',
            }
        },
        methods: {
            validateBeforeSubmit() {
                this.submit();
            },
            submit() {
                new Promise( (resolve, reject) => {
                    resolve(Auth.login(this, this.credentials, "secretquote"));
                }).then(() => this.$router.push( '/'))
            }
        }
    }

</script>
