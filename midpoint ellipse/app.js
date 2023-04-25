function midpointEllipse(xc, yc, a, b) {
    let x = 0;
    let y = b;
    let aSq = a * a;
    let bSq = b * b;
    let d = Math.round(bSq - (aSq * b) + (0.25 * aSq));
    let coordinates = [];
  
    // Add the first quadrant of the ellipse
    while ((aSq * (y - 0.5)) > (bSq * (x + 1))) {
      if (d < 0) {
        d += bSq * (2 * x + 3);
      } else {
        d += bSq * (2 * x + 3) + aSq * ((-2) * y + 2);
        y--;
      }
      x++;
      coordinates.push((x + xc)/100, (y + yc)/100);
      coordinates.push((x + xc)/100, -(y + yc)/100);
      coordinates.push(-(x + xc)/100, (y + yc)/100);
      coordinates.push(-(x + xc)/100, -(y + yc)/100);
      
    }
  
    // Add the second quadrant of the ellipse
    d = Math.round(bSq * (x + 0.5) * (x + 0.5) + aSq * (y - 1) * (y - 1) - aSq * bSq);
  
    while (y >= 0) {
      coordinates.push((x + xc)/100, (y + yc)/100);
      coordinates.push((x + xc)/100, -(y + yc)/100);
      coordinates.push(-(x + xc)/100, (y + yc)/100);
      coordinates.push(-(x + xc)/100, -(y + yc)/100);
      if (d > 0) {
        d += aSq * ((-2) * y + 3);
      } else {
        d += aSq * ((-2) * y + 3) + bSq * (2 * x + 2);
        x++;
      }
      y--;
    }
    return coordinates;
  } 
// var array = []
// array = dla(3,2,10,10)
// console.log(array)
//////////////////////////////////////////////////////////////////////////
/* Initiallizing vertex shader source code for points */
var vertexShaderText =`
precision mediump float;

attribute vec2 vertPosition;

void main()
{
    gl_Position = vec4(vertPosition, 0.0,1.0);
    gl_PointSize = 3.0;
}`
/* Initiallizing fragment shader source code for points */
var fragmentShaderText = `
precision mediump float;

void main()
{
    gl_FragColor = vec4(0.239,0.609,0.905,1.0);
}`
///////////////////////////////////////////////////////////////////////////////////
/* Initiallizing vertex shader source code for axis */
var vertexShaderText2 =`
precision mediump float;

attribute vec2 vertPosition;

void main()
{
    gl_Position = vec4(vertPosition, 0.0,1.0);

}`
/* Initiallizing fragment shader source code for axis */
var fragmentShaderText2 = `
precision mediump float;

void main()
{
    gl_FragColor = vec4(0.035,0.537,0.4667,1.0);
}`
///////////////////////////////////////////////////////////////////

var initdemo = function(){

    /* get canvas elemnt */
    var canvas = document.getElementById('canvaswindow')
    var gl = canvas.getContext('webgl');                                 //get open gl from js context 

    gl.clearColor(0.99,0.98,0.91,1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);  
                  // clear screen

//////////////////////////////////////////////////////////////////////////////
var vertexShader2 =gl.createShader(gl.VERTEX_SHADER);
    var fragmentShader2 =gl.createShader(gl.FRAGMENT_SHADER);
    
    
    gl.shaderSource(vertexShader2, vertexShaderText2);
    gl.shaderSource(fragmentShader2, fragmentShaderText2);

    gl.compileShader(vertexShader2);
    gl.compileShader(fragmentShader2);

    var program = gl.createProgram();
    gl.attachShader(program,vertexShader2);
    gl.attachShader(program,fragmentShader2);
    gl.linkProgram(program);
/////////////////////////////////////////////////////////////
var axisVertices1 =                                               //give vertex coodordinate and color as an array
	[ // X, Y,
		-1.0,0.0,
        1.0,0.0
	];
    var axisVertexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,axisVertexBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(axisVertices1),gl.STATIC_DRAW);


    var positionAttribLocation = gl.getAttribLocation(program,'vertPosition');

    gl.vertexAttribPointer(
        positionAttribLocation,
        2,
        gl.FLOAT,
        gl.FALSE,
        2 * Float32Array.BYTES_PER_ELEMENT,
        0 
    );

    gl.enableVertexAttribArray(positionAttribLocation);
    gl.useProgram(program);
    gl.drawArrays(gl.LINES,0,2);
//////////////////////////////////////////////////////////////////////////////////////////////
    var axisVertices2 =                                               //give vertex coodordinate and color as an array
	[ // X, Y,
    0.0,-1.0,
    0.0,1.0
	];
    var axisVertexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,axisVertexBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(axisVertices2),gl.STATIC_DRAW);


    var positionAttribLocation = gl.getAttribLocation(program,'vertPosition');

    gl.vertexAttribPointer(
        positionAttribLocation,
        2,
        gl.FLOAT,
        gl.FALSE,
        2 * Float32Array.BYTES_PER_ELEMENT,
        0 
    );

    gl.enableVertexAttribArray(positionAttribLocation);
    gl.useProgram(program);
    gl.drawArrays(gl.LINES,0,2);
    /////////////////////////////////////////////////////
    var vertexShader =gl.createShader(gl.VERTEX_SHADER);
    var fragmentShader =gl.createShader(gl.FRAGMENT_SHADER);
    
    
    gl.shaderSource(vertexShader, vertexShaderText);
    gl.shaderSource(fragmentShader, fragmentShaderText);

    gl.compileShader(vertexShader);
    gl.compileShader(fragmentShader);

    var program = gl.createProgram();
    gl.attachShader(program,vertexShader);
    gl.attachShader(program,fragmentShader);
    gl.linkProgram(program);
    /////////////////////////////////////////////////////
    var lineVertices1 = []

    lineVertices1 = midpointEllipse(0, 0, 50, 90)
    console.log(lineVertices1)
    var lineVertexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,lineVertexBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(lineVertices1),gl.STATIC_DRAW);


    var positionAttribLocation = gl.getAttribLocation(program,'vertPosition');

    gl.vertexAttribPointer(
        positionAttribLocation,
        2,
        gl.FLOAT,
        gl.FALSE,
        2 * Float32Array.BYTES_PER_ELEMENT,
        0 
    );

    gl.enableVertexAttribArray(positionAttribLocation);
    gl.useProgram(program);
    gl.drawArrays(gl.POINTS,0,(lineVertices1.length/2));

}