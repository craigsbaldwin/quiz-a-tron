<template>
  <div
    class="score-table"
    :class="
      [
        { 'is-correct': questionCorrect },
        { 'is-wrong': questionWrong },
        { 'is-mixed': questionMixed },
      ]
    "
  >
    <div class="score-table__heading">
      <h3>Question {{ index + 1 }}</h3>

      <span
        v-text="questionTotal"
        class="score-table__question-total"
      ></span>
    </div>

    <div
      v-for="(singleChoice, index) in question.choices"
      class="score-table__row"
      :class="
        [
          { 'is-correct': singleChoice.answered && singleChoice.correct },
          { 'is-wrong': singleChoice.answered && !singleChoice.correct },
        ]
      "
      :key="index"
    >
      <div class="score-table__cell">
        <span
          v-text="givenAnswerValue(index)"
          class="score-table__given-answer"
        ></span>

        <span
          v-if="question.givenAnswers[index] !== false"
          v-text="answerValue(index)"
          class="score-table__answer"
        ></span>
      </div>

      <span
        v-text="markQuestion(question, index)"
        class="score-table__cell score-table__points"
      ></span>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      index: Number,
      question: Object,
    },

    methods: {

      /**
       * Get the plain text given answer value.
       * @param {Number} index - Choice index.
       */
      givenAnswerValue(index) {
        if (this.question.givenAnswers[index] === false) {
          return 'Not answered';
        }

        switch (this.question.type) {
          case 'radio':
            return this.question.choices[index].answers[this.question.givenAnswers[index]].label;

          case 'select':
            return this.question.givenAnswers[index];

          case 'text':
            return this.question.givenAnswers[index];
        }
      },

      /**
       * Get the plain text answer value.
       * @param {Number} index - Choice index.
       */
      answerValue(index) {
        switch (this.question.type) {
          case 'radio':
            return this.question.choices[index].answers[this.question.answers[index]].label;

          case 'select':
            return this.question.answers[index];

          case 'text':
            return this.question.answers[index];
        }
      },

      /**
       * Mark the question choice.
       * @param {Object} question - Question data.
       * @param {Number} choiceIndex - Current choice index.
       * @returns {String}
       */
      markQuestion(question, choiceIndex) {
        if (!question.choices[choiceIndex].answered) {
          return ''
        }

        if (question.choices[choiceIndex].correct) {
          return `${question.choices[choiceIndex].points}pts`;
        }

        return '0pts';
      },
    },

    computed: {

      /**
       * Question correct-ness.
       */
      questionCorrect() {
        const notAnswered = this.question.choices.filter((choice) => choice.answered === false);
        const wrongAnswers = this.question.choices.filter((choice) => choice.correct === false);

        return (notAnswered.length === 0 && wrongAnswers.length === 0);
      },

      /**
       * Question wrong-ness.
       */
      questionWrong() {
        const wrongAnswers = this.question.choices.filter((choice) => choice.answered && choice.correct === false);

        return (wrongAnswers.length === this.question.answers.length);
      },

      /**
       * Question isn't totally correct or wrong.
       */
      questionMixed() {
        const notAnswered = this.question.choices.filter((choice) => choice.answered === false);
        const wrongAnswers = this.question.choices.filter((choice) => choice.answered && choice.correct === false);

        /**
         * Check that the question has been answered first.
         */
        if (notAnswered.length !== 0) {
          return false;
        }

        return (wrongAnswers.length !== 0 && wrongAnswers.length !== this.question.answers.length);
      },

      /**
       * Calculate the question total points available.
       * @returns {Number}
       */
      questionTotal() {
        let total = 0;

        this.question.choices.forEach((choice) => {
          if (!choice.correct) {
            return;
          }

          total += choice.points;
        });

        return `${total}pts`;
      },
    }
  }
</script>
