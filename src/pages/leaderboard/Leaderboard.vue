<template>
  <div>
    <header class="header">
      <h1>Leaderboard</h1>
    </header>

    <ProgressBar
      :progress="100"
    />

    <Loading
      v-if="!state.loaded"
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
          class="leaderboard__individual"
          :key="`Individual-${index}`"
        >
          <button
            class="leaderboard__button"
            :aria-expanded="open[individual.name].toString()"
            @click.prevent="open[individual.name] = !open[individual.name]"
          >
            <div class="leaderboard__row">
              <div class="leaderboard__cell">
                {{ individual.name }}
              </div>

              <div class="leaderboard__cell text-right">
                <abbr :title="individual.average">
                  {{ Math.round(individual.average) }}%
                </abbr>
              </div>
            </div>
          </button>

          <div
            class="leaderboard__content"
            :class="{ 'is-active': open[individual.name] }"
            :aria-hidden="!open[individual.name].toString()"
          >
            <div
              v-for="(result) in individual.results"
              class="leaderboard__row leaderboard__row--sub"
              :class="{ 'is-disabled': isRowDisabled(result.id, individual.usedIds) }"
              :key="`Results${result.id}`"
            >
              <div class="leaderboard__cell">
                Round {{ result.id }}
              </div>

              <div class="leaderboard__cell text-right">
                {{ Math.round((result.score / result.available) * 100) }}%
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer class="leaderboard__footer">
        <button
          class="leaderboard__reload"
          @click.prevent="reloadData"
        >
          <small>Reload</small>
        </button>
      </footer>
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
        collectionId: '5e942fdfb08d064dc025fafe',
        open: {},
        results: [],
        state: {
          loaded: false,
        },
      }
    },

    computed: {

      /**
       * Results by individual.
       */
      individualResults() {
        let individualResults = {};

        /**
         * Sort results into oldest submissions first.
         */
        const orderedResults = this.results;
        orderedResults.sort(this.compareTimestamp);

        /**
         * Sort results into each person.
         */
        orderedResults.forEach((result) => {
          if (individualResults[result.name]) {
            individualResults[result.name].push(result);
            return;
          }

          individualResults[result.name] = [
            result,
          ]
        });

        /**
         * Go through each individual and remove submissions with duplicate IDs.
         */
        individualResults = Object.keys(individualResults).map((individual) => {
          const array = individualResults[individual];
          const idArray = [];

          const filteredArray = array.filter((entry) => {
            if (!idArray.includes(entry.id)) {
              idArray.push(entry.id);
              return entry;
            }
          });

          return filteredArray;
        });

        /**
         * Take average of two highest scoring rounds.
         */
        individualResults = individualResults.map((individual) => {
          individual.sort(this.compareScore);
          const usedIds = [];

          const firstPercent = ((individual[0].score / individual[0].available) * 100);
          let average = firstPercent;
          usedIds.push(individual[0].id);

          if (individual.length > 1) {
            const secondPercent = ((individual[1].score / individual[1].available) * 100);
            average = ((firstPercent + secondPercent) / 2);
            usedIds.push(individual[1].id);
          }

          return {
            average,
            name: individual[0].name,
            results: individual.sort(this.compareId),
            usedIds,
          };
        });

        return individualResults.sort(this.compareAverage);
      },
    },

    watch: {

      /**
       * Sets open states of all individuals when results update.
       */
      individualResults(individualResults) {
        const object = {};

        individualResults.forEach((individual) => {
          return object[individual.name] = false;
        });

        this.open = object;
      }
    },

    mounted() {
      if (localStorage.getItem('leaderboard')) {
        this.results = JSON.parse(localStorage.getItem('leaderboard'));
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
       * Deletes localStorage and reloads.
       */
      reloadData() {
        localStorage.removeItem('leaderboard');
        this.state.loaded = false;
        this.loadCollection();
      },

      /**
       * Checks if current ID is in usedIds array.
       * @param {Number} id - Current ID.
       * @param {Array} idArray - usedIds array.
       */
      isRowDisabled(id, idArray) {
        return (!idArray.includes(id));
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
       * Compare function for sorting array by score.
       */
      compareScore(a, b) {
        if (a.score > b.score) return -1;
        if (b.score > a.score) return 1;

        return 0;
      },

      /**
       * Compare function for sorting array by ID.
       */
      compareId(a, b) {
        if (a.id < b.id) return -1;
        if (b.id < a.id) return 1;

        return 0;
      },

      /**
       * Compare function for sorting array by average.
       */
      compareAverage(a, b) {
        if (a.average > b.average) return -1;
        if (b.average > a.average) return 1;

        return 0;
      },
    },
  }
</script>

<style lang="scss">
  @import '../../styles/theme';
</style>