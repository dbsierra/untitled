
/**
 * @name untitled
 */

var pi2 = Math.PI * 2;

var notes = [65, 77, 65, 98, 103, 130 ];
var notes2 = [65, 98, 77, 65, 103, 98, 65, 98, 130 ];

var spd = 9;

export function dsp(t) {
  
  
  var stp1 = Math.floor(t*spd)%1;
  var stp2 = Math.floor(t*spd)%1;
  
  var f = notes[stp1];
  var f2 = notes2[stp2] * 2;
  var f3 = notes[stp1] * 4;
  
  var s1 = saw(t, f);
  
  var unisons = [];
  var unisons_length = 2;
  var i = 1;
  
  var sU1 = 0;
  var sU2 = 0;
  var sU3 = 0;
  while( i <= unisons_length )
  {
    
    var dir = 1
    if( i%2 === 0)
      dir = -1
    
    sU1 += saw(t, f3 + ( Math.floor(i/2))*dir  ) * 1/unisons_length;
    sU2 += saw(t, f2 + ( Math.floor(i/2))*dir ) * 1/unisons_length;
    sU3 += saw(t, f + ( Math.floor(i/2))*dir ) * 1/unisons_length;
    i = i + 1;
  }
  
  var env = Math.max(0, 0.9 - ( (t)%(1/spd) * 15) / (( (t)%(1/spd) * 15) + 1));

  var sF = (s1*.2 +sU3*.7 + sU1 * .8 + sU2*1.3 + sin(f,t)*.9) * env; 
  
  return sF;
}




function sin(t, f){
  return Math.sin(t * pi2 * f);
}

function saw(t, f){
  return t*f - Math.round(t*f);
}
