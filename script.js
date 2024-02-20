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


	document.getElementById('addFriendLink').addEventListener('click', function(event) {
		event.preventDefault();
		document.getElementById('overlay').style.display = 'block';
	  });
	
	//   Need to think how to add friend 
	document.getElementById('addFriendButton').addEventListener('click', function() {
		// Get the input value
		var friendName = document.getElementById('FriendName').value.trim();
	
		// Check if the input is not empty
		if (friendName !== "") {
			// Assume friendExists() is a function that checks if the friend already exists
			// if (friendExists(friendName)) {
				// If the friend exists, create the friend box
				createFriendBox(friendName);
			// } else {
			// 	// If the friend doesn't exist, show an error message or handle it accordingly
			// 	alert("This friend doesn't exist!");
			// }
		} else {
			// If the input is empty, show an error message or handle it accordingly
			alert("Please enter a friend's nickname!");
		}
	
		// Clear the input field and close the overlay
		document.getElementById('FriendName').value = "";
		document.getElementById('overlay').style.display = 'none';
	});
	
	document.getElementById('closeOverlay').addEventListener('click', function() {
		document.getElementById('overlay').style.display = 'none';
	});
	
	document.addEventListener('keydown', function(event) {
		if (event.key === 'Escape') {
			document.getElementById('overlay').style.display = 'none';
		}
	});


	document.getElementById('PlayWithFriendButton').addEventListener('click', function(event) {
        event.preventDefault();
        document.getElementById('overlayPlay').style.display = 'block';
    });

    document.getElementById('closeOverlayPlay').addEventListener('click', function() {
        document.getElementById('overlayPlay').style.display = 'none';
    });

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            document.getElementById('overlayPlay').style.display = 'none';
        }
    });
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

function setStatus(status)
{
	var statusSpan = document.querySelector('.status-dropdown > span');
	if (status === 'Online')
	{
		statusSpan.innerHTML = 'Online';
		statusSpan.innerHTML += '<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--noto" preserveAspectRatio="xMidYMid meet" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><circle cx="63.93" cy="64" r="60" fill="#689f38"></circle><circle cx="60.03" cy="63.1" r="56.1" fill="#7cb342"></circle><path d="M23.93 29.7c4.5-7.1 14.1-13 24.1-14.8c2.5-.4 5-.6 7.1.2c1.6.6 2.9 2.1 2 3.8c-.7 1.4-2.6 2-4.1 2.5a44.64 44.64 0 0 0-23 17.4c-2 3-5 11.3-8.7 9.2c-3.9-2.3-3.1-9.5 2.6-18.3z" fill="#aed581"></path></g></svg>';
	}
	else if (status ==='Offline')
	{
		statusSpan.innerHTML = 'Offline';
		statusSpan.innerHTML += '<svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--noto" preserveAspectRatio="xMidYMid meet" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><circle cx="63.93" cy="64" r="60" fill="#c33"></circle><circle cx="60.03" cy="63.1" r="56.1" fill="#f44336"></circle><path d="M23.93 29.7c4.5-7.1 14.1-13 24.1-14.8c2.5-.4 5-.6 7.1.2c1.6.6 2.9 2.1 2 3.8c-.7 1.4-2.6 2-4.1 2.5a44.64 44.64 0 0 0-23 17.4c-2 3-5 11.3-8.7 9.2c-3.9-2.3-3.1-9.5 2.6-18.3z" fill="#ff8a80"></path></g></svg>';
	}
}

function friendExists(name) {
    // Add your logic to check if the friend exists, for example, you might have a list of existing friends
    // and you can check if the name is in that list
    // For demonstration purposes, let's assume a list of existing friends
    var existingFriends = ['Friend1', 'Friend2', 'Friend3'];
    return existingFriends.includes(name);
}

// Function to create the friend box
function createFriendBox(name) {
    var friendBox = document.createElement('a');
    friendBox.classList.add('friend-mini-box');
    friendBox.textContent = name;
	console.log("HERE");
    // Append the friend box to a container where you want to display the friend boxes
    var friendsContainer = document.getElementById('friendsBox');
    friendsContainer.appendChild(friendBox);
}