//BETA prototyping code... bad code, baaaaad.. reused from the Bulls eye
var tessel = require('tessel');
var Neopixels       = require('neopixels');
var neopixels       = new Neopixels();

var nrOfLeds        = 16;
var buffersize      = nrOfLeds*3;

var ledBuffer       = new Buffer(buffersize);

var ambientlib = require('ambient-attx4');

var ambient = ambientlib.use(tessel.port['A']); 

var level0colorArray = new Array('','','','','','','','','');
var level1colorArray = new Array('red','orange','green','green','green','orange','green','green','green');
var level2colorArray = new Array('red','orange','orange','green','green','orange','orange','green','green');
var level3colorArray = new Array('red','red','orange','orange','green','red','orange','orange','green');
var level4colorArray = new Array('red','red','red','orange','orange','red','red','orange','orange');
var level5colorArray = new Array('red','red','red','red','red','red','red','red','red');


level(ledBuffer,0,level0colorArray);
neopixels.animate(nrOfLeds, ledBuffer);

neopixels.on('end', function() {
  neopixels.animate(nrOfLeds, ledBuffer);
});


ambient.on('ready', function () {
  // Get a stream of the data readings
  ambient.on('sound', function (lightData) {
    console.log('Light data, stream method: ' + lightData);
    for (var i =0; i < lightData.length;i++) {
    	var d = lightData[i];
    	if (d < 0.018) level(ledBuffer,0,level0colorArray);
		if (d < 0.04 && d > 0.018) level(ledBuffer,0,level1colorArray);
		if (d < 0.05 && d > 0.04) level(ledBuffer,0,level2colorArray);
		if (d < 0.08 && d > 0.05) level(ledBuffer,0,level3colorArray);
		if (d > 0.08 ) level(ledBuffer,0,level5colorArray);

	}
  });
  
});

ambient.on('error', function (err) {
  console.log(err)
});



function level(buf,centerpos,colorArray) {
   
  if (colorArray == null) colorArray = level5colorArray;

  for (var i = centerpos-4; i < centerpos-4+nrOfLeds;i++){

    if (i == centerpos){
      makeColor(buf,i,colorArray[0]);
    }

    else if (i == centerpos-1) {
      makeColor(buf,i,colorArray[1]);
    }

    else if (i == centerpos-2) {
      makeColor(buf,i,colorArray[2]);
    }

    else if (i == centerpos-3) {
      makeColor(buf,i,colorArray[3]);
    }

    else if (i == centerpos-4) {
      makeColor(buf,i,colorArray[4]);
    }

    else if (i == centerpos+1) {
      makeColor(buf,i,colorArray[5]);
    }

    else if (i == centerpos+2) {
      makeColor(buf,i,colorArray[6]);
    }

    else if (i == centerpos+3) {
      makeColor(buf,i,colorArray[7]);
    }

    else if (i == centerpos+4) {
      makeColor(buf,i,colorArray[8]);
    }
    else if (i == centerpos+(nrOfLeds/2)){
      makeColor(buf,i,colorArray[0]);
    }

    else if (i == centerpos+(nrOfLeds/2)-1) {
      makeColor(buf,i,colorArray[1]);
    }

    else if (i == centerpos+(nrOfLeds/2)-2) {
      makeColor(buf,i,colorArray[2]);
    }

    else if (i == centerpos+(nrOfLeds/2)-3) {
      makeColor(buf,i,colorArray[3]);
    }

    else if (i == centerpos+(nrOfLeds/2)-4) {
      makeColor(buf,i,colorArray[4]);
    }

    else if (i == centerpos+(nrOfLeds/2)+1) {
      makeColor(buf,i,colorArray[5]);
    }

    else if (i == centerpos+(nrOfLeds/2)+2) {
      makeColor(buf,i,colorArray[6]);
    }

    else if (i == centerpos+(nrOfLeds/2)+3) {
      makeColor(buf,i,colorArray[7]);
    }

    else if (i == centerpos+(nrOfLeds/2)+4) {
      makeColor(buf,i,colorArray[8]);
    }
    else {
      //standard color
      makeColor(buf,i,standardColor);
    }

  }
  
}

//pos = green
//pos + 1 = red
//pos + 2 = blue
function makeColor(buf,pos,color) {

  if (pos >= nrOfLeds) { //if pos 17 .pos 16-16
    pos = pos - nrOfLeds;
  }

  if (pos < 0) { //if pos is -1 pos -1 + 16 = 15
    pos = pos + nrOfLeds;
  }

 switch (color) {

  case 'red':
    buf[(pos*3)] = 0;
    buf[(pos*3) + 1] = 255;
    buf[(pos*3) + 2] = 0;
    break;

  case 'orange':
    buf[(pos*3)] = 128;
    buf[(pos*3) + 1] = 255;
    buf[(pos*3) + 2] = 0;
    break;


  case 'yellow':
    buf[(pos*3)] = 255;
    buf[(pos*3) + 1] = 255;
    buf[(pos*3) + 2] = 0;
    break;

  case 'green':
    buf[(pos*3)] = 255;
    buf[(pos*3) + 1] = 0;
    buf[(pos*3) + 2] = 0;
    break;

  case 'blue':
    buf[(pos*3)] = 0;
    buf[(pos*3) + 1] = 0;
    buf[(pos*3) + 2] = 255;
    break;

  case 'violet':
    buf[(pos*3)] = 0;
    buf[(pos*3) + 1] = 255;
    buf[(pos*3) + 2] = 255;
    break;

  default: //off
    buf[(pos*3)] = 0;
    buf[(pos*3) + 1] = 0;
    buf[(pos*3) + 2] = 0;

 }
}

