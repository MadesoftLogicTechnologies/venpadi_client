/*
 * Badge colours for the API's machine status keys (bookings, payments,
 * invoices). The label always comes from the API's `…Label` field.
 */
const STATUS_CLASSES = {
  // bookings
  draft: "bg-[#F3F4F6] text-[#4B5563]",
  pending: "bg-[#FFF7ED] text-[#C2410C]",
  approved: "bg-[#EFF6FF] text-[#1D4ED8]",
  confirmed: "bg-[#EAF8F0] text-[#16A34A]",
  completed: "bg-[#F3F4F6] text-[#374151]",
  cancelled: "bg-[#FEF2F2] text-[#DC2626]",
  declined: "bg-[#FEF2F2] text-[#DC2626]",
  expired: "bg-[#F3F4F6] text-[#6B7280]",
  // payments / invoices / milestones
  success: "bg-[#EAF8F0] text-[#16A34A]",
  paid: "bg-[#EAF8F0] text-[#16A34A]",
  failed: "bg-[#FEF2F2] text-[#DC2626]",
  abandoned: "bg-[#F3F4F6] text-[#6B7280]",
  sent: "bg-[#FFF7ED] text-[#C2410C]",
  due: "bg-[#FFF7ED] text-[#C2410C]",
  overdue: "bg-[#FEF2F2] text-[#DC2626]",
  void: "bg-[#F3F4F6] text-[#6B7280]",
  scheduled: "bg-[#EFF6FF] text-[#1D4ED8]",
  returned: "bg-[#F3F4F6] text-[#374151]",
};

export const statusClass = (status) => STATUS_CLASSES[status] ?? "bg-[#F3F4F6] text-[#4B5563]";
