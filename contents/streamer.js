function updateImage() {
    $.ajax({
        url: "/capture",
        dataType: "json",
        success: function(data) {
            status = document.getElementById("statusp");
            success = false
            if (data.status == "success") {
                success = true
            } else {
                $("#statusp").text("Status: Error: Server Message: " + data.reason);
            }
            if (success) {
                requestAnimationFrame( function () {
                    imagediv = document.getElementById("imagebox");
                    while (imagediv.hasChildNodes()) {
                        imagediv.removeChild(imagediv.lastChild);
                    }
                    img = document.createElement("img");
                    img.setAttribute("src", "/contents/image.jpg?blah=" + String(Math.random()));
                    img.setAttribute("class", "img-responsive img-rounded");
                    imagediv.appendChild(img);
                    $("#statusp").text("Status: Success!");
                })

            }
        }
    })
}
setInterval(updateImage, 5000);