import P5 from "p5";
import * as Tone from "tone";

import { Visualizer } from "../Visualizers";

export const starVisualizer = new Visualizer(
  "Star",
  (p5: P5, analyzer: Tone.Analyser) => {
    const width = window.innerWidth / 2;
    const height = window.innerHeight / 4;
    const color1 = p5.color(255, 0, 100);
    const color2 = p5.color(72, 255, 100);

    const values = analyzer.getValue();
    const freq = values[0] as number;
    const radius1 = 55 + (freq * 550);
    const radius2 = 110 + (freq * 1100);
    const gradient = p5.lerpColor(color1, color2, (p5.frameCount % values.length) / values.length);

    p5.background(0, 0, 0, 255);

    p5.strokeWeight(3);
    p5.stroke(gradient);
    p5.fill(gradient);
    p5.translate(width - 100, height);

    let angle = p5.TWO_PI / 5;
    let halfAngle = angle / 2.0;
    p5.beginShape();
    p5.rotate(p5.frameCount / -45);
    for (let a = 0; a < p5.TWO_PI; a += angle) {
      let sx = 5 + p5.cos(a) * radius2;
      let sy = 5 + p5.sin(a) * radius2;
      p5.vertex(sx, sy);
      sx = 5 + p5.cos(a + halfAngle) * radius1;
      sy = 5 + p5.sin(a + halfAngle) * radius1;
      p5.vertex(sx, sy);
    }
    p5.endShape(p5.CLOSE);
  }
);