//function to taper the top of the pottery piece
function taperTop(event) {
    const value = event.target.value;

    //update slider fill
    updateSliderFill(event.target.min, event.target.max, value, event.target.id);
    //update the top radius of outer cone
    setRadius("#outer-cone", OUTER_CONE_RADIUS, value, "radius-top"); 
    //update the top radius of inner cone 
    setRadius("#inner-cone", INNER_CONE_RADIUS, value, "radius-top"); 
    //update the top ring
    setRingRadius("#top-ring", INNER_RING_RADIUS, OUTER_RING_RADIUS, value); 
    //update the top radius of invisible cone
    setRadius("#invisible-cone", OUTER_CONE_RADIUS, value, "radius-top");  
}

//function to taper the bottom of the pottery piece
function taperBottom(event) {
    const value = event.target.value;

    //update slider fill
    updateSliderFill(event.target.min, event.target.max, value, event.target.id);
    //update the bottom radius of outer cone
    setRadius("#outer-cone", OUTER_CONE_RADIUS, value, "radius-bottom"); 
    //update the bottom radius of inner cone 
    setRadius("#inner-cone", INNER_CONE_RADIUS, value, "radius-bottom"); 
    //update the bottom circle
    setRadius("#bottom-circle", CIRCLE_RADIUS, value, "radius");  
    //update the bottom radius of invisible cone
    setRadius("#invisible-cone", OUTER_CONE_RADIUS, value, "radius-bottom"); 
}

//function to adjust the height of the pottery piece
function adjustHeight(event) {
    const value = event.target.value;

    //update slider fill
    updateSliderFill(event.target.min, event.target.max, value, event.target.id);
    const shape = document.querySelector("#pottery-piece");
    const shapeHeight = POTTERY_PIECE_Y_SCALE * parseFloat(value);
    shape.object3D.scale.set(1, shapeHeight, 1);
}

//function to update the currently active slider fill
const updateSliderFill = function(minValue, maxValue, value, id) {
    // reference: 
    // https://www.youtube.com/watch?v=EYyWzE1DWuY
    // https://stackoverflow.com/questions/75589343/how-do-i-make-a-slider-in-html-that-fill-itself-in-behind-with-a-gradient
    const progress = ((parseFloat(value) - parseFloat(minValue)) / (parseFloat(maxValue) - parseFloat(minValue))) * 100;
    const slider = document.querySelector(`#${id}`);
    slider.style.background = `linear-gradient(to right, transparent ${progress}%, rgb(193, 205, 209) ${progress}%), linear-gradient(to right, rgb(61, 211, 245) 30%, rgb(15, 93, 211) 100%)`;
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


