window.onload = () => {
    let width = window.innerWidth;
    let height = window.innerHeight;
    let canvas = document.getElementById('canvas');

    var loader = new THREE.FileLoader();    
    
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);

    let renderer = new THREE.WebGLRenderer({canvas: canvas});
    renderer.setClearColor(0x000000);

    let scene = new THREE.Scene();

    let camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 5000);
    camera.position.set(0, 0, 200);
    camera.lookAt( new THREE.Vector3( 0, 0, 0 ) );

    let light = new THREE.AmbientLight(0xffffff);
    scene.add(light);
    

    // adding red points that represent statr poistion
    let startPoints;
    let start;

    loader.load('./start.txt', ( data ) => {
            startPoints = JSON.parse(data);

            var starsMaterial = new THREE.PointsMaterial( { color: 'red' } );
            var geometry = new THREE.Geometry();

            for(var i = 0; i < startPoints.length; i++)
            {
                geometry.vertices.push(new THREE.Vector3( startPoints[i].x, startPoints[i].y, startPoints[i].z) );
            }

            start = new THREE.Points( geometry, starsMaterial );

            scene.add(start);
        }
    );


    // adding green points that represent result poistion
    let resultPoints;
    let result;

    loader.load('./points.txt', ( data ) => {
            resultPoints = JSON.parse(data);

            var starsMaterial = new THREE.PointsMaterial( { color: 'green', size: 3.0 } );
            var geometry = new THREE.Geometry();

            for(var i = 0; i < resultPoints.length; i++)
            {
                geometry.vertices.push(new THREE.Vector3( resultPoints[i].x, resultPoints[i].y, resultPoints[i].z) );
            }

            result = new THREE.Points( geometry, starsMaterial );

            scene.add(result);
        }
    );
    
    var axisHelper = new THREE.AxisHelper( 500 );
    scene.add( axisHelper );

    
    let controls = new THREE.OrbitControls( camera );
    controls.target = new THREE.Vector3( 50, 50, 50);
    console.log(controls.maxAzimuthAngle);
    
    function loop() {        

        renderer.render(scene, camera);
        requestAnimationFrame(loop);
    }

    loop();
}