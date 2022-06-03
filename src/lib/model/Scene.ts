import { browser } from "$app/env";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { 
    Scene as ThreeScene, PerspectiveCamera, 
    WebGLRenderer, Group, Color, PointLight, 
    AxesHelper, PlaneGeometry, Mesh, Vector3,
    DoubleSide, MeshBasicMaterial, Box3, Texture, TextureLoader, BoxHelper
} from "three";

export default class Scene {

    private container: HTMLCanvasElement;

    private model: Group|null;

    private scene = new ThreeScene();
    private camera: PerspectiveCamera;
    private renderer: WebGLRenderer;

    constructor(container: HTMLCanvasElement){
        // Set container property :
        this.container = container;

        // Set the scene background (based on the container background) :
        //this.scene.background = new Color(0x29272B); // TODO : this.container.style.backgroundColor
        new TextureLoader().load("/static/models/background.jpg", texture => {
            this.scene.background = texture;  
        });

        // Create the camera :
        this.camera = new PerspectiveCamera(undefined, this.container.offsetHeight / this.container.offsetWidth);

        // Set the renderer property :
        this.renderer = new WebGLRenderer({ antialias: true, canvas: container });

        // Add window events :
        if(browser) window.addEventListener("resize", () => this.resize());
    }

    /* PUBLIC FUNCTIONS */

    public async loadModel(modelPath: string, type: "gltf" = "gltf") : Promise<void> {
        this.model = (await new GLTFLoader().loadAsync(modelPath)).scene;
    }

    public loadScene() : void { // TODO : clean and split this
        // Camera position :
        this.camera.position.x = 10;

        // Model / model bounding box :        
        const boundingBox = new Box3().setFromObject(this.model);
        const modelSize = boundingBox.getSize(new Vector3());

        this.model.position.y = -(modelSize.y / 2);

        this.scene.add(this.model);

        // Light :
        const lights = [
            new PointLight(0xffffff, 5),
            new PointLight(0xffffff, 5),
            new PointLight(0xffffff, 5),
            new PointLight(0xffffff, 5),
        ];
        
        lights[0].position.set(this.model.position.x, this.model.position.y + 6, this.model.position.z + 10);
        lights[1].position.set(this.model.position.x, this.model.position.y + 6, this.model.position.z - 10);
        lights[2].position.set(this.model.position.x + 10, this.model.position.y + 6, this.model.position.z);
        lights[3].position.set(this.model.position.x - 10, this.model.position.y + 6, this.model.position.z);
    
        lights.forEach(light => {
            this.scene.add(light);
            //this.scene.add(new PointLightHelper(light, 1));
        });

        // Helpers :
        // this.scene.add(new AxesHelper(5));
        // this.scene.add(new BoxHelper(this.model));

        // Add floor :
        const plane = new Mesh(
            new PlaneGeometry(200, 200), 
            new MeshBasicMaterial({color: 0x4F0E81, side: DoubleSide})
        );
        
        plane.rotateX(Math.PI / 2);
        plane.position.y = -(modelSize.y / 2);

        this.scene.add(plane);

        // Controls :
        const controls = new OrbitControls(this.camera, this.container);

        controls.minDistance = 5;
        controls.maxDistance = 15;

        controls.minPolarAngle = 0;
        controls.maxPolarAngle = Math.PI / 2 + 
            Math.abs(Math.asin(this.model.position.y / 2 / 
            ((controls.maxDistance + controls.minDistance) / 2)));

        // Renderer : 
        this.animate();
        this.resize();
    }

    /* PRIVATES FUNCTIONS */

    private resize() : void {
        this.renderer.setSize(this.container.offsetHeight, this.container.offsetWidth);

        this.camera.aspect = this.container.offsetHeight / this.container.offsetWidth;
        
        this.camera.updateProjectionMatrix();
    }

    private animate() : void {
        const self = this;

        const animateFunc = function() : void {
            requestAnimationFrame(animateFunc);

            self.renderer.render(self.scene, self.camera);
        }

        animateFunc();
    }
}