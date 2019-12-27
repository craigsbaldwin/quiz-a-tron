<template>
  <fieldset
    class="choices__type radio"
    :class="{ 'radio--no-padding': !choices.label }"
    js-choices="group"
  >
    <div class="radio__container outlined-group">
      <legend
        class="radio__legend label"
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
          data-type="radio"
          js-choices="input"
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

      /**
       * Create a handle ID for accessibility.
       */
      handleiseId(step, choice) {
        return `${step}-${choice.label.toLowerCase().replace(/\s/g, '-')}`;
      },

      /**
       * Handle radio choice.
       */
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
