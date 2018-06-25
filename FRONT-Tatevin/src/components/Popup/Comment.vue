<template>
    <!-- Connection Popup -->
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <!-- modal header -->
                        <div class="modal-header">
                            <h4 class="modal-title">Commenter l'histoire de vin</h4>
                            <button type="button" class="close" @click="close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <!-- end of modal header -->
                        <!-- modal body -->
                        <div class="modal-body">
                            <b-row class="ml-1 mb-1">
                                <label class="w-25" for="name">Votre message</label>
                                <wysiwyg v-model="comment.message" />
                
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
     import store from "./../../store/";

    export default {
        name: "modalWine",
        data() {
            return {
                comment:{
                    message:"",
                    author:store.state.usr._id
                },

                error: "",
            };
        },
        methods: {
            close() {
                EventBusModal.$emit("Comment", false);
            },
            checkBeforeSubmit() {
                this.error = "";

                if(
                    this.comment.message ===""
                )
                    this.error = "Ne rien dire, c'est dire beaucoup trop.";
                else
                    this.submit();
            },
            submit() {
                //Create wine back
                HTTP.post(
                    "/comment",
                    this.comment,
                    {}
                ).then(response => {

                    console.log("FDA", response.data.comment);
                    HTTP.put(
                        "/wineStoryAddComment",
                        {
                            id_ws:this.$route.params.id,
                            id_comment:response.data.comment._id
                        }
                    ).then(res=>{
                        EventBusModal.$emit('updateComments', response.data.comment)
                        this.close();
                    })

                });
            }
        },
    };
</script>
