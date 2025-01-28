export function randomId() {
  return `overlay-${Math.random().toString(36).slice(2, 11)}`;
}
