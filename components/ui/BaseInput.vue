<script setup>
const props = defineProps({
  modelValue: String,
  inputType: String,
  isDisabled: Boolean,
})
</script>

<template>
  <input :type="inputType" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"
    :readonly="isDisabled"
    class="focus:ring-1 focus:ring-cd-ruby shadow-inner focus:outline-none font-poppins
  bg-slate-100 rounded-md" />
</template>