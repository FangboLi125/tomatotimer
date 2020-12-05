// Assigning to variables stable elements
const mainHeader = document.querySelector("#main-header"),
      description = document.querySelector("#description"),
      countdownContainer = document.querySelector("#countdown-container"),
      cancelContainer = document.querySelector("#cancel-container"),
      cancelButton = document.querySelector("#cancel-button"),
      videoContainer = document.querySelector("#video-container"),
      selectionContainer = document.querySelector("#selection-container"),
      instruction = document.querySelector("#instruction"),
      timeButtonsContainer = document.querySelector("#time-buttons-container"),
      takeBreak = document.querySelector(".take-break");

      selectionContainer.addEventListener("click", renderCountdown);
function renderCountdown(evt) {
   if (evt.target.classList.contains("set-time")) {
       videoContainer.innerHTML = "";
      hideElements(description, selectionContainer, videoContainer);
      unhideElements(countdownContainer, cancelContainer);
      const minutesChosen = parseFloat(evt.target.id);
      startCountdown(minutesChosen);
  }
}

function hideElements(...elems) {
    elems.forEach((elem) => (elem.hidden = true));
  }
  function unhideElements(...elems) {
    elems.forEach((elem) => (elem.hidden = false));
  }

  function startCountdown(minutesChosen) {
    // Calculate total time in seconds, the second display value, and the minute display value
    let totalTimeInSeconds = minutesChosen * 60;
  // Set the countdown to run every 1000 ms (1 second); run this function every second
    let setCountDownInterval = setInterval(function () {
      let displaySeconds = totalTimeInSeconds % 60;
      let displayMinutes = Math.floor(totalTimeInSeconds / 60);
  // Add a zero in front of displaySeconds if it is single digit
      displaySeconds =
        displaySeconds < 10 ? "0" + displaySeconds : displaySeconds;
  // Add the time to the countdown container
      countdownContainer.innerHTML = `${displayMinutes} : ${displaySeconds}`;
      
      // Decrement the totalTimeInSeconds
      totalTimeInSeconds--;
  // If the time reaches 0, then stop the countdown, and render video
      if (totalTimeInSeconds < 0) {
        clearInterval(setCountDownInterval);
        renderVideo();
      }
  // If the cancel button is clicked, then render back to start
      cancelButton.addEventListener("click", (evt) => {
        clearInterval(setCountDownInterval);
        renderBackToStart();
      });
    }, 1000);
  }

  function renderBackToStart() {
    hideElements(countdownContainer, cancelContainer, videoContainer, takeBreak);
    unhideElements(description, selectionContainer, timeButtonsContainer);
  }

  function renderVideo() {
    hideElements(countdownContainer, cancelContainer);
    unhideElements(videoContainer, selectionContainer, takeBreak);
  // Take a random video URL and display and autoplay the video
    const songURLs = [
      "https://www.youtube.com/embed/4Z-P7qOFcDk?rel=0&start=137&autoplay=1",
      "https://www.youtube.com/embed/KybAvaM3b90?rel=0&start=8&autoplay=1",
      "https://www.youtube.com/embed/W5HIisdWzvY?rel=0&start=39&autoplay=1",
      "https://www.youtube.com/embed/-H2Bjyw6AS8?rel=0&start=93&autoplay=1",
    ];
  const randomIdx = Math.floor(Math.random() * songURLs.length);
  videoContainer.innerHTML = `
      <iframe width="560" height="315" src=${songURLs[randomIdx]} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    `;
  }