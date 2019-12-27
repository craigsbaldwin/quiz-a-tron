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
      Total: {{ totalScore }}
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
      }
    }
  }
</script>
