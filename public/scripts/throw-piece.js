//component handles the physics behind throwing the pottery piece
AFRAME.registerComponent("throw-piece", {
    init: function(){
        const Context_AF = this;
        Context_AF.lastClick = new Date();
        Context_AF.room = document.querySelector("#room");
        Context_AF.cursorPos = {x: 0, y: 0, z: 0};
        Context_AF.aimClickHandler = function (event){
            //check for a double click
            const currClick = new Date();
            const doubleClick = (currClick - Context_AF.lastClick) < 500;
            Context_AF.lastClick = currClick;

            const manager = document.querySelector('[manager]').components.manager;

            if(manager.canThrow && doubleClick)
            {
                const potteryPiece = document.querySelector("#pottery-piece");
                const worldPosition = new THREE.Vector3();
                potteryPiece.object3D.getWorldPosition(worldPosition);

                //get the cursor intersection point
                Context_AF.cursorPos = event.detail.intersection.point;

                //create a vector between the camera and the cursor position (target)
                //this vector will represent the target throw direction
                const direction = new THREE.Vector3(Context_AF.cursorPos.x - worldPosition.x, Context_AF.cursorPos.y - worldPosition.y, Context_AF.cursorPos.z - worldPosition.z);

                //add dynamic body component 
                potteryPiece.setAttribute("ammo-body", {type: "dynamic"});
                potteryPiece.setAttribute("obb-collider", {size: "0.4 0.4 0.4"})
                const invisible = document.querySelector("#invisible-cone");

                //throw the piece in the direction of the cursor
                const x = direction.x * 2.5;
                const z = direction.z * 2.5;
                const y = direction.y * 2.5;
                const force = new Ammo.btVector3(x, y, z);
                const pos = new Ammo.btVector3(worldPosition.x, worldPosition.y, worldPosition.z);
                potteryPiece.body.applyImpulse(force, pos);
                Ammo.destroy(force);
                Ammo.destroy(pos);
                
                //add event collision component when the pottery piece has been thrown
                potteryPiece.setAttribute("destroy-pottery", "");
            }
        }
        
        Context_AF.room.addEventListener("click", Context_AF.aimClickHandler);
    },
}
)
