export abstract class FormatDateUtil {
  public static formatTimestamp(date: Date): string {
    const pad = (n: number): string | number => (n < 10 ? `0${n}` : n);
    const padMilliseconds = (n: number): string => n.toString().padStart(3, '0');
    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1);
    const year = date.getFullYear();
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());
    const milliseconds = padMilliseconds(date.getMilliseconds());
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}.${milliseconds}`;
  }
}
