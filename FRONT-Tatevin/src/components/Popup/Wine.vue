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
                                <label for="mail">Nom : </label>
                                <input
                                        type="email"
                                        id="mail"
                                        class="tb-input"
                                        placeholder="Enter your username"
                                        v-model="credentials.nom"
                                />
                            </p>
                            <p class="row">
                                <label for="pwd">Millésime: </label>
                                <input
                                        type="password"
                                        id="pwd"
                                        class="tb-input"
                                        placeholder="Enter your password"
                                        v-model="credentials.millesime"
                                />
                            </p>
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

    export default {
        name: "modalWine",

        methods: {
            close() {
                EventBusModal.$emit("winePopup", false);
            },
        },
        data() {
            return {
                credentials:{
                    nom:"",
                    millesime:""
                }
            };
        }
    };
</script>
