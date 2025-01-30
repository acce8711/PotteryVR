AFRAME.registerComponent("manager", {
    schema: {
        canCreate: {type: "boolean", default: "true"},
        canSpin: {type: "boolean", default: "true"},
        spinning: {type: "boolean", default: "false"},
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
    },

    updateSchemaProperty: function (propertyName, propertyValue) {

        this.el.setAttribute("manager", propertyName, propertyValue);

        //updating corresponding schema values based on the property that was just updated
        switch (propertyName)
        {
            //if canCreate has been disabled, canSpin and canPickUp needs to be enabled
            case CAN_CREATE:
                if(propertyValue === FALSE_STRING)
                {
                    this.el.setAttribute("manager", CAN_SPIN, TRUE_STRING);
                    this.el.setAttribute("manager", CAN_PICKUP, TRUE_STRING);
                }
                break;
            //if canPickup has been disabled, canThrow and canPlace needs to be enabled, and canSpin disabled
            case CAN_PICKUP:
                if(propertyValue === FALSE_STRING)
                {
                    this.el.setAttribute("manager", CAN_THROW, TRUE_STRING);
                    this.el.setAttribute("manager", CAN_PLACE, TRUE_STRING);
                    this.el.setAttribute("manager", CAN_CREATE, FALSE_STRING);
                    //this.el.setAttribute("manager", CAN_SPIN, FALSE_STRING);
                }
                break;
                //currently error that you can create piece when you have one in hand
            case SPINNING:
                //if spinning then canPickup needs to be disabled
                // if(propertyValue === TRUE_STRING)
                //     this.el.setAttribute("manager", CAN_PICKUP, FALSE_STRING);
                // //if spinning stopped then canPickup needs to be enabled
                // else
                //     this.el.setAttribute("manager", CAN_PICKUP, TRUE_STRING);
                // break;
            //if canThrow has been disabled, canCreate needs to be enabled
            case CAN_THROW:
                if(propertyValue === FALSE_STRING)
                {
                    this.el.setAttribute("manager", CAN_CREATE, TRUE_STRING);
                    this.el.setAttribute("manager", CAN_SPIN, TRUE_STRING);
                }
            default:
                break;
        }

    }

});
