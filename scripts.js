const urlQuotes = "https://smileschool-api.hbtn.info/quotes";
const urlTutorials = "https://smileschool-api.hbtn.info/popular-tutorials";

function getSectionQuotes() {
    $('.loader').show();
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
            console.log("Can't get values for section quotes");
        },
        complete: function () {
            $('.loader').hide();
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

function getSectionTutorials() {
    $('.loader').show();
    $.ajax({
        type: "GET",
        url: urlTutorials,
        success: function (data) {
            for (let i = 0; i < data.length; i++) {
                buildTutorials(i, data[i].thumb_url, data[i].title, data[i]["sub-title"], data[i].author_pic_url, data[i].author, data[i].star, data[i].duration)
            }
        },
        error: function () {
            alert("Server Error");
            console.log("Can't get values for section tutorials");
        },
        complete: function () {
            $('.loader').hide();
        }
    });
}

function buildTutorials(position, thumb_image, title, sub_title, author_image, author_name, stars, duration) {

    const html_stars = calculateStars(stars);

    $('#js-content-tutorials').append(
        $('<div></div>').attr({class: `carousel-item ${position === 0 ? 'active' : ''}`}).append(
            $('<div></div>').attr({class: "d-flex mt-5 justify-content-center"}).append(
                $('<div></div>').attr({class: "card border-0 fixed-size-card", style: "width: 18rem"}).append(
                    $('<img>').attr({
                        class: "card-img-top img-fluid",
                        src: thumb_image,
                        alt: "tuto"
                    }),
                    $('<img>').attr({
                        class: "position-absolute position-play",
                        src: "images/play.png",
                        alt: "play",
                        width: "64px",
                        height: "64px"
                    }),
                    $('<div></div>').attr({class: "card-body d-flex flex-column"}).append(
                        $('<h3></h3>').attr({class: "card-title font-weight-bold font-size-large"}).text(title),
                        $('<p></p>').attr({class: "card-text"}).text(sub_title),
                        $('<div></div>').attr({class: "d-flex"}).append(
                            $('<img>').attr({
                                class: "rounded-circle mr-3",
                                src: author_image,
                                alt: "profil",
                                width: "30px",
                                height: "30px"
                            }),
                            $('<strong></strong>').text(author_name)
                        ),
                        $('<div></div>').attr({class: "d-flex justify-content-between mt-3"}).append(
                            $('<div></div>').append(html_stars),
                            $('<strong></strong>').text(duration)
                        )
                    )
                )
            )
        )
    );
}

function calculateStars(number_stars) {
    let html = '';
    for (let i = 0; i < number_stars; i++) {
        html += `<img src="images/star_on.png" alt="star on" width="15px" height="15px">`
    }
    if (number_stars < 5) {
        for (let i = 1; i <= 5 - number_stars; i++) {
            html += `<img src="images/star_off.png" alt="star off" width="15px" height="15px">`
        }
    }
    return html
}


$(function () {
    getSectionQuotes();
    getSectionTutorials();
})
