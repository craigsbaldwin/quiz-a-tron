<template>
  <div class="scoring">
    <div
      class="scoring__score"
      v-for="(question, index) in questions"
      :key="index"
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
      markQuestion(question) {
        if (question.givenAnswers.length === 0) {
          return 'Not answered'
        }

        const wrongAnswers = question.givenAnswers.filter((answer, index) => answer !== question.answers[index]);

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
    margin-top: var(--gutter-large);
  }
</style>
