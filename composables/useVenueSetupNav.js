/*
 * Navigation between a venue page and the booking wizard. The wizard reads
 * the venue by slug (and optionally a pre-selected space) from the query.
 */
export function useVenueSetupNav() {
  const route = useRoute();
  const slugOf = () => String(route.params.slug || route.query.slug || "");

  function goToSetup(extra = {}) {
    const extraQuery = extra && typeof extra === "object" && !("type" in extra) ? extra : {};
    return navigateTo({ path: "/discover/setup", query: { slug: slugOf(), ...extraQuery } });
  }

  function goToVenue() {
    return navigateTo({ path: `/discover/${slugOf()}` });
  }

  return { goToSetup, goToVenue };
}
