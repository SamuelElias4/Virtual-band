// 3rd party
import { List, Map } from 'immutable';

// project dependencies
import { PianoInstrument } from './instruments/Piano';
import { WaveformVisualizer } from './visualizers/Waveform';
import { FluteInstrument } from './instruments/Tyler9648';
import { GuitarInstrument } from './instruments/jhayes23';
import { KalimbaInstrument } from './instruments/SamuelElias4';
import { TrumpetInstrument } from './instruments/Cyberhjy';
import { CircularVisualizer, CircularTimeVisualizer, CircleWaveTimeVisualizer, CubeVisualizer } from './visualizers/Tyler9648';
import { starVisualizer } from './visualizers/jhayes23';
import { RingsVisualizer } from './visualizers/Cyberhjy';
import { Spiral } from './visualizers/SamuelElias4';


/** ------------------------------------------------------------------------ **
 * The entire application state is stored in AppState.
 ** ------------------------------------------------------------------------ */
export type AppState = Map<string, any>;           // similar to { [id: string]: any }

/**
 * Start with the default piano instrument.
 * Add your instruments to this list.
 */
const instruments = List([PianoInstrument, TrumpetInstrument, FluteInstrument, GuitarInstrument, KalimbaInstrument]);       // similar to Instrument[]

/**
 * Start with the default waveform visualizer.
 * Add your visualizers to this list.
 */
const visualizers = List([WaveformVisualizer,CircularVisualizer, CircleWaveTimeVisualizer, CircularTimeVisualizer, CubeVisualizer, RingsVisualizer, starVisualizer, Spiral]);    // similar to Visualizer[]


/**
 * The default application state contains a list of instruments and a list of visualizers.
 *
 * 'instrument': List<Instrument>
 * 'visualizer': List<Visualizer>
 */
export const defaultState: AppState = Map<string, any>({
  'instruments': instruments,
  'visualizers': visualizers,
});