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

    let renderer = new THREE.WebGLRenderer({canvas: canvas});
    renderer.setClearColor(0x000000);

    let scene = new THREE.Scene();

    let camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 5000);
    camera.position.set(0, 0, 100);
    camera.lookAt( new THREE.Vector3( 0, 0, 0 ) );

    let light = new THREE.AmbientLight(0xffffff);
    scene.add(light);
    

    var material = new THREE.LineBasicMaterial( { color: 0xffffff } );

    var geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3( -10, 0, 0) );
    geometry.vertices.push(new THREE.Vector3( 0, 10, 0) );
    geometry.vertices.push(new THREE.Vector3( 10, 0, 10) );

    var line = new THREE.Line( geometry, material );

    scene.add(line);
    
    function loop() {
        

        renderer.render(scene, camera);
        requestAnimationFrame(loop);
    }

    loop();
}