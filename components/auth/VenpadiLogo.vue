<template>
  <div class="flex items-center gap-2" :class="className">
    <svg
      :width="iconSize"
      :height="iconSize"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        v-if="brand"
        d="M16 4.5L5.5 13.2V27h21V13.2L16 4.5z"
        :fill="iconColor"
      />
      <rect
        v-if="brand"
        x="13.5"
        y="15"
        width="5"
        height="5"
        rx="0.6"
        fill="#FFFFFF"
      />
      <path
        v-if="!brand"
        d="M16 4.5L5.5 13.2V27h7.2v-7.5h6.6V27H26.5V13.2L16 4.5z"
        :stroke="iconColor"
        fill="none"
        stroke-width="2"
        stroke-linejoin="round"
      />
      <circle
        v-if="!brand"
        cx="16"
        cy="16.5"
        r="2.4"
        :fill="iconColor"
      />
    </svg>
    <span
      class="font-semibold tracking-tight"
      :class="[textClass, wordmarkClass]"
    >
      Venpadi
    </span>
  </div>
</template>

<script setup>
const props = defineProps({
  dark: {
    type: Boolean,
    default: false,
  },
  brand: {
    type: Boolean,
    default: false,
  },
  className: {
    type: String,
    default: "",
  },
  textClass: {
    type: String,
    default: "text-lg",
  },
  iconSize: {
    type: [Number, String],
    default: 28,
  },
});

const iconColor = computed(() => (props.dark ? "#FFFFFF" : "#FF4D17"));

const wordmarkClass = computed(() => {
  if (props.dark) return "text-white";
  if (props.brand) return "text-primary";
  return "text-header";
});
</script>
