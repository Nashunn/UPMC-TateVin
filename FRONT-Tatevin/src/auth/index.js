import {HTTP} from "./../HTTP/http";
//import {EventBusModal} from "../events/event-modals";
import store from './../store'
import {EventBusModal} from "../events/";

export default {
    user: {},

    login(context, creds, redirect, isProd) {
        HTTP.post((isProd ? "/producer" : '' )+ "/login", {email: creds.email, password: creds.password}, {})
            .then(async response => {
                await localStorage.setItem("id_token", response.data.token);
                await this.getAccount(isProd);
                EventBusModal.$emit("connexion", true);
                return true;
            })
            .catch(function (error) {
                console.log(error);
                EventBusModal.$emit("connexion", false);
                return false;
            });
    },



    signup(context, creds, redirect) {
        HTTP.post("/register",
            {
                email: creds.email,
                username: creds.username,
                password: creds.password,
                birthday: new Date(creds.birthday),
                avatar: creds.avatar
            }, {}
        )
            .then(async response => {
                await localStorage.setItem("id_token", response.data.token);
                await this.getAccount(false);
                EventBusModal.$emit("signUp", true);
            })
            .catch(function (error) {
                console.log(error);
                EventBusModal.$emit("signUp", false);
                return error
            });
    },

    signupProductor(context, creds, redirect) {
        HTTP.post("/registerProductor",
            {
                email: creds.email,
                username: creds.username,
                password: creds.password,
                avatar: creds.avatar,
                siret: creds.siret,
                phone : creds.phone,
                adresse: creds.adresse,
                website: creds.website
            }, {}
        )
            .then(async response => {
                await localStorage.setItem("id_token", response.data.token);
                await this.getAccount(true);
            })
            .catch(function (error) {
                console.log(error);
                return error
            });
    },

    getAccount(isProd){
        HTTP.get( (isProd ? "/producer" : '') +'/account', {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('id_token'),
                authorization: localStorage.getItem('id_token'),
                'x-access-token': localStorage.getItem('id_token'),
                Accept: "application/json"
            }
        }).then(response => {
            console.log("account", response.data)
            response.data.isProd = isProd ? true : false;
            store.commit("instanceUser", response.data);
        }).catch(()=>{

        });
    },

    logout() {
        localStorage.removeItem("id_token");
        store.commit("destroyUser");
        this.user.authenticated = false;
    },


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
