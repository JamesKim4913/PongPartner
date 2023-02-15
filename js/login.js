jQuery(document).ready(function($) {
  tab = $('.tabs h3 a');

  tab.on('click', function(event) {
    event.preventDefault();
    tab.removeClass('active');
    $(this).addClass('active');

    tab_content = $(this).attr('href');
    $('div[id$="tab-content"]').removeClass('active');
    $(tab_content).addClass('active');
  });
});






function signUp() { 
  //Declare an array
  let playersList = [];

  //Check if anything is in localStorage
  if (localStorage.getItem('players')) {
    playersList = JSON.parse(localStorage.getItem('players'));
  }

  //Declare on object
  let userItem = {};
  
  //Pull the values out of the form
  userItem.username = document.getElementById("user_name").value;
  userItem.useremail = document.getElementById("user_email").value;
  userItem.userpassword = document.getElementById("user_pass").value;
  userItem.userage = document.getElementById("user_age").value;
  userItem.userlocation = document.getElementById("user_location").value;

  if(userItem.username == "") {
    return;
  }

  //Pushes object to the array
  playersList.push(userItem);

  //Push the whole array back up to LocalStorage
  localStorage.setItem('players', JSON.stringify(playersList)); 

  //Set login user
  setLoginUser(userItem.username);  

  // move page 
  goUrl("players.html");
}

function signIn() { 
  //Declare an array
  let playersList = [];  
  
  //Pull the values out of the form
  let signin_email = document.getElementById("signin_email").value;
  let signin_password = document.getElementById("signin_password").value;

  if(signin_email == "" || signin_password == "") {
    return;
  }  

  //Check if there are players in localstroage
  if (localStorage.getItem('players')) {
    //get the data
    playersList = JSON.parse(localStorage.getItem('players'));

    // check player
    playersList.forEach(player => {      
      // If player matchs
      if(signin_email === player.useremail && signin_password === player.userpassword) {   
        //Set login user
        setLoginUser(player.username);        
        // move page 
        goUrl("players.html"); 
      } 
    });
  } 
}




//Set login user
function setLoginUser(loginUser) {  
  localStorage.setItem('loginUser', loginUser);
}


// move page
function goUrl(url) {
  location.href = url; 
}