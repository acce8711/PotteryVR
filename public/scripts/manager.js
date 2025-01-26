AFRAME.registerComponent("manager", {
    schema: {
        canCreatePiece: {type: "boolean", default: "true"},
        canSpinWheel: {type: "boolean", default: "false"},
        pickedUp: {type: "boolean", default: "false"}
    }

});
