<template>
  <div
    class="choices__type select"
    js-choices="group"
  >
    <label
      class="select__label label"
      :for="`${step}-${selectGroup}-Select`"
    >
      {{ choices.label }}
    </label>

    <div class="select__input-container">
      <select
        :id="`${step}-${selectGroup}-Select`"
        class="select__input"
        data-type="select"
        js-choices="input"
        @change="handleInput"
      >
        <option
          disabled
          selected
          value="false"
        >
          Select an answer...
        </option>

        <option
          v-for="(singleChoice, index) in choices.answers"
          :key="index"
          :value="singleChoice.label"
        >
          {{ singleChoice.label }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      choices: Object,
      step: Number,
      selectGroup: Number,
    },

    methods: {

      /**
       * Handle select change.
       * @param {Event} event - Change event.
       */
      handleInput(event) {
        const element = event.target;
        const data = {
          step: this.step,
          group: this.selectGroup,
        }

        if (element.value === 'false') {
          window.VueEventBus.$emit('Question:Disable', data);
          return;
        }

        window.VueEventBus.$emit('Question:Input', data);
      }
    },
  }
</script>
