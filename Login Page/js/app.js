"use strict";

$(document).ready(function () {

//My End Point 
const endpoint = "https://7i28edekq7.execute-api.us-east-1.amazonaws.com/default/login-page";


//Functions

let clearLoginMessage = () => {
  setTimeout(() => {
    $("#login_message").html("");
  }, 5000);
};

let clearSignupMessage = () => {
  setTimeout(() => {
    $("#signup_message").html("");
  }, 5000);
};


let loginController = () => {
	//clear any previous messages
	$('#login_message').html("");

	//error trapping.
	let username = $("#username").val().trim();
	let password = $("#password").val().trim();
    

	if (username == "" || password == ""){
		$('#login_message').html('The user name and password are both required.');
		clearLoginMessage();
		return; 
	}
	else{
		//using ajax to send data
		$.ajax({
			url: endpoint + "/login",
			method: "POST",
			contentType: "application/json",
			dataType: "json",
			data: JSON.stringify({username, password}),
			
			success: (result) => {
				if(result.success){
					console.log("Log in successfull.")
					$("#login_message").html(result.message);
					clearLoginMessage();
				}
				else {
					$("#login_message").html(result.message || "Login failed.");
					clearLoginMessage();
				}
			},
			error: (err) => {
				console.log(err);
				$("#login_message").html(err.responseJSON.message)
				clearLoginMessage();
			}
		})
	}
}

let signupController = () => {
	//clear any previous messages
	$('#signup_message').html("");

	//error trapping.
	let username = $("#signusername").val().trim();
	let password = $("#signpassword").val().trim();
    let email = $("#email").val().trim();
    

	if (username == "" || password == "" || email == ""){
		$('#signup_message').html('All fields are required.');
		clearSignupMessage();
		return;    
	}
	else{
		$.ajax({
			url: endpoint + "/adduser",
			method: "POST",
			contentType: "application/json",
			dataType: "json",
			data: JSON.stringify({username, password, email}),
			success: (result) => {
				if(result.success){
					console.log("Signup successfull.");
					$("#signup_message").html(result.message);
					clearSignupMessage();
				}
			},
			error: (err) => {
				console.log(err);
				$("#signup_message").html(err.responseJSON.message)
				clearSignupMessage();
			}
		})
	}
}


//Click events

    $("#btnLogin").click ( () => {
        loginController()
    } );

    $("#btnSignup").click ( () => {
        $("#div-login").hide();
        $("#div-signup").show();
    } );



    $("#signup").click ( () => {
        signupController()
    } );

    $("#btnCancel").click ( () => {
        $("#div-login").show();
        $("#div-signup").hide();
    } );

});