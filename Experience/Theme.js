import {EventEmitter} from "events";

// Getting the toggle button element located at far right and up on the site. 
// On Theme's class constructor we set up the addEventListeners and when user clicks 
// we change between themes. (handled in style.css) 


export default class Theme extends EventEmitter{

    constructor(){
        super();
        
        this.theme = "light";

        
        this.toggleButton = document.querySelector(".toggle-button");
        this.toggleCircle = document.querySelector(".toggle-circle");

        this.setEventListeners();


        
    }

    setEventListeners(){
        this.toggleButton.addEventListener("click", () => {
            this.toggleCircle.classList.toggle("slide");
            this.theme = this.theme === "light" ? "dark" : "light";
            document.body.classList.toggle("dark-theme");
            document.body.classList.toggle("light-theme");
            //console.log(this.theme);
        
            this.emit("switch", this.theme)
        });
    }



}