"use client";
import { useState, useEffect, useMemo } from "react";
import cx from "clsx";

export default function Home() {
  const [selectedRoot, setSelectedRoot] = useState("");
  const [selectedRootIdx, setSelectedRootIdx] = useState();
  const [selectedChords, setSelectedChords] = useState([]);

  const notes = useMemo(
    () => ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"],
    []
  );

  useEffect(() => {
    setSelectedRootIdx(notes.indexOf(selectedRoot));
  }, [notes, selectedRoot]);

  const majorScaleSteps = [0, 2, 2, 1, 2, 2, 2, 1];
  const majorChords = ["I", "ii", "iii", "IV", "V", "vi", "vii°"];

  const selectedChordColors = [
    "bg-green-600",
    "bg-sky-600",
    "bg-pink-600",
    "bg-orange-600",
  ];

  const chordTones = (chord) => {
    const chordIdx = majorChords.indexOf(chord);

    const stepsCandidate = majorScaleSteps
      .filter((_, i) => i <= chordIdx)
      .reduce((a, s) => a + s, 0);

    const steps = stepsCandidate > 11 ? stepsCandidate - 12 : stepsCandidate;

    return new Array(7).fill().map((_, i) => {
      const candidate = selectedRootIdx + steps;
      const idx = candidate > 11 ? candidate - 12 : candidate;
      return [notes[idx]];
    });
  };

  const selectedRootStyle = (note) =>
    selectedRoot == note
      ? "bg-slate-100 text-black pointer-events-none"
      : "bg-slate-600 text-slate-400 hover:bg-slate-300";

  const selectedChordStyle = (chord) => {
    const idx = selectedChords.indexOf(chord);

    if (idx > -1) {
      return cx("text-white", selectedChordColors[idx]);
    } else if (!selectedRoot || selectedChords.length > 3) {
      return "opacity-70 bg-slate-600 text-slate-400 pointer-events-none";
    } else {
      return "bg-slate-600 text-slate-400 hover:bg-slate-300";
    }
  };

  const manageSelectedScales = (chord) => {
    if (selectedChords.includes(chord))
      setSelectedChords([...selectedChords.filter((s) => s !== chord)]);
    else if (selectedChords.length < 4)
      setSelectedChords([...selectedChords, chord]);
  };

  return (
    <main className="py-8 px-24">
      <div className="flex justify-between">
        {notes.map((note, i) => (
          <button
            key={`root-picker-${i}`}
            className={cx(
              "mr-4 last:mr-0 text-6xl py-2 rounded-lg w-[115px]",
              selectedRootStyle(note)
            )}
            onClick={(e) => setSelectedRoot(e.target.textContent)}
          >
            {note}
          </button>
        ))}
      </div>

      <div className="mt-8 flex justify-between">
        {majorChords.map((chord, i) => (
          <button
            key={`chord-picker-${i}`}
            className={cx(
              "mr-4 last:mr-0 text-6xl py-2 rounded-lg w-[115px]",
              selectedChordStyle(chord)
            )}
            onClick={() => manageSelectedScales(chord)}
          >
            {chord}
          </button>
        ))}
      </div>

      {!!selectedChords.length && (
        <div className="mt-8 flex">
          {[1, 3, 5, 7, 9, 11, 13].map((degree, i) => (
            <span
              key={`chord-degree-${i}`}
              className="flex items-center justify-center mr-4 last:mr-0 text-6xl py-2 rounded-lg w-[115px]"
            >
              {degree}
            </span>
          ))}
        </div>
      )}

      {selectedChords.map((chord, i) => (
        <div key={`selected-chord-${i}`} className="mt-8 flex">
          {chordTones(chord).map((tone, n) => (
            <div
              key={`tone-${i}-${n}`}
              className={cx(
                "flex items-center justify-center mr-4 last:mr-0 text-6xl py-2 rounded-lg w-[115px] text-white",
                selectedChordColors[i]
              )}
            >
              {tone}
            </div>
          ))}
        </div>
      ))}
    </main>
  );
}
