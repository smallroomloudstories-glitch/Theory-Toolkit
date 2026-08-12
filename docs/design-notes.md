# Theory Toolkit — Evolving Design Notes

> **Status:** Working ideas, not requirements carved in stone.
>
> This document records design ideas and principles that come up during development so they are not lost. Any item here may be changed, discarded, or revisited when implementation begins or testing suggests a better approach.

## Overall application model

- The web app should not feel like a collection of unrelated spreadsheet tabs or mini-apps.
- Explorers are different views/tools within one Theory Toolkit.
- Relevant context should carry between Explorers where it makes sense rather than resetting unnecessarily.
- The instrument-facing Explorers currently envisioned include Fretboard Explorer, Chord Shape Explorer, Scale Explorer, and possibly an Interval Explorer later.
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
- The Toolkit generally should **not teach music theory from first principles**.
- Curated links to external videos/resources may be provided for users who want an explanation of the underlying concept.

## Shared instrument context

- Instrument-facing Explorers should share instrument, tuning, and handedness context.
- Standard instrument choices can default to standard tuning; alternate presets and custom per-string tuning should be supported eventually.
- Presets should populate data rather than requiring tuning-specific fretboard logic.
- Number of strings should ultimately come from instrument/tuning data rather than being hard-coded to six.
- **Handedness — Right / Left** should eventually mirror relevant views appropriately.

## Fretboard interaction model

- String selection defines **where** the user is looking.
- Note selection defines **what** the user is interested in.
- Display mode defines **how** the selected information is shown.
- All Strings should be the default persistent string scope.
- No selected notes means there is no note filter.
- Filter mode + selected notes shows only those notes within the selected string scope.
- Highlight mode shows all notes within the selected string scope and emphasizes selected notes.
- Note selection should use buttons rather than checkboxes in the eventual UI.

## Instrument illustration / neck presentation

- The finished fretboard should look recognizably like an instrument neck rather than a spreadsheet/table.
- Prefer an original **illustrated / technical-diagram style**, not a photorealistic image.
- Guitar can visually lean acoustic; bass can visually lean electric bass; avoid imitating a particular manufacturer's design.
- The instrument exists primarily for physical/contextual grounding and should visually recede behind theory information.
- Fret spacing should resemble a real instrument: wider near the nut and progressively narrower farther down the neck.
- The nut should be visually obvious; a small portion of headstock/tuners may remain visible for orientation.
- Left-handed presentation should be intentionally supported.
- Do not treat fret 12 as a hard endpoint. Approximately **15 frets may be a better default working range** for guitar views, with a flexible underlying model.

## Chord Shape Explorer

- Chord Shape Explorer should feel like another view of the same instrument used by Fretboard Explorer.
- The spreadsheet's five-fret beginner limit does not need to carry into the web app.
- Beginner/common shapes should be easy to find first; alternate positions, barre chords, inversions and other voicings can be added later.
- A future chord-tone system should derive available chord tones from chord + tuning + fretboard locations.
- Mathematically valid chord tones are not automatically human-playable shapes; eventual generation needs playability rules.
- Open tunings are an important use case.

### CAGED view / shape families

- CAGED is a natural extension of Chord Shape Explorer and probably belongs **within Chord Shape Explorer**.
- A likely UI is five selectable controls labeled **C | A | G | E | D**.
- C/A/G/E/D describe **shape families**, not chord roots or quality.
- The framework should extend beyond major chords where practical, without implying every derived form is equally ergonomic.
- Architecturally, store shape family separately from chord root/quality where possible.
- Long-term conceptual pipeline: **Chord → required tones → shape family → current fretboard/tuning → verified playable fingering.**

## Realistic fingering presentation

- Where fingerings are shown, aim to teach realistic fretting technique rather than dots centered in fret spaces.
- Preferred target is close to the fret wire without being directly on it.
- Crowded chord shapes may require realistic staggering rather than implying every fingertip can occupy the ideal position.
- Consider distinguishing **Theory/shape view** from **Fingering view**.
- Do not invent an "optimal" fingering when one has not been verified.
- Barre chords should eventually be capable of showing a barre as a finger spanning strings.

## Diagram export / teaching materials

- Diagram export is a useful future feature for instructor worksheets, PDFs, lesson notes, email, and practice materials.
- Export should be a **portable teaching-material view**, not necessarily a screenshot of the illustrated instrument.
- Chord Shape Explorer could export a clean conventional chord-box; fretboard/scale views could export a clean fretboard diagram.
- SVG is a strong candidate, with PNG potentially offered as well.
- Export is **not a high-priority feature** compared with building and validating the Explorers.
- Workflow references include ChordPic and Zeitbach Fretboard Diagram Creator; these are references for workflow/output needs, **not designs to copy**.

## Adjacent tools / build-vs-link principle

- Theory Toolkit does not need to reproduce every useful music utility on the web.
- **Build what Theory Toolkit is particularly suited to doing; link to good tools that solve adjacent problems well; absorb an adjacent feature later only when integration provides a meaningful advantage.**
- Reverse chord identification is currently low priority; an external reverse chord finder can serve that need for now.

## Audio interaction

- Audio should always be an explicit user action. **No surprise audio.**
- Selecting a note or changing theory/visual controls should not play sound.
- A displayed fretboard note can eventually be deliberately clicked/tapped to play that exact pitch.
- General principle: **visual controls change what the user is exploring; audio controls play what the user is exploring.**
- Fretboard positions should eventually represent exact pitch (note + octave), not only pitch class.

## Scale Explorer / interval possibilities

- Scale Explorer should use the same underlying fretboard and shared instrument/tuning/handedness context as the other instrument-facing Explorers.
- Preserve a **freeform diagram mode** in which the user can click/tap arbitrary fret positions to create a custom diagram.
- Add a **scale-driven mode** that auto-populates the fretboard from musical selections.
- Architectural direction: **Root + scale formula + tuning → scale tones → fretboard locations → selected presentation/view.** Avoid static pictures for every key/scale/tuning combination.
- Whole-fretboard scale display is primarily derived from note/formula/tuning data and should adapt naturally to alternate tunings and other supported fretted instruments.

### Scale and Scale View

- Keep **Scale** separate from **Scale View**.
- **Scale** identifies the underlying major/minor scale context.
- **Scale View** determines which commonly used subset/variant of that context is displayed.
- Initial Scale Views are **Diatonic** and **Pentatonic**.
- **Blues** is an obvious future Scale View, and other common useful views may be added later without cluttering the Scale selector.
- This separation is pedagogically useful: switching views can reveal exactly what changes while keeping the same root/scale context.

### Scale positions / five-shape model

- Position view should use a **five-position / five-shape model** across the fretboard rather than merely an E-string/A-string selector.
- Use the naming convention in which **Shape 1 is the E-shape scale position**, with Shapes 2–5 following sequentially around the fretboard.
- A position may also carry useful aliases such as its CAGED relationship and whether it is E-rooted or A-rooted. These are descriptions of the same pattern, not separate systems.
- There are multiple E-rooted/A-rooted positions, so root string alone is not sufficient to uniquely identify a position.
- Long term, CAGED chord forms and scale positions should be able to share the same fretboard geography so students can see how chord shapes sit inside/alongside scale positions.
- **Position identifies a pattern, not merely a rectangular fret range.** Do not implement scale positions by showing every scale note inside a broad fret window.
- Position definitions must be verified musically/string-by-string before being encoded. A mathematically correct scale note that happens to lie inside a fret range is not automatically part of the intended shape.
- Current Test 3 demonstrated this explicitly: patching broad position windows caused missing/extra notes on individual strings. Before further position code changes, define the expected Shapes 1–5 precisely with the user/instructor.

### Open-position and octave-equivalent shapes

- If a **complete** scale position can be represented naturally at the nut using open strings, show that open-position occurrence.
- Do not show a mutilated/incomplete open version merely because part of a shape fits before the nut; if the complete shape cannot exist there, show the first complete playable occurrence farther up the neck.
- If the same complete position can be shown both open and at its octave-equivalent fretted location within the displayed neck, **show both**.
- Treat both occurrences as equal examples of the same position rather than implying that one is the "real" shape and the other an alternative.
- More generally, a position/pattern may have multiple complete occurrences on a sufficiently long fretboard.

### Theory annotation and user emphasis

- Default scale presentation should remain relatively neutral. Do **not** automatically color/label root, 3rd, 5th, blue note, etc. merely because the Toolkit knows their roles.
- A user-controlled option such as **Show Intervals** (final label TBD) can reveal semantic theory information when wanted.
- Initial semantic color vocabulary:
  - **Root (R): Green**
  - **3rd: Dark Gray**
  - **5th: Light Gray**
  - **Blue note (Bn): Blue**
- These semantic colors should mean the same thing throughout Theory Toolkit wherever they are used.
- Manual emphasis is separate from semantic coloring. A user should be able to click/tap a displayed note to emphasize that note wherever appropriate.
- Manual emphasis should use a consistent **halo/ring treatment** that does not replace or obscure the note's semantic color.
- Keep three layers conceptually separate:
  1. **Content** — which notes are displayed
  2. **Theory annotation** — what those notes mean, optionally shown
  3. **User emphasis** — what the user deliberately wants attention drawn to
- Color should not be the only visual signal where meaning matters; semantic colors/selection states should have suitable non-color cues as the UI matures.

## Responsive / mobile design

- Phone, tablet and desktop use should be treated as normal use cases, not an afterthought.
- A student using a phone on a music stand is a plausible real-world scenario.
- The current prototype already works reasonably on at least one large Android phone in portrait and landscape, but that is only an early sanity check, not proof that responsive design is solved.

## Design/testing philosophy

- Current HTML test pages are behavior prototypes, not visual proposals.
- Do not preserve spreadsheet limitations simply because v0.1 used them.
- Test interactions by asking whether the result matches what a user predicted before clicking.
- When a change does not produce the expected result, check assumptions/naming/data early rather than repeatedly layering fixes onto an unverified assumption.
- **For musically defined shapes/patterns, stop patching code when the pattern definition itself is uncertain. Define and verify the musical model first, then implement it.**
- Outside feedback is useful from both musicians and non-musicians.
- Visual mockups can inform the eventual interface without needing to contain working code.
- No design note in this file is final. Implementation and user testing may reveal a better answer.
