/**
 *
 * @source: http://example.com/js/caro-game.js
 *
 * @licstart  The following is the entire license notice for the 
 *  JavaScript code in this page.
 *
 * Copyright (C) 2016  Dang Duong
 *
 *
 * The JavaScript code in this page is free software: you can
 * redistribute it and/or modify it under the terms of the GNU
 * General Public License (GNU GPL) as published by the Free Software
 * Foundation, either version 3 of the License, or (at your option)
 * any later version.  The code is distributed WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.
 *
 * As additional permission under GNU GPL version 3 section 7, you
 * may distribute non-source (e.g., minimized or compacted) forms of
 * that code without the copy of the GNU GPL normally required by
 * section 4, provided you include this license notice and a URL
 * through which recipients can access the Corresponding Source.
 *
 * @licend  The above is the entire license notice
 * for the JavaScript code in this page.
 *
 */
function createGame(){
	$.post(
		siteUrl+"/game/create_game", {}, function(jsonResult, status){
			if (status == "success"){
				if (jsonResult.status == 0)
					displayGame(jsonResult.data.gameId);
				else
					alert(jsonResult.data.errorMessage);
			}
			else {
				alert("Error while creating new game!");
			}
		}
	);
}

function showGamesList(){
	$.post(
		siteUrl, {}, function(jsonResult, status){
			if (status == "success"){
				if (jsonResult.status == 0){
					gamesList = jsonResult.data;
					gamesListHtml = "";
					for (var i = 0; i < gamesList.length; i++){
						gamesListHtml += "<tr><td>"+gamesList[i].player1Name+"</td><td>"+gamesList[i].player2Name+"</td><td>"+gamesList[i].player1Wins+" - "+gamesList[i].player2Wins+"</td><td><button type='button' id='"+gamesList[i].gameId+"' class='view-game'>View Game</button></td></tr>";
					}
					$("table#games-list tbody").html(gamesListHtml);

				}
			}
		}
	);
}

function joinGame(gameId){
	$.post(
		siteUrl+"/game/join_game/"+gameId, {}, function(jsonResult, status){
			if (status == "success"){
				if (jsonResult.status == 0){
					$("button#join-game").hide();
					$("button#ready-game").show();
					$("button#quit-game").show();
				}
				else
					alert(jsonResult.data.errorMessage);
			}
			else {
				alert("Error while joining game!");
			}
		}
	);
}

function readyGame(){
	$.post(
		siteUrl+"/game/ready_game/", {}, function(jsonResult, status){
			if (status == "success"){
				if (jsonResult.status == 0)
					$("#player-ready").val(1);
				else
					alert(jsonResult.data.errorMessage);
			}
			else 
				alert("Error while getting ready!");
		}
	);
}

function displayGame(gameId){
	$("#game-modes").val("game");
	$("#game-id").val(gameId);
	$("button#create-game").hide();
	$("button#back-to-main-menu").show();
	$("table#games-list tbody").html("");

	for (var i = 0; i < 15; i++){
		$("#game-moves tbody").append("<tr id='caro-row-"+i+"'></tr>");
		for (var j = 0; j < 15; j++){
			$("#game-moves tbody #caro-row-"+i).append("<td><button type='button' id='caro-square-"+i+"-"+j+"' class='caro-square'>&nbsp</button></td>");
		}
	}

}

function updateMove(moveX, moveY){
	$.post(
		siteUrl+"/game/update_move/"+moveX+"/"+moveY, {}
	);
}

function refreshGame(gameId){
	var moves = [];

	for (var i = 0; i < 15; i++){
		moves[i] = [];
		for (var j = 0; j < 15; j++){
			var caroSquareVal = $("#caro-square-"+i+"-"+j).html();
			moves[i][j] = (caroSquareVal == "X") ? 1 : ((caroSquareVal == "O") ? 2 : 0);
		}
	}
	$.post(
		siteUrl+"/game/refresh_game/"+gameId+"/"+$("#player1-id").val()+"/"+$("#player2-id").val()+"/"+$("#game-status").val()+"/"+$("#game-turn").val(),
		{
			moves: moves
		},
		function(jsonResult, status){
			if (status == "success"){
				if (jsonResult.status == 0){
					$.each(jsonResult.data, function(k, v){
						if (k == "player1Id")
							$("#player1-id").val(v);
						else if (k == "player2Id")
							$("#player2-id").val(v);
						else if (k == "player1Name")
							$("#player1-name").html(v);
						else if (k == "player2Name")
							$("#player2-name").html(v);
						else if (k == "countdown")
							$("#countdown").html(v);
						else if (k == "status")
							$("#game-status").val(v);
						else if (k == "turn")
							$("#game-turn").val(v);
						else if (k == "moves"){
							for (var i = 0; i < 15; i++){
								for (var j = 0; j < 15; j++)
									$("#caro-square-"+i+"-"+j).html((v[i][j] == 1) ? "X" : ((v[i][j] == 2) ? "O" : "&nbsp"));
							}
						}
					});
					var playerIdVal = parseInt($("#player-id").val());
					var playerReadyVal = parseInt($("#player-ready").val());
					var player1IdVal = parseInt($("#player1-id").val());
					var player2IdVal = parseInt($("#player2-id").val());
					var gameStatusVal = parseInt($("#game-status").val());
					if (playerIdVal > 0){
						if (playerIdVal == player1IdVal || playerIdVal == player2IdVal){
							$("button#join-game").hide();
							$("button#quit-game").show();
							if (gameStatusVal == 1 && playerReadyVal != 1)
								$("button#ready-game").show();
							else {
								$("#player-ready").val(0);
								$("button#ready-game").hide();
							}
						}
						else{
							$("button#quit-game").hide();
							if (gameStatusVal > 0)
								$("button#join-game").hide();
							else
								$("button#join-game").show();

						}
					}
					if ($("#player1-id").val() != $("#player-id").val() && $("#player2-id").val() != $("#player-id").val()){
						if (parseInt($("#player-id").val()) > 0 && parseInt($("#player2-id").val()) == 0)
							$("button#join-game").show();
					}
					else if ($("#game-status").val() == 1){
						$("button#ready-game").show();
					}
				}
			}
		}
	);
}

function quitGame(gameId){
	$.post(
		siteUrl+"/game/quit_game/"+gameId, {}
	);
}

function backToMainMenu(){
	$("#game-modes").val("index");
	$("table#games-list").show();
	$("button#create-game").show();
	$("button#back-to-main-menu").hide();
	$("table#game-moves tbody").html("");
	$("#game-id").val("0");
	$("#game-status").val("0");
	$("#player1-id").val("0");
	$("#player2-id").val("0");
	$("#player1-name").html("");
	$("#player2-name").html("");
	$("#player1-avatar").html("");
	$("#player2-avatar").html("");
}

function refreshView(){
	if ($("#game-modes").val() == "index"){
		$("button#join-game").hide();
		$("button#quit-game").hide();
		showGamesList();

	}
	else if ($("#game-modes").val() == "game"){
		$("table#games-list").hide();
		if ($("#game-id").val() > 0)
			refreshGame($("#game-id").val());
	}
	setTimeout(refreshView, refreshRate);
}
