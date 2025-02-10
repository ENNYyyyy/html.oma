document.addEventListener("DOMContentLoaded", () => {
    const playButton = document.getElementById("play-button");
    const videoContainer = document.getElementById("video-container");
    const video = document.getElementById("letter-video");
    const draggableImage = document.getElementById("draggable-image");

    playButton.addEventListener("click", () => {
        if (videoContainer.style.display === "none" || videoContainer.style.display === "") {
            videoContainer.style.display = "block";
            video.play();
            playButton.innerText = "Stop Letter";
        } else {
            video.pause();
            videoContainer.style.display = "none";
            playButton.innerText = "Play Letter";
        }
    });

    let isDragging = false;

    function startDrag(event) {
        isDragging = true;
        let shiftX = (event.clientX || event.touches[0].clientX) - draggableImage.getBoundingClientRect().left;
        let shiftY = (event.clientY || event.touches[0].clientY) - draggableImage.getBoundingClientRect().top;
        
        function moveAt(pageX, pageY) {
            draggableImage.style.left = pageX - shiftX + "px";
            draggableImage.style.top = pageY - shiftY + "px";
        }

        function onMove(event) {
            if (!isDragging) return;
            let pageX = event.clientX || event.touches[0].clientX;
            let pageY = event.clientY || event.touches[0].clientY;
            moveAt(pageX, pageY);
        }

        document.addEventListener("mousemove", onMove);
        document.addEventListener("touchmove", onMove);

        document.addEventListener("mouseup", () => { isDragging = false; }, { once: true });
        document.addEventListener("touchend", () => { isDragging = false; }, { once: true });
    }

    draggableImage.addEventListener("mousedown", startDrag);
    draggableImage.addEventListener("touchstart", startDrag);
    draggableImage.ondragstart = () => false;
});
