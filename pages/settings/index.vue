<template>
  <div class="px-4 md2:px-6 py-5 md2:py-6">
    <div class="w-full md2:flex md2:items-start md2:gap-6">
      <!-- inner nav -->
      <nav class="md2:w-[200px] shrink-0 mb-4 md2:mb-0">
        <p class="px-3 text-[11px] font-semibold tracking-wide text-bodytext2 uppercase">Settings</p>
        <div class="mt-2 space-y-0.5">
          <button
            v-for="t in tabs"
            :key="t.key"
            type="button"
            class="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] text-left transition-colors"
            :class="tab === t.key ? 'bg-white text-header font-semibold shadow-sm' : 'text-[#374151] hover:bg-white/70'"
            @click="setTab(t.key)"
          >
            <i :class="['pi text-[14px]', t.icon, tab === t.key ? 'text-primary' : 'text-[#6B7280]']"></i>
            <span class="flex-1">{{ t.label }}</span>
            <i v-if="tab === t.key" class="pi pi-chevron-right text-[10px] text-bodytext2"></i>
          </button>
        </div>
      </nav>

      <!-- panel -->
      <div
        class="flex-1 min-w-0"
        :class="tab === 'security' || tab === 'payments' ? '' : 'bg-white rounded-[24px] border border-border p-5 md2:p-8'"
      >
        <!-- personal info -->
        <section v-if="tab === 'profile'">
          <h1 class="text-[26px] md2:text-[32px] font-extrabold text-header tracking-tight">Personal Information</h1>
          <p class="mt-1 text-[14px] text-bodytext">
            Update your photo and personal details here. This information will be displayed on your public profile.
          </p>

          <p v-if="!profileLoaded" class="mt-8 text-sm text-bodytext">Loading…</p>
          <template v-else>
            <div class="mt-8 flex flex-col items-start gap-2">
              <label class="relative cursor-pointer" :class="{ 'opacity-60 pointer-events-none': avatarBusy }">
                <span class="w-[88px] h-[88px] rounded-full overflow-hidden bg-gradient-to-br from-orange-200 to-primary flex items-center justify-center text-white text-xl font-bold">
                  <img v-if="profile.avatarUrl" :src="profile.avatarUrl" alt="" class="w-full h-full object-cover" />
                  <template v-else>{{ initials(`${profile.firstName} ${profile.lastName}`) }}</template>
                </span>
                <input type="file" accept="image/*" class="hidden" @change="uploadAvatar" />
              </label>
              <button
                v-if="profile.avatarUrl"
                type="button"
                class="text-[12px] font-medium text-bodytext hover:text-[#DC2626] disabled:opacity-60"
                :disabled="avatarBusy"
                @click="removeAvatar"
              >
                {{ avatarBusy ? "Removing…" : "Remove photo" }}
              </button>
              <p v-else class="text-[12px] text-bodytext">Click the photo to upload</p>
            </div>

            <form class="mt-8" @submit.prevent="saveProfile">
              <h2 class="text-[18px] font-bold text-header">Basic Details</h2>
              <div class="mt-4 grid grid-cols-1 md2:grid-cols-2 gap-4">
                <label class="block">
                  <span class="text-[13px] font-medium text-header">Full Name</span>
                  <input
                    v-model="fullName"
                    type="text"
                    maxlength="200"
                    class="mt-1 w-full h-11 rounded-xl border border-border px-3 text-[13px] outline-none focus:border-primary"
                  />
                  <span v-if="profileErrors.firstName" class="text-[12px] text-red-500">{{ profileErrors.firstName }}</span>
                </label>
                <label class="block">
                  <span class="text-[13px] font-medium text-header">Username</span>
                  <div class="mt-1 relative">
                    <span class="absolute left-3 top-1/2 -translate-y-1/2 text-[13px] text-bodytext2">@</span>
                    <input
                      v-model="profile.username"
                      type="text"
                      maxlength="60"
                      :readonly="!canEditUsername"
                      class="w-full h-11 rounded-xl border border-border pl-7 pr-3 text-[13px] outline-none focus:border-primary"
                      :class="canEditUsername ? 'bg-white' : 'bg-greybg text-bodytext'"
                    />
                  </div>
                </label>
                <label class="block">
                  <span class="text-[13px] font-medium text-header inline-flex items-center gap-2">
                    Email Address
                    <span class="px-1.5 py-0.5 rounded-full bg-primary text-white text-[10px] font-semibold">Verified</span>
                  </span>
                  <input
                    :value="profile.email"
                    type="email"
                    readonly
                    class="mt-1 w-full h-11 rounded-xl border border-border px-3 text-[13px] bg-greybg text-bodytext outline-none"
                  />
                </label>
                <label class="block">
                  <span class="text-[13px] font-medium text-header inline-flex items-center gap-2">
                    Phone Number
                    <span
                      v-if="profile.phone"
                      class="px-1.5 py-0.5 rounded-full bg-primary text-white text-[10px] font-semibold"
                    >
                      Verified
                    </span>
                  </span>
                  <input
                    v-model="profile.phone"
                    type="tel"
                    maxlength="40"
                    class="mt-1 w-full h-11 rounded-xl border border-border px-3 text-[13px] outline-none focus:border-primary"
                  />
                  <span v-if="profileErrors.phone" class="text-[12px] text-red-500">{{ profileErrors.phone }}</span>
                </label>
                <label class="block md2:col-span-2">
                  <span class="text-[13px] font-medium text-header">Profile Bio</span>
                  <textarea
                    v-model="profile.bio"
                    rows="4"
                    maxlength="2000"
                    class="mt-1 w-full rounded-xl border border-border px-3 py-2 text-[13px] outline-none focus:border-primary"
                    placeholder="Tell venues a little about you"
                  ></textarea>
                </label>
              </div>
              <div class="mt-5 flex justify-end gap-2">
                <button
                  type="button"
                  class="h-10 px-5 rounded-lg border border-border bg-white text-[13px] font-semibold text-header hover:bg-greybg"
                  @click="resetProfile"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  class="h-10 px-5 rounded-lg bg-brand-gradient-soft text-white text-[13px] font-semibold disabled:opacity-60"
                  :disabled="savingProfile"
                >
                  {{ savingProfile ? "Saving…" : "Save Personal Information" }}
                </button>
              </div>
            </form>

            <div class="mt-10 pt-8 border-t border-border">
              <h2 class="text-[18px] font-bold text-header">Regional Settings</h2>
              <div class="mt-4 grid grid-cols-1 md2:grid-cols-3 gap-4">
                <label class="block">
                  <span class="text-[13px] font-medium text-header">City / Location</span>
                  <div class="mt-1 relative">
                    <input
                      v-model="profile.location"
                      type="text"
                      maxlength="120"
                      class="w-full h-11 rounded-xl border border-border px-3 pr-9 text-[13px] outline-none focus:border-primary"
                    />
                    <i class="pi pi-map-marker absolute right-3 top-1/2 -translate-y-1/2 text-bodytext2 text-[13px]"></i>
                  </div>
                </label>
                <label class="block">
                  <span class="text-[13px] font-medium text-header">Language</span>
                  <select
                    v-model="profile.language"
                    class="mt-1 w-full h-11 rounded-xl border border-border px-3 text-[13px] outline-none focus:border-primary bg-white"
                  >
                    <option value="en-US">English (US)</option>
                    <option value="en-GB">English (UK)</option>
                    <option value="en-NG">English (NG)</option>
                  </select>
                </label>
                <label class="block">
                  <span class="text-[13px] font-medium text-header">Currency</span>
                  <select
                    v-model="profile.currency"
                    class="mt-1 w-full h-11 rounded-xl border border-border px-3 text-[13px] outline-none focus:border-primary bg-white"
                  >
                    <option value="NGN">NGN (₦)</option>
                    <option value="USD">USD ($)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="EUR">EUR (€)</option>
                  </select>
                </label>
              </div>
            </div>
          </template>
        </section>

        <!-- security -->
        <template v-if="tab === 'security'">
          <h1 class="text-[26px] md2:text-[32px] font-extrabold text-header tracking-tight">Password &amp; Security</h1>
          <p class="mt-1 text-[14px] text-bodytext">
            Manage your account security, passwords, and two-factor authentication.
          </p>

          <form class="mt-6 bg-white rounded-[20px] border border-border p-5 md2:p-7" @submit.prevent="savePassword">
            <h2 class="text-[16px] font-bold text-header">Change Password</h2>
            <div class="mt-4 space-y-3 max-w-[560px]">
              <label class="block">
                <span class="text-[13px] font-medium text-header">Current Password</span>
                <input
                  v-model="pw.current"
                  type="password"
                  autocomplete="current-password"
                  placeholder="********"
                  class="mt-1 w-full h-11 rounded-lg border border-border px-3 text-[13px] outline-none focus:border-primary"
                />
              </label>
              <label class="block">
                <span class="text-[13px] font-medium text-header">New Password</span>
                <input
                  v-model="pw.next"
                  type="password"
                  autocomplete="new-password"
                  placeholder="********"
                  class="mt-1 w-full h-11 rounded-lg border border-border px-3 text-[13px] outline-none focus:border-primary"
                />
              </label>
              <label class="block">
                <span class="text-[13px] font-medium text-header">Confirm New Password</span>
                <input
                  v-model="pw.confirm"
                  type="password"
                  autocomplete="new-password"
                  placeholder="********"
                  class="mt-1 w-full h-11 rounded-lg border border-border px-3 text-[13px] outline-none focus:border-primary"
                />
              </label>
              <p class="text-[12px] text-bodytext2">At least 8 characters, with a number and a special character.</p>
              <p v-if="pwError" class="text-[12px] text-red-500">{{ pwError }}</p>
              <button
                type="submit"
                class="h-10 px-5 rounded-lg bg-header text-white text-[13px] font-semibold disabled:opacity-60"
                :disabled="savingPw || !pw.current || !pw.next"
              >
                {{ savingPw ? "Updating…" : "Update Password" }}
              </button>
            </div>
          </form>

          <section class="mt-5 bg-white rounded-[20px] border border-border p-5 md2:p-7">
            <div class="flex items-center justify-between gap-3 flex-wrap">
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

        <!-- payments -->
        <section v-if="tab === 'payments'">
          <p class="text-[12px] text-bodytext">
            Account Settings
            <span class="text-bodytext2"> › </span>
            <span class="text-header font-medium">Payment Methods</span>
          </p>
          <h1 class="mt-1 text-[26px] md2:text-[32px] font-extrabold text-header tracking-tight">
            Payment Methods &amp; Settings
          </h1>

          <div class="mt-5 rounded-[20px] bg-[#111111] text-white px-5 md2:px-8 py-8 md2:py-10 min-h-[168px] md2:min-h-[196px] md2:flex md2:items-center md2:justify-between gap-4 overflow-hidden relative">
            <div class="absolute inset-0 bg-gradient-to-r from-black via-black to-[#5B1A12] pointer-events-none"></div>
            <div class="relative min-w-0">
              <p class="text-[16px] font-bold flex items-center gap-2">
                <span class="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                  <i class="pi pi-wallet text-[13px]"></i>
                </span>
                Your Wallet
              </p>
              <div class="mt-4 flex gap-8">
                <div>
                  <p class="text-[11px] tracking-wide text-white/60 uppercase">Saved cards</p>
                  <p class="mt-0.5 text-[28px] font-extrabold leading-none">{{ savedMethods.length }}</p>
                </div>
                <div>
                  <p class="text-[11px] tracking-wide text-white/60 uppercase">Total spent (YTD)</p>
                  <p class="mt-0.5 text-[28px] font-extrabold leading-none">{{ ytdSpent }}</p>
                </div>
              </div>
            </div>
            <button
              type="button"
              class="relative shrink-0 mt-4 md2:mt-0 h-10 px-4 rounded-lg bg-brand-gradient-soft text-white text-[13px] font-semibold inline-flex items-center gap-1.5"
              @click="addPaymentMethod"
            >
              <i class="pi pi-plus text-[11px]"></i>
              Add Payment Method
            </button>
          </div>

          <div class="mt-6">
            <h2 class="text-[16px] font-bold text-header">Saved Methods</h2>
            <p v-if="invoicesPending && !invoicesLoaded" class="mt-4 text-sm text-bodytext">Loading…</p>
            <div v-else-if="!savedMethods.length" class="mt-3 rounded-[20px] border border-dashed border-border bg-white px-5 py-8 text-center">
              <p class="text-[14px] font-semibold text-header">No saved cards yet</p>
              <p class="mt-1 text-[13px] text-bodytext">Cards you pay with can be saved here for faster checkout.</p>
            </div>
            <div v-else class="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <article
                v-for="(card, i) in savedMethods"
                :key="card.id || card.last4 || i"
                class="bg-white rounded-[20px] border p-4 min-h-[120px] flex flex-col justify-between"
                :class="card.primary || card.isDefault ? 'border-header' : 'border-border'"
              >
                <div class="flex items-start justify-between gap-2">
                  <span class="w-9 h-6 rounded-md overflow-hidden flex items-center justify-center text-[10px] font-bold text-white" :class="cardBrandClass(card)">
                    {{ cardBrandLabel(card) }}
                  </span>
                  <span
                    v-if="card.primary || card.isDefault"
                    class="px-2 py-0.5 rounded-md bg-header text-white text-[10px] font-bold tracking-wide"
                  >
                    Primary
                  </span>
                </div>
                <p class="mt-4 text-[13px] tracking-[0.2em] text-header">**** **** **** {{ card.last4 || "••••" }}</p>
                <div class="mt-2 flex items-end justify-between gap-2 text-[12px] text-bodytext">
                  <span>{{ card.name || card.holderName || fullName || "—" }}</span>
                  <span v-if="cardExpiry(card)">{{ cardExpiry(card) }}</span>
                </div>
              </article>
            </div>
          </div>

          <div class="mt-6 bg-white rounded-[20px] border border-border overflow-hidden">
            <div class="px-5 py-4 flex items-center justify-between gap-3">
              <h2 class="text-[16px] font-bold text-header">Recent Transactions</h2>
              <NuxtLink to="/invoices" class="text-[13px] font-semibold text-primary inline-flex items-center gap-1">
                View All <i class="pi pi-arrow-right text-[10px]"></i>
              </NuxtLink>
            </div>
            <p v-if="!recentPayments.length" class="px-5 py-8 text-center text-[13px] text-bodytext">No payments yet.</p>
            <div v-else class="overflow-x-auto">
              <table class="w-full text-[13px]">
                <thead class="text-[11px] uppercase tracking-wide text-bodytext2">
                  <tr class="border-t border-border">
                    <th class="text-left font-semibold px-5 py-2.5">Date</th>
                    <th class="text-left font-semibold px-3 py-2.5">Venue / Service</th>
                    <th class="text-left font-semibold px-3 py-2.5">Amount</th>
                    <th class="text-left font-semibold px-3 py-2.5">Status</th>
                    <th class="text-right font-semibold px-5 py-2.5">Invoice</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="p in recentPayments" :key="p.id" class="border-t border-border">
                    <td class="px-5 py-3 whitespace-nowrap text-header">{{ formatDateUS(p.date) }}</td>
                    <td class="px-3 py-3">
                      <p class="text-header font-medium">{{ p.venueName || p.bookingReference || "—" }}</p>
                      <p v-if="p.purposeLabel" class="text-[11px] text-bodytext">{{ p.purposeLabel }}</p>
                    </td>
                    <td class="px-3 py-3 font-semibold text-header whitespace-nowrap">{{ naira(p.amountMinor) }}</td>
                    <td class="px-3 py-3">
                      <span class="text-[12px] font-semibold uppercase" :class="p.status === 'success' || p.status === 'paid' ? 'text-[#16A34A]' : 'text-bodytext'">
                        {{ p.statusLabel || p.status }}
                      </span>
                    </td>
                    <td class="px-5 py-3 text-right">
                      <a
                        v-if="p.receiptUrl || p.invoiceUrl"
                        :href="p.receiptUrl || p.invoiceUrl"
                        target="_blank"
                        rel="noopener"
                        class="text-bodytext hover:text-header"
                        aria-label="Download invoice"
                      >
                        <i class="pi pi-download text-[13px]"></i>
                      </a>
                      <NuxtLink v-else-if="p.bookingReference" :to="`/bookings/${p.bookingReference}`" class="text-bodytext hover:text-header" aria-label="View booking">
                        <i class="pi pi-download text-[13px]"></i>
                      </NuxtLink>
                      <NuxtLink v-else to="/invoices" class="text-bodytext hover:text-header" aria-label="Open invoices">
                        <i class="pi pi-download text-[13px]"></i>
                      </NuxtLink>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <!-- privacy / notifications -->
        <section v-if="tab === 'privacy'">
          <h1 class="text-[26px] md2:text-[32px] font-extrabold text-header tracking-tight">Privacy</h1>
          <p class="mt-1 text-[14px] text-bodytext">Choose how we reach you about each kind of update.</p>
          <p v-if="!prefs" class="mt-6 text-sm text-bodytext">Loading…</p>
          <div v-else class="mt-6 overflow-x-auto">
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
        <section v-if="tab === 'saved'">
          <h1 class="text-[26px] md2:text-[32px] font-extrabold text-header tracking-tight">Saved venues</h1>
          <p class="mt-1 text-[14px] text-bodytext">Venues you’ve hearted so you can find them again.</p>
          <p v-if="savedPending && !saved.rows.length" class="mt-6 text-sm text-bodytext">Loading…</p>
          <div v-else-if="!saved.rows.length" class="mt-6 rounded-2xl border border-border bg-greybg p-8 text-center">
            <p class="text-[14px] font-semibold text-header">No saved venues</p>
            <p class="mt-1 text-[13px] text-bodytext">Tap the heart on any venue to keep it here.</p>
            <NuxtLink to="/discover" class="mt-3 inline-block text-[13px] font-semibold text-primary">Discover venues</NuxtLink>
          </div>
          <div v-else class="mt-6 grid grid-cols-1 sm:grid-cols-2 md2:grid-cols-3 gap-4">
            <SearchVenueCard v-for="v in saved.rows" :key="v.id" :venue="v" />
          </div>
          <AccountPager v-model:page="savedPage" class="mt-4" :total="saved.total" :limit="saved.limit || 24" />
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "~/store/auth";
import { useToastStore } from "~/store/toast";
import { changePassword, fetchUser } from "~/services/auth";

useHead({ title: "Settings" });

const route = useRoute();
const router = useRouter();
const auth = useAuthStore();

const tabs = [
  { key: "profile", label: "Personal Info", icon: "pi-home" },
  { key: "security", label: "Security", icon: "pi-lock" },
  { key: "payments", label: "Payments", icon: "pi-credit-card" },
  { key: "privacy", label: "Privacy", icon: "pi-shield" },
  { key: "saved", label: "Saved venues", icon: "pi-heart" },
];

function normalizeTab(raw) {
  if (raw === "notifications") return "privacy";
  return tabs.some((t) => t.key === raw) ? raw : "profile";
}

const tab = ref(normalizeTab(String(route.query.tab || "profile")));
function setTab(key) {
  tab.value = key;
  router.replace({ query: { ...route.query, tab: key } });
}

/* ── profile ─────────────────────────────────────────────────────────────── */
const profile = reactive({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  location: "",
  bio: "",
  avatarUrl: null,
  username: "",
  language: "en-NG",
  currency: "NGN",
});
const snapshot = ref(null);
const accountKeys = ref(new Set());
const profileLoaded = ref(false);
const profileErrors = reactive({ firstName: "", phone: "" });
const savingProfile = ref(false);
const avatarBusy = ref(false);

const canEditUsername = computed(() => accountKeys.value.has("username"));

const fullName = computed({
  get: () => [profile.firstName, profile.lastName].filter(Boolean).join(" "),
  set: (v) => {
    const parts = String(v || "").trim().split(/\s+/).filter(Boolean);
    profile.firstName = parts[0] || "";
    profile.lastName = parts.slice(1).join(" ");
  },
});

function applyProfile(p) {
  if (!p) return;
  accountKeys.value = new Set(Object.keys(p));
  Object.assign(profile, {
    firstName: p.firstName ?? "",
    lastName: p.lastName ?? "",
    email: p.email ?? "",
    phone: p.phone ?? "",
    location: p.location ?? "",
    bio: p.bio ?? "",
    avatarUrl: p.avatarUrl ?? null,
    username: p.username ?? (p.email ? String(p.email).split("@")[0] : ""),
    language: p.language || p.locale || "en-NG",
    currency: p.currency || "NGN",
  });
  snapshot.value = { ...profile };
  profileLoaded.value = true;
}

function resetProfile() {
  if (snapshot.value) Object.assign(profile, snapshot.value);
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
    const body = {
      firstName: profile.firstName.trim(),
      lastName: profile.lastName.trim(),
      phone: profile.phone.trim() || null,
      location: profile.location.trim() || null,
      bio: profile.bio.trim() || null,
    };
    if (accountKeys.value.has("username")) body.username = profile.username.trim() || null;
    if (accountKeys.value.has("language") || accountKeys.value.has("locale")) body.language = profile.language;
    if (accountKeys.value.has("currency")) body.currency = profile.currency;
    const p = await api.patch("/account", body);
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

/* ── payments (existing invoices API) ────────────────────────────────────── */
const invoicesLoaded = ref(false);
const { data: invoices, pending: invoicesPending } = useResource(
  () => (tab.value === "payments" ? api.get("/me/invoices", { page: 1, invoicesPage: 1 }) : Promise.resolve(invoices.value)),
  {
    watch: [tab],
    initial: { schedule: [], payments: { rows: [] }, invoices: { rows: [] } },
  }
);
watch(invoicesPending, (p) => {
  if (!p && tab.value === "payments") invoicesLoaded.value = true;
});
const invoiceSchedule = computed(() => invoices.value?.schedule ?? []);
const savedMethods = computed(
  () => invoices.value?.paymentMethods || invoices.value?.cards || invoices.value?.savedMethods || []
);
const recentPayments = computed(() => (invoices.value?.payments?.rows ?? []).slice(0, 8));
const ytdSpent = computed(() => {
  const year = new Date().getFullYear();
  const rows = invoices.value?.payments?.rows ?? [];
  const total = rows.reduce((sum, p) => {
    const ok = p.status === "success" || p.status === "paid";
    const d = p.date ? new Date(p.date) : null;
    if (!ok || !d || d.getFullYear() !== year) return sum;
    return sum + (Number(p.amountMinor) || 0);
  }, 0);
  return nairaCompact(total);
});

function cardBrandLabel(card) {
  const b = String(card.brand || card.scheme || "").toLowerCase();
  if (b.includes("visa")) return "VISA";
  if (b.includes("master")) return "MC";
  if (b.includes("verve")) return "VERVE";
  return (card.brand || "CARD").slice(0, 4).toUpperCase();
}
function cardBrandClass(card) {
  const b = String(card.brand || card.scheme || "").toLowerCase();
  if (b.includes("visa")) return "bg-[#1A1F71]";
  if (b.includes("master")) return "bg-gradient-to-r from-[#EB001B] to-[#F79E1B]";
  return "bg-header";
}
function cardExpiry(card) {
  const m = card.expMonth ?? card.expiryMonth;
  const y = card.expYear ?? card.expiryYear;
  if (!m || !y) return card.expiryLabel || "";
  return `${String(m).padStart(2, "0")}/${String(y).slice(-2)}`;
}
function addPaymentMethod() {
  useToastStore().setMessage({ text: "Adding a payment method is coming soon.", type: "info" });
}

/* ── notification preferences (Privacy) ──────────────────────────────────── */
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
    if (t === "privacy" && !prefs.value) loadPrefs();
  },
  { immediate: true }
);

/* ── saved venues ────────────────────────────────────────────────────────── */
const savedPage = ref(1);
const { data: saved, pending: savedPending, refresh: refreshSaved } = useResource(
  () => (tab.value === "saved" ? api.get("/me/favorites", { page: savedPage.value, limit: 24 }) : Promise.resolve(saved.value)),
  { watch: [savedPage, tab], initial: { rows: [], total: 0, limit: 24 } }
);
const { ids: favoriteIds } = useFavorites();
watch(favoriteIds, () => {
  if (tab.value === "saved") refreshSaved();
});

function logOut() {
  if (window.confirm("Log out of Venpadi on this device?")) useAuthStore().logout();
}
</script>
