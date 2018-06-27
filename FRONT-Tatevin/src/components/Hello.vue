<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <WinesPage />
    </div>
</template>

<script>
 import { EventBusModal } from "./../events/";
 import WinesPage from "./WinesPage";
    export default {
        name: 'hello',
        components:{WinesPage},
        data() {
            return {
                msg: 'Hello Laura, Nico et Tim !!!'
            }
        },
        created(){
            EventBusModal.$emit('loading-loader', false)

        },mounted(){

        }
    }
</script>
