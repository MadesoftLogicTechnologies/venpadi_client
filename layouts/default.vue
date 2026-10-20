<template>
  <div>
    <div class="md2:flex md2:justify-between">
      <LayoutsSidebar
        :collapsed="collapsed"
        @update:collapsed="handleCollapse"
      />
      <div
        :class="{
          'md2:w-[calc(100%-72px)]': collapsed,
          'md2:w-[calc(100%-248px)]': !collapsed,
        }"
        class="h-full transition-all duration-300 min-w-0 flex flex-col min-h-screen"
      >
        <LayoutsNavbar class="sticky top-0 z-30 bg-white" />
        <div class="bg-[#F3F4F6] flex-1 pb-8">
          <slot />
        </div>
        <footer
          class="py-4 px-6 text-xs sm:text-sm text-bodytext bg-white flex flex-col sm:flex-row gap-3 sm:justify-between sm:items-center border-t border-border"
        >
          <p>Venpadi © {{ year }} Venpadi Inc. All rights reserved.</p>
          <div class="flex flex-wrap gap-x-4 gap-y-1">
            <a href="#" class="hover:text-header">Privacy Policy</a>
            <a href="#" class="hover:text-header">Terms of Service</a>
            <a href="#" class="hover:text-header">Help Center</a>
            <a href="#" class="hover:text-header">Contact Support</a>
          </div>
        </footer>
      </div>
    </div>
    <Toast v-if="showToast" />
    <Loading />
  </div>
</template>

<script setup>
import Toast from "~/components/global/Toast.vue";
import Loading from "~/components/global/Loading.vue";
import { useToastStore } from "~/store/toast";
import { useSidebarStore } from "~/store/sidebar";

const sidebarStore = useSidebarStore();
const toastStore = useToastStore();
const showToast = ref(false);
const year = new Date().getFullYear();

const collapsed = computed({
  get: () => sidebarStore.collapsed,
  set: (v) => {
    sidebarStore.collapsed = v;
  },
});

function handleCollapse(newValue) {
  collapsed.value = newValue;
}

watchEffect(() => {
  showToast.value = toastStore.message !== null;
});
</script>
