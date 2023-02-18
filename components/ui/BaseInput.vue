<script setup lang="ts">
interface Props {
  modelValue: string;
  inputType: string;
  isDisabled: boolean;
}
const props = defineProps<Props>();
</script>

<template>
  <input :type="inputType" :value="modelValue" @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    :readonly="isDisabled"
    class="focus:ring-1 focus:ring-cd-ruby shadow-inner focus:outline-none font-poppins
  bg-slate-100 rounded-md" />
</template>