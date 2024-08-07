// 3rd party library imports
import * as Tone from "tone";
import { List, Range } from "immutable";
import { Instrument, InstrumentProps } from "../Instruments";
import classNames from "classnames";

interface guitarProps {
  note: string;
  fret: number;
  width?: number;
  synth?: Tone.Synth;
  inlay?: boolean;
}

export function GuitarBlock({
  note,
  synth,
  fret,
  inlay,
  width,
}: guitarProps): JSX.Element {
  return (
    <div
      onClick={() => {
        synth?.triggerAttack(`${note}`);
        synth?.triggerRelease("+0.25");
      }}
      style={{
        flexBasis: "90px",
        borderRight: fret ? "1px dashed silver" : "1px solid gray",
        fontSize: ".5rem",
        textAlign: "center",
        color: "white",
        paddingTop: fret ? "0px" : "5px",
      }}
    >
      <div>
        {!fret && note.charAt(0)}
        {inlay && (
          <div
            style={{
              width: "8px",
              height: "8px",
              backgroundColor: "white",
              borderRadius: "50%",
              position: "relative",
              left: "45%",
              bottom: "5px",
            }}
          ></div>
        )}

        <div
          style={{
            borderBottom: fret ? width + "rem solid white" : "none",
            padding: inlay ? "1.5px" : "5.5px",
          }}
        ></div>
      </div>
    </div>
  );
}

function GuitarType({ title, onClick, active }: any): JSX.Element {
  return (
    <div
      onClick={onClick}
      className={classNames("dim pointer ph2 pv1 ba mr2 br1 fw7 bw1", {
        "b--black black": active,
        "gray b--light-gray": !active,
      })}
    >
      {title}
    </div>
  );
}

function Guitar({ synth, setSynth }: InstrumentProps): JSX.Element {
  const notes = List([
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B",
  ]);
  const keys = List([
    {
      startString: "E",
      midiNum: 64,
    },
    {
      startString: "B",
      midiNum: 59,
    },
    {
      startString: "G",
      midiNum: 55,
    },
    {
      startString: "D",
      midiNum: 50,
    },
    {
      startString: "A",
      midiNum: 45,
    },
    {
      startString: "E",
      midiNum: 40,
    },
  ]);

  const setOscillator = (newType: Tone.ToneOscillatorType) => {
    setSynth((oldSynth) => {
      oldSynth.disconnect();

      return new Tone.Synth({
        oscillator: { type: newType } as Tone.OmniOscillatorOptions,
      }).toDestination();
    });
  };

  const oscillators: List<OscillatorType> = List([
    "sine",
    "sawtooth",
    "square",
    "triangle",
    "fmsine",
    "fmsawtooth",
    "fmtriangle",
    "amsine",
    "amsawtooth",
    "amtriangle",
  ]) as List<OscillatorType>;

  return (
    <div
      style={{
        marginTop: "10px",
      }}
    >
      <div
        style={{
          border: "1px solid black",
          backgroundColor: "black",
          marginLeft: "5px",
        }}
      >
        {keys.map((key) => (
          <div>
            <div
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "row",
                marginRight: "5px",
              }}
            >
              <GuitarBlock
                key={
                  (notes.get(key.midiNum % 12) ?? "") +
                  (Math.floor(key.midiNum / 12) - 1)
                }
                note={
                  (notes.get(key.midiNum % 12) ?? "") +
                  (Math.floor(key.midiNum / 12) - 1)
                }
                synth={synth}
                fret={0}
              />

              {Range(1, 22).map((fret) => (
                <GuitarBlock
                  key={
                    (notes.get((key.midiNum + fret) % 12) ?? "") +
                    (Math.floor((key.midiNum + fret) / 12) - 1)
                  }
                  note={
                    (notes.get((key.midiNum + fret) % 12) ?? "") +
                    (Math.floor((key.midiNum + fret) / 12) - 1)
                  }
                  synth={synth}
                  fret={fret}
                  inlay={
                    ((fret === 5 ||
                      fret === 7 ||
                      fret === 9 ||
                      fret === 15 ||
                      fret === 17 ||
                      fret === 19 ||
                      fret === 21) &&
                      key.startString === "D") ||
                    (fret === 12 &&
                      (key.startString === "A" || key.startString === "G"))
                  }
                  width={5 / (key.midiNum + 5)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className={"pl4 pt4 flex"}>
        {oscillators.map((o) => (
          <GuitarType
            key={o}
            title={o}
            onClick={() => setOscillator(o)}
            active={synth?.oscillator.type === o}
          />
        ))}
      </div>
    </div>
  );
}

export const GuitarInstrument = new Instrument("Guitar", Guitar);