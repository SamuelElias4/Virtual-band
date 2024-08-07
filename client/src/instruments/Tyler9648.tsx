// 3rd party library imports
import * as Tone from 'tone';
import classNames from 'classnames';
import { List, Range } from 'immutable';
import React, {useRef, useState} from 'react';
import Slider from '@mui/material/Slider';

// project imports
import { Instrument, InstrumentProps } from '../Instruments';

/** ------------------------------------------------------------------------ **
 * Contains implementation of components for Piano.
 ** ------------------------------------------------------------------------ */


interface FluteKeyProps {
  note: any; // A, B, C, D, E, F
  duration?: string;
  parentCallback?: any;
  synth?: Tone.Synth; // Contains library code for making sound
  index: number; // index gives a location for the flute key
  onMouseUp?: any;
  octave?: any;
}

export function FluteBlow({
  note,
  synth,
  index,       //index 0 is low blow(octave 3), index 1 is high blow(octave 4)
  octave,
}: FluteKeyProps): JSX.Element {
    const [isBlow, setIsBlow] = useState(false);

    const blow = () => {
        setIsBlow(true);
        
        console.log("FluteBlow blow(): " + `${note()}${-index + 4}`);
        //synth?.triggerAttack(`${note()}${-index + 4}`);
        synth?.triggerAttack(`${note()}${octave}`);
        
    };

    const blowRelease = () => {
        
        setIsBlow(false);
        synth?.triggerRelease('+0.1');
        
    };

  return (

    <div
      
      onMouseDown = {blow}
      onMouseUp = {blowRelease}
      
      className={classNames('ba pointer absolute dim',  {     
      'bg-black black h3': isBlow, // black if hole covered
      'black bg-white h4': !isBlow, // white if hole uncovered
      })}
      style={{
        // CSS
        top: `${index * 1.5 + 0.85}rem`,
        left: `4%`,
        zIndex: 1,
        width: '3.5rem',
        height: '2.2rem',
        marginLeft: '0.25rem',
        borderRadius: '0%',
        //borderBottomLeftRadius: index == 0 ? '0%' : '80%',
        //borderTopLeftRadius: index == 1 ? '0%' : '80%',
        borderBottomLeftRadius:  '80%',
        borderTopLeftRadius:  '80%',
      }}
    ></div>
    
  );
}

export function FluteKey({
  note,
  index,
  parentCallback,
}: FluteKeyProps): JSX.Element {
    const [isCovered, setIsCovered] = useState(false);

    const handleToggle = () => {
        setIsCovered(!isCovered);
        parentCallback(note);
    };
    
  return (

    <div
      onMouseUp = {handleToggle}
      className={classNames('ba pointer absolute dim',  {      
      'bg-black black h3': isCovered, // black if hole covered
      'black bg-white h4': !isCovered, // white if hole uncovered
      })}
      style={{
        // CSS
        top: `0.5rem`,
        left: `${index * 4.5 - 27}rem`,
        zIndex: 1,
        width: '3rem',
        height: '3rem',
        marginLeft: '0.25rem',
        borderRadius: '45%'
      }}
    ></div>
  );
}

function FluteType({ title, onClick, active }: any): JSX.Element {
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

function Flute({ synth, setSynth }: InstrumentProps): JSX.Element {
  const marks = [
    {
      value: 1,
      label: 'Octave 1',
    },
    {
      value: 2,
      label: 'Octave 2',
    },
    {
      value: 3,
      label: 'Octave 3',
    },
    {
      value: 4,
      label: 'Octave 4',
    },
    {
      value: 5,
      label: 'Octave 5',
    },
    {
      value: 6,
      label: 'Octave 6',
    },
    {
      value: 7,
      label: 'Octave 7',
    },
  ];
  
  function valuetext(value: number) {
    return `Oct ${value} `;
  }

  const [octave, setOctave] = useState(3);

  const octaveCallback = () => {
    return octave;
  }

  const keys = List([
    { note: 'A', idx: 0 },
    { note: 'B', idx: 1 },
    { note: 'C', idx: 2 },
    { note: 'D', idx: 3 },
    { note: 'E', idx: 4 },
    { note: 'F', idx: 5 },
  ]);

  const lowHigh = List([
    { note: 'low', idx: 0 },
    { note: 'high', idx: 1 },
  ]);


  const notes = new Map();
  notes.set('ABCDEF', 'D');
  notes.set('BCDEF', 'E');
  notes.set('CDEF', 'F');
  notes.set('DEF', 'G');
  notes.set('EF', 'A');
  notes.set('F', 'B');
  notes.set('', 'C');

  const [holesCovered, setHolesCovered] = useState(new Map());

  
  const handleCallback = (note:string) => {                 //note is child data 

    if(holesCovered.get(note) != "covered"){
        holesCovered.set(note, "covered");
    } else {
        holesCovered.delete(note);
    }
    setHolesCovered(holesCovered);
    console.log("handleCallback holesCovered: " + holesCovered + " length: " + holesCovered.size);
  }


  const getNotePlayed = () => {            //returns either string or none
    let currNoteArray = Array.from(holesCovered.keys());
    currNoteArray.sort();
    let strCurrNoteArray = currNoteArray.join('');
    console.log("currnoteArr: " + strCurrNoteArray);
    console.log("note to play " + notes.get(strCurrNoteArray));
    console.log("len notes: " + notes.size);
    if(notes.get(strCurrNoteArray) == undefined){
      return 'C';
    }

    return notes.get(strCurrNoteArray);
  }

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

      <div className="relative dib h3 w-70 ml4 ba self-center br-30 br--left ">
        
        {   
          keys.map(key => {                                 //key holes
            const note = `${key.note}`;
            return (
              <FluteKey
                parentCallback = {handleCallback}
                key={note} //react key
                note={note}
                synth={synth}
                index={ 10 + key.idx}
                onMouseUp={() => handleCallback(note)}
              />
            );
          })
        }
        {Range(0, 1).map(index =>                           //blow level holes
          lowHigh.map(key => {
            const highOrLow = `${key.note}`;

            return (
              <FluteBlow
                key={highOrLow} //react key
                note={getNotePlayed}                //must change, returns get key combo from map using curr keys
                synth={synth}
                index={index}
                octave={octave}
              />
            );
          }),
        )}
          
        

      </div>
      
      <div className={'pl4 pt4 flex ml2 self-center w-70'}>
          <Slider
            aria-label="Octave"
            defaultValue={3}
            getAriaValueText={valuetext}
            step={1}
            value={octave}
            valueLabelDisplay="auto"
            marks={marks}
            min={1}
            max={7}
            onChange={(_, value) => setOctave(value as number)}
          />
      </div>
      <div className={'pl4 pt4 flex'}>
        {oscillators.map(o => (
          <FluteType
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

export const FluteInstrument = new Instrument('Flute', Flute);
