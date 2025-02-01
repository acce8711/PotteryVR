//code taken from class demo
AFRAME.registerComponent('start-experience', {
    init: function () {
      //we can't play sound on some browsers until we have some user interaction
      //this means we should only start playing ambient music after this button is clicked
      console.log('scene loaded');
      document.querySelector('#user-gesture-button').style.display='block';
    }
  });
  
  //function called from user-gesture click
  const startExperience = function() {
    //hide user-gesture overlay
    document.querySelector('#user-gesture-overlay').style.display='none';
    document.querySelector('#ui-elements').style.display='flex';
    
    //start all ambient music
    const ambientSound = document.querySelector('[sound__ambient]');
    ambientSound.components.sound__ambient.playSound();
  }