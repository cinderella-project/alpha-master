$(function(){
    function fileToImage(file, cb) {
        var reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function() {
            var image = new Image()
            image.src = reader.result
            image.onload = function() {
                cb(image)
            }
        }
    }
    $("#start").click(function(){
        // 画像を取得
        var imageFile = $("#selectFileInput").get(0).files[0];
        var rgb = $("#chromaKey").val().split(",")
        var canvas = $("#canvas").get(0)
        var sikii = $("#sikii").val()-0
        var context = canvas.getContext("2d")
        console.log(imageFile)
        fileToImage(imageFile, function(image) {
            console.log(image)
            canvas.width = image.width
            canvas.height = image.height
            context.drawImage(image, 0, 0)
            var imageData = context.getImageData(0, 0, image.width, image.height)
            var data = imageData.data
            for(var x = 0; x<image.width; x++) {
                for(var y = 0; y<image.height; y++) {
                    var i = ((y*canvas.width) + x)*4
                    var r = Math.abs(data[i+0] - rgb[0])
                    var g = Math.abs(data[i+1] - rgb[1])
                    var b = Math.abs(data[i+2] - rgb[2])
                    data[i+3] = (r+g+b) > sikii ? 255 : 0
                }
            }
            context.putImageData(imageData, 0, 0)
            $("#result").attr("src", canvas.toDataURL())
        })
    })
    $("#selectFile").click(function() {
        $("#selectFileInput").click()
    })
})