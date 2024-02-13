document.addEventListener('DOMContentLoaded', function()
{
	const loginPage = document.getElementById("loginPage");
	const signupPage = document.getElementById("signupPage");
	const signupLink = document.getElementById("signupLink");

	const mainpageLink = document.getElementById("mainPageLink");
	const mainPage = document.getElementById("mainPage");

	function showLoginPage()
	{
		loginPage.style.display = 'flex';
		signupPage.style.display = 'none';
		mainPage.style.display = 'none';
	}

	function showSignupPage()
	{
		signupPage.style.display = 'flex';
		loginPage.style.display = 'none';
		mainPage.style.display = 'none';
	}

	function showMainPage()
	{
		loginPage.style.display = 'none';
		signupPage.style.display = 'none';
		mainPage.style.display = 'flex';
	}

	showLoginPage();

	signupLink.addEventListener('click', function(event)
	{
		event.preventDefault();
		showSignupPage();
	});

	mainpageLink.addEventListener('click', function(event)
	{
		event.preventDefault();
		showMainPage();
	});

	const avatarCircle = document.getElementById('avatarCircle');
	const avatars = [
	  './img/avatar1.png',
	  './img/avatar2.png',
	  './img/avatar3.png',
	  './img/avatar4.png',
	  './img/avatar5.png',
	  './img/avatar6.png'
	];
	let currentAvatarIndex = 0;
  
	avatarCircle.addEventListener('click', () => {
	  currentAvatarIndex = (currentAvatarIndex + 1) % avatars.length;
	  updateAvatar();
	});
  
	function updateAvatar() {
	  avatarCircle.querySelector('img').src = avatars[currentAvatarIndex];
	}

	var firstLinkF = document.querySelector('.side-links a:first-child');
    addBorder(firstLinkF);

	var firstLinkG = document.querySelector('.game-links a:first-child');
	addBorderM(firstLinkG);
});


function addBorderM(element)
{
	var linksm = document.querySelectorAll('.game-links a');
	linksm.forEach(function(link) {
        link.style.borderBottom = 'none';
		link.style.color = '#100C4F';
    });

	element.style.borderBottom = '2px solid white';
	element.style.color = 'white';
}

function addBorder(element) {
    // Remove border from all links
    var links = document.querySelectorAll('.side-links a');
    links.forEach(function(link) {
        link.style.borderBottom = 'none';
		link.style.color = 'white';
    });

    // Add border to the clicked link
    element.style.borderBottom = '2px solid white';
	element.style.color = '#C33149';
}

function expandEffect(event) {
    var target = event.currentTarget;
    var effect = target.querySelector('.effect');

    var x = event.pageX - target.offsetLeft;
    var y = event.pageY - target.offsetTop;

    effect.style.left = x + 'px';
    effect.style.top = y + 'px';
    
    var maxDistance = Math.max(
        Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)),
        Math.sqrt(Math.pow(x - target.offsetWidth, 2) + Math.pow(y, 2)),
        Math.sqrt(Math.pow(x - target.offsetWidth, 2) + Math.pow(y - target.offsetHeight, 2)),
        Math.sqrt(Math.pow(x, 2) + Math.pow(y - target.offsetHeight, 2))
    );

    effect.style.width = maxDistance * 2 + 'px';
    effect.style.height = maxDistance * 2 + 'px';
    effect.style.opacity = 0.3;

    setTimeout(function() {
        effect.style.width = '0';
        effect.style.height = '0';
        effect.style.opacity = 0;
    }, 500);
}

function showHistoryBox() {
	document.querySelector('.history-box').style.display = 'flex';
	document.querySelector('.play-box').style.display = 'none';
}

function showPlayBox() {
	document.querySelector('.history-box').style.display = 'none';
	document.querySelector('.play-box').style.display = 'flex';
}

function showChats()
{
	document.querySelector('.chats-box').style.display = 'flex';
	document.querySelector('.request-box').style.display = 'none';
	document.querySelector('.friends-box').style.display = 'none';
}


function showFriends()
{
	document.querySelector('.friends-box').style.display = 'flex';
	document.querySelector('.chats-box').style.display = 'none';
	document.querySelector('.request-box').style.display = 'none';
}


function showRequests()
{
	document.querySelector('.request-box').style.display = 'flex';
	document.querySelector('.chats-box').style.display = 'none';
	document.querySelector('.friends-box').style.display = 'none';
}


