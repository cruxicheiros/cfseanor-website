function shiftHue(hue) {
    if (hue < 360) {
        return hue + 1;
    }
    return 0;
}

function cycleHuesByClassName(className) {
    const elems = document.getElementsByClassName(className);
    var hueState = 0;


    setInterval(function () {
        hueState = shiftHue(hueState);

        for (i=0;  i < elems.length; i++) {
            elems[i].style.color = 'hsl(' + hueState + ', 50%, 53%)';
        }
    }, 50);

}
