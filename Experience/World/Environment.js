import Experience from "../Experience.js";
import * as THREE from "three";
import GSAP from "gsap";
import GUI from "lil-gui";

export default class Environment{

    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;

        //this.gui = new GUI();
        this.obj = {
            colorObj: {r: 0, g:0, b:0},
            intensity: 3,
        };

        this.setSunlight();
        //this.setGui();
    }

    setSunlight(){
        this.sunLight = new THREE.DirectionalLight("#FFFFFF", 5);
        this.sunLight.castShadow = true;
        this.sunLight.shadow.camera.far = 20;
        this.sunLight.shadow.mapSize.set(2048,2048);
        this.sunLight.shadow.normalBias = 0.05;
        
        //helper for directional light
        //const ss = new THREE.CameraHelper(this.sunLight.shadow.camera);
        //this.scene.add(ss);
        
        this.sunLight.position.set(0, 0, 5);
        this.scene.add(this.sunLight);

        this.ambientLight = new THREE.AmbientLight("#622D62", 4);
        this.ambientLight.position.set(-1,-1,3);
        this.scene.add(this.ambientLight);
    }
    

    switchTheme(theme){
        if(theme === "dark"){
            GSAP.to(this.sunLight.color, {
                r: 0.043137254901960784,
                b: 0.07450980392156863,
                g: 0.050980392156862744,
            });
            GSAP.to(this.ambientLight.color, {
                r: 0.043137254901960784,
                b: 0.07450980392156863,
                g: 0.050980392156862744,
            });
            GSAP.to(this.sunLight, {
                intensity: 4,
            });
            GSAP.to(this.ambientLight, {
                intensity: 4,
            });
        }else{
            GSAP.to(this.sunLight.color, {
                r: 1,
                g: 1,
                b: 1,
            });
            GSAP.to(this.ambientLight.color, {
                r: 1,
                g: 1,
                b: 1,
            });
            GSAP.to(this.sunLight, {
                intensity: 7,
            });
            GSAP.to(this.ambientLight, {
                intensity: 7,
            });
        }
    }


    setGui(){
        this.gui.addColor(this.obj, "colorObj").onChange(()=>{
            this.sunLight.color.copy(this.obj.colorObj);
            this.ambientLight.color.copy(this.obj.colorObj);
            console.log(this.obj.colorObj);
        });
        this.gui.add(this.obj, "intensity", 0, 10).onChange(()=>{
            this.sunLight.intensity = this.obj.intensity;
            this.ambientLight.intensity = this.obj.intensity;
        });
    }

    resize(){
        
    }
    

    update(){
        
    }

}