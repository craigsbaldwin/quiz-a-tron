<template>
  <div
    class="choices__type radio"
    js-choices="group"
  >
    <div
      v-for="(singleChoice, index) in choice"
      class="radio__group"
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
    $parent: &;
    border: 3px solid var(--colour-dark-grey);
    padding: var(--gutter-s);

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
        width: 24px;
      }
    }

    &__input:focus ~ #{$parent}__label {
      &::before {
        box-shadow: 0 0 20px 0 var(--colour-grey);
      }
    }

    &__input:checked ~ #{$parent}__label {
      &::after {
        transform: scale(1);
      }
    }
  }
</style>
