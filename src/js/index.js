window.onload = () => {
    let width = window.innerWidth;
    let height = window.innerHeight;
    let canvas = document.getElementById('canvas');

    // var loader = new THREE.FileLoader();

    // //load a text file and output the result to the console
    // loader.load(
    //     // resource URL
    //     './points.txt',

    //     // onLoad callback
    //     function ( data ) {
    //         // output the text to the console
    //         window.data = data;
    //     },

    //     // onProgress callback
    //     function ( xhr ) {
    //         console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
    //     },

    //     // onError callback
    //     function ( err ) {
    //         console.error( 'An error happened' );
    //     }
    // );
    
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);

    let ball = {
        rotationY: 0,
        rotationX: 0,
        rotationZ: 0,
        positionY: 0,
        positionX: 0,
        positionZ: 0
    }

    let gui =  new dat.GUI();
    gui.add(ball, 'rotationX', -0.2, 0.2, 0.001);
    gui.add(ball, 'rotationY', -0.2, 0.2, 0.001);
    gui.add(ball, 'rotationZ', -0.2, 0.2, 0.001);

    gui.add(ball, 'positionX', -5, 5, 0.1);
    gui.add(ball, 'positionY', -5, 5, 0.1);
    gui.add(ball, 'positionZ', -5, 5, 0.1);

    let renderer = new THREE.WebGLRenderer({canvas: canvas});
    renderer.setClearColor(0x000000);

    let scene = new THREE.Scene();

    let camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 5000);
    camera.position.set(0, 0, 1000);
    

    let light = new THREE.AmbientLight(0xffffff);
    scene.add(light);

    let geometry = new THREE.SphereGeometry(200, 12, 12);
    let material = new THREE.MeshBasicMaterial({color: 0xffffff, vertexColors: THREE.FaceColors});

    for(var i = 0; i < geometry.faces.length; i++)
    {
        geometry.faces[i].color.setRGB(Math.random(), Math.random(), Math.random());
    }

    let mash = new THREE.Mesh(geometry, material);

    scene.add(mash);
    
    function loop()
    {
        mash.rotation.x += ball.rotationX;
        mash.rotation.y += ball.rotationY;
        mash.rotation.z += ball.rotationZ;

        mash.position.x += ball.positionX;
        mash.position.y += ball.positionY;
        mash.position.z += ball.positionZ;

        renderer.render(scene, camera);
        requestAnimationFrame(loop);
    }

    loop();
}