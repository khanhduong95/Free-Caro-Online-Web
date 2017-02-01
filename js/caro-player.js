/**
 *
 * @source: http://example.com/js/caro-player.js
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
function getSessionData(){
	$.post(
		siteUrl+"/player/get_session_data", {}, function(jsonResult, status){
			if (status == "success"){
				if (jsonResult.status == 0){
					$('#player-id').val(jsonResult.data.playerId);
					$("#player-name").html(jsonResult.data.playerName);
					$("button#login").hide();
					$("button#register").hide();
					$("#register-modal").modal('hide');
					$("#login-modal").modal('hide');
					$("button#logout").show();

				}
			}
		}
	)
}

function register(){
	$.post(
		siteUrl+"/player/register",
		{
			email: $("input#email-register").val(),
			name: $("input#name-register").val(),
			password: $("input#password-register").val(),
			confirmPassword: $("input#confirm-password-register").val()
		},
		function(jsonResult, status){
			if (status == "success"){
				if (jsonResult.status == 0)
					alert("Registered Successfully!");
				else {
					$.each(jsonResult.data, function(k, v){
						if (k == "email")
							$("#email-register-error").html(v);
						else if (k == "name")
							$("#name-register-error").html(v);
						else if (k == "password")
							$("#password-register-error").html(v);
						else if (k == "confirmPassword")
							$("#confirm-password-register-error").html(v);

					});
				}
			}
		}
	)
}

function login(){
	$.post(
		siteUrl+"/player/login",
		{
			email: $("input#email-login").val(),
			password: $("input#password-login").val()
		},
		function(jsonResult, status){
			if (status == "success"){
				if (jsonResult.status == 0){
					getSessionData();
				}
				else
					$("#login-error").html(jsonResult.data.errorMessage);
				
			}
		}
	)
}

function logout(){
	$.post(
		siteUrl+"/player/logout",{}, function(jsonResult, status){
			if (status == "success"){
				$("#player-id").val("0");
				$("#player-name").html("");
			}
		}
	)
}
