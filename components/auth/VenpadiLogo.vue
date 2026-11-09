<template>
  <img
    :src="src"
    alt="Venpadi"
    class="object-contain object-left"
    :class="[className, heightClass]"
    :style="imgStyle"
  />
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
  /** Kept for call-site compatibility; maps to image height. */
  textClass: {
    type: String,
    default: "text-lg",
  },
  iconSize: {
    type: [Number, String],
    default: 28,
  },
});

/**
 * logo1 — light bg: black "Ven" + gradient "padi"
 * logo2 — light bg: gradient "Ven" + black "padi"
 * logo3 — dark bg: white "Ven" + gradient "padi"
 * logo4 — dark bg: gradient "Ven" + white "padi"
 */
const src = computed(() => {
  if (props.dark) {
    return props.brand ? "/images/logo4.png" : "/images/logo3.png";
  }
  return props.brand ? "/images/logo2.png" : "/images/logo1.png";
});

const heightClass = computed(() => {
  const map = {
    "text-base": "h-6",
    "text-lg": "h-7",
    "text-xl": "h-8",
    "text-2xl": "h-9",
  };
  return map[props.textClass] || "";
});

const imgStyle = computed(() => {
  if (heightClass.value) return { width: "auto" };
  const h = Number(props.iconSize) || 28;
  return { height: `${h}px`, width: "auto" };
});
</script>
