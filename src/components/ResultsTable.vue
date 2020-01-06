<template>
  <div>
    <PasswordForm
      v-if="!unlocked"
      password="password"
    />

    <div
      v-if="unlocked"
      class="results-table"
    >
      <div
        v-if="show === 1"
        class="results-table__people results-table__people--first"
      >
        <Medal
          :available="places.first[0].available"
          place="1"
          :score="places.first[0].score"
        />

        <Person
          v-for="(person, index) in places.first"
          :index="index"
          :key="index"
          :person="person"
          place="1"
        />
      </div>

      <div
        v-if="show === 2"
        class="results-table__people results-table__people--second"
      >
        <Medal
          :available="places.second[0].available"
          place="2"
          :score="places.second[0].score"
        />

        <Person
          v-for="(person, index) in places.second"
          :index="index"
          :key="index"
          :person="person"
          place="2"
        />
      </div>

      <div
        v-if="show === 3"
        class="results-table__people results-table__people--third"
      >
        <Medal
          :available="places.third[0].available"
          place="3"
          :score="places.third[0].score"
        />

        <Person
          v-for="(person, index) in places.third"
          :index="index"
          :key="index"
          :person="person"
          place="3"
        />
      </div>

      <button
        v-if="show !== 1"
        class="button"
        type="button"
        @click="show -= 1"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script>
  import Medal from './Medal.vue';
  import PasswordForm from './PasswordForm.vue';
  import Person from './Person.vue';

  export default {
    components: {
      Medal,
      PasswordForm,
      Person,
    },

    props: {
      results: Array,
      unlocked: Boolean,
    },

    data() {
      return {
        show: 3,
        tempResults: this.results,
        places: {
          first: [],
          second: [],
          third: [],
        },
      }
    },

    mounted() {
      this.calculateWinners('first');
      this.calculateWinners('second');
      this.calculateWinners('third');
    },

    methods: {

      /**
       * Return winner array.
       * @param {String} position - Position.
       */
      calculateWinners(position) {
        this.places[position].push(this.tempResults[0]);
        this.tempResults = this.arrayRemove(this.tempResults, 0);

        this.tempResults.forEach((result, index) => {
          if (result.score < this.places[position][0].score) {
            return;
          }

          this.places[position].push(result);
          this.tempResults = this.arrayRemove(this.tempResults, index);
        });
      },

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
    }
  }
</script>