<script setup>
const props = defineProps({
  modelValue: String,
  inputType: String,
  isDisabled: Boolean,
  placeholderText: String,
})
</script>

<template>
  <textarea :type="inputType" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"
    :readonly="isDisabled" :placeholder="placeholderText" rows="5"
    class="focus:ring-1 focus:ring-cd-ruby shadow-inner focus:outline-none font-poppins p-3
  bg-slate-100 rounded-md"></textarea>
</template>