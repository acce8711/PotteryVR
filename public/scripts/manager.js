AFRAME.registerComponent("manager", {
    init: function() {
        //event listeners for different colliders 
        const Context_AF = this;

        this.canCreate = true;

        Context_AF.canSpin = false;
        Context_AF.spinning = false;
        Context_AF.canPickUp = false;
        Context_AF.canThrow = false;

        Context_AF.instructionsContainer = document.querySelector("#instructions");
        Context_AF.instructionsTextContainer = document.querySelector("#instructions-text");
        Context_AF.errorContainer = document.querySelector("#error");
        Context_AF.errorTextContainer = document.querySelector("#error-text");

        Context_AF.clay = document.querySelector(CLAY);
        Context_AF.button = document.querySelector(BUTTON);
        Context_AF.guideIndicator = document.querySelector(GUIDE);

        
        this.displayIndicator = displayIndicator;
        this.hideIndicator = hideIndicator;
        this.changeState = changeState;
        this.handleIncorrectInteraction = handleIncorrectInteraction;
        

        //init values
        Context_AF.instructionsTextContainer.innerText = CLAY_INSTRUCTIONS;
        
    }
});

function changeState(propertyName, propertyValue) {
    console.log(propertyName);
    this[propertyName] = propertyValue;

    //removing any error text that may be present
    this.instructionsContainer.style.display = "flex";
    this.errorContainer.style.display = "none";

    //updating properties based on the property that was just updated
    switch (propertyName)
    {
        //if canCreate has been disabled, canSpin and canPickUp needs to be enabled
        case CAN_CREATE:
            if(propertyValue === FALSE_STRING)
            {
                this.canSpin = TRUE_STRING;
                this.instructionsTextContainer.innerText = WHEEL_INSTRUCTIONS;
                this.displayIndicator(BUTTON_GUIDE_INFO);
            }
            break;
        //if canPickup has been disabled, canThrow and canPlace needs to be enabled, and canSpin disabled
        case CAN_PICKUP:
            if(propertyValue === FALSE_STRING)
            {
                this.canThrow = TRUE_STRING;
                this.canSpin = FALSE_STRING;
                this.instructionsTextContainer.innerText = THROW_INSTRUCTIONS;
                this.hideIndicator();
            }
            break;
            //currently error that you can create piece when you have one in hand
        case SPINNING:
            //if spinning then canPickup needs to be disabled
            if(propertyValue === TRUE_STRING)
            {
                this.canPickUp = FALSE_STRING;
                this.instructionsTextContainer.innerText = MODIFICATION_INSTRUCTIONS;
                this.hideIndicator();
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
                this.displayIndicator(CLAY_GUIDE_INFO);
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

//function displays an indicator to guide the user
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

function hideIndicator() {
    this.guideIndicator.setAttribute("material", {visible: false});
    this.guideIndicator.setAttribute("animation__radiusInner", {enabled: false});
    this.guideIndicator.setAttribute("animation__radiusOuter", {enabled: false});
}
