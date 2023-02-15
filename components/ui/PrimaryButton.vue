<script setup>
import spinner from "../../public/loading-spinner.svg";
const props = defineProps({
  buttonType: {
    type: String,
    required: true,
  },
  handleClick: {
    type: Function,
    required: false,
  },
  isWorking: {
    type: Boolean,
    default: false,
  }
})
// const spinner = 
</script>

<template>
  <button :type="buttonType" @click="handleClick"
    class="bg-cd-pumpkin px-6 py-1 rounded-md shadow-md font-montserrat text-base font-semibold
      hover:opacity-75" :disabled="isWorking">
    <div class="flex justify-around">
      <div class="flex justify-between items-center">
        <span>
          <slot></slot>
        </span>
        <img v-if="isWorking" src="/loading-spinner.svg"
          class="animate-spin h-5 w-5" />
        <!-- <svg v-if="isWorking" class="animate-spin h-5 w-5" :src="spinner"></svg> -->
      </div>
    </div>
  </button>
</template>