//component for starting and pausing the wheel spin AND showing or hiding the pottery modification UI
AFRAME.registerComponent("wheel-spin", {
    init: function () {
      const Context_AF = this;
      Context_AF.wheel = document.querySelector("#wheel-spin");
      Context_AF.potteryModificationUI = document.querySelector("#sliders-overlay");
      Context_AF.wheelSound = document.querySelector('[sound__wheel]')
      this.el.addEventListener("click", function(){
        const manager = document.querySelector('[manager]').components.manager;
        if(manager.canSpin)
        {
            const spinning = manager.spinning;

            //begin wheel spin AND display the UI for modifying the pottery piece
            if(!spinning)
                {
                    //play the wheel sound
                    Context_AF.wheelSound.components.sound__wheel.playSound();

                    //animate the wheel
                    const currRotation = Context_AF.wheel.getAttribute("rotation");
                    const destYRotation = currRotation.y + WHEEL_ROTATION_ANGLE;
                    Context_AF.wheel.setAttribute("animation", {enabled: true, 
                                                    to: `0 ${destYRotation} 0`})
        
                    //display pottery modification UI
                    Context_AF.potteryModificationUI.style.display = "flex";
                    
                    //once wheel is spinning, the manager value needs to be updated
                    manager.changeState(SPINNING, TRUE_STRING);
                }
            //if the wheel is already spinning then stop it AND hide UI for modifying the pottery piece
            else
            {
                //turn off the wheel sound
                Context_AF.wheelSound.components.sound__wheel.stopSound();

                //stop wheel animation
                Context_AF.wheel.setAttribute("animation", "enabled: false");

                //hide pottery modification UI
                Context_AF.potteryModificationUI.style.display = "none";

                //once wheel has stopped spinning, the manager value needs to be updated
                manager.changeState(SPINNING, FALSE_STRING);
            }
        }
        else {
            manager.handleIncorrectInteraction(WHEEL_ERROR);
        }
      })
    }
});
