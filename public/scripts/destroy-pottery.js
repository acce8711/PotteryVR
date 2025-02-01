//component handles destroying of the pottery piece and displaying the particle effect
AFRAME.registerComponent("destroy-pottery", {
    init: function(){
        const Context_AF = this;

        Context_AF.collideHandler = function() {
            
            const worldPosition = new THREE.Vector3();
            Context_AF.el.object3D.getWorldPosition(worldPosition);
            
            //trigger the particle when the piece hits a surface
            const particleContainer = document.querySelector("#particle-container");
            particleContainer.object3D.position.set(worldPosition.x, worldPosition.y, worldPosition.z * 1.09);
            particleContainer.setAttribute("particle-system", {enabled: false})
            particleContainer.setAttribute("particle-system", {enabled: true, duration: "0.1"});

            //once piece is destroyed, the manager value needs to be updated
            const manager = document.querySelector('[manager]').components.manager;
            manager.changeState(CAN_THROW, FALSE_STRING);

            Context_AF.el.parentNode.removeChild(Context_AF.el);
        }

        Context_AF.el.addEventListener("obbcollisionstarted", Context_AF.collideHandler);
    },

    remove: function() {
        //removing the event listener when the pottery piece is destroyed
        this.el.removeEventListener("obbcollisionstarted", this.collideHandler);
    }
}) 