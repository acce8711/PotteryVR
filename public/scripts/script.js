//constants
const WHEEL_ROTATION_ANGLE = 360;
const WHEEL_HEIGHT = 0.1;

// const OUTER_CONE_RADIUS = 0.5;
// const INNER_CONE_RADIUS = 0.4;
// const OUTER_RING_RADIUS = 0.5;
// const INNER_RING_RADIUS = 0.4;
const CONE_HEIGHT = 1.4;


//component for starting and pausing the wheel spin AND showing or hiding the pottery modification UI
AFRAME.registerComponent("create-pottery", {
    schema: {
        enabled: {type: "boolean", default: "true"}
    },

    init: function () {
      //using an arrow function for the event listener in order to be able to access the component's "this"
      this.el.addEventListener("click", () => {

        const wheel = document.querySelector("#wheel-spin")
        const potteryModificationUI = document.querySelector("#sliders-overlay")

        if(this.data.enabled)
        {
            createPotteryPieceEntity();
            //hmm is this a bad practice?
            this.data.enabled = false;
        }
      })
    },
});

const createPotteryPieceEntity = function(){
    console.log("hello")
    const wheelEl = document.querySelector("#wheel-spin");

    //create pottery piece parent entity
    const potteryPieceEl = document.createElement("a-entity");
    potteryPieceEl.setAttribute("position", `0 ${WHEEL_HEIGHT} 0`);
    potteryPieceEl.id = "pottery-piece"

    //create outer cone entity
    const outerConeEl = document.createElement("a-cone");
    outerConeEl.id = "outer-cone";
    outerConeEl.object3D.position.set(0, CONE_HEIGHT/2, 0);
    outerConeEl.setAttribute("height", CONE_HEIGHT);
    outerConeEl.setAttribute("radius-bottom", OUTER_CONE_RADIUS);
    outerConeEl.setAttribute("radius-top", OUTER_CONE_RADIUS);
    outerConeEl.setAttribute("open-ended", true);

    //create inner cone entity
    const innerConeEl = document.createElement("a-cone");
    innerConeEl.id = "inner-cone";
    innerConeEl.object3D.position.set(0, CONE_HEIGHT/2, 0);
    innerConeEl.setAttribute("height", CONE_HEIGHT);
    innerConeEl.setAttribute("radius-bottom", INNER_CONE_RADIUS);
    innerConeEl.setAttribute("radius-top", INNER_CONE_RADIUS);
    innerConeEl.setAttribute("open-ended", true);
    innerConeEl.setAttribute("material", "side: back");

    //create top ring entity
    const topRingEl = document.createElement("a-ring");
    topRingEl.id = "top-ring";
    topRingEl.object3D.position.set(0, CONE_HEIGHT, 0);
    topRingEl.object3D.rotation.x = THREE.MathUtils.degToRad(90);
    topRingEl.setAttribute("radius-outer", OUTER_RING_RADIUS);
    topRingEl.setAttribute("radius-inner", INNER_RING_RADIUS);
    topRingEl.setAttribute("material", "side: back");
    topRingEl.setAttribute("segments-theta", "36");

    //create bottom circle entity
    const bottomRingEl = document.createElement("a-circle");
    bottomRingEl.id = "bottom-circle";
    bottomRingEl.object3D.position.set(0, 0.1, 0);
    bottomRingEl.setAttribute("radius", OUTER_RING_RADIUS);
    bottomRingEl.setAttribute("material", "side: double");
    bottomRingEl.setAttribute("segments-theta", "36");

    //append pottery entity shapes to the parent
    potteryPieceEl.append(outerConeEl, innerConeEl, topRingEl, bottomRingEl);
    //append the pottery parent to the wheel
    wheelEl.appendChild(potteryPieceEl);

}

//component for starting and pausing the wheel spin AND showing or hiding the pottery modification UI
AFRAME.registerComponent("wheel-functionality", {
    schema: {
        spinning: {type: "boolean", default: "false"},
        enabled: {type: "boolean", default: "false"}
    },

    init: function () {
      //using an arrow function for the event listener in order to be able to access the component's "this"
      this.el.addEventListener("click", () => {

        const wheel = document.querySelector("#wheel-spin")
        const potteryModificationUI = document.querySelector("#sliders-overlay")

        if(this.enabled)
        {
            //begin wheel spin AND display the UI for modifying the pottery piece
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
        }
      })
    },
});
