//Constants
const OUTER_CONE_RADIUS = 0.5;
const INNER_CONE_RADIUS = 0.4;
const OUTER_RING_RADIUS = 0.5;
const INNER_RING_RADIUS = 0.4;
const POTTERY_PIECE_Y_SCALE = 1;

//function to taper the top of the pottery piece
function taperTop(event) {
    const value = event.target.value;

    //update the top radius of outer cone
    setConeTaper("#outer-cone", OUTER_CONE_RADIUS, value, "radius-top"); 
    //update the top radius of inner cone 
    setConeTaper("#inner-cone", INNER_CONE_RADIUS, value, "radius-top"); 
    //update the top ring
    setRingRadius("#top-ring", INNER_RING_RADIUS, OUTER_RING_RADIUS, value);  
}

//function to taper the bottom of the pottery piece
function taperBottom(event) {
    const value = event.target.value;

    //update the bottom radius of outer cone
    setConeTaper("#outer-cone", OUTER_CONE_RADIUS, value, "radius-bottom"); 
    //update the bottom radius of inner cone 
    setConeTaper("#inner-cone", INNER_CONE_RADIUS, value, "radius-bottom"); 
    //update the bottom ring
    setRingRadius("#bottom-ring", INNER_RING_RADIUS, OUTER_RING_RADIUS, value);  
}

//function to adjust the height of the pottery piece
function adjustHeight(event) {
    const value = event.target.value;

    const shape = document.querySelector("#pottery-piece");
    const shapeHeight = POTTERY_PIECE_Y_SCALE + parseFloat(value)
    shape.setAttribute("scale", `1 ${shapeHeight} 1`)
}

//function to update the taper of the pottery piece
const setConeTaper = function(shapeID, initialRadius, sliderRadius, componentName) {
    const shape = document.querySelector(shapeID);
    const radius = initialRadius + parseFloat(sliderRadius);
    shape.setAttribute(componentName, radius);
}

//function to update the ring radius
const setRingRadius = function(shapeID, initialInnerRadius, initialOuterRadius, sliderRadius) {
    const shape = document.querySelector(shapeID);
    const innerRadius = initialInnerRadius + parseFloat(sliderRadius);
    const outerRadius = initialOuterRadius + parseFloat(sliderRadius);
    shape.setAttribute("radius-inner", innerRadius);
    shape.setAttribute("radius-outer", outerRadius);
}
