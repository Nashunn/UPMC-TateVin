    <template>
    <section class="search">

        <div v-if='!wineStory'>
        <div class="mb-3">
            <button @click="displayCreateWine()" class="wine-btn btn-purple">Nouveau vin</button>
        </div>

        <h2 class="mb-0">Recherche</h2>
        <p>Affiner votre recherche</p>
    </div>
    </div>
        <b-card class="search-wrapper">
            <b-form-group label="Catégories : " v-if='!wineStory'>
                <b-form-checkbox-group v-model="search.categories" name="category" :options="optionsCat">
                </b-form-checkbox-group>
            </b-form-group>

            <b-row>
                <b-col md="3" sm="12"><label for="tags">Mots clés : </label></b-col>
                <b-col md="6" sm="12"><input v-model="search.tags" id="tags" type="text"/></b-col>
            </b-row>

            <b-row>
                <b-col md="3" sm="12"><label for="domaine">Domaine : </label></b-col>
                <b-col md="6" sm="12"><input v-model="search.domaine" id="domaine" type="text"/></b-col>
            </b-row>
            <b-row>
                <b-col md="3" sm="12"><label for="terroir">Terroir : </label></b-col>
                <b-col md="6" sm="12"><input v-model="search.terroir" id="terroir" type="text"/></b-col>
            </b-row>
            <b-row>
                <b-col md="3" sm="12"><label for="millesime">Millésime : </label></b-col>
                <b-col md="6" sm="12"><input v-model="search.millesime" id="millesime" type="number"/></b-col>
            </b-row>

            <div class="btn-wrapper">
                <button @click="doSearch()" type="button" class="wine-btn btn-purple">Rechercher</button>
            </div>
        </b-card>

        <div class="" v-if="!wineStory"> 
            <button @click="displayCreateWine()" class="wine-btn btn-purple">Nouveau vin</button>
        </div>
        <div>
            <WineBloc v-for="(wine, index) in results" :key="index" :wine="wine.id" :wineStory="wineStory" value="+" v-on:addWine="$emit('addWine', wine)"/>
        </div>
    </section>
</template>

<script>
    import {EventBusModal} from "./../events/";
    import {HTTP} from "./../HTTP/http";
    import WineBloc from './WineBloc';

    export default {
        name: 'hello',
        components:{WineBloc},
        data() {
            return {
                search: {
                    tags: "",
                    categories: [],
                    domaine: "",
                    terroir: "",
                    millesime: "",
                },
                results:[],
                optionsCat: [
                    {text: 'Vin', value: 'vin'},
                    {text: 'Histoire de vin', value: 'hdv'},
                    {text: 'Apprentissage', value: 'apprentissage'},
                    {text: 'Utilisateur', value: 'utilisateur'},
                    {text: 'Producteur', value: 'producteur'},
                ]
            }
        },
        props:{wineStory:{type:Boolean, default:false}},
        methods: {
            test() {
                EventBusModal.$emit("loading", true);
            },
            doSearch() {
                if(this.wineStory) this.search.categories=["vin"];
                HTTP.get('/search',{  params: this.search }).then(response=>{
                    this.results=response.data[0];
                });
            },
            displayCreateWine() {
                EventBusModal.$emit("winePopup", true);
            }
        }
    }
</script>
