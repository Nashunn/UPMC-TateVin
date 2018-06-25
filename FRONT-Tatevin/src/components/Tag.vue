<template>

        <div class="tag redGradient">{{ label }}
            <button v-if="canBeDelete" v-on:click="$emit('deleteTag')">X</button>
        </div>
    </template>
    <script>
export default {
    name: 'Tag',
    props:{
        label:{type:String},
        canBeDelete:{type:Boolean, default:false}
    }
}
</script>
