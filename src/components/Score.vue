<template>
  <div class="scoring">
    <h2>Your score</h2>

    <ScoreTable
      v-for="(question, index) in questions"
      :key="index"
      :index="index"
      :question="question"
    />

    <div class="scoring__total">
      Total

      <div class="scoring__total-display">
        <div class="scoring__total-value">
          {{ totalScore }}pt{{ (totalScore === 0 || totalScore > 1) ? 's' : '' }}
        </div>

        <div class="scoring__total-available">
          {{ totalAvailable }}pt{{ (totalAvailable === 0 || totalAvailable > 1) ? 's' : '' }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ScoreTable from './ScoreTable';

  export default {
    components: {
      ScoreTable,
    },

    props: {
      questions: Array,
    },

    computed: {

      /**
       * Calculate the total score by iterating over all questions.
       * @returns {Number}
       */
      totalScore() {
        let score = 0;

        this.questions.forEach((question) => {
          question.choices.forEach((choice) => {
            if (!choice.answered || !choice.correct) {
              return;
            }

            score += choice.points;
          });
        });

        return score;
      },

      /**
       * Calculate total available points.
       * @returns {Number}
       */
      totalAvailable() {
        let total = 0;

        this.questions.forEach((question) => {
          question.choices.forEach((choice) => {
            total += choice.points;
          });
        });

        return total;
      }
    }
  }
</script>
