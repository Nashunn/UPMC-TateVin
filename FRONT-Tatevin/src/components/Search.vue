<template>
    <section class="hello">
        <h2>Recherche</h2>
        <p>Affiner votre recherche</p>

        <b-card class="search-wrapper">
            <b-form-group label="Catégories : ">
                <b-form-checkbox-group v-model="search.categories" name="category" :options="optionsCat">
                </b-form-checkbox-group>
            </b-form-group>

        
            <p class="m4">
                <label for="tags">Mots clés : </label>
                <input v-model="search.tags" id="tags" type="text"/>
            </p>

            <p class="m4">
                <label for="domaine">Domaine : </label>
                <input v-model="search.domaine" id="domaine" type="text"/>
            </p>
            <p class="m4">
                <label for="terroir">Terroir : </label>
                <input v-model="search.terroir" id="terroir" type="text"/>
            </p>
            <p class="m4">
                <label for="millesime">Millésime : </label>
                <input v-model="search.millesime" id="millesime" type="number"/>
            </p>

            <div class="btn-wrapper">
                <button @click="doSearch()" class="wine-btn btn-purple">Rechercher</button>
            </div>
        </b-card>

        <div class="">
            <button @click="displayCreateWine()" class="wine-btn btn-purple">Nouveau vin</button>
        </div>

    </section>
</template>

<script>
    import {EventBusModal} from "./../events/";

    export default {
        name: 'hello',
        data() {
            return {
                search: {
                    tags: [],
                    categories: [],
                    domaine: "",
                    terroir: "",
                    millesime: "",
                },
                optionsCat: [
                    {text: 'Vin', value: 'vin'},
                    {text: 'Histoire de vin', value: 'hdv'},
                    {text: 'Apprentissage', value: 'apprentissage'},
                    {text: 'Utilisateur', value: 'utilisateur'},
                    {text: 'Producteur', value: 'producteur'},
                ]
            }
        },
        created() {
            EventBusModal.$on('loading', loading => {
                alert("coucou")
            })
        },
        methods: {
            test() {
                EventBusModal.$emit("loading", true);
            },
            doSearch() {
                alert("Todo");
            },
            displayCreateWine() {
                EventBusModal.$emit("winePopup", true);
            }
        }
    }
</script>
