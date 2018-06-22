<template>
    <section class="wine">
        <h2>{{ this.wine.name }} ({{ this.wine.millesime }})</h2>
        <p>

        </p>
    </section>
</template>

<script>
import {HTTP} from "../../HTTP/http";

export default {
    name: 'Wine',
    data() {
        return {
            wine: [],
        }
    },
    mounted() {
        console.log("Page de vin : "+this.$route.params.id);
        HTTP.get('/wine/'+this.$route.params.id).then(response=>{
            this.wine=response.data;
        });
    },
    methods: {
    }
}
</script>
