export function useVenueSetupNav() {
  const route = useRoute();

  function goToSetup(extra = {}) {
    const extraQuery =
      extra && typeof extra === "object" && !("type" in extra) ? extra : {};

    return navigateTo({
      path: `/discover/${route.params.slug}/setup`,
      query: {
        ...(route.query.venue ? { venue: route.query.venue } : {}),
        ...(route.query.location ? { location: route.query.location } : {}),
        ...extraQuery,
      },
    });
  }

  function goToVenue() {
    return navigateTo({
      path: `/discover/${route.params.slug}`,
      query: {
        ...(route.query.venue ? { venue: route.query.venue } : {}),
        ...(route.query.location ? { location: route.query.location } : {}),
      },
    });
  }

  return { goToSetup, goToVenue };
}
