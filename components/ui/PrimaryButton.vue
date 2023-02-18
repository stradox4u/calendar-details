<script setup lang="ts">
interface Props {
  buttonType: 'button'|'reset'|'submit';
  handleClick?: (arg0: MouseEvent) => void;
  isWorking?: boolean;
}
const props = defineProps<Props>();

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
      </div>
    </div>
  </button>
</template>