AFRAME.registerComponent("manager", {
    schema: {
        canCreatePiece: {type: "boolean", default: "true"},
        canSpinWheel: {type: "boolean", default: "false"},
        pickedUp: {type: "boolean", default: "false"}
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
