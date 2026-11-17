// Staff Renderer
// Uses VexFlow 4 to render musical notation for the
// note-reading category.

const StaffRenderer = {

    // Determine which clef a note belongs to in grand
    // staff context. B3 and below go to bass.
    noteClef: function(note) {
        const bassNotes = ['F3', 'G3', 'A3', 'B3'];
        return bassNotes.includes(note) ? 'bass' : 'treble';
    },

    // Convert note name to VexFlow key format.
    // 'C4' -> 'c/4'
    noteToKey: function(note) {
        const match = note.match(/^([A-G])(\d)$/);
        return `${match[1].toLowerCase()}/${match[2]}`;
    },

    // Render notation into a target DOM element.
    render: function(pattern, staffMode, element) {
        element.innerHTML = '';

        const VF = Vex.Flow;
        const renderer = new VF.Renderer(
            element, VF.Renderer.Backends.SVG
        );

        if (staffMode === 'grand') {
            this.renderGrandStaff(
                pattern, renderer, VF
            );
        } else {
            this.renderSingleStaff(
                pattern, staffMode, renderer, VF
            );
        }
    },

    renderSingleStaff: function(
        pattern, staffMode, renderer, VF
    ) {
        const clef = staffMode === 'bass'
            ? 'bass' : 'treble';
        const staveWidth = 280;
        const width = staveWidth + 20;

        renderer.resize(width, 150);
        const context = renderer.getContext();

        const stave = new VF.Stave(
            10, 20, staveWidth
        );
        stave.addClef(clef);
        stave.setContext(context).draw();
        stave.setNoteStartX(
            stave.getNoteStartX() + 20
        );

        const notes = pattern.notes.map(n =>
            new VF.StaveNote({
                clef: clef,
                keys: [this.noteToKey(n)],
                duration: 'q',
                auto_stem: true
            })
        );

        const voice = new VF.Voice({
            num_beats: pattern.notes.length,
            beat_value: 4
        });
        voice.addTickables(notes);

        new VF.Formatter()
            .joinVoices([voice])
            .format([voice], staveWidth - 70);

        voice.draw(context, stave);
    },

    renderGrandStaff: function(
        pattern, renderer, VF
    ) {
        const staveWidth = 280;
        const width = staveWidth + 40;

        renderer.resize(width, 260);
        const context = renderer.getContext();

        const trebleStave = new VF.Stave(
            30, 20, staveWidth
        );
        trebleStave.addClef('treble');
        trebleStave.setContext(context).draw();
        trebleStave.setNoteStartX(
            trebleStave.getNoteStartX() + 20
        );

        const bassStave = new VF.Stave(
            30, 130, staveWidth
        );
        bassStave.addClef('bass');
        bassStave.setContext(context).draw();
        bassStave.setNoteStartX(
            bassStave.getNoteStartX() + 20
        );

        // Brace and left bar line
        new VF.StaveConnector(trebleStave, bassStave)
            .setType(VF.StaveConnector.type.BRACE)
            .setContext(context).draw();
        new VF.StaveConnector(trebleStave, bassStave)
            .setType(VF.StaveConnector.type.SINGLE_LEFT)
            .setContext(context).draw();

        // Split notes into treble/bass with ghost notes
        const trebleNotes = [];
        const bassNotes = [];

        pattern.notes.forEach(note => {
            const clef = this.noteClef(note);
            if (clef === 'treble') {
                trebleNotes.push(new VF.StaveNote({
                    clef: 'treble',
                    keys: [this.noteToKey(note)],
                    duration: 'q',
                    auto_stem: true
                }));
                bassNotes.push(
                    new VF.GhostNote({ duration: 'q' })
                );
            } else {
                bassNotes.push(new VF.StaveNote({
                    clef: 'bass',
                    keys: [this.noteToKey(note)],
                    duration: 'q',
                    auto_stem: true
                }));
                trebleNotes.push(
                    new VF.GhostNote({ duration: 'q' })
                );
            }
        });

        const beats = pattern.notes.length;

        const trebleVoice = new VF.Voice({
            num_beats: beats, beat_value: 4
        });
        trebleVoice.addTickables(trebleNotes);

        const bassVoice = new VF.Voice({
            num_beats: beats, beat_value: 4
        });
        bassVoice.addTickables(bassNotes);

        new VF.Formatter()
            .joinVoices([trebleVoice])
            .joinVoices([bassVoice])
            .format(
                [trebleVoice, bassVoice],
                staveWidth - 70
            );

        trebleVoice.draw(context, trebleStave);
        bassVoice.draw(context, bassStave);
    }
};
