import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import { Visualizer } from '../Visualizers';

export const RingsVisualizer = new Visualizer(
  'DoubleRing',
  (p5: P5, analyzer: Tone.Analyser) => {
    const width = window.innerWidth * 0.85;
    const height = window.innerHeight / 2;
    const dim = Math.min(width, height);

    p5.background(0, 0, 0, 255);
    p5.stroke(255, 255, 0); // Bright yellow color
    p5.strokeWeight(dim * 0.02); // Thicker line
    p5.noFill();        

    const values = analyzer.getValue();

    const centerX = width / 2;
    const centerY = height / 2;

    const scaleFactor = dim / 2.5; // Adjust this scale factor as needed
    
    // Draw two ellipses
    for (let j = 0; j < 2; j++) {
      p5.beginShape();
      for (let i = 0; i < values.length; i++) {
        const amplitude = values[i] as number;
        const angle = (i / values.length) * p5.TWO_PI;
        const radius = (centerY / 2 + j * 50) + amplitude * scaleFactor * p5.sin(angle); // Adjust the radius calculation as needed
        const x = centerX + radius * p5.cos(angle);
        const y = centerY + radius * p5.sin(angle);
        p5.vertex(x, y);
      }
      p5.endShape();
    }
  }
);

