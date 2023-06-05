import './style.css'
import * as THREE from 'three'

/* access canvas element */
const canvas = document.querySelector('canvas.webgl')


/* scene */

const scene = new THREE.Scene()
scene.background = new THREE.Color( 0xF5F5F5 );
/* object */
const geometry = new THREE.SphereGeometry( 2.2, 10, 16 );
const material = new THREE.MeshBasicMaterial( { color: 0x2A363B, wireframe:true } ); 
const sphere = new THREE.Mesh( geometry, material );
scene.add(sphere)

/* object 2  */
const geo = new THREE.SphereGeometry( 2.2, 10, 12 );
const mat = new THREE.MeshBasicMaterial( { color: 0x2F9599, wireframe:true } ); 
const sphere2 = new THREE.Mesh( geo, mat );
scene.add(sphere2)


/* axes helper */
const axesHelper = new THREE.AxesHelper(2000);
scene.add( axesHelper );

/* sizes  */
const sizes ={
    width: window.innerWidth,
    height: window.innerHeight
}

/* camera */
const camera = new THREE.PerspectiveCamera(55,sizes.width / sizes.height)
camera.position.z = 30
camera.lookAt(sphere.position)
scene.add(camera)

/* renderer */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width,sizes.height)
renderer.render(scene, camera)

/* animation */
/* clock */
const clock = new THREE.Clock()
const tick = ()=>{
    const elapsedTime = clock.getElapsedTime()
    sphere.position.y = Math.sin(elapsedTime * Math.PI)*7
    sphere2.position.y = Math.cos(elapsedTime * Math.PI)*7
    sphere.position.x = elapsedTime * 10
    sphere2.position.x = elapsedTime * 10
    sphere.rotation.y = elapsedTime  
    sphere2.rotation.y = -elapsedTime


    camera.position.x = elapsedTime * 9
    camera.lookAt(sphere.position)
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}
tick()