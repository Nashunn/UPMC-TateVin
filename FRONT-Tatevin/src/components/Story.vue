<template>
  <div class="hello">
      <p v-if="userStory"><button v-on:click="deleteStory">Supprimer cette histoire</button>
          <button v-on:click="updateStory">Modifier cette histoire</button>
      </p>
      <p>Créée par <router-link :to="{ name: 'otherUser', params: { username:story.author} }">{{ story.author }}</router-link> le {{ story.date}} </p>
      <div v-if="story.image" class="coverWineStory">
        <b-img :src="story.image" fluid :alt="story.title" />
        </div>
        <h2>{{story.title}}</h2>
        <p>Tags : <Tag v-for="tag in story.tags" :label="tag" /></p>
        <div v-html="story.text"></div>
        <h3>Vins associés</h3>
        <WineBloc v-for="(wine,index) in story.wines" :key="index" :wine="wine"  />
        <div>
            <button type="button" @click="comment">Ajouter un commentaire</button>
            <Comment v-for="comment in story.comments" :key="comment._id"  :comment="comment" />
        </div>
  </div>
</template>

<script>
  import { EventBusModal } from "./../events/";
  import {HTTP} from "../HTTP/http";
  import Utils from "./../utils/";
  import store from "./../store/"
  import Tag from './Tag';
  import WineBloc from './WineBloc';
  import Delete from "./Popup/Delete"
  import Comment from "./Comment"
  export default {
    name: 'hello',
    components:{Delete, Tag, WineBloc, Comment},
    data () {
      return {
          story:{
              comment:{}
          },
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
            this.userStory=(this.story.author==store.state.usr.username);

        }).then(res=>{
            HTTP.get("/wineStoryGetComments",{params:{comments:this.story.comments}}, function(err, res){
                if(err) console.log(err);
            } ).then(response=>{
                this.story.comments=response.data;
            })
            console.log(this.story.comments);
        });


    },
    mounted(){
      EventBusModal.$on('loading', loading => {
        alert("coucou")
    });
        EventBusModal.$on('updateComments', comment=>{
            this.story.comments.push(comment);
        });

    },
    methods:{
      test() {
        EventBusModal.$emit("loading", true);
        },
        deleteStory(){
            EventBusModal.$emit("Delete", true);
        },
        updateStory(){
            store.state.story=this.story;
            this.$router.push('/wineStories/creation');
        },
        comment(){
            EventBusModal.$emit("Comment", true);
        }

  },
  computed:{

  }
  }
</script>
