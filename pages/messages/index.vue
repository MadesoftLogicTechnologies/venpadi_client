<template>
  <div class="px-4 md2:px-6 py-4 md2:py-5">
    <div class="w-full md2:flex md2:items-stretch md2:gap-5 min-h-[calc(100vh-140px)]">
      <!-- list -->
      <aside
        class="md2:w-[340px] lg:w-[360px] shrink-0 flex flex-col"
        :class="{ 'hidden md2:flex': activeId || composing }"
      >
        <div class="flex items-center justify-between gap-3">
          <h1 class="text-[24px] md2:text-[28px] font-extrabold text-header tracking-tight">Messages</h1>
          <button
            type="button"
            class="w-9 h-9 rounded-xl border border-border bg-white text-header flex items-center justify-center hover:bg-greybg"
            aria-label="New message"
            title="Start a chat from a booking with Message Host"
            @click="composeHint"
          >
            <i class="pi pi-pencil text-[13px]"></i>
          </button>
        </div>

        <div class="mt-4">
          <Search v-model="search" kind="grey" placeholder="Search messages..." />
        </div>

        <div class="mt-3 flex flex-wrap gap-1.5">
          <button
            v-for="f in filters"
            :key="f.key"
            type="button"
            class="h-8 px-3 rounded-full text-[12px] font-semibold border transition-colors"
            :class="listFilter === f.key ? 'bg-primary text-white border-primary' : 'bg-white text-header border-border hover:bg-greybg'"
            @click="listFilter = f.key"
          >
            {{ f.label }}
          </button>
        </div>

        <div class="mt-3 flex-1 overflow-y-auto slim-scrollbar -mx-1 px-1">
          <p v-if="!listPending && !visibleConversations.length" class="px-2 py-8 text-center text-[13px] text-bodytext">
            {{ emptyListCopy }}
          </p>
          <button
            v-for="c in visibleConversations"
            :key="c.id"
            type="button"
            class="relative w-full text-left px-3 py-3 rounded-2xl flex gap-3 hover:bg-white"
            :class="c.id === activeId ? 'bg-white shadow-sm' : ''"
            @click="select(c.id)"
          >
            <span
              v-if="c.id === activeId"
              class="absolute left-0 top-3 bottom-3 w-[3px] rounded-r-full bg-primary"
            ></span>
            <span class="w-11 h-11 rounded-xl overflow-hidden bg-greybg shrink-0 flex items-center justify-center text-[11px] font-bold text-primary">
              <img v-if="c.counterpart?.avatarUrl || c.venue?.imageUrl" :src="c.counterpart?.avatarUrl || c.venue?.imageUrl" alt="" class="w-full h-full object-cover" />
              <template v-else>{{ c.counterpart?.initials }}</template>
            </span>
            <span class="min-w-0 flex-1">
              <span class="flex items-center justify-between gap-2">
                <span class="text-[13px] font-bold text-header truncate">{{ c.counterpart?.name || c.venue?.name }}</span>
                <span
                  class="text-[11px] shrink-0 font-medium"
                  :class="c.unreadCount ? 'text-primary' : 'text-bodytext2'"
                >
                  {{ listTime(c.lastMessageAt) }}
                </span>
              </span>
              <span class="mt-0.5 block text-[12px] text-bodytext truncate">
                {{ c.lastMessagePreview || c.subject }}
              </span>
              <span class="mt-1 inline-flex items-center gap-1">
                <span
                  v-if="conversationBadge(c)"
                  class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-semibold"
                  :class="conversationBadge(c).cls"
                >
                  <i v-if="conversationBadge(c).icon" :class="['pi text-[9px]', conversationBadge(c).icon]"></i>
                  {{ conversationBadge(c).label }}
                </span>
                <span
                  v-if="c.unreadCount"
                  class="min-w-[16px] h-4 px-1 rounded-full bg-primary text-white text-[10px] font-bold inline-flex items-center justify-center"
                >
                  {{ c.unreadCount }}
                </span>
              </span>
            </span>
          </button>
        </div>
      </aside>

      <!-- thread -->
      <section class="flex-1 min-w-0 bg-white rounded-[24px] border border-border flex flex-col overflow-hidden min-h-[560px]">
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
          <form class="p-5 space-y-3 flex-1" @submit.prevent="startConversation">
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
            <span class="w-11 h-11 rounded-xl overflow-hidden bg-greybg shrink-0 flex items-center justify-center text-[11px] font-bold text-primary">
              <img
                v-if="active.counterpart?.avatarUrl || active.venue?.imageUrl"
                :src="active.counterpart?.avatarUrl || active.venue?.imageUrl"
                alt=""
                class="w-full h-full object-cover"
              />
              <template v-else>{{ active.counterpart?.initials }}</template>
            </span>
            <div class="min-w-0 flex-1">
              <p class="text-[16px] font-extrabold text-header truncate">{{ active.counterpart?.name || active.venue?.name }}</p>
              <p class="text-[12px] text-bodytext truncate">
                <span v-if="replyHint" class="inline-block w-1.5 h-1.5 rounded-full bg-[#22C55E] mr-1 align-middle"></span>
                {{ replyHint || active.subject || active.businessName }}
              </p>
            </div>
            <a
              v-if="hostPhone"
              :href="`tel:${hostPhone}`"
              class="w-9 h-9 rounded-full flex items-center justify-center text-bodytext hover:bg-greybg"
              aria-label="Call"
            >
              <i class="pi pi-phone text-[14px]"></i>
            </a>
            <details class="relative">
              <summary class="w-9 h-9 rounded-full flex items-center justify-center text-bodytext hover:bg-greybg list-none cursor-pointer" aria-label="More">
                <i class="pi pi-ellipsis-v text-[14px]"></i>
              </summary>
              <div class="absolute right-0 mt-1 w-44 rounded-xl border border-border bg-white shadow-lg p-1 z-10">
                <NuxtLink
                  v-if="bookingRef"
                  :to="`/bookings/${bookingRef}`"
                  class="block px-3 py-2 rounded-lg text-[12px] font-medium text-header hover:bg-greybg"
                >
                  View booking
                </NuxtLink>
                <NuxtLink
                  to="/discover"
                  class="block px-3 py-2 rounded-lg text-[12px] font-medium text-header hover:bg-greybg"
                >
                  Discover venues
                </NuxtLink>
              </div>
            </details>
          </div>

          <div v-if="bookingRef" class="mx-5 mt-4 rounded-2xl border border-border bg-greybg px-4 py-3 flex flex-wrap items-center gap-3">
            <span class="w-9 h-9 rounded-xl bg-white border border-border flex items-center justify-center text-header shrink-0">
              <i class="pi pi-calendar text-[13px]"></i>
            </span>
            <div class="min-w-0 flex-1">
              <p class="text-[11px] font-bold tracking-wide uppercase" :class="bookingStatusClass">
                {{ bannerStatus }}
                <span class="text-header font-semibold normal-case tracking-normal"> #{{ bookingRef }}</span>
              </p>
              <p class="text-[12px] text-bodytext truncate">
                <template v-if="bannerWhen">{{ bannerWhen }}</template>
                <template v-if="bannerMeta"> · {{ bannerMeta }}</template>
              </p>
            </div>
            <NuxtLink :to="`/bookings/${bookingRef}`" class="text-[13px] font-semibold text-primary shrink-0">
              View Details
            </NuxtLink>
          </div>

          <div ref="threadEl" class="flex-1 overflow-y-auto px-5 py-4 space-y-5 slim-scrollbar">
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

            <div v-for="group in groupedThread" :key="group.key">
              <p class="text-center text-[11px] text-bodytext2 mb-4">{{ group.label }}</p>
              <div class="space-y-4">
                <template v-for="m in group.messages" :key="m.id">
                  <div v-if="isSystem(m)" class="flex justify-center">
                    <p class="text-[12px] text-bodytext inline-flex items-center gap-1.5">
                      <i class="pi pi-check-circle text-[#16A34A] text-[12px]"></i>
                      {{ m.body }}
                    </p>
                  </div>
                  <div v-else-if="m.mine" class="flex justify-end">
                    <div class="max-w-[78%]">
                      <p class="text-right text-[11px] text-bodytext2 mb-1">{{ formatTime(m.createdAt) }} · You</p>
                      <div class="rounded-2xl rounded-br-md bg-brand-gradient-soft text-white px-3.5 py-2.5 text-[13px] leading-relaxed">
                        <p v-if="m.body" class="whitespace-pre-line">{{ m.body }}</p>
                        <MessagesMessageAttachment v-if="attachmentOf(m)" :attachment="attachmentOf(m)" mine />
                      </div>
                    </div>
                  </div>
                  <div v-else class="flex items-start gap-2.5">
                    <span class="w-8 h-8 rounded-full overflow-hidden bg-greybg shrink-0 mt-5 flex items-center justify-center text-[10px] font-bold text-primary">
                      <img
                        v-if="active.counterpart?.avatarUrl"
                        :src="active.counterpart.avatarUrl"
                        alt=""
                        class="w-full h-full object-cover"
                      />
                      <template v-else>{{ active.counterpart?.initials }}</template>
                    </span>
                    <div class="max-w-[78%] min-w-0">
                      <p class="text-[12px] text-header font-medium">
                        {{ m.senderName || active.counterpart?.name }}
                        <span class="text-bodytext2 font-normal"> {{ formatTime(m.createdAt) }}</span>
                      </p>
                      <div class="mt-1 rounded-2xl rounded-bl-md bg-greybg px-3.5 py-2.5 text-[13px] text-header leading-relaxed">
                        <p v-if="m.body" class="whitespace-pre-line">{{ m.body }}</p>
                        <MessagesMessageAttachment v-if="attachmentOf(m)" :attachment="attachmentOf(m)" />
                      </div>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </div>

          <form class="p-4" @submit.prevent="send">
            <div class="rounded-2xl border border-border bg-greybg px-3 py-2">
              <textarea
                v-model="draftBody"
                rows="2"
                class="w-full bg-transparent text-[13px] outline-none resize-none placeholder:text-bodytext2"
                placeholder="Write a message..."
                @keydown.enter.exact.prevent="send"
              ></textarea>
              <div
                v-if="attachment || uploading"
                class="mb-1 inline-flex items-center gap-2 max-w-full rounded-xl bg-white border border-border px-3 py-1.5"
              >
                <i :class="['pi text-[12px] text-primary', uploading ? 'pi-spin pi-spinner' : 'pi-paperclip']"></i>
                <span class="min-w-0 text-[12px] text-header truncate">
                  {{ uploading ? `Uploading ${uploadingName}…` : attachment.fileName }}
                </span>
                <span v-if="attachment && formatBytes(attachment.sizeBytes)" class="text-[11px] text-bodytext shrink-0">
                  {{ formatBytes(attachment.sizeBytes) }}
                </span>
                <button
                  v-if="attachment"
                  type="button"
                  class="w-5 h-5 rounded-full text-bodytext hover:text-header shrink-0"
                  aria-label="Remove attachment"
                  @click="clearAttachment"
                >
                  <i class="pi pi-times text-[10px]"></i>
                </button>
              </div>
              <p v-if="attachError" class="mb-1 text-[12px] text-[#DC2626]">{{ attachError }}</p>
              <div class="flex items-center gap-1 pt-1">
                <input
                  ref="fileInput"
                  type="file"
                  class="hidden"
                  :accept="ATTACH_TYPES.join(',')"
                  @change="pickAttachment"
                />
                <button
                  type="button"
                  class="w-8 h-8 rounded-full flex items-center justify-center text-bodytext hover:bg-white hover:text-header disabled:opacity-50"
                  title="Attach a PDF or image (max 10 MB)"
                  aria-label="Attach a file"
                  :disabled="uploading || sending"
                  @click="fileInput?.click()"
                >
                  <i class="pi pi-paperclip text-[13px]"></i>
                </button>
                <button
                  type="submit"
                  class="ml-auto h-8 px-4 rounded-full bg-primary text-white text-[12px] font-semibold disabled:opacity-60 inline-flex items-center gap-1.5"
                  :disabled="sending || uploading || (!draftBody.trim() && !attachment)"
                >
                  Send
                  <i class="pi pi-send text-[10px]"></i>
                </button>
              </div>
            </div>
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
const listFilter = ref("all");

const filters = [
  { key: "all", label: "All" },
  { key: "unread", label: "Unread" },
  { key: "bookings", label: "Bookings" },
  { key: "enquiries", label: "Enquiries" },
];

const { data: conversations, pending: listPending, refresh: refreshList } = useResource(
  () => api.get("/conversations/mine", { search: search.value.trim() || undefined, limit: 50 }),
  { watch: [search], debounce: 300, initial: { rows: [], total: 0 } }
);
const { data: unread, refresh: refreshUnread } = useResource(
  () => api.get("/conversations/mine/unread-count", undefined, { toast: false }),
  { initial: { unreadMessages: 0, unreadConversations: 0 } }
);
usePageLoading(() => listPending.value && !conversations.value.rows.length);

const activeId = ref("");
const active = computed(() => conversations.value.rows.find((c) => c.id === activeId.value) ?? null);

const visibleConversations = computed(() => {
  let rows = conversations.value.rows ?? [];
  if (listFilter.value === "unread") rows = rows.filter((c) => c.unreadCount > 0);
  if (listFilter.value === "bookings") rows = rows.filter((c) => !!(c.bookingId || c.bookingReference));
  if (listFilter.value === "enquiries") rows = rows.filter((c) => !(c.bookingId || c.bookingReference));
  return rows;
});

const emptyListCopy = computed(() => {
  if (search.value.trim()) return "No conversations match that search.";
  if (listFilter.value === "unread") return "No unread messages.";
  if (listFilter.value === "bookings") return "No booking conversations yet.";
  if (listFilter.value === "enquiries") return "No enquiries yet.";
  return "No conversations yet. Start one from a booking with “Message venue”.";
});

const bookingId = computed(() => active.value?.bookingId || "");
const { data: activeBooking } = useResource(
  () => (bookingId.value ? api.get(`/me/bookings/${encodeURIComponent(bookingId.value)}`, undefined, { toast: false }) : Promise.resolve(null)),
  { watch: [bookingId] }
);

const bookingRef = computed(() => active.value?.bookingReference || activeBooking.value?.reference || "");
const bannerStatus = computed(() => {
  const label = active.value?.bookingStatusLabel || activeBooking.value?.statusLabel;
  if (label) return label;
  return bookingRef.value ? "Booking" : "";
});
const bookingStatusClass = computed(() => {
  const s = active.value?.bookingStatus || activeBooking.value?.status;
  if (s === "confirmed" || s === "approved") return "text-[#16A34A]";
  if (s === "pending") return "text-primary";
  return "text-header";
});
const bannerWhen = computed(() => {
  const b = activeBooking.value;
  if (b?.dateLabel) return b.dateLabel;
  if (b?.startAt) return formatDateUS(b.startAt);
  return active.value?.eventDateLabel || "";
});
const bannerMeta = computed(() => {
  const b = activeBooking.value;
  const parts = [];
  const guests = b?.guestCount ?? active.value?.guestCount;
  if (guests) parts.push(`${guests} Guests`);
  const spaces = b?.spaces?.map((s) => s.name).filter(Boolean) || active.value?.spaces;
  if (Array.isArray(spaces) && spaces.length) parts.push(spaces.join(" + "));
  else if (typeof spaces === "string" && spaces) parts.push(spaces);
  return parts.join(" · ");
});
const hostPhone = computed(() => active.value?.counterpart?.phone || activeBooking.value?.venue?.host?.phone || activeBooking.value?.host?.phone || "");
const replyHint = computed(
  () => active.value?.counterpart?.responseTime || activeBooking.value?.venue?.host?.responseTime || ""
);

const groupedThread = computed(() => {
  const groups = [];
  let current = null;
  for (const m of thread.rows) {
    const key = dayKey(m.createdAt);
    if (!current || current.key !== key) {
      current = { key, label: dayLabel(m.createdAt), messages: [] };
      groups.push(current);
    }
    current.messages.push(m);
  }
  return groups;
});

function dayKey(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-CA", { timeZone: "Africa/Lagos" });
}
function dayLabel(iso) {
  const key = dayKey(iso);
  const today = new Date().toLocaleDateString("en-CA", { timeZone: "Africa/Lagos" });
  const y = new Date();
  y.setDate(y.getDate() - 1);
  const yest = y.toLocaleDateString("en-CA", { timeZone: "Africa/Lagos" });
  const pretty = iso
    ? new Date(iso).toLocaleDateString("en-US", { month: "long", day: "numeric", timeZone: "Africa/Lagos" })
    : "";
  if (key === today) return "Today";
  if (key === yest) return `Yesterday, ${pretty}`;
  return pretty || formatDate(iso);
}
function listTime(iso) {
  if (!iso) return "";
  const key = dayKey(iso);
  const today = new Date().toLocaleDateString("en-CA", { timeZone: "Africa/Lagos" });
  if (key === today) return formatTime(iso);
  return timeAgo(iso);
}
function conversationBadge(c) {
  if (c.bookingId || c.bookingReference) {
    const label = c.bookingStatusLabel || (c.bookingStatus === "confirmed" ? "Confirmed" : "Booking");
    const confirmed = c.bookingStatus === "confirmed" || /confirm/i.test(label);
    return {
      label,
      icon: confirmed ? "pi-check" : "pi-calendar",
      cls: confirmed ? "bg-[#EAF8F0] text-[#16A34A]" : "bg-greybg text-header",
    };
  }
  return { label: "Enquiry", icon: "", cls: "bg-greybg text-bodytext" };
}
function isSystem(m) {
  return m?.kind === "system" || m?.type === "system" || m?.system === true;
}
/** A message's attachment; an older payload carries only attachmentUrl. */
function attachmentOf(m) {
  if (m?.attachment?.url) return m.attachment;
  if (m?.attachmentUrl) return { url: m.attachmentUrl, fileName: "Attachment", contentType: "", sizeBytes: null };
  return null;
}
function composeHint() {
  notifySuccess("Open a booking and tap Message Host to start a chat.");
}

/* ── thread ──────────────────────────────────────────────────────────────── */
const LIMIT = 50;
const thread = reactive({ rows: [], total: 0, page: 1 });
const threadPending = ref(false);
const threadEl = ref(null);
usePageLoading(() => threadPending.value && !thread.rows.length);

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
  // An upload belongs to the conversation it was made in (the API refuses it
  // anywhere else), so a pending one is dropped on switching.
  clearAttachment();
  activeId.value = id;
  thread.rows = [];
  thread.total = 0;
  loadThread(id);
}

/* ── send ────────────────────────────────────────────────────────────────── */
const draftBody = ref("");
const sending = ref(false);

/* ── attachments (C9) ──────────────────────────────────────────────────────
 * Pick -> upload at once to POST /conversations/mine/:id/attachments
 * (multipart, field `file`) -> send { body?, attachmentId }. The type and
 * size limits mirror the API; checking them here saves a 10 MB upload that
 * would only be refused. */
const ATTACH_TYPES = ["application/pdf", "image/jpeg", "image/png", "image/webp"];
const ATTACH_MAX_BYTES = 10 * 1024 * 1024;
const fileInput = ref(null);
const attachment = ref(null); // MessageAttachment once uploaded
const uploading = ref(false);
const uploadingName = ref("");
const attachError = ref("");
let uploadSeq = 0;

function clearAttachment() {
  uploadSeq++; // a still-running upload must not land in the next conversation
  attachment.value = null;
  uploading.value = false;
  attachError.value = "";
}

async function pickAttachment(event) {
  const file = event.target.files?.[0];
  event.target.value = "";
  if (!file) return;
  attachError.value = "";
  if (!ATTACH_TYPES.includes(file.type)) {
    attachError.value = "Attach a PDF, JPEG, PNG or WebP file.";
    return;
  }
  if (file.size > ATTACH_MAX_BYTES) {
    attachError.value = `That file is ${formatBytes(file.size)}; the limit is 10 MB.`;
    return;
  }
  const id = activeId.value;
  const mine = ++uploadSeq;
  attachment.value = null;
  uploading.value = true;
  uploadingName.value = file.name;
  try {
    const form = new FormData();
    form.append("file", file);
    const res = await apiRequest(`/conversations/mine/${id}/attachments`, { method: "POST", body: form });
    if (mine === uploadSeq && activeId.value === id) attachment.value = res ?? null;
  } catch {
    /* toast shown */
  } finally {
    if (mine === uploadSeq) uploading.value = false;
  }
}

async function send() {
  const body = draftBody.value.trim();
  const attachmentId = attachment.value?.id;
  if ((!body && !attachmentId) || sending.value || uploading.value) return;
  sending.value = true;
  try {
    const payload = {};
    if (body) payload.body = body;
    if (attachmentId) payload.attachmentId = attachmentId;
    const msg = await api.post(`/conversations/mine/${activeId.value}/messages`, payload);
    if (msg) {
      thread.rows.push(msg);
      thread.total += 1;
    }
    draftBody.value = "";
    attachment.value = null;
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
