import Experience from "../Experience.js";
import * as THREE from "three";
import GSAP from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import ASScroll from '@ashthornton/asscroll';

/*
    Use of GSAP based on sections catecorized in index.html
    1. lerping/manipulating 3D object (position rotation scale) etc.
    2. triggering the UI elements to change while scrolling 
*/
// This code needs some clean up. 

export default class Controls{

    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.camera = this.experience.camera;

        this.room = this.experience.world.room.actualRoom;

        this.circleFirst = this.experience.world.floor.circleFirst;
        this.circleSecond = this.experience.world.floor.circleSecond;
        this.circleThird = this.experience.world.floor.circleThird;
        GSAP.registerPlugin(ScrollTrigger);

        this.setScrollTrigger();
        this.setSmoothScroll();
        // this.progress = 0
        // this.dummyCurve = new THREE.Vector3(0,0,0);

       

        // this.position = new THREE.Vector3(0,0,0);
        // this.lookAtPosition = new THREE.Vector3(0,0,0);

        // this.directionalVector = new THREE.Vector3(0,0,0);
        // this.staticVector = new THREE.Vector3(0,-1,0);
        // this.crossVector = new THREE.Vector3(0,0,0);

        //this.setPath();
        //this.onWheel();
    }


    setupASScroll() {
        // https://github.com/ashthornton/asscroll
        const asscroll = new ASScroll({
            ease: 0.2,
            disableRaf: true 
        });
      
      
        GSAP.ticker.add(asscroll.update);
      
        ScrollTrigger.defaults({
          scroller: asscroll.containerElement });
      
      
        ScrollTrigger.scrollerProxy(asscroll.containerElement, {
          scrollTop(value) {
            if (arguments.length) {
              asscroll.currentPos = value;
              return;
            }
            return asscroll.currentPos;
          },
          getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
          },
          fixedMarkers: true });
      
      
        asscroll.on("update", ScrollTrigger.update);
        ScrollTrigger.addEventListener("refresh", asscroll.resize);
      
        requestAnimationFrame(() => {
          asscroll.enable({
            newScrollElements: document.querySelectorAll(".gsap-marker-start, .gsap-marker-end, [asscroll]") });
      
        });
        return asscroll;
    }


    setSmoothScroll(){
        this.asscrol = this.setupASScroll();
    }


    setScrollTrigger(){
        ScrollTrigger.matchMedia({
	
            // Desktop
            "(min-width: 969px)": () => {

                
                // Resets
                this.room.position.set(6,2,8);
                this.room.scale.set(2,2,2);

                // First Section -----------------------------------------------
                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                      trigger: ".first-move",
                      start: "top top",
                      end: "bottom bottom",
                      scrub: 0.6,
                      invalidateOnRefresh: true,  
                    },
                });
                this.firstMoveTimeline.to(this.room.position, {
                    x: () =>{
                        return this.sizes.width * 0.01;
                    }
                },"same");
                this.firstMoveTimeline.to(this.room.rotation, 
                    {
                        y: 1,
                    }, 
                    "same"
                );


                // Second Section -----------------------------------------------
                this.secondMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                      trigger: ".second-move",
                      start: "top top",
                      end: "bottom bottom",
                      scrub: 0.8,
                      invalidateOnRefresh: true,  
                    },
                },"same");
                this.secondMoveTimeline.to(this.room.position, 
                    {
                        x: () =>{
                            return 1;
                        },
                        z: () => {
                            return this.sizes.height * 0.02;
                        },
                    }, 
                    "same"
                );
                this.secondMoveTimeline.to(this.room.scale, 
                    {
                        x: 1.3,
                        y: 1.3,
                        z: 1.3,
                    }, 
                    "same"
                );
                this.secondMoveTimeline.to(this.room.rotation, 
                    {
                        y: -0.8,
                    }, 
                    "same"
                );

                // Third Section -----------------------------------------------
                this.thirdMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                      trigger: ".third-move",
                      start: "top top",
                      end: "bottom bottom",
                      scrub: 0.6,
                      invalidateOnRefresh: true,  
                    },
                },"same");
                this.thirdMoveTimeline.to(this.room.position, {
                    x: () =>{
                        return this.sizes.width * 0.007;
                    },
                    y: () =>{
                        return this.sizes.width * 0.002;
                    }
                },"same");
                this.thirdMoveTimeline.to(this.room.scale, 
                    {
                        x: 1.9,
                        y: 1.9,
                        z: 1.9,
                    }, 
                    "same"
                );
                this.thirdMoveTimeline.to(this.room.rotation, 
                    {
                        y: 0.1,
                    }, 
                    "same"
                );


            },

            // Mobile
            "(max-width: 968px)": () => {
            
                // Resets
                this.room.position.set(3,2,8);
                this.room.scale.set(1,1,1);
                this.room.rotation.y = 0.7;

                // First Section -----------------------------------------------
                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                      trigger: ".first-move",
                      start: "top top",
                      end: "bottom bottom",
                      scrub: 0.6,
                      invalidateOnRefresh: true,  
                    },
                },"same").to(this.room.scale, 
                    {
                        x: 1,
                        y: 1,
                        z: 1,
                    }, 
                ).to(this.room.position, {
                    x: 3,
                },"same" );
                this.firstMoveTimeline.to(this.room.rotation, 
                    {
                        y: 0.7,
                    }, 
                    "same"
                );


                // Second Section -----------------------------------------------
                this.secondMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                      trigger: ".second-move",
                      start: "top top",
                      end: "bottom bottom",
                      scrub: 0.8,
                      invalidateOnRefresh: true,  
                    },
                },"same").to(this.room.scale, 
                    {
                        x: 2,
                        y: 2,
                        z: 2,
                    }, 
                );
                this.secondMoveTimeline.to(this.room.rotation, 
                    {
                        y: 0.1,
                    }, 
                    "same"
                );
                // Third Section -----------------------------------------------
                this.thirdMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                      trigger: ".third-move",
                      start: "top top",
                      end: "bottom bottom",
                      scrub: 0.6,
                      invalidateOnRefresh: true,  
                    },
                },"same").to(this.room.position, {
                    x: 5,
                },"same" );
                this.thirdMoveTimeline.to(this.room.rotation, 
                    {
                        y: -0.1,
                    }, 
                    "same"
                );

            },
          
            
              
            // all 
            "all": function() {
                this.sections = document.querySelectorAll(".section");
                this.sections.forEach((section) =>
                {
                    this.progressWrapper = section.querySelector(".progress-wrapper");
                    this.progressBar = section.querySelector(".progress-bar");
                
                    if(section.classList.contains("right")){
                        GSAP.to(section, {
                            borderTopLeftRadius: 10,
                            scrollTrigger: {
                                trigger: section,
                                start: "top bottom",
                                end: "top top",
                                scrub: 0.6,
                            }
                        });
                        GSAP.to(section, {
                            borderBottomLeftRadius: 700,
                            scrollTrigger: {
                                trigger: section,
                                start: "bottom bottom",
                                end: "bottom top",
                                scrub: 0.6,
                            }
                        });
                    } else {
                        GSAP.to(section, {
                            borderTopRightRadius: 10,
                            scrollTrigger: {
                                trigger: section,
                                start: "top bottom",
                                end: "top top",
                                scrub: 0.6,
                            }
                        });
                        GSAP.to(section, {
                            borderBottomRightRadius: 700,
                            scrollTrigger: {
                                trigger: section,
                                start: "bottom bottom",
                                end: "bottom top",
                                scrub: 0.6,
                            }
                        });
                    }

                    GSAP.from(this.progressBar, {
                        scaleY: 0,
                        scrollTrigger: {
                            trigger: section,
                            start: "top top",
                            end: "bottom bottom",
                            scrub: 0.4,
                            pin: this.progressWrapper,
                            pinSpacing: false,
                        }
                    });



                    

                });


                /*To fix - undefined world*/
                //Circle Animations
                // First Section -----------------------------------------------
                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".first-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,  
                    },
                })
                /*
                .to(this.circleFirst.scale.set, {
                    x: 3,
                    y: 3,
                    z: 3,
                });
*/

                // Second Section -----------------------------------------------
                this.secondMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".second-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.8,
                        invalidateOnRefresh: true,  
                    },
                })
                /*.to(this.circleSecond.scale.set, {
                    x: 3,
                    y: 3,
                    z: 3,
                });
*/
                // Third Section -----------------------------------------------
                this.thirdMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".third-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,  
                    },
                }).to(this.circleThird.scale,{
                    x: 3,
                    y: 3,
                    z: 3,
                });
                
    
            }


            
              
          });



    }
    /*
    setPath(){
        //Create a closed wavey loop
         this.curve = new THREE.CatmullRomCurve3( 
            [
            new THREE.Vector3( 0, 0, 8 ),
            new THREE.Vector3( 0, 0, 7 ),
            new THREE.Vector3( 1.2, 0, 7 ),
            new THREE.Vector3( 1.5, 1, 6 ),
            new THREE.Vector3( 3, 1, 5 ),
            new THREE.Vector3( 3, 0, 6 ),
            new THREE.Vector3( -1.5, 0, 6 ),
            new THREE.Vector3( -3, 0, 6 ),
            ],
            true
        );


        const points = this.curve.getPoints( 50 );
        const geometry = new THREE.BufferGeometry().setFromPoints( points );

        const material = new THREE.LineBasicMaterial( { color: 0xff0000 } );

        // Create the final object to add to the scene
        const curveObject = new THREE.Line( geometry, material );

        this.scene.add(curveObject);

    }
    */

    /*
    onWheel(){
        window.addEventListener("wheel", (e) => {
            if(e.deltaY > 0){
                this.lerp.target += 0.01;
                this.back = false;
            }else{
                this.lerp.target -= 0.01;
                this.back = true;
            }
        });
    }
    */


    resize(){
        
    }
    

    update(){
        

        /*
        this.curve.getPointAt(this.lerp.current % 1, this.position);
        this.camera.orthographicCamera.position.copy(this.position);


        this.directionalVector.subVectors(
            this.curve.getPointAt((this.lerp.current % 1) + 0.000001),
            this.position,
        );

        this.directionalVector.normalize();
        this.crossVector.crossVectors(this.directionalVector, this.staticVector);

        this.crossVector.multiplyScalar(100000);
        this.camera.orthographicCamera.lookAt(this.crossVector);

        /*
        if (this.back){
            this.lerp.target -= 0.0001;
        }else{
            this.lerp.target += 0.0001;
        }
        
        /*
        //this.lerp.target += 0.001;
        this.lerp.target = GSAP.utils.clamp(0,1,this.lerp.target);
        this.lerp.current = GSAP.utils.clamp(0,1,this.lerp.current);
        this.curve.getPointAt(this.lerp.current, this.position);

        this.curve.getPointAt(this.lerp.current + 0.00001, this.lookAtPosition);
        

        this.camera.orthographicCamera.position.copy(this.position);
        this.camera.orthographicCamera.lookAt(this.lookAtPosition);
    }
    */
    }
}