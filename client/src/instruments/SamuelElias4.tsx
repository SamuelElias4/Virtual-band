import * as Tone from 'tone';
import classNames from 'classnames';
import { List, Range } from 'immutable';
import React from 'react';

import { Instrument, InstrumentProps } from '../Instruments';


interface KalimbaKeyProps {
  note: string;
  duration?: string;
  synth?: Tone.Synth;
  octave: number;
  index: number;
}

export function KalimbaKey({
  note,
  synth,
  index,
}: KalimbaKeyProps): JSX.Element {
  return (
    <div
      onMouseDown={() => synth?.triggerAttack(`${note}`)}
      onMouseUp={() => synth?.triggerRelease('+0.25')}
      className={classNames('pointer absolute kalimbakeys', {
        'black bg-medium-gray h4': note,
      })}
      style={{
        // CSS
        top: 0,
        left: `${index * 1}rem`,
        zIndex: 0,
        width: '.75rem',
        marginLeft: 2,
        height: 200,
      }}
    ></div>
  );
}

function KalimbaKeyWithoutJSX({
  note,
  synth,
  index,
}: KalimbaKeyProps): JSX.Element {
  return React.createElement(
    'div',
    {
      onMouseDown: () => synth?.triggerAttack(`${note}`),
      onMouseUp: () => synth?.triggerRelease('+0.25'),
      className: classNames('pointer absolute kalimbakeys', {
        'black bg-white h4': note,
      }),
      style: {
        top: 0,
        left: `${index * 2}rem`,
        zIndex: '1 rem',
        width: '1 rem',
        marginLeft: '0.25rem',
      },
    },
    [],
  );
}

function KalimbaType({ title, onClick, active }: any): JSX.Element {
  return (
    <div
      onClick={onClick}
      className={classNames('dim pointer ph2 pv1 ba mr2 br1 fw7 bw1 KalimbaOscillatorButtons', {
        'b--black black KalimbaOscillatorButtonsActive': active,
        'gray b--light-gray': !active,
      })}
    >
      {title}
    </div>
  );
}

function Kalimba({ synth, setSynth }: InstrumentProps): JSX.Element {
  const keys = List([
    { note: 'A', idx: 5 },
    { note: 'F', idx: 7.5 },
    { note: 'D', idx: 10 },
    { note: 'C', idx: 12.5 },
    { note: 'E', idx: 15 },
    { note: 'G', idx: 17.6 },
    { note: 'B', idx: 20.1 },
  ]);


  const setOscillator = (newType: Tone.ToneOscillatorType) => {
    setSynth(oldSynth => {
      oldSynth.disconnect();

      return new Tone.Synth({
        oscillator: { type: newType } as Tone.OmniOscillatorOptions,
        "envelope": {
          attack: .001,
          sustain: 1,
          decay: 100,
          attackCurve: 'ripple',
        }
      }).toDestination();
    });
  };

  const oscillators: List<OscillatorType> = List([
    'sine',
    'sine10',
    'amsine10',
    'fmsawtooth3',
    'sawtooth',
    'square',
    'triangle',
    'amtriangle10',
  ]) as List<OscillatorType>; 

  return (
    <div className="pv4" id="kalimba">
      <div className="relative dib h4 w-100 ml4">
        {Range(2, 7).map(octave =>
          keys.map(key => {
            const note = `${key.note}${octave}`;
            return (
              <KalimbaKey
                key={note}
                note={note}
                synth={synth}
                octave={octave}
                index={key.idx+1}
              />
            );
          }),
        )}
      </div>

      <div className={'pl4 pt7 ml4 flex'}>
        {oscillators.map(o => (
          <KalimbaType
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


export const KalimbaInstrument = new Instrument('Kalimba', Kalimba);
