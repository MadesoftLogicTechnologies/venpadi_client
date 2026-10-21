<template>
  <div class="px-4 md2:px-8 py-5 md2:py-7">
    <div class="max-w-[960px]">
      <h1 class="text-[26px] md2:text-[28px] font-extrabold text-header tracking-tight">Settings</h1>
      <p class="mt-1 text-[14px] text-bodytext">Manage your profile, security and preferences.</p>

      <div class="mt-5 flex flex-wrap gap-2">
        <button
          v-for="t in tabs"
          :key="t.key"
          type="button"
          class="h-9 px-4 rounded-full text-[13px] font-semibold border transition-colors"
          :class="tab === t.key ? 'bg-primary text-white border-primary' : 'bg-white text-header border-border hover:bg-greybg'"
          @click="setTab(t.key)"
        >
          {{ t.label }}
        </button>
      </div>

      <!-- profile -->
      <section v-if="tab === 'profile'" class="mt-5 bg-white rounded-2xl border border-border p-5 md2:p-6">
        <p v-if="!profileLoaded" class="text-sm text-bodytext">Loading…</p>
        <template v-else>
          <div class="flex items-center gap-4">
            <span class="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-orange-200 to-primary flex items-center justify-center text-white text-lg font-bold shrink-0">
              <img v-if="profile.avatarUrl" :src="profile.avatarUrl" alt="" class="w-full h-full object-cover" />
              <template v-else>{{ initials(`${profile.firstName} ${profile.lastName}`) }}</template>
            </span>
            <div class="flex flex-wrap gap-2">
              <label
                class="h-9 px-4 rounded-full border border-border bg-white text-[13px] font-semibold text-header hover:bg-greybg inline-flex items-center cursor-pointer"
                :class="{ 'opacity-60 pointer-events-none': avatarBusy }"
              >
                {{ avatarBusy ? "Uploading…" : "Upload photo" }}
                <input type="file" accept="image/*" class="hidden" @change="uploadAvatar" />
              </label>
              <button
                v-if="profile.avatarUrl"
                type="button"
                class="h-9 px-4 rounded-full text-[13px] font-semibold text-[#DC2626] hover:bg-[#FEF2F2] disabled:opacity-60"
                :disabled="avatarBusy"
                @click="removeAvatar"
              >
                Remove
              </button>
            </div>
          </div>

          <form class="mt-6 grid grid-cols-1 md2:grid-cols-2 gap-4" @submit.prevent="saveProfile">
            <label class="block">
              <span class="text-[13px] font-medium text-header">First name</span>
              <input v-model="profile.firstName" type="text" maxlength="100" class="mt-1 w-full h-11 rounded-xl border border-border px-3 text-[13px] outline-none focus:border-primary" />
              <span v-if="profileErrors.firstName" class="text-[12px] text-red-500">{{ profileErrors.firstName }}</span>
            </label>
            <label class="block">
              <span class="text-[13px] font-medium text-header">Last name</span>
              <input v-model="profile.lastName" type="text" maxlength="100" class="mt-1 w-full h-11 rounded-xl border border-border px-3 text-[13px] outline-none focus:border-primary" />
            </label>
            <label class="block">
              <span class="text-[13px] font-medium text-header">Email</span>
              <input :value="profile.email" type="email" readonly class="mt-1 w-full h-11 rounded-xl border border-border px-3 text-[13px] bg-greybg text-bodytext outline-none" />
            </label>
            <label class="block">
              <span class="text-[13px] font-medium text-header">Phone</span>
              <input v-model="profile.phone" type="tel" maxlength="40" class="mt-1 w-full h-11 rounded-xl border border-border px-3 text-[13px] outline-none focus:border-primary" />
              <span v-if="profileErrors.phone" class="text-[12px] text-red-500">{{ profileErrors.phone }}</span>
            </label>
            <label class="block md2:col-span-2">
              <span class="text-[13px] font-medium text-header">Location</span>
              <input v-model="profile.location" type="text" maxlength="120" class="mt-1 w-full h-11 rounded-xl border border-border px-3 text-[13px] outline-none focus:border-primary" />
            </label>
            <label class="block md2:col-span-2">
              <span class="text-[13px] font-medium text-header">Bio</span>
              <textarea v-model="profile.bio" rows="3" maxlength="2000" class="mt-1 w-full rounded-xl border border-border px-3 py-2 text-[13px] outline-none focus:border-primary"></textarea>
            </label>
            <div class="md2:col-span-2 flex justify-end">
              <button type="submit" class="h-10 px-5 rounded-full bg-primary text-white text-[13px] font-semibold disabled:opacity-60" :disabled="savingProfile">
                {{ savingProfile ? "Saving…" : "Save changes" }}
              </button>
            </div>
          </form>
        </template>
      </section>

      <!-- security -->
      <template v-if="tab === 'security'">
        <section class="mt-5 bg-white rounded-2xl border border-border p-5 md2:p-6">
          <h2 class="text-[16px] font-bold text-header">Change password</h2>
          <form class="mt-4 grid grid-cols-1 md2:grid-cols-3 gap-4 items-end" @submit.prevent="savePassword">
            <InputField v-model="pw.current" label="Current password" type="password" placeholder="********" />
            <InputField v-model="pw.next" label="New password" type="password" placeholder="********" />
            <InputField v-model="pw.confirm" label="Confirm new password" type="password" placeholder="********" />
            <p class="md2:col-span-3 text-[12px] text-bodytext2">At least 8 characters, with a number and a special character.</p>
            <p v-if="pwError" class="md2:col-span-3 text-[12px] text-red-500">{{ pwError }}</p>
            <div class="md2:col-span-3 flex justify-end">
              <button type="submit" class="h-10 px-5 rounded-full bg-primary text-white text-[13px] font-semibold disabled:opacity-60" :disabled="savingPw || !pw.current || !pw.next">
                {{ savingPw ? "Updating…" : "Update password" }}
              </button>
            </div>
          </form>
        </section>

        <section class="mt-5 bg-white rounded-2xl border border-border p-5 md2:p-6">
          <div class="flex items-center justify-between gap-3">
            <h2 class="text-[16px] font-bold text-header mr-auto">Active sessions</h2>
            <button
              v-if="sessions.length > 1"
              type="button"
              class="h-9 px-4 rounded-full border border-border text-[13px] font-semibold text-header hover:bg-greybg disabled:opacity-60"
              :disabled="revokingOthers"
              @click="revokeOthers"
            >
              Sign out other devices
            </button>
            <button
              type="button"
              class="h-9 px-4 rounded-full border border-border text-[13px] font-semibold text-header hover:bg-greybg"
              @click="logOut"
            >
              Log out
            </button>
          </div>
          <p v-if="sessionsPending && !sessions.length" class="mt-3 text-sm text-bodytext">Loading…</p>
          <div class="mt-3 divide-y divide-border">
            <div v-for="s in sessions" :key="s.id" class="py-3 flex items-center gap-3">
              <span class="w-9 h-9 rounded-full bg-greybg flex items-center justify-center text-bodytext shrink-0">
                <i class="pi" :class="s.deviceKind === 'mobile' ? 'pi-mobile' : 'pi-desktop'"></i>
              </span>
              <div class="min-w-0 flex-1">
                <p class="text-[13px] font-semibold text-header">
                  {{ s.device }}
                  <span v-if="s.current" class="ml-1 px-2 py-0.5 rounded-full bg-[#EAF8F0] text-[#16A34A] text-[10px] font-semibold">This device</span>
                </p>
                <p class="text-[12px] text-bodytext">
                  {{ [s.location, s.ip].filter(Boolean).join(" · ") }} · Active {{ timeAgo(s.lastActiveAt) }}
                </p>
              </div>
              <button
                v-if="!s.current"
                type="button"
                class="text-[12px] font-semibold text-[#DC2626] hover:opacity-80"
                @click="revoke(s)"
              >
                Sign out
              </button>
            </div>
          </div>
        </section>
      </template>

      <!-- notifications -->
      <section v-if="tab === 'notifications'" class="mt-5 bg-white rounded-2xl border border-border p-5 md2:p-6">
        <h2 class="text-[16px] font-bold text-header">Notification preferences</h2>
        <p class="mt-1 text-[13px] text-bodytext">Choose how we reach you about each kind of update.</p>
        <p v-if="!prefs" class="mt-4 text-sm text-bodytext">Loading…</p>
        <div v-else class="mt-4 overflow-x-auto">
          <table class="w-full text-[13px]">
            <thead class="text-[11px] uppercase tracking-wide text-bodytext2">
              <tr>
                <th class="text-left font-semibold py-2">Category</th>
                <th v-for="ch in CHANNELS" :key="ch.key" class="text-center font-semibold py-2 px-3">{{ ch.label }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="cat in CATEGORIES" :key="cat.key" class="border-t border-border">
                <td class="py-3">
                  <p class="font-medium text-header">{{ cat.label }}</p>
                  <p class="text-[12px] text-bodytext">{{ cat.hint }}</p>
                </td>
                <td v-for="ch in CHANNELS" :key="ch.key" class="text-center px-3">
                  <button
                    type="button"
                    class="relative w-9 h-5 rounded-full inline-block align-middle"
                    :class="prefs[cat.key]?.[ch.key] ? 'bg-primary' : 'bg-[#D1D5DB]'"
                    :aria-pressed="!!prefs[cat.key]?.[ch.key]"
                    :aria-label="`${cat.label} by ${ch.label}`"
                    @click="togglePref(cat.key, ch.key)"
                  >
                    <span
                      class="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-all"
                      :class="prefs[cat.key]?.[ch.key] ? 'right-0.5' : 'left-0.5'"
                    ></span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- saved venues -->
      <section v-if="tab === 'saved'" class="mt-5">
        <p v-if="savedPending && !saved.rows.length" class="text-sm text-bodytext">Loading…</p>
        <div v-else-if="!saved.rows.length" class="bg-white rounded-2xl border border-border p-8 text-center">
          <p class="text-[14px] font-semibold text-header">No saved venues</p>
          <p class="mt-1 text-[13px] text-bodytext">Tap the heart on any venue to keep it here.</p>
          <NuxtLink to="/discover" class="mt-3 inline-block text-[13px] font-semibold text-primary">Discover venues</NuxtLink>
        </div>
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 md2:grid-cols-3 gap-4">
          <SearchVenueCard v-for="v in saved.rows" :key="v.id" :venue="v" />
        </div>
        <AccountPager v-model:page="savedPage" class="mt-4" :total="saved.total" :limit="saved.limit || 24" />
      </section>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "~/store/auth";
import { changePassword, fetchUser } from "~/services/auth";

useHead({ title: "Settings" });

const route = useRoute();
const router = useRouter();
const auth = useAuthStore();

const tabs = [
  { key: "profile", label: "Profile" },
  { key: "security", label: "Security" },
  { key: "notifications", label: "Notifications" },
  { key: "saved", label: "Saved venues" },
];
const tab = ref(tabs.some((t) => t.key === route.query.tab) ? String(route.query.tab) : "profile");
function setTab(key) {
  tab.value = key;
  router.replace({ query: { ...route.query, tab: key } });
}

/* ── profile ─────────────────────────────────────────────────────────────── */
const profile = reactive({ firstName: "", lastName: "", email: "", phone: "", location: "", bio: "", avatarUrl: null });
const profileLoaded = ref(false);
const profileErrors = reactive({ firstName: "", phone: "" });
const savingProfile = ref(false);
const avatarBusy = ref(false);

function applyProfile(p) {
  if (!p) return;
  Object.assign(profile, {
    firstName: p.firstName ?? "",
    lastName: p.lastName ?? "",
    email: p.email ?? "",
    phone: p.phone ?? "",
    location: p.location ?? "",
    bio: p.bio ?? "",
    avatarUrl: p.avatarUrl ?? null,
  });
  profileLoaded.value = true;
}

onMounted(async () => {
  try {
    applyProfile(await api.get("/account"));
  } catch {
    /* toast shown */
  }
});

async function saveProfile() {
  profileErrors.firstName = profile.firstName.trim() ? "" : "First name is required.";
  profileErrors.phone = "";
  if (profileErrors.firstName) return;
  savingProfile.value = true;
  try {
    const p = await api.patch("/account", {
      firstName: profile.firstName.trim(),
      lastName: profile.lastName.trim(),
      phone: profile.phone.trim() || null,
      location: profile.location.trim() || null,
      bio: profile.bio.trim() || null,
    });
    applyProfile(p);
    await fetchUser();
    notifySuccess("Profile updated");
  } catch (e) {
    if (e?.fields?.firstName) profileErrors.firstName = `First name ${e.fields.firstName}`;
    if (e?.fields?.phone) profileErrors.phone = `Phone ${e.fields.phone}`;
  } finally {
    savingProfile.value = false;
  }
}

async function uploadAvatar(event) {
  const file = event.target.files?.[0];
  event.target.value = "";
  if (!file) return;
  avatarBusy.value = true;
  try {
    const p = await apiUpload("/account/avatar", file);
    if (p?.avatarUrl !== undefined) profile.avatarUrl = p.avatarUrl;
    await fetchUser();
    if (auth.user?.avatarUrl) profile.avatarUrl = auth.user.avatarUrl;
    notifySuccess("Profile photo updated");
  } catch {
    /* toast shown */
  } finally {
    avatarBusy.value = false;
  }
}

async function removeAvatar() {
  if (!window.confirm("Remove your profile photo?")) return;
  avatarBusy.value = true;
  try {
    await api.del("/account/avatar");
    profile.avatarUrl = null;
    await fetchUser();
    notifySuccess("Profile photo removed");
  } catch {
    /* toast shown */
  } finally {
    avatarBusy.value = false;
  }
}

/* ── security ────────────────────────────────────────────────────────────── */
const pw = reactive({ current: "", next: "", confirm: "" });
const pwError = ref("");
const savingPw = ref(false);

async function savePassword() {
  pwError.value = "";
  if (pw.next !== pw.confirm) {
    pwError.value = "The new passwords don’t match.";
    return;
  }
  savingPw.value = true;
  try {
    await changePassword(pw.current, pw.next);
    pw.current = pw.next = pw.confirm = "";
    refreshSessions();
  } catch (e) {
    pwError.value = e?.fields ? Object.entries(e.fields).map(([k, v]) => `${k === "newPassword" ? "New password" : "Password"} ${v}`).join(". ") : e?.message || "";
  } finally {
    savingPw.value = false;
  }
}

const sessions = ref([]);
const sessionsPending = ref(false);
async function refreshSessions() {
  sessionsPending.value = true;
  try {
    sessions.value = (await api.get("/account/sessions", { sessionId: auth.sessionId || undefined })) ?? [];
  } catch {
    sessions.value = [];
  } finally {
    sessionsPending.value = false;
  }
}

async function revoke(s) {
  if (!window.confirm(`Sign out ${s.device}?`)) return;
  try {
    await api.del(`/account/sessions/${s.id}`);
    notifySuccess("Session ended");
    refreshSessions();
  } catch {
    /* toast shown */
  }
}

const revokingOthers = ref(false);
async function revokeOthers() {
  if (!window.confirm("Sign out every other device?")) return;
  revokingOthers.value = true;
  try {
    await api.post("/account/sessions/revoke-others", { sessionId: auth.sessionId });
    notifySuccess("Other sessions ended");
    refreshSessions();
  } catch {
    /* toast shown */
  } finally {
    revokingOthers.value = false;
  }
}

/* ── notification preferences ────────────────────────────────────────────── */
const CATEGORIES = [
  { key: "bookings", label: "Bookings", hint: "Approvals, reminders and changes" },
  { key: "payments", label: "Payments", hint: "Receipts, due dates and refunds" },
  { key: "messages", label: "Messages", hint: "Replies from venues" },
  { key: "reviews", label: "Reviews", hint: "Review requests and venue replies" },
  { key: "marketing", label: "Offers & news", hint: "Occasional updates from Venpadi" },
];
const CHANNELS = [
  { key: "email", label: "Email" },
  { key: "sms", label: "SMS" },
  { key: "inApp", label: "In-app" },
];
const prefs = ref(null);

async function loadPrefs() {
  try {
    prefs.value = await api.get("/account/notification-preferences");
  } catch {
    /* toast shown */
  }
}

async function togglePref(cat, ch) {
  const next = !prefs.value?.[cat]?.[ch];
  prefs.value[cat][ch] = next;
  try {
    prefs.value = await api.patch("/account/notification-preferences", { [cat]: { [ch]: next } });
    notifySuccess("Preferences saved");
  } catch {
    prefs.value[cat][ch] = !next;
  }
}

watch(
  tab,
  (t) => {
    if (t === "security" && !sessions.value.length) refreshSessions();
    if (t === "notifications" && !prefs.value) loadPrefs();
  },
  { immediate: true }
);

/* ── saved venues ────────────────────────────────────────────────────────── */
const savedPage = ref(1);
const { data: saved, pending: savedPending, refresh: refreshSaved } = useResource(
  () => (tab.value === "saved" ? api.get("/me/favorites", { page: savedPage.value, limit: 24 }) : Promise.resolve(saved.value)),
  { watch: [savedPage, tab], initial: { rows: [], total: 0, limit: 24 } }
);
// Un-hearting a card on this tab removes it from the list.
const { ids: favoriteIds } = useFavorites();
watch(favoriteIds, () => {
  if (tab.value === "saved") refreshSaved();
});

/* The navbar keeps master's design (no profile menu), so signing out of THIS
 * device lives here, beside the other session controls. */
function logOut() {
  if (window.confirm("Log out of Venpadi on this device?")) useAuthStore().logout();
}
</script>
