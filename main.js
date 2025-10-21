import "./style.css";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

// Big Ben
function bigBen(){
    const benTexture = new THREE.TextureLoader().load("ben.jpg");
    const material = new THREE.MeshBasicMaterial({ map: benTexture });
    const base = new THREE.IcosahedronGeometry(15, 0);
    const bigBen = new THREE.Mesh(base, material);
    bigBen.position.set(35, 0, -20);
    scene.add(bigBen);
    return bigBen;
}

const bigBenj = bigBen();

function workBox(){
    const boxTexture = new THREE.TextureLoader().load("work.png");
    const material = new THREE.MeshBasicMaterial({ map: boxTexture });
    const boxGeo = new THREE.BoxGeometry(15, 15, 15);
    const workBox = new THREE.Mesh(boxGeo, material);
    workBox.position.set(-35, 0, 30);
    scene.add(workBox);
    return workBox;
}

const theWorkBox = workBox();


function projectBox(){
    const boxTexture = new THREE.TextureLoader().load("projects.png");
    const material = new THREE.MeshBasicMaterial({ map: boxTexture });
    const boxGeo = new THREE.BoxGeometry(20, 20, 20);
    const workBox = new THREE.Mesh(boxGeo, material);
    workBox.position.set(35, -10, 30);
    scene.add(workBox);
    return workBox;
}

const theProjectBox= projectBox();

// Torus
// const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
// const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
// const torus = new THREE.Mesh(geometry, material);
// scene.add(torus);

// Lights
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// const controls = new OrbitControls(camera, renderer.domElement);

function addBen(size) {
    const benTexture = new THREE.TextureLoader().load("ben.jpg");
    const geometry = new THREE.BoxGeometry(size, size, size);
    const material = new THREE.MeshBasicMaterial({ map: benTexture });
    const ben = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3)
        .fill()
        .map(() => THREE.MathUtils.randFloatSpread(100));

    ben.position.set(x, y, z);
    ben.rotation.set(
        Math.random() * 2 * Math.PI,
        Math.random() * 2 * Math.PI,
        Math.random() * 2 * Math.PI
    );
    scene.add(ben);
    return ben;
}

const benjamins = Array(15).fill().map(() => addBen(5));
// Background
const forestTexture = new THREE.TextureLoader().load("forest.png");
// scene.background = forestTexture;

const backgroundPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(300, 350),
    new THREE.MeshBasicMaterial({ map: forestTexture })
);
backgroundPlane.position.set(0, 0, -25);
scene.add(backgroundPlane);

function moveCamera() {
    const t = document.body.getBoundingClientRect().top;
    camera.position.z = t * -0.01 + 30;
    camera.position.x = t * -0.0002;
    camera.position.y = t * -0.0002;

    benjamins.forEach((ben) => {
        ben.rotation.x += 0.01;
        ben.rotation.y += 0.01;
        ben.rotation.z += 0.01;
    });
    bigBenj.position.z = t * 0.0025;
    // theWorkBox.position.z = t * 0.0025;
    // theProjectBox.position.z = t * 0.0001;
    // bigBenj.position.y += 1 + t * -0.0002;

    // Adjust background zoom based on scroll
    const scale = THREE.MathUtils.clamp(1 - t * -0.00001, 0.1, 5);
    backgroundPlane.scale.set(scale, scale, 1);

    camera.fov = THREE.MathUtils.clamp(75 - t * 0.05, 20, 75); // Adjust field of view based on scroll
    camera.updateProjectionMatrix();
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // torus.rotation.x += 0.01;
    // torus.rotation.y += 0.005;
    // torus.rotation.z += 0.01;

    // rotate each ben
    // benjamins.forEach((ben) => {
    //   ben.rotation.x += 0.01;
    //   ben.rotation.y += 0.01;
    //   ben.rotation.z += 0.01;
    // });

    bigBenj.rotation.y += 0.005;

    // controls.update();
    renderer.render(scene, camera);
}

document.body.onscroll = moveCamera;
animate();

// Handle resizing
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

