AFRAME.registerComponent("place-piece", {
    schema: {
        
    },

    init: function () {
        
        this.el.addEventListener("obbcollisionstarted", () => {
            
            const pickedUp = document.querySelector("#manager").getAttribute("manager").pickedUp;
            console.log(pickedUp)
            if(pickedUp)
            {
                console.log("place piece");
                
                
            }
        })
    },

    update: function () {
      // Do something when component's data is updated.
    },

    remove: function () {
      // Do something the component or its entity is detached.
    },

    tick: function (time, timeDelta) {
      // Do something on every scene tick or frame.
    }
});
