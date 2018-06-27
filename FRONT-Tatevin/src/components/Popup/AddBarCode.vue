<template>
    <!-- Connection Popup -->
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <!-- modal header -->
                        <div class="modal-header">
                            <h4 class="modal-title">Enregistrer le code bar</span></h4>
                            <button type="button" class="close" @click="close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <!-- end of modal header -->
                        <!-- modal body -->
                        <div class="modal-body">
                            <p>Le code barre vous permettra de retrouver plus rapidement votre vin.</p>
                            <BarcodeScan />

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
    import store from "../../store";
    import BarcodeScan from "../Scanner/BarcodeScan"

    export default {
        name: "modalScan",
        components:{BarcodeScan},
        props:{

        },
        data() {
            return {
            };
        },
        methods: {
            close() {
                EventBusModal.$emit("addBarCode", false);
            },

        },
        computed:{
        
        }
    };
</script>
