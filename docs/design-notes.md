# Theory Toolkit — Evolving Design Notes

> **Status:** Working ideas, not requirements carved in stone.
>
> This document records design ideas and principles that come up during development so they are not lost. Any item here may be changed, discarded, or revisited when implementation begins or testing suggests a better approach.

## Overall application model

- The web app should not feel like a collection of unrelated spreadsheet tabs or mini-apps.
- Explorers are different views/tools within one Theory Toolkit.
- Relevant context should carry between Explorers where it makes sense rather than resetting unnecessarily.
- The instrument-facing Explorers currently envisioned include:
  - Fretboard Explorer
  - Chord Shape Explorer
  - Scale Explorer
  - Possibly an Interval Explorer later
- Key Explorer and Modes Explorer are more theory-facing and may use a different central presentation while retaining the same overall visual language/navigation.

## Shared instrument context

Instrument-facing Explorers should share an instrument context. Current ideas:

- **Instrument** — standard choices such as Guitar, Bass, Ukulele, Mandolin, etc.
- **Tuning** — each instrument defaults to its standard tuning.
- Known alternate tunings should be selectable as presets.
- A custom tuning should allow the open note of each string to be chosen independently.
- Presets should simply populate string/tuning data; the fretboard engine should not contain special logic for particular tunings.
- Number of strings should ultimately come from instrument/tuning data rather than being hard-coded to six.
- **Handedness** — Right / Left should eventually be part of the shared context so relevant views can mirror appropriately.
- Switching between Fretboard, Chord Shapes, Scales, etc. should preserve instrument/tuning/handedness when relevant.

## Fretboard interaction model

Current behavior/design direction:

- String selection defines **where** the user is looking.
- Note selection defines **what** the user is interested in.
- Display mode defines **how** the selected information is shown.
- All Strings should be the default persistent string scope.
- Selecting one or more individual strings turns All Strings off.
- If the final individually selected string is cleared, All Strings becomes active again.
- No selected notes means there is no note filter: show all notes within the selected string scope.
- Filter mode + selected notes shows only those notes within the selected string scope.
- Highlight mode shows all notes within the selected string scope and emphasizes selected notes.
- Note selection should use buttons rather than checkboxes in the eventual UI.
- Clear All Notes removes note selections; it should not blank the fretboard.

## Instrument illustration / neck presentation

- The finished fretboard should look recognizably like an instrument neck rather than a spreadsheet/table.
- Prefer an original **illustrated / technical-diagram style**, not a photorealistic image.
- Guitar can visually lean acoustic without representing a specific guitar/model.
- Bass can visually lean electric bass; other instruments should similarly have enough character to be recognizable without imitating a particular manufacturer's design.
- The instrument exists primarily for physical/contextual grounding. It should visually recede behind the theory information.
- Possible visual layering:
  1. Subtle instrument/neck background
  2. Strings, nut, frets, position markers
  3. Notes, intervals, chord tones, scale degrees, fingerings and other teaching information
- The neck/background may be almost translucent or otherwise subdued so instructional overlays remain dominant.
- If greater realism makes the theory harder to read, readability wins.
- SVG may be a good implementation approach because it can scale responsively and allow individual visual layers to be styled dynamically.
- Fret spacing should resemble a real instrument: wider near the nut and progressively narrower farther down the neck, calculated rather than merely eyeballed if practical.
- The nut should be visually obvious.
- A small portion of headstock may remain visible beyond the nut, potentially including partial tuners disappearing off-screen, to reinforce physical orientation without consuming much space.
- Position markers can appear at conventional locations where appropriate, but should remain visually secondary.
- String thickness may reflect the instrument/string order where useful.
- Left-handed presentation should be intentionally supported rather than forcing left-handed users to mentally mirror diagrams.

## Chord Shape Explorer

- Chord Shape Explorer should feel like another view of the same instrument used by Fretboard Explorer, not a separate little chord-box application.
- The spreadsheet's five-fret beginner limit does not need to carry into the web app.
- Use the same 12+ fret neck model so beginner and more advanced shapes can coexist.
- Beginner/common shapes should be easy to find first; alternate positions, barre chords, inversions and other voicings can be added later.
- A future chord-tone system should be able to take:
  - the notes required by a chord
  - the current instrument/tuning
  - the calculated note locations on that fretboard
  and show where the chord tones occur.
- A later, more advanced system may suggest playable chord shapes/voicings from those available notes.
- Mathematically valid chord tones are not automatically human-playable shapes. Shape generation will eventually need playability rules such as fret span, muted/open strings, required chord tones, duplicated tones and realistic hand geometry.
- Open tunings are an important use case: the tool should make it possible to understand why a chord shape works in the selected tuning rather than only supplying a static diagram.

## Realistic fingering presentation

- Where fingerings are shown, aim to teach realistic fretting technique rather than conventional dots centered in fret spaces.
- The preferred target is close to the fret wire without being directly on the wire.
- Fingering data may eventually need more than string + fret; it may include finger number and placement within the fret space.
- For crowded chord shapes, do not imply that every fingertip can occupy the ideal position immediately behind the fret wire.
- Illustrations may show realistic staggering: one finger closest to the wire, others progressively farther back where hand geometry requires it while remaining in a good playable position.
- Consider distinguishing between:
  - **Theory/shape view:** which strings/frets/notes constitute the chord
  - **Fingering view:** a verified practical way for a human hand to play it
- Do not invent an "optimal" fingering when one has not been verified.
- Barre chords should eventually be capable of showing a barre as a finger spanning strings rather than as several unrelated dots.

## Scale / interval possibilities

- Scale Explorer can use the same underlying fretboard and instrument context.
- Major-scale positions can provide a foundation for deriving/displaying other scales and modes where musically appropriate.
- A possible Interval Explorer could allow a root to be selected and intervals displayed/highlighted across the neck, but this is not yet committed as a separate Explorer.

## Responsive / mobile design

- Phone, tablet and desktop use should be treated as normal use cases, not an afterthought.
- A student using a phone on a music stand is a plausible real-world scenario.
- The current prototype already works reasonably on at least one large Android phone in portrait and landscape, but that is only an early sanity check, not proof that responsive design is solved.

## Design/testing philosophy

- Current HTML test pages are behavior prototypes, not visual proposals.
- Do not preserve spreadsheet limitations simply because v0.1 used them.
- Test interactions by asking whether the result matches what a user predicted before clicking.
- When a change does not produce the expected result, check assumptions/naming/data early rather than repeatedly layering fixes onto an unverified assumption.
- Outside feedback is useful from both musicians and non-musicians. Independent agreement from testers is especially valuable.
- Visual mockups can inform the eventual interface without needing to contain working code.
- No design note in this file is final. Implementation and user testing may reveal a better answer.
