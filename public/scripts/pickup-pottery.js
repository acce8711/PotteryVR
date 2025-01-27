AFRAME.registerComponent("pickup-pottery", {
    schema: {
        enabled: {type: "boolean", default: "false"},
        pickedUp: {type: "boolean", default: "false"}
    },

    init: function () {
        const invisibleCone = document.querySelector("#invisible-cone");
        //using an arrow function for the event listener in order to be able to access the component's "this"
        invisibleCone.addEventListener("click", () => {
            //pick up pottery piece only if the wheel has stopped moving
            const wheelSpinning = document.querySelector("#button").getAttribute("wheel-spin").spinning;
            this.data.enabled = !wheelSpinning;
            if(this.data.enabled)
            {
                const newParent = document.querySelector("#camera");
                const child = this.el;
                child.object3D.parent = newParent.object3D;
                child.setAttribute("position", "0.7 -0.5 -0.5");
                child.setAttribute("rotation", "-45 0 0");
                
                //setting pickedUp from the manager component to true
                const manager = document.querySelector("#manager");
                manager.setAttribute("manager", "pickedUp: true");

                const piece = document.querySelector("#pottery-piece");
                piece.setAttribute("throw-piece", "");
            }
        })
    },
});

