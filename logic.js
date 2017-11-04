$(document).ready(function() {
    let team1Name = "";
    let team2Name = "";
    let firstTeam = "";
    let secondTeam = "";
    let nextTeam = "";
    let question = 0;
    let team1Score = 0;
    let team2Score = 0;
    let guess = "";
    let arrowGuess = "";
    let timeframe = "";
    let x = -1;
    let coinflip = 0;
    let time = 0;
    $("#nextQuestion").hide();
    $("#guessArea").hide();
    $(".arrows").hide();
    $("#checkFinalAnswer").hide();
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

        coinFlip = Math.floor((Math.random() * 2) + 1);
        
        if (coinFlip === 1) {
            firstTeam = team1Name;
            secondTeam = team2Name;
            $("#questionArea").html(team1Name + " will go first");
            $("#one").css("background-color", "green");
        } else {
            firstTeam = team2Name;
            secondTeam = team1Name;
            $("#questionArea").html(team2Name + " will go first");
            $("#two").css("background-color", "green");
        }
        $("#nextQuestion").fadeIn("slow");
    });

    $("#nextQuestion").click(function() {
        $(".teamArea").css("background-color", "black");
        $("#questionNumber").show();
        $(".teamArea").removeClass("pulse");
        $("#guess").val("");
        question++;
        $("#questionNumber").html("Question Number " + question);

        if (question > 1) {
            if (firstTeam === team1Name) {
                firstTeam = team2Name;
                secondTeam = team1Name;
                $("#two").css("background-color", "green");
            } else {
                firstTeam = team1Name;
                secondTeam = team2Name;
                $("#one").css("background-color", "green");
            }
        }
            

        time = 200;
        x++;
        $(".infoSection").empty();
        $("#questionArea").html(questions[x]);
        $("#nextQuestion").hide();
        timeframe = "firstGuess";
        timer();
    });

    $("#upArrow").click(function() {
        clearInterval(intervalId);
        $(".infoSection").empty();
        $(".arrows").hide();
        arrowGuess = "HIGHER";
        checkAnswer();
    });

    $("#downArrow").click(function() {
        clearInterval(intervalId);
        $(".infoSection").empty();
        $(".arrows").hide();
        arrowGuess = "LOWER";
        checkAnswer();
    });

    $("#sizing-addon23").click(function() {
        guess = $("#guess").val().trim();
        nextTeamGuess();
    });

    $("#checkFinalAnswer").click(function() {
        $("#questionNumber").empty();
        $("#checkFinalAnswer").hide();
        $("#message").show();
        $("#message").html("The answer is " + answers[x] + "% and ");
        $("#teamGuess").show();
        
        if ((guess < answers[x] && arrowGuess === "HIGHER") || (guess > answers[x] && arrowGuess === "LOWER")) {
            // secondTeam wins a point
            $("#message").append(secondTeam + " wins a point!");

            if (secondTeam === team1Name) {
                $("#one").addClass("pulse");
                $("#one").css("background-color", "green");
                team1Score++;
                $("#team1Score").html(team1Score);
            } else {
                $("#two").addClass("pulse");
                $("#two").css("background-color", "green");
                team2Score++;
                $("#team2Score").html(team2Score);
            }
        } else {
            // firstTeam wins a point
            $("#message").append(firstTeam + " wins a point!");

            if (firstTeam === team1Name) {
                $("#one").addClass("pulse");
                $("#one").css("background-color", "green");
                team1Score++;
                $("#team1Score").html(team1Score);
            } else {
                $("#two").addClass("pulse");
                $("#two").css("background-color", "green");
                team2Score++;
                $("#team2Score").html(team2Score);
            }
        }
        
        if (firstTeam === team1Name) {
            nextTeam = team2Name;
        } else {
            nextTeam = team1Name;
        }
        $("#timer").css("font-size", "40px");
        $("#timer").css("color", "white");
        $("#timer").html(nextTeam + " will be guessing first for the next round.")
        $("#nextQuestion").show();

    });


    function timer() {
	    intervalId = setInterval(count, 10);
    }

    function count () {
        if (time === 0) {
            clearInterval(intervalId);
            $("#timer").css("font-size", "60px");
            $("#timer").html("TIME TO MAKE A GUESS");
            if (timeframe === "firstGuess") {
                $("#guessArea").show();
            }
            
            
        } else if (time % 100 === 0) { 
            $("#timer").css("font-size", "60px");
            if (time < 1100) {
                $("#timer").css("color", "red");
            }
            if (time < 4600) {
                $("#timer").html(time/100);
            }
        }
        time--;
    }

    function nextTeamGuess() {
        // $("#timer").css("font-size", "35px");
        $("#timer").hide();
        $(".teamArea").css("background-color", "black");
        $("#guessArea").hide();
        $(".arrows").fadeIn("slow");

        if (firstTeam === team1Name) {
            $("#teamName").html(team2Name + ",");
            $("#two").css("background-color", "green");
        } else {
            $("#teamName").html(team1Name + ",");
            $("#one").css("background-color", "green");
        }

        $("#message").html(" do you think it is HIGHER or LOWER than");
        $("#teamGuess").html(guess + "%?");
        $("#timer").show();
        timeframe = "secondGuess";
        time = 200;
        timer(); 
    }

    function checkAnswer() {
        $("#timer").show();
        $(".teamArea").css("background-color", "black");
        $("#timer").css("font-size", "40px");
        $("#timer").html(firstTeam + " guessed " + guess + "%, and " + secondTeam + " thinks it is " + arrowGuess);
        $("#checkFinalAnswer").fadeIn("slow");
    }



});
