<script setup lang="ts">
interface Props {
  modelValue: string|undefined;
  isDisabled?: boolean;
  placeholderText: string;
}
const props = defineProps<Props>();
</script>

<template>
  <textarea :value="modelValue" @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
    :readonly="isDisabled" :placeholder="placeholderText" rows="5"
    class="focus:ring-1 focus:ring-cd-ruby shadow-inner focus:outline-none font-poppins p-3
  bg-slate-100 rounded-md"></textarea>
</template>