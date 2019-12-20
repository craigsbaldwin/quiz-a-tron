<template>
  <div class="points">
    This question is worth

    <strong>
      {{ points }}pt<span v-if="points > 1">s</span>
    </strong>
  </div>
</template>

<script>
  export default {
    props: {
      choices: Array,
    },

    computed: {

      /**
       * Compute the question's total points.
       * @returns {Number}
       */
      points() {
        let points = 0;

        this.choices.forEach((choice) => {
          points += choice.points;
        });

        return points;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .points {
    align-items: center;
    border: 3px solid var(--colour-grey);
    display: flex;
    font-size: var(--font-s);
    margin-bottom: var(--gutter-s);
    padding: var(--gutter-s);

    &__icon {
      height: 36px;
      margin-right: var(--gutter-s);
      width: 36px;
    }

    strong {
      margin-left: auto;
    }
  }
</style>
