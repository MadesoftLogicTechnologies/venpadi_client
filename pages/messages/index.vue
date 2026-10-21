<template>
  <div class="px-4 md2:px-8 py-5 md2:py-7">
    <div class="max-w-[1180px]">
      <div class="flex items-end justify-between gap-3">
        <div>
          <h1 class="text-[26px] md2:text-[28px] font-extrabold text-header tracking-tight">Messages</h1>
          <p class="mt-1 text-[14px] text-bodytext">
            Talk to venues about your bookings.
            <template v-if="unread.unreadMessages">{{ unread.unreadMessages }} unread.</template>
          </p>
        </div>
      </div>

      <div
        class="mt-5 bg-white rounded-2xl border border-border overflow-hidden grid grid-cols-1 md2:grid-cols-[320px_minmax(0,1fr)] min-h-[560px]"
      >
        <!-- list -->
        <aside class="border-b md2:border-b-0 md2:border-r border-border flex flex-col" :class="{ 'hidden md2:flex': activeId || composing }">
          <div class="p-3 border-b border-border">
            <Search v-model="search" kind="grey" placeholder="Search conversations" />
          </div>
          <div class="flex-1 overflow-y-auto">
            <p v-if="listPending && !conversations.rows.length" class="px-4 py-6 text-[13px] text-bodytext">Loading…</p>
            <p v-else-if="!conversations.rows.length" class="px-4 py-8 text-center text-[13px] text-bodytext">
              No conversations yet. Start one from a booking with “Message venue”.
            </p>
            <button
              v-for="c in conversations.rows"
              :key="c.id"
              type="button"
              class="w-full text-left px-4 py-3 border-b border-border flex gap-3 hover:bg-greybg"
              :class="{ 'bg-[#FFF6F0]': c.id === activeId }"
              @click="select(c.id)"
            >
              <span class="w-10 h-10 rounded-full overflow-hidden bg-greybg shrink-0 flex items-center justify-center text-[12px] font-bold text-primary">
                <img v-if="c.counterpart?.avatarUrl" :src="c.counterpart.avatarUrl" alt="" class="w-full h-full object-cover" />
                <template v-else>{{ c.counterpart?.initials }}</template>
              </span>
              <span class="min-w-0 flex-1">
                <span class="flex items-center justify-between gap-2">
                  <span class="text-[13px] font-semibold text-header truncate">{{ c.counterpart?.name }}</span>
                  <span class="text-[11px] text-bodytext2 shrink-0">{{ c.lastMessageAt ? timeAgo(c.lastMessageAt) : "" }}</span>
                </span>
                <span class="block text-[12px] text-header truncate">{{ c.subject }}</span>
                <span class="flex items-center justify-between gap-2">
                  <span class="text-[12px] text-bodytext truncate">{{ c.lastMessagePreview }}</span>
                  <span
                    v-if="c.unreadCount"
                    class="min-w-[18px] h-[18px] px-1 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center shrink-0"
                  >
                    {{ c.unreadCount }}
                  </span>
                </span>
              </span>
            </button>
          </div>
        </aside>

        <!-- thread -->
        <section class="flex flex-col min-h-[560px]" :class="{ 'hidden md2:flex': !activeId && !composing }">
          <template v-if="composing">
            <div class="px-5 py-4 border-b border-border flex items-center gap-3">
              <button type="button" class="md2:hidden text-bodytext" aria-label="Back" @click="composing = false">
                <i class="pi pi-arrow-left"></i>
              </button>
              <div>
                <p class="text-[15px] font-bold text-header">New message</p>
                <p class="text-[12px] text-bodytext">To {{ composeTarget.label }}</p>
              </div>
            </div>
            <form class="p-5 space-y-3" @submit.prevent="startConversation">
              <label class="block">
                <span class="text-[13px] font-medium text-header">Subject</span>
                <input
                  v-model="newSubject"
                  type="text"
                  maxlength="191"
                  class="mt-1 w-full h-11 rounded-xl border border-border px-3 text-[13px] outline-none focus:border-primary"
                />
              </label>
              <label class="block">
                <span class="text-[13px] font-medium text-header">Message <span class="text-primary">*</span></span>
                <textarea
                  v-model="newBody"
                  rows="6"
                  class="mt-1 w-full rounded-xl border border-border px-3 py-2 text-[13px] outline-none focus:border-primary"
                  placeholder="Ask the venue anything about your event"
                ></textarea>
              </label>
              <div class="flex justify-end gap-2">
                <button type="button" class="h-10 px-4 rounded-full border border-border text-[13px] font-semibold" @click="composing = false">
                  Cancel
                </button>
                <button
                  type="submit"
                  class="h-10 px-5 rounded-full bg-primary text-white text-[13px] font-semibold disabled:opacity-60"
                  :disabled="sending || !newBody.trim()"
                >
                  {{ sending ? "Sending…" : "Send" }}
                </button>
              </div>
            </form>
          </template>

          <template v-else-if="active">
            <div class="px-5 py-4 border-b border-border flex items-center gap-3">
              <button type="button" class="md2:hidden text-bodytext" aria-label="Back" @click="activeId = ''">
                <i class="pi pi-arrow-left"></i>
              </button>
              <div class="min-w-0 flex-1">
                <p class="text-[15px] font-bold text-header truncate">{{ active.counterpart?.name }}</p>
                <p class="text-[12px] text-bodytext truncate">
                  {{ active.subject }}<template v-if="active.businessName"> · {{ active.businessName }}</template>
                </p>
              </div>
              <NuxtLink
                v-if="active.bookingReference"
                :to="`/bookings/${active.bookingReference}`"
                class="text-[12px] font-semibold text-primary shrink-0"
              >
                {{ active.bookingReference }}
              </NuxtLink>
            </div>

            <div ref="threadEl" class="flex-1 overflow-y-auto px-5 py-4 space-y-3 bg-greybg max-h-[520px]">
              <div v-if="thread.total > thread.rows.length" class="text-center">
                <button
                  type="button"
                  class="text-[12px] font-semibold text-primary disabled:opacity-50"
                  :disabled="threadPending"
                  @click="loadEarlier"
                >
                  {{ threadPending ? "Loading…" : "Load earlier messages" }}
                </button>
              </div>
              <p v-if="threadPending && !thread.rows.length" class="text-[13px] text-bodytext">Loading…</p>
              <div
                v-for="m in thread.rows"
                :key="m.id"
                class="flex"
                :class="m.mine ? 'justify-end' : 'justify-start'"
              >
                <div
                  class="max-w-[78%] rounded-2xl px-3.5 py-2.5 text-[13px]"
                  :class="m.mine ? 'bg-primary text-white rounded-br-md' : 'bg-white border border-border text-header rounded-bl-md'"
                >
                  <p v-if="!m.mine" class="text-[11px] font-semibold text-bodytext mb-0.5">{{ m.senderName }}</p>
                  <p class="whitespace-pre-line">{{ m.body }}</p>
                  <a
                    v-if="m.attachmentUrl"
                    :href="m.attachmentUrl"
                    target="_blank"
                    rel="noopener"
                    class="mt-1 inline-flex items-center gap-1 text-[12px] underline"
                  >
                    <i class="pi pi-paperclip text-[10px]"></i> Attachment
                  </a>
                  <p class="mt-1 text-[10px]" :class="m.mine ? 'text-white/70' : 'text-bodytext2'">{{ formatDateTime(m.createdAt) }}</p>
                </div>
              </div>
            </div>

            <form class="p-3 border-t border-border flex items-end gap-2" @submit.prevent="send">
              <textarea
                v-model="draftBody"
                rows="2"
                class="flex-1 rounded-xl border border-border px-3 py-2 text-[13px] outline-none focus:border-primary resize-none"
                placeholder="Write a message…"
                @keydown.enter.exact.prevent="send"
              ></textarea>
              <button
                type="submit"
                class="h-10 px-4 rounded-full bg-primary text-white text-[13px] font-semibold disabled:opacity-60 inline-flex items-center gap-1.5"
                :disabled="sending || !draftBody.trim()"
              >
                <i class="pi pi-send text-[11px]"></i>
                Send
              </button>
            </form>
          </template>

          <div v-else class="flex-1 flex flex-col items-center justify-center text-center p-8">
            <i class="pi pi-comments text-3xl text-primary"></i>
            <p class="mt-3 text-[14px] font-semibold text-header">Select a conversation</p>
            <p class="mt-1 text-[13px] text-bodytext">Your messages with venues appear here.</p>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
/*
 * Two-pane inbox over /conversations/mine. ?bookingId= / ?venueId= (from a
 * booking's "Message venue") opens that conversation, or a composer that
 * starts one with POST /conversations/mine.
 */
useHead({ title: "Messages" });

const route = useRoute();
const router = useRouter();
const search = ref("");

const { data: conversations, pending: listPending, refresh: refreshList } = useResource(
  () => api.get("/conversations/mine", { search: search.value.trim() || undefined, limit: 50 }),
  { watch: [search], debounce: 300, initial: { rows: [], total: 0 } }
);
const { data: unread, refresh: refreshUnread } = useResource(
  () => api.get("/conversations/mine/unread-count", undefined, { toast: false }),
  { initial: { unreadMessages: 0, unreadConversations: 0 } }
);

const activeId = ref("");
const active = computed(() => conversations.value.rows.find((c) => c.id === activeId.value) ?? null);

/* ── thread ──────────────────────────────────────────────────────────────── */
const LIMIT = 50;
const thread = reactive({ rows: [], total: 0, page: 1 });
const threadPending = ref(false);
const threadEl = ref(null);

function scrollToBottom() {
  nextTick(() => {
    if (threadEl.value) threadEl.value.scrollTop = threadEl.value.scrollHeight;
  });
}

async function loadThread(id) {
  threadPending.value = true;
  try {
    const data = await api.get(`/conversations/mine/${id}/messages`, { page: 1, limit: LIMIT });
    if (activeId.value !== id) return;
    thread.rows = data?.rows ?? [];
    thread.total = data?.total ?? 0;
    thread.page = 1;
    scrollToBottom();
    // Opening the thread marks it read; keep the list badge in step.
    api.post(`/conversations/mine/${id}/read`, {}, { toast: false }).catch(() => {});
    const row = conversations.value.rows.find((c) => c.id === id);
    if (row) row.unreadCount = 0;
    refreshUnread();
  } catch {
    /* toast shown */
  } finally {
    threadPending.value = false;
  }
}

async function loadEarlier() {
  const id = activeId.value;
  threadPending.value = true;
  try {
    const data = await api.get(`/conversations/mine/${id}/messages`, { page: thread.page + 1, limit: LIMIT });
    if (activeId.value !== id) return;
    thread.rows = [...(data?.rows ?? []), ...thread.rows];
    thread.page += 1;
  } catch {
    /* toast shown */
  } finally {
    threadPending.value = false;
  }
}

function select(id) {
  composing.value = false;
  activeId.value = id;
  thread.rows = [];
  thread.total = 0;
  loadThread(id);
}

/* ── send ────────────────────────────────────────────────────────────────── */
const draftBody = ref("");
const sending = ref(false);

async function send() {
  const body = draftBody.value.trim();
  if (!body || sending.value) return;
  sending.value = true;
  try {
    const msg = await api.post(`/conversations/mine/${activeId.value}/messages`, { body });
    if (msg) {
      thread.rows.push(msg);
      thread.total += 1;
    }
    draftBody.value = "";
    scrollToBottom();
    refreshList();
  } catch {
    /* toast shown */
  } finally {
    sending.value = false;
  }
}

/* ── start a conversation from ?bookingId= / ?venueId= ──────────────────── */
const composing = ref(false);
const composeTarget = reactive({ bookingId: "", venueId: "", label: "" });
const newSubject = ref("");
const newBody = ref("");

async function openFromQuery() {
  const bookingId = route.query.bookingId ? String(route.query.bookingId) : "";
  const venueId = route.query.venueId ? String(route.query.venueId) : "";
  if (!bookingId && !venueId) return;
  await refreshList();
  const existing = conversations.value.rows.find((c) =>
    bookingId ? c.bookingId === bookingId : c.venue?.id === venueId && !c.bookingId
  );
  if (existing) {
    select(existing.id);
    return;
  }
  composeTarget.bookingId = bookingId;
  composeTarget.venueId = venueId;
  composeTarget.label = "the venue";
  newSubject.value = "";
  if (bookingId) {
    try {
      const b = await api.get(`/me/bookings/${encodeURIComponent(bookingId)}`, undefined, { toast: false });
      composeTarget.label = b?.venue?.name ?? "the venue";
      newSubject.value = `Booking ${b?.reference ?? ""}`.trim();
    } catch {
      /* label stays generic */
    }
  }
  activeId.value = "";
  composing.value = true;
}

async function startConversation() {
  sending.value = true;
  try {
    const res = await api.post("/conversations/mine", {
      ...(composeTarget.bookingId ? { bookingId: composeTarget.bookingId } : { venueId: composeTarget.venueId }),
      subject: newSubject.value.trim() || null,
      body: newBody.value.trim(),
    });
    notifySuccess("Message sent");
    newBody.value = "";
    composing.value = false;
    router.replace({ query: {} });
    await refreshList();
    if (res?.conversationId) select(res.conversationId);
  } catch {
    /* toast shown */
  } finally {
    sending.value = false;
  }
}

onMounted(openFromQuery);
watch(() => [route.query.bookingId, route.query.venueId], openFromQuery);
</script>
