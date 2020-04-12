<template>
  <form
    class="password input-field"
    :class="{ 'has-error': error }"
    js-password="container"
    @submit.prevent="handleSubmit"
  >
    <label
      class="password__label input-field__label label"
      for="password"
    >
      Password
    </label>

    <div class="password__input-group">
      <input
        id="password"
        class="password__input input-field__input"
        placeholder="Password"
        ref="passwordInput"
        :type="setInputType()"
        :aria-invalid="error"
        data-lpignore="true"
        @click="handlePasswordClick"
        @keyup="handlePasswordInput"
      >

      <button
        class="password__reveal"
        :class="{ 'is-active': reveal }"
        role="switch"
        type="button"
        :aria-checked="reveal.toString()"
        @click="revealPassword"
      >
        Reveal
      </button>
    </div>

    <span
      class="password__error"
      role="status"
      aria-live="polite"
      v-text="renderErrorText()"
    ></span>

    <button
      class="button"
      type="submit"
    >
      Submit
    </button>
  </form>
</template>

<script>
  export default {
    data() {
      return {
        error: false,
        reveal: false,
      }
    },

    props: {
      password: String,
    },

    methods: {

      /**
       * Renders error text.
       */
      renderErrorText() {
        if (this.error) {
          return 'You\'ve enter the password incorrectly';
        }

        return '';
      },

      /**
       * Handle password input click.
       */
      handlePasswordClick() {
        const element = this.$refs.passwordInput;
        element.setSelectionRange(0, element.value.length);
      },

      /**
       * Handle password field input.
       */
      handlePasswordInput() {
        this.error = false;
      },

      /**
       * Reveal the password value.
       */
      revealPassword() {
        this.reveal = !this.reveal;
      },

      /**
       * Sets password input type.
       */
      setInputType() {
        if (this.reveal) {
          return 'text';
        }

        return 'password';
      },

      /**
       * Submit the password input.
       */
      handleSubmit() {
        if (this.$refs.passwordInput.value === this.password) {
          window.VueEventBus.$emit('Quiz:Unlock');
          return;
        }

        this.error = true;
      }
    }
  }
</script>
