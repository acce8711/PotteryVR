//component for starting and pausing the wheel spin AND showing or hiding the pottery modification UI
AFRAME.registerComponent("wheel-spin", {
    init: function () {
      //using an arrow function for the event listener in order to be able to access the component's "this"
      this.el.addEventListener("click", () => {

        const manager = document.querySelector('[manager]').components.manager;
        if(manager.canSpin)
        {
            
            const spinning = manager.spinning;
            console.log(spinning)
            const wheel = document.querySelector("#wheel-spin")
            const potteryModificationUI = document.querySelector("#sliders-overlay")

            //begin wheel spin AND display the UI for modifying the pottery piece
            if(!spinning)
                {
                    const currRotation = wheel.getAttribute("rotation");
                    const destYRotation = currRotation.y + WHEEL_ROTATION_ANGLE;
                    wheel.setAttribute("animation", {enabled: true, 
                                                    to: `0 ${destYRotation} 0`})
        
                    potteryModificationUI.style.display = "block"
                    
                    //once wheel is spinning, the manager value needs to be updated
                    manager.changeState(SPINNING, TRUE_STRING);
                }
            //if the wheel is already spinning then stop it AND hide UI for modifying the pottery piece
            else
            {
                wheel.setAttribute("animation", "enabled: false")
                potteryModificationUI.style.display = "none"
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
