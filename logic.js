$(document).ready(function() {
    let team1Name = "";
    let team2Name = "";
    let question = 1;
    $("#nextQuestion").hide();

    $("#beginGame").click(function() {
        team1Name = $("#team1Entry").val().trim();
        team2Name = $("#team2Entry").val().trim();
        $(".teamButtons").hide();
        $("#beginGame").hide();
        $("#team1").html(team1Name);
        $("#team2").html(team2Name);
        $("#questionNumber").html("Question Number " + question);

        let coinFlip = Math.floor((Math.random() * 2) + 1);
        
        if (coinFlip === 1) {
            $("#questionArea").html(team1Name + " will go first");
            $("#one").css("background-color", "red");
        } else {
            $("#questionArea").html(team2Name + " will go first");
            $("#two").css("background-color", "green");
        }
        $("#nextQuestion").fadeIn("slow");
    });




});
