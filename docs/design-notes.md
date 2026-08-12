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

## Teaching and guidance philosophy

- **Theory Toolkit helps users see and explore music theory; it does not try to replace the person teaching it.**
- Students are intended users and should be able to use the Toolkit independently once they understand what they are trying to explore.
- An instructor may introduce a concept and show the student how to use the relevant Explorer; the student should then be able to return to the Toolkit later without the instructor present.
- The Toolkit should explain **how to use the Toolkit**, primarily through clear UI, concise instructions, labels, and contextual guidance rather than a large standalone help file.
- A small Getting Started / About section may be useful for basic orientation, but the UI itself should carry most operational guidance.
- Consider concise **pop-up tooltips / contextual hints** for controls and outputs where their purpose may not be immediately obvious.
- Tooltips should explain what a control does or what an output represents in the current interface; they should not quietly become miniature music-theory lessons.
- Users should be able to turn these hints/tooltips off once they are comfortable with the Toolkit and turn them back on later at any time.
- If user preferences are stored locally, tooltip/hint preference is a good candidate to remember on that browser/device.
- Tooltips must work sensibly for both pointer and touch users; do not design essential guidance around desktop hover alone.
- Turning tooltips off must not make controls inaccessible or ambiguous: clear labels and normal accessibility metadata remain necessary.
- Contextual musical information that is part of the visualization is appropriate: note names, chord tones, intervals, scale degrees, formulas/patterns, etc.
- The Toolkit generally should **not teach music theory from first principles**. It does not need to explain what a chord, interval, scale, or mode is simply because one is being displayed.
- Instructors, musicians, or learners with appropriate context provide the conceptual explanation; the Toolkit provides an interactive visual representation of that concept.
- Curated links to external videos/resources may be provided for users who want an explanation of the underlying concept. The video/resource provides the lesson; Theory Toolkit can serve as the interactive visual guide used alongside it.
- Do not prevent curious self-directed learners from exploring the Toolkit, but do not expand the product into a complete theory course merely to make every Explorer understandable from zero prior knowledge.

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
- Do not treat fret 12 as a hard endpoint. The underlying fretboard model should support a flexible/continuous display range.
- Approximately **15 frets may be a better default working range** for guitar views because some useful chord/CAGED forms around the octave extend beyond fret 12.
- The displayed fret range should serve the musical shape or concept being demonstrated rather than forcing the shape to fit an arbitrary endpoint. Later views may frame or emphasize a useful region while retaining enough surrounding neck for context.

## Chord Shape Explorer

- Chord Shape Explorer should feel like another view of the same instrument used by Fretboard Explorer, not a separate little chord-box application.
- The spreadsheet's five-fret beginner limit does not need to carry into the web app.
- Use the shared extended neck model so beginner and more advanced shapes can coexist.
- Beginner/common shapes should be easy to find first; alternate positions, barre chords, inversions and other voicings can be added later.
- A future chord-tone system should be able to take:
  - the notes required by a chord
  - the current instrument/tuning
  - the calculated note locations on that fretboard
  and show where the chord tones occur.
- A later, more advanced system may suggest playable chord shapes/voicings from those available notes.
- Mathematically valid chord tones are not automatically human-playable shapes. Shape generation will eventually need playability rules such as fret span, muted/open strings, required chord tones, duplicated tones and realistic hand geometry.
- Open tunings are an important use case: the tool should make it possible to understand why a chord shape works in the selected tuning rather than only supplying a static diagram.

### CAGED view / shape families

- CAGED is a natural extension of Chord Shape Explorer and probably belongs **within Chord Shape Explorer**, not as a separate top-level Explorer.
- A likely UI is five selectable shape-family controls labeled **C | A | G | E | D**.
- When a chord is selected, the most natural/default form can be shown first; selecting another CAGED family shows that chord using the corresponding movable shape/region on the fretboard.
- Example: selecting C major can initially show open C; selecting the A control then shows the A-shaped C voicing, followed similarly by G-, E-, and D-shaped C forms.
- The C/A/G/E/D labels describe **shape families**, not chord roots or chord quality.
- The same framework should extend beyond major chords to minor, maj7, add9, and other chord qualities where practical. The chord formula determines the required tones; the CAGED family provides a positional/geometric framework for finding a playable voicing.
- Some qualities/forms will be much less visually obvious or ergonomically useful than the familiar major CAGED forms. Do not imply that every theoretically derivable form is equally practical.
- C-shaped and G-shaped minor forms are examples where an open-position version may not be practical; useful movable/barred versions may occur around the octave and extend beyond fret 12.
- Consider optionally emphasizing root notes within a selected CAGED form so an instructor can demonstrate why, for example, an A-shaped C is still a C chord.
- Architecturally, store **shape family** separately from chord root/quality where possible rather than hard-coding every root/quality/shape combination as an unrelated diagram.
- Long-term conceptual pipeline: **Chord → required tones → shape family → current fretboard/tuning → verified playable fingering.**

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

## Diagram export / teaching materials

- Diagram export is a useful future feature because it completes a real instructor workflow: after finding or demonstrating something in Theory Toolkit, an instructor may want a compact image to place in a worksheet, PDF, lesson note, email, or practice material.
- Export should be treated as a **portable teaching-material view**, not necessarily a screenshot of the illustrated interactive instrument.
- Chord Shape Explorer could export a clean, conventional chord-box diagram showing the chord name, strings/frets, open/muted strings, fret position, finger numbers/barres where appropriate, and other information needed to reproduce the fingering.
- Fretboard/Scale/Interval views could eventually export a clean fretboard diagram containing the currently relevant notes, degrees, intervals, or highlights.
- The interactive Toolkit view and exported diagram have different jobs: the Toolkit can be contextual, responsive, and visually rich; the export should be compact, conventional, printable, and easy to reuse.
- SVG is a strong candidate for generated diagrams, with PNG export potentially offered as a convenient additional format.
- Keep export intentionally focused. Avoid turning it into a general-purpose graphic-design application unless a genuine user need emerges.
- Export is **not a high-priority feature** compared with building and validating the Explorers themselves, but the underlying data model should avoid making later export unnecessarily difficult.
- Existing tools used as workflow references include:
  - ChordPic — https://chordpic.com/ — conventional chord diagram creation/export.
  - Zeitbach Fretboard Diagram Creator — https://zeitbach.com/projects/fretboard-diagram-creator/ — fretboard diagrams used for scales/notes and student materials.
- These are references for useful workflows and output needs, **not visual designs to copy**. Theory Toolkit should develop its own UI around its own teaching/exploration workflow.

## Adjacent tools / build-vs-link principle

- Theory Toolkit does not need to reproduce every useful music utility on the web.
- When an adjacent problem is already solved well elsewhere, linking to a trusted external tool can be preferable to spending early development time duplicating it.
- A feature becomes a stronger candidate for integration when users repeatedly need to leave Theory Toolkit, recreate information that already exists in the Toolkit, perform the task elsewhere, and return.
- **Build what Theory Toolkit is particularly suited to doing; link to good tools that solve adjacent problems well; absorb an adjacent feature later only when integration provides a meaningful advantage.**
- Reverse chord identification is currently a low-priority/nice-to-have feature. A future version could let users select fret positions and return **possible chord names**, but chord naming can be ambiguous because of inversions, omitted/doubled tones, enharmonic spelling, and musical context.
- If chord identification is ever built, do not imply that an ambiguous collection of notes has one objectively correct chord name; present plausible interpretations appropriately.
- For now, a useful external reference is ScalesChords Reverse Chord Finder — https://www.scales-chords.com/chordid.php.

## Audio interaction

- Audio should always be an explicit user action. **No surprise audio.**
- Selecting a note in a note selector means "show/filter/highlight this note" and should **not** play a sound.
- Changing instrument, tuning, key, scale, display mode, Explorer, or other visual/theory controls should not trigger sound merely because the selection changed.
- A displayed note on the instrument/string can be deliberately clicked or tapped to play that exact pitch. The string/note position itself may serve as the playable control rather than adding speaker icons everywhere.
- General principle: **visual controls change what the user is exploring; audio controls play what the user is exploring. Do not conflate the two.**
- Fretboard positions should eventually represent exact pitch (note + octave), not only pitch class/note name. This will allow the same note name on different strings/frets/octaves to sound at the correct frequency.
- Web Audio API may be sufficient for an initial implementation without requiring prerecorded samples or server-side audio.
- Initial audio can be a simple clean synthesized tone; more instrument-like sound can be evaluated later if it adds teaching value.
- Future explicit audio actions may include **Play Chord** and **Play Scale**, using the actual pitches/voicings currently displayed.
- Audio playback should remain optional and silent unless deliberately invoked by the user.

## Scale Explorer / interval possibilities

- Scale Explorer should use the same underlying fretboard and shared instrument/tuning/handedness context as the other instrument-facing Explorers.
- Preserve a **freeform diagram mode** in which the user can click/tap arbitrary fret positions to create a custom diagram. This is useful for riffs, partial patterns, exercises, trouble spots, or teaching examples that do not need to correspond to a named scale.
- Add a **scale-driven mode** that auto-populates the fretboard from musical selections instead of requiring the user to mark every note manually.
- Likely core controls include:
  - **Root / Key** (for example G)
  - **Scale** (for example Major)
  - **View** (Position or Fretboard)
  - **Starting/root string or position family** where appropriate
- Example: **G + Major + Fretboard** should display every G-major scale tone across the currently displayed neck.
- A **Position** view should display a playable scale pattern around a selected/root position rather than merely filtering notes to one string.
- Example: choosing a G-major position based on the low E string should show the relevant playable G-major pattern across neighboring strings. Choosing the A-string-based position should reorganize the displayed pattern around the G root on the A string while still including appropriate scale notes on the low E and other strings.
- Important distinction: **starting string identifies the position/orientation; it is not a string filter.**
- The same underlying scale can support multiple labeling views without recalculating the musical content. Possible marker labels include:
  - Note names (G, A, B, C, D, E, F#)
  - Scale degrees (1, 2, 3, 4, 5, 6, 7)
  - Intervals (R, M2, M3, P4, P5, M6, M7)
- Architectural direction: **Root + scale formula + tuning → scale tones → fretboard locations → selected presentation/view.** Avoid storing static pictures for every key/scale/tuning combination.
- Whole-fretboard scale display is primarily derived from note/formula/tuning data and should adapt naturally to alternate tunings and other supported fretted instruments.
- Position/fingering views require more care than whole-fretboard note mapping. Do not silently present one conventional fingering system as the only correct scale position system.
- Where practical, position patterns should use verified/playable fingering or pattern definitions and make the chosen organizational system clear.
- Major-scale positions can provide a foundation for deriving/displaying other scales and modes where musically appropriate, but implementation should not assume every scale is best taught through the same positional system.
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
