AFRAME.registerComponent("pickup-pottery", {
    init: function () {
        this.invisibleCone = document.querySelector("#invisible-cone");
        const CONTEXT_AF = this;
        this.handleClick = function() {
            const canPickUp = document.querySelector("#manager").getAttribute("manager").canPickUp;
            console.log("canpickup", canPickUp)
            if(canPickUp)
            {
                const newParent = document.querySelector("#camera");
                const child = CONTEXT_AF.el;
                child.object3D.parent = newParent.object3D;
                //CHANGE
                child.setAttribute("position", "0.7 -0.5 -0.5");
                child.setAttribute("rotation", "-45 0 0");
                
                //once piece is picked, the manager value needs to be updated
                var manager = document.querySelector('[manager]').components.manager;
                manager.updateSchemaProperty(CAN_PICKUP, FALSE_STRING);
            }
        }

        //using an arrow function for the event listener in order to be able to access the component's "this"
        this.invisibleCone.addEventListener("click", this.handleClick)
    },

    remove: function() {
        this.invisibleCone.removeEventListener("click", this.handleClick);
    }
});

