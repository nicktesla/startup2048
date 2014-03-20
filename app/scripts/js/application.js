// Wait till the browser is ready to render the game (avoids glitches)
window.requestAnimationFrame(function () {
  setTimeout(function(){
    console.log("hello!");
    new GameManager(4, KeyboardInputManager, HTMLActuator, LocalScoreManager);
  }, 1500)
});
