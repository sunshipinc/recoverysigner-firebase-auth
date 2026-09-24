const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

// Short, human-readable ID (no 0/O/1/I) that users can read out to support.
export function generateId(length = 8): string {
  const values = new Uint8Array(length);

  if (window.crypto?.getRandomValues) {
    window.crypto.getRandomValues(values);
  } else {
    for (let i = 0; i < length; i++) {
      values[i] = Math.floor(Math.random() * 256);
    }
  }

  return Array.from(values, (value) => ALPHABET[value % ALPHABET.length]).join(
    "",
  );
}
