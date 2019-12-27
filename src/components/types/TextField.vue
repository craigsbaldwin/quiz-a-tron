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
      data-type="text"
      js-choices="input"
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

      /**
       * Handle text input.
       * @param {Event} event - Key up event.
       */
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
