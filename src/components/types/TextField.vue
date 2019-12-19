<template>
  <div
    class="choices__type text-field"
    js-choices="group"
  >
    <label
      class="text-field__label"
      :for="`${step}-${choiceGroup}-Text`"
    >
      {{ label }}
    </label>

    <input
      :id="`${step}-${choiceGroup}-Text`"
      class="text-field__input"
      :placeholder="label"
      type="text"
      @keyup="handleInput()"
    >
  </div>
</template>

<script>
  export default {
    props: {
      choiceGroup: Number,
      label: String,
      step: Number,
    },

    methods: {
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
  .text-field {
    &__label {
      display: block;
      margin-bottom: var(--gutter-xs);
    }

    &__input {
      display: block;
      font-size: 18px;
      padding: var(--gutter-xs);
      width: 100%;
    }
  }
</style>
