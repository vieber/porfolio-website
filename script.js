let draggableElements = document.querySelectorAll(".draggable");
let initialX = 0,
  initialY = 0;
let moveElement = false;

let events = {
  mouse: {
    down: "mousedown",
    move: "mousemove",
    up: "mouseup",
  },
  touch: {
    down: "touchstart",
    move: "touchmove",
    up: "touchend",
  },
};
let deviceType = "";

// Detect touch device
const isTouchDevice = () => {
  try {
    document.createEvent("TouchEvent");
    deviceType = "touch";
    return true;
  } catch (e) {
    deviceType = "mouse";
    return false;
  }
};
isTouchDevice();


draggableElements.forEach((draggableElem) => {
  draggableElem.addEventListener(events[deviceType].down, (e) => {
    e.preventDefault();
    initialX = !isTouchDevice() ? e.clientX : e.touches[0].clientX;
    initialY = !isTouchDevice() ? e.clientY : e.touches[0].clientY;
    moveElement = true;
  });


  draggableElem.addEventListener(events[deviceType].move, (e) => {
    if (moveElement) {
      e.preventDefault();
      let newX = !isTouchDevice() ? e.clientX : e.touches[0].clientX;
      let newY = !isTouchDevice() ? e.clientY : e.touches[0].clientY;
      draggableElem.style.top =
        draggableElem.offsetTop - (initialY - newY) + "px";
      draggableElem.style.left =
        draggableElem.offsetLeft - (initialX - newX) + "px";
      initialX = newX;
      initialY = newY;
    }
  });


  draggableElem.addEventListener(events[deviceType].up, () => {
    moveElement = false;
  });

  draggableElem.addEventListener("mouseleave", () => {
    moveElement = false;
  });
});


window.addEventListener("load", () => {
  const contactForm = document.querySelector("#contact-form");
  const submitBtn = document.querySelector("#submit-btn");
  const nameInput = document.querySelector("#user_name");
  const emailInput = document.querySelector("#user_email");
  const messageInput = document.querySelector("#message");

  const publicKey = "DfLVciPqFj2qHckq7";
  const serviceID = "service_qdr92ff";
  const templateID = "template_8iwqzim";

  emailjs.init(publicKey);

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    submitBtn.innerText = "just a second";

    const inputFields = {
      name: nameInput.value,
      email: emailInput.value,
      message: messageInput.value,
    }

    emailjs.send(serviceID, templateID, inputFields).then(() => {
      submitBtn.innerText = "sent";
      nameInput.value = "";
      emailInput.value = "";
      messageInput.value = "";
    }, (error) => {
      console.log(error);
      submitBtn.innerText = "something wrong"
    });
  });
});


function myFunction() {
  var mainMenu = document.querySelector(".main-menu");
  var rightMenu = document.querySelector(".right-menu");
  var overlay = document.getElementById("overlay");

  if (mainMenu.style.display === "flex" || mainMenu.style.display === "") {
    mainMenu.style.display = "none";
    rightMenu.style.display = "none";
    overlay.style.display = "none";
  } else {
    mainMenu.style.display = "flex";
    rightMenu.style.display = "flex";
    overlay.style.display = "block";
  }
}
