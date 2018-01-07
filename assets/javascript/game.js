$(document).ready(function() {

    var chosenid;
    var enemies;
    var enemyid;


    function initialize () {
        //Remove status text
        $("#status").html("");

        //Set the data properties that align with a character
        $("#character1").data("attr", {name: "Obi-Wan Kenobi", hp: 120, ap: 8, bap: 8, cap: 10})
        $("#character2").data("attr", {name: "Luke Skywalker", hp: 100, ap: 10, bap: 12, cap: 5})
        $("#character3").data("attr", {name: "Darth Sidious", hp: 150, ap: 12, bap: 12, cap: 20})
        $("#character4").data("attr", {name: "Darth Maul", hp: 180, ap: 14, bap: 14, cap: 25})

        //Set the base healthpoint text
        $("#character1").children(".healthpoints").text($("#character1").data("attr").hp)
        $("#character2").children(".healthpoints").text($("#character2").data("attr").hp)
        $("#character3").children(".healthpoints").text($("#character3").data("attr").hp)
        $("#character4").children(".healthpoints").text($("#character4").data("attr").hp)

        chosenid = "";
        enemies = [];
        enemyid = "";
    };


//choose the character and the enemy remainder
    $(document).on("click", ".character", function() {
        chosenid = "#" + $(this).attr("id");


        $("#chosen").append($("#" + $(this).attr("id")));
        $("#enemies").append($("#characters").children());
        $("#enemies").children().removeClass("character").addClass("enemies");
        $("#enemies").children().each(function() {
            enemies.push($( this ).attr("id")) 
        });
    });

//choose the enemy
    $(document).on("click", ".enemies", function () {
        if (enemyid === "") {
            enemyid = "#" + $(this).attr("id");
            $("#enemy").append($("#" + $(this).attr("id")))
            $("#enemy").children().removeClass("enemies").addClass("enemy");
            $("#status").html("");
        }
    });

//attack
    $(document).on("click", "#attack", function() {

        if (enemyid === "") {
            $("#status").text("No enemy here.");
            return;
            
        } else {

            console.log("Try this - chosen :", chosenid, "enemy:", enemyid)
            
            var chosenname = $(chosenid).data("attr").name;
            var enemyname = $(enemyid).data("attr").name;
            var chosenhp = $(chosenid).data("attr").hp;
            var chosenap = $(chosenid).data("attr").ap;
            var chosenbap = $(chosenid).data("attr").bap;
            var enemyhp = $(enemyid).data("attr").hp;
            var enemycap = $(enemyid).data("attr").cap;
    
            $(enemyid).data("attr").hp = enemyhp-chosenap;
            $(chosenid).data("attr").ap = chosenap+chosenbap;

            if ($(enemyid).data("attr").hp > 0) {


                $("#status").html("<p>You attacked " + enemyname + " for " + chosenap + " damage.</p><p>" + enemyname + " attacked you for " + enemycap + " damage.</p>")
        
                $(chosenid).data("attr").hp = chosenhp-enemycap;

                $(chosenid).children(".healthpoints").text($(chosenid).data("attr").hp);
                $(enemyid).children(".healthpoints").text($(enemyid).data("attr").hp);

            } else {
                enemies.pop(enemyid);

                if (enemies.length === 0) {
                    $(enemyid).hide();
                    $("#status").text("You Won!!! GAME OVER!!!");
                    return;

                } else {

                $("#status").text("You have defeated " + enemyname + ", you can choose to fight another enemy.");
                $(enemyid).hide();
                enemyid = ""

                }
            }
            
            if ($(chosenid).data("attr").hp <= 0) {
                $("#status").text("You have been defeated! GAME OVER!!!");
                return;
            } 
        }
    });
    
//reset
    $(document).on("click", "#reset", function () {
        initialize();
        $("#characters").append($("#character1"));
        $("#characters").append($("#character2"));
        $("#characters").append($("#character3"));
        $("#characters").append($("#character4"));

        $("#characters").children().removeClass("enemy").addClass("character").show();

    });

    initialize();

});