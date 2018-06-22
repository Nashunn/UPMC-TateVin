<template>
        <div class="tag">{{ label }}</div>
    </template>
    <script>
export default {
    name: 'Tag',
    props:{
        label:{type:String}
    }
}
</script>