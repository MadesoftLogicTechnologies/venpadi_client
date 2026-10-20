<template>
  <button
    v-bind="$attrs"
    class="shadow-md transition-all duration-200 ease-out transform-gpu hover:-translate-y-0.5 active:translate-y-0 active:scale-95 ripple disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:active:scale-100"
    :class="[sizeClasses, typeClasses, props.className]"
    :disabled="loading || disabled"
  >
    <span v-if="loading" class="flex items-center gap-2">
      <i class="pi pi-spin pi-spinner mt-1 animate-loading-spin"></i>
      <span v-if="label">{{ label }}</span>
    </span>
    <span v-else class="flex items-center gap-2 justify-center">
      <span
        v-if="icon && iconPosition === 'before'"
        class="icon-before transition-transform duration-200 group-hover:scale-110"
      >
        <template v-if="isImageIcon">
          <img :src="icon" alt="" class="w-4 h-4" />
        </template>
        <template v-else>
          <i :class="icon" class="mt-0.5"></i>
        </template>
      </span>

      <span v-if="label">{{ label }}</span>

      <span
        v-if="icon && iconPosition === 'after'"
        class="icon-after transition-transform duration-200 group-hover:scale-110"
      >
        <template v-if="isImageIcon">
          <img :src="icon" alt="" class="w-4 h-4" />
        </template>
        <template v-else>
          <i :class="icon" class="mt-0.5"></i>
        </template>
      </span>
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";

type SizeTypes = "xs" | "sm" | "md" | "lg" | "xl";
type KindTypes =
  | "primary"
  | "primary2"
  | "gradient"
  | "border"
  | "border-danger"
  | "border-success"
  | "grey"
  | "danger"
  | "dark"
  | "current"
  | "border-disabled"
  | "disabled"
  | "ghost";
type IconPosition = "before" | "after";

const props = defineProps({
  size: {
    type: String as () => SizeTypes,
    required: false,
    default: "md",
  },
  label: {
    type: String,
    required: false,
  },
  loading: {
    type: Boolean,
    required: false,
    default: false,
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
  kind: {
    type: String as () => KindTypes,
    required: false,
    default: "primary",
  },
  loaderClass: {
    type: String,
    required: false,
    default: "w-4 h-4 text-gray-200 fill-primary",
  },
  className: {
    type: String,
    required: false,
  },
  icon: {
    type: String,
    required: false,
  },
  iconPosition: {
    type: String as () => IconPosition,
    required: false,
    default: "before",
  },
});

const isImageIcon = computed(() => {
  return (
    props.icon?.startsWith("http") ||
    props.icon?.endsWith(".png") ||
    props.icon?.endsWith(".svg") ||
    props.icon?.endsWith(".jpg")
  );
});

const sizeClasses = computed((): string => {
  let result: string = "";
  switch (props.size) {
    case "xs":
      result = "px-2 py-1.5 text-xs";
      break;
    case "sm":
      result = "px-2 py-1.5 text-sm";
      break;
    case "md":
      result = "text-sm px-5 py-2.5";
      break;
    case "lg":
      result = "px-5 py-3.5 text-base";
      break;
    case "xl":
      result = "text-base px-6 py-3.5";
      break;
    default:
      break;
  }
  return result;
});

const typeClasses = computed((): string => {
  let result: string = "";
  switch (props.kind) {
    case "primary":
    case "gradient":
      result =
        "bg-brand-gradient text-white rounded-xl flex justify-center hover:opacity-95 shadow-none";
      break;
    case "primary2":
      result =
        "bg-[#FFF1EB] text-primary rounded-xl flex justify-center hover:opacity-90";
      break;
    case "border":
      result =
        "border border-border text-header bg-white rounded-xl flex justify-center hover:bg-greybg shadow-none";
      break;
    case "border-disabled":
      result =
        "border border-gray-300 text-gray-300 rounded-xl flex justify-center cursor-not-allowed shadow-none";
      break;
    case "border-danger":
      result =
        "border border-error text-error rounded-xl flex justify-center shadow-none";
      break;
    case "border-success":
      result =
        "border border-success text-success rounded-xl flex justify-center shadow-none";
      break;
    case "grey":
      result =
        "border bg-success text-white rounded-xl flex justify-center shadow-none";
      break;
    case "danger":
      result =
        "text-white bg-error rounded-xl flex justify-center hover:opacity-90";
      break;
    case "dark":
      result =
        "bg-dark text-white rounded-xl flex justify-center hover:opacity-90";
      break;
    case "current":
      result = "bg-[#FFF1EB] text-primary rounded-xl flex justify-center";
      break;
    case "ghost":
      result =
        "bg-transparent text-bodytext rounded-xl flex justify-center shadow-none hover:text-header";
      break;
    case "disabled":
      result =
        "bg-brand-gradient text-white rounded-xl flex justify-center opacity-50 cursor-not-allowed";
      break;
    default:
      break;
  }
  return result;
});
</script>
