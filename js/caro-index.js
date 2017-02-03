/**
 *
 * @source: http://example.com/js/caro-index.js
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
$(document).ready(function(){

	getSessionData();
	var refreshViewVar = refreshView();
	
	$("button#register-submit").click(function(){
		register();
	});

	$("button#login-submit").click(function(){
		login();
	});

	$("button#logout").click(function(){
		logout();
		$("button#logout").hide();
		$("button#login").show();
		$("button#register").show();
	});

	$("button#create-game").click(function(){
		createGame();
	});

	$(document).on('click', 'button.view-game', function(){
		displayGame($(this).attr("id"));
	});

	$(document).on('click', '.caro-square', function(){
		var caroSquare = $(this);
		if (caroSquare.html() != "X" && caroSquare.html() != "O"){
			var caroSquareId = caroSquare.attr("id");
			var caroSquareMove = caroSquareId.split("-");
			var moveX = caroSquareMove[2];
			var moveY = caroSquareMove[3];
			updateMove(moveX, moveY);
		}
	});

	$("button#join-game").click(function(){
		joinGame($("#game-id").val());
	});

	$("button#ready-game").click(function(){
		readyGame();
	});

	$("button#quit-game").click(function(){
		quitGame($("#game-id").val());
	});

	$("button#back-to-main-menu").click(function(){
		backToMainMenu();
	});

});
