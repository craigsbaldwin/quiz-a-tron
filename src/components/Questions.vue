<template>
  <div class="questions">
    <p
      class="questions__start"
      v-if="step === 0"
    >
      Start quiz text goes here
    </p>

    <div
      class="questions__header"
      v-if="step > 0"
    >
      <span class="questions__number">
        {{ this.step }}
      </span>

      <h2 class="questions__question">
        {{ question.question }}
      </h2>
    </div>

    <div class="questions__answers answers">
      <div
        class="answers__answer"
        v-for="(answer, index) in question.answers"
        :key="index"
      >
        <input
          :id="handleiseAnswer(step, answer)"
          :name="step"
          @change="handleChange(answer.answer)"
          type="radio"
        >

        <label
          :for="handleiseAnswer(step, answer)"
        >
          {{ answer.answer }}
        </label>
      </div>
    </div>

    <div
      class="questions__points"
      v-if="step !== 0"
    >
      This question is worth: {{ question.points }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    questions: Array,
    step: Number,
  },

  methods: {
    handleiseAnswer(step, answer) {
      return `${step}-${answer.answer.toLowerCase().replace(/\s/g, '-')}`;
    },

    handleChange(answer) {
      const data = {
        step: this.step,
        answer,
      }

      window.VueEventBus.$emit('answer-given', data);
    }
  },

  computed: {
    question() {
      if (!this.questions[this.step - 1]) {
        return false;
      }

      return this.questions[this.step - 1];
    },
  },
}
</script>

<style lang="scss" scoped>
  .questions {
    margin-bottom: var(--gutter);

    &__header {
      align-items: center;
      display: flex;
      margin-bottom: var(--gutter);
    }

    &__start {
      font-size: 18px;
    }

    &__number {
      align-items: center;
      background-color: var(--colour-yellow);
      border-radius: 100%;
      display: flex;
      height: var(--progress-bar);
      justify-content: center;
      margin-right: var(--gutter);
      width: var(--progress-bar);
    }

    &__question {
      font-size: 24px;
    }

    &__answers {
      margin-bottom: var(--gutter);
    }
  }
</style>
