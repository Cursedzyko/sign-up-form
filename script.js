document.addEventListener('DOMContentLoaded', function()
{
	const loginPage = document.getElementById("loginPage");
	const signupPage = document.getElementById("signupPage");
	const signupLink = document.getElementById("signupLink");

	function showLoginPage()
	{
		loginPage.style.display = 'flex';
		signupPage.style.display = 'none';
	}

	function showSignupPage()
	{
		signupPage.style.display = 'flex';
		loginPage.style.display = 'none';
	}

	showLoginPage();

	signupLink.addEventListener('click', function(event)
	{
		event.preventDefault();
		showSignupPage();
	});

})