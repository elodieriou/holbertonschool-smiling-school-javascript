const urlQuotes = "https://smileschool-api.hbtn.info/quotes";
const urlTutorials = "https://smileschool-api.hbtn.info/popular-tutorials";
const urlLatest = "https://smileschool-api.hbtn.info/latest-videos";
const urlCourses = "https://smileschool-api.hbtn.info/courses";

/* *** SECTION QUOTES *** */
function getSectionQuotes() {
    $('.loader').show();
    $.ajax({
        type: "GET",
        url: urlQuotes,
        success: function (data) {
            for (let i = 0; i < data.length; i++) {
                buildQuote(i, data[i].pic_url ,data[i].text, data[i].name, data[i].title);
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

function buildQuote(position, image, text, name, title) {

    const check_active = position === 0 ? 'active' : '';

    $("#js-content-quotes").append(
        $("<div></div>").attr({class: `carousel-item ${check_active}`}).append(
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

/* *** SECTIONS TUTORIALS AND LATEST VIDEOS *** */

function getSectionTutorials() {
    $('.loader').show();
    $.ajax({
        type: "GET",
        url: urlTutorials,
        success: function (data) {
            retrieveDataForCarousel(this.url, data);
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

function getSectionLatest() {
    $('.loader').show();
    $.ajax({
        type: "GET",
        url: urlLatest,
        success: function (data) {
            retrieveDataForCarousel(this.url, data);
        },
        error: function () {
            alert("Server Error");
            console.log("Can't get values for section latest");
        },
        complete: function () {
            $('.loader').hide();
        }
    });
}

function retrieveDataForCarousel(url, data) {
    for (let i = 0; i < data.length; i++) {
        buildVideo(url, i, data[i].thumb_url, data[i].title, data[i]["sub-title"], data[i].author_pic_url, data[i].author, data[i].star, data[i].duration)
    }
}

function buildVideo(url, position, thumb_image, title, sub_title, author_image, author_name, stars, duration) {

    const html_stars = calculateStars(stars);
    const check_id = url === urlTutorials ? '#js-content-tutorials' : '#js-content-latest';
    const check_active = position === 0 ? 'active' : '';

    $(check_id).append(
        $('<div></div>').attr({class: `carousel-item ${check_active}`}).append(
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

/* *** SECTION FILTERS *** */

function getSectionFilters() {

    $.ajax({
        type: "GET",
        url: urlCourses,
        success: function (data) {
            buildDefaultValue(data.topic, data["sort"], data.q);
            buildDropdown(data.topics, data.sorts);
        },
        error: function () {
            alert("Server Error");
            console.log("");
        }
    });
}

function buildDefaultValue(topic, sort, q) {
    $('#topic-dropdown button').append(
        $('<span></span>').attr("data-value", `${topic}`).text(topic.replace(/^./, topic[0].toUpperCase()))
    );
    $('#sort-dropdown button').append(
        $('<span></span>').attr("data-value", `${sort}`).text(sort.replace(/^./, sort[0].toUpperCase()).replace(/_/, " "))
    );
    $('#search-bar').val(q);

    getSectionCourses();
}

function buildDropdown(topics, sorts) {
    for (let i = 0; i < topics.length; i++) {
        const displayValue = topics[i].replace(/^./, topics[i][0].toUpperCase());
        $('#topic-menu').append(
            $('<a></a>').attr({class: "dropdown-item", href: "#", ["data-value"]: topics[i]}).text(displayValue).click(function (event) {
                event.preventDefault();
                $('#topic-dropdown button span').attr("data-value", $(this).attr("data-value")).text(this.text);
                getSectionCourses();
            })
        );
    }

    for (let i = 0; i < sorts.length; i++) {
        const displayValue = sorts[i].replace(/^./, sorts[i][0].toUpperCase()).replace(/_/, " ");
        $('#sort-menu').append(
            $('<a></a>').attr({class: "dropdown-item", href: "#", ["data-value"]: sorts[i]}).text(displayValue).click(function (event) {
                event.preventDefault();
                $('#sort-dropdown button span').attr("data-value", $(this).attr("data-value")).text(this.text);
                getSectionCourses();
            })
        );
    }
}

function onSearchBar() {
    $('#js-search-input button').on("click keypress", function (event) {
        event.preventDefault();
        getSectionCourses();
    })

    // Handle when clear the text with the little 'x'
    $('#js-search-input input').on("search", function (event) {
        event.preventDefault();
        getSectionCourses();
    })
}

/* *** SECTION COURSES *** */

function getSectionCourses() {
    $('.loader').show();
    const data = {
        q: $('#search-bar').val(),
        topic: $('#topic-dropdown button span').attr("data-value"),
        sort: $('#sort-dropdown button span').attr("data-value")
    }
    const url = `${urlCourses}?q=${data.q}&topic=${data.topic}&sort=${data.sort}`;
    $.ajax({
        type: "GET",
        url: url,
        data: data,
        success: function (data) {
            $('#js-content-courses').empty();
            calculateNumberCourses(data["courses"]);
            retrieveDataForCourses(data["courses"]);
        },
        error: function () {
            alert("Server Error");
            console.log("");
        },
        complete: function () {
            $('.loader').hide();
        }
    });
}

function retrieveDataForCourses(data) {
    for (let i = 0; i < data.length; i++) {
        buildCard(data[i]["thumb_url"], data[i].title, data[i]["sub-title"], data[i]["author_pic_url"], data[i].author, data[i]["star"], data[i].duration);
    }
}

function calculateNumberCourses(data) {
    const number = data.length;
    const displayValue = number === 1 ? `${number} video` : `${number} videos`;
    $('#js-number-videos').text(displayValue);
}

function buildCard(thumb_image, title, sub_title, author_image, author_name, stars, duration) {

    const html_stars = calculateStars(stars);

    $('#js-content-courses').append(
        $('<div></div>').attr({class: "card border-0 col-12 col-sm-6 col-md-4 col-lg-3 mt-5", style: "width: 18rem"}).append(
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
    );
}

$(function () {
    getSectionQuotes();
    getSectionTutorials();
    getSectionLatest();
    getSectionFilters();
    getSectionCourses();
    onSearchBar();
})
