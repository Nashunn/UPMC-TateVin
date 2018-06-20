import { HTTP } from "./../HTTP/http";
import auth from "./../auth/index";
//import {EventBusModal} from "../events/event-modals";

export default {
    user: {},

    login(context, creds, redirect) {
        var that = this;

        HTTP.post(
            "/login",
            {
                email: creds.username,
                password: creds.password
            }
        )
            .then( async response => {
                console.log(response.data);
                await localStorage.setItem("id_token", response.data.token);
                that.getUserData(context)
                //EventBusModal.$emit("change-state-login", false)
                if (redirect) {
                    //context.$router.replace("/dashboard"); //modal = false
                    //context.$showModal = false;
                    // should be : context.$router.replace("/");
                }
            })
            .catch(function(error) {
                console.log(error);
            });
    },

    signup(context, creds, redirect) {
        HTTP.post(
            "/register",
            {
                email: creds.email,
                username: creds.username,
                password: creds.password,
                birthday: new Date(creds.birthday),
                avatar: creds.avatar
            },
            {
                //headers: auth.getAuthHeader()
            }
        )
            .then( async response => {
                console.log(response.data);
                await localStorage.setItem("id_token", response.data.token);
                that.getUserData(context)
                //EventBusModal.$emit("change-state-login", false)
                if (redirect) {
                    context.$router.replace("/");
                    // should be : context.$router.replace("/");
                }
            })
            .catch(function(error) {
                return error;
                console.log(error);
            });
    },

    getUserData(context){
        HTTP.get('account', { headers: {
                Authorization: "Bearer " + localStorage.getItem('id_token'),
                authorization: localStorage.getItem('id_token'),
                'x-access-token': localStorage.getItem('id_token'),
                Accept: "application/json"
            }}).then( async response => {
            console.log(response.data)
            await context.$store.commit("instanceUser", response.data);
        });
    },

    signupErasable(context, creds, redirect) {
        context.$http
            .post(SIGNUP_URL, creds, data => {
                localStorage.setItem("id_token", data.id_token);

                this.user.authenticated = true;

                if (redirect) {
                }
            })
            .error(err => {
                context.error = err;
            });
    },

    logout(context) {
        localStorage.removeItem("id_token");
        context.$store.commit("destroyUser");

        this.user.authenticated = false;
    },

    onChange() {},

    checkAuth() {
        var jwt = localStorage.getItem("id_token");
        if (jwt) {
            this.user.authenticated = true;
        } else {
            this.user.authenticated = false;
        }
    },

    loggedIn() {
        console.log(localStorage.getItem("id_token"));
        return localStorage.getItem("id_token");
    },

    getAuthHeader() {
        return {
            Authorization: "Bearer " + localStorage.getItem("id_token")
        };
    }
};
