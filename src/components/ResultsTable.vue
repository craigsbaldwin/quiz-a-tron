<template>
  <div>
    <PasswordForm
      v-if="state.locked"
      password="password"
    />

    <div
      v-else
      class="results-table"
    >
      <div
        v-for="(position, place0) in positions"
        class="results-table__people"
        :class="`results-table__people--${place0}`"
        :key="`Position-${place0}`"
      >
        <div
          v-if="place0 === show"
        >
          <Medal
            :available="position[0].available"
            :class="{ 'is-active': place0 === show }"
            :place="(place0 + 1)"
            :score="position[0].score"
          />

          <Person
            v-for="(result, index) in position"
            :class="{ 'is-active': place0 === show }"
            :index="index"
            :key="`Person-${index}`"
            :person="result"
            :place="(place0 + 1)"
          />
        </div>
      </div>

      <button
        v-if="show !== 0"
        class="button"
        type="button"
        @click="show -= 1"
      >
        Next
      </button>
    </div>

    <footer
      v-if="state.locked"
      class="footer"
    >
      <button
        class="footer__reload"
        @click.prevent="reloadData"
      >
        <small>Reload</small>
      </button>
    </footer>
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

    data() {
      return {
        show: 2,
        state: {
          locked: true,
        },
      };
    },

    props: {
      positions: Array,
    },

    mounted() {

      /**
       * EventBus.
       */
      window.VueEventBus.$on('Quiz:Unlock', () => {
        this.state.locked = false;
      });
    },
  }
</script>