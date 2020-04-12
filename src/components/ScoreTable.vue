<template>
  <div
    class="scoring__table score-table"
    :class="
      [
        { 'is-correct': questionCorrect },
        { 'is-wrong': questionWrong },
        { 'is-mixed': !questionCorrect && !questionWrong },
      ]
    "
  >
    <div class="score-table__heading">
      <h3>Question {{ question.number }}</h3>

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
          { 'is-correct': choice[index] === answer[index] },
          { 'is-wrong': choice[index] !== answer[index] },
        ]
      "
      :key="`QuestionScore${question.number}-Choice${index}`"
    >
      <div class="score-table__cell">
        <span class="score-table__given-answer">{{ choice[index] }}</span>

        <span
          v-if="choice[index] !== answer[index] && question.type !== 'number'"
          class="score-table__answer"
        >
          {{ answer[index] }}
        </span>

        <span
          v-else-if="choice[index] !== answer[index] && question.type === 'number'"
          class="score-table__answer score-table__answer--number"
        >
          {{ answer[index] }} ± {{ singleChoice.accuracy }}
        </span>

        <span
          v-else-if="choice[index] === answer[index] && question.type === 'number'"
          class="score-table__answer score-table__answer--number"
        >
          {{ answer[index] }} ± {{ singleChoice.accuracy }}
        </span>
      </div>

      <span
        v-text="markQuestion(index)"
        class="score-table__cell score-table__points"
      ></span>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      answer: Array,
      choice: Array,
      question: Object,
    },

    computed: {

      /**
       * Question correct-ness.
       * @returns {Boolean}
       */
      questionCorrect() {
        const correctAnswers = this.choice.filter((choice, index) => {
          return choice === this.answer[index];
        });

        return (correctAnswers.length === this.answer.length);
      },

      /**
       * Question wrong-ness.
       * @returns {Boolean}
       */
      questionWrong() {
        const wrongAnswers = this.choice.filter((choice, index) => {
          return choice !== this.answer[index];
        });

        return (wrongAnswers.length === this.answer.length);
      },

      /**
       * Calculate the question total points available.
       * @returns {Number}
       */
      questionTotal() {
        let total = 0;

        this.question.choices.forEach((choice, index) => {
          if (this.choice[index] !== this.answer[index]) {
            return;
          }

          total += choice.points;
        });

        return `${total}pt${(total === 1) ? '' : 's'}`;
      },
    },

    methods: {

      /**
       * Mark the question choice.
       * @param {Number} index - Current choice index.
       * @returns {String}
       */
      markQuestion(index) {
        if (this.choice[index] === this.answer[index]) {
          const points = this.question.choices[index].points;

          return `
            ${points}pt${(points === 1) ? '' : 's'}
          `;
        }

        return '0pts';
      },
    },
  }
</script>
