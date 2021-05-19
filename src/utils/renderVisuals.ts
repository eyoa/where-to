import * as THREE from 'three';
import smoke from '../img/smoke.png';

export default function renderVisuals(appMount: any): void {
  let scene: THREE.Scene = new THREE.Scene();
  let camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(60,
    window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.z = 1;
  camera.rotation.x = 1.16;
  camera.rotation.y = -0.12;
  camera.rotation.z = 0.27;

  let ambient: THREE.AmbientLight = new THREE.AmbientLight(0x555555);
  scene.add(ambient);

  let renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  let cloudParticles: THREE.Mesh[] = [];

  scene.fog = new THREE.FogExp2(0x011014, 0.001);
  renderer.setClearColor(scene.fog.color);

  appMount.appendChild(renderer.domElement);

  //  Render the sick visuals
  let renderScene = function () {
    renderer.render(scene, camera);
    requestAnimationFrame(renderScene);
    cloudParticles.forEach(p => {
      p.rotation.z -= 0.001;
    });
  };

  let loader = new THREE.TextureLoader();

  //  Load clouds
  loader.load(smoke, function (texture) {
    let cloudGeo = new THREE.PlaneBufferGeometry(500, 500);
    let cloudMaterial = new THREE.MeshLambertMaterial({
      map: texture,
      opacity: 0.55,
      transparent: true
    });
    for(let p = 0; p < 19; p++) {
      let cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
      cloud.position.set(
        Math.random() * 800 - 400
        , 500
        , Math.random() * 500 - 500
      );
      cloud.rotation.x = 1.16;
      cloud.rotation.y = -0.12;
      cloud.rotation.z = Math.random() * 2 * Math.PI;
      cloudParticles.push(cloud);
      scene.add(cloud);
    }
  });

  //  Lights
  let darkBlueLight: THREE.PointLight =
    new THREE.PointLight(0x021024, 50, 450, 1.7);
  let blueLight: THREE.PointLight =
    new THREE.PointLight(0x0000cc, 50, 450, 1.7);
  let lochmaraLight: THREE.PointLight =
    new THREE.PointLight(0x3677ac, 50, 450, 1.7);

  darkBlueLight.position.set(100, 300, 100);
  blueLight.position.set(100, 300, 100);
  lochmaraLight.position.set(300, 300, 200);

  scene.add(darkBlueLight);
  scene.add(blueLight);
  scene.add(lochmaraLight);

  //  Resize scene on window resize
  let onWindowResize = function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  renderScene();
  window.addEventListener('resize', onWindowResize, false);
};
