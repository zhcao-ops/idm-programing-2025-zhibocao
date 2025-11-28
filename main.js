// main.js

// === 0. Header Scroll Effect (tou-bu-bian-hua) ===

function setupHeaderScrollEffect() {
    
    // grab the header
    var theHeader = document.querySelector("header"); 
    
    if (!theHeader) { 
        return; 
    } // exit if no header found


    // scroll listener
    window.addEventListener("scroll", function() {
        
        var scrollPosition = window.scrollY; // use var for scroll Y value
        
        // is the page scrolled down enough? 50 pixels threshold
        if (scrollPosition > 50) {
            theHeader.classList.add("scrolled"); // YES, add that class
            
        } else {
            theHeader.classList.remove("scrolled"); // NO, remove it
        }
        
    });
}

// 
// === 1. Data and OOP Example === 
// 

// Using a Class to make an Project
// A bit advanced, but OK for a motivated beginner
class project {
    // constructor is where we make the object
    constructor(title, kind, pic, where, description) {
        this.title = title;
        this.type = kind; // use a different variable name here
        this.image = pic; // use another different name
        this.link = where;
        this.description = description;
    }
}


// Array to store the project information (Data List)
var projectsDataList = [ // use var and a slightly weird name
    new project(
        "FIGHTBOYS",
        "FILM PRODUCTION",
        "images/图片3.png",
        "film.html",
        "A campus action film about self-discovery and fighting inner demons."
    ),
    new project(
        "STARLIGHT",
        "DOCUMENTARY",
        "images/2.jpg",
        "documentary.html",
        "A micro-documentary following three fitness enthusiasts on their journeys."
    ),
    new project(
        "SCARLET WITCH EDITING",
        "REELS EDITION",
        "images/1.jpg",
        "video editing.html",
        "A fan-made edit that reimagines Wanda Maximoff with dynamic rhythm and style."
    )
];


// 
// === 2. Function: Show Projects on Home Page ===
// 

function renderHomeProjects() {
    // get the gallery element again, maybe it's not efficient but easy to understand
    var galleryContainer = document.querySelector(".gallery"); 
    if (!galleryContainer) {
        // if not found, just exit
        return;
    }

    galleryContainer.innerHTML = ""; // clear it first

    // loop through the data list
    projectsDataList.forEach(function(item) {
        // making a new div for the card
        var cardBox = document.createElement("div"); // use var
        cardBox.className = "card";

        // use innerHTML, this is the easiest way!
        cardBox.innerHTML = `
            <a href="${item.link}" class="card-link">
                <div class="card-image-wrapper">
                    <img src="${item.image}" alt="${item.title}">
                    <div class="card-overlay">
                        <h3>${item.title}</h3>
                        <p>${item.description}</p>
                    </div>
                </div>
                <p class="card-type">${item.type}</p>
            </a>
        `;

        // put the card into the main container
        galleryContainer.appendChild(cardBox);
    });
    // that's it
}


// 
// === 3. Contact Form Check (Form Validation) ===
// 

function setupContactFormValidation() {

  // only run this if the page has a form
  var form = document.querySelector("form");
  if (form == null) {
    return;
  }

  // create an error box at the top of the form
  var errorBox = document.querySelector(".form-error");
  if (errorBox == null) {
    errorBox = document.createElement("div");
    errorBox.className = "form-error";
    form.insertBefore(errorBox, form.firstChild);
  }

  // listen for form submit
  form.addEventListener("submit", function(event) {

    // get the three inputs
    var nameInput = form.querySelector('input[type="text"]');
    var emailInput = form.querySelector('input[type="email"]');
    var messageTextarea = form.querySelector("textarea");

    var name = nameInput.value;
    var email = emailInput.value;
    var message = messageTextarea.value;

    // use one string to store all error messages
    var errors = "";

    // check the name
    if (name.trim() === "") {
      errors += "<p>Please enter your name.</p>";
    }

    // check the email (very simple check)
    if (email.trim() === "") {
      errors += "<p>Please enter your email.</p>";
    } else if (email.indexOf("@") === -1) {
      errors += "<p>Please enter a valid email address.</p>";
    }

    // check the message length
    if (message.trim().length < 10) {
      errors += "<p>Your message should be at least 10 characters long.</p>";
    }

    // if there are errors, stop the form and show them
    if (errors !== "") {
      event.preventDefault();
      errorBox.innerHTML = errors;
      errorBox.style.display = "block";
    } else {
      // otherwise, let the form submit normally
      alert("Thank you! Your message has been sent.");
    }
  });
}


// 
// === 4. Back to Top Button ===
// 

function setupBackToTopButton() {

  // create the button
  var btn = document.createElement("button");
  btn.textContent = "↑ TOP";
  btn.id = "back-to-top";

  // hide it at the beginning
  btn.style.display = "none";

  // add it into the page
  document.body.appendChild(btn);

  // show or hide the button when scrolling
  window.addEventListener("scroll", function() {
    if (window.scrollY > 300) {
      btn.style.display = "block";
    } else {
      btn.style.display = "none";
    }
  });

  // when clicking the button, go back to the top
  btn.addEventListener("click", function() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}


// 
// === 5. Scroll Reveal Animation (Simple Version) ===
// 

function setupScrollReveal() {

  // elements that should have the reveal effect
  var selectors = [
    ".gallery .card",
    ".about-text",
    ".about-image",
    ".project-container",
    ".description-section",
    ".media-section",
    ".doc-description",
    ".doc-top-image",
    ".doc-bottom-image",
    ".video-center",
    ".content-section",
    ".video-section-edit"
  ];

  var items = [];

  // find all elements and add the class
  for (var i = 0; i < selectors.length; i++) {
    var found = document.querySelectorAll(selectors[i]);
    for (var j = 0; j < found.length; j++) {
      found[j].classList.add("reveal-on-scroll");
      items.push(found[j]);
    }
  }

  // if there is nothing to animate, just stop
  if (items.length === 0) {
    return;
  }

  // check if elements enter the screen
  function checkReveal() {
    for (var k = 0; k < items.length; k++) {
      var rect = items[k].getBoundingClientRect();

      // if the element is close to the viewport, show it
      if (rect.top < window.innerHeight - 80) {
        items[k].classList.add("reveal-visible");
      }
    }
  }

  // check once when the page loads
  checkReveal();

  // check every time the user scrolls
  window.addEventListener("scroll", checkReveal);
}


//
// === 6. Update Footer Year (geng-xin-nian-fen) ===
//

function setupFooterYear() {
    
    // find the span element with the year id
    var yearTarget = document.getElementById("current-year");
    
    if (!yearTarget) { 
        // if it's not here, stop the function
        return; 
    } 

    // get today's date
    var today = new Date(); 
    
    // extract only the 4-digit year value
    var currentYear = today.getFullYear();
    
    // put the year into the HTML tag
    yearTarget.textContent = currentYear;
}


//
// === Z. Initialize (Run all functions) - qi-dong-ma ===
//

// wait for everything to load (dom content loaded)
document.addEventListener("DOMContentLoaded", function() {
    
    // run project gallery first (should this be first?)
    renderHomeProjects(); 
    
    setupContactFormValidation(); // form checks
    
    setupBackToTopButton(); // make the button visible
    
    setupHeaderScrollEffect(); // header style change
    
    setupScrollReveal(); // animation effects
    
    setupFooterYear(); // date update
    
    // done initializing everything!
});