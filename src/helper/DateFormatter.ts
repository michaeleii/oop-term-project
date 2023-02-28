export default class DateFormatter {
  private static options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  static format(date: Date): string {
    return date.toLocaleString("en-US", this.options);
  }
}
