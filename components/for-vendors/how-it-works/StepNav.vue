<template>
  <nav
    class="sticky top-[4.5rem] z-40 border-y border-[#E8E4DF] bg-[#F7F5F2]/95 backdrop-blur"
    aria-label="How it works steps"
  >
    <div class="mx-auto max-w-7xl overflow-x-auto px-4 sm:px-6 lg:px-8">
      <ol class="flex min-w-max items-center gap-0 py-4">
        <li
          v-for="(step, i) in steps"
          :key="step.id"
          class="flex items-center"
        >
          <button
            type="button"
            class="group relative flex items-center gap-2.5 whitespace-nowrap rounded-full px-1 py-1 transition"
            :class="activeIndex === i ? 'active-step px-3' : ''"
            :aria-current="activeIndex === i ? 'step' : undefined"
            @click="scrollTo(i)"
          >
            <span
              class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[13px] font-semibold leading-none transition"
              :class="
                activeIndex === i
                  ? 'bg-primary text-white'
                  : 'bg-[#E8E4DF] text-[#8A847C]'
              "
            >
              {{ i + 1 }}
            </span>
            <span
              class="text-[13px] font-medium leading-none transition"
              :class="
                activeIndex === i
                  ? 'font-semibold text-[#FF2D55]'
                  : 'text-[#8A847C]'
              "
            >
              {{ step.label }}
            </span>
          </button>

          <span
            v-if="i < steps.length - 1"
            class="mx-3 h-px w-8 sm:w-10 md:w-12"
            :class="i < activeIndex ? 'bg-primary' : 'bg-[#E8E4DF]'"
            aria-hidden="true"
          />
        </li>
      </ol>
    </div>
  </nav>
</template>

<script setup>
const steps = [
  { id: "step-1", label: "Create Account" },
  { id: "step-2", label: "Build Profile" },
  { id: "step-3", label: "Set Pricing" },
  { id: "step-4", label: "Calendar" },
  { id: "step-5", label: "Go Live" },
  { id: "step-6", label: "Enquiries" },
  { id: "step-7", label: "Get Paid" },
];

const activeIndex = ref(0);
let ticking = false;
let lockUntil = 0;

function getScrollOffset() {
  // Site header (~4.5rem) + sticky step nav (~4rem)
  return 140;
}

function updateActiveFromScroll() {
  if (Date.now() < lockUntil) return;

  const offset = getScrollOffset();
  let current = 0;

  for (let i = 0; i < steps.length; i++) {
    const el = document.getElementById(steps[i].id);
    if (!el) continue;
    if (el.getBoundingClientRect().top - offset <= 1) {
      current = i;
    }
  }

  activeIndex.value = current;
}

function onScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    updateActiveFromScroll();
    ticking = false;
  });
}

onMounted(() => {
  updateActiveFromScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", onScroll);
  window.removeEventListener("resize", onScroll);
});

function scrollTo(index) {
  const step = steps[index];
  const el = document.getElementById(step?.id);
  if (!el) return;

  activeIndex.value = index;
  // Keep click selection while smooth scroll settles
  lockUntil = Date.now() + 900;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}
</script>

<style scoped>
.active-step::before,
.active-step::after {
  content: "";
  position: absolute;
  top: 50%;
  width: 10px;
  height: 34px;
  border-color: #ff2d55;
  border-style: solid;
  pointer-events: none;
}

.active-step::before {
  left: 0;
  transform: translateY(-50%);
  border-width: 2.5px 0 2.5px 2.5px;
  border-radius: 10px 0 0 10px;
}

.active-step::after {
  right: 0;
  transform: translateY(-50%);
  border-width: 2.5px 2.5px 2.5px 0;
  border-radius: 0 10px 10px 0;
}
</style>
