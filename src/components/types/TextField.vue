<template>
  <div
    class="choices__type text-field"
    js-choices="group"
  >
    <label
      class="text-field__label label"
      :for="`${step}-${textGroup}-Text`"
    >
      {{ label }}
    </label>

    <input
      :id="`${step}-${textGroup}-Text`"
      class="text-field__input"
      :placeholder="label"
      type="text"
      @keyup="handleInput"
    >
  </div>
</template>

<script>
  export default {
    props: {
      label: String,
      step: Number,
      textGroup: Number,
    },

    methods: {
      handleInput(event) {
        const element = event.target;
        const data = {
          step: this.step,
          group: this.textGroup,
        }

        if (element.getAttribute('type') === 'text' && element.value === '') {
          window.VueEventBus.$emit('Question:Disable', data);
          return;
        }

        window.VueEventBus.$emit('Question:Input', data);
      }
    },
  }
</script>

<style lang="scss" scoped>
  .text-field {
    $parent: &;

    &__label {
      background-color: var(--colour-dark-grey);
      color: var(--colour-text-inverse);
      display: inline-block;
      font-size: var(--font-xs);
      font-weight: 700;
      margin-bottom: -3px;
      padding: var(--gutter-xs) var(--gutter-s);
    }

    &__input {
      border: 3px solid var(--colour-dark-grey);
      display: block;
      padding: var(--gutter-s);
      transition: box-shadow var(--timing-s) var(--easing);
      width: 100%;

      &:focus {
        border-color: var(--colour-green);
        box-shadow: 0 0 20px 0 var(--colour-grey);
        outline: none;
      }
    }

    &:focus-within #{$parent}__label {
      background-color: var(--colour-green);
    }
  }
</style>
