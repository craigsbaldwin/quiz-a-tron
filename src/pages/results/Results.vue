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
      :unlocked="unlocked"
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
        binIds: [],
        collectionId: '5e0f71c2fadb735054fc987c',
        date: 'jan',
        loaded: false,
        results: [],
        unlocked: false,
      }
    },

    mounted() {
      this.loadCollection();

      /**
       * EventBus.
       */
      window.VueEventBus.$on('Quiz:Unlock', () => {
        this.unlocked = true;
      });
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
            this.binIds = records;
            this.loadAllBins();
          })
          .catch((error) => {
            throw new Error ('jsonbin collection', error);
          });
      },

      /**
       * Goes through each bin ID and loads it.
       */
      loadAllBins() {
        if (this.binIds.length === 0) {
          this.results.sort(this.compare);
          this.loaded = true;
          localStorage.setItem(`submissions-${this.date}`, JSON.stringify(this.results));
          return;
        }

        const binId = this.binIds.shift();
        this.loadBin(binId);
      },

      /**
       * Load individual bin.
       * @param {String} binId - Single bin ID.
       */
      loadBin(binId) {
        fetch(`https://api.jsonbin.io/b/${binId}/latest`)
          .then(response => response.json())
          .then((response) => {
            this.results.push(response);
            this.loadAllBins();
          })
          .catch((error) => {
            throw new Error('JSON bin load', error);
          })
      },

      /**
       * Compare function for sorting array.
       */
      compare(a, b) {
        if (a.score > b.score) return -1;
        if (b.score > a.score) return 1;

        return 0;
      }
    },
  }
</script>

<style lang="scss">
  @import '../../styles/theme';
</style>