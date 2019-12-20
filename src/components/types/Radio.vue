<template>
  <fieldset
    class="choices__type radio"
    :class="{ 'radio--no-padding': !choices.label }"
    js-choices="group"
  >
    <div class="radio__container">
      <legend
        class="radio__legend"
        v-if="choices.label"
      >
        {{ choices.label }}
      </legend>

      <div
        v-for="(singleChoice, index) in choices.answers"
        class="radio__group"
        :key="index"
      >
        <input
          :id="handleiseId(step, singleChoice)"
          class="radio__input"
          :name="`${step}-${radioGroup}`"
          type="radio"
          @change="handleInput"
        >

        <label
          class="radio__label"
          :for="handleiseId(step, singleChoice)"
        >
          {{ singleChoice.label }}
        </label>
      </div>
    </div>
  </fieldset>
</template>

<script>
  export default {
    props: {
      choices: Object,
      radioGroup: Number,
      step: Number,
    },

    methods: {
      handleiseId(step, choice) {
        return `${step}-${choice.label.toLowerCase().replace(/\s/g, '-')}`;
      },

      handleInput() {
        const data = {
          step: this.step,
          group: this.radioGroup,
        }

        window.VueEventBus.$emit('Question:Input', data);
      }
    },
  }
</script>

<style lang="scss" scoped>
  .radio {
    $parent: &;
    border: 0;
    // Pushes radio group down so margin is correct
    padding-top: 33px;

    &__container {
      border: 3px solid var(--colour-dark-grey);
      padding: var(--gutter-s);
      position: relative;

    }

    &__legend {
      background-color: var(--colour-dark-grey);
      color: var(--colour-text-inverse);
      display: inline-block;
      font-size: 12px;
      font-weight: 700;
      left: -3px;
      margin-bottom: -3px;
      padding: var(--gutter-xs) var(--gutter-s);
      position: absolute;
      top: 0;
      transform: translateY(-100%);
    }

    &__group:not(:last-child) {
      margin-bottom: var(--gutter-s);
    }

    &__input {
      border: 0;
      clip: rect(0 0 0 0);
      clip-path: inset(100%);
      height: 1px;
      margin: -1px;
      overflow: hidden;
      padding: 0;
      position: absolute;
      white-space: nowrap;
      width: 1px;
    }

    &__label {
      align-items: center;
      cursor: pointer;
      display: flex;
      height: 36px;
      font-size: 18px;
      margin-left: 36px;
      padding-left: var(--gutter-s);
      position: relative;

      &::before {
        border: 3px solid var(--colour-dark-grey);
        content: '';
        display: block;
        height: 30px;
        left: -36px;
        position: absolute;
        top: 0;
        width: 30px;
      }

      &::after {
        background-color: var(--colour-dark-grey);
        content: '';
        height: 24px;
        left: -30px;
        position: absolute;
        top: 6px;
        transform: scale(0);
        transition: transform var(--timing-s) var(--easing);
        width: 24px;
      }
    }

    &__input:focus ~ #{$parent}__label {
      &::before {
        border-color: var(--colour-green);
        box-shadow: 0 0 20px 0 var(--colour-grey);
      }

      &::after {
        background-color: var(--colour-green);
      }
    }

    &__input:checked ~ #{$parent}__label {
      &::after {
        transform: scale(1);
      }
    }

    &:focus-within {
      #{$parent}__container {
        border-color: var(--colour-green);
      }

      #{$parent}__legend {
        background-color: var(--colour-green);
      }
    }

    &#{&}--no-padding {
      padding: 0;
    }
  }
</style>
