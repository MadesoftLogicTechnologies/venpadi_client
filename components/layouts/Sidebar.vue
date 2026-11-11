<template>
  <aside
    class="hidden md2:flex flex-col bg-white border-r border-border h-screen sticky top-0 transition-all duration-300 z-20"
    :class="collapsed ? 'w-[72px]' : 'w-[248px]'"
  >
    <div
      class="h-[64px] flex items-center px-4 border-b border-border shrink-0"
      :class="collapsed ? 'justify-center' : 'justify-between gap-2'"
    >
      <AuthVenpadiLogo v-if="!collapsed" text-class="text-base" :icon-size="26" />
      <button
        type="button"
        class="p-2 rounded-lg text-bodytext hover:bg-greybg shrink-0"
        :aria-label="collapsed ? 'Expand sidebar' : 'Collapse sidebar'"
        @click="$emit('update:collapsed', !collapsed)"
      >
        <i class="pi pi-bars text-sm"></i>
      </button>
    </div>

    <nav class="flex-1 overflow-y-auto slim-scrollbar py-4 px-3 space-y-0.5">
      <template v-for="item in items" :key="item.to">
        <NuxtLink
          :to="item.to"
          class="group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-[#374151] hover:bg-greybg transition-colors"
          :class="{
            'bg-[#F3F4F6] font-semibold text-header': isActive(item),
            'justify-center px-2': collapsed,
          }"
        >
          <span
            v-if="isActive(item) && !collapsed"
            class="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 rounded-r-full bg-primary"
          ></span>
          <i
            :class="[
              'pi text-[15px]',
              item.icon,
              isActive(item) ? 'text-primary' : 'text-[#6B7280]',
            ]"
          ></i>
          <span v-if="!collapsed">{{ item.label }}</span>
          <i
            v-if="item.children && !collapsed"
            :class="[
              'pi text-[10px] ml-auto text-bodytext2 transition-transform',
              isExpanded(item) ? 'pi-chevron-up' : 'pi-chevron-down',
            ]"
          ></i>
        </NuxtLink>

        <div
          v-if="item.children && isExpanded(item) && !collapsed"
          class="ml-4 pl-4 border-l border-border space-y-0.5 py-1 mb-1"
        >
          <NuxtLink
            v-for="child in item.children"
            :key="child.to"
            :to="child.to"
            class="block px-3 py-2 rounded-lg text-sm text-bodytext hover:bg-greybg hover:text-header transition-colors"
            active-class="!text-header font-medium bg-greybg"
          >
            {{ child.label }}
          </NuxtLink>
        </div>
      </template>
    </nav>

    <div class="px-3 pb-5 pt-2 border-t border-border space-y-2 shrink-0">
      <NuxtLink
        to="/settings"
        class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-[#374151] hover:bg-greybg"
        :class="{ 'justify-center px-2': collapsed }"
      >
        <i class="pi pi-cog text-[#6B7280] text-[15px]"></i>
        <span v-if="!collapsed">Settings</span>
      </NuxtLink>
      <NuxtLink
        to="/help"
        class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-[#374151] hover:bg-greybg"
        :class="{ 'justify-center px-2': collapsed }"
      >
        <i class="pi pi-question-circle text-[#6B7280] text-[15px]"></i>
        <span v-if="!collapsed">Help</span>
      </NuxtLink>
    </div>
  </aside>
</template>

<script setup>
defineProps({
  collapsed: { type: Boolean, default: false },
});

defineEmits(["update:collapsed"]);

const route = useRoute();

// This is the planner portal: every signed-in user here is a client. The
// venue-owner menu (venues, visibility, finance, staff …) lives in the vendor
// portal; linking to those routes from here led to empty shells.
const bookerItems = [
  { label: "Dashboard", to: "/dashboards", icon: "pi-th-large" },
  { label: "My Bookings", to: "/bookings", icon: "pi-calendar" },
  { label: "Discover Venues", to: "/discover", icon: "pi-compass" },
  { label: "Messages", to: "/messages", icon: "pi-comment" },
  { label: "Notifications", to: "/notifications", icon: "pi-bell" },
  { label: "Invoices", to: "/invoices", icon: "pi-file" },
];

const items = bookerItems;

function isActive(item) {
  return route.path === item.to || route.path.startsWith(`${item.to}/`);
}

function isExpanded(item) {
  return isActive(item);
}
</script>
