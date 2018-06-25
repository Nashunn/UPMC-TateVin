<template>
    <!-- Connection Popup -->
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title">La suppression est definitive !</h4>
                            <button type="button" class="close" @click="close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <p>Êtes vous certain de vouloir supprimer cette histoire ?</p>
                            <div class="btn-wrapper">
                                <button type="submit" ref="btnSubmit" @click="submit">Oui ! </button>
                                <button type="button" @click="close">Je vais réfléchir encore un peu </button>
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
                EventBusModal.$emit("Delete", false);
            },
            submit() {
                //Create wine back
                HTTP.delete(
                    '/wineStory/'+ this.$route.params.id).then(response => {
                    console.log(response);
                    this.$router.push('/wineStories');
                    EventBusModal.$emit("Delete", false);
                });
            }
        },
        data() {
            return {
            };
        },
    };
</script>
