<template>
  <form
    :js-question="index + 1"
    @submit.prevent="submitAnswer(index + 1)"
  >
    <div class="question__container">
      <div class="question__header">
        <span class="question__number">
          {{ index + 1 }}
        </span>

        <h2 class="question__question-text">
          {{ question.question }}
        </h2>
      </div>

      <Choices
        class="question__choices"
        :question="question"
        :step="step"
      />

      <Points
        v-if="step !== 0"
        :choices="question.choices"
      />

      <Buttons
        :length="NoOfQuestions"
        :question="question"
        :step="index + 1"
      />
    </div>
  </form>
</template>

<script>
  import Buttons from './Buttons.vue';
  import Points from './Points.vue';
  import Choices from './Choices.vue';

  export default {
    components: {
      Buttons,
      Choices,
      Points,
    },

    props: {
      index: Number,
      NoOfQuestions: Number,
      question: Object,
      step: Number,
    },

    methods: {

      /**
       * Submit question form.
       */
      submitAnswer(questionNumber) {
        window.VueEventBus.$emit('Question:Submit', questionNumber);
      },
    },
  }
</script>
