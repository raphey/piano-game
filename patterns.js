// Pattern Generation
// Loads patterns from InstrumentConfig and provides random selection
const Patterns = {
    allPatterns: null,

    // Load patterns from InstrumentConfig
    init: async function() {
        // Load patterns from instrument configuration
        this.allPatterns = InstrumentConfig.patterns;
        console.log('Patterns loaded from InstrumentConfig:', this.allPatterns);
    },

    // Generate (select) a random pattern for the given category and level
    // Selection with replacement (can pick same pattern multiple times)
    generate: function(category, level) {
        if (category === 'finger-numbers') {
            return this.generateFingerNumbers(level);
        }

        if (!this.allPatterns) {
            console.error('Patterns not loaded yet');
            return { notes: ['A4', 'A4'], durations: [2, 2] };
        }

        const levelKey = `level${level}`;
        const categoryPatterns = this.allPatterns[category];

        if (!categoryPatterns || !categoryPatterns[levelKey]) {
            console.error(`No patterns found for ${category} ${levelKey}`);
            return { notes: ['A4', 'A4'], durations: [2, 2] };
        }

        const levelPatterns = categoryPatterns[levelKey];

        if (levelPatterns.length === 0) {
            console.error(`Empty pattern list for ${category} ${levelKey}`);
            return { notes: ['A4', 'A4'], durations: [2, 2] };
        }

        // Random selection with replacement
        const randomIndex = Math.floor(Math.random() * levelPatterns.length);
        const selected = levelPatterns[randomIndex];

        console.log(`Selected pattern for ${category} ${levelKey}:`, selected);
        return selected;
    },

    // Convert hand + finger number to a note string
    fingerToNote: function(hand, finger) {
        const RH = { 1: 'C4', 2: 'D4', 3: 'E4', 4: 'F4', 5: 'G4' };
        const LH = { 1: 'G3', 2: 'F3', 3: 'E3', 4: 'D3', 5: 'C3' };
        return hand === 'R' ? RH[finger] : LH[finger];
    },

    // Shuffle array in place (Fisher-Yates)
    shuffle: function(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    },

    // Pick n distinct items from array
    pickDistinct: function(arr, n) {
        return this.shuffle([...arr]).slice(0, n);
    },

    // Fill 4 beats from a pool of fingers, ensuring each finger used at least once
    fillBeatsFromPool: function(hand, fingers) {
        // Start with one of each, then fill remaining randomly
        const beats = fingers.map(f => ({ hand, finger: f }));
        while (beats.length < 4) {
            beats.push({ hand, finger: fingers[Math.floor(Math.random() * fingers.length)] });
        }
        return this.shuffle(beats.slice(0, 4));
    },

    // Generate a finger-numbers pattern for the given level
    generateFingerNumbers: function(level) {
        const fingers = [1, 2, 3, 4, 5];
        let beats;

        if (level === 1) {
            // RH only, one repeated finger
            const f = fingers[Math.floor(Math.random() * 5)];
            beats = [1, 2, 3, 4].map(() => ({ hand: 'R', finger: f }));

        } else if (level === 2) {
            // LH only, one repeated finger
            const f = fingers[Math.floor(Math.random() * 5)];
            beats = [1, 2, 3, 4].map(() => ({ hand: 'L', finger: f }));

        } else if (level === 3) {
            // RH only, exactly 2 distinct fingers
            const pool = this.pickDistinct(fingers, 2);
            beats = this.fillBeatsFromPool('R', pool);

        } else if (level === 4) {
            // LH only, exactly 2 distinct fingers
            const pool = this.pickDistinct(fingers, 2);
            beats = this.fillBeatsFromPool('L', pool);

        } else if (level === 5) {
            // RH only, 2–4 distinct fingers
            const count = 2 + Math.floor(Math.random() * 3); // 2, 3, or 4
            const pool = this.pickDistinct(fingers, count);
            beats = this.fillBeatsFromPool('R', pool);

        } else if (level === 6) {
            // LH only, 2–4 distinct fingers
            const count = 2 + Math.floor(Math.random() * 3);
            const pool = this.pickDistinct(fingers, count);
            beats = this.fillBeatsFromPool('L', pool);

        } else if (level === 7) {
            // Mixed: one RH finger + one LH finger, alternating
            const rf = fingers[Math.floor(Math.random() * 5)];
            const lf = fingers[Math.floor(Math.random() * 5)];
            const startR = Math.random() < 0.5;
            beats = [0, 1, 2, 3].map(i => {
                const isR = startR ? (i % 2 === 0) : (i % 2 === 1);
                return isR ? { hand: 'R', finger: rf } : { hand: 'L', finger: lf };
            });

        } else {
            // Level 8: each beat independently random hand + finger
            beats = [0, 1, 2, 3].map(() => ({
                hand: Math.random() < 0.5 ? 'R' : 'L',
                finger: 1 + Math.floor(Math.random() * 5)
            }));
        }

        const notes = beats.map(b => this.fingerToNote(b.hand, b.finger));
        const pattern = { notes, durations: [1, 1, 1, 1], beats };
        console.log(`Generated finger-numbers level ${level}:`, pattern);
        return pattern;
    }
};

// Load patterns when the page loads
window.addEventListener('DOMContentLoaded', async () => {
    await Patterns.init();
});
