
const textInput = document.getElementById("textInput");
const analyzeButton = document.getElementById("analyzeButton");
const clearButton = document.getElementById("clearButton");
const copyButton = document.getElementById("copyButton");
const resultBody = document.getElementById("resultBody");
const status = document.getElementById("status");

let currentResults = [];

function analyzeText() {
    const text = textInput.value;

    resultBody.replaceChildren();
    currentResults = [];

    if (text.length === 0) {
        status.textContent = "Please enter some text.";

        const row = document.createElement("tr");
        const cell = document.createElement("td");
        cell.colSpan = 3;
        cell.textContent = "No data yet.";

        row.appendChild(cell);
        resultBody.appendChild(row);
        return;
    }

    const characters = Array.from(text);

    characters.forEach((character) => {
        const codePoint = character.codePointAt(0);

        const unicode = "U+" + codePoint
            .toString(16)
            .toUpperCase()
            .padStart(4, "0");

        const decimal = codePoint;

        const row = document.createElement("tr");

        const characterCell = document.createElement("td");
        const unicodeCell = document.createElement("td");
        const decimalCell = document.createElement("td");

        characterCell.textContent =
            character === " " ? "[SPACE]" : character;

        unicodeCell.textContent = unicode;
        decimalCell.textContent = decimal;

        row.append(
            characterCell,
            unicodeCell,
            decimalCell
        );

        resultBody.appendChild(row);

        currentResults.push(
            `${character} | ${unicode} | ${decimal}`
        );
    });

    status.textContent =
        `Found ${characters.length} Unicode code points.`;
}

function clearText() {
    textInput.value = "";
    resultBody.replaceChildren();

    const row = document.createElement("tr");
    const cell = document.createElement("td");

    cell.colSpan = 3;
    cell.textContent = "No data yet.";

    row.appendChild(cell);
    resultBody.appendChild(row);

    currentResults = [];
    status.textContent = "Waiting for input...";
}

async function copyResults() {
    if (currentResults.length === 0) {
        status.textContent = "Nothing to copy.";
        return;
    }

    try {
        await navigator.clipboard.writeText(
            currentResults.join("\n")
        );

        status.textContent = "Results copied successfully!";
    } catch (error) {
        status.textContent =
            "Copy unavailable. Please check browser permissions.";
    }
}

analyzeButton.addEventListener("click", analyzeText);
clearButton.addEventListener("click", clearText);
copyButton.addEventListener("click", copyResults);
