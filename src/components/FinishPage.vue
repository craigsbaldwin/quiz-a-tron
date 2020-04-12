<template>
  <div class="finish">
    <div
      v-if="!state.unlocked"
      class="finish__intro"
    >
      <h2>That's a wrap</h2>

      <p v-if="state.submission === 'submitted'">
        Your answers have been submitted. To review your score you must first enter a password, which I'll be providing after showing the current leaderboard.
      </p>

      <p v-else>
        Your answers haven't been submitted, you will need to manually share your score with me. To review your score you must first enter a password, which I'll be providing after showing the current leaderboard.
      </p>
    </div>

    <PasswordForm
      v-if="!state.unlocked"
      password="password"
    />
  </div>
</template>

<script>
  import PasswordForm from './PasswordForm.vue';

  export default {
    components: {
      PasswordForm,
    },

    props: {
      questions: Array,
      state: Object,
    },
  }
</script>