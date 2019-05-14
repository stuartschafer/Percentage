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
    let wrong = new Audio("sounds/wrong.mp3");
    let clap = new Audio("sounds/clap.wav");
    let boo = new Audio("sounds/boo.wav");
    $("#nextQuestion").hide();
    $("#guessArea").hide();
    $(".arrows").hide();
    $("#checkFinalAnswer").hide();
    $("#gameOver").hide();
    let questions = ["In 2018, what percentage of consumers said they were confident in the food supply?",
                    "When asked what is the most important food safety issue today, this percentage of people said it is foodborne illness from bacteria.",
                    "Since 2013, recalls of hazardous meat and poultry are up by this percentage.",
                    "What percentage of foodborne illness outbreaks in the US occur at restaurants?",
                    "Produce accounts for this percentage of food that is unconsumed (and wasted).",
                    "This % of foodborne illnesses resulting in death comes from Salmonella.",
                    "What percent of the population affected by food borne illnesses do children account for?",
                    "It is estimated that of all the 2018 Food Recalls, this percent could have been prevented.",
                    "What percent of the world do Americans account for from food borne illnesses in the world?"];
    let answers = [68, 24, 83, 60, 52, 31, 40, 56, 17];
    // let solutions = ["79% of American homes have either a desktop or laptop computer."];
    
    // This starts the beginning of the game when the "Flip to see who goes first" is clicked
    $("#beginGame").click(function() {
        $("#teamName").empty();
        team1Name = $("#team1Entry").val().trim();
        team2Name = $("#team2Entry").val().trim();

        if (team1Name === "" || team2Name === "") {
            boo.play();
            $("#teamName").html("Please enter a valid name for both teams.");
            return;
        }

        $(".teamArea").removeClass("hvr-bounce-to-bottom");
        $(".askName").css("color", "white");
        $(".teamArea").css("border", "5px solid darkgreen");
        $(".teamButtons").hide();
        $("#beginGame").hide();
        $("#team1").html(team1Name);
        $("#team2").html(team2Name);
        $("#team1Score").html("Score: 0");
        $("#team2Score").html("Score: 0");

        // Randomly selects the team to go first
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

    // This brings up the next question
    $("#nextQuestion").click(function() {
        $(".infoSection").empty();
        $("#timer").empty();
        $("#nextQuestion").hide();
        $("#questionNumber").show();
        $(".teamArea").removeClass("pulse");
        $("#guess").val("");
        question++;
        $("#questionNumber").html("Question Number " + question);

        // This switches the 2 teams up (who guesses first) but only after the first round
        if (question > 1) {
            $(".teamArea").css("background-color", "black");
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
        if (x === 2) {
            time = 5100;
            //time = 300;
        } else {
            time = 4600;
            //time = 600;
        }
        x++;
        $("#questionArea").html(questions[x]);
        timeframe = "firstGuess";
        timer();
    });

    // This only shows when the second team has to guess higher or lower AND they select HIGHER
    $("#upArrow").click(function() {
        clearInterval(intervalId);
        $(".infoSection").empty();
        $(".arrows").hide();
        arrowGuess = "HIGHER";
        checkAnswer();
    });

    // This only shows when the second team has to guess higher or lower AND they select LOWER
    $("#downArrow").click(function() {
        clearInterval(intervalId);
        $(".infoSection").empty();
        $(".arrows").hide();
        arrowGuess = "LOWER";
        checkAnswer();
    });

    // This appears when the first team has to enter a % guess
    $("#firstGuess").click(function() {
        $("#timer").css("font-size", "30px");
        $("#timer").css("color", "white");
        guess = Number($("#guess").val().trim());
        guessStr = $("#guess").val().trim();
        $("#teamName").empty();
        $("#guessArea").hide();

        if (guess < 0 || guess > 100 || guessStr === "") {
            boo.play();
            $("#teamName").html("Please make a guess between 0 and 100");
            $("#guess").val("");
            $("#guessArea").show();
            return;
        } else {
            clearInterval(intervalId);
        }

        // Checks to see if it is the correct answer
        if (guess === answers[x]) {
            $("#guessArea").hide();
            awardPoint();
            return;
        }
        nextTeamGuess();
    });

    // This will appear after a teams has selected HIGHER or LOWER
    $("#checkFinalAnswer").click(function() {
        $("#questionNumber").empty();
        $("#checkFinalAnswer").hide();
        $("#message").show();
        // $("#questionArea").html(solutions[x]);
        $("#teamGuess").show();
        awardPoint();
    });

    $("#gameOver").click(function() {
        gameOver();
    });

    // This runs to see who wins a point
    function awardPoint() {
        clap.play();
        let otherGuess = "";
        let correctGuess = "";
        if (arrowGuess === "HIGHER") {
                otherGuess = "LOWER (" + answers[x] + "%) <img class='smallArrow' src='images/smallDown.png'></img> ";
                correctGuess = "HIGHER (" + answers[x] + "%) <img class='smallArrow' src='images/smallUp.png'></img> ";
            } else {
                otherGuess = "HIGHER (" + answers[x] + "%) <img class='smallArrow' src='images/smallUp.png'></img> ";
                correctGuess = "LOWER (" + answers[x] + "%) <img class='smallArrow' src='images/smallDown.png'></img> ";
            }

        // firstTeam wins a point
        if ((guess < answers[x] && arrowGuess === "LOWER") || (guess > answers[x] && arrowGuess === "HIGHER") || (guess === answers[x])) {
            if (guess === answers[x]) {
                $("#timer").empty();
                $("#timer").append("<br> The answer is exactly (" + guess + "%) thus, " + firstTeam + " wins the point!");
            } else {
                $("#timer").append("<br> The answer was <span id='finalAnswer'>" + otherGuess + "</span> thus, " + firstTeam + " wins the point!");
            }

            if (firstTeam === team1Name) {
                $("#one").addClass("pulse");
                $("#one").css("background-color", "green");
                team1Score++;
                $("#team1Score").html("Score: " + team1Score);
            } else {
                $("#two").addClass("pulse");
                $("#two").css("background-color", "green");
                team2Score++;
                $("#team2Score").html("Score: " + team2Score);
            }
        } else {
            // secondTeam wins a point
            $("#timer").append("<br> The answer was <span id='finalAnswer'>" + correctGuess + "</span> thus, " + secondTeam + " wins the point!");

            if (secondTeam === team1Name) {
                $("#one").addClass("pulse");
                $("#one").css("background-color", "green");
                team1Score++;
                $("#team1Score").html("Score: " + team1Score);
            } else {
                $("#two").addClass("pulse");
                $("#two").css("background-color", "green");
                team2Score++;
                $("#team2Score").html("Score: " + team2Score);
            }
        }

        // This swaps the teams
        if (firstTeam === team1Name) {
            nextTeam = team2Name;
        } else {
            nextTeam = team1Name;
        }
        $("#timer").css("font-size", "30px");
        $("#timer").css("color", "white");
        
        // This checks to see if the game is over
        if ((x >= 7) && (team1Score === team2Score)) {
            $("#timer").append("<br>WE HAVE A TIE, so 1 more question for a tie-breaker!!! <br>" + nextTeam + " will go first");
            $("#nextQuestion").show();
        } else if ((x >= 7) && (team1Score || team2Score)) {
            $("#gameOver").show();
        } else {
            $("#timer").append("<br><br><span id='guessNext'>" + nextTeam + " will be guessing first for the next round.</span>");
            $("#nextQuestion").show();
        }

    } 

    // This is for the count-down timer
    function timer() {
	    intervalId = setInterval(count, 10);
    }

    function count () {
        if (time === 0) {
            wrong.play();
            clearInterval(intervalId);
            $("#timer").css("font-size", "60px");
            $("#timer").html("TIME TO MAKE A GUESS");
            if (timeframe === "firstGuess") {
                
            }
            
        } else if (time % 100 === 0) { 
            $("#timer").css("font-size", "150px");
            if (time < 1100) {
                $("#timer").css("color", "red");
            }
            if (time < 4100) {
                $("#timer").html(time/100);
                if (timeframe === "firstGuess") {
                    $("#guessArea").show();
                }
            }
        }
        time--;
    }

    function nextTeamGuess() {
        $("#timer").hide();
        $(".teamArea").css("background-color", "black");
        $("#guessArea").hide();
        $(".arrows").fadeIn("slow");

        // For an exact guess
        if (guess === answers[x]) {
            $("#message").html("WAY TO GO " + firstTeam + "! You guessed it exactly!!! You win a point.");
            awardPoint();
        }

        // This changes the background color of the team's turn
        if (firstTeam === team1Name) {
            $("#teamName").html(team2Name + ",");
            $("#two").css("background-color", "green");
        } else {
            $("#teamName").html(team1Name + ",");
            $("#one").css("background-color", "green");
        }

        $("#message").html(" do you think it is HIGHER or LOWER than ");
        $("#teamGuess").html(guess + "%?");
        $("#timer").show();
        timeframe = "secondGuess";
        time = 3000;
        timer(); 
    }

    function checkAnswer() {
        $("#timer").show();
        $(".teamArea").css("background-color", "black");
        $("#timer").css("color", "white");
        $("#timer").css("font-size", "30px");
        $("#timer").html(firstTeam + " guessed " + guess + "%, and " + secondTeam + " thinks it is " + arrowGuess + " ");
        if (arrowGuess === "HIGHER") {
            $("#timer").append("<img class='smallArrow' src='images/smallUp.png'></img> .");
        } else {
            $("#timer").append("<img class='smallArrow' src='images/smallDown.png'></img> .");
        }
        $("#checkFinalAnswer").fadeIn("slow");
    }

    function gameOver() {
        $("#one").removeClass("pulse");
        $("#two").removeClass("pulse");
        $("#timer").addClass("highlight")
        if (team1Score > team2Score) {
            $("#one").addClass("pulse");
            $("#timer").html("Congradulations " + team1Name + "!, you have defeated " + team2Name);
        } else {
            $("#two").addClass("pulse");
            $("#timer").html("Congradulations " + team2Name + "!, you have defeated " + team1Name);
        }
    }

});