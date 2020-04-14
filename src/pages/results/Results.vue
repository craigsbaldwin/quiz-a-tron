<template>
  <div>
    <header class="header">
      <h1>Round {{ id }} Results</h1>
    </header>

    <ProgressBar
      :progress="100"
    />

    <Loading
      v-if="!state.loaded"
      text="Loading results"
    />

    <div
      v-else
      class="container"
    >
      <ResultsTable
        :positions="positions"
      />
    </div>
  </div>
</template>

<script>
  import Loading from '../../components/Loading.vue';
  import ProgressBar from '../../components/ProgressBar.vue';
  import ResultsTable from '../../components/ResultsTable.vue';

  export default {
    name: 'Results',

    components: {
      Loading,
      ProgressBar,
      ResultsTable,
    },

    data() {
      return {
        binIds: [],
        collectionId: '5e942fdfb08d064dc025fafe',
        id: 1,
        results: [],
        state: {
          loaded: false,
        },
      }
    },

    computed: {

      /**
       * Results by individual for round only.
       */
      individualResults() {
        let individualResults = {};

        /**
         * Sort results into oldest submissions first.
         */
        const orderedResults = this.results;
        orderedResults.sort(this.compareTimestamp);

        /**
         * Filter submissions for other rounds.
         */
        const filteredResults = orderedResults.filter((result) => {
          return result.id === this.id;
        });

        /**
         * Go through each result and remove duplicate submissions.
         */
        filteredResults.forEach((result) => {
          if (individualResults[result.name]) {
            return;
          }

          individualResults[result.name] = {
            ...result,
          }
        });

        /**
         * Convert to array.
         */
        individualResults = Object.keys(individualResults).map((individual) => {
          return {
            ...individualResults[individual],
          };
        });

        return individualResults.sort(this.compareScore);
      },

      /**
       * Calculate positions.
       */
      positions() {
        let scores = [];
        const positions = [
          [],
          [],
          [],
        ];

        /**
         * Find out scores.
         */
        this.individualResults.forEach((result) => {
          scores.push(result.score);
        });

        scores = [...new Set(scores)];

        /**
         * Sort results.
         */
        this.individualResults.forEach((result) => {
          if (result.score === scores[0]) {
            positions[0].push(result);
            return;
          }

          if (result.score === scores[1]) {
            positions[1].push(result);
            return;
          }

          if (result.score === scores[2]) {
            positions[2].push(result);
            return;
          }
        });

        return positions;
      },
    },

    mounted() {
      if (localStorage.getItem(`results-${this.id}`)) {
        this.results = JSON.parse(localStorage.getItem(`results-${this.id}`));
        this.state.loaded = true;
        return;
      }

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
            this.binIds = records;
            this.loadAllBins();
          })
          .catch((error) => {
            throw new Error ('JSON bin collection load error', error);
          });
      },

      /**
       * Goes through each bin ID and loads it.
       */
      loadAllBins() {
        if (this.binIds.length === 0) {
          this.state.loaded = true;
          localStorage.setItem(`results-${this.id}`, JSON.stringify(this.results));
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
            throw new Error('JSON bin load error', error);
          })
      },

      /**
       * Deletes localStorage and reloads.
       */
      reloadData() {
        localStorage.removeItem(`results-${this.id}`);
        this.state.loaded = false;
        this.loadCollection();
      },

      /**
       * Compare function for sorting array by timestamp.
       */
      compareTimestamp(a, b) {
        if (a.timestamp < b.timestamp) return -1;
        if (b.timestamp < a.timestamp) return 1;

        return 0;
      },

      /**
       * Compare function for sorting array.
       */
      compareScore(a, b) {
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