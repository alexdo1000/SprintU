window.onload = () => {
    var oldUrl = document.referrer;
    var aTag = document.getElementById("back-button")

    if (oldUrl != null && aTag != null) {
        aTag.href = oldUrl;
    }
}
