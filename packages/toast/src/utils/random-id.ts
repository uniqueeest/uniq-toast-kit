export function randomId() {
  return `uniq-toast-${Math.random().toString(36).slice(2, 11)}`;
}
