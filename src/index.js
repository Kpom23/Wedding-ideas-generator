function displayIdea(response) {
  console.log("FULL RESPONSE:", response.data);

  // Safely grab the AI text
  let idea =
    response.data.answer ||
    response.data.output ||
    response.data.generated_text ||
    "";

  // Extract ONLY <p> tags (ignore markdown completely)
  let matches = idea.match(/<p>[\s\S]*?<\/p>/g);

  if (matches) {
    idea = matches.join("");
  }

  // Clear previous output
  document.querySelector("#idea").innerHTML = "";

  // Animate clean HTML only
  new Typewriter("#idea", {
    strings: idea,
    autoStart: true,
    delay: 1,
    cursor: "",
  });
}

function generateIdea(event) {
  event.preventDefault();

  let instructionsInput = document.querySelector("#user-instructions");

  let apiKey = "td8a113503b7a43603ob1a65510c6f17";

  let context = `
You are a wedding expert.
Generate exactly 4 short recommendations.
Return ONLY valid HTML.
Use only <p> tags.
Do not use markdown.
Do not include triple backticks.
Do not explain anything.
`;

  let prompt = `Generate wedding ideas about ${instructionsInput.value}`;

  let apiURL = `https://api.shecodes.io/ai/v1/generate?prompt=${encodeURIComponent(
    prompt
  )}&context=${encodeURIComponent(context)}&key=${apiKey}`;

  console.log("Generating idea...");
  console.log("Prompt:", prompt);

  axios.get(apiURL).then(displayIdea);
}

let ideaFormElement = document.querySelector("#idea-generator-form");
ideaFormElement.addEventListener("submit", generateIdea);
