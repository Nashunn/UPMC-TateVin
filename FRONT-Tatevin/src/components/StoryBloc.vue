<template>

        <div class="storyBloc">
            <div v-if="story.image" class="vignette">
                <b-img :src="story.image" fluid :alt="story.title" />
             </div>
             <div class="storyPres">
                 <router-link :to="{ name: 'Story', params: { id:story.id} }">{{ story.title }}</router-link>
                 <p class="signature">Ecrite par <router-link :to="{ name: 'otherUser', params: { username:story.author} }">{{ story.author }}</router-link> le {{getDate}}</p>
            </div>
        </div>

</template>

<script>
  import { EventBusModal } from "./../events/";
import Utils from "./../utils/";
  export default {
    name: 'hello',
    data () {
      return {
      }
    },
    props:{
        story:Object,
    },
    mounted(){
      EventBusModal.$on('loading', loading => {

      })
    },
    methods:{
      test() {
        EventBusModal.$emit("loading", true);
      }
  },computed:{
    getDate(){

         return Utils.dateLocale( this.story.date);
    }
  }
  }
</script>
