<template>
  <div
    class="choices__type radio"
    js-choices="group"
  >
    <div
      v-for="(singleChoice, index) in choice"
      class="radio__choice"
      :key="index"
    >
      <input
        :id="handleiseId(step, singleChoice)"
        class="radio__input"
        :name="`${step}-${choiceGroup}`"
        type="radio"
        @change="handleInput()"
      >

      <label
        class="radio__label"
        :for="handleiseId(step, singleChoice)"
      >
        {{ singleChoice.label }}
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
      handleiseId(step, choice) {
        return `${step}-${choice.label.toLowerCase().replace(/\s/g, '-')}`;
      },

      handleInput() {
        const data = {
          step: this.step,
          choiceGroup: this.choiceGroup,
        }

        window.VueEventBus.$emit('Question:Input', data);
      }
    },
  }
</script>

<style lang="scss" scoped>
  .radio {

  }
</style>
