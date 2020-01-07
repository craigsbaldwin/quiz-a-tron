<template>
  <div
    class="choices__type input-field"
    js-choices="group"
  >
    <label
      class="input-field__label label"
      :for="`${step}-${numberGroup}-Number`"
    >
      {{ label }}
    </label>

    <div class="input-field__input-group">
      <input
        :id="`${step}-${numberGroup}-Number`"
        class="input-field__input"
        :placeholder="label"
        type="number"
        data-type="number"
        js-choices="input"
        @keyup="handleInput"
      >

      <span class="input-field__accuracy">
        ±{{ accuracy }}
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      accuracy: Number,
      label: String,
      step: Number,
      numberGroup: Number,
    },

    methods: {

      /**
       * Handle number input.
       * @param {Event} event - Key up event.
       */
      handleInput(event) {
        const element = event.target;
        const data = {
          step: this.step,
          group: this.numberGroup,
        }

        if (element.value === '') {
          window.VueEventBus.$emit('Question:Disable', data);
          return;
        }

        window.VueEventBus.$emit('Question:Input', data);
      }
    },
  }
</script>
