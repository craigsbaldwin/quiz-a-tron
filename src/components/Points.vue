<template>
  <div class="points">
    This question is worth

    <strong>
      {{ points }}pt<span v-if="points !== 1">s</span>
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
