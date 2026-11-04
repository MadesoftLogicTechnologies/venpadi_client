import { useLoadingStore } from "~/store/loading";

/** Drive the global Loading overlay from a page's pending flag. */
export function usePageLoading(source) {
  const { showLoading, closeLoading } = useLoadingStore();
  let shown = false;

  function sync(on) {
    if (on && !shown) {
      showLoading();
      shown = true;
    } else if (!on && shown) {
      closeLoading();
      shown = false;
    }
  }

  watch(typeof source === "function" ? source : () => unref(source), (on) => sync(!!on), { immediate: true });

  onBeforeUnmount(() => sync(false));
}
