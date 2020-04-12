<template>
  <div class="page page--results">
    <header class="header">
      <h1>Leaderboard</h1>
    </header>

    <ProgressBar
      :progress="100"
    />

    <Loading
      v-if="!loaded"
      text="Loading leaderboard"
    />

    <div
      v-else
      class="container container--wide"
    >
      <div class="leaderboard">
        <div class="leaderboard__row leaderboard__row--header">
          <div class="leaderboard__cell">
            Name
          </div>

          <div class="leaderboard__cell text-right">
            Average
          </div>
        </div>

        <div
          v-for="(individual, index) in individualResults"
          class="leaderboard__row"
          :key="`Result${index}`"
        >
          <div class="leaderboard__cell">
            {{ individual.name }}
          </div>

          <div class="leaderboard__cell text-right">
            <abbr :title="individual.average">
              {{ Math.round(individual.average) }}%
            </abbr>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Loading from '../../components/Loading.vue';
  import ProgressBar from '../../components/ProgressBar.vue';

  export default {
    name: 'Results',

    components: {
      Loading,
      ProgressBar,
    },

    data() {
      return {
        binIds: [],
        collectionId: '5e0f71c2fadb735054fc987c',
        loaded: false,
        results: [],
      }
    },

    computed: {

      /**
       * Results by individual.
       */
      individualResults() {
        let individualResults = {};

        /**
         * Sort results into each person.
         */
        this.results.forEach((result) => {
          if (individualResults[result.name]) {
            individualResults[result.name].push(result);
            return;
          }

          individualResults[result.name] = [
            result,
          ]
        });

        /**
         * Take average of two highest scoring rounds.
         */
        individualResults = Object.keys(individualResults).map((individual) => {
          const array = individualResults[individual];
          const firstPercent = ((array[0].score / array[0].available) * 100);
          let average = firstPercent;

          if (array.length > 1) {
            const secondPercent = ((array[1].score / array[0].available) * 100);
            average = ((firstPercent + secondPercent) / 2);
          }

          return {
            average,
            name: individual,
            results: array,
          }
        });

        return individualResults.sort(this.compareAverage);
      },
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
          this.results.sort(this.compareScore);
          this.loaded = true;
          localStorage.setItem('leaderboard', JSON.stringify(this.results));
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
       * Compare function for sorting array by score.
       */
      compare( a, b) {
        if (a.score > b.score) return -1;
        if (b.score > a.score) return 1;

        return 0;
      },

      /**
       * Compare function for sorting array by average.
       */
      compareAverage(a, b) {
        if (a.average > b.average) return -1;
        if (b.average > a.average) return 1;

        return 0;
      }
    },
  }
</script>

<style lang="scss">
  @import '../../styles/theme';
</style>