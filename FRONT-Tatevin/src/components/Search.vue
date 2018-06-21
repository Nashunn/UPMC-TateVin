<template>
    <section class="hello">
        <h2>Recherche</h2>
        <p>Affiner votre recherche</p>

        <div class="search-wrapper">


            <input v-model="searchValue" @keyup.enter="doSearch()" type="text"/>
            <div class="btn-wrapper">
                <button @click="doSearch()" class="wine-btn btn-purple">Rechercher</button>
            </div>
        </div>

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
                searchValue: "",
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
