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
          { 'is-correct': singleChoice.saved && singleChoice.correct },
          { 'is-wrong': singleChoice.saved && !singleChoice.correct },
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
          v-if="singleChoice.saved && !singleChoice.correct"
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
       * @returns {String}
       */
      givenAnswerValue(index) {
        if (this.question.choices[index].saved === false) {
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
       * @returns {String}
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
        if (!question.choices[choiceIndex].saved) {
          return ''
        }

        if (question.choices[choiceIndex].correct) {
          return `${question.choices[choiceIndex].points}pt${(question.choices[choiceIndex].points > 1) ? 's' : ''}`;
        }

        return '0pts';
      },
    },

    computed: {

      /**
       * Question correct-ness.
       * @returns {Boolean}
       */
      questionCorrect() {
        const notSaved = this.question.choices.filter((choice) => choice.saved === false);
        const wrongAnswers = this.question.choices.filter((choice) => choice.correct === false);

        return (notSaved.length === 0 && wrongAnswers.length === 0);
      },

      /**
       * Question wrong-ness.
       * @returns {Boolean}
       */
      questionWrong() {
        const wrongAnswers = this.question.choices.filter((choice) => choice.saved && choice.correct === false);

        return (wrongAnswers.length === this.question.answers.length);
      },

      /**
       * Question isn't totally correct or wrong.
       * @returns {Boolean}
       */
      questionMixed() {
        const notSaved = this.question.choices.filter((choice) => choice.saved === false);
        const wrongAnswers = this.question.choices.filter((choice) => choice.saved && choice.correct === false);

        return (notSaved.length === 0 && wrongAnswers.length !== 0 && wrongAnswers.length !== this.question.answers.length);
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
