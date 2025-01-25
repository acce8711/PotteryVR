//constants
const WHEEL_ROTATION_ANGLE = 360;


AFRAME.registerComponent("wheel-functionality", {
    schema: {
        spinning: {type: "boolean", default: "false"}
    },

    init: function () {
      //using an arrow function for the event listener in order to be able to access the component's "this"
      this.el.addEventListener("click", () => {

        const wheel = document.querySelector("#wheel-spin")
        const potteryModificationUI = document.querySelector("#sliders-overlay")

        //begin wheel spin and display the UI for modifying the pottery piece
        if(!this.data.spinning)
        {
            const currRotation = wheel.getAttribute("rotation");
            const destYRotation = currRotation.y + WHEEL_ROTATION_ANGLE;
            console.log(currRotation, destYRotation)
            wheel.setAttribute("animation", {enabled: true, 
                                             to: `0 ${destYRotation} 0`})

            potteryModificationUI.style.display = "block"
            this.data.spinning = true;
        }
        //if the wheel is already spinning then stop it AND hide UI for modifying the pottery piece
        else
        {
            wheel.setAttribute("animation", "enabled: false")
            potteryModificationUI.style.display = "none"
            this.data.spinning = false;
        }
      })
    },
});
