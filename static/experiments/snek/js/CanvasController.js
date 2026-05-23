function initCanvas(canvas, ctx) {
    window.addEventListener("resize", setCanvasDimensions, false);
    document.addEventListener("mousemove", function (e) {
                                            var mouseX = e.x * canvas.width / canvas.clientWidth | 0;
                                            var mouseY = e.y * canvas.height / canvas.clientHeight | 0;
                                            update(mouseX, mouseY, canvas, ctx);
                                            }, false);
    setCanvasDimensions(canvas);
}

function setCanvasDimensions(canvas) {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
}

function calculateLineEndpointX(mouseX, canvas){
    if (mouseX > canvas.width/2) {
        return canvas.width + 100;
    }
    return -100;
}

function update(x, y, canvas, ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.moveTo(calculateLineEndpointX(x, canvas), y);
    ctx.lineTo(x, y);
    ctx.lineWidth = 100;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#0a0a0a';
    ctx.stroke();
}
