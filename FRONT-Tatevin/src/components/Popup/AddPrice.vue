<template>
    <!-- Popup -->
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <!-- modal header -->
                        <div class="modal-header">
                            <h4 class="modal-title">Enregistrer le prix</h4>
                            <button type="button" class="close" @click="close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <!-- end of modal header -->
                        <!-- modal body -->
                        <div class="modal-body">
                            <p>Le prix qui sera indiqué sur la fiche est une moyenne de l'ensemble des prix à titre indicatif.</p>

                            <div class="">
                                <b-form-input type="number" min="0" v-model="data"/>

                                <div class="btn-wrapper mt-3">
                                    <button v-on:click="sendPrice">Enregistrer le prix</button>
                                </div>
                            </div>
                        </div>
                        <!-- end of modal body -->
                    </div>
                </div>
            </div>
        </div>
    </transition>
    <!-- End Popup -->
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
    import store from "../../store";

    export default {
        name: "PriceModal",
        props:{
        },
        data() {
            return {
                data: 0,
            };
        },
        methods: {
            close() {
                this.data = 0;
                EventBusModal.$emit("addPricePopup", false);
            },
            sendPrice() {
                HTTP.put('/opinions/'+this.$route.params.id+'/'+store.state.usr._id, {price:this.data});
                EventBusModal.$emit("priceWasAddByUser");
                EventBusModal.$emit("addPricePopup", false);
            }
        },
    };
</script>
