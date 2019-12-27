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

  <div v-else-if="question.type === 'select'">
    <Select
      v-for="(part, index) in question.choices"
      :choices="part"
      :selectGroup="index"
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
  import Select from './types/Select.vue';
  import TextField from './types/TextField.vue';

  export default {
    components: {
      Radio,
      Select,
      TextField,
    },

    props: {
      question: Object,
      step: Number,
    },
  }
</script>
