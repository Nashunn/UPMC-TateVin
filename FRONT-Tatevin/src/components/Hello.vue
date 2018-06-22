<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
    </div>
</template>

<script>
    export default {
        name: 'hello',
        data() {
            return {
                msg: 'Hello Laura, Nico et Tim !!!'
            }
        },
        mounted(){
            console.log(this.$store.state.usr);
        }
    }
</script>
