<template>
  <div class="hello">
      <p v-if="userStory"><button v-on:click="deleteStory">Supprimer cette histoire</button></p>
      <p>Créée par <router-link :to="{ name: 'otherUser', params: { username:story.author} }">{{ story.author }}</router-link> le {{ story.date}} </p>
      <div v-if="story.image" class="coverWineStory">
        <b-img :src="story.image" fluid :alt="story.title" />
        </div>
        <h2>{{story.title}}</h2>
        <p v-for="paragraphe in p">{{ paragraphe }}</p>
  </div>
</template>

<script>
  import { EventBusModal } from "./../events/";
  import {HTTP} from "../HTTP/http";
  import Utils from "./../utils/";
  import store from "./../store/"
  import Delete from "./Popup/Delete"
  export default {
    name: 'hello',
    components:{Delete},
    data () {
      return {
          story:{},
          p:[],
          userStory:false,
          toDelete:true
      }
    },
    props:{
        title:{type:String}
    },
    created(){
        HTTP.get('/wineStory/'+ this.$route.params.id).then(response=>{
            this.story=response.data[0];
            this.story.date=Utils.dateLocale(this.story.date);


            this.p=Utils.getParagraphe(this.story.text);
            this.userStory=(this.story.author==store.state.usr.username);
        });


    },
    mounted(){
      EventBusModal.$on('loading', loading => {
        alert("coucou")
      })
    },
    methods:{
      test() {
        EventBusModal.$emit("loading", true);
        },
        deleteStory(){
            EventBusModal.$emit("Delete", true);
        }
  },
  computed:{
      getHTML:function(){

      }
  }
  }
</script>
