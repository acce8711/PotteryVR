//component is responsible for managing the main states and providing a central communication point between different components
AFRAME.registerComponent("manager", {
    init: function() {
        //properties to manage states
        this.canCreate = true;
        this.canSpin = false;
        this.spinning = false;
        this.canPickUp = false;
        this.canThrow = false;

        //UI for on-screen instructions
        this.instructionsContainer = document.querySelector("#instructions");
        this.instructionsTextContainer = document.querySelector("#instructions-text");
        this.errorContainer = document.querySelector("#error");
        this.errorTextContainer = document.querySelector("#error-text");

        //3D elements
        this.clay = document.querySelector(CLAY);
        this.button = document.querySelector(BUTTON);
        this.guideIndicator = document.querySelector(GUIDE);

        //sound
        this.smashSound = document.querySelector('[sound__smash]');

        //slider elements
        this.topRadiusSlider = document.querySelector("#top-radius-slider");
        this.bottomRadiusSlider = document.querySelector("#bottom-radius-slider");
        this.heightSlider = document.querySelector("#height-slider");

        //functions
        this.displayIndicator = displayIndicator;
        this.hideIndicator = hideIndicator;
        this.changeState = changeState;
        this.handleIncorrectInteraction = handleIncorrectInteraction;
        this.resetSliderValues = resetSliderValues;

        //init values
        this.instructionsTextContainer.innerText = CLAY_INSTRUCTIONS;
    }
});

//function updated properties and triggers actions based on the property that is being updated
//other components interact with the manager through this function
function changeState(propertyName, propertyValue) {
    this[propertyName] = propertyValue;

    //removing any error text that may be present
    this.instructionsContainer.style.display = "flex";
    this.errorContainer.style.display = "none";

    //updating properties and triggering sound and UI actions based on the property that was just updated
    switch (propertyName)
    {
        //if canCreate has been disabled, canSpin needs to be enabled
        case CAN_CREATE:
            if(propertyValue === FALSE_STRING)
            {
                this.canSpin = TRUE_STRING;
                this.instructionsTextContainer.innerText = WHEEL_INSTRUCTIONS;
                this.displayIndicator(BUTTON_GUIDE_INFO);
            }
            break;
        //if canPickup has been disabled, canThrow needs to be enabled, and canSpin disabled
        case CAN_PICKUP:
            if(propertyValue === FALSE_STRING)
            {
                this.canThrow = TRUE_STRING;
                this.canSpin = FALSE_STRING;
                this.instructionsTextContainer.innerText = THROW_INSTRUCTIONS;
                // this.button.setAttribute("animation", {enabled: false});
                // this.button.removeAttribute("sound");
                this.hideIndicator();
            }
            break;
        case SPINNING:
            //if spinning then canPickup needs to be disabled
            if(propertyValue === TRUE_STRING)
            {
                this.canPickUp = FALSE_STRING;
                this.instructionsTextContainer.innerText = MODIFICATION_INSTRUCTIONS;
                this.displayIndicator(BUTTON_GUIDE_INFO);
            }
            //if spinning stopped then canPickup needs to be enabled
            else
            {
                this.canPickUp = TRUE_STRING;
                this.instructionsTextContainer.innerText = PICKUP_INSTRUCTIONS;
                this.displayIndicator(POTTERY_PIECE_GUIDE_INFO);
            }
            break;
        //if canThrow has been disabled, canCreate needs to be enabled
        case CAN_THROW:
            if(propertyValue === FALSE_STRING)
            {
                this.canCreate = TRUE_STRING;
                this.instructionsTextContainer.innerText = REPEAT_INSTRUCTIONS;
                this.smashSound.components.sound__smash.playSound();
                this.displayIndicator(CLAY_GUIDE_INFO);
                this.resetSliderValues();
            }
        default:
            break;
    }
}

//function displays an error message for 3 seconds when an incorrect interaction is executed
function handleIncorrectInteraction (errorText) {
    this.instructionsContainer.style.display = "none";
    this.errorContainer.style.display = "flex";
    this.errorTextContainer.innerText = errorText;

    setTimeout(() => {
        this.instructionsContainer.style.display = "flex"
        this.errorContainer.style.display = "none"
    }, 3000)
}

//function displays an 3D indicator to guide the user
function displayIndicator(info) {
    this.guideIndicator.setAttribute("material", {visible: true});
    this.guideIndicator.setAttribute("animation__radiusInner", {enabled: true,
                                                                from: info.innerRadiusMin,
                                                                to: info.innerRadiusMax})
    this.guideIndicator.setAttribute("animation__radiusOuter", {enabled: true,
                                                                from: info.outerRadiusMin,
                                                                to: info.outerRadiusMax})
    this.guideIndicator.setAttribute("position", info.position);
}

//function hides the indicator
function hideIndicator() {
    this.guideIndicator.setAttribute("material", {visible: false});
    this.guideIndicator.setAttribute("animation__radiusInner", {enabled: false});
    this.guideIndicator.setAttribute("animation__radiusOuter", {enabled: false});
}

//function resets the slider values once the pottery piece has been destroyed
function resetSliderValues() {
    this.topRadiusSlider.value = "0";
    this.topRadiusSlider.style.background = "#c1cdd1";
    this.bottomRadiusSlider.value = "0";
    this.bottomRadiusSlider.style.background = "#c1cdd1";
    this.heightSlider.value = "1";
    this.heightSlider.style.background = "#c1cdd1";
}
