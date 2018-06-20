<template>
    <section class="login">
        <h2>Login</h2>
        <form class="">
            <p class="">
                <label for="username">Username : </label>
                <input v-model="credentials.username" type="text" id="username" required/>
            </p>
            <p class="">
                <label for="password">Password : </label>
                <input v-model="credentials.password" type="password" id="password" required/>
            </p>
            <div class="btn-wrapper">
                <button @keyup.enter="submit()" @click="submit()" class="btn-next tb-btn btn-red right">Login</button>
            </div>
        </form>
    </section>
</template>

<script>
import auth from "./../auth/index";

export default {
    name: 'Login',
    data () {
        return {
            credentials: {
                username: '',
                password: ''
            },
            error: '',
        }
    },
    methods: {
        validateBeforeSubmit() {
            //add more security
            this.submit();
        },
        submit() {
            var credentials = {
                username: this.credentials.username,
                password: this.credentials.password
            };

            auth.login(this, credentials, "secretquote");
        }
    }
}
</script>
