import Experience from "../Experience.js";
import * as THREE from "three";
import GSAP from "gsap";

export default class Room{

    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
      
        this.setFloor();
        this.setCircles();
    }

    setFloor(){
        this.geometry = new THREE.PlaneGeometry(100, 100);
        this.material = new THREE.MeshStandardMaterial({
            color: 0xffffff,
        });
        this.plane = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.plane);
        this.plane.receiveShadow = true;


    }


    setCircles(){
        const geometry = new THREE.CircleGeometry( 5, 64 );
        const materialFirst = new THREE.MeshStandardMaterial( { color: 0x8ea1cc } );
        const materialSecond = new THREE.MeshStandardMaterial( { color: 0x333332 } );
        const materialThird = new THREE.MeshStandardMaterial( { color: 0x7ad0ac } );
        this.circleFirst = new THREE.Mesh( geometry, materialFirst );
        this.circleSecond = new THREE.Mesh( geometry, materialSecond );
        this.circleThird = new THREE.Mesh( geometry, materialThird );

        this.circleFirst.position.y = -0.29;
        this.circleSecond.position.y = -0.28;
        this.circleThird.position.y = -0.27;

        this.circleFirst.scale.set(0,0,0);
        this.circleSecond.scale.set(0,0,0);
        this.circleThird.scale.set(0,0,0);

        this.circleFirst.rotation.x = this.circleSecond.rotation.x = this.circleThird.rotation.x = -Math.PI / 2;
        this.circleFirst.receiveShadow = this.circleSecond.receiveShadow = this.circleThird.receiveShadow = true;
        
        
        this.scene.add(this.circleFirst);
        
        this.scene.add(this.circleSecond);
        
        this.scene.add(this.circleThird);


    }


    resize()
    {
        
    } 

    update()
    {
        

    }

}