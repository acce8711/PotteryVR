
AFRAME.registerComponent("place-piece", {
    schema: {},
    init: function () {
        console.log("componenet added")
        this.el.addEventListener("click", () => {
          console.log('can place piece')
            const potteryPiece = document.querySelector("#pottery-piece");
            //console.log(this.el.object3D.parent)
            potteryPiece.object3D.parent = this.el.object3D;
        })
    }
});
