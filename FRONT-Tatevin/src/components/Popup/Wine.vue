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
                            <p class="">
                                <label for="name">Nom : </label>
                                <input
                                    type="text"
                                    id="name"
                                    class="tb-input"
                                    placeholder="Entrez le nom"
                                    v-model="credentials.name"
                                />
                            </p>
                            <p class="">
                                <label for="pwd">Millésime: </label>
                                <input
                                    type="number"
                                    id="pwd"
                                    class="tb-input"
                                    placeholder="Entrez le millésime"
                                    v-model="credentials.millesime"
                                    @keyup.enter="checkBeforeSubmit"
                                />
                            </p>

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
                    millesime:""
                },
                error: "",
            };
        },
        methods: {
            close() {
                EventBusModal.$emit("winePopup", false);
            },
            checkBeforeSubmit() {
                this.error = "";

                if(this.credentials.name ==="" || this.credentials.millesime === "")
                    this.error = "Veuillez remplir l'ensemble des champs pour créer un vin.";
                else
                    this.submit();
            },
            submit() {
                console.log(this.credentials);
                //Create wine back
                HTTP.post(
                    "/wine",
                    {
                        name: this.credentials.name,
                        millesime: this.credentials.millesime,
                    },
                    {}
                ).then(response => {
                    console.log(response.data);
                    this.close();
                    this.$router.push("/wine/"+response.data.wine.id);
                });
            }
        },
    };
</script>
