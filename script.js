// ==========================================
// SILENTBRIDGE AI SIGN LANGUAGE DEMO
// ==========================================


// ==========================================
// VARIABLES
// ==========================================


let cameraStream = null;

let handLandmarker = null;

let lastVideoTime = -1;

let currentMessage = "";

let detecting = false;


// ==========================================
// START COMMUNICATION
// ==========================================


function startCommunication() {


    document

        .getElementById("communication")

        .scrollIntoView({

            behavior: "smooth"

        });


}


// ==========================================
// START CAMERA
// ==========================================


async function startCamera() {


    const video =

        document.getElementById(

            "cameraVideo"

        );


    const message =

        document.getElementById(

            "cameraMessage"

        );


    const status =

        document.getElementById(

            "cameraStatus"

        );


    try {


        if (

            !navigator.mediaDevices ||

            !navigator.mediaDevices.getUserMedia

        ) {


            alert(

                "Camera is not supported by this browser."

            );


            return;

        }


        cameraStream =

            await navigator.mediaDevices

                .getUserMedia({

                    video: {

                        facingMode: "user"

                    },

                    audio: false

                });


        video.srcObject =

            cameraStream;


        video.style.display =

            "block";


        message.style.display =

            "none";


        status.innerText =

            "Camera active 🎥 Starting AI...";


        await video.play();


        await createHandLandmarker();


        detecting = true;


        detectHands();


    }


    catch (error) {


        console.error(

            "Camera Error:",

            error

        );


        status.innerText =

            "Camera access failed ❌";


        alert(

            "Please allow camera permission and try again."

        );


    }


}


// ==========================================
// CREATE MEDIAPIPE HAND LANDMARKER
// ==========================================


async function createHandLandmarker() {


    if (handLandmarker) {


        return;

    }


    if (

        !window.FilesetResolver ||

        !window.HandLandmarker

    ) {


        throw new Error(

            "MediaPipe has not loaded yet."

        );

    }


    const vision =

        await window.FilesetResolver

            .forVisionTasks(

                "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.22/wasm"

            );


    handLandmarker =

        await window.HandLandmarker

            .createFromOptions(

                vision,

                {


                    baseOptions: {


                        modelAssetPath:

                            "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task"


                    },


                    runningMode:

                        "VIDEO",


                    numHands:

                        1,


                    minHandDetectionConfidence:

                        0.5,


                    minHandPresenceConfidence:

                        0.5,


                    minTrackingConfidence:

                        0.5


                }

            );


}


// ==========================================
// DETECT HANDS
// ==========================================


function detectHands() {


    if (!detecting) {


        return;

    }


    const video =

        document.getElementById(

            "cameraVideo"

        );


    if (

        video.readyState >= 2 &&

        video.currentTime !==

        lastVideoTime

    ) {


        lastVideoTime =

            video.currentTime;


        const results =

            handLandmarker

                .detectForVideo(

                    video,

                    performance.now()

                );


        if (


            results.landmarks &&

            results.landmarks.length > 0

        ) {


            const landmarks =

                results.landmarks[0];


            recognizeGesture(

                landmarks

            );


            drawLandmarks(

                landmarks

            );


        }


        else {


            document

                .getElementById(

                    "cameraStatus"

                )

                .innerText =

                "Show your hand in front of the camera 🤟";


            clearCanvas();

        }


    }


    requestAnimationFrame(

        detectHands

    );

}


// ==========================================
// RECOGNIZE SIMPLE GESTURES
// ==========================================


function recognizeGesture(

    landmarks

) {


    const thumbTip =

        landmarks[4];


    const indexTip =

        landmarks[8];


    const middleTip =

        landmarks[12];


    const ringTip =

        landmarks[16];


    const pinkyTip =

        landmarks[20];


    const wrist =

        landmarks[0];


    let message = "";


    // THUMBS UP


    if (


        thumbTip.y < wrist.y &&

        indexTip.y > wrist.y &&

        middleTip.y > wrist.y &&

        ringTip.y > wrist.y &&

        pinkyTip.y > wrist.y

    ) {


        message =

            "Yes 👍";


    }


    // OPEN HAND


    else if (


        indexTip.y < wrist.y &&

        middleTip.y < wrist.y &&

        ringTip.y < wrist.y &&

        pinkyTip.y < wrist.y

    ) {


        message =

            "Hello 👋";


    }


    // CLOSED HAND


    else if (


        indexTip.y > wrist.y &&

        middleTip.y > wrist.y &&

        ringTip.y > wrist.y &&

        pinkyTip.y > wrist.y

    ) {


        message =

            "Stop ✊";


    }


    if (message !== "") {


        updateResult(

            message

        );


    }


}


// ==========================================
// UPDATE RESULT
// ==========================================


function updateResult(

    message

) {


    currentMessage =

        message;


    document

        .getElementById(

            "resultText"

        )

        .innerText =

        message;


    document

        .getElementById(

            "detectedText"

        )

        .innerText =

        message;


    document

        .getElementById(

            "cameraStatus"

        )

        .innerText =

        "AI detected: " +

        message;


}


// ==========================================
// DRAW HAND LANDMARKS
// ==========================================


function drawLandmarks(

    landmarks

) {


    const video =

        document.getElementById(

            "cameraVideo"

        );


    const canvas =

        document.getElementById(

            "handCanvas"

        );


    const ctx =

        canvas.getContext(

            "2d"

        );


    canvas.width =

        video.videoWidth;


    canvas.height =

        video.videoHeight;


    ctx.clearRect(

        0,

        0,

        canvas.width,

        canvas.height

    );


    for (

        const point

        of landmarks

    ) {


        ctx.beginPath();


        ctx.arc(

            point.x *

                canvas.width,


            point.y *

                canvas.height,


            6,


            0,


            2 *

                Math.PI

        );


        ctx.fillStyle =

            "#ffffff";


        ctx.fill();


    }


}


// ==========================================
// CLEAR CANVAS
// ==========================================


function clearCanvas() {


    const canvas =

        document.getElementById(

            "handCanvas"

        );


    const ctx =

        canvas.getContext(

            "2d"

        );


    ctx.clearRect(

        0,

        0,

        canvas.width,

        canvas.height

    );

}


// ==========================================
// STOP CAMERA
// ==========================================


function stopCamera() {


    detecting = false;


    if (cameraStream) {


        cameraStream

            .getTracks()

            .forEach(

                function(track) {


                    track.stop();


                }

            );


        cameraStream =

            null;

    }


    const video =

        document.getElementById(

            "cameraVideo"

        );


    const message =

        document.getElementById(

            "cameraMessage"

        );


    video.srcObject =

        null;


    video.style.display =

        "none";


    message.style.display =

        "block";


    document

        .getElementById(

            "cameraStatus"

        )

        .innerText =

        "Camera stopped";


    clearCanvas();


}


// ==========================================
// HERO CAMERA
// ==========================================


async function startHeroCamera() {


    const video =

        document.getElementById(

            "heroVideo"

        );


    const message =

        document.getElementById(

            "heroCameraMessage"

        );


    try {


        const stream =

            await navigator.mediaDevices

                .getUserMedia({

                    video: true,

                    audio: false

                });


        video.srcObject =

            stream;


        video.style.display =

            "block";


        message.style.display =

            "none";


    }


    catch (error) {


        alert(

            "Please allow camera permission."

        );


    }


}


// ==========================================
// TEXT TO SPEECH
// ==========================================


function speakText() {


    if (!currentMessage) {


        alert(

            "Show a hand gesture first 🤟"

        );


        return;

    }


    const speech =

        new SpeechSynthesisUtterance(

            currentMessage

        );


    speech.lang =

        "en-US";


    window.speechSynthesis

        .speak(

            speech

        );


}


// ==========================================
// DEMO BUTTONS
// ==========================================


function detectSign(

    message

) {


    updateResult(

        message

    );


}


// ==========================================
// CHANGE MODE
// ==========================================


function changeMode(

    mode,

    selectedButton

) {


    const buttons =

        document

            .querySelectorAll(

                ".mode-buttons button"

            );


    buttons.forEach(

        function(button) {


            button

                .classList

                .remove(

                    "active"

                );


        }

    );


    selectedButton

        .classList

        .add(

            "active"

        );


    const result =

        document

            .getElementById(

                "resultText"

            );


    if (mode === "sign") {


        result.innerText =

            "Show your hand to begin 🤟";


    }


    else {


        result.innerText =

            "Voice mode selected 🎤";


    }


}


// ==========================================
// SCROLL
// ==========================================


function scrollToSection(

    sectionId

) {


    document

        .getElementById(

            sectionId

        )

        .scrollIntoView({

            behavior: "smooth"

        });


            }
