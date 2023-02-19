<script setup lang="ts">
import { FilteredEventInterface } from '~~/types/events';

interface Props {
  dayEvents: FilteredEventInterface[],
  dayOfWeek: string,
  dateString: string
}

const props = defineProps<Props>();
</script>

<template>
  <div class="w-full my-3 px-6 py-8 bg-slate-300 rounded-md shadow-md">
    <h3 class="font-montserrat text-lg font-bold pb-3 text-center">{{ dayOfWeek }}:&nbsp;{{ dateString }}</h3>
    <ul class="list-none flex justify-between items-stretch">
      <li v-for="event in dayEvents" :key="event.id" class="w-[30%]">
        <event-card :event="event"></event-card>
      </li>
    </ul>
  </div>
</template>