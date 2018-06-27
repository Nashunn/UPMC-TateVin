<template>
    <!-- Connection Popup -->
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <!-- modal header -->
                        <div class="modal-header">
                            <h4 class="modal-title">Senstations <span>{{ getSensation }}</span></h4>
                            <button type="button" class="close" @click="close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <!-- end of modal header -->
                        <!-- modal body -->
                        <div class="modal-body">
                            <Tag v-for="(tag,index) in tags" :label="tag" v-on:deleteTag="deleteTag(index)" :canBeDelete="true" :key="index"/>
                            <p v-show="tagExists">Le tag {{tagToAdd }} est déjà enregistré.</p>
                            <p>Ajouter un tag :  <Autocomplete :items="tagList" ref="newTag"/> <b-button v-on:click="addTag">+</b-button></p>

                            <div class="btn-wrapper">
                                 <b-button v-on:click="validateTags">Valider les tags</b-button>
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
    import Autocomplete from "../Autocomplete";
    import Tag from "../Tag";

    export default {
        name: "modalWine",
        components:{Autocomplete, Tag},
        props:{
            type:String
        },
        data() {
            return {
                tagToAdd:"test",
                tagExists:false,
                indexTag:-1,
                tagList:[],
                tags:[],
            };
        },
        methods: {
            close() {
                EventBusModal.$emit("addTag", false);
            },
            addTag(){
                 if(typeof(this.tags.find(tag=>tag===this.$refs.newTag.search))==="undefined"){
                    this.tags.push(this.$refs.newTag.search);
                }else{
                    this.tagExists=true;
                }
            },
            deleteTag( index ){
                this.tags.splice(index,1);
            },
            validateTags(){
                HTTP.put('/opinions/'+this.wine._id+'/'+store.state.usr._id, {visual:this.tags}).then(response=>{
                    console.log("RES",response)
                });
                this.close();
            },
        },
        computed:{
            getSensation(){
                if(this.type==="visual") return "visuelles";
                if(this.type==="smell") return "olfactives";
                if(this.type==="taste") return "gustatives";
            }
        }
    };
</script>
