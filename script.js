// Получаем контейнер для 3D объекта
const container = document.getElementById('3d-container');

// Создаем сцену
const scene = new THREE.Scene();

// Создаем камеру
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Создаем рендерер
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

// Создаем освещение
const light = new THREE.AmbientLight(0x404040); // мягкий свет
scene.add(light);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(0, 1, 0);
scene.add(directionalLight);

// Загружаем OBJ файл
const loader = new THREE.OBJLoader();
loader.load(
    'old_french_lawyer_wea_1219122321_texture.obj', // Путь к вашему .obj файлу
    function (object) {
        // Добавляем загруженный объект в сцену
        scene.add(object);
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
        console.error('An error happened', error);
    }
);

// Функция анимации
function animate() {
    requestAnimationFrame(animate);

    // Рендерим сцену
    renderer.render(scene, camera);
}

// Запускаем анимацию
animate();

// Обработка изменения размера окна
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
