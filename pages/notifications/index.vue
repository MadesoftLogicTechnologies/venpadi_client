<template>
  <div class="px-4 md2:px-8 py-5 md2:py-7">
    <div class="max-w-[900px]">
      <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <h1 class="text-[26px] md2:text-[28px] font-extrabold text-header tracking-tight">Notifications</h1>
          <p class="mt-1 text-[14px] text-bodytext">
            {{ data.unreadCount ? `${data.unreadCount} unread` : "You’re all caught up." }}
          </p>
        </div>
        <button
          type="button"
          class="self-start h-9 px-4 rounded-full border border-border bg-white text-[13px] font-semibold text-header hover:bg-greybg disabled:opacity-50"
          :disabled="!data.unreadCount || markingAll"
          @click="markAll"
        >
          {{ markingAll ? "Marking…" : "Mark all as read" }}
        </button>
      </div>

      <div class="mt-5 flex gap-2">
        <button
          v-for="f in filters"
          :key="f.key"
          type="button"
          class="h-9 px-4 rounded-full text-[13px] font-semibold border transition-colors"
          :class="filter === f.key ? 'bg-primary text-white border-primary' : 'bg-white text-header border-border hover:bg-greybg'"
          @click="setFilter(f.key)"
        >
          {{ f.label }}
        </button>
      </div>

      <section class="mt-4 bg-white rounded-2xl border border-border overflow-hidden">
        <p v-if="pending && !data.rows.length" class="px-5 py-10 text-center text-sm text-bodytext">Loading…</p>
        <p v-else-if="!data.rows.length" class="px-5 py-12 text-center text-[13px] text-bodytext">
          {{ filter === "unread" ? "No unread notifications." : "No notifications yet." }}
        </p>
        <div
          v-for="n in data.rows"
          :key="n.id"
          class="px-5 py-4 border-b border-border last:border-b-0 flex gap-3"
          :class="{ 'bg-[#FFFAF7]': !n.read }"
        >
          <span
            class="mt-1.5 w-2.5 h-2.5 rounded-full shrink-0"
            :class="n.read ? 'bg-[#E5E7EB]' : n.priority === 'high' ? 'bg-[#DC2626]' : 'bg-primary'"
          ></span>
          <div class="min-w-0 flex-1">
            <p class="text-[14px] font-semibold text-header">{{ n.title }}</p>
            <p class="mt-0.5 text-[13px] text-bodytext">{{ n.body }}</p>
            <p class="mt-1 text-[11px] text-bodytext2">{{ formatDateTime(n.createdAt) }} · {{ timeAgo(n.createdAt) }}</p>
          </div>
          <div class="flex flex-col items-end gap-1.5 shrink-0">
            <button
              v-if="n.link && n.link.startsWith('/')"
              type="button"
              class="text-[12px] font-semibold text-primary hover:opacity-80"
              @click="open(n)"
            >
              View
            </button>
            <button
              v-if="!n.read"
              type="button"
              class="text-[12px] font-semibold text-bodytext hover:text-header"
              @click="markRead(n)"
            >
              Mark read
            </button>
          </div>
        </div>
      </section>

      <AccountPager v-model:page="page" class="mt-4" :total="data.total" :limit="data.limit || LIMIT" />
    </div>
  </div>
</template>

<script setup>
useHead({ title: "Notifications" });

const LIMIT = 20;
const filters = [
  { key: "all", label: "All" },
  { key: "unread", label: "Unread" },
];
const filter = ref("all");
const page = ref(1);

function setFilter(key) {
  filter.value = key;
  page.value = 1;
}

const { data, pending, refresh } = useResource(
  () => api.get("/notifications", { page: page.value, limit: LIMIT, unread: filter.value === "unread" ? true : undefined }),
  { watch: [filter, page], initial: { rows: [], total: 0, limit: LIMIT, unreadCount: 0 } }
);

async function markRead(n) {
  try {
    await api.post(`/notifications/${n.id}/read`);
    n.read = true;
    refresh();
  } catch {
    /* toast shown */
  }
}

async function open(n) {
  if (!n.read) {
    try {
      await api.post(`/notifications/${n.id}/read`, {}, { toast: false });
    } catch {
      /* ignore */
    }
  }
  navigateTo(n.link);
}

const markingAll = ref(false);
async function markAll() {
  markingAll.value = true;
  try {
    await api.post("/notifications/read-all");
    notifySuccess("All notifications marked as read");
    refresh();
  } catch {
    /* toast shown */
  } finally {
    markingAll.value = false;
  }
}
</script>
