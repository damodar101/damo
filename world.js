/* =========================================
   DAMODAR DIGITAL WORLD
   PART 2 + PART 5
========================================= */


/* =========================================
   IMPORT THREE.JS
========================================= */

import * as THREE from
    "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";


/* =========================================
   CANVAS
========================================= */

const canvas = document.getElementById("world");


/* =========================================
   SCENE
========================================= */

const scene = new THREE.Scene();

const zones = [];

scene.background = new THREE.Color(0x030303);


/* =========================================
   PLAYER
========================================= */

const player = {

    x: 0,

    y: 2.5,

    z: 8,

    speed: 0.08

};


/* =========================================
   CAMERA
========================================= */

const camera = new THREE.PerspectiveCamera(

    60,

    window.innerWidth / window.innerHeight,

    0.1,

    1000

);


/*
   MLBB STYLE CAMERA SETTINGS
*/

let cameraYaw = 0;

let targetCameraYaw = 0;

let cameraPitch = 0.32;

let targetCameraPitch = 0.32;


/* Distance from player */

const cameraDistance = 6;


/* Camera height */

const cameraHeight = 1.5;


/* Smoothness */

const cameraSmoothness = 0.12;


/* Reusable vectors */

const cameraPositionTarget =
    new THREE.Vector3();

const cameraLookTarget =
    new THREE.Vector3();


/* Initial camera position */

camera.position.set(

    player.x,

    player.y + cameraHeight,

    player.z + cameraDistance

);


/* =========================================
   RENDERER
========================================= */

const renderer = new THREE.WebGLRenderer({

    canvas: canvas,

    antialias: true,

    alpha: true

});


renderer.setSize(

    window.innerWidth,

    window.innerHeight

);


renderer.setPixelRatio(

    Math.min(window.devicePixelRatio, 2)

);


/*
   Important for mobile swipe controls
*/

canvas.style.touchAction = "none";


/* =========================================
   LIGHTING
========================================= */


/* Ambient light */

const ambientLight = new THREE.AmbientLight(

    0xffffff,

    0.5

);

scene.add(ambientLight);


/* Main light */

const mainLight = new THREE.PointLight(

    0xffffff,

    30,

    50

);

mainLight.position.set(

    0,

    8,

    3

);

scene.add(mainLight);


/* Secondary light */

const secondLight = new THREE.PointLight(

    0xffffff,

    15,

    30

);

secondLight.position.set(

    -8,

    3,

    -5

);

scene.add(secondLight);


/* =========================================
   FLOOR
========================================= */

const floorGeometry = new THREE.PlaneGeometry(

    60,

    60

);


const floorMaterial = new THREE.MeshStandardMaterial({

    color: 0x080808,

    roughness: 0.75,

    metalness: 0.2

});


const floor = new THREE.Mesh(

    floorGeometry,

    floorMaterial

);


floor.rotation.x = -Math.PI / 2;

floor.position.y = -1;

scene.add(floor);


/* =========================================
   GRID
========================================= */

const grid = new THREE.GridHelper(

    60,

    60,

    0x333333,

    0x151515

);


grid.position.y = -0.98;

scene.add(grid);


/* =========================================
   CENTER PLATFORM
========================================= */

const platformGeometry = new THREE.CylinderGeometry(

    3.5,

    3.5,

    0.35,

    64

);


const platformMaterial = new THREE.MeshStandardMaterial({

    color: 0x111111,

    roughness: 0.45,

    metalness: 0.7

});


const platform = new THREE.Mesh(

    platformGeometry,

    platformMaterial

);


platform.position.y = -0.75;

scene.add(platform);


/* =========================================
   CENTRAL CORE
========================================= */

const coreGeometry = new THREE.IcosahedronGeometry(

    1.5,

    2

);


const coreMaterial = new THREE.MeshStandardMaterial({

    color: 0x222222,

    roughness: 0.2,

    metalness: 0.9,

    emissive: 0x111111,

    emissiveIntensity: 1

});


const core = new THREE.Mesh(

    coreGeometry,

    coreMaterial

);


core.position.y = 1.2;

scene.add(core);


/* =========================================
   FLOATING RINGS
========================================= */

const ringGeometry = new THREE.TorusGeometry(

    2.2,

    0.025,

    16,

    100

);


const ringMaterial = new THREE.MeshBasicMaterial({

    color: 0xffffff,

    transparent: true,

    opacity: 0.35

});


const ring = new THREE.Mesh(

    ringGeometry,

    ringMaterial

);


ring.rotation.x = Math.PI / 2;

ring.position.y = 1.2;

scene.add(ring);


/* =========================================
   FLOATING CUBES
========================================= */

const cubes = [];


function createCube(

    x,

    y,

    z,

    size

) {

    const geometry = new THREE.BoxGeometry(

        size,

        size,

        size

    );


    const material = new THREE.MeshStandardMaterial({

        color: 0x151515,

        roughness: 0.25,

        metalness: 0.8,

        emissive: 0x080808

    });


    const cube = new THREE.Mesh(

        geometry,

        material

    );


    cube.position.set(

        x,

        y,

        z

    );


    cube.rotation.set(

        Math.random(),

        Math.random(),

        Math.random()

    );


    scene.add(cube);

    cubes.push(cube);

}


/* Create floating objects */

createCube(-4, 2.5, -2, 0.7);

createCube(4, 3, -1, 0.9);

createCube(-3, 4.5, -5, 0.5);

createCube(3, 5, -6, 0.6);

createCube(6, 2, -4, 0.45);

createCube(-6, 3, -5, 0.55);


/* =========================================
   PARTICLES
========================================= */

const particleCount = 800;

const particleGeometry = new THREE.BufferGeometry();

const particlePositions = new Float32Array(

    particleCount * 3

);


for (let i = 0; i < particleCount; i++) {

    const i3 = i * 3;

    particlePositions[i3] =

        (Math.random() - 0.5) * 40;

    particlePositions[i3 + 1] =

        Math.random() * 20;

    particlePositions[i3 + 2] =

        (Math.random() - 0.5) * 40;

}


particleGeometry.setAttribute(

    "position",

    new THREE.BufferAttribute(

        particlePositions,

        3

    )

);


const particleMaterial = new THREE.PointsMaterial({

    color: 0xffffff,

    size: 0.025,

    transparent: true,

    opacity: 0.5

});


const particles = new THREE.Points(

    particleGeometry,

    particleMaterial

);


scene.add(particles);


/* =========================================
   MOUSE
========================================= */

const mouse = {

    x: 0,

    y: 0

};


window.addEventListener(

    "mousemove",

    (event) => {

        mouse.x =

            (event.clientX /
                window.innerWidth) *
            2 -
            1;


        mouse.y =

            (event.clientY /
                window.innerHeight) *
            2 -
            1;

    }

);


/* =========================================
   MLBB CAMERA ROTATION
========================================= */


/*
   These variables control dragging.
*/

let cameraDragging = false;

let cameraPointerId = null;

let lastCameraX = 0;

let lastCameraY = 0;


/*
   Sensitivity
*/

const cameraSensitivity = 0.005;

const pitchSensitivity = 0.004;


/*
   Start camera rotation
*/

document.addEventListener(

    "pointerdown",

    (event) => {

        /*
           Don't rotate camera when
           touching joystick or buttons.
        */

        if (

            event.target.closest(".joystick-container") ||

            event.target.closest("#zone-interaction") ||

            event.target.closest("button")

        ) {

            return;

        }


        /*
           Desktop:
           only left mouse button
        */

        if (

            event.pointerType === "mouse" &&

            event.button !== 0

        ) {

            return;

        }


        cameraDragging = true;

        cameraPointerId = event.pointerId;

        lastCameraX = event.clientX;

        lastCameraY = event.clientY;

    },

    { passive: false }

);


/*
   Camera rotation movement
*/

document.addEventListener(

    "pointermove",

    (event) => {

        if (!cameraDragging) {

            return;

        }


        if (

            event.pointerId !==
            cameraPointerId

        ) {

            return;

        }


        const deltaX =

            event.clientX -
            lastCameraX;


        const deltaY =

            event.clientY -
            lastCameraY;


        lastCameraX =

            event.clientX;


        lastCameraY =

            event.clientY;


        /*
           Horizontal camera rotation
        */

        targetCameraYaw +=

            deltaX *
            cameraSensitivity;


        /*
           Vertical camera rotation
        */

        targetCameraPitch +=

            deltaY *
            pitchSensitivity;


        /*
           Prevent camera from flipping
        */

        targetCameraPitch =

            THREE.MathUtils.clamp(

                targetCameraPitch,

                -0.05,

                0.75

            );


        /*
           Stop browser scrolling
           while swiping
        */

        if (event.pointerType === "touch") {

            event.preventDefault();

        }

    },

    { passive: false }

);


/*
   Stop camera rotation
*/

function stopCameraRotation(event) {

    if (

        cameraPointerId ===
        event.pointerId

    ) {

        cameraDragging = false;

        cameraPointerId = null;

    }

}


document.addEventListener(

    "pointerup",

    stopCameraRotation

);


document.addEventListener(

    "pointercancel",

    stopCameraRotation

);


/* =========================================
   JOYSTICK VARIABLES
========================================= */

let joystickActive = false;

let joystickX = 0;

let joystickY = 0;


/* =========================================
   SMOOTH JOYSTICK TARGET
========================================= */

let targetJoystickX = 0;

let targetJoystickY = 0;


/* =========================================
   KEYBOARD CONTROLS
========================================= */

const keys = {

    w: false,

    a: false,

    s: false,

    d: false

};


window.addEventListener(

    "keydown",

    (event) => {

        const key =

            event.key.toLowerCase();


        if (key === "w") {

            keys.w = true;

        }


        if (key === "a") {

            keys.a = true;

        }


        if (key === "s") {

            keys.s = true;

        }


        if (key === "d") {

            keys.d = true;

        }

    }

);


window.addEventListener(

    "keyup",

    (event) => {

        const key =

            event.key.toLowerCase();


        if (key === "w") {

            keys.w = false;

        }


        if (key === "a") {

            keys.a = false;

        }


        if (key === "s") {

            keys.s = false;

        }


        if (key === "d") {

            keys.d = false;

        }

    }

);


/* =========================================
   PART 5 — PORTFOLIO ZONES
========================================= */


/* =========================================
   CREATE ATTRACTIVE ZONE
========================================= */

function createZone(name, x, z, symbol) {

    const group = new THREE.Group();

    group.position.set(

        x,

        0,

        z

    );


    /* =====================================
       FLOOR RING
    ===================================== */

    const ringGeometry = new THREE.TorusGeometry(

        2.3,

        0.045,

        16,

        100

    );


    const ringMaterial = new THREE.MeshBasicMaterial({

        color: 0xffffff,

        transparent: true,

        opacity: 0.65

    });


    const zoneRing = new THREE.Mesh(

        ringGeometry,

        ringMaterial

    );


    zoneRing.rotation.x = Math.PI / 2;

    zoneRing.position.y = -0.45;

    group.add(zoneRing);


    /* =====================================
       INNER RING
    ===================================== */

    const innerRingGeometry =

        new THREE.TorusGeometry(

            1.5,

            0.025,

            16,

            80

        );


    const innerRingMaterial =

        new THREE.MeshBasicMaterial({

            color: 0xffffff,

            transparent: true,

            opacity: 0.35

        });


    const innerRing = new THREE.Mesh(

        innerRingGeometry,

        innerRingMaterial

    );


    innerRing.rotation.x = Math.PI / 2;

    innerRing.position.y = -0.42;

    group.add(innerRing);


    /* =====================================
       MAIN PLATFORM
    ===================================== */

    const zonePlatformGeometry =

        new THREE.CylinderGeometry(

            2.0,

            2.0,

            0.3,

            64

        );


    const zonePlatformMaterial =

        new THREE.MeshStandardMaterial({

            color: 0x111111,

            metalness: 0.85,

            roughness: 0.25,

            emissive: 0x080808,

            emissiveIntensity: 1

        });


    const zonePlatform = new THREE.Mesh(

        zonePlatformGeometry,

        zonePlatformMaterial

    );


    zonePlatform.position.y = -0.7;

    group.add(zonePlatform);


    /* =====================================
       FLOATING 3D CORE
    ===================================== */

    const symbolGeometry =

        new THREE.IcosahedronGeometry(

            0.75,

            2

        );


    const symbolMaterial =

        new THREE.MeshStandardMaterial({

            color: 0x333333,

            metalness: 0.95,

            roughness: 0.15,

            emissive: 0x222222,

            emissiveIntensity: 1.5

        });


    const symbolObject = new THREE.Mesh(

        symbolGeometry,

        symbolMaterial

    );


    symbolObject.position.y = 1.3;

    group.add(symbolObject);


    /* =====================================
       ORBIT RING
    ===================================== */

    const orbitGeometry =

        new THREE.TorusGeometry(

            1.05,

            0.025,

            12,

            80

        );


    const orbitMaterial =

        new THREE.MeshBasicMaterial({

            color: 0xffffff,

            transparent: true,

            opacity: 0.5

        });


    const orbit = new THREE.Mesh(

        orbitGeometry,

        orbitMaterial

    );


    orbit.rotation.x = Math.PI / 2;

    orbit.position.y = 1.3;

    group.add(orbit);


    /* =====================================
       ZONE NAME
    ===================================== */

    const labelCanvas =

        document.createElement("canvas");

    labelCanvas.width = 512;

    labelCanvas.height = 128;


    const ctx =

        labelCanvas.getContext("2d");


    ctx.clearRect(

        0,

        0,

        512,

        128

    );


    ctx.font =

        "bold 52px Arial";

    ctx.textAlign =

        "center";

    ctx.textBaseline =

        "middle";

    ctx.fillStyle =

        "white";


    ctx.fillText(

        name,

        256,

        64

    );


    const labelTexture =

        new THREE.CanvasTexture(

            labelCanvas

        );


    const labelMaterial =

        new THREE.SpriteMaterial({

            map: labelTexture,

            transparent: true

        });


    const label =

        new THREE.Sprite(

            labelMaterial

        );


    label.scale.set(

        4,

        1,

        1

    );


    label.position.y =

        3.3;


    group.add(label);


    /* =====================================
       SYMBOL
    ===================================== */

    const symbolCanvas =

        document.createElement("canvas");

    symbolCanvas.width = 256;

    symbolCanvas.height = 256;


    const symbolCtx =

        symbolCanvas.getContext("2d");


    symbolCtx.font =

        "120px Arial";

    symbolCtx.textAlign =

        "center";

    symbolCtx.textBaseline =

        "middle";


    symbolCtx.fillText(

        symbol,

        128,

        128

    );


    const symbolTexture =

        new THREE.CanvasTexture(

            symbolCanvas

        );


    const symbolSpriteMaterial =

        new THREE.SpriteMaterial({

            map: symbolTexture,

            transparent: true

        });


    const symbolSprite =

        new THREE.Sprite(

            symbolSpriteMaterial

        );


    symbolSprite.scale.set(

        1.4,

        1.4,

        1

    );


    symbolSprite.position.y =

        1.3;


    group.add(symbolSprite);


    /* =====================================
       ZONE DATA
    ===================================== */

    group.userData = {

        name: name,

        symbol: symbol,

        object: symbolObject,

        ring: zoneRing,

        innerRing: innerRing,

        orbit: orbit,

        label: label

    };


    scene.add(group);

    zones.push(group);


    return group;

}


/* =========================================
   CREATE PORTFOLIO ZONES
========================================= */

createZone(

    "CODE",

    -7,

    -5,

    "💻"

);


createZone(

    "DESIGN",

    7,

    -5,

    "🎨"

);


createZone(

    "VIDEO",

    0,

    -11,

    "🎬"

);


/* =========================================
   JOYSTICK ELEMENTS
========================================= */

const joystick =

    document.querySelector(".joystick-ring");


const joystickStick =

    document.querySelector(".joystick-stick");


/* =========================================
   START JOYSTICK
========================================= */

function startJoystick(event) {

    event.preventDefault();

    joystickActive = true;


    /*
       Camera must NOT rotate
       when joystick is touched.
    */

    cameraDragging = false;


    if (joystick.setPointerCapture) {

        joystick.setPointerCapture(

            event.pointerId

        );

    }


    moveJoystick(event);

}


/* =========================================
   MOVE JOYSTICK
========================================= */

function moveJoystick(event) {

    if (!joystickActive) return;


    const rect =

        joystick.getBoundingClientRect();


    const centerX =

        rect.left + rect.width / 2;


    const centerY =

        rect.top + rect.height / 2;


    let x =

        event.clientX - centerX;


    let y =

        event.clientY - centerY;


    /* Maximum joystick movement */

    const maxDistance = 32;


    const distance =

        Math.sqrt(

            x * x +

            y * y

        );


    if (distance > maxDistance) {

        x =

            (x / distance) *

            maxDistance;


        y =

            (y / distance) *

            maxDistance;

    }


    /* =====================================
       NORMALIZED INPUT
    ===================================== */

    let normalizedX =

        x / maxDistance;


    let normalizedY =

        y / maxDistance;


    /* =====================================
       DEAD ZONE
    ===================================== */

    const deadZone = 0.08;


    const inputDistance =

        Math.sqrt(

            normalizedX *
                normalizedX +

            normalizedY *
                normalizedY

        );


    if (inputDistance < deadZone) {

        normalizedX = 0;

        normalizedY = 0;

    }


    /* =====================================
       TARGET MOVEMENT
    ===================================== */

    targetJoystickX = normalizedX;

    targetJoystickY = normalizedY;


    /* =====================================
       MOVE JOYSTICK KNOB
    ===================================== */

    joystickStick.style.transform =

        `translate(${x}px, ${y}px)`;

}


/* =========================================
   STOP JOYSTICK
========================================= */

function stopJoystick(event) {

    joystickActive = false;


    targetJoystickX = 0;

    targetJoystickY = 0;


    if (

        event &&

        event.pointerId !== undefined &&

        joystick.releasePointerCapture

    ) {

        try {

            joystick.releasePointerCapture(

                event.pointerId

            );

        }

        catch (error) {}

    }


    joystickStick.style.transform =

        "translate(0, 0)";

}


if (joystick) {

    joystick.addEventListener(

        "pointerdown",

        startJoystick

    );


    joystick.addEventListener(

        "pointermove",

        moveJoystick

    );


    joystick.addEventListener(

        "pointerup",

        stopJoystick

    );


    joystick.addEventListener(

        "pointercancel",

        stopJoystick

    );

}


/* =========================================
   CLOCK
========================================= */

const clock = new THREE.Clock();


/* =========================================
   ZONE INTERACTION ELEMENTS
========================================= */

const zoneInteraction =

    document.getElementById(

        "zone-interaction"

    );


const zoneNameDisplay =

    document.getElementById(

        "zone-name"

    );


const enterZoneButton =

    document.getElementById(

        "enter-zone"

    );


let nearbyZone = null;


/* =========================================
   ENTER ZONE BUTTON
========================================= */

if (enterZoneButton) {

    enterZoneButton.addEventListener(

        "click",

        () => {

            if (!nearbyZone) return;


            console.log(

                "Entering zone:",

                nearbyZone.userData.name

            );

        }

    );

}


/* =========================================
   ANIMATION
========================================= */

function animate() {

    requestAnimationFrame(animate);


    const time =

        clock.getElapsedTime();


    /* =====================================
       CORE ANIMATION
    ===================================== */

    core.rotation.x =

        time * 0.25;


    core.rotation.y =

        time * 0.35;


    core.position.y =

        1.2 +

        Math.sin(time * 1.5) *

        0.25;


    /* =====================================
       RING
    ===================================== */

    ring.rotation.z =

        time * 0.25;


    ring.rotation.y =

        Math.sin(time * 0.5) *

        0.3;


    /* =====================================
       CUBES
    ===================================== */

    cubes.forEach((cube, index) => {

        cube.rotation.x +=

            0.002 +

            index * 0.0002;


        cube.rotation.y +=

            0.003 +

            index * 0.0002;


        cube.position.y +=

            Math.sin(

                time * 0.8 +

                index

            ) * 0.002;

    });


    /* =====================================
       PARTICLES
    ===================================== */

    particles.rotation.y =

        time * 0.015;


    /* =====================================
       SMOOTH JOYSTICK INPUT
    ===================================== */

    joystickX +=

        (

            targetJoystickX -

            joystickX

        ) * 0.18;


    joystickY +=

        (

            targetJoystickY -

            joystickY

        ) * 0.18;


    /* =====================================
       MOVEMENT INPUT
    ===================================== */

    let moveX =

        joystickX;


    let moveY =

        joystickY;


    /*
       Keyboard
    */

    if (keys.w) {

        moveY -= 1;

    }


    if (keys.s) {

        moveY += 1;

    }


    if (keys.a) {

        moveX -= 1;

    }


    if (keys.d) {

        moveX += 1;

    }


    /*
       Normalize diagonal movement
    */

    const movementLength =

        Math.sqrt(

            moveX * moveX +

            moveY * moveY

        );


    if (movementLength > 1) {

        moveX /= movementLength;

        moveY /= movementLength;

    }


    /* =====================================
       CAMERA RELATIVE DIRECTION
    ===================================== */


    /*
       Forward direction
       based on camera rotation
    */

    const forwardX =

        Math.sin(cameraYaw);


    const forwardZ =

        -Math.cos(cameraYaw);


    /*
       Right direction
    */

    const rightX =

        Math.cos(cameraYaw);


    const rightZ =

        Math.sin(cameraYaw);


    /*
       Convert joystick input
       into camera-relative movement.
    */

    const movementX =

        forwardX * (-moveY) +

        rightX * moveX;


    const movementZ =

        forwardZ * (-moveY) +

        rightZ * moveX;


    /* =====================================
       MOVE PLAYER
    ===================================== */

    player.x +=

        movementX *

        player.speed;


    player.z +=

        movementZ *

        player.speed;


    /* =====================================
       WORLD BOUNDARIES
    ===================================== */

    player.x =

        THREE.MathUtils.clamp(

            player.x,

            -15,

            15

        );


    player.z =

        THREE.MathUtils.clamp(

            player.z,

            -15,

            15

        );


    /* =====================================
       SMOOTH CAMERA ROTATION
    ===================================== */

    cameraYaw +=

        (

            targetCameraYaw -

            cameraYaw

        ) * 0.12;


    cameraPitch +=

        (

            targetCameraPitch -

            cameraPitch

        ) * 0.12;


    /* =====================================
       CAMERA POSITION
    ===================================== */


    /*
       Horizontal camera distance
       changes slightly with pitch.
    */

    const horizontalDistance =

        cameraDistance *

        Math.cos(cameraPitch);


    /*
       Camera stays behind player.
    */

    cameraPositionTarget.set(

        player.x -

            Math.sin(cameraYaw) *

            horizontalDistance,


        player.y +

            cameraHeight +

            Math.sin(cameraPitch) *

            cameraDistance,


        player.z +

            Math.cos(cameraYaw) *

            horizontalDistance

    );


    /*
       Smooth camera follow
    */

    camera.position.lerp(

        cameraPositionTarget,

        cameraSmoothness

    );


    /* =====================================
       CAMERA LOOK TARGET
    ===================================== */

    cameraLookTarget.set(

        player.x +

            forwardX * 5,


        player.y -

            0.8 +


            Math.sin(cameraPitch) *

            2,


        player.z +

            forwardZ * 5

    );


    camera.lookAt(

        cameraLookTarget

    );


    /* =====================================
       PORTFOLIO ZONE ANIMATION
    ===================================== */

    zones.forEach((zone, index) => {

        const object =

            zone.userData.object;


        const zoneRing =

            zone.userData.ring;


        const innerRing =

            zone.userData.innerRing;


        const orbit =

            zone.userData.orbit;


        /* Floating core */

        object.rotation.x +=

            0.01;


        object.rotation.y +=

            0.015;


        object.position.y =

            1.2 +

            Math.sin(

                time * 1.5 +

                index

            ) * 0.25;


        /* Outer ring */

        zoneRing.rotation.z =

            time * 0.4;


        /* Inner ring */

        innerRing.rotation.z =

            -time * 0.6;


        /* Orbit */

        orbit.rotation.x =

            time * 0.7;


        orbit.rotation.y =

            time * 0.5;

    });


    /* =====================================
       ZONE DETECTION
    ===================================== */

    nearbyZone = null;


    zones.forEach((zone) => {

        const dx =

            player.x -

            zone.position.x;


        const dz =

            player.z -

            zone.position.z;


        const distance =

            Math.sqrt(

                dx * dx +

                dz * dz

            );


        zone.userData.distance =

            distance;


        /* =================================
           PLAYER IS NEAR ZONE
        ================================= */

        if (distance < 4) {

            nearbyZone = zone;


            zone.userData.ring.material.opacity =

                1;


            zone.userData.innerRing.material.opacity =

                0.7;


            zone.userData.object.material.emissiveIntensity =

                2.5;


            zone.userData.orbit.material.opacity =

                0.9;

        }


        /* =================================
           PLAYER IS FAR FROM ZONE
        ================================= */

        else {

            zone.userData.ring.material.opacity =

                0.65;


            zone.userData.innerRing.material.opacity =

                0.35;


            zone.userData.object.material.emissiveIntensity =

                1.5;


            zone.userData.orbit.material.opacity =

                0.5;

        }

    });


    /* =====================================
       ZONE INTERACTION PANEL
    ===================================== */

    if (

        zoneInteraction &&

        zoneNameDisplay

    ) {

        if (nearbyZone) {

            zoneInteraction.classList.add(

                "active"

            );


            zoneNameDisplay.textContent =

                nearbyZone.userData.name;

        }

        else {

            zoneInteraction.classList.remove(

                "active"

            );

        }

    }


    /* =====================================
       RENDER
    ===================================== */

    renderer.render(

        scene,

        camera

    );

}


/* =========================================
   START ANIMATION
========================================= */

animate();


/* =========================================
   RESPONSIVE
========================================= */

window.addEventListener(

    "resize",

    () => {

        camera.aspect =

            window.innerWidth /

            window.innerHeight;


        camera.updateProjectionMatrix();


        renderer.setSize(

            window.innerWidth,

            window.innerHeight

        );


        renderer.setPixelRatio(

            Math.min(

                window.devicePixelRatio,

                2

            )

        );

    }

);
