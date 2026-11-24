// One Sentence for a Traveler from 1800
// Writes a single sentence explaining the modern internet to a time
// traveler from 1800, using only words a person from 1800 could know:
// a road, a letter, books, a library. No trailing newline.
//
// The sentence:
// "It is a road to every house on earth, where a letter you write
//  arrives in a blink and more books stand open than any library
//  could hold."
// A road is the one comparison that carries the whole sentence: it
// explains both what the internet is (a way to reach every house)
// and what it does (letters arrive in a blink; more books stand open
// than any library could hold).

import { mkdirSync, writeFileSync } from "node:fs";

const SENTENCE =
  "It is a road to every house on earth, where a letter you write arrives in a blink and more books stand open than any library could hold.";

// Words coined after the traveler's time. None of these may appear in
// the sentence; the check below guards against an accidental edit.
const FORBIDDEN_AFTER_1800 = [
  "internet",
  "computer",
  "digital",
  "online",
  "website",
  "email",
  "screen",
  "data",
  "network",
  "video",
  "phone",
  "television",
];

// Self-checks: the sealed scorer requires UTF-8 text of 1 to 200
// characters, not only white space, and the entry is one sentence.
if (SENTENCE.length < 1 || SENTENCE.length > 200) {
  throw new Error(`sentence must be 1-200 characters, got ${SENTENCE.length}`);
}
if (SENTENCE.trim().length === 0) {
  throw new Error("sentence must not be only white space");
}
if ((SENTENCE.match(/\./g) ?? []).length !== 1 || !SENTENCE.endsWith(".")) {
  throw new Error("entry must be exactly one sentence ending with a period");
}
const lower = SENTENCE.toLowerCase();
for (const word of FORBIDDEN_AFTER_1800) {
  if (lower.includes(word)) {
    throw new Error(`sentence uses a word coined after 1800: ${word}`);
  }
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", SENTENCE, "utf8");
console.log(`wrote /output/entry.txt (${SENTENCE.length} characters)`);
