// ==========================================
// SILENTBRIDGE AI SIGN LANGUAGE DEMO
// ==========================================

let cameraStream = null;
let handLandmarker = null;
let lastVideoTime = -1;
let currentMessage = "";
let detecting = false;

function startCommunication() {
    document.getElementById("communication").scrollIntoView({ behavior: "smooth" });
}

// ==========================================
// START CAMERA
// ==========================================

async function startCamera() {
    const video = document.getElementById("cameraVideo");
    const message = document.getElementById("cameraMessage");
    const status = document.getElementById("cameraStatus");

    try {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            status.innerText = "Camera not supported by this browser ❌";
            return;
        }

        cameraStream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "user" },
            audio: false
        });

        video.srcObject = cameraStream;
        video.style.display = "block";
        message.style.display = "none";
        status.innerText = "Camera active 🎥 Loading AI model...";

        await video.play();
        await createHandLandmarker();

        status.innerText = "AI ready — show your hand 🤟";
        detecting = true;
        detectHands();

    } catch (error) {
        console.error("Camera/AI Error:", error);

        if (error.name === "NotAllowedError") {
            status.innerText = "Camera permission denied ❌";
        } else if (error.name === "NotFoundError") {
            status.innerText = "No camera found on this device ❌";
        } else {
            status.innerText = "AI failed to load: " + error.message;
        }
    }
}

// ==========================================
// CREATE MEDIAPIPE HAND LANDMARKER
// ==========================================

async function createHandLandmarker() {
    if (handLandmarker) return;

    if (!window.FilesetResolver || !window.HandLandmarker) {
        throw new Error("MediaPipe module script hasn't loaded yet — check your internet connection.");
    }

    const vision = await window.FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.22/wasm"
    );

    handLandmarker = await window.HandLandmarker.createFromOptions(vision, {
        baseOptions: {
            modelAssetPath:
                "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task"
        },
        runningMode: "VIDEO",
        numHands: 1,
        minHandDetectionConfidence: 0.5,
        minHandPresenceConfidence: 0.5,
        minTrackingConfidence: 0.5
    });
}

// ==========================================
// DETECT HANDS
// ==========================================

function detectHands() {
    if (!detecting) return;

    const video = document.getElementById("cameraVideo");

    if (video.readyState >= 2 && video.currentTime !== lastVideoTime) {
        lastVideoTime = video.currentTime;

        const results = handLandmarker.detectForVideo(video, performance.now());

        if (results.landmarks && results.landmarks.length > 0) {
            const landmarks = results.landmarks[0];
            recognizeGesture(landmarks);
            drawLandmarks(landmarks);
        } else {
            document.getElementById("cameraStatus").innerText =
                "Show your hand in front of the camera 🤟";
            clearCanvas();
        }
    }

    requestAnimationFrame(detectHands);
}

// ==========================================
// RECOGNIZE SIMPLE GESTURES
// ==========================================

function recognizeGesture(landmarks) {
    const thumbTip = landmarks[4];
    const indexTip = landmarks[8];
    const middleTip = landmarks[12];
    const ringTip = landmarks[16];
    const pinkyTip = landmarks[20];
    const wrist = landmarks[0];

    let message = "";

    if (
        thumbTip.y < wrist.y &&
        indexTip.y > wrist.y &&
        middleTip.y > wrist.y &&
        ringTip.y > wrist.y &&
        pinkyTip.y > wrist.y
    ) {
        message = "Yes 👍";
    } else if (
        indexTip.y < wrist.y &&
        middleTip.y < wrist.y &&
        ringTip.y < wrist.y &&
        pinkyTip.y < wrist.y
    ) {
        message = "Hello 👋";
    } else if (
        indexTip.y > wrist.y &&
        middleTip.y > wrist.y &&
        ringTip.y > wrist.y &&
        pinkyTip.y > wrist.y
    ) {
        message = "Stop ✊";
    }

    if (message !== "") {
        updateResult(message);
    }
}

// ==========================================
// UPDATE RESULT
// ==========================================

function updateResult(message) {
    currentMessage = message;
    document.getElementById("resultText").innerText = message;
    document.getElementById("detectedText").innerText = message;
    document.getElementById("cameraStatus").innerText = "AI detected: " + message;
}

// ==========================================
// DRAW HAND LANDMARKS (mirror-corrected)
// ==========================================

function drawLandmarks(landmarks) {
    const video = document.getElementById("cameraVideo");
    const canvas = document.getElementById("handCanvas");
    const ctx = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const point of landmarks) {
        const x = (1 - point.x) * canvas.width;
        const y = point.y * canvas.height;

        ctx.beginPath();
        ctx.arc(x, y, 6, 0, 2 * Math.PI);
        ctx.fillStyle = "#ffffff";
        ctx.fill();
    }
}

function clearCanvas() {
    const canvas = document.getElementById("handCanvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// ==========================================
// STOP CAMERA
// ==========================================

function stopCamera() {
    detecting = false;

    if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
        cameraStream = null;
    }

    const video = document.getElementById("cameraVideo");
    const message = document.getElementById("cameraMessage");

    video.srcObject = null;
    video.style.display = "none";
    message.style.display = "block";

    document.getElementById("cameraStatus").innerText = "Camera stopped";
    clearCanvas();
}

// ==========================================
// HERO CAMERA
// ==========================================

async function startHeroCamera() {
    const video = document.getElementById("heroVideo");
    const message = document.getElementById("heroCameraMessage");

    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false
        });
        video.srcObject = stream;
        video.style.display = "block";
        message.style.display = "none";
    } catch (error) {
        console.error("Hero camera error:", error);
    }
}

// ==========================================
// TEXT TO SPEECH
// ==========================================

function speakText() {
    if (!currentMessage) {
        document.getElementById("cameraStatus").innerText = "Show a hand gesture first 🤟";
        return;
    }
    const speech = new SpeechSynthesisUtterance(currentMessage);
    speech.lang = "en-US";
    window.speechSynthesis.speak(speech);
}

function detectSign(message) {
    updateResult(message);
}

function changeMode(mode, selectedButton) {
    document.querySelectorAll(".mode-buttons button").forEach(b => b.classList.remove("active"));
    selectedButton.classList.add("active");

    const result = document.getElementById("resultText");
    result.innerText = mode === "sign" ? "Show your hand to begin 🤟" : "Voice mode selected 🎤";
}

function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ behavior: "smooth" });
                }
