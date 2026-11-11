/*
 * Published testimonials for one audience
 * (GET /public/content/testimonials?audience=planner|host).
 *
 *   const { testimonials, loaded } = usePublicTestimonials("host");
 *   <section v-if="testimonials.length"> … </section>
 *
 * Testimonial = { id, quote, name, role, initials, color, audience,
 * rating: number | null }. A section hides when the list is empty: invented
 * people and quotes are what the audit removed (WP2). Stars render only when
 * `rating` is not null, exactly `rating` of them — use testimonialStars().
 * Cached per audience for the page load.
 */
const cache = {};

export function usePublicTestimonials(audience) {
  if (!cache[audience]) {
    const list = ref([]);
    const loaded = ref(false);
    cache[audience] = { list, loaded };
    api
      .get("/public/content/testimonials", { audience }, { toast: false })
      .then((rows) => (list.value = Array.isArray(rows) ? rows : []))
      .catch(() => {
        delete cache[audience]; // let the next mount retry
      })
      .finally(() => (loaded.value = true));
  }
  const { list, loaded } = cache[audience];
  return { testimonials: list, loaded };
}

/** 0 when the testimonial has no rating, else the rating clamped to 1–5. */
export const testimonialStars = (t) => {
  const r = Number(t?.rating);
  if (t?.rating === null || t?.rating === undefined || !Number.isFinite(r)) return 0;
  return Math.max(0, Math.min(5, Math.round(r)));
};
