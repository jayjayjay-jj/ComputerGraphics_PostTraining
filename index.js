// import 
import * as THREE from './three.js/build/three.module.js'
import {OrbitControls} from './three.js/examples/jsm/controls/OrbitControls.js'
import {TextGeometry} from './three.js/examples/jsm/geometries/TextGeometry.js'
import {FontLoader} from './three.js/examples/jsm/loaders/FontLoader.js'
import {GLTFLoader} from './three.js/examples/jsm/loaders/GLTFLoader.js'

// initialize variable
var scene
var renderer
var camera
var camera2
var currentCamera

renderer = new THREE.WebGLRenderer({
    antialias : true
})
scene = new THREE.Scene()


// Perspective camera -> 
// - can adjust the FOV (Field of View) of the camera
// - ratio -> Formula : width / height 
// - near = min view
// - far = max view
var FOV = 45 // 45 degree
var ratio = window.innerWidth / window.innerHeight
var near = 1
var far = 1000

camera = new THREE.PerspectiveCamera(FOV, ratio, near, far)


// Orthographic camera -> 2D Camera
var viewSize = 10
var ratio = window.innerWidth / window.innerHeight
var near = 1
var far = 1000
currentCamera = camera

// Frustum Calculation
camera2 = new THREE.OrthographicCamera(
    viewSize * ratio / -2, // -2 is for left
    viewSize * ratio / 2,  //  2 is for right
    viewSize / 2,          //  2 is for top
    viewSize / -2,         // -2 is for bottom
    near,
    far
)

camera.position.set(0, 10, 10) // x, y, z (0, 0, 0 by default)
// camera.position.y = 10
// camera.position.z = 10

camera.lookAt(0, 0, 0) 

var controls = new OrbitControls(camera, renderer.domElement)
controls.update()
renderer.shadowMap.enabled = true

renderer.setSize(window.innerWidth, window.innerHeight) // set the size of canvas
renderer.setClearColor(0xF4C2C2) // give the color of canvas (but in hexacolor)
document.body.appendChild(renderer.domElement) // adding domElement in html body so that the canvas is in html

// let boxGeo = new THREE.BoxGeometry(1, 1, 1)
// let boxMaterial = new THREE.MeshNormalMaterial({
//     wireframe : true
// })
// let boxMesh = new THREE.Mesh(boxGeo, boxMaterial)
// scene.add(boxMesh)

let renderFunction = () => {
    renderer.render(scene, currentCamera)
    requestAnimationFrame(renderFunction)
    controls.update()
}

renderFunction()

// renderer.render(scene, camera)

// Always re-render when window is resized
window.onresize = () => {
    let width = window.innerWidth
    let height = window.innerHeight
    renderer.setSize(width, height)

    // always update the ratio of camera
    camera.aspect = width / height
    camera.updateProjectionMatrix()

    // renderer.render(scene, camera)
}


// 2D Object
// Point, Line, Plane

// Geometry -> frame
// Material -> material for the frame
// Mesh -> join the geometry and material

let vertex = [
    new THREE.Vector2(3, 3),
    new THREE.Vector2(3, -3),
    new THREE.Vector2(-3, 3),
    new THREE.Vector2(-3, -3)
]

var createPoints = (vertex) => {
    let bufferGeometry = new THREE.BufferGeometry().setFromPoints(vertex)
    let pointMaterial = new THREE.PointsMaterial()
    let points = new THREE.Points(bufferGeometry, pointMaterial) // Mesh === Point

    return points
}

// scene.add(createPoints(vertex))

var createLines = (vertex) => {
    let bufferGeometry = new THREE.BufferGeometry().setFromPoints(vertex)
    let lineMaterial = new THREE.LineBasicMaterial()
    // let lines = new THREE.Line(bufferGeometry, lineMaterial)
    let lines = new THREE.LineLoop(bufferGeometry, lineMaterial)

    return lines
}

// scene.add(createLines(vertex))

var createPlanes = () => {
    let planeGeometry = new THREE.PlaneGeometry(1, 1)
    let planeMaterial = new THREE.MeshNormalMaterial({
        side : THREE.DoubleSide
    })

    let planeMesh = new THREE.Mesh(planeGeometry, planeMaterial)

    planeMesh.rotateX(Math.PI / 2) // radius (180)

    planeMesh.position.set(2, 2, 2)

    return planeMesh
}

// scene.add(createPlanes())


// Box
var createBox = () => {
    let boxGeo = new THREE.BoxGeometry(1, 1, 1)
    let boxMaterial = new THREE.MeshNormalMaterial()
    let box = new THREE.Mesh(boxGeo, boxMaterial)

    return box 
}

// scene.add(createBox())


// Cone - Limas (Ice cream cone)
var createCone = () => {
    let coneGeo = new THREE.ConeGeometry(1, 1, 64, 1, true)
    let coneMaterial = new THREE.MeshNormalMaterial({
        side : THREE.DoubleSide
    })
    let cones = new THREE.Mesh(coneGeo, coneMaterial)

    return cones
}

var coneMesh = createCone()
// scene.add(coneMesh) 

let renderFunctionCone = () => {
    renderer.render(scene, camera)
    requestAnimationFrame(renderFunctionCone)
    coneMesh.rotation.x += 0.1
    coneMesh.position.x += 0.1
}

// renderFunctionCone()


// Sphere (Ball)
var createSphere = () => {
    let sphereGeo = new THREE.SphereGeometry(1, 64, 64)
    let sphereMaterial = new THREE.MeshNormalMaterial()
    let sphere = new THREE.Mesh(sphereGeo, sphereMaterial)

    return sphere
}

var sphereMesh = createSphere()
// scene.add(sphereMesh)

let renderFunctionSphere = () => {
    renderer.render(scene, camera)
    requestAnimationFrame(renderFunctionSphere)
    sphereMesh.rotation.y += 0.1
    sphereMesh.position.y += 0.1
}

// renderFunctionSphere()


// Cylinder 
var createCylinder = () => {
    let cylinderGeo = new THREE.CylinderGeometry(1, 1, 2)
    let cylinderMaterial = new THREE.MeshNormalMaterial()
    let cylinder = new THREE.Mesh(cylinderGeo, cylinderMaterial)

    return cylinder
}

var cylinderMesh = createCylinder()
cylinderMesh.rotation.x += 35

// scene.add(cylinderMesh)


// Wireframe -> Frame of the object
var createCylinderWireframe = () => {
    let cylinderGeo = new THREE.CylinderGeometry(1, 1, 2)
    let cylinderMaterial = new THREE.MeshNormalMaterial()
    let wireframe = new THREE.Mesh(cylinderGeo, cylinderMaterial)

    let wireGeo = new THREE.WireframeGeometry(cylinderGeo)
    let wireLine = new THREE.LineSegments(wireGeo)

    wireLine.material.color = new THREE.Color(0, 255, 0)
    // scene.add(wireLine)

    return wireLine
}

var wireframeMesh = createCylinderWireframe()
// scene.add(wireframeMesh)


// Material
var createMaterialBox = () => {
    let boxGeo = new THREE.BoxGeometry(2, 2, 2)
    let loader = new THREE.TextureLoader().load('./Assets/assets.jpeg')
    let loader1 = new THREE.TextureLoader().load('./Assets/nmap.jpeg')

    // let boxMaterial = new THREE.MeshBasicMaterial({
    //     color : "#8CFF9E"
    // })

    // let boxMaterial = new THREE.MeshPhongMaterial({
    //     shininess : 10,
    //     specular : "#8CFF9E",
    //     map : loader,
    //     normalMap : loader1
    // })

    // let boxMaterial = new THREE.MeshLambertMaterial({
    //     // color : "#8CFF9E"
    //     map : loader,
    //     normalMap : loader1
    // })

    let boxMaterial = new THREE.MeshStandardMaterial({
        roughness : 1,
        metallic : 0,
        map : loader,
        normalMap : loader1
    })

    let box = new THREE.Mesh(boxGeo, boxMaterial)
    box.castShadow = true

    box.position.x = 0
    box.position.y = 0

    return box 
}

var materialBox = createMaterialBox()
// scene.add(materialBox)


var createShadowPlanes = () => {
    let planeGeometry = new THREE.PlaneGeometry(5, 5)
    let planeMaterial = new THREE.MeshPhongMaterial({
        side : THREE.DoubleSide,
        color : "#8CFF9E"
    })

    let planeMesh = new THREE.Mesh(planeGeometry, planeMaterial)
    planeMesh.receiveShadow = true // accept shadow
    planeMesh.name = "abc"

    planeMesh.position.x = 0
    planeMesh.position.y = -3
    planeMesh.rotation.x = Math.PI / 2

    return planeMesh
}

var shadowPlane = createShadowPlanes()
// scene.add(shadowPlane)

// Light
let ambientLight = new THREE.AmbientLight(0xFFFFFF, 1)
scene.add(ambientLight)

// let pointLight = new THREE.PointLight(0xFFFFFF, 1, 100)
// pointLight.position.y = 2
// let pointLightHelper = new THREE.PointLightHelper(pointLight)
// scene.add(pointLightHelper)
// scene.add(pointLight)

// let spotLight = new THREE.SpotLight(0xFFFFFF, 1, 2, Math.PI / 6)
// spotLight.position.y = 2 
// let spotLightHelper = new THREE.SpotLightHelper(spotLight)
// spotLight.rotation.x = Math.PI / 4
// scene.add(spotLightHelper)
// scene.add(spotLight)

// let directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1)
// directionalLight.position.y = 3
// directionalLight.target = materialBox
// materialBox.position.x = 0
// let directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight)

// directionalLight.castShadow = true // give shadow
// scene.add(directionalLightHelper)
// scene.add(directionalLight)


// Font
var createFont = () => {
    let fontLoader = new FontLoader().load('./three.js/examples/fonts/gentilis_bold.typeface.json', function(font) {
        let fontGeo = new TextGeometry('hehe', {
            font : font,
            size : 1,
            height : 1
        })

        fontGeo.center()
        let fontMaterial = new THREE.MeshNormalMaterial()
        let fontMesh = new THREE.Mesh(fontGeo, fontMaterial)

        scene.add(fontMesh)
    })
}

// createFont()


// Mouse Event
window.addEventListener('mousedown', (e) => {
    console.log('Mouse down');
})


// Keyboard Event
window.addEventListener('keydown', (e) => {
    if(e.key == 'a') {
        console.log('You clicked a!');

        if(currentCamera == camera) currentCamera = camera2
        else {
            currentCamera = camera
        }

        console.log(currentCamera);
    }
})


// Raycast
var raycast = new THREE.Raycaster()
var pointer = new THREE.Vector2() // get the mouse pointer

window.addEventListener("pointerdown", (e) => {
    // normalize the pointerdown-ed object -> Default Formula(s) to get the value of 1 and -1
    pointer.x = ( e.clientX / window.innerWidth ) * 2 - 1;
    pointer.y = - ( e.clientY / window.innerHeight ) * 2 + 1;

    raycast.setFromCamera(pointer, currentCamera)

    let intersects = raycast.intersectObjects(scene.children)

    for(let i = 0; i < intersects.length; i++) {
        console.log(intersects[i]);
        intersects[i].object.position.x += 1

        if(intersects[i].object.name == "abc") {
            intersects[i].object.position.y += 1
        }
    }
})


// 3D Model
let clock = new THREE.Clock()  // get the time

var gltfLoader = new GLTFLoader().load('./Assets/phoenix_bird/scene.gltf', (object) => {
    let model = object.scene
    model.scale.set(0.01, 0.01, 0.01)

    let animation = object.animations[0]
    let mixer = new THREE.AnimationMixer(model)
    let action = mixer.clipAction(animation)
    action.play()

    animate()

    function animate() {
        requestAnimationFrame(animate)

        let delta = clock.getDelta()

        model.position.x += 0.05

        mixer.update(delta)
    }

    scene.add(model)
})


// Skybox
let textureLoader = new THREE.TextureLoader()

let boxMaterialArr = [
    // +x -x +y -y +z -z -> right left top bottom front back
    new THREE.MeshBasicMaterial({
        map : textureLoader.load('./Assets/skybox/daylight_box_right.jpg'),
        side : THREE.DoubleSide
    }),

    new THREE.MeshBasicMaterial({
        map : textureLoader.load('./Assets/skybox/daylight_box_left.jpg'),
        side : THREE.DoubleSide
    }),

    new THREE.MeshBasicMaterial({
        map : textureLoader.load('./Assets/skybox/daylight_box_top.jpg'),
        side : THREE.DoubleSide
    }),

    new THREE.MeshBasicMaterial({
        map : textureLoader.load('./Assets/skybox/daylight_box_bottom.jpg'),
        side : THREE.DoubleSide
    }),

    new THREE.MeshBasicMaterial({
        map : textureLoader.load('./Assets/skybox/daylight_box_front.jpg'),
        side : THREE.DoubleSide
    }),

    new THREE.MeshBasicMaterial({
        map : textureLoader.load('./Assets/skybox/daylight_box_back.jpg'),
        side : THREE.DoubleSide
    }),
]

let skyboxGeo = new THREE.BoxGeometry(1000, 1000, 1000)
let skybox = new THREE.Mesh(skyboxGeo, boxMaterialArr)
scene.add(skybox)