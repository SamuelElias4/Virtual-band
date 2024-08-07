import * as Tone from 'tone';
import classNames from 'classnames';
import { List, Range } from 'immutable';
import React from 'react';

// project imports
import { Instrument, InstrumentProps } from '../Instruments';

interface TrumpetKeyProps {
  note: string;
  duration?: string;
  synth?: Tone.Synth;
  minor?: boolean;
  octave: number;
  index: number;
}

export function TrumpetKey({
  note,
  synth,
  minor,
  index,
}: TrumpetKeyProps): JSX.Element {
  const randomColor = () => {
    const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#00FFFF']; // Add more colors as needed
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div
      onMouseDown={() => synth?.triggerAttack(`${note}`)}
      onMouseUp={() => synth?.triggerRelease('+0.25')}
      className={classNames('ba pointer absolute dim', {
        'bg-black black h3': minor,
        'black bg-white h4': !minor,
      })}
      style={{
        top: 0,
        left: `${index * 2}rem`,
        zIndex: minor ? 1 : 0,
        width: '3rem', // Adjust width for the trumpet keys
        height: '10rem', // Adjust height for the trumpet keys
        borderRadius: '50%', // Making keys oval
        backgroundColor: randomColor(), // Randomly assigning colors
        border: '2px solid', // Adding border for visibility
      }}
    ></div>
  );
}

function TrumpetType({ title, onClick, active }: any): JSX.Element {
    return (
      <div
        onClick={onClick}
        className={classNames('dim pointer ph2 pv1 ba mr2 br1 fw7 bw1', {
          'b--black black': active,
          'gray b--light-gray': !active,
        })}
      >
        {title}
      </div>
    );
  }

function Trumpet({ synth, setSynth }: InstrumentProps): JSX.Element {
    const keys = List([
        { note: 'C', idx: 0 },
        { note: 'Db', idx: 0.5 },
        { note: 'D', idx: 1 },
        { note: 'Eb', idx: 1.5 },
        { note: 'E', idx: 2 },
        { note: 'F', idx: 3 },
        { note: 'Gb', idx: 3.5 },
        { note: 'G', idx: 4 },
        { note: 'Ab', idx: 4.5 },
        { note: 'A', idx: 5 },
        { note: 'Bb', idx: 5.5 },
        { note: 'B', idx: 6 },
      ]);
    
      const setOscillator = (newType: Tone.ToneOscillatorType) => {
        setSynth(oldSynth => {
          oldSynth.disconnect();
    
          return new Tone.Synth({
            oscillator: { type: newType } as Tone.OmniOscillatorOptions,
          }).toDestination();
        });
      };
    
      const oscillators: List<OscillatorType> = List([
        'sine',
        'sawtooth',
        'square',
        'triangle',
        'fmsine',
        'fmsawtooth',
        'fmtriangle',
        'amsine',
        'amsawtooth',
        'amtriangle',
      ]) as List<OscillatorType>;

  return (
    <div className="pv4">
      <div className="relative dib h4 w-100 ml4">
        {Range(2, 7).map(octave =>
          keys.map(key => {
            const isMinor = key.note.indexOf('b') !== -1;
            const note = `${key.note}${octave}`;
            return (
              <TrumpetKey
                key={note}
                note={note}
                synth={synth}
                minor={isMinor}
                octave={octave}
                index={(octave - 2) * 7 + key.idx}
              />
            );
          }),
        )}
      </div>
      <div className={'pl4 pt4 flex'}>
        {oscillators.map(o => (
          <TrumpetType
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

export const TrumpetInstrument = new Instrument('Trumpet', Trumpet);