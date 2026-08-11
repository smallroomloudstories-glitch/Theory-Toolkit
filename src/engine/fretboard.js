import { CHROMATIC_SHARPS } from "../data/music-data.js";

/**
 * Return the note found a given number of frets above an open string.
 *
 * This first increment deliberately uses sharp spellings only, matching
 * the simple fretboard-note convention chosen for v0.1.
 */
export function noteAtFret(openNote, fret) {
  const openIndex = CHROMATIC_SHARPS.indexOf(openNote);

  if (openIndex === -1) {
    throw new Error(`Unknown open-string note: ${openNote}`);
  }

  if (!Number.isInteger(fret) || fret < 0) {
    throw new Error(`Fret must be a non-negative integer: ${fret}`);
  }

  return CHROMATIC_SHARPS[(openIndex + fret) % CHROMATIC_SHARPS.length];
}
