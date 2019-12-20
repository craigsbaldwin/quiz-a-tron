<template>
  <div class="buttons">
    <button
      class="button"
      :disabled="isDisabled"
      type="submit"
    >
      <span
        class="button__text button__disabled"
        :class="{ 'is-hidden': !isDisabled }"
      >
        Please provide answers
      </span>

      <span
        v-text="(step === length) ? 'Finish' : 'Next question'"
        class="button__text button__next"
        :class="{ 'is-active': !isDisabled }"
      >
        Next question
      </span>
    </button>
  </div>
</template>

<script>
  export default {
    props: {
      length: Number,
      question: Object,
      step: Number,
    },

    computed: {
      isDisabled() {
        const answered = this.question.choices.filter((choice) => choice.answered == false);

        return answered.length > 0;
      }
    }
  }
</script>

<style lang="scss">
  .button {
    background-color: var(--colour-green);
    border: 3px solid var(--colour-green);
    color: var(--colour-text-inverse);
    cursor: pointer;
    font-weight: 700;
    min-height: 76px;
    overflow: hidden;
    position: relative;
    transition: background-color var(--timing-s) var(--easing),
      border-color var(--timing-s) var(--easing),
      box-shadow var(--timing-s) var(--easing),
      color var(--timing-s) var(--easing);
    width: 100%;
    z-index: 1;

    &::before {
      border: 3px solid transparent;
      content: '';
      height: calc(100% - 6px);
      left: 0;
      position: absolute;
      top: 0;
      transition: border-color var(--timing-s) var(--easing);
      width: calc(100% - 6px);
    }

    &__text {
      display: block;
      left: 50%;
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%);
      transition: transform var(--timing-m) var(--easing);
      width: 100%;
    }

    &__disabled.is-hidden {
      transform: translate(-200%, -50%);
    }

    &__next {
      transform: translate(200%, -50%);
      width: 100%;

      &.is-active {
        transform: translate(-50%, -50%);
      }
    }

    &[disabled] {
      background-color: var(--colour-background);
      border-color: var(--colour-dark-grey);
      color: var(--colour-dark-grey);
      cursor: not-allowed;
      opacity: 0.5;
    }

    &:focus {
      box-shadow: 0 0 20px 0 var(--colour-grey);
      outline: none;

      &::before {
        border-color: var(--colour-background);
      }
    }

    &:hover:not([disabled]) {
      background-color: var(--colour-dark-green);
      border-color: var(--colour-dark-green);
    }
  }
</style>