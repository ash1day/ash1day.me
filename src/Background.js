import THREE from 'three'

var scene, camera, renderer, clock, geometry, material, box, group,

    windowWidth  = window.innerWidth,
    windowHeight = window.innerHeight,
    windowHalfX  = windowWidth / 2,
    windowHalfY  = windowHeight / 2,
    mouseX = 0,
    mouseY = 0,

    boxSize = 20,
    boxMargin = boxSize / 2,
    dotsLen = 6,
    charMargin = boxSize,
    charSize = (boxSize + boxMargin) * dotsLen

var ash1day = [
  [
    [0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 1, 1],
    [0, 1, 1, 1, 1, 1],
    [1, 1, 0, 0, 1, 1],
    [0, 1, 1, 1, 1, 1]
  ],
  [
    [0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 0],
    [1, 1, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 1, 1],
    [0, 1, 1, 1, 1, 0]
  ],
  [
    [1, 1, 0, 0, 0, 0],
    [1, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 0],
    [1, 1, 0, 1, 1, 1],
    [1, 1, 0, 0, 1, 1],
    [1, 1, 0, 0, 1, 1]
  ],
  [
    [0, 0, 1, 1, 0, 0],
    [0, 1, 1, 1, 0, 0],
    [0, 0, 1, 1, 0, 0],
    [0, 0, 1, 1, 0, 0],
    [0, 0, 1, 1, 0, 0],
    [0, 1, 1, 1, 1, 0]
  ],
  [
    [0, 0, 0, 0, 1, 1],
    [0, 0, 0, 0, 1, 1],
    [0, 1, 1, 1, 1, 1],
    [1, 1, 0, 0, 1, 1],
    [1, 1, 0, 0, 1, 1],
    [0, 1, 1, 1, 1, 1]
  ],
  [
    [0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 1, 1],
    [0, 1, 1, 1, 1, 1],
    [1, 1, 0, 0, 1, 1],
    [0, 1, 1, 1, 1, 1]
  ],
  [
    [0, 0, 0, 0, 0, 0],
    [1, 1, 0, 0, 1, 1],
    [1, 1, 0, 0, 1, 1],
    [0, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 1],
    [1, 1, 1, 1, 0, 0]
  ]
]

// from [Flat UI Colors](https://flatuicolors.com/)
const nodeColors = [
  0x1abc9c, 0x2ecc71, 0x3498db, // 0x9b59b6,
  0x16a085, 0x27ae60, 0x2980b9, // 0x8e44ad,
  // 0xf1c40f, 0xe67e22, 0xe74c3c,
  // 0xf39c12, 0xd35400, 0xc0392b,
]

const createBox = (x, y) => {
  geometry = new THREE.CircleGeometry(10, 16)
  const nodeColor = nodeColors[Math.floor(Math.random() * nodeColors.length)]
  material = new THREE.MeshPhongMaterial({
    color: nodeColor,
    side: THREE.DoubleSide,
    shading: THREE.FlatShading
  })
  box = new THREE.Mesh(geometry, material)
  box.position.set(x, y, 0)
  group.add(box)

  return box
}

const createBoxes = (mat, offset) => {
  const revMat = mat.reverse()
  for (const y in revMat) {
    for (const x in revMat[y]) {
      if (revMat[y][x]) {
        createBox(parseInt(x) * (boxSize + boxMargin) + offset, y * (boxSize + boxMargin))
      }
    }
  }
}

const init = () => {
  scene = new THREE.Scene()
  scene.fog = new THREE.FogExp2(0xffffff, 0.0005)

  scene.add(new THREE.AmbientLight(0xffffff))

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000)
  camera.position.z = 1500 - window.innerWidth / 2

  var directionalLight = new THREE.DirectionalLight(0xffffff, 0.2)
  directionalLight.position.set(0, 1, 1000)
  scene.add(directionalLight)

  group = new THREE.Group()

  for (const ichar in ash1day) {
    createBoxes(ash1day[ichar], (charSize + charMargin) * ichar)
  }
  scene.add(group)

  clock = new THREE.Clock()

  renderer = new THREE.WebGLRenderer()
  renderer.setClearColor(0xffffff)
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)

  document.body.appendChild(renderer.domElement)
}

const animate = () => {
  requestAnimationFrame(animate)

  camera.position.x += (mouseX - camera.position.x) * 0.05
  camera.position.y += (-mouseY - camera.position.y) * 0.05
  camera.lookAt(new THREE.Vector3((charSize + charMargin) * ash1day.length / 2.5, charSize / 2, 0))

  for (const child of group.children) {
    child.rotation.y = clock.getElapsedTime()
  }

  renderer.render(scene, camera)
}

const onDocumentMouseMove = (e) => {
  mouseX = e.clientX - windowHalfX
  mouseY = e.clientY - windowHalfY
}

const onDeviceorientation = (e) => {
  mouseX = parseInt(e.gamma) * 10 - windowHalfX
  mouseY = parseInt(e.beta) * 10 - windowHalfY
}

const onWindowResize = () => {
  windowHalfX = window.innerWidth / 2
  windowHalfY = window.innerHeight / 2

  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

init()
animate()

window.addEventListener('resize', onWindowResize, false)
document.addEventListener('mousemove', onDocumentMouseMove, false)

const isMobile = () => {
  const media = ['iPhone', 'iPad', 'Android']
  const pattern = new RegExp(media.join('|'), 'i')
  return pattern.test(navigator.userAgent)
}

if (isMobile()) {
  window.addEventListener('deviceorientation', onDeviceorientation, false)
}
