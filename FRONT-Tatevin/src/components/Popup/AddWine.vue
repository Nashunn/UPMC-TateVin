<template>
    <!-- Connection Popup -->
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <!-- modal header -->
                        <div class="modal-header">
                            <h4 class="modal-title">Ajouter un vin</h4>
                            <button type="button" class="close" @click="close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <!-- end of modal header -->
                        <!-- modal body -->
                        <div class="modal-body">
                            <b-row class="ml-1 mb-1">
                                <label class="w-25" for="name">Nom : </label>
                                <b-form-input
                                    type="text"
                                    id="name"
                                    class="w-50"
                                    placeholder="Entrez le nom"
                                    v-model="credentials.name"
                                />
                            </b-row>
                            <b-row class="ml-1 mb-1">
                                <label class="w-25" for="pwd">Millésime: </label>
                                <b-form-input
                                    type="number"
                                    id="pwd"
                                    class="w-50"
                                    placeholder="Entrez le millésime"
                                    v-model="credentials.millesime"
                                    @keyup.enter="checkBeforeSubmit"
                                />
                            </b-row>

                            <b-row class="ml-1 mb-1">
                                <label class="w-25" for="type">Type : </label>
                                <b-form-select
                                    id="type"
                                    class="w-50"
                                    v-model="credentials.type"
                                    :options="optionsType" />
                            </b-row>

                            <p class="error-text">{{ error }}</p>

                            <div class="btn-wrapper">
                                <button ref="btnSubmit" @click="checkBeforeSubmit" class="wine-btn btn-purple">Ajouter</button>
                            </div>
                        </div>
                        <!-- end of modal body -->
                    </div>
                </div>
            </div>
        </div>
    </transition>
    <!-- End Connection Popup -->
</template>

<style>
    .modal-mask {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .5);
        display: table;
        transition: opacity .3s ease;
    }

    .modal-wrapper {
        display: table-cell;
        vertical-align: middle;
    }

</style>
<script>
    import {EventBusModal} from "../../events/";
    import {HTTP} from "../../HTTP/http";

    export default {
        name: "modalWine",
        data() {
            return {
                credentials:{
                    name:"",
                    millesime:"",
                    type:""
                },
                optionsType:[
                    { value: "rouge", text:"Rouge" },
                    { value: "rosee", text:"Rosée" },
                    { value: "blanc", text:"Blanc" }
                ],
                error: "",
            };
        },
        methods: {
            close() {
                EventBusModal.$emit("winePopup", false);
                this.credentials={
                    name:"",
                    millesime:"",
                    type:""
                };
                this.optionsType=[
                    { value: "rouge", text:"Rouge" },
                    { value: "rosee", text:"Rosée" },
                    { value: "blanc", text:"Blanc" }
                ];
                this.error= "";
            },
            checkBeforeSubmit() {
                this.error = "";

                if(
                    this.credentials.name ==="" ||
                    this.credentials.millesime === "" ||
                    this.credentials.type === ""
                )
                    this.error = "Veuillez remplir l'ensemble des champs pour créer un vin.";
                else
                    this.submit();
            },
            submit() {

                //Create wine back
                HTTP.post(
                    "/wine",
                    {
                        name: this.credentials.name,
                        type: this.credentials.type,
                        millesime: this.credentials.millesime,
                    },
                    {}
                ).then(response => {
    
                    this.close();
                    this.$router.push("/wine/"+response.data.wine._id);
                });
            }
        },
    };
</script>
