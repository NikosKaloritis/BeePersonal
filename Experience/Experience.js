import * as THREE from "three";

import Sizes from "./Utils/Sizes.js";
import Time from "./Utils/Time.js";

import Resources from "./Utils/Resources.js";
import assets from "./Utils/Assets.js"; 

import Camera from "./Camera.js";
import Renderer from "./Renderer.js";

import Theme from "./Theme.js";
import World from "./World/World.js";


/*
    This project attempts to implement a form of a singleton pattern for the Experience class,
    ensuring that only one instance is created. It helps maintain a single, consistent state across the entire application.
*/

export default class Experience{
    
    static instance;

    constructor(canvas){
        if(Experience.instance){
            return Experience.instance;
        }
        Experience.instance = this;
        this.canvas = canvas;
        this.scene = new THREE.Scene();
        this.time = new Time(); 
        this.sizes = new Sizes();
        this.camera = new Camera();
        this.renderer = new Renderer();
        this.resources = new Resources(assets)
        this.theme = new Theme();
        this.world = new World();

        this.time.on("update", ()=>{
            this.update();
        });
 
        this.sizes.on("resize", ()=>{
            this.resize();
        });
    }

    update(){
        this.camera.update();
        this.world.update();
        this.renderer.update();
    }

    resize(){
        this.camera.resize();
        this.world.resize();
        this.renderer.resize();
    }

}