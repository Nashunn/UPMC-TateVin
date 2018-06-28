<template>
    <section class="winesPage" >
        <div class="mb-3">
            
            <button @click="displayCreateWine()" class="wine-btn btn-purple">Nouveau vin</button>
        </div>

        <h2>Vins</h2>
         <div class="pagination-section center" v-if="pages>0">
        <ul class="pagination text-center">
            <li @click="fetchPagination(Number(current) - 1)" v-if="current != 1" class="waves-effect"><a class="a-hover"><icon name="chevron-left" color="black" ></icon></a></li>
            <li @click="fetchPagination(1)" v-if="current != 1" ><a class="a-hover">First</a></li>

              <li v-for="i in range" v-if="i == current" class="active"><a>{{i}}</a></li>
              <li @click="fetchPagination(i)" v-else ><a class="a-hover">{{i}}</a></li>
              <li v-for="i in range" v-if="i == Number(i) + 4 && i < pages" class="disabled"><a>...</a></li>

            <li @click="fetchPagination(pages)" v-if="(current != pages)"><a class="a-hover">Last</a></li>
            <li v-if="(current != pages)"  @click="fetchPagination(Number(current) + 1)"  class="waves-effect"><a class="a-hover"><icon name="chevron-right" color="black" ></icon></a></li>
        </ul>
        </div>
        <WineBloc v-for="(wine,index) in wines" :wineObP="wine" :key="index" />
    </section>
</template>

<script>
    import { HTTP } from "../HTTP/http";
    import {EventBusModal} from "./../events/";
    import WineBloc from './WineBloc';

    export default {
        name: 'WinesPage',
        components:{WineBloc},
        data () {
            return {
                wines: [],
                pages: 0,
                current:1,
                count : (Number(this.current) > 5 ? Number(this.current) - 4 : 1),
                i:0
            }
        },
             watch: { 
      	wines: function(newVal, oldVal) { // watch it
          this.wines = newVal
        }
      },
        mounted(){
            // Get all wines
            this.fetchPagination(this.current);
            EventBusModal.$emit("loading-loader", true);

        },
        created(){
        },
        computed:{
            range: function(){
            var array = [],
            j = 0;
            for(var z = this.count ; z <= (Number(this.current) + 4) && z <= this.pages; z++){
                array[j] = z;
                j++;
            }
            return array;
            }
        },
        methods:{
            displayCreateWine() {
                EventBusModal.$emit("winePopup", true);
            },
            fetchPagination(page){
                EventBusModal.$emit("loading-loader", true);
                HTTP.get(`wines/pagination/`+ page ).then(response => {
                this.current = response.data.current;
                this.pages = response.data.pages;
                this.wines = response.data.wines
                this.i++;
                console.log(this.wines)
                EventBusModal.$emit("loading-loader", false);
            });
            
    },
        }
    }
</script>
