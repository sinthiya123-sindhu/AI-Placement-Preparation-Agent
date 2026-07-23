// =====================================
// SILENTBRIDGE JAVASCRIPT
// =====================================


// Store current detected message

let currentMessage = "";


// Store camera stream

let cameraStream = null;


// =====================================
// START COMMUNICATION
// =====================================


function startCommunication() {


    document

        .getElementById("communication")

        .scrollIntoView({

            behavior: "smooth"

        });


}


// =====================================
// START MAIN CAMERA
// =====================================


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


        // Check browser support

        if (

            !navigator.mediaDevices ||

            !navigator.mediaDevices.getUserMedia

        ) {


            alert(

                "Camera is not supported by this browser."

            );


            return;

        }


        // Ask for camera permission

        cameraStream =

            await navigator.mediaDevices.getUserMedia({

                video: true,

                audio: false

            });


        // Show camera video

        video.srcObject = cameraStream;


        video.style.display = "block";


        message.style.display = "none";


        status.innerText =

            "Camera is active 🎥 — Ready to detect signs!";


    }


    catch (error) {


        console.error(

            "Camera Error:",

            error

        );


        status.innerText =

            "Camera access failed ❌";


        alert(

            "Camera access denied. Please allow camera permission and try again."

        );


    }


}


// =====================================
// STOP CAMERA
// =====================================


function stopCamera() {


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


    if (cameraStream) {


        cameraStream

            .getTracks()

            .forEach(

                function(track) {


                    track.stop();


                }

            );


        cameraStream = null;


    }


    video.srcObject = null;


    video.style.display = "none";


    message.style.display = "flex";


    status.innerText =

        "Camera stopped";


}


// =====================================
// HERO CAMERA
// =====================================


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

            await navigator.mediaDevices.getUserMedia({

                video: true,

                audio: false

            });


        video.srcObject = stream;


        video.style.display = "block";


        message.style.display = "none";


    }


    catch (error) {


        alert(

            "Please allow camera permission to start the camera."

        );


    }


}


// =====================================
// DETECT SIGN
// =====================================


function detectSign(message) {


    currentMessage = message;


    document

        .getElementById(
            "resultText"
        )

        .innerText = message;


    document

        .getElementById(
            "detectedText"
        )

        .innerText = message;


}


// =====================================
// SPEAK MESSAGE
// =====================================


function speakText() {


    if (currentMessage === "") {


        alert(

            "Please select a sign first 🤟"

        );


        return;


    }


    const speech =

        new SpeechSynthesisUtterance(

            currentMessage

        );


    speech.lang = "en-US";


    window

        .speechSynthesis

        .speak(speech);


}


// =====================================
// CHANGE COMMUNICATION MODE
// =====================================


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

            "Show a sign to begin 🤟";


    }


    else {


        result.innerText =

            "Speak something to begin 🎤";


    }


}


// =====================================
// SCROLL TO SECTION
// =====================================


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
