<script setup>
const props = defineProps({
  buttonType: {
    type: String,
    required: true,
  },
  handleClick: {
    type: Function,
    required: false,
  }
})

</script>

<template>
  <button :type="buttonType" @click="handleClick"
    class="bg-cd-pumpkin px-6 py-1 rounded-md shadow-md font-montserrat text-base font-semibold">
    <slot></slot>
  </button>
</template>