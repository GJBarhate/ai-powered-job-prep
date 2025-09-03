const DATE_TIME_FORMATTER = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
  timeStyle: "short",
})
export function formatDateTime(date: Date) {
  return DATE_TIME_FORMATTER.format(date)
}
