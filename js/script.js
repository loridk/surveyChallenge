// validate band name


$(document).ready(function(){
   loadQuestion(questions[0], lastQuestion);

    $(".btn-default").click(function(){
        var nextQuestion = $(this).attr("data-next");
        if (nextQuestion >= 0) {
            loadQuestion(questions[nextQuestion], lastQuestion);
        }
        else {
            $('#question').hide();
            $('#favBand').show();
        }
    });

    $("#submit").click(function(event){
        event.preventDefault();
        $('#favBand').hide();
        $('#bandsInTown').show();

        updatePoints();

        $.ajax({
            url: "script.php",
            type: "POST",
            dataType: "html",
            data: {band: $('#band').val().split(" ").join("")},
            success: function(data) {
                $('#bandsInTown').prepend("<h3>Thanks for taking our survey!</h3>")

                var obj = JSON.parse(data);

                if (obj.name) {
                    $("#bandName").html(obj.name);
                    $("#bandPic").attr("src", obj.thumb_url);
                    $('#bandFB').html('<a href="'+obj.facebook_page_url+'" target="_blank">'+obj.facebook_page_url+'</a>');
                    $('#bandEvents').html(obj.name+' has '+obj.upcoming_event_count+' events coming up');
                    $("#bandEventsLink").html('View them <a href="'+obj.url+'" target="_blank">here</a>')
                }
                else {
                    $('#bandsInTown').append('That artist must be pretty rare.');
                }


            },
            error: function(xhr, desc, err) {
                console.log(xhr);
                $("#bandsInTown").html(desc, err);
            }
        });

    });
});

var points = 0;
var lastQuestion = 0;

var questions = [
    {
        id: 0,
        text: "Do you like to see live music?",
        yes: 2,
        no: 1
    },
    {
        id: 1,
        text: "Do crowds make you uncomfortable?",
        yes: 5,
        no: 2
    },
    {
        id: 2,
        text: "Do you feel the bands you want to see come around to your area enough?",
        yes: 4,
        no: 3
    },
    {
        id: 3,
        text: "Are you satisfied with the number of venues in your area?",
        yes: 4,
        no: 5
    },
    {
        id: 4,
        text: "Do you feel ticket prices are too high?",
        yes: 5,
        no: 6
    },
    {
        id: 5,
        text: "Would you prefer more livestreams of live performances?",
        yes: 6,
        no: 6
    },
    {
        id: 6,
        text: "Would you take a survey like this again?",
        yes: -1,
        no: -1
    }
];



function loadQuestion(question, back) {

    lastQuestion = question["id"];
    $('.questionText').html(question["text"]);
    $('.yes').attr("data-next", question["yes"]);
    $('.no').attr("data-next", question["no"]);

    if (lastQuestion == 0) {
        $('.back').hide();
    }
    else {
        updatePoints();
        $('.back').show();
    }

    $('.back').attr("data-next", back);
}

function updatePoints() {
    points++;
    $('#points').html(points);
}