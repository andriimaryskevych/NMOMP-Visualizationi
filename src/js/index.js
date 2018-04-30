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

    
    let startPoints;
    let start;

    loader.load('./start.txt', ( data ) => {
            startPoints = JSON.parse(data);

            var starsMaterial = new THREE.PointsMaterial( { color: 'red' } );
            var geometry = new THREE.Geometry();

            for(var i = 0; i < startPoints.length; i++)
            {
                geometry.vertices.push(new THREE.Vector3( startPoints[i].x * 20, startPoints[i].y * 20, startPoints[i].z * 20) );
            }

            start = new THREE.Points( geometry, starsMaterial );

            scene.add(start);
        }
    );

    let resultPoints;
    let result;

    loader.load('./points.txt', ( data ) => {
            resultPoints = JSON.parse(data);

            var starsMaterial = new THREE.PointsMaterial( { color: 'green' } );
            var geometry = new THREE.Geometry();

            for(var i = 0; i < resultPoints.length; i++)
            {
                geometry.vertices.push(new THREE.Vector3( resultPoints[i].x * 20, resultPoints[i].y * 20, resultPoints[i].z * 20) );
            }

            result = new THREE.Points( geometry, starsMaterial );

            scene.add(result);
        }
    );
    
    
    function loop() {        
        

        renderer.render(scene, camera);
        requestAnimationFrame(loop);
    }

    loop();
}