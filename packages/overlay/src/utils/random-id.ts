export function randomId() {
  return `uniq-overlay-${Math.random().toString(36).slice(2, 11)}`;
}
