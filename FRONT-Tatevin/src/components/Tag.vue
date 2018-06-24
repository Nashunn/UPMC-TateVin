<template>

        <div class="tag redGradient">{{ label }}
        </div>
    </template>
    <script>
export default {
    name: 'Tag',
    props:{
        label:{type:String},
        index:{type:Number}
    }
}
</script>
