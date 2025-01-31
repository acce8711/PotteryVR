AFRAME.registerComponent("throw-piece", {
    init: function(){
        scene.addEventListener("collidestart", function(){
            console.log("collision occuring")
        })
        const Context_AF = this;
        Context_AF.room = document.querySelector("#room");
        Context_AF.furniture = document.querySelector("#furniture");
        Context_AF.cursorPos = {x: 0, y: 0, z: 0};
        Context_AF.aimClickHandler = function (event)
        {
            const canThrow = document.querySelector("#manager").getAttribute("manager").canThrow;
            if(canThrow)
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
                potteryPiece.setAttribute("ammo-body", {type: "dynamic", emitCollisionEvents: true});
                const invisible = document.querySelector("#invisible-cone");
                invisible.setAttribute("ammo-shape", {type: "cylinder", fit:"all", includeInvisible:true});
                invisible.setAttribute("ammo-shape", {type: "cylinder", fit:"all", includeInvisible:true});

                //throw the piece in the direction of the cursor
                const x = direction.x * 3;
                const z = direction.z * 3;
                const y = direction.y * 3;
                const force = new Ammo.btVector3(x, y, z);
                const pos = new Ammo.btVector3(worldPosition.x, worldPosition.y, worldPosition.z);
                potteryPiece.body.applyImpulse(force, pos);
                
                //add event collision component when the pottery piece has been thrown
                potteryPiece.setAttribute("destroy-pottery", "");
            }
        }
        
        Context_AF.room.addEventListener("click", Context_AF.aimClickHandler);
    },
}
)



AFRAME.registerComponent("destroy-pottery", {
    init: function(){
        console.log("throwing")
        const Context_AF = this;
        Context_AF.collideHandler = function() {
            
            var worldPosition = new THREE.Vector3();
            Context_AF.el.object3D.getWorldPosition(worldPosition);
            

            // const particleContainer = document.createElement("a-entity");
            // particleContainer.id = "particle-container";
            // //particleContainer.object3D.rotation.x = THREE.MathUtils.degToRad(-90);
            // particleContainer.object3D.position.set(worldPosition.x, worldPosition.y, worldPosition.z * 1.09);

            // const particleEffect = document.createElement("a-entity");
            // particleEffect.id = "particles";
            // particleEffect.setAttribute("particle-system", {
            //     // type: "3",
            //     dragValue: "1",
            //     maxAge: "0.4",
            //     size: "0.3",
            //     particleCount: "150",
            //     duration: "0.1",
            //     // velocitySpread: "4 1 4",
            //     accelerationValue: "0, -9.8, 0",
            //     velocityValue: "4 1 0",
            //     color: "#80663b, #c7ad99",
            //     blending: "1",
            //     texture: "assets/textures/triangle.png"
            // });

            
            // particleContainer.appendChild(particleEffect);
            // const wall = document.querySelector("#scene");
            // console.log(wall);
            // wall.appendChild(particleContainer);

            //once piece is destroyed, the manager value needs to be updated
            var manager = document.querySelector('[manager]').components.manager;
            manager.updateSchemaProperty(CAN_THROW, FALSE_STRING);

            Context_AF.el.parentNode.removeChild(Context_AF.el);
        }

        Context_AF.el.addEventListener("collidestart", Context_AF.collideHandler);
        const scene = document.querySelector("#scene");
        
    },
    remove: function() {
        console.log("I am being removed :(")
        this.el.removeEventListener("collidestart", this.collideHandler);
    }
}) 