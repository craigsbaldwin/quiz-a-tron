<template>
  <div class="container">
    <header class="header">
      <h1>Results</h1>
    </header>

    <Loading
      v-if="!loaded"
      text="Loading results"
    />

    <ResultsTable
      v-if="loaded"
      :results="results"
    />
  </div>
</template>

<script>
  import Loading from '../../components/Loading.vue';
  import ResultsTable from '../../components/ResultsTable.vue';

  export default {
    name: 'Results',

    components: {
      Loading,
      ResultsTable,
    },

    data() {
      return {
        bins: [],
        collectionId: '5e0f71c2fadb735054fc987c',
        loaded: false,
      }
    },

    mounted() {
      this.loadCollection();
    },

    methods: {

      /**
       * Loads all submissions from JSON bin collection.
       * - Then goes through each loading it.
       */
      loadCollection() {
        fetch(`https://api.jsonbin.io/e/collection/${this.collectionId}/all-bins`, {
          headers: {
            'secret-key': '$2b$10$//.FQ70G0YQb6oFpN7RwMeb1RJS95U1tjzSrDCTXM/42M.l8ztAZi',
          },
        })
          .then(response => response.json())
          .then((response) => {
            const records = response.records.map(record => record.id);
            this.bins = records;

            this.loadAllBins(records);
          })
          .catch((error) => {
            throw new Error ('jsonbin collection', error);
          });
      },

      /**
       * Goes through each bin ID and loads it.
       * @param {Array} binIds - Array of bin IDs.
       */
      loadAllBins(binIds) {

      },

      /**
       * Load individual bin.
       * @param {String} binId - Single bin ID.
       */
      loadBin(binId) {

      }
    },
  }
</script>

<style lang="scss">
  @import '../../styles/theme';
</style>