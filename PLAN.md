# Piano Game — Finger Numbers Feature Plan

## Overview

Add a new top-level category called **"Finger Numbers"** and remove Song of the Wind entirely. Unlike other categories, Finger Numbers shows a **visual finger grid** instead of playing an audio reference — the student reads which fingers to play, then plays them after the countdown.

---

## Note Mappings

```
Right hand (thumb = finger 1 on middle C, ascending white notes):
  RH 1 = C4,  RH 2 = D4,  RH 3 = E4,  RH 4 = F4,  RH 5 = G4

Left hand (thumb = finger 1 on G below middle C, descending white notes):
  LH 1 = G3,  LH 2 = F3,  LH 3 = E3,  LH 4 = D3,  LH 5 = C3
```

Standing instruction (shown during all Finger Numbers levels):
> "Position your right thumb on middle C, left thumb on G below middle C, one finger per white note. Play four quarter notes."

---

## 8 Levels

All levels use 4 quarter notes (durations = [1, 1, 1, 1]).

| Level | Hand | Distinct pitches | Notes |
|-------|------|-----------------|-------|
| 1 | RH only | 1 (repeated) | Pick one finger 1–5; play it 4 times |
| 2 | LH only | 1 (repeated) | Pick one finger 1–5; play it 4 times |
| 3 | RH only | exactly 2 | Pick 2 distinct fingers; fill 4 beats with both |
| 4 | LH only | exactly 2 | Pick 2 distinct fingers; fill 4 beats with both |
| 5 | RH only | 2–4 | Pick 2–4 distinct fingers; fill 4 beats randomly |
| 6 | LH only | 2–4 | Pick 2–4 distinct fingers; fill 4 beats randomly |
| 7 | LH + RH | 2 total (1 per hand) | Pick one RH finger + one LH finger; alternate R L R L (or L R L R) |
| 8 | LH + RH | up to 4 | Each beat independently random: either RH or LH, finger 1–5 |

---

## Visual Display (Finger Grid)

Replace the standard note-name display with a 2-row grid. Always shown regardless of "Show Note Names" setting.

```
Right |  2  |     |  2  |     |
Left  |     |  3  |     |  3  |
```

- First column: right-justified row header ("Right" / "Left")
- 4 beat columns follow
- Cell shows finger number if that hand plays that beat; otherwise empty
- Each beat belongs to exactly one hand (no simultaneous notes)

Examples:

Level 1 (RH finger 3, repeated):
```
Right |  3  |  3  |  3  |  3  |
Left  |     |     |     |     |
```

Level 7 (RH 2, LH 3, alternating):
```
Right |  2  |     |  2  |     |
Left  |     |  3  |     |  3  |
```

Level 8 (random mix):
```
Right |  2  |     |  4  |  1  |
Left  |     |  3  |     |     |
```

---

## Game Flow Change

For Finger Numbers, **skip `Audio.playPattern()`**. The flow becomes:

1. Show finger grid (student reads the prompt)
2. `Audio.playCountdown()` — unchanged
3. Record student playing
4. Analyze with `Matching.generateReferenceTimeSeries` / `Matching.calculateError` — unchanged

---

## Implementation Steps

### 1. `index.html`
- Remove the `<button>` for `data-category="wind"` entirely
- Add `<button class="menu-btn" data-category="finger-numbers">Finger Numbers</button>`

### 2. `instrument-config.js`
- Remove the entire `"wind"` block from `patterns`, `instructions`, and `victoryPatterns`
- Add to `instructions`:
  ```js
  'finger-numbers': "Position your right thumb on middle C, left thumb on G below middle C, one finger per white note. Play four quarter notes."
  ```
- Add to `victoryPatterns`:
  ```js
  'finger-numbers': victoryPatterns['default']
  ```
- **Do not** add static patterns for finger-numbers — they are generated dynamically

### 3. `patterns.js`
Add a `generateFingerNumbers(level)` function and call it from `Patterns.generate()` when category is `'finger-numbers'`.

**Helper:**
```js
function fingerToNote(hand, finger) {
  const RH = { 1:'C4', 2:'D4', 3:'E4', 4:'F4', 5:'G4' };
  const LH = { 1:'G3', 2:'F3', 3:'E3', 4:'D3', 5:'C3' };
  return hand === 'R' ? RH[finger] : LH[finger];
}
```

**Return format** (extends existing pattern format):
```js
{
  notes: ['C4', 'G3', 'D4', 'F3'],  // actual pitches — used by Matching unchanged
  durations: [1, 1, 1, 1],
  beats: [                            // new field — used for display only
    { hand: 'R', finger: 2 },
    { hand: 'L', finger: 3 },
    { hand: 'R', finger: 2 },
    { hand: 'L', finger: 3 }
  ]
}
```

**Level generation logic:**
- **L1**: one random finger 1–5; all 4 beats `{hand:'R', finger}`
- **L2**: one random finger 1–5; all 4 beats `{hand:'L', finger}`
- **L3**: pick 2 distinct fingers from 1–5; shuffle across 4 beats (each used ≥1 time); hand='R'
- **L4**: same as L3 but hand='L'
- **L5**: pick 2–4 distinct fingers from 1–5; fill 4 beats randomly from that pool; hand='R'
- **L6**: same as L5 but hand='L'
- **L7**: pick one RH finger and one LH finger; alternate R L R L (50% chance) or L R L R
- **L8**: each of 4 beats: random hand (R or L), random finger 1–5

### 4. `game.js`
In `playAndRecord()`, skip audio reference for this category:
```js
// Step 2: Play reference pattern (skip for finger-numbers)
if (this.category !== 'finger-numbers') {
    UI.showStatus('Listen...');
    await Audio.playPattern(this.currentPattern);
}
```

### 5. `ui.js`

**`updatePattern(pattern)`** — detect finger-numbers by presence of `pattern.beats`:
```js
if (pattern.beats) {
    this.showFingerGrid(pattern.beats);
} else {
    // existing note-name logic
}
```

**Add `showFingerGrid(beats)`:**
- Build an HTML table with 2 rows × 5 columns (header + 4 beats)
- Row 1 header: "Right", cells show RH finger numbers
- Row 2 header: "Left", cells show LH finger numbers
- Replace the contents of `#pattern-display`
- Always visible (not gated by showNotes setting)

**`showLevelScreen()`** — handle finger-numbers category:
- The existing logic checks `categoryPatterns[levelKey].length > 0` (static arrays)
- For `'finger-numbers'`, bypass this check and directly create 8 level buttons

### 6. `styles.css`
Add styles for the finger grid:
```css
.finger-grid { ... }            /* table wrapper */
.finger-grid-header { ... }     /* "Right" / "Left" labels, right-justified */
.finger-grid-cell { ... }       /* each beat cell: square, large font */
.finger-grid-cell.filled { ... } /* cells with a finger number */
.finger-grid-cell.empty { ... }  /* empty cells (subtle/light) */
```
Should be large and readable on iPad.

---

## Data Flow Summary

```
Patterns.generate('finger-numbers', level)
  → generateFingerNumbers(level)
  → { notes, durations, beats }

game.js nextQuestion():
  currentPattern = Patterns.generate(...)
  UI.updatePattern(currentPattern)   // renders finger grid
  referenceTimeSeries = Matching.generateReferenceTimeSeries(currentPattern)
  // uses pattern.notes + pattern.durations — no change to Matching

game.js playAndRecord():
  Recording.startRecording()
  // SKIP Audio.playPattern() for finger-numbers
  goClickTime = Audio.playCountdown()
  // record, stop, analyze — all unchanged
```

---

## Files Changed

| File | Change |
|------|--------|
| `index.html` | Remove wind button; add finger-numbers button |
| `instrument-config.js` | Remove wind; add finger-numbers instruction + victory pattern |
| `patterns.js` | Add `generateFingerNumbers(level)` + `fingerToNote()` helper |
| `game.js` | Skip `Audio.playPattern()` for finger-numbers |
| `ui.js` | Add `showFingerGrid()`; handle finger-numbers in level screen |
| `styles.css` | Add `.finger-grid` styles |
