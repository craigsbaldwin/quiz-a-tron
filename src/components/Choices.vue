<template>
  <div
    class="choices"
    :js-choices="step"
  >
    <div
      class="choices__choice"
      v-for="(choice, index) in choice"
      :key="index"
    >
      <input
        :id="handleiseChoice(step, choice)"
        :name="`${step}-${choiceGroup}`"
        type="radio"
        @change="handleChoice()"
      >

      <label
        :for="handleiseChoice(step, choice)"
      >
        {{ choice.answer }}
      </label>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      choice: Array,
      choiceGroup: Number,
      step: Number,
    },

    methods: {
      handleiseChoice(step, choice) {
        return `${step}-${choice.answer.toLowerCase().replace(/\s/g, '-')}`;
      },

      handleChoice() {
        const data = {
          step: this.step,
          choiceGroup: this.choiceGroup
        }

        window.VueEventBus.$emit('Question:Choice', data);
      }
    },
  }
</script>

<style lang="scss" scoped>
  .choices {
    margin-bottom: var(--gutter-small);
  }
</style>
