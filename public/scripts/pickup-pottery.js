//component is responsible for picking up the pottery piece and parenting it to the camera
AFRAME.registerComponent("pickup-pottery", {
    init: function () {
        const CONTEXT_AF = this;
        CONTEXT_AF.invisibleCone = document.querySelector("#invisible-cone");
        CONTEXT_AF.newParent = document.querySelector("#camera")

        CONTEXT_AF.handleClick = function() {
            const manager = document.querySelector('[manager]').components.manager;
            if(manager.canPickUp)
            {
                //play pick up sound
                CONTEXT_AF.el.setAttribute("sound", {src: "#pickUp_sound",
                                                    autoplay: true});

                //parenting the pottery piece to the camera
                CONTEXT_AF.el.object3D.parent = CONTEXT_AF.newParent.object3D;
                CONTEXT_AF.el.object3D.position.set(0.5, -0.5, -1);
                CONTEXT_AF.el.object3D.rotation.x = THREE.MathUtils.degToRad(-45);
                
                //once piece is picked up, the manager value needs to be updated
                manager.changeState(CAN_PICKUP, FALSE_STRING);
            }
            else {
                manager.handleIncorrectInteraction(PICKUP_ERROR);
            }
        }

        CONTEXT_AF.invisibleCone.addEventListener("click", this.handleClick)
    },

    remove: function() {
        //remove event listener once the pottery piece has been destroyed
        this.invisibleCone.removeEventListener("click", this.handleClick);
    }
});

