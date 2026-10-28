<template>
  <div class="px-4 md2:px-8 py-5 md2:py-7">
    <div class="w-full">
      <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div>
          <h1 class="text-[26px] md2:text-[32px] font-extrabold text-header tracking-tight">Notifications</h1>
          <p class="mt-1 text-[14px] text-bodytext">
            Stay updated on your venue bookings, proposals, and messages.
          </p>
        </div>
        <div class="flex items-center gap-3 shrink-0">
          <button
            type="button"
            class="text-[13px] font-semibold text-primary hover:opacity-80 disabled:opacity-40"
            :disabled="!data.unreadCount || markingAll"
            @click="markAll"
          >
            {{ markingAll ? "Marking…" : "Mark all as read" }}
          </button>
          <NuxtLink
            to="/settings?tab=privacy"
            class="w-9 h-9 rounded-xl border border-border bg-white text-bodytext hover:bg-greybg hover:text-header inline-flex items-center justify-center"
            aria-label="Notification settings"
          >
            <i class="pi pi-cog text-[14px]"></i>
          </NuxtLink>
        </div>
      </div>

      <div class="mt-6 flex flex-col md2:flex-row md2:items-center gap-3">
        <div class="flex items-center gap-5">
          <button
            v-for="f in filters"
            :key="f.key"
            type="button"
            class="pb-2 text-[14px] font-semibold border-b-2 -mb-px inline-flex items-center gap-1.5"
            :class="filter === f.key ? 'text-header border-header' : 'text-bodytext border-transparent hover:text-header'"
            @click="setFilter(f.key)"
          >
            {{ f.label }}
            <span
              v-if="f.key === 'unread' && data.unreadCount"
              class="min-w-[18px] h-[18px] px-1 rounded-full bg-primary text-white text-[10px] font-bold inline-flex items-center justify-center"
            >
              {{ data.unreadCount }}
            </span>
          </button>
        </div>
        <div class="md2:ml-auto w-full md2:w-[280px]">
          <Search v-model="search" kind="grey" placeholder="Filter notifications..." />
        </div>
      </div>

      <section class="mt-4 bg-white rounded-[24px] border border-border overflow-hidden">
        <p v-if="pending && !data.rows.length" class="px-5 py-10 text-center text-sm text-bodytext">Loading…</p>
        <p v-else-if="!visibleRows.length" class="px-5 py-12 text-center text-[13px] text-bodytext">
          {{ emptyCopy }}
        </p>
        <article
          v-for="n in visibleRows"
          :key="n.id"
          class="px-5 py-4 border-b border-border last:border-b-0 flex gap-3"
          :class="n.read ? 'border-l-4 border-l-transparent' : 'bg-[#FFFAF7] border-l-4 border-l-primary'"
        >
          <span
            class="mt-0.5 w-10 h-10 rounded-xl bg-greybg text-header flex items-center justify-center shrink-0"
          >
            <i :class="['pi text-[14px]', iconFor(n)]"></i>
          </span>
          <div class="min-w-0 flex-1">
            <div class="flex items-start justify-between gap-3">
              <p class="text-[14px] font-bold text-header leading-snug">{{ n.title || n.typeLabel || "Update" }}</p>
              <p class="text-[12px] text-bodytext2 shrink-0 whitespace-nowrap">{{ timeAgo(n.createdAt) }}</p>
            </div>
            <p v-if="n.body" class="mt-1 text-[13px] text-bodytext leading-relaxed">{{ n.body }}</p>
            <div class="mt-2 flex flex-wrap items-center gap-3">
              <button
                v-if="actionHref(n)"
                type="button"
                class="text-[13px] font-semibold text-primary hover:opacity-80"
                @click="open(n)"
              >
                {{ actionLabel(n) }}
              </button>
              <button
                v-if="!n.read"
                type="button"
                class="text-[13px] font-semibold text-bodytext hover:text-header"
                @click="markRead(n)"
              >
                Mark as read
              </button>
            </div>
          </div>
        </article>
      </section>

      <div v-if="pages > 1" class="mt-4 flex justify-center">
        <nav class="flex items-center gap-1" aria-label="Notification pages">
          <button
            type="button"
            class="w-8 h-8 rounded-lg border border-border bg-white text-bodytext hover:bg-greybg disabled:opacity-40"
            :disabled="page <= 1"
            aria-label="Previous page"
            @click="page -= 1"
          >
            <i class="pi pi-chevron-left text-[10px]"></i>
          </button>
          <button
            v-for="n in pageNumbers"
            :key="n"
            type="button"
            class="w-8 h-8 rounded-lg text-[12px] font-semibold"
            :class="n === page ? 'bg-header text-white' : 'border border-border bg-white text-header hover:bg-greybg'"
            @click="page = n"
          >
            {{ n }}
          </button>
          <button
            type="button"
            class="w-8 h-8 rounded-lg border border-border bg-white text-bodytext hover:bg-greybg disabled:opacity-40"
            :disabled="page >= pages"
            aria-label="Next page"
            @click="page += 1"
          >
            <i class="pi pi-chevron-right text-[10px]"></i>
          </button>
        </nav>
      </div>
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
const search = ref("");

function setFilter(key) {
  filter.value = key;
  page.value = 1;
}

const { data, pending, refresh } = useResource(
  () => api.get("/notifications", { page: page.value, limit: LIMIT, unread: filter.value === "unread" ? true : undefined }),
  { watch: [filter, page], initial: { rows: [], total: 0, limit: LIMIT, unreadCount: 0 } }
);

const visibleRows = computed(() => {
  const q = search.value.trim().toLowerCase();
  const rows = data.value.rows ?? [];
  if (!q) return rows;
  return rows.filter((n) => `${n.title || ""} ${n.body || ""} ${n.typeLabel || ""}`.toLowerCase().includes(q));
});

const emptyCopy = computed(() => {
  if (search.value.trim()) return "No notifications match that filter.";
  if (filter.value === "unread") return "No unread notifications.";
  return "No notifications yet.";
});

const pages = computed(() => Math.max(1, Math.ceil((data.value.total || 0) / (data.value.limit || LIMIT))));
const pageNumbers = computed(() => {
  const total = pages.value;
  const current = page.value;
  let end = Math.min(total, Math.max(current + 1, 3));
  let start = Math.max(1, end - 2);
  end = Math.min(total, start + 2);
  const nums = [];
  for (let n = start; n <= end; n += 1) nums.push(n);
  return nums;
});

function iconFor(n) {
  const text = `${n.title || ""} ${n.body || ""} ${n.type || ""} ${n.typeLabel || ""}`.toLowerCase();
  if (/paid|invoice|payment|receipt/.test(text)) return "pi-wallet";
  if (/message|reply/.test(text)) return "pi-comment";
  if (/booking|confirm|proposal|contract/.test(text)) return "pi-calendar";
  if (/system|platform|release|update/.test(text)) return "pi-megaphone";
  return "pi-bell";
}

function actionHref(n) {
  const href = n.link || n.href || "";
  return String(href).startsWith("/") ? href : "";
}

function actionLabel(n) {
  const href = actionHref(n);
  const title = n.title || "";
  if (/message|reply/i.test(title) || href.includes("/messages")) return "Reply";
  if (href.includes("/invoices")) return "View Invoice";
  if (href.includes("/bookings")) return "View Booking";
  if (/release|platform|update/i.test(title)) return "Read Release Notes";
  return n.linkLabel || "View";
}

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
  const href = actionHref(n);
  if (!href) return;
  if (!n.read) {
    try {
      await api.post(`/notifications/${n.id}/read`, {}, { toast: false });
    } catch {
      /* ignore */
    }
  }
  navigateTo(href);
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
