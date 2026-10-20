<template>
  <nav class="flex items-center justify-end py-4 px-4">
    <ul class="flex items-center rounded-lg cursor-pointer">
      <li
        class="py-1.5 items-center"
        @click="handlePrevious"
        :class="{ 'cursor-not-allowed': currentPage === 1 }"
        :disabled="currentPage === 1"
      >
        <i class="pi pi-angle-left" style="font-size: 1rem"></i>
      </li>

      <li v-for="page in totalPages" :key="page">
        <button
          class="py-1 px-2.5 mx-2 text-sm font-medium text-bodytext rounded"
          :class="{
            'bg-primary': page === currentPage,
            'bg-[#EBECEF]': page !== currentPage,
          }"
          @click="onPageChange(page)"
        >
          <span :class="{ 'text-white': page === currentPage }">
            {{ page }}
          </span>
        </button>
      </li>
      <li
        class="py-1.5 cursor-pointer"
        @click="handleNext"
        :disabled="currentPage === totalPages"
        :class="{ 'cursor-not-allowed': currentPage === totalPages }"
      >
        <i class="pi pi-angle-right" style="font-size: 1rem"></i>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  totalItems: {
    type: Number,
    required: true,
  },
  itemsPerPage: {
    type: Number,
    default: 10,
  },
  currentPage: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["updatePage"]);

const handlePrevious = () => {
  if (props.currentPage > 1) {
    emit("updatePage", props.currentPage - 1);
  }
};

const handleNext = () => {
  if (props.currentPage < props.totalPages) {
    emit("updatePage", props.currentPage + 1);
  }
};

const onPageChange = (page: number) => {
  emit("updatePage", page);
};
</script>
