AFRAME.registerComponent("throw-piece", {
    init: function(){
        console.log("thow created")
        const plane = document.querySelector("#wall")
        plane.addEventListener("click", (event) => {
            const el = this.el;
            const elPos = el.object3D.position;
        
            console.log(el)
            //get the cursor intersection point
            const cursorPos = event.detail.intersection.point;

            //create a vector between the camera and the cursor position (target)
            //this vector will represent the target throw direction
            const direction = new THREE.Vector3(cursorPos.x - elPos.x, cursorPos.y - elPos.y, cursorPos.z - elPos.z);

            //add dynamic body component 
            el.setAttribute("ammo-body", {type: "dynamic", emitCollisionEvents: true});
            el.setAttribute("ammo-shape", {type: "sphere", fit: "manual", sphereRadius: 0.5});

            //throw the piece in the direction of the cursor
            const x = direction.x * 2;
            const z = direction.z * 2;
            const y = direction.y * 2;
            const force = new Ammo.btVector3(x, y, z);
            const pos = new Ammo.btVector3(el.object3D.position.x, el.object3D.position.y, el.object3D.position.z);
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
        this.el.addEventListener("collidestart", () => {
            console.log("collided")
            this.el.parentNode.removeChild(this.el);
        } )
    }
}) 