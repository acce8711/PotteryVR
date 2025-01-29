AFRAME.registerComponent("manager", {
    schema: {
        canCreate: {type: "boolean", default: "true"},
        canSpin: {type: "boolean", default: "false"},
        canPickUp: {type: "boolean", default: "false"},
        canPlace: {type: "boolean", default: "false"},
        canThrow: {type: "boolean", default:"false"}
    },

    init: function() {
        //event listeners for different colliders 
        
        //collision detection for the shelf
        const shelfCollider = document.querySelector("#collider1");
        shelfCollider.addEventListener("obbcollisionstarted", () => {
            //if the pottery piece is currently picked up then it can be placed down
            if (this.data.pickedUp)
            {
                const shelf = document.querySelector("#shelf");
                shelf.setAttribute("place-piece", "");
            }
        })
    }

});
