<template>
  <div>
    <Card
      :class="[
        'grid gap-4 p-3',
        items.length === 2
          ? 'grid-cols-1 sm:grid-cols-2'
          : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-4',
        kind === 2 ? 'bg-none' : 'rounded bg-white shadow-lg',
      ]"
    >
      <div
        v-for="(item, index) in items"
        :key="index"
        :class="[
          'flex justify-between items-center rounded-lg px-3 h-24 relative',
          index === 0
            ? 'bg-blue-bg'
            : index === 1
            ? 'bg-purple-bg'
            : index === 2
            ? 'bg-green-bg'
            : index === 3
            ? 'bg-orange-bg'
            : '',
        ]"
      >
        <div
          :class="[
            'absolute w-1 h-10 rounded-r-2xl left-0',
            index === 0
              ? 'bg-[#1D80FC]'
              : index === 1
              ? 'bg-[#6221F5]'
              : index === 2
              ? 'bg-[#019063]'
              : index === 3
              ? 'bg-[#FF8303]'
              : '',
          ]"
        ></div>
        <div class="flex flex-col">
          <div class="flex flex-col">
            <p class="text-bodytext capitalize text-sm">{{ item.title }}</p>
            <p class="text-lg font-semibold text-header">{{ item.value }}</p>
          </div>

          <!-- FIXED: Use Number(item.stats) and apply text color separately -->
          <div v-if="item.stats" class="flex items-center space-x-2 pt-1">
            <div
              :class="[
                Number(item.stats) > 0
                  ? 'bg-[#45B369] bg-opacity-20'
                  : 'bg-[#EF4A00] bg-opacity-20',
                'flex items-center space-x-1 text-xs font-medium p-1 rounded',
              ]"
            >
              <i
                :class="[
                  'text-xs',
                  Number(item.stats) > 0
                    ? 'pi pi-arrow-up-right text-[#45B369]'
                    : 'pi pi-arrow-down-right text-[#EF4A00]',
                ]"
              ></i>
              <p
                :class="
                  Number(item.stats) > 0 ? 'text-[#45B369]' : 'text-[#EF4A00]'
                "
              >
                {{ Math.abs(item.stats) }}%
              </p>
            </div>
            <p class="text-bodytext text-xs">From last month</p>
          </div>
        </div>
        <div class="flex justify-center items-start w-8 h-8">
          <img :src="item.icon" alt="" />
        </div>
      </div>
    </Card>
  </div>
</template>

<script setup>
import Card from "./Card.vue";
const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  kind: {
    type: Number,
    default: 1,
  },
  stats: {
    type: Number,
    default: null,
  },
});
</script>
