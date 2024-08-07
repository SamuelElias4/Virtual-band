// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import { Visualizer } from '../Visualizers';


export const Spiral = new Visualizer(
  'Spiral',
  (p5, analyzer) => {
    const width = window.innerWidth;
    const height = window.innerHeight / 2;
    const values = analyzer.getValue() as Float32Array;
  
    // Dynamic background color
    p5.background(0);  // 0 corresponds to black in RGB;
  
    p5.noStroke();
    p5.colorMode(p5.HSB, 360, 100, 100);
  
    // Main visualizer logic
    p5.translate(width / 2, height / 2);
  
    for (let i = 0; i < values.length; i++) {
      const amplitude = values[i];
      const absAmp = Math.abs(amplitude) * 100;
  
      // Spiral visualization
      const angle = p5.TWO_PI / values.length;
      const spiralRadius = i * (2 + absAmp / 20);
      const x = spiralRadius * p5.cos(i * angle);
      const y = spiralRadius * p5.sin(i * angle);
  
      // Color mapping
      let color = p5.map(i, 0, values.length, 0, 360);
      p5.fill(color, 100, 100);
      p5.stroke(color, 100, 100);
  
      // Draw ellipse
      p5.ellipse(x, y, absAmp, absAmp / 2);
  
      // Additional particles for a more dynamic effect
      if (i % 3 === 0) {
        let particleSize = p5.random(1, 5);
        p5.fill(p5.random(0, 360), 100, 100);
        p5.circle(p5.random(-width / 4, width / 4), p5.random(-height / 4, height / 4), particleSize);
      }
    }
  
    p5.frameRate(10); // Limiting frame rate for smoother performance
  });
  