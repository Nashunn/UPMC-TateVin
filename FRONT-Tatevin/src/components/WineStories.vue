<template>
  <div class="hello">
      <router-link :to="{ name: 'WineStoryCreation' }">Ecrire une nouvelle histoire</router-link>
      <StoryBloc v-for="story in stories" :story="story" :key="story.id" />
  </div>
</template>

<script>
  import { EventBusModal } from "./../events/";
  import StoryBloc from './StoryBloc';
  import {HTTP} from "../HTTP/http";
  export default {
    name: 'WineStories',
    components:{StoryBloc},
    data () {
      return {
          stories:[]
      }
    },
    mounted(){
      EventBusModal.$on('loading', loading => {

      })
    },
    methods:{
      test() {
        EventBusModal.$emit("loading", true);
      }
  },
  created(){
      EventBusModal.$emit("loading-loader", true);
      HTTP.get('/wineStory').then(response=>{
          this.stories=response.data;
          EventBusModal.$emit("loading-loader", false);
      });
  }
  }
</script>
