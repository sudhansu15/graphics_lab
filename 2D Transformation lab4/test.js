// define the matrices as 1D arrays
/* triangle mismatch try again */
var usertriangle = 
[0.1, 0.3, 0.5,
 0.1, 0.5, 0.1,
 1, 1, 1]

function rearrange(matrix){
    temp = []
    temp[0]= matrix[0] //x1
    temp[1]=matrix[3]  //y1
    temp[2]=matrix[1]  //x2
    temp[3]=matrix[4]
    temp[4]=matrix[2]
    temp[5]=matrix[5]
    return temp

}


function multiply(matrix1,matrix2){
    let result = [0,0,0,0,0,0,0,0,0]
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            for (let k = 0; k < 3; k++) {
                result[i * 3 + j] += matrix1[i * 3 + k] * matrix2[k * 3 + j];
            }
        }
    }
    return result
}

function translate(matrix,tx,ty){
    temp = [
        1,0,tx,
        0,1,ty,
        0,0,1
    ]
    out = multiply(temp,matrix)
    out.splice(6,3)
    return out
}

function rotate(matrix,meta){
    theta = meta*3.1415/180 // converting angle to radian value
    temp = [
        Math.cos(theta),-Math.sin(theta),0,
        Math.sin(theta),Math.cos(theta),0,
        0,0,1
    ]
    out = multiply(temp,matrix)
    out.splice(6,3)
    return out
}

function scaling(matrix,sx,sy){
    temp=[
        sx,0,0,
        0,sy,0,
        0,0,1
    ]
    out = multiply(temp,matrix)
    out.splice(6,3)
    return out
}
function reflectionY(matrix){
    temp=[
        1,0,0,
        0,-1,0,
        0,0,1
    ]
    out = multiply(temp,matrix)
    out.splice(6,3)
    return out
}

function shearing(matrix,shx){
    temp =[
        1,shx,0,
        0,1,0,
        0,0,1
    ]
    out = multiply(temp,matrix)
    out.splice(6,3)
    return out
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
    gl_FragColor = vec4(0.0588,0.321,0.729,1.0);
}`
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var initdemo = function(){

    /* get canvas elemnt */
    var canvas = document.getElementById('canvaswindow')
    var gl = canvas.getContext('webgl');                                 //get open gl from js context 

    gl.clearColor(0.99,0.98,0.91,1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);  
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* Initial triangle */
triaggg = rearrange(usertriangle)
console.log(triaggg)
var lineVertexBufferObject = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER,lineVertexBufferObject);
gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(triaggg),gl.STATIC_DRAW);


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
gl.drawArrays(gl.TRIANGLES,0,3);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// for result
var vertexShaderText3 =`
precision mediump float;

attribute vec2 vertPosition;

void main()
{
    gl_Position = vec4(vertPosition, 0.0,1.0);

}`
/* Initiallizing fragment shader source code for axis */
var fragmentShaderText3 = `
precision mediump float;

void main()
{
    gl_FragColor = vec4(0.501,0.0,0.0,1.0);
}`
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var vertexShader3 =gl.createShader(gl.VERTEX_SHADER);
var fragmentShader3 =gl.createShader(gl.FRAGMENT_SHADER);


gl.shaderSource(vertexShader3, vertexShaderText3);
gl.shaderSource(fragmentShader3, fragmentShaderText3);

gl.compileShader(vertexShader3);
gl.compileShader(fragmentShader3);

var program = gl.createProgram();
    gl.attachShader(program,vertexShader3);
    gl.attachShader(program,fragmentShader3);
    gl.linkProgram(program);

    
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// triaggg = rearrange(reflectionY(usertriangle))
triaggg = rearrange(rotate(usertriangle,90))
// triaggg = rearrange(translate(usertriangle,0.5,0.2))
// triaggg = rearrange(scaling(usertriangle,2,2))
// triaggg = rearrange(shearing(usertriangle,1.3)) 


console.log(triaggg)
var lineVertexBufferObject = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER,lineVertexBufferObject);
gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(triaggg),gl.STATIC_DRAW);


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
gl.drawArrays(gl.TRIANGLES,0,3);
}
