"use client";
import { useState, useEffect } from "react";
import cx from "clsx";

export default function Home() {
  const [selectedRoot, setSelectedRoot] = useState("");
  const [selectedScales, setSelectedScales] = useState([]);

  const notes = [
    "C",
    "Db",
    "D",
    "Eb",
    "E",
    "F",
    "Gb",
    "G",
    "Ab",
    "A",
    "Bb",
    "B",
  ];

  const scales = [
    {
      numeral: "I",
      steps: 2,
      type: "major",
      isMajor: true,
    },
    {
      numeral: "ii",
      steps: 2,
      type: "minor",
      isMajor: false,
    },
    {
      numeral: "iii",
      steps: 1,
      type: "minor",
      isMajor: false,
    },
    {
      numeral: "IV",
      steps: 2,
      type: "major",
      isMajor: true,
    },
    {
      numeral: "V",
      steps: 2,
      type: "dominant",
      isMajor: true,
    },
    {
      numeral: "vii",
      steps: 2,
      type: "minor",
      isMajor: false,
    },
    {
      numeral: "vii°",
      steps: 1,
      type: "half-diminished",
      isMajor: false,
    },
  ];

  const selectedScaleColors = [
    "bg-green-600",
    "bg-sky-600",
    "bg-pink-600",
    "bg-orange-600",
  ];

  const chordTones = (scale) => {
    return [];
  };

  const selectedRootStyle = (note) =>
    selectedRoot == note
      ? "bg-slate-100 text-black pointer-events-none"
      : "bg-slate-600 text-slate-400 hover:bg-slate-300";

  const selectedScaleStyle = (scale) => {
    const idx = selectedScales.map((s) => s.numeral).indexOf(scale.numeral);

    if (idx > -1) {
      return cx("text-white", selectedScaleColors[idx]);
    } else if (selectedScales.length < 4) {
      return "bg-slate-600 text-slate-400 hover:bg-slate-300";
    } else {
      return "opacity-70 bg-slate-600 text-slate-400 pointer-events-none";
    }
  };

  const manageSelectedScales = (scale) => {
    if (selectedScales.includes(scale))
      setSelectedScales([...selectedScales.filter((s) => s !== scale)]);
    else if (selectedScales.length < 4)
      setSelectedScales([...selectedScales, scale]);
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
        {scales.map((scale, i) => (
          <button
            key={`scale-picker-${i}`}
            className={cx(
              "mr-4 last:mr-0 text-6xl py-2 rounded-lg w-[115px]",
              selectedScaleStyle(scale)
            )}
            onClick={() => manageSelectedScales(scale)}
          >
            {scale.numeral}
          </button>
        ))}
      </div>

      {selectedScales.map((scale, i) => (
        <div key={`selected-scale-${i}`} className="mt-8">
          {chordTones(scale).map((tone, n) => (
            <div
              key={`tone-${i}-${n}`}
              className={cx(
                "mr-4 last:mr-0 text-6xl py-2 rounded-lg w-[115px] text-center",
                selectedScaleStyle(scale)
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
