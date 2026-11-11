<template>
  <section id="comparison" class="bg-white py-16 md2:py-24 scroll-mt-28">
    <div class="max-w-[1280px] mx-auto px-4 sm:px-6 md2:px-8">
      <p class="text-[11px] font-bold tracking-[0.14em] uppercase text-bodytext2">
        How we compare
      </p>
      <h2
        class="mt-3 text-2xl sm:text-3xl md2:text-[2.35rem] font-extrabold text-header tracking-tight"
      >
        The honest comparison.
      </h2>
      <p class="mt-4 text-sm sm:text-base text-bodytext leading-relaxed max-w-2xl">
        See how Venpadi outperforms manual setups, generic website builders, and
        disconnected messaging apps.
      </p>

      <div class="mt-10 overflow-x-auto">
        <table class="w-full min-w-[760px] text-left text-sm border-collapse">
          <thead>
            <tr>
              <th class="py-3 pr-4 font-bold text-header">Capability</th>
              <th
                class="py-3 px-3 font-bold text-white bg-header rounded-t-xl text-center"
              >
                Venpadi OS
              </th>
              <th class="py-3 px-3 font-semibold text-bodytext2 text-center">
                Excel + Transfer
              </th>
              <th class="py-3 px-3 font-semibold text-bodytext2 text-center">
                WhatsApp + Links
              </th>
              <th class="py-3 px-3 font-semibold text-bodytext2 text-center">
                General CMS
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="row in rows"
              :key="row.capability"
              class="border-t border-border"
            >
              <td class="py-3.5 pr-4 font-medium text-header">{{ row.capability }}</td>
              <td class="py-3.5 px-3 text-center bg-header/[0.03]">
                <span class="inline-flex items-center gap-1.5 font-semibold text-emerald-700">
                  <i class="pi pi-check text-[10px]"></i>
                  {{ row.venpadi }}
                </span>
              </td>
              <td class="py-3.5 px-3 text-center text-bodytext">{{ row.excel }}</td>
              <td class="py-3.5 px-3 text-center text-bodytext">{{ row.whatsapp }}</td>
              <td class="py-3.5 px-3 text-center text-bodytext">{{ row.cms }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script setup>
const rows = [
  {
    capability: "Built specifically for venues",
    venpadi: "Native purpose-built",
    excel: "Generic",
    whatsapp: "Generic",
    cms: "Generic",
  },
  {
    capability: "Escrow protected deposits",
    venpadi: "Automated escrow",
    excel: "Manual",
    whatsapp: "Not supported",
    cms: "Not supported",
  },
  {
    capability: "Payouts to your bank",
    venpadi: "On request, after the event",
    excel: "Manual verification",
    whatsapp: "Manual",
    cms: "Manual plugins",
  },
  {
    capability: "Real-time calendar lockout",
    venpadi: "Locked on booking",
    excel: "High human error",
    whatsapp: "High human error",
    cms: "Partial",
  },
  {
    capability: "Occupancy & revenue analytics",
    venpadi: "Revenue & occupancy reports",
    excel: "Manual formulas",
    whatsapp: "None",
    cms: "Basic stats",
  },
  {
    capability: "Damage claims on deposits",
    venpadi: "Claim, client responds",
    excel: "Abandoned",
    whatsapp: "Client vs host",
    cms: "None",
  },
];
</script>
