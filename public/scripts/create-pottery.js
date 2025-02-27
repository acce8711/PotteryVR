
//component for creating a pottery piece
AFRAME.registerComponent("create-pottery", {
    init: function () {
      const Context_AF = this;

      Context_AF.el.addEventListener("click", function(){
        const manager = document.querySelector('[manager]').components.manager;
        if(manager.canCreate){
            //creating the pottery piece element and appending to the wheel
            createPotteryPieceEntity();
            //once piece is created, the manager value needs to be updated
            manager.changeState(CAN_CREATE, FALSE_STRING);
        }
        else{
          manager.handleIncorrectInteraction(CLAY_ERROR);
        }
      })
    },
});

const createPotteryPieceEntity = function(){
  
    const wheelEl = document.querySelector("#wheel-spin");

    //create pottery piece parent entity
    const potteryPieceEl = document.createElement("a-entity");
    potteryPieceEl.object3D.position.set(0, WHEEL_HEIGHT + Y_OFFSET, 0);
    potteryPieceEl.id = "pottery-piece"
    potteryPieceEl.setAttribute("pickup-pottery", {});
    potteryPieceEl.setAttribute("sound", {src: "#clay_place",
                                          autoplay: true});
    potteryPieceEl.setAttribute("animation", {property: "position",
                                              from: `0 ${WHEEL_HEIGHT + 0.1} 0`,
                                              to: `0 ${WHEEL_HEIGHT + Y_OFFSET} 0`,
                                              dur: 300,
                                              easing: "easeInQuart"
    })

    //create outer cone entity
    const outerConeEl = document.createElement("a-cone");
    outerConeEl.object3D.position.set(0, CONE_HEIGHT/2, 0);
    outerConeEl.setAttribute("height", CONE_HEIGHT);
    outerConeEl.setAttribute("radius-bottom", OUTER_CONE_RADIUS);
    outerConeEl.setAttribute("radius-top", OUTER_CONE_RADIUS);
    outerConeEl.setAttribute("open-ended", true);
    outerConeEl.setAttribute("color", "rgb(176,108,68)");
    outerConeEl.id = "outer-cone";

    //create inner cone entity
    const innerConeEl = document.createElement("a-cone");
    innerConeEl.object3D.position.set(0, CONE_HEIGHT/2, 0);
    innerConeEl.setAttribute("height", CONE_HEIGHT);
    innerConeEl.setAttribute("radius-bottom", INNER_CONE_RADIUS);
    innerConeEl.setAttribute("radius-top", INNER_CONE_RADIUS);
    innerConeEl.setAttribute("open-ended", true);
    innerConeEl.setAttribute("material", "side: back");
    innerConeEl.setAttribute("color", "rgb(176,108,68)");
    innerConeEl.id = "inner-cone";

    //create top ring entity
    const topRingEl = document.createElement("a-ring");
    topRingEl.object3D.position.set(0, CONE_HEIGHT, 0);
    topRingEl.object3D.rotation.x = THREE.MathUtils.degToRad(90);
    topRingEl.setAttribute("radius-outer", OUTER_RING_RADIUS);
    topRingEl.setAttribute("radius-inner", INNER_RING_RADIUS);
    topRingEl.setAttribute("material", "side: back");
    topRingEl.setAttribute("segments-theta", "36");
    topRingEl.setAttribute("color", "rgb(176,108,68)");
    topRingEl.id = "top-ring";

    //create bottom circle entity
    const bottomRingEl = document.createElement("a-circle");
    bottomRingEl.object3D.rotation.x = THREE.MathUtils.degToRad(90);
    bottomRingEl.setAttribute("radius", OUTER_RING_RADIUS);
    bottomRingEl.setAttribute("material", "side: double");
    bottomRingEl.setAttribute("color", "rgb(176,108,68)");
    bottomRingEl.id = "bottom-circle";

    //create invisible cone to handle click events for pottery pick-up
    const invisibleConeEl = document.createElement("a-cone");
    invisibleConeEl.object3D.position.set(0, CONE_HEIGHT/2, 0);
    invisibleConeEl.setAttribute("radius-bottom", OUTER_CONE_RADIUS);
    invisibleConeEl.setAttribute("radius-top",  OUTER_CONE_RADIUS);
    invisibleConeEl.setAttribute("height", CONE_HEIGHT);
    invisibleConeEl.setAttribute("material", {transparent: true,
                                              opacity: 0});
    invisibleConeEl.id = "invisible-cone";
    invisibleConeEl.className = "interactive";


    //append pottery entity shapes to the parent
    potteryPieceEl.append(outerConeEl, innerConeEl, topRingEl, bottomRingEl, invisibleConeEl);
    //append the pottery parent to the wheel
    wheelEl.appendChild(potteryPieceEl);
}