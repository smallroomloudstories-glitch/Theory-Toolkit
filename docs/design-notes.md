# Theory Toolkit — Evolving Design Notes

> **Status:** Working ideas, not requirements carved in stone.
>
> This document records design ideas and principles that come up during development so they are not lost. Any item here may be changed, discarded, or revisited when implementation begins or testing suggests a better answer.

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
- Some deeper explanations may live in an FAQ or optional "deep water" path so beginning students are not forced through theoretical nuance they do not yet need.

## Shared instrument context

- Instrument-facing Explorers should share instrument, tuning, and handedness context.
- Standard instrument choices can default to standard tuning; alternate presets and custom per-string tuning should be supported eventually.
- Presets should populate data rather than requiring tuning-specific fretboard logic.
- Number of strings should ultimately come from instrument/tuning data rather than being hard-coded to six.
- **Handedness — Right / Left** should eventually mirror relevant views appropriately.

## Shared key/root selector

- Wherever the Toolkit asks for a chromatic key/root, prefer a **circular wheel-style selector** rather than an ordinary finite dropdown list.
- Reopening the selector should keep the current key/root anchored at the selection point rather than jumping to the beginning of a list.
- The surrounding chromatic notes should remain visible around the selected note; with twelve pitch classes, the control can potentially show the entire chromatic neighborhood at once.
- Mouse-wheel/trackpad scrolling should move notes through the anchored selection point; users should also be able to point to/click a visible note directly. Touch and keyboard interaction will need equivalent behavior.
- The selector should wrap continuously through the chromatic scale: there is no conceptual top or bottom.
- This is both a stylistic interaction choice and a subtle visual reinforcement of chromatic adjacency (including B–C and E–F).
- Enharmonic spelling/context can be layered onto this control later without changing the circular interaction model.

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
- A strong candidate for the guitar reference is the actual **4½ Inch STUDio guitar**: photograph it square-on with even lighting, then derive a clean illustration used as a static UI asset rather than regenerating an image dynamically.
- The final UI will probably show little or none of the body, but if a sliver of body is useful, allowing at least one visible guest-signature mark gives the instrument some STUDio identity. If a real signature cannot honestly be positioned in the visible crop, use a fictionalized decorative signature rather than relocating a real guest's signature.
- The instrument exists primarily for physical/contextual grounding and should visually recede behind theory information.
- Fret spacing should resemble a real instrument: wider near the nut and progressively narrower farther down the neck.
- The nut should be visually obvious; a small portion of headstock/tuners may remain visible for orientation.
- Left-handed presentation should be intentionally supported.
- Do not treat fret 12 as a hard endpoint. Approximately **15 frets may be a useful starting range**, but the visible fretboard length is not settled and should be allowed to grow when complete shapes/patterns require it. The underlying model should remain flexible.

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
- A future CAGED teaching view should also demonstrate that **chords and chord-tone targeting are available from/around each scale position** (or close enough to the position to be pedagogically useful). This belongs with the CAGED/position relationship rather than as an isolated Chord Explorer feature: the goal is to let a student see the chord form embedded in the same fretboard geography used for the scale, then target chord tones while playing through that position.

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
- Current beginning-student Scale Views are **Diatonic, Pentatonic, and Blues**. These are ample for the first useful version; additional scales can be added later only when they earn their place pedagogically rather than merely because they exist.
- This separation is pedagogically useful: switching views can reveal exactly what changes while keeping the same root/scale context.
- Modes may eventually be available as an optional Major-scale examination rather than turning Scale Explorer into an encyclopedia of modal scale choices. The seven Major-scale modes are sufficient to teach the transferable concept.
- Preserve both **Relative** and **Parallel** mode perspectives from v0.1. They need not necessarily use two full fretboards; a comparison panel plus one active fretboard may be cleaner, with a dedicated two-fretboard comparison considered later if useful.

### Scale positions / five-shape model

- Position view uses a **five-position / five-shape model** across the fretboard rather than merely an E-string/A-string selector.
- The Toolkit deliberately adopts one coherent five-shape convention while acknowledging that other teachers/systems may number, divide, or label fretboard positions differently. The labels are an organizational convention, not a claim that these are the only legitimate scale shapes.
- The current convention follows the BK/Zombie Guitar school of thought used by the project: **Shape 1 is the E-shape scale position**, with Shapes 2–5 following sequentially around the fretboard. If an authoritative source within that same framework suggests a correction, consider the reasoning and revise if appropriate.
- A position may also carry useful aliases such as its CAGED relationship and whether it is E-rooted or A-rooted. These are descriptions of the same pattern, not separate systems.
- There are multiple E-rooted/A-rooted positions, so root string alone is not sufficient to uniquely identify a position.
- Long term, CAGED chord forms and scale positions should be able to share the same fretboard geography so students can see how chord shapes sit inside/alongside scale positions.
- **Position identifies an explicit string-by-string fingering/pattern, not a rectangular fret range.** Neighboring shapes overlap, and those overlaps are not necessarily regular across all six strings.
- A mathematically correct scale note that happens to lie inside or near a broad fret range is not automatically part of the intended shape.
- Shape definitions should therefore be captured as explicit per-string fret relationships/geometry and verified musically before encoding.
- The reference-definition method that worked well was to use one key (G), allow an effectively unlimited fretboard while defining the patterns, and record the natural fret numbers wherever each complete shape actually falls. Display wrapping is a separate software responsibility.

### Verified diatonic geometry — Test 3

- **Test 3 diatonic position behavior is now considered validated.** G Major and G Minor Shapes 1–5 were visually verified against instructor-supplied references, then the transposition behavior was spot-checked in multiple other keys and by walking one shape chromatically through the keys.
- The earlier broad-window implementation failed because diatonic shapes have irregular overlaps/edges. Replacing it with explicit string-by-string geometry solved the missing/extra-note problems.
- Major and Minor Diatonic use the **same five underlying physical geometries with rotated Shape labels**. In the current convention: **Major Shape 5 = Minor Shape 1; Major Shape 1 = Minor Shape 2; Major Shape 2 = Minor Shape 3; Major Shape 3 = Minor Shape 4; Major Shape 4 = Minor Shape 5.**
- This relationship was not assumed in advance; Major and Minor were independently defined/verified first, then the rotation was observed in the verified data.
- One useful correction discovered during verification: the supplied G Minor Shape 5 reference included an unnecessary low-E-string b6 extension. For the Toolkit's Shape 5 geometry, the low E begins at the b7 (G minor: fret 13), matching the corresponding Major Shape 4 physical geometry.
- General lesson: **a note can belong to the scale without belonging to the selected position.**

### Verified pentatonic geometry — Test 3

- **Major and Minor Pentatonic Shapes 1–5 are now implemented and visually validated in Test 3**, using the same explicit-geometry approach as Diatonic.
- Pentatonic Major/Minor also share **five underlying physical geometries with the same rotated Shape-label relationship**: Major 5 = Minor 1, Major 1 = Minor 2, and so on.
- Pentatonic shape boundaries are visually cleaner than Diatonic: the edge where one shape ends generally becomes the edge where the next begins. Do not use that cleanliness to reintroduce fret-window logic; retain explicit geometry so both Diatonic and Pentatonic use the same reliable model.
- Current architectural takeaway: there are effectively **five canonical Diatonic geometries and five canonical Pentatonic geometries**, with Major/Minor context determining the Shape 1–5 labels/placement rather than twenty independently maintained shape definitions.

### Verified Blues geometry — Test 4

- **Major and Minor Blues Shapes 1–5 are implemented and visually validated in Test 4.**
- Blues follows the same broad Major/Minor rotation relationship observed in Diatonic and Pentatonic: the five physical shape families recur, while Major and Minor assign different Shape numbers/root relationships.
- The Blues scale must include every occurrence of the blue note that belongs to the selected explicit shape; do not add only one representative blue note per box. Verification of the G reference caught missing blue-note occurrences and confirmed the complete string-by-string geometry before implementation.
- The current beginning-student Scale Explorer scope is therefore validated across **Major/Minor Diatonic, Pentatonic, and Blues**, Shapes 1–5.

### Open-position and octave-equivalent shapes

- If a **complete** scale position can be represented naturally at the nut using open strings, show that open-position occurrence.
- Do not show a mutilated/incomplete open version merely because part of a shape fits before the nut; if the complete shape cannot exist there, show the first complete playable occurrence farther up the neck.
- If the same complete position can be shown both open and at its octave-equivalent fretted location within the displayed neck, **show both**.
- Treat both occurrences as equal examples of the same position rather than implying that one is the "real" shape and the other an alternative.
- More generally, a position/pattern may have multiple complete occurrences on a sufficiently long fretboard.

### Theory annotation and user emphasis — Test 5

- **Test 5 introduces a user-selectable Notes vs. Intervals/Degrees presentation** for the same verified scale geometry. Notes answers "what notes am I playing?"; Intervals/Degrees answers "what role does each note have relative to the root/reference framework?"
- Switching Notes ↔ Intervals should not move the fretboard vertically. Keep legends/context below the fretboard (or otherwise reserve stable space) so the user can visually compare the same geometry without layout shift.
- Default scale presentation should remain relatively neutral. Do **not** automatically color/label root, 3rd, 5th, blue note, etc. merely because the Toolkit knows their roles; theory annotation is user-controlled.
- Initial semantic color vocabulary remains provisional:
  - **Root (R): Green**
  - **3rd: Dark Gray**
  - **5th: Light Gray**
  - **Blue note (Bn): Blue**
- Green Root and Blue Note have strong semantic value. Dark Gray/Light Gray for 3rd/5th proved less visually convincing in the temporary table prototype and should be reconsidered against the eventual illustrated fretboard rather than treated as settled UI.
- Preserve the current verified shape behavior when switching Major ↔ Minor: **Shape number remains the selected organizational position, and the displayed geometry changes to the corresponding Major or Minor shape.** This lets the user directly compare, for example, G Major Pentatonic Shape 1 with G Minor Pentatonic Shape 1 rooted in the same key context. A temporary A/B prototype that instead held physical geometry fixed and changed the Shape selector was tested and rejected.

### Major / minor shape comparison — Test 6 candidate

- Add a dedicated comparison view that shows **Major and Minor position geometry simultaneously**, rather than requiring the user to toggle back and forth mentally.
- Keep this comparison **position-focused**, not whole-fretboard-focused. The teaching goal is to isolate a small section/shape and make the differences visually obvious.
- The comparison does **not need to be tied to a particular key or absolute fret number**. It can compare the relative geometry of Major vs. Minor for a selected Shape/Position; key/fret location is irrelevant to that conceptual task.
- Use **interval labels** as the primary comparison language rather than note names. This exposes exactly what changes between Major and Minor without introducing arbitrary pitch names.
- Side-by-side compact fretboard windows are the leading desktop presentation. Stacked views may prove clearer and are naturally suitable for narrow/mobile layouts. An overlay could eventually distinguish Major-only, Minor-only, and shared notes, but is a later experiment after the simpler comparison is validated.
- Avoid arbitrary absolute fret numbers in a keyless comparison; use relative geometry/positioning or another neutral presentation.
- This comparison also provides a gentle conceptual bridge into **parallel modes**: keep the tonic/root concept fixed and compare changing interval structures.

### Interval terminology / Major reference framework

- Distinguish **scale degree** from the conventional comparative interval label. Within a natural minor scale, its third degree is still its third degree; calling it **♭3** describes its interval/reference relationship rather than making it somehow "less thirdy."
- Beginner-facing explanation worth preserving: **"The ♭3 is still the third — it isn't less thirdy."** Then explain that it lies one half-step below the 3 in the Major/Ionian reference framework.
- For displays such as Shape Compare, notation like **♭3, ♭6, ♭7, ♯4** is intentionally comparative. The underlying reference is the key/tonic, expressed through the conventional Major/Ionian framework.
- Keep the normal UI explanation simple. Do not force a beginning student to untangle the philosophical distinction between degree names and interval labels before they can use the tool.
- Add an eventual FAQ/deep-water explanation along the lines of:
  - **FAQ: When we say ♭3 or ♯4, what does that mean?**
  - Short answer: it describes an interval relationship to the key's tonic using Major/Ionian as the reference framework.
  - Offer an optional more detailed explanation with a playful warning such as **"WARNING: You cannot unsee what you're about to see!"**
- Natural minor/Aeolian is a useful bridge into Modes: a student can first understand Major vs. minor as a fixed-root interval comparison, then later learn that natural minor is Aeolian and extend the same parallel comparison idea to all seven Major-scale modes.

### Modes direction

- Scale Explorer may expose Modes only in the **Major/Diatonic context** for the beginning-student scope; that is ample information to explain the concept and let the learner generalize further independently.
- Preserve both **Relative** and **Parallel** views as in v0.1, ideally visible together conceptually even if they do not require two simultaneous full fretboards.
- Relative modes demonstrate **same parent-scale notes, different tonal center/root**. The fretboard note set can remain unchanged while the root/interval interpretation moves.
- Parallel modes demonstrate **same tonic/root, different interval structures**. This is the natural extension of the Major/minor comparison introduced earlier.
- Teaching sequence candidate: **Major vs. minor comparison → Relative modes (same notes, different root) → Parallel modes (same root, different intervals).**

### Future motion / animation idea

- The verified transposition model makes a playful but potentially instructive animation possible: keep one selected shape constant and **march it chromatically up or down the fretboard one semitone at a time**.
- This is a future delight/visualization feature, not a current priority. Its educational value is that the user can see that the physical geometry remains the same while the key/root changes.

## Responsive / mobile design

- Phone, tablet and desktop use should be treated as normal use cases, not an afterthought.
- A student using a phone on a music stand is a plausible real-world scenario.
- The current prototype already works reasonably on at least one large Android phone in portrait and landscape, but that is only an early sanity check, not proof that responsive design is solved.

## Tester builds and feedback

- Tester-facing pages should use **Build** terminology rather than internal **Test** terminology. Internal experiments may still be called tests; outside testers should see stable Build names/numbers.
- Tester links must point only to the last explicitly approved/passed build. Work-in-progress changes must not be linked from the tester index merely because development has advanced.
- **An unlisted development page on the normal GitHub Pages deployment is sufficient for current pre-release testing.** It may contain newer work and be accessed by direct URL while the tester index continues to advertise only the last passed Build. This is not a security boundary and does not need to be one; its purpose is simply to prevent ordinary testers from accidentally entering unfinished work. A separate Cloudflare preview site was considered and rejected as unnecessary infrastructure for the current need.
- Promotion is deliberate: when a build is declared passed, publish that approved state and update the tester-facing link name, Build number, and description together so labels never become stale or misleading.
- The tester index should explain that builds are functional prototypes rather than finished UI and ask for feedback on: **what worked, what didn't, what was expected instead, and what the tester would like added.**
- Provide a noticeable but unobtrusive **Send Feedback** control on the tester index and each tester-facing Explorer/build page.

### Feedback system — implemented and end-to-end validated

- The secure feedback plumbing is now implemented using a **Cloudflare Worker** as the server-side endpoint and a **private GitHub feedback repository** as the storage/review queue. Testers do not need GitHub accounts.
- The GitHub credential is stored only as an **encrypted Cloudflare Worker secret** (`GITHUB_TOKEN`). It is referenced by name in Worker code and is never embedded in browser/client code. The temporary plaintext copy used during setup was deleted after the connection was proven.
- The Worker accepts deliberate **POST** submissions rather than creating feedback from ordinary page visits/refreshes. Browser submissions are restricted to the approved Theory Toolkit GitHub Pages origin; an unauthorized Cloudflare Preview request was explicitly tested and correctly returned **403 Forbidden** without creating feedback.
- The endpoint validates JSON input, requires feedback text, applies length limits, performs basic optional-email validation, and returns generic visitor-facing errors rather than exposing GitHub/backend responses.
- Do not deliberately collect/store IP address, user-agent, operating system, screen size, referring site, cookies, or activity outside Theory Toolkit. Stored diagnostic context should be limited to Toolkit state deliberately supplied by the page.
- The first Scale Explorer implementation automatically records **Explorer/page, Build number, and current Toolkit selections**. For Scale Explorer this currently includes root/key, Major/Minor, Scale View, Fretboard/Position display, selected Shape when applicable, and Notes vs. Intervals/Degrees.
- User-entered fields are intentionally lightweight: **feedback first**, optional "What did you expect instead?", optional name, and optional email for follow-up. Avoid forcing testers through administrative dropdowns before they can type their comment.
- **UX requirement: opening Send Feedback must immediately place keyboard focus in the main feedback typing area.** This was explicitly tested in the live unlisted Scale Explorer page and passed.
- Keep the form inline as part of the page rather than using a popup/new window. Popups are easier to block and unnecessarily interrupt the tester's context.
- Privacy wording should communicate that feedback/contact information is used only for improving/following up on Theory Toolkit feedback and **will not be sold or used for any other purpose.**
- The first real end-to-end submission was successfully validated: browser → Cloudflare Worker → private GitHub issue, including Build/page/selections and optional contact data.
- **Before tester release:** replace the browser-ish/default typing-area typography with a comfortable proportional font. Apply the eventual Toolkit typography consistently to textareas and other form controls; the writing area should feel comfortable for prose, not like a code/data-entry box. Then perform one final submission test before propagating the proven component to the tester index and other live test pages.
- Heavy anti-spam/rate-limit infrastructure is intentionally deferred unless actual abuse makes it necessary. Input restrictions and origin/method controls are appropriate now; do not overengineer for a spam problem that does not yet exist.
- Email may remain available as a secondary fallback, but the web form should be the encouraged feedback path.

## Design/testing philosophy

- Current HTML test pages are behavior prototypes, not visual proposals.
- Do not preserve spreadsheet limitations simply because v0.1 used them.
- Test interactions by asking whether the result matches what a user predicted before clicking.
- When a change does not produce the expected result, check assumptions/naming/data early rather than repeatedly layering fixes onto an unverified assumption.
- **For musically defined shapes/patterns, stop patching code when the pattern definition itself is uncertain. Define and verify the musical model first, then implement it.**
- Scale Explorer work reinforced a useful workflow: define the musical truth from an authoritative/verified visual reference; transcribe it into plain string/fret data; verify the transcription; only then encode it and test transposition.
- A/B behavior prototypes are useful when a UI idea sounds right in discussion but is hard to evaluate abstractly. Build the reversible comparison, test it, and remove it if the original behavior proves clearer.
- Outside feedback is useful from both musicians and non-musicians.
- Visual mockups can inform the eventual interface without needing to contain working code.
- **Use a recurring sanity check against overengineering.** When a new idea starts attracting infrastructure or complexity, restate the actual requirement and ask whether a simpler existing mechanism satisfies it. Prefer the simpler path when it meets the real need and does not create a foreseeable architectural trap. Today's example: an unlisted page on the existing deployment solved pre-release browser testing without requiring a second Cloudflare Pages site.
- No design note in this file is final. Implementation and user testing may reveal a better answer.