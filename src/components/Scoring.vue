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
      if (question.givenAnswer === false) {
        return 'Not answered'
      } else if (question.givenAnswer === question.answer) {
        return 'Correct'
      } else {
        return 'Wrong'
      }
    }
  },

  computed: {
    totalScore() {
      let score = 0;

      this.questions.forEach((question) => {
        if (question.givenAnswer !== question.answer) {
          return;
        }

        score += question.points;
      });

      return score;
    }
  }
}
</script>

<style lang="scss" scoped>
  .scoring {
    margin-top: var(--gutter);
  }
</style>
