const preview = ref(null);

/** Snapshot from the invoices list so the detail page can render without a second fetch. */
export function useInvoicePreview() {
  function stash(payload) {
    preview.value = payload;
  }
  function match(id) {
    if (!preview.value) return null;
    return String(preview.value.id) === String(id) ? preview.value : null;
  }
  return { preview, stash, match };
}
