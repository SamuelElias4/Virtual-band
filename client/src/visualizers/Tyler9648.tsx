// 3rd party library imports
import P5 from 'p5';
import * as Tone from 'tone';

// project imports
import { Visualizer } from '../Visualizers';


export const CircularVisualizer = new Visualizer(
  'Circular',
  (p5: P5, analyzer: Tone.Analyser) => {
    const width = window.innerWidth * 0.85;
    const height = window.innerHeight / 2;
    const dim = Math.min(width, height);

    p5.background(0, 0, 0, 255);

    p5.strokeWeight(dim * 0.01);


    p5.noFill(); 

    const values = analyzer.getValue();

    
    p5.stroke(255, 255, 255, 255);
    let intArr = [];
    for (let j = 0; j < values.length; j++){
        intArr.push(values[j] as number);
    }
    var max = p5.max(intArr) * dim;
    console.log("max: " + max);
    p5.angleMode(p5.DEGREES);

    for(let t = -1; t <= 1; t += 2){
        p5.beginShape()
        for (let i = 0; i < values.length; i++) {
            const amplitude = values[i] as number;

            const x = width / 2 + ( amplitude + 0.5) * p5.cos((i / values.length) * 180) * dim/1.5;
            const y = height / 2 + (t * ( amplitude + 0.5) * p5.sin((i / values.length) * 180) * dim/1.5);
            p5.vertex(x, y);
 
        }
        p5.endShape()
    }
  },
);

const timeMap = new Map();


    for(let i = 0; i < 256; i++){
        timeMap.set(i, 0);
    }



function average(array: number[]): number{
    let sum = 0;
    array.forEach((item) => sum += item);
    return sum / array.length;
}


export const CircularTimeVisualizer = new Visualizer(
    'Rotating Bars',
    (p5: P5, analyzer: Tone.Analyser) => {
      const width = window.innerWidth * 0.85;
      const height = window.innerHeight / 2;
      const dim = Math.min(width, height);
  
      p5.background(0, 0, 0, 255);
  
      p5.strokeWeight(dim * 0.01);

      p5.noFill(); 
      
      const values = analyzer.getValue();
      const currFrame = p5.frameCount % values.length; 
     
      
      p5.stroke(255, 255, 255, 255);
      let intArr = [];
      for (let j = 0; j < values.length; j++){
          intArr.push(values[j] as number);
      }
      var avge = average(intArr);

      p5.angleMode(p5.DEGREES);
      timeMap.set(currFrame, avge);
          
          for (let i = 0; i < values.length; i++) {
              const amplitude = 3 * p5.abs(timeMap.get((currFrame + i) % timeMap.size));
              
              const innerX = width / 2 + (0.5) * p5.cos((i / values.length  ) * 360) * dim/1.5;
              const innerY = height / 2 +  (0.5) * p5.sin((i / values.length) * 360) * dim/1.5;
              const outerX = width / 2 + ( amplitude + 0.5) * p5.cos((i / values.length) * 360) * dim/1.5;
              const outerY = height / 2 + ( ( amplitude + 0.5) * p5.sin((i / values.length) * 360) * dim/1.5);
              console.log(amplitude*1000%255);
              p5.stroke(amplitude*1000%255, amplitude*1000%255, 0);
              p5.line(innerX, innerY, outerX, outerY);
   
          }
          
    },
  );

  export const CircleWaveTimeVisualizer = new Visualizer(
    'Circular Waveform',
    (p5: P5, analyzer: Tone.Analyser) => {
    
      const width = window.innerWidth * 0.85;
      const height = window.innerHeight / 2;
      const dim = Math.min(width, height);
  
      p5.background(0, 0, 0, 255);
  
      p5.strokeWeight(dim * 0.01);

      p5.noFill(); 

      const values = analyzer.getValue();
      const currFrame = p5.frameCount % values.length; 

      p5.stroke(255, 255, 255, 255);
      let intArr = [];
      for (let j = 0; j < values.length; j++){
          intArr.push(values[j] as number);
      }

      var avge = average(intArr);

      p5.angleMode(p5.DEGREES);
      timeMap.set(currFrame, avge);
          p5.beginShape();
          for (let i = 0; i < values.length; i++) {
              const amplitude = 2 * p5.abs(timeMap.get((currFrame + i) % timeMap.size));
    
              const x = width / 2 + ( amplitude + 0.5) * p5.cos((i / values.length) * 360) * dim/1.5;
              const y = height / 2 + ( ( amplitude + 0.5) * p5.sin((i / values.length) * 360) * dim/1.5);
              p5.vertex(x, y);
          }
          p5.endShape();
    },
  );


  export const CubeVisualizer = new Visualizer(
    'Cube',
    (p5: P5, analyzer: Tone.Analyser) => {
      const width = window.innerWidth * 0.85;
      const height = window.innerHeight / 2;
      const dim = Math.min(width, height);

      p5.angleMode(p5.DEGREES);
      const values = analyzer.getValue();

      const drawLine = (pointA:number[], pointB:number[]) => {
        p5.beginShape();
        for (let i = 0; i < values.length; i++) {
          const amplitude = values[i] as number;
          
          const angleX = p5.sin((Math.max(pointA[0], pointB[0]) - Math.min(pointA[0], pointB[0]))/Math.hypot(pointA[0], pointB[0]));
          const angleY = p5.cos((Math.max(pointA[0], pointB[0]) - Math.min(pointA[0], pointB[0]))/Math.hypot(pointA[0], pointB[0]));
          const x =  p5.map(i + (5 * angleX* amplitude * Math.min(values.length-i, i)), 0, values.length - 1, pointA[0], pointB[0]);
          const y =  p5.map(i + (5 *angleY* amplitude * Math.min(values.length-i, i)), 0, values.length - 1, pointA[1], pointB[1]);
          // Place vertex
          p5.vertex(x, y);
        }
        p5.endShape();
      } 



      p5.background(0, 0, 0, 255);
  
      p5.strokeWeight(dim * 0.01);

      p5.noFill(); 
      
      const currFrame = p5.frameCount % values.length;   
      
      let intArr = [];
      for (let j = 0; j < values.length; j++){
          intArr.push(values[j] as number);
      }
      var avge = average(intArr);
      
      const vertices = [];          
      for (let f = -1; f <= 1; f+= 2){
       
        for(let k = 0; k < 4; k++){
            var point = [width/2 + p5.cos((((k/4) + currFrame/values.length)%1 )*360)*dim/1.5, (f * dim/4.5) + height/2 + 0.25 *  p5.sin((((k/4) + currFrame/values.length)%1 )*360)*dim/1.5];
            vertices.push(point);
        }
        
      }
        p5.colorMode(p5.HSB, 100);
      timeMap.set(currFrame, avge);
       
        p5.stroke(p5.abs(avge*100%100), p5.abs(avge*1500%100), 100); 
        drawLine(vertices[0], vertices[1]);
        drawLine(vertices[0], vertices[3]);
        drawLine(vertices[2], vertices[1]);
        drawLine(vertices[2], vertices[3]);
        drawLine(vertices[4], vertices[5]);
        drawLine(vertices[4], vertices[7]);
        drawLine(vertices[6], vertices[5]);
        drawLine(vertices[6], vertices[7]);
        drawLine(vertices[0], vertices[4]);
        drawLine(vertices[1], vertices[5]);
        drawLine(vertices[2], vertices[6]);
        drawLine(vertices[3], vertices[7]);
    },
  );