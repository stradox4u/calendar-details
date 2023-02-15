<script setup>
const props = defineProps({
  dayEvents: {
    type: Array,
    required: true,
  },
  dayOfWeek: {
    type: String,
    required: true,
  },
  dateString: {
    type: String,
    required: true,
  }
})
</script>

<template>
  <div class="w-full my-3 px-6 py-8 bg-cd-cblue rounded-md shadow-md">
    <h3 class="font-montserrat text-lg font-bold pb-3 text-center">{{ dayOfWeek }}:&nbsp;{{ dateString }}</h3>
    <ul class="list-none flex justify-between items-stretch gap-4">
      <li v-for="event in dayEvents" :key="event.id" class="max-w-[25%]">
        <event-card :event="event"></event-card>
      </li>
    </ul>
  </div>
</template>