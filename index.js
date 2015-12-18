
/**
 * @name sawstuff
 */

var pi2 = Math.PI * 2;


var notes2 = ["c3", "g3", "d#3", "c3", "g#3", "g3", "c3", "g3", "c4" ];
var notesOn = [1,0,1,1,1,1,1,1];

var spd = 9;

export function dsp(t) {
  
  var stp2 = Math.floor(t*spd)%8;
  
  var lfo = Math.min(1, Math.sin(t*205)/2+.8);
  
  var f2 = notes2[stp2];

  
  var s1 = saw(t, Math.floor(note("c2")));
  
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
    
    sU1 += saw(t, Math.floor(note("c2")) + ( Math.floor(i/2))*dir  ) * 1/unisons_length * notesOn[stp2];
    sU2 += saw(t, note(f2) + ( Math.floor(i/2))*dir ) * 1/unisons_length * notesOn[stp2];
    sU3 += saw(t, Math.floor(note("c2")) + ( Math.floor(i/2))*dir ) * 1/unisons_length ;
    i = i + 1;
  }
  
  var env = Math.max(0, 0.9 - ( (t)%(1/spd) * 15) / (( (t)%(1/spd) * 15) + 1));

  var sF = (s1*.2 +sU3*.7 + sU1 * .8 + sU2*1.3 + sin(note("c2"),t)*.9) * env ; 
  
  return sF;
}


function sin(t, f){
  return Math.sin(t * pi2 * f);
}

function saw(t, f){
  return t*f - Math.round(t*f);
}






//Note to frequency - taken from https://github.com/opendsp/note
function note(n){
  if ('string' === typeof n) n = stringToNote(n);
  return Math.pow(2, (n - 57)/12) * 440;
}

function stringToNote(s){
  s = s.split('');
  var octave = parseInt(s[s.length - 1], 10);
  if (isNaN(octave)) octave = 4;
  var note = s[0].toLowerCase();
  var flat = s[1] === 'b';
  var sharp = s[1] === '#';
  var notes = 'ccddeffggaab';
  return notes.indexOf(note) + (octave * 12) + sharp - flat;
}




