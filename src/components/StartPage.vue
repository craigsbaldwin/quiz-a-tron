<template>
  <div class="start">
    <div class="start__content">
      <p>
        Welcome to the <strong>Quiz-a-tron 1000</strong>, a Vue-powered quiz robot.
      </p>

      <p>
        Each week/fortnight we'll be doing a quiz in the wind down until the end of the lockdown. This is your chance to win the minipresso that has been sat on my desk for over a year.
      </p>

      <p class="start__warning">
        If you refresh or navigate away from the page you will lose all your progress!
      </p>
    </div>

    <div class="start__container">
      <h2 class="start__label label">Rules</h2>

      <ul class="start__group outlined-group">
        <li>You will need a password to start the quiz</li>
        <li>30 seconds for each question, unless otherwise stated</li>
        <li>You will not be able to finish the quiz without the quiz presentation</li>
        <li>Questions are scored on their difficulty and shown underneath each question</li>
        <li>You must provide an answer to proceed</li>
        <li>You will not be able to go back once you've answered a question, no do-overs</li>
        <li>A password is required to unlock your score at the end, we will not be going through the answers one at a time</li>
        <li>If you try to cheat you are immediately disqualified</li>
        <li>I will make the source code available later</li>
      </ul>
    </div>

    <h2>Prize</h2>

    <div class="start__prize">
      <img
        alt="Minipresso"
        src="../assets/prize.png"
      >

      <div class="start__prize-description">
        <p>
          minipresso<br>
          <strong>RRP: £50.00</strong>
        </p>

        <small>
          <p>
            Make and enjoy a full cup of coffee wherever your wanderlust takes you with the all-in-one Pipamoka, the first portable coffee maker to use vacuum pressure for a quick, rich brew.
          </p>
        </small>
      </div>
    </div>

    <PasswordForm
      v-if="locked && !debug"
      password="password"
    />

    <form
      v-else
      class="start__form input-field"
      @submit.prevent="handleStart"
    >
      <label
        class="start__label input-field__label label"
        for="name"
      >
        Name ({{ this.characterLimit }} characters maximum)
      </label>

      <input
        id="name"
        class="start__input input-field__input"
        :max="characterLimit"
        placeholder="Name"
        ref="nameInput"
        type="text"
        @keyup="handleNameInput"
      >

      <button
        v-text="(startEnabled) ? 'Start quiz' : 'Enter name to start'"
        class="button"
        :disabled="!startEnabled"
        type="submit"
        @click="handleStart"
      ></button>
    </form>

    <footer class="footer">
      <small class="footer__copyright">
        Built by <a href="https://craigbaldwin.com" target="blank">Craig Baldwin</a> 2020.
      </small>

      <small class="footer__id">
        Round {{ id }}
      </small>
    </footer>
  </div>
</template>

<script>
  import PasswordForm from './PasswordForm.vue';

  export default {
    components: {
      PasswordForm,
    },

    data() {
      return {
        characterLimit: 128,
        startEnabled: false,
      }
    },

    props: {
      debug: Boolean,
      id: Number,
      locked: Boolean,
    },

    mounted() {

      /**
       * EventBus.
       */
      window.VueEventBus.$on('Quiz:Unlock', () => {
        window.setTimeout(() => {
          this.$refs.nameInput.focus();
        }, 0);
      });
    },

    methods: {

      /**
       * Handle name input.
       * @param {Event} event - Keyup event.
       */
      handleNameInput(event) {
        if (event.target.value.length > this.characterLimit || event.target.value.length === 0) {
          this.startEnabled = false;
          return;
        }

        window.VueEventBus.$emit('Quiz:SetName', event.target.value);
        this.startEnabled = true;
      },

      /**
       * Start the quiz.
       */
      handleStart() {
        window.VueEventBus.$emit('Quiz:Start');
      },
    },
  }
</script>
