const fontLoader = new THREE.FontLoader();

function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement;
  const clientWidth = canvas.clientWidth * window.devicePixelRatio;
  const clientHeight = canvas.clientHeight * window.devicePixelRatio;
  const shouldResize = canvas.width !== clientWidth || canvas.height !== clientHeight;

  if (shouldResize) {
    renderer.setSize(clientWidth, clientHeight, false);
  }

  return shouldResize;
}

fontLoader.load('./helvetiker_regular.typeface.json', font => {
  const canvas = document.querySelector('#canvas');
  const renderer = new THREE.WebGLRenderer({ canvas });

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 10);
  camera.position.z = 8;

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(-1, 2, 4);
  scene.add(light);

  function createText({ text, color, x }) {
    const geometry = new THREE.TextGeometry(text, {
      font,
      size: 1,
      height: .25,
      curveSegments: 10,
    });

    geometry.center();

    const material = new THREE.MeshPhongMaterial({ color });
    const textMesh = new THREE.Mesh(geometry, material);
    textMesh.position.x = x;
    scene.add(textMesh);

    return textMesh;
  }

  const texts = [
    createText({ text: '2', color: 0x23d160, x: -1.5 }),
    createText({ text: '0', color: 0xffdd57, x: -0.5 }),
    createText({ text: '2', color: 0xff3860, x: 0.5 }),
    createText({ text: '1', color: 0x209cee, x: 1.5 }),
  ];

  function render(ms) {
    const second = ms / 1000;

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    texts.forEach((text, i) => {
      const dir = i % 2 == 0 ? 1 : -1;
      text.rotation.y = dir * second * 0.5 * (i + 1);
    });

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
});