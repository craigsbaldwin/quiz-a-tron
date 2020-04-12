<template>
  <div class="container container--wide">
    <div class="leaderboard">
      <div class="leaderboard__row leaderboard__row--header">
        <div class="leaderboard__cell">
          Name
        </div>

        <div class="leaderboard__cell text-right">
          Score
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
</template>

<script>
  export default {
    props: {
      results: Array,
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

        return individualResults.sort(this.compare);
      },
    },

    methods: {

      /**
       * Remove item from array.
       * @param {Array} array - Array to filter.
       * @param {Number} index - Index of item to remove.
       */
      arrayRemove(array, index) {
        return array.filter((item, filterIndex) => {
          return filterIndex !== index;
        });
      },

      /**
       * Compare function for sorting array.
       */
      compare(a, b) {
        if (a.average > b.average) return -1;
        if (b.average > a.average) return 1;

        return 0;
      }
    }
  }
</script>