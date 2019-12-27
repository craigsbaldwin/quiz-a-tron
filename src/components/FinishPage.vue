<template>
  <div class="finish">
    <div
      v-if="!unlocked"
      class="finish__intro"
    >
      <h2>That's a wrap</h2>

      <p>
        To review your score you must first enter a password, which I'll be providing.
      </p>
    </div>

    <form
      v-if="!unlocked"
      class="finish__password text-field"
      js-password="container"
      @submit.prevent="handleSubmit"
    >
      <label
        class="finish__label text-field__label label"
        for="password"
      >
        Password
      </label>

      <div class="finish__input-group">
        <input
          id="password"
          class="finish__input text-field__input"
          placeholder="Password"
          type="password"
          aria-invalid="false"
          data-lpignore="true"
          @click="handlePasswordClick"
          @keyup="handlePasswordInput"
        >

        <button
          class="finish__reveal"
          role="switch"
          type="button"
          aria-checked="false"
          @click="revealPassword"
        >
          Reveal
        </button>
      </div>

      <span
        class="finish__error"
        role="status"
        aria-live="polite"
        js-password="error"
      ></span>

      <button
        class="button"
        type="submit"
      >
        Submit
      </button>
    </form>

    <Scoring
      v-if="unlocked"
      :questions="questions"
    />
  </div>
</template>

<script>
  import Scoring from './Scoring.vue';

  export default {
    components: {
      Scoring,
    },

    props: {
      questions: Array,
      unlocked: Boolean,
    },

    methods: {

      /**
       * Handle password input click.
       * @param {Event} event - Click event.
       */
      handlePasswordClick(event) {
        const element = event.target;
        element.setSelectionRange(0, element.value.length);
      },

      /**
       * Handle password field input.
       * @param {Event} event - Key up event.
       */
      handlePasswordInput(event) {
        const element = event.target;
        const passwordInput = element;
        const passwordContainer = element.closest('[js-password="container"]');
        const passwordError = passwordContainer.querySelector('[js-password="error"]');

        passwordError.innerText = '';
        passwordContainer.classList.remove('has-error');
        passwordInput.setAttribute('aria-invalid', false);
      },

      /**
       * Reveal the password value.
       * @param {Event} event - Click event.
       */
      revealPassword(event) {
        const element = event.target;

        if (!element.classList.contains('is-active')) {
          element.classList.add('is-active');
          element.setAttribute('aria-checked', true);
          element.previousElementSibling.setAttribute('type', 'text');
          return;
        }

        element.classList.remove('is-active');
        element.setAttribute('aria-checked', false);
        element.previousElementSibling.setAttribute('type', 'password');
      },

      /**
       * Submit the password input.
       * @param {Event} event - Click event.
       */
      handleSubmit(event) {
        const element = event.target;
        const passwordInput = element.querySelector('input');
        const passwordValue = passwordInput.value;
        const passwordContainer = element.closest('[js-password="container"]');
        const passwordError = passwordContainer.querySelector('[js-password="error"]');

        if (passwordValue === 'password') {
          window.VueEventBus.$emit('Quiz:Unlock');
          return;
        }

        passwordInput.setAttribute('aria-invalid', true);
        passwordContainer.classList.add('has-error');
        passwordError.innerText = 'You\'ve enter the password incorrectly';
      }
    }
  }
</script>