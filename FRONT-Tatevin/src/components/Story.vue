<template>
  <div class="hello">
      <p>Créée par <router-link :to="{ name: 'otherAccount', params: {} }">{{ story.author }}</router-link> le {{ story.date}} </p>
      <div v-if="story.image" class="coverWineStory">
        <b-img :src="story.image" fluid :alt="story.title" />
        </div>
        <h2>{{story.title}}</h2>
        <p>{{story.text}}</p>

  </div>
</template>

<script>
  import { EventBusModal } from "./../events/";
  import {HTTP} from "../HTTP/http";
  export default {
    name: 'hello',
    data () {
      return {
          story:{}
      }
    },
    props:{
        title:{type:String}
    },
    created(){
        console.log(this.$route.params.id)
        HTTP.get('/wineStory/'+ this.$route.params.id).then(response=>{
            this.story=response.data[0];
            var date=this.story.date;
            var options= {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
            this.story.date=new Date(date).toLocaleDateString('fr-FR', options);
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
      }
    }
  }
</script>
