AFRAME.registerComponent("throw-piece", {
    init: function(){
        console.log("thow created")
        const plane = document.querySelector("#wall")
        plane.addEventListener("click", (event) => {
            const el = this.el;
            var worldPosition = new THREE.Vector3();
            this.el.object3D.getWorldPosition(worldPosition);
            //const elPos = el.object3D.position;
        
            console.log(el)
            //get the cursor intersection point
            const cursorPos = event.detail.intersection.point;
            var worldPosition = new THREE.Vector3();
            this.el.object3D.getWorldPosition(worldPosition);

            //create a vector between the camera and the cursor position (target)
            //this vector will represent the target throw direction
            const direction = new THREE.Vector3(cursorPos.x - worldPosition.x, cursorPos.y - worldPosition.y, cursorPos.z - worldPosition.z);

            //add dynamic body component 
            el.setAttribute("ammo-body", {type: "dynamic", emitCollisionEvents: true});
            el.setAttribute("ammo-shape", {type: "sphere", fit: "manual", sphereRadius: 0.4});

            //throw the piece in the direction of the cursor
            const x = direction.x * 2;
            const z = direction.z * 2;
            const y = direction.y * 2;
            const force = new Ammo.btVector3(x, y, z);
            const pos = new Ammo.btVector3(worldPosition.x, worldPosition.y, worldPosition.z);
            el.body.applyImpulse(force, pos);
            
            //add event collision component when the pottery piece has been thrown
            el.setAttribute("destroy-pottery", "");
        })
    }
}
)

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
            this.el.parentNode.removeChild(this.el);
        } )
    }
}) 