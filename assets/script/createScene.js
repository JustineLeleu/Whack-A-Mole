let scene, camera, renderer, loader;
const canvas = document.getElementById('canvas');

let sceneObj;
let molesObj = [];

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2( 1, 1 );

// init the scene and components
function init()
{
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    loader = new THREE.GLTFLoader();

    loader.load(
        `assets/3DObjects/scene.glb`,
        function ( gltf ) {
            sceneObj = gltf.scene;
            scene.add(sceneObj);
        },
        function ( xhr ) {
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
        function ( error ) {
            console.log( 'An error happened' );
        }
    );

    loadModel(0, 0);
    loadModel(0.34, 0);
    loadModel(-0.34, 0);
    loadModel(0.34, 0.36);
    loadModel(-0.34, 0.36);
    loadModel(0.34, -0.36);
    loadModel(-0.34, -0.36);
    loadModel(0, 0.36);
    loadModel(0, -0.36);

    renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    camera.position.z = 1.5;
    camera.position.y = 1;
    camera.position.x = 1;
    camera.rotation.x = -0.5;
    camera.rotation.y = 0.5;

    const topLight = new THREE.DirectionalLight(0xffffff, 0.8);
    topLight.position.set(500, 500, 500);
    //topLight.castShadow = true;
    scene.add(topLight);

    const ambientLight = new THREE.AmbientLight(0x333333, 3);
    scene.add(ambientLight);
}

// used to render the scene every frame
function animate() {
	requestAnimationFrame( animate );

	renderer.render(scene, camera);
}

// resize the scene when window is resized
function onWindowResize()
{
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);
init();
animate();

// load a model of the mole
function loadModel(x, y)
{
    loader.load(
        `assets/3DObjects/mole.glb`,
        function ( gltf ) {
            molesObj.push(gltf.scene);
            let object = gltf.scene;
            scene.add(object);
            object.position.y = -0.2;
            object.position.z -= x;
            object.position.x += y;
        },
        function ( xhr ) {
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
        function ( error ) {
            console.log( 'An error happened' );
        }
    );
}