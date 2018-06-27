<template>
  <div class="story">
        <p><span class="signature">Créée par
            <router-link :to="{ name: 'otherUser', params: { username:story.author} }">
                <span v-if="userStory">vous</span><span v-else>{{ story.author }}</span>
            </router-link> le {{ story.date}}</span>
            <span v-if="userStory">
                <button class="btn-delete btn-purple"  v-on:click="deleteStory" >Supprimer cette histoire</button>
                <button class="btn-modify btn-purple" v-on:click="updateStory">Modifier cette histoire</button>
            </span>
        </p>

        <h2>{{story.title}}</h2>

        <p><span class="signature">Tags : </span><Tag v-for="tag in story.tags" :label="tag" /></p>

        <div v-if="story.image" class="coverWineStory">
            <b-img :src="story.image" fluid :alt="story.title" />
         </div>

        <div v-html="story.text"></div>
        <h3>Vins associés</h3>
        <WineBloc v-for="(wine,index) in story.wines" :key="index" :wine="wine"  />

        <div class="allComments">
            <button type="button" class="btn-purple"  @click="comment">Ajouter un commentaire</button>
            <div v-if="commentsHere">
                <Comment v-for="(comment, index) in story.comments" :key="comment._id"  :comment="comment" />
            </div>
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
          story:{},
          userStory:false,
          toDelete:true,
          commentsHere:false
      }
    },
    props:{
        title:{type:String}
    },
    created(){
        EventBusModal.$emit("loading-loader", true);
        HTTP.get('/wineStory/'+ this.$route.params.id).then(response=>{
            this.story=response.data[0];
            this.story.date=Utils.dateLocale(this.story.date);
            this.userStory=(this.story.author==store.state.usr.username);

        }).then(res=>{
            HTTP.get("/wineStoryGetComments",{params:{comments:this.story.comments}} ).then( response=>{
                this.story.comments= response.data;
                console.log("Comments from Story",this.story.comments);
                this.commentsHere=true;
                EventBusModal.$emit("loading-loader", false);
            })

        });


    },
    mounted(){
      EventBusModal.$on('loading', loading => {

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
            this.$router.push('/wineStories/creation');
        },
        comment(){
            EventBusModal.$emit("Comment", {showModal:true, from:"wineStory"});
        }

  },
  computed:{

  }
  }
</script>
