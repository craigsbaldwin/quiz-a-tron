<template>
  <div class="finish">
    <div
      v-if="!unlocked"
      class="finish__intro"
    >
      <h2>That's a wrap</h2>

      <p>
        Your answers have been submitted. To review your score you must first enter a password, which I'll be providing after announcing who's won.
      </p>
    </div>

    <PasswordForm
      v-if="!unlocked"
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
      unlocked: Boolean,
    },
  }
</script>