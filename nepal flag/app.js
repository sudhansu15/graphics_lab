/* Initiallizing vertex shader source code for triangles */
var vertexShaderText = 
[
'precision mediump float;',
'',
'attribute vec2 vertPosition;',
'attribute vec3 vertColor;',
'varying vec3 fragColor;',
'',
'void main()',
'{',
'fragColor = vertColor;',
'  gl_Position = vec4(vertPosition,0.0,1.0); ',
'}'
].join('\n');

/* Initiallizing fragment shader source code for triangles */
var fragmentShaderText = 
[
'precision mediump float;',
'',
'',
'varying vec3 fragColor;',
'void main()',
'{',
'  gl_FragColor = vec4(fragColor,1.0); ',
'}'
].join('\n');


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
    gl_FragColor = vec4(1.0,1.0,1.0,1.0);
}`


/* main function from html */
var initdemo = function(){

    /* get canvas elemnt */
    var canvas = document.getElementById('canvaswindow')
    var gl = canvas.getContext('webgl');                                 //get open gl from js context 

    gl.clearColor(0.99,0.98,0.91,1);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);                // clear screen


    var vertexShader = gl.createShader(gl.VERTEX_SHADER);               // create vertex shader
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);           // create fragment shader


    gl.shaderSource(vertexShader, vertexShaderText);                   // link previous vertex shader source code with vertex shader
    gl.shaderSource(fragmentShader, fragmentShaderText);               // link previous fragment shader source code with fragment shader


    gl.compileShader(vertexShader);                                    //compile and check compilation of shaders
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
		console.error('ERROR compiling vertex shader!', gl.getShaderInfoLog(vertexShader));
		return;
	}
    gl.compileShader(fragmentShader);
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
		console.error('ERROR compiling fragment shader!', gl.getShaderInfoLog(fragmentShader));
		return;
	}

    var program = gl.createProgram();                                   // create a program and attach vertex shaders
    gl.attachShader(program,vertexShader);                              
    gl.attachShader(program,fragmentShader);                            
    gl.linkProgram(program);                                            // linking program
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
		console.error('ERROR linking program!', gl.getProgramInfoLog(program));
		return;
	}


    var triangleVertices =                                               //give vertex coodordinate and color as an array
	[ // X, Y,       R, G, B
		0.0, 0.6,   0.0,0.0,1.0,
		0.6, 0.0,   0.0,0.0,1.0,
		0.0, 0.0,   0.0,0.0,1.0,
		0.0, 0.0,   0.0,0.0,1.0,
        0.6,-0.6,   0.0,0.0,1.0,
        0.0,-0.6,   0.0,0.0,1.0

	];

    var triangleVertexBufferObject = gl.createBuffer();                 // create and bind given data into the buffer(gpu)
    gl.bindBuffer(gl.ARRAY_BUFFER,triangleVertexBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(triangleVertices),gl.STATIC_DRAW);
    


    var positionAttribLocation = gl.getAttribLocation(program,'vertPosition');
    var colorAttribLocation = gl.getAttribLocation(program,'vertColor');
    gl.vertexAttribPointer(
        positionAttribLocation,
        2,
        gl.FLOAT,
        gl.FALSE,
        5 * Float32Array.BYTES_PER_ELEMENT,
        0 
    );
    gl.vertexAttribPointer(
        colorAttribLocation,
        3,
        gl.FLOAT,
        gl.FALSE,
        5 * Float32Array.BYTES_PER_ELEMENT,
        2 *Float32Array.BYTES_PER_ELEMENT
    );

    gl.enableVertexAttribArray(positionAttribLocation);
    gl.enableVertexAttribArray(colorAttribLocation);
    
    
    gl.useProgram(program);
    gl.drawArrays(gl.TRIANGLE_FAN,0,6);

// //////////////////////////////////////////////////////



var triangleVertices2 = 
	[ // X, Y,       R, G, B
		0.02, 0.54,   1.0,0.0,0.0,
		0.54, 0.02,   1.0,0.0,0.0,
		0.02, 0.02,   1.0,0.0,0.0,
		0.02, 0.02,   1.0,0.0,0.0,
        0.56,-0.58,   1.0,0.0,0.0,
        0.02,-0.58,   1.0,0.0,0.0

	];

    var triangleVertexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,triangleVertexBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(triangleVertices2),gl.STATIC_DRAW);
    


    var positionAttribLocation = gl.getAttribLocation(program,'vertPosition');
    var colorAttribLocation = gl.getAttribLocation(program,'vertColor');
    gl.vertexAttribPointer(
        positionAttribLocation,
        2,
        gl.FLOAT,
        gl.FALSE,
        5 * Float32Array.BYTES_PER_ELEMENT,
        0 
    );
    gl.vertexAttribPointer(
        colorAttribLocation,
        3,
        gl.FLOAT,
        gl.FALSE,
        5 * Float32Array.BYTES_PER_ELEMENT,
        2 *Float32Array.BYTES_PER_ELEMENT
    );

    gl.enableVertexAttribArray(positionAttribLocation);
    gl.enableVertexAttribArray(colorAttribLocation);
    
    
    gl.useProgram(program);
    gl.drawArrays(gl.TRIANGLE_FAN,0,6);



    ////////////////////////////////////////////////////////////


    /* rewriting the entire code for circles i.e, recreating vertex/fragment shader and comiling and linking is done  */

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




    /////////////////////////////////////////////////////////////////////////////
    vertices3 = [];
    var radius = 0.06;
    var numSegments = 32;
    for (var i = 0; i <= numSegments; i++) {
        var theta = (i / numSegments) * 2 * Math.PI;
        var x = radius * Math.cos(theta);
        var y = radius * Math.sin(theta);
        vertices3.push(x + 0.2, y + 0.14);
    }
    
    var triangleVertexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,triangleVertexBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(vertices3),gl.STATIC_DRAW);


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
    gl.drawArrays(gl.TRIANGLE_FAN,0,numSegments + 2);

    ///////////////////////////////////////////////////////
    
    vertices4 = [];
    var radius = 0.08;
    var numSegments = 32;
    for (var i = 16; i <= numSegments; i++) {
        var theta = (i / numSegments) * 2 * Math.PI;
        var x = radius * Math.cos(theta);
        var y = radius * Math.sin(theta);
        vertices4.push(x + 0.2, y + 0.14);
    }

    var triangleVertexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,triangleVertexBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(vertices4),gl.STATIC_DRAW);


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
    gl.drawArrays(gl.TRIANGLE_FAN,0,numSegments/2 + 1 );

    //////////////////////////////////////////////////////////////////////////

    vertices5 = [];
    var radius = 0.08;
    var numSegments = 32;
    for (var i = 0; i <= numSegments; i++) {
        var theta = (i / numSegments) * 2 * Math.PI;
        var x = radius * Math.cos(theta);
        var y = radius * Math.sin(theta);
        vertices5.push(x + 0.2, y - 0.34);
    }

    var triangleVertexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,triangleVertexBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(vertices5),gl.STATIC_DRAW);


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
    gl.drawArrays(gl.TRIANGLE_FAN,0,numSegments + 2 );

};