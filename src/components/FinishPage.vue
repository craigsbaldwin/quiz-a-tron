<template>
  <div class="finish">
    <div v-if="!unlocked">
      <h2>That's a wrap</h2>

      <p>
        To review your score you must first enter a password, which I'll be providing.
      </p>
    </div>

    <form
      v-if="!unlocked"
      class="finish__password text-field"
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
          data-lpignore="true"
        >

        <button
          class="finish__reveal"
          type="button"
          @click="revealPassword"
        >
          Reveal
        </button>
      </div>

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
      revealPassword(event) {
        const element = event.target;

        if (!element.classList.contains('is-active')) {
          element.classList.add('is-active');
          element.previousElementSibling.setAttribute('type', 'text');
          return;
        }

        element.previousElementSibling.setAttribute('type', 'password');
        element.classList.remove('is-active');
      },

      handleSubmit(event) {
        const element = event.target;
        const passwordInput = element.querySelector('input').value;
        window.console.log('test', passwordInput);

        if (passwordInput === 'password') {
          window.VueEventBus.$emit('Quiz:Unlock');
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .finish {
    &__input-group {
      margin-bottom: var(--gutter-s);
      position: relative;
    }

    &__reveal {
      background-color: transparent;
      background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAiIGhlaWdodD0iMzYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTY4IDE4YzAgMi0xNC43NzMgMTYtMzMgMTZDMTYuNzc1IDM0IDIgMjAgMiAxOFMxNi43NzUgMiAzNSAyYzE4LjIyNyAwIDMzIDE0IDMzIDE2eiIgc3Ryb2tlPSIjMzQ0OTVFIiBzdHJva2Utd2lkdGg9IjMiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIvPjxwYXRoIGQ9Ik0zNSAyOGMtNS41MTQgMC0xMC00LjQ4Ny0xMC0xMCAwLTUuNTE0IDQuNDg2LTEwIDEwLTEwIDUuNTE2IDAgMTAgNC40ODYgMTAgMTAgMCA1LjUxMy00LjQ4NCAxMC0xMCAxMHoiIHN0cm9rZT0iIzM0NDk1RSIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiLz48L3N2Zz4=);
      background-repeat: no-repeat;
      background-position: 50%;
      background-size: 36px auto;
      border: 0;
      cursor: pointer;
      height: 42px;
      position: absolute;
      right: var(--gutter-s);
      text-indent: -9999px;
      top: 50%;
      transform: translateY(-50%);
      width: 42px;

      &:focus {
        outline: 3px solid var(--colour-green);
      }

      &.is-active {
        background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODYiIGhlaWdodD0iMzAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTc1Ljc1IDJjMCAyLTE0Ljc3MyAxNi0zMyAxNi0xOC4yMjUgMC0zMy0xNC0zMy0xNk05Ljc1IDJsLTcuNSA2LjVNMTYuNzUgMTBsLTYuNSA3LjVNMjcuNzUgMTVsLTUuNSA4LjVNNzYuMjUgMmw3LjUgNi41TTY5LjI1IDEwbDYuNSA3LjVNNTguMjUgMTVsNS41IDguNU0zOC4yNSAxOGwtMiAxME00OC4yNSAxOGwyIDEwIiBzdHJva2U9IiMzNDQ5NUUiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48L3N2Zz4=);
        background-position: 50% 70%;
      }
    }
  }
</style>
