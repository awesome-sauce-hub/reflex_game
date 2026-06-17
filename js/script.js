const arena = document.getElementById("arena");
const signalText = document.getElementById("signal-text");
const readout = document.getElementById("readout");

let state = "idle"; // Possible states: idle, armed, go, fail, result

let goTimestamp = null; // Timestamp when the "go" signal is shown

function setState(newState) {
    state = newState;

    if (state === "idle") { // Initial state
        arena.style.background = "#14171b";
        signalText.textContent = "TAP TO START";
    }

    if (state === "armed") { // Waiting for the "go" signal
        arena.style.background = "#2a1414";
        signalText.textContent = "WAIT...";
    }

    if (state === "go") { // "Go" signal is shown, player should tap now
        arena.style.background = "#0f3322";
        signalText.textContent = "TAP NOW";
    }

    if (state === "fail") { // Player tapped too early
        arena.style.background = "#2a1414";
        signalText.textContent = "TOO SOON";
    }

    if (state === "result") { // Round result
        arena.style.background = "#14171b";
        signalText.textContent = "TAP TO RETRY";
    }
}

setState("idle"); // Start in the idle state

arena.addEventListener("click", function () {
    if (state === "idle" || state === "fail" || state === "result") {
        startRound();
        return;
    }

    if (state === "armed") {
        setState("fail");
        return;
    }

    if (state === "go") {
        const reactionTime = Math.round(performance.now() - goTimestamp);
        readout.textContent = reactionTime + "ms";
        setState("result");
        return;
    }
});

function startRound() {
    readout.textContent = "-ms";
    setState("armed");

    const delay = 1200 + Math.random() * 2800;

    setTimeout(function () {
        goTimestamp = performance.now();
        setState("go");
    }, delay);
}