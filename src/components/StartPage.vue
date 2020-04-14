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
        <li>30 seconds for each question, unless otherwise stated</li>
        <li>You will not be able to finish the quiz without the quiz presentation</li>
        <li>Questions are scored on their difficulty and shown underneath each question</li>
        <li>You must provide an answer to proceed</li>
        <li>You will not be able to go back once you've answered a question, no do-overs</li>
        <li>A password is required to unlock your score at the end, we will not be going through the answers one at a time</li>
        <li>If you try to debug the code to find the answers you are immediately disqualified</li>
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

    <form
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
  export default {
    data() {
      return {
        characterLimit: 128,
        startEnabled: false,
      }
    },

    props: {
      id: Number,
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
