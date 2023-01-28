const urlQuotes = "https://smileschool-api.hbtn.info/quotes"
function getSectionQuotes() {
    $('#quotes-loader').show();
    $.ajax({
        type: "GET",
        url: urlQuotes,
        success: function (data) {
            for (let i = 0; i < data.length; i++) {
                buildQuotes(i, data[i].pic_url ,data[i].text, data[i].name, data[i].title);
            }
        },
        error: function () {
            alert("Server Error");
            console.log("Can't get values");
        },
        complete: function () {
            $('#quotes-loader').hide();
        }
    });
}

function buildQuotes(position, image, text, name, title) {
    $("#js-content-quotes").append(
        $("<div></div>").attr({class: `carousel-item ${position === 0 ? "active" : ""}`}).append(
            $("<div></div").attr({class: "d-flex flex-column flex-sm-row align-items-center justify-content-sm-center"}).append(
                $("<div></div>").attr({class: "d-flex justify-content-center"}).append(
                    $("<img>").attr({
                        class: "rounded-circle",
                        src: image,
                        alt: "profil testimonial",
                        width: "160px",
                        height: "160px"
                    })
                ),
                $("<div></div>").attr({class: "section__carousel-paragraph font-size-large mt-3"}).append(
                    $("<p></p>").text(text),
                    $("<p></p>").attr({class: "font-weight-bold mb-0"}).text(name),
                    $("<p></p>").attr({class: "font-italic"}).text(title)
                )
            )
        )
    );
}

$(function () {
    getSectionQuotes();
})
