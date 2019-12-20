<template>
  <div class="scoring">
    <h2>Your score</h2>

    <div
      class="scoring__score"
      :key="index"
      v-for="(question, index) in questions"
    >
      {{ index + 1 }}:

      <span v-text="markQuestion(question)">
        Not answered
      </span>
    </div>

    Total: {{ totalScore }}
  </div>
</template>

<script>
  export default {
    props: {
      questions: Array,
    },

    methods: {

      /**
       * Mark the question.
       * @param {Array} question - Question data.
       */
      markQuestion(question) {
        if (question.givenAnswers.length === 0) {
          return 'Not answered'
        }

        const wrongAnswers = question.givenAnswers.filter((answer, index) => {
          let givenAnswer = question.answers[index];

          if (typeof answer === 'string') {
            answer = answer.toLowerCase();
            givenAnswer = givenAnswer.toLowerCase();
          }

          return (answer !== givenAnswer);
        });

        if (wrongAnswers.length ===  question.answers.length) {
          return 'Wrong';
        } else if (wrongAnswers.length > 0) {
          return 'Partially correct';
        } else {
          return 'Correct';
        }
      }
    },

    computed: {

      /**
       * Calculate the total score by iterating over all questions.
       * @returns {Number}
       */
      totalScore() {
        let score = 0;

        this.questions.forEach((question) => {
          question.givenAnswers.forEach((answer, index) => {
            if (answer !== question.answers[index]) {
              return;
            }

            score += question.choices[index].points;
          });
        });

        return score;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .scoring {
    margin-top: var(--gutter-m);
  }
</style>
