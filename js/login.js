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





// user sign up
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

  // welcome message
  greeting();

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


// Welcome Greeting Message
function greeting() {   

  //Declare an array
  let messageList = [];

  let loginUser = document.getElementById("user_name").value;
  let messageContent = "Welcome to Pongpartner! We hope you have a great day!";
  let imgnumber = Math.floor(Math.random() * 7) + 1;

  //Declare on object
  let messageItem = {};
  messageItem.from = "Admin";
  messageItem.to = loginUser;
  messageItem.content = messageContent;  
  messageItem.imgnum = imgnumber;
  messageItem.status = false;    
  
  //Check if there are items in localstroage
  if (localStorage.getItem('messages')) {
      //get the data
      messageList = JSON.parse(localStorage.getItem('messages'));  
  } 

  //Pushes object to the array
  messageList.push(messageItem);

  //Push the whole array to LocalStorage
  localStorage.setItem('messages', JSON.stringify(messageList));

}