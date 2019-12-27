<template>
  <div v-if="question.type === 'radio'">
    <Radio
      v-for="(part, index) in question.choices"
      :choices="part"
      :radioGroup="index"
      :key="index"
      :step="step"
    />
  </div>

  <div v-else-if="question.type === 'text'">
    <TextField
      v-for="(part, index) in question.choices"
      :textGroup="index"
      :key="index"
      :label="part.label"
      :step="step"
    />
  </div>
</template>

<script>
  import Radio from './types/Radio.vue';
  import TextField from './types/TextField.vue';

  export default {
    components: {
      Radio,
      TextField,
    },

    props: {
      question: Object,
      step: Number,
    },
  }
</script>
