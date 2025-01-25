
//function to taper the top of the pottery piece
function taperTop(event) {
    const value = event.target.value;

    //update the top radius of outer cone
    setRadius("#outer-cone", OUTER_CONE_RADIUS, value, "radius-top"); 
    //update the top radius of inner cone 
    setRadius("#inner-cone", INNER_CONE_RADIUS, value, "radius-top"); 
    //update the top ring
    setRingRadius("#top-ring", INNER_RING_RADIUS, OUTER_RING_RADIUS, value);  
}

//function to taper the bottom of the pottery piece
function taperBottom(event) {
    const value = event.target.value;

    //update the bottom radius of outer cone
    setRadius("#outer-cone", OUTER_CONE_RADIUS, value, "radius-bottom"); 
    //update the bottom radius of inner cone 
    setRadius("#inner-cone", INNER_CONE_RADIUS, value, "radius-bottom"); 
    //update the bottom circle
    setRadius("#bottom-circle", CIRCLE_RADIUS, value, "radius");  
}

//function to adjust the height of the pottery piece
function adjustHeight(event) {
    const value = event.target.value;

    const shape = document.querySelector("#pottery-piece");
    const shapeHeight = POTTERY_PIECE_Y_SCALE + parseFloat(value)
    shape.setAttribute("scale", `1 ${shapeHeight} 1`)
}

//function to update the cone and circle radius of the pottery piece
const setRadius = function(shapeID, initialRadius, sliderRadius, componentName) {
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


