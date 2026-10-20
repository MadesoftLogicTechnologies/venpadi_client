<template>
  <nav v-if="currentPage" class="flex items-center justify-between py-4 -mt-20">
    <p class="text-bodytext text-xs">
      Showing 1 to {{ itemsPerPage }} of {{ totalItems }}
      {{ totalItems === 1 ? "entry" : "entries" }}
    </p>
    <ul class="flex items-center rounded-lg cursor-pointer">
      <li
        class="py-1.5 items-center"
        @click="handlePrevious"
        :class="{ 'cursor-not-allowed': currentPage === 1 }"
        :disabled="currentPage === 1"
      >
        <i
          class="pi pi-angle-left text-[#25314C] font-light"
          style="font-size: 1rem"
        ></i>
      </li>

      <li v-for="page in pagesToShow" :key="page + '-page'">
        <button
          v-if="page !== '...'"
          class="py-1 px-2.5 mx-2 text-sm font-medium text-bodytext rounded"
          :class="{
            'bg-primary': page === currentPage,
            'bg-[#EBECEF]': page !== currentPage,
          }"
          @click="onPageChange(page as number)"
        >
          <span :class="{ 'text-white': page === currentPage }">
            {{ page }}
          </span>
        </button>
        <span v-else class="mx-2 text-sm text-bodytext"> ... </span>
      </li>

      <li
        class="py-1.5 cursor-pointer"
        @click="handleNext"
        :disabled="currentPage === totalPages"
        :class="{ 'cursor-not-allowed': currentPage === totalPages }"
      >
        <i
          class="pi pi-angle-right text-[#25314C] font-light"
          style="font-size: 1rem"
        ></i>
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

const pagesToShow = computed(() => {
  const total = props.totalPages;
  const current = props.currentPage;
  const delta = 2; // how many pages before/after current to show
  const range: (number | string)[] = [];
  const rangeWithDots: (number | string)[] = [];
  let l: number | undefined = undefined; // Initialize l safely

  for (let i = 1; i <= total; i++) {
    if (
      i === 1 ||
      i === total ||
      (i >= current - delta && i <= current + delta)
    ) {
      range.push(i);
    }
  }

  for (let i of range) {
    if (l !== undefined) {
      if (Number(i) - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (Number(i) - l > 2) {
        rangeWithDots.push("...");
      }
    }
    rangeWithDots.push(i);
    l = Number(i);
  }

  return rangeWithDots;
});
</script>
