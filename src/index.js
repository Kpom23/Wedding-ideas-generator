function generateIdea(event) {
    event.preventDefault()

    new Typewriter('#idea', {
  strings: ["Set a budget"],
  autoStart: true,
  delay: 1,
  cursor:"",

    });

}


let ideaFormElement = document.querySelector("#idea-generator-form");
ideaFormElement.addEventListener("submit", generateIdea)