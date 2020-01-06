<template>
  <div>
    <PasswordForm
      v-if="!unlocked"
      password="password"
    />

    <div
      v-if="unlocked"
      class="results-table"
    >
      <div>
        {{ results[show - 1].name }}
      </div>

      <button
        v-if="show !== 1"
        type="button"
        @click="show -= 1"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script>
  import PasswordForm from './PasswordForm.vue';

  export default {
    components: {
      PasswordForm,
    },

    props: {
      results: Array,
      unlocked: Boolean,
    },

    data() {
      return {
        show: 3,
      }
    },
  }
</script>