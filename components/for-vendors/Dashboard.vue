<template>
  <section class="bg-[#F7F8FA] py-14 md2:py-20">
    <div class="max-w-[1280px] mx-auto px-4 sm:px-6 md2:px-8">
      <div class="text-center max-w-2xl mx-auto mb-10">
        <p class="text-xs font-bold tracking-[0.12em] uppercase text-primary mb-2">
          Owner dashboard
        </p>
        <h2 class="text-2xl sm:text-3xl md2:text-[2.25rem] font-extrabold text-header tracking-tight">
          See every booking, payout, and enquiry in one place.
        </h2>
        <p class="mt-3 text-sm sm:text-base text-bodytext leading-relaxed">
          Manage calendars, approve requests, and track revenue without spreadsheets
          or endless WhatsApp threads.
        </p>
      </div>

      <div
        class="relative rounded-3xl border border-border bg-white shadow-[0_24px_80px_rgba(15,23,42,0.1)] overflow-hidden"
      >
        <div class="flex items-center gap-2 px-4 py-3 border-b border-border bg-greybg/60">
          <span class="w-2.5 h-2.5 rounded-full bg-[#FF5F57]"></span>
          <span class="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]"></span>
          <span class="w-2.5 h-2.5 rounded-full bg-[#28C840]"></span>
          <span class="ml-3 text-xs font-medium text-bodytext2">venpadi.com/owner</span>
        </div>

        <div class="grid md2:grid-cols-[220px_1fr]">
          <aside class="hidden md2:block border-r border-border bg-[#FAFBFC] p-5 space-y-1">
            <p class="text-[11px] font-bold uppercase tracking-wider text-bodytext2 mb-3">
              Menu
            </p>
            <div
              v-for="item in sidebar"
              :key="item"
              class="px-3 py-2 rounded-lg text-sm font-medium"
              :class="
                item === 'Overview'
                  ? 'bg-primary/10 text-primary'
                  : 'text-bodytext hover:bg-greybg'
              "
            >
              {{ item }}
            </div>
          </aside>

          <div class="p-5 sm:p-8">
            <div class="flex flex-wrap items-end justify-between gap-3 mb-6">
              <div>
                <p class="text-xs font-semibold text-bodytext2 uppercase tracking-wide">
                  This month
                </p>
                <p class="text-2xl sm:text-3xl font-extrabold text-header mt-1">₦18.4M</p>
                <p class="text-xs text-success font-semibold mt-1">↑ 24% vs last month</p>
              </div>
              <div class="flex gap-2">
                <span
                  class="px-3 py-1.5 rounded-full bg-success/10 text-success text-xs font-semibold"
                >
                  12 confirmed
                </span>
                <span
                  class="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold"
                >
                  5 pending
                </span>
              </div>
            </div>

            <div class="grid sm:grid-cols-3 gap-3 mb-6">
              <div
                v-for="stat in stats"
                :key="stat.label"
                class="rounded-2xl border border-border p-4 bg-greybg/40"
              >
                <p class="text-xs text-bodytext2 font-medium">{{ stat.label }}</p>
                <p class="text-lg font-extrabold text-header mt-1">{{ stat.value }}</p>
              </div>
            </div>

            <div class="rounded-2xl border border-border overflow-hidden">
              <div
                class="grid grid-cols-[1fr_auto_auto] gap-3 px-4 py-2.5 bg-greybg text-[11px] font-bold uppercase tracking-wide text-bodytext2"
              >
                <span>Booking</span>
                <span>Date</span>
                <span>Status</span>
              </div>
              <div
                v-for="row in rows"
                :key="row.name"
                class="grid grid-cols-[1fr_auto_auto] gap-3 px-4 py-3 border-t border-border text-sm items-center"
              >
                <div class="min-w-0">
                  <p class="font-semibold text-header truncate">{{ row.name }}</p>
                  <p class="text-xs text-bodytext truncate">{{ row.space }}</p>
                </div>
                <span class="text-xs text-bodytext whitespace-nowrap">{{ row.date }}</span>
                <span
                  class="text-[11px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap"
                  :class="row.statusClass"
                >
                  {{ row.status }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const sidebar = ["Overview", "Calendar", "Bookings", "Payouts", "Messages", "Settings"];

const stats = [
  { label: "Occupancy", value: "78%" },
  { label: "Avg. booking", value: "₦1.5M" },
  { label: "Response time", value: "2.1 hrs" },
];

const rows = [
  {
    name: "Adeola & Kunle Wedding",
    space: "Grand Ballroom",
    date: "Sat, 14 Jun",
    status: "Confirmed",
    statusClass: "bg-success/10 text-success",
  },
  {
    name: "Zenith Bank Offsite",
    space: "Conference Hall A",
    date: "Thu, 19 Jun",
    status: "Pending",
    statusClass: "bg-amber-100 text-amber-700",
  },
  {
    name: "Tech Meetup Lagos",
    space: "Rooftop Terrace",
    date: "Fri, 27 Jun",
    status: "Paid out",
    statusClass: "bg-primary/10 text-primary",
  },
];
</script>
