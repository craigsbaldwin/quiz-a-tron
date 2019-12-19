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
      background-color: var(--colour-dark-grey);
      color: var(--colour-text-inverse);
      display: inline-block;
      font-size: 12px;
      font-weight: 700;
      margin-bottom: -3px;
      padding: var(--gutter-xs) var(--gutter-s);
    }

    &__input {
      border: 3px solid var(--colour-dark-grey);
      display: block;
      font-size: 24px;
      padding: var(--gutter-s);
      width: 100%;

      &:focus {
        box-shadow: 0 0 20px 0 var(--colour-grey);
        outline: none;
      }
    }
  }
</style>
