// 3rd party library imports
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import * as Tone from 'tone';
import { Music32 } from '@carbon/icons-react';

// project imports
import { AppState } from './State';
import { DispatchAction } from './Reducer';
import { SideNav } from './SideNav';
import { InstrumentContainer } from './Instruments';
import { VisualizerContainer } from './Visualizers';


/** ------------------------------------------------------------------------ **
 * MainPage component
 ** ------------------------------------------------------------------------ */

type PanelProps = {
  state: AppState;
  dispatch: React.Dispatch<DispatchAction>;
};

export function MainPage({ state, dispatch }: PanelProps): JSX.Element {
  /**
   * Component Layout
   * 
   * MainPage
   * |------------------------------------------------------------------|
   * | SideNav   ShowWelcomePanel                                       |
   * | |---|     |---------------------------------------------------|  |
   * | |   |     |                                                   |  |
   * | |   |     |                                                   |  |
   * | |   |     |                                                   |  |
   * | |   |     |                                                   |  |
   * | |   |     |                                                   |  |
   * | |   |     |                                                   |  |
   * | |   |     |                                                   |  |
   * | |   |     |                                                   |  |
   * | |   |     |                                                   |  |
   * | |---|     | --------------------------------------------------|  |
   * |------------------------------------------------------------------|
   * 
   * or
   * 
   * MainPage
   * |------------------------------------------------------------------|
   * | SideNav   InstrumentAndVisualizerPanel                           |
   * | |---|     |---------------------------------------------------|  |
   * | |   |     | InstrumentPanel                                   |  |
   * | |   |     | |-----------------------------------------------| |  |
   * | |   |     | |                                               | |  |
   * | |   |     | |-----------------------------------------------| |  |
   * | |   |     |                                                   |  |
   * | |   |     | VisualizerPanel                                   |  |
   * | |   |     | |-----------------------------------------------| |  |
   * | |   |     | |                                               | |  |
   * | |   |     | |-----------------------------------------------| |  |
   * | |---|     | --------------------------------------------------|  |
   * |------------------------------------------------------------------|
   */

  const location = useLocation();
  const isWelcome = !state.get('instrument');

  useEffect(() => {
    dispatch(new DispatchAction('SET_LOCATION', { location }));
  }, [dispatch, location]);

  return (
    <div
      className="fixed top-0 left-0 h-100 w-100 bg-white"
      onClick={() => Tone.start()}
    >
      <SideNav state={state} dispatch={dispatch} />
      {isWelcome ? (
        <ShowWelcomePanel />
      ) : (
        <InstrumentAndVisualizerPanel state={state} dispatch={dispatch} />
      )}
    </div>
  );
}


/** ------------------------------------------------------------------------ **
 * MainPage Sub-Components
 ** ------------------------------------------------------------------------ */

/** ------------------------------------- **
 * Welcome
 ** ------------------------------------- */

function ShowWelcomePanel(): JSX.Element {
  return (
    <div
      className="absolute right-0 bottom-0 top-0 flex flex-column items-center justify-center"
      style={{ 
        left: '16rem', 
        background: 'linear-gradient(to bottom, #1a1a1a, #333333)', 
        color: '#F5F5F5', 
        boxShadow: '0 6px 12px 0 rgba(0, 0, 0, 0.4)' 
      }}
    >
      <div className="mw6 lh-copy mb4" style={{ textAlign: 'center', padding: '2.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
          {Array.from({ length: 10 }, (_, i) => (
            <div
              key={i}
              style={{ 
                width: '20px', 
                height: '60px', 
                backgroundColor: i % 2 === 0 ? '#ffffff' : '#000000', 
                border: '1px solid #000000' 
              }}
            />
          ))}
        </div>
        <h1 className="f3 fw7 mb2" style={{ fontSize: '2.8rem', letterSpacing: '4px', textShadow: '2px 2px 4px #000000' }}>Jazz Up the Night</h1>
        <p className="f4 mb3" style={{ fontSize: '1.6rem', lineHeight: '1.4' }}>
          Tune into a world of melodies and rhythms.
        </p>
        <p className="f5" style={{ fontSize: '1.3rem', fontStyle: 'italic', color: '#B0C4DE' }}>Your music journey starts here.</p>
      </div>
    </div>
  );
}



/** ------------------------------------- **
 * Instrument and visualizer
 ** ------------------------------------- */

function InstrumentAndVisualizerPanel({ state, dispatch }: PanelProps): JSX.Element {
  /**
   * This React component bundles the instrument panel and visualizer panel together.
   */

  return (
    <div
      className="absolute right-0 bottom-0 top-0 flex flex-column"
      style={{ left: '16rem' }}
    >
      <InstrumentPanel state={state} dispatch={dispatch} />
      <VisualizerPanel state={state} dispatch={dispatch} />
    </div>
  );
}


function InstrumentPanel({ state, dispatch }: PanelProps): JSX.Element {
  /**
   * This React component is the top-level for the instrument.
   */
  const instrument = state.get('instrument');

  return (
    <div>
      {instrument && (
        <InstrumentContainer
          state={state}
          dispatch={dispatch}
          instrument={instrument}
        />
      )}
    </div>
  );
}

function VisualizerPanel({ state }: PanelProps): JSX.Element {
  /**
   * This React component is the top-level for the visualizer.
   */
  const visualizer = state.get('visualizer');

  return (
    <div>
      {visualizer && (
        <VisualizerContainer key={visualizer.name} visualizer={visualizer} />
      )}
    </div>
  );
}
