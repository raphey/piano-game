# Piano Game — Note Reading Feature Plan

## Overview

Add a new top-level category called **"Note Reading"** that displays
written notes on a musical staff. The player reads the notes and plays
them on the piano. Always four quarter notes. Pitch detection is
octave-independent (the matching engine already does octave
normalization).

---

## Note Range

```
Full range (final level): F3 to G4
  F3  G3  A3  B3  C4  D4  E4  F4  G4
```

Staff positions (semitone-independent, white keys only):
- Treble clef: E4 sits on line 1, F4 in space 1, G4 on line 2
- Middle C (C4): one ledger line below treble / above bass
- Bass clef: A3 in space 4 (top), G3 on line 4, F3 in space 3

---

## 8 Levels

All levels: 4 quarter notes, drawn on staff, no audio reference
playback. Patterns generated randomly from the note pool each round.

| # | Clef    | Notes            | Description                  |
|---|---------|------------------|------------------------------|
| 1 | Treble  | C4, D4           | Middle C + D, ledger line    |
| 2 | Treble  | C4, D4, E4       | Add first line note          |
| 3 | Bass    | B3, C4           | B below middle C + middle C  |
| 4 | Bass    | A3, B3, C4       | Extend down to A             |
| 5 | Grand   | B3, C4, D4       | Bridge the two clefs         |
| 6 | Grand   | A3, B3, C4, D4, E4 | Wider range               |
| 7 | Grand   | G3–F4            | G3 A3 B3 C4 D4 E4 F4        |
| 8 | Grand   | F3–G4            | Full range, all 9 notes      |

---

## Visual Display (Staff Rendering)

Render an inline SVG for the musical staff. Approach: hand-drawn SVG
elements (no external library needed for this level of complexity).

Components:
- **Staff lines**: 5 lines per clef, standard spacing
- **Clef symbols**: treble (𝄞) and bass (𝄢) glyphs or SVG paths
- **Brace**: curly brace connecting grand staff systems
- **Ledger lines**: for notes above/below staff (e.g. middle C)
- **Note heads**: filled oval + stem for quarter notes
- **Note spacing**: 4 notes evenly distributed horizontally

Staff modes:
- **Treble only** (levels 1-2): single 5-line staff with treble clef
- **Bass only** (levels 3-4): single 5-line staff with bass clef
- **Grand staff** (levels 5-8): treble + bass with brace

---

## Game Flow

Same as finger-numbers: skip `Audio.playPattern()` reference playback.
Flow: display staff → countdown → record → analyze.

Matching uses the existing octave-independent pitch comparison
(`calculateError` already octave-normalizes via
`Math.round(Math.log2(refFreq / recFreq))`).

---

## Phase 1: Staff Rendering
- [ ] Create `staff-renderer.js` with SVG generation for grand staff
- [ ] Render treble clef, bass clef, and grand staff modes
- [ ] Draw quarter notes at correct vertical positions for F3–G4
- [ ] Handle ledger lines (middle C in both clef contexts)
- [ ] Style to match existing game aesthetic
- [ ] Test rendering in browser at game viewport sizes

## Phase 2: Category + Pattern Generation
- [ ] Add `note-reading` category to `instrument-config.js`
- [ ] Add `generateNoteReading()` to `patterns.js`
- [ ] Add category button to `index.html`
- [ ] Wire up level screen in `ui.js` (8 levels)
- [ ] Skip audio reference for `note-reading` in `game.js`

## Phase 3: Staff Display Integration
- [ ] In `UI.updatePattern()`, detect note-reading and render SVG staff
- [ ] Pass pattern to staff renderer to draw the 4 notes
- [ ] Ensure staff clears properly between questions
- [ ] Add instructions text for the category

## Phase 4: Polish + Testing
- [ ] Add victory pattern for `note-reading`
- [ ] Add completion tracking support
- [ ] Test all 8 levels in browser
- [ ] Verify octave-independent pitch matching works correctly
- [ ] Adjust staff sizing for mobile/small screens
