    <template>
    <section class="search">

        <div v-if='!wineStory'>
        <div class="mb-3">
            <button @click="displayCreateWine()" class="wine-btn btn-purple">Nouveau vin</button>
        </div>

        <h2 class="mb-0">Recherche</h2>
        <p>Affiner votre recherche</p>
    </div>

        <b-card class="search-wrapper">
            <b-form-group label="Catégories : " v-if='!wineStory'>
                <b-form-checkbox-group v-model="search.categories" name="category">
                    <b-form-checkbox value="vin" @change="selection('wine')">Vin</b-form-checkbox>
                    <b-form-checkbox value="user" @change="selection('user')">Utilisateur</b-form-checkbox>
                    <b-form-checkbox value="hdv" @change="selection('story')">Histoire de vin</b-form-checkbox>

                  </b-form-checkbox-group>
                <!--<b-form-checkbox-group v-model="search.categories" name="category" :options="optionsCat" >
                </b-form-checkbox-group>-->
            </b-form-group>
            <b-row v-if="wineSelected || wineStory">
                <button type="button"  @click="addBarCode()">Rechercher par scan du code-barre</button>
            </b-row>
            <b-row >
                <b-col md="3" sm="12"><label for="tags">
                    <span v-if="userSelected || wineSelected || wineStory">Nom</span> <span v-if="storySelected">Tags associés (séparés par une virgule)</span>
                 </label></b-col>
                <b-col md="6" sm="12"><input v-model="search.tags" id="tags" type="text" v-if="wineSelected || wineStory || userSelected || storySelected"/></b-col>
            </b-row>
            <b-row v-if="wineSelected || wineStory">
                <b-col md="3" sm="12"><label for="domaine">Domaine : </label></b-col>
                <b-col md="6" sm="12"><input v-model="search.domaine" id="domaine" type="text"/></b-col>
            </b-row>
            <b-row v-if="wineSelected || wineStory">
                <b-col md="3" sm="12"><label for="domaine">Type : </label></b-col>
                <b-col md="6" sm="12"> <b-form-select v-model="search.type" :options="optionsType" class="mb-3" /></b-col>
            </b-row>
            <b-row v-if="wineSelected || wineStory">
                <b-col md="3" sm="12"><label for="terroir">Terroir : </label></b-col>
                <b-col md="6" sm="12"><input v-model="search.terroir" id="terroir" type="text"/></b-col>
            </b-row>
            <b-row v-if="wineSelected || wineStory">
                <b-col md="3" sm="12"><label for="millesime">Millésime : </label></b-col>
                <b-col md="6" sm="12"><input v-model="search.millesime" id="millesime" type="number"/></b-col>
            </b-row>

            <div class="btn-wrapper" v-if="wineSelected || wineStory || userSelected || storySelected">
                <button @click="doSearch()" type="button" class="wine-btn btn-purple">Rechercher</button>
            </div>
        </b-card>
        <span v-model="stopload"></span>
        <!--
        <div class="" v-if="!wineStory">
            <button @click="displayCreateWine()" class="wine-btn btn-purple">Nouveau vin</button>
        </div>-->
        <div v-for="(result, index) in results"  :key="index">
            <WineBloc v-if="result.type" :wineObP="result" value="+" :wineStory="wineStory" v-on:addWine="$emit('addWine', $event)"/>
            <p v-if="result.email"><router-link :to="{ name: 'otherUser', params: { username:result.username} }">{{ result.username }}</router-link></p>
            <p v-if="result.author"><router-link :to="{ name: 'Story', params: { id:result.id} }">{{ result.title }}</router-link></p>
        </div>
        <AddBarCode v-show="showScanPopUp" :wineStory="wineStory" v-on:addWine="sendAndClose($event)"/>
    </section>
</template>

<script>
    import {EventBusModal} from "./../events/";
    import {HTTP} from "./../HTTP/http";
    import WineBloc from './WineBloc';
    import AddBarCode from './Popup/AddBarCode';
    export default {
        name: 'hello',
        components:{WineBloc, AddBarCode},
        data() {
            return {
                wineSelected:false,
                storySelected:false,
                userSelected:false,
                showScanPopUp:false,
                search: {
                    tags: "",
                    categories: [],
                    domaine: "",
                    terroir: "",
                    millesime: "",
                    type:""
                },
                results:[],
                optionsType: [
                    { value: null, text: 'Quel type de vin cherchez vous ?' },
                    { value: 'rouge', text: 'Rouge' },
                    { value: 'blanc', text: 'Blanc' },
                    { value: 'rosee', text: 'Rosé' },
                ],
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
        created(){
            EventBusModal.$on('addBarCode', showPopup=>{
                this.showScanPopUp=false;
            });
        },
        methods: {
            test() {
                EventBusModal.$emit("loading", true);
            },
            doSearch() {
                if(this.wineStory) this.search.categories=["vin"];
                HTTP.get('/search',{  params: this.search }).then(response=>{
                    this.results=response.data[0];
                    console.log(this.results);
                });
            },
            displayCreateWine() {
                EventBusModal.$emit("winePopup", true);
            },stopload(){
                EventBusModal.$emit("loading-loader", false);
            },selection( type ){
                if(type==="wine") this.wineSelected=!this.wineSelected;
                if(type==="story")  this.storySelected=!this.storySelected;
                if(type==="user")  this.userSelected=!this.userSelected;
            },
            addBarCode(){
                    this.showScanPopUp=true;
            },sendAndClose( wineToAdd ){
                this.$emit('addWine', wineToAdd);
                this.showScanPopUp=false;
            }
        }
    }
</script>
