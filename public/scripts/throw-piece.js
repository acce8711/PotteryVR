AFRAME.registerComponent("throw-piece", {
    init: function(){
        const Context_AF = this;
        Context_AF.room =  document.querySelector("#room");
        Context_AF.furniture =  document.querySelector("#furniture");
        
        Context_AF.room.addEventListener("click", function(event){
            //get the cursor intersection point
            console.log("hello")
            const cursorPos = event.detail.intersection.point;
            throwPiece(cursorPos, Context_AF);
        })

        Context_AF.furniture.addEventListener("click", function(event){
            //get the cursor intersection point
            console.log("furniture")
            // const cursorPos = event.detail.intersection.point;
            // throwPiece(cursorPos, Context_AF);
        })

        // Context_AF.wallZPositive.addEventListener("click", function(event){
        //     //get the cursor intersection point
        //     const cursorPos = event.detail.intersection.point;
        //     throwPiece(cursorPos, Context_AF);
        // })

        // Context_AF.wallXNegative.addEventListener("click", function(event){
        //     //get the cursor intersection point
        //     const cursorPos = event.detail.intersection.point;
        //     throwPiece(cursorPos, Context_AF);
        // })

        // Context_AF.wallXPositive.addEventListener("click", function(event){
        //     //get the cursor intersection point
        //     const cursorPos = event.detail.intersection.point;
        //     throwPiece(cursorPos, Context_AF);
        // })
    }
}
)

const throwPiece = function(cursorPos, Context_AF)
{
    const canThrow = document.querySelector("#manager").getAttribute("manager").canThrow;
    if(canThrow)
    {
        const worldPosition = new THREE.Vector3();
        Context_AF.el.object3D.getWorldPosition(worldPosition);

        //create a vector between the camera and the cursor position (target)
        //this vector will represent the target throw direction
        const direction = new THREE.Vector3(cursorPos.x - worldPosition.x, cursorPos.y - worldPosition.y, cursorPos.z - worldPosition.z);

        //add dynamic body component 
        Context_AF.el.setAttribute("ammo-body", {type: "dynamic", emitCollisionEvents: true});
        Context_AF.el.setAttribute("ammo-shape", {type: "sphere", fit: "manual", sphereRadius: 0.4});

        //throw the piece in the direction of the cursor
        const x = direction.x * 4;
        const z = direction.z * 4;
        const y = direction.y * 4;
        const force = new Ammo.btVector3(x, y, z);
        const pos = new Ammo.btVector3(worldPosition.x, worldPosition.y, worldPosition.z);
        Context_AF.el.body.applyImpulse(force, pos);
        
        //add event collision component when the pottery piece has been thrown
        Context_AF.el.setAttribute("destroy-pottery", "");
    }
}

AFRAME.registerComponent("destroy-pottery", {
    init: function(){
        //this.el.parentNode.removeChild(this.el);s
        this.el.addEventListener("collidestart", (event) => {
            var worldPosition = new THREE.Vector3();
            this.el.object3D.getWorldPosition(worldPosition);
            

            const particleContainer = document.createElement("a-entity");
            particleContainer.id = "particle-container";
            //particleContainer.object3D.rotation.x = THREE.MathUtils.degToRad(-90);
            particleContainer.object3D.position.set(worldPosition.x, worldPosition.y, worldPosition.z * 1.09);

            const particleEffect = document.createElement("a-entity");
            particleEffect.id = "particles";
            particleEffect.setAttribute("particle-system", {
                // type: "3",
                dragValue: "1",
                maxAge: "0.4",
                size: "0.3",
                particleCount: "150",
                duration: "0.1",
                // velocitySpread: "4 1 4",
                accelerationValue: "0, -9.8, 0",
                velocityValue: "4 1 0",
                color: "#80663b, #c7ad99",
                blending: "1",
                texture: "assets/textures/triangle.png"
            });

            
            particleContainer.appendChild(particleEffect);
            const wall = document.querySelector("#scene");
            console.log(wall);
            wall.appendChild(particleContainer);

            //once piece is destroyed, the manager value needs to be updated
            var manager = document.querySelector('[manager]').components.manager;
            manager.updateSchemaProperty(CAN_THROW, FALSE_STRING);

            this.el.parentNode.removeChild(this.el);

        
        } )
    }
}) 