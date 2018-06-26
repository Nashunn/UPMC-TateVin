<template>
    <!-- Connection Popup -->
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <!-- modal header -->
                        <div class="modal-header">
                            <h4 class="modal-title">Vous devez être connecté pour effectuer cette action</h4>
                            <button type="button" class="close" @click="close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <!-- end of modal header -->
                        <!-- modal body -->
                        <div class="modal-body">
                            <Login />
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
    import Login from "../Login";

    export default {
        name: "modalWine",
        components:{Login},
        data() {
            return {

            };
        },
        methods: {
            close() {
                EventBusModal.$emit("neadConnect", false);
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
                console.log(this.credentials);
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
                    console.log(response.data);
                    this.close();
                    this.$router.push("/wine/"+response.data.wine.id);
                });
            }
        },
    };
</script>
