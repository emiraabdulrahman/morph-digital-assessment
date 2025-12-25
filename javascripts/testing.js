$(document).ready(function () {
  
  setTimeout(function() {
    $('.promo-popup').addClass('visible');
  }, 5000);

  $('.promo__close-btn').click(function(){
    $('.promo-popup').css('display','none').removeClass('visible');
  });
  
  const canvas = document.getElementById("threeCanvas");
  // Scene
  const scene = new THREE.Scene();

  // Camera
  const camera = new THREE.PerspectiveCamera(
    40,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    100
  );
  camera.position.z = 5;

  // Renderer
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
  });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  // Load texture (product image)
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load('/images/earth-globe.png');

  
  // Geometry (acts like a product card)
  const geometry = new THREE.PlaneGeometry(3,3)
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  let mouseX = 0;
  let mouseY = 0;

  canvas.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;
  });

  canvas.addEventListener("mouseleave", () => {
    mouseX = 0;
    mouseY = 0;
  });
  function animate() {
    // Smooth follow
    mesh.rotation.y += (mouseX * 0.4 - mesh.rotation.y) * 0.08;
    mesh.rotation.x += (mouseY * 0.3 - mesh.rotation.x) * 0.08;

    mesh.position.x += (mouseX * 0.3 - mesh.position.x) * 0.08;
    mesh.position.y += (mouseY * 0.2 - mesh.position.y) * 0.08;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  animate();

});
