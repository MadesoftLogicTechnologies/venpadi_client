/*
 * Feature flags for controls whose API does not exist yet.
 *
 *   const pdf = useFeature("invoicePdf");   // a boolean, fixed for the page load
 *   <button v-if="pdf">Download PDF</button>
 *
 * Flags live in runtimeConfig.public.features (nuxt.config.ts) and default to
 * false. An unbuilt action is hidden, never shown with a "coming soon" toast —
 * a button the user can press is a promise that the action works.
 * Unknown names are false, so a typo hides the control instead of showing it.
 */
export function useFeature(name) {
  const flags = useRuntimeConfig().public.features ?? {};
  const v = flags[name];
  return v === true || v === "true";
}
