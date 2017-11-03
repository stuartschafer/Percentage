$(document).ready(function() {
    let team1Name = "";
    let team2Name = "";
    let question = 1;
    let x = 0;
    let time = 300;
    $("#nextQuestion").hide();
    let questions = ["What percent of American homes have some sort of computer?",
    "Women earn what % of all undergraduate computer and information sciences degrees?",
    "% of Fortune 50 companies that use GITHUB Enterprise",
    "This % of programmer working time is spent surfing the source code. This navigation involves research, observation, information gathering and other activities.",
    "Percentage of bugs that can be discovered (but not necessarily fixed) when more than one person reviews the source code.",
    "In 2017 Q3, Javascript had the highest pull % on GitHub.  What was it?",
    "This percentage of the world’s currency is physical money, the rest only exists on computers."];
    let answers = [85, 18, 52, 30, 60, 22, 8];

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

    $("#nextQuestion").click(function() {
         $("#questionArea").html(questions[3]);
         $("#nextQuestion").hide();
         timer();
    });


    function timer() {
	    intervalId = setInterval(count, 10);
    }

    function count () {
        if (time === 0) {
            clearInterval(intervalId);
            $("#timer").css("font-size", "90px");
            $("#timer").html("TIME TO MAKE A GUESS");
        } else if (time % 100 === 0) { 
            if (time < 1100) {
                $("#timer").css("color", "red");
            }
            $("#timer").html(time/100); }
            time--;
    }

});
