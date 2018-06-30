<template>
	<div class="sandbox">
		<h2>Nico bo goss</h2>
		<div v-if="!users"><p>Vide</p></div>
		<div v-else><p v-for="user in users">{{ user.username }}</p></div>
		<input type="text" v-model="nom" />
		<p>Salut {{ nom }}</p>
		<!--<Hello v-else/>-->
	</div>
</template>
<script>
	import {HTTP} from "./../HTTP/http.js";
	import Hello from "./Hello.vue";
	export default{
		components:{Hello},
		data(){
			return {
				users:{},
				nom:"Laura"
			}
		},
		methods:{
			fetchUsers(){
				console.log("fetchUser");
				HTTP.get('users').then(response=>{
					this.users=response.data;
				}).catch(error=>{
					console.log("HTTP marche pas");
					console.log(error);
				});
			}
		},
		created(){
			console.log("created");
			this.fetchUsers();
		}
	}
</script>
