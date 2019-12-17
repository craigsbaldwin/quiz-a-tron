<template>
  <div class="questions">
    <p
      class="questions__start"
      v-if="step === 0"
    >
      Start quiz text goes here
    </p>

    <div
      class="questions__container"
      v-if="step > 0"
    >
      <div
        class="questions__question"
        :class="{ 'is-active': step === (index + 1) }"
        v-for="(question, index) in questions"
        :key="index"
      >
        <div class="questions__header">
          <span class="questions__number">
            {{ index + 1 }}
          </span>

          <h2 class="questions__question-text">
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

        <Points
          v-if="step !== 0"
          :point="question.points"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import Points from './Points.vue';

  export default {
    components: {
      Points,
    },

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
  }
</script>

<style lang="scss" scoped>
  .questions {
    margin-bottom: var(--gutter-large);

    &__header {
      align-items: center;
      display: flex;
      margin-bottom: var(--gutter-small);
    }

    &__start {
      font-size: 18px;
    }

    &__question {
      display: none;

      &.is-active {
        display: block;
      }
    }

    &__number {
      align-items: center;
      background-color: var(--colour-yellow);
      border-radius: 100%;
      display: flex;
      height: var(--progress-bar);
      justify-content: center;
      margin-right: var(--gutter-small);
      width: var(--progress-bar);
    }

    &__question-text {
      font-size: 24px;
    }

    &__answers {
      margin-bottom: var(--gutter-large);
    }
  }
</style>
