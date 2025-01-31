//Constants

//pottery piece characteristics constants
const CONE_HEIGHT = 0.09;
const OUTER_CONE_RADIUS = 0.1;
const INNER_CONE_RADIUS = 0.09;
const OUTER_RING_RADIUS = 0.1;
const INNER_RING_RADIUS = 0.09;
const CIRCLE_RADIUS = 0.1;
const POTTERY_PIECE_Y_SCALE = 1;

//wheel characteristics constants
const WHEEL_ROTATION_ANGLE = 360;
const WHEEL_HEIGHT = 0.1;
const Y_OFFSET = 0.01;

const FALSE_STRING = false;
const TRUE_STRING = true;

//Manager component schema
const CAN_CREATE = "canCreate";
const CAN_SPIN = "canSpin";
const SPINNING = "spinning";
const CAN_PICKUP = "canPickUp";
const CAN_PLACE = "canPlace";
const CAN_THROW = "canThrow";

//instruction text
const CLAY_INSTRUCTIONS = "Let's start off with placing some clay on the wheel 😊";
const WHEEL_INSTRUCTIONS = "It's time to turn on the wheel!";
const MODIFICATION_INSTRUCTIONS = "Use the sliders to shape your pot.\n(Pause the wheel when done)";
const PAUSE_INSTRUCTIONS = "Pause the wheel when you're happy with the shape of the pot.";
const PICKUP_INSTRUCTIONS = "It's time to pick up your pot...";
const THROW_INSTRUCTIONS = "And let it go. Double click anywhere on the wall, ceiling, or floor 😉";
const REPEAT_INSTRUCTIONS = "Continue creating and destroying your pots.";

//error text
const CLAY_ERROR = "Uh oh. You can't create a new pot yet."
const WHEEL_ERROR = "Uh oh. You can't turn on the wheel yet."
const PICKUP_ERROR = "Uh oh. You can't pick up the pot right now."

//items for interaction
const CLAY = "#clay";
const BUTTON = "#button";
const POTTERY_PIECE = "#pottery-piece";
const GUIDE = "#guide"

//guide measurements for different items
const CLAY_GUIDE_INFO = {outerRadiusMin: 0.22,
                        outerRadiusMax: 0.24,
                        innerRadiusMin: 0.2,
                        innerRadiusMax: 0.22,
                        position: "-3.2 0.98 2.4"};

const BUTTON_GUIDE_INFO = {outerRadiusMin: 0.12,
                            outerRadiusMax: 0.14,
                            innerRadiusMin: 0.1,
                            innerRadiusMax: 0.12,
                            position: "-3.031 0.98 3.163"};

const POTTERY_PIECE_GUIDE_INFO = {outerRadiusMin: 0.26,
                                    outerRadiusMax: 0.28,
                                    innerRadiusMin: 0.24,
                                    innerRadiusMax: 0.26,
                                    position: "-3.3 0.98 2.86"};

