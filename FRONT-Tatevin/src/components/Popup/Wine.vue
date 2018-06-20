<template>
    <!-- Connection Popup -->
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title">Ajouter un vin</h4>
                            <button type="button" class="close" @click="close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <p class="row">
                                <label for="name">Nom : </label>
                                <input
                                    type="text"
                                    id="name"
                                    class="tb-input"
                                    placeholder="Entrez le nom"
                                    v-model="credentials.name"
                                />
                            </p>
                            <p class="row">
                                <label for="pwd">Millésime: </label>
                                <input
                                    type="text"
                                    id="pwd"
                                    class="tb-input"
                                    placeholder="Entrez le millésime"
                                    v-model="credentials.millesime"
                                    @keyup.enter="submit"
                                />
                            </p>
                            <div class="btn-wrapper">
                                <button type="submit" ref="btnSubmit" @click="submit">Ajouter</button>
                            </div>
                        </div>
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
        methods: {
            close() {
                EventBusModal.$emit("winePopup", false);
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
                });
            }
        },
        data() {
            return {
                credentials:{
                    name:"",
                    millesime:""
                }
            };
        }
    };
</script>
