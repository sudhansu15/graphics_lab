function abs(num){
    if(num <0){
        return -num
    }
    else{
        return num
    }

}
/* funtion that returns an array of line data */
function dda(x1,y1,x2,y2) {
    var a = []
    let dx = x2 -x1;
    let dy = y2 - y1;
    let x = x1;
    let y = y1;
    
    a.push(x/10,y/10)
    if ( abs(dx) > abs(dy)){
        var stepsize = abs(dx)
    
    }
    else{
        stepsize =  abs(dy)
    }

    let xinc = dx/stepsize
    let yinc = dy/stepsize 

    /* let vari = stepsize */
    for(var vari = 0;vari < stepsize ;vari++){
        x= x + xinc
        y = y + yinc 
        a.push(x/10,y/10);
    }

    return a

}
/* Initiallizing vertex shader source code for points */
var vertexShaderText =`
precision mediump float;

attribute vec2 vertPosition;

void main()
{
    gl_Position = vec4(vertPosition, 0.0,1.0);
    gl_PointSize = 8.0;
}`
/* Initiallizing fragment shader source code for points */
var fragmentShaderText = `
precision mediump float;

void main()
{
    gl_FragColor = vec4(0.0588,0.321,0.729,1.0);
}`

/* Initiallizing vertex shader source code for circles */
var vertexShaderText2 =`
precision mediump float;

attribute vec2 vertPosition;

void main()
{
    gl_Position = vec4(vertPosition, 0.0,1.0);

}`
/* Initiallizing fragment shader source code for circles */
var fragmentShaderText2 = `
precision mediump float;

void main()
{
    gl_FragColor = vec4(0.035,0.537,0.4667,1.0);
}`

/* main function from html */

var initdemo = function(){

    /* get canvas elemnt */
    var canvas = document.getElementById('canvaswindow')
    var gl = canvas.getContext('webgl');                                 //get open gl from js context 

    gl.clearColor(0.99,0.98,0.91,1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);  
                  // clear screen
    

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    var vertexShader2 =gl.createShader(gl.VERTEX_SHADER);
    var fragmentShader2 =gl.createShader(gl.FRAGMENT_SHADER);
    
    
    gl.shaderSource(vertexShader2, vertexShaderText2);
    gl.shaderSource(fragmentShader2, fragmentShaderText2);

    gl.compileShader(vertexShader2);
    gl.compileShader(fragmentShader2);


    gl.compileShader(vertexShader2);
    if (!gl.getShaderParameter(vertexShader2, gl.COMPILE_STATUS)) {
		console.error('ERROR compiling vertex shader!', gl.getShaderInfoLog(vertexShader2));
		return;
	}
    gl.compileShader(fragmentShader2);
    if (!gl.getShaderParameter(fragmentShader2, gl.COMPILE_STATUS)) {
		console.error('ERROR compiling fragment shader!', gl.getShaderInfoLog(fragmentShader2));
		return;
	}

    var program = gl.createProgram();
    gl.attachShader(program,vertexShader2);
    gl.attachShader(program,fragmentShader2);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
		console.error('ERROR linking program!', gl.getProgramInfoLog(program));
		return;
	}
 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

/* gl_PointSize = 10.0; */
var lineVertices1 = []

lineVertices1 = dda(-9,4,10,-9)
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
    gl.drawArrays(gl.POINTS,0,(lineVertices1.length/2)-1);
}