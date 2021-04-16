const padZero = (n: number, p = 2) => n.toString().padStart(p, "0");

export const toDateString = (date: Date = new Date()): string => {
  const year = date.getFullYear().toString();
  const month = padZero(date.getMonth() + 1);
  const day = padZero(date.getDate());

  const hour = padZero(date.getHours());
  const minute = padZero(date.getMinutes());

  return `${year}-${month}-${day}T${hour}:${minute}`;
};

export const timestampFormat = (timestamp: number): string => {
  const date = new Date(timestamp)

  const year = date.getFullYear().toString();
  const month = padZero(date.getMonth() + 1);
  const day = padZero(date.getDate());

  const hour = padZero(date.getHours());
  const minute = padZero(date.getMinutes());

  return `${year}/${month}/${day} ${hour}:${minute}`;
}
