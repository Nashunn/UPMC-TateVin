<template>
  <div class="autocomplete">

    <input type="text"
    v-model="search"
    @input="onChange" @keyup.down="onArrowDown"
    @keyup.up="onArrowUp"
    @keyup.enter="onEnter" />
    <ul class="autocomplete-results" v-show="isOpen"  >
      <li class="autocomplete-result" v-for="(result, i) in results"
      :key="i"  @click="setResult(result)" :class="{ 'is-active': i === arrowCounter }">{{ result }}
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    name: 'autocomplete',
    props: {
      items: {
        type: Array,
        required: false,
        default: () => [],
      },
    },
    data() {
      return {
        isLoading: false,
        search: '',
        results: [],
        isOpen: false,
        arrowCounter: -1,
      };
    },
    methods: {
      onChange() {
        
        this.isOpen = this.filterResults();
      },
      filterResults() {
        this.results = this.items.filter(item => item.toLowerCase().indexOf(this.search.toLowerCase()) > -1);
        return this.results.length>0;
      },
      setResult(result) {
        this.search = result;
        this.isOpen = false;
      },
      onArrowDown() {
        if (this.arrowCounter < this.results.length) {
          this.arrowCounter = this.arrowCounter + 1;
        }
      },
      onArrowUp() {
        if (this.arrowCounter > 0) {
          this.arrowCounter = this.arrowCounter - 1;
        }
      },
      onEnter() {
        this.search = this.results[this.arrowCounter];
        this.isOpen = false;
        this.arrowCounter = -1;
      },
    },
  
  };
</script>

<style>
  .autocomplete {
    position: relative;
    width: 130px;
  }

  .autocomplete-results {
    padding: 0;
    margin: 0;
    border: 1px solid #eeeeee;
    height: 120px;
    overflow: auto;
  }

  .autocomplete-result {
    list-style: none;
    text-align: left;
    padding: 4px 2px;
    cursor: pointer;
  }

  .autocomplete-result:hover {
    background-color: #4AAE9B;
    color: white;
  }
   .autocomplete-result.is-active,
  .autocomplete-result:hover {
    background-color: #4AAE9B;
    color: white;
  }
</style>
