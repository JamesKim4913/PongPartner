function populateLocalStorage() {
  // The playersData object is imported from the data.js file

  // If no data is available, add
  if (!localStorage.getItem('players')) {  
    //Add in the new items to localstorage
    localStorage.setItem('players', JSON.stringify(playersData));
  } 
}

// display players
function displayPlayersTable() {
  let html = '<h1>Players List</h1><table class="playertable" width="100%"><tr><th>Avatar</th><th>Player</th><th>Level</th></tr>';  

  //Check if there are items in localstroage
  if (localStorage.getItem('players')) {

    //get the data
    let playersList = JSON.parse(localStorage.getItem('players'));  
    
    let playerInfo = "";

    let imgnum = 0;

    //Add all the items to it
    playersList.forEach(player => {
      let randomNumber = Math.floor(Math.random() * 4) + 1;

      imgnum++;
      if(imgnum>7) {
        imgnum = 1;
      }
      playerInfo = "name=" + player.username + "&age=" + player.userage + "&location=" + player.userlocation + "&star=" + randomNumber + "&imgnum=" + imgnum;        

      html += '<tr onclick="newWin(\'playerprofile.html\', \''+playerInfo+'\', \'left=10,top=25,width=415,height=510\')">';
      html += '<td><img src="images/person.jpg" width="100" height="100" alt="'+player.username+'"></td>';
      html += '<td>'+ player.username + ', ' + player.userage + '<br>' + player.userlocation + '</td>';

      html += '<td>';      
      for (let i = 0; i < randomNumber; i++) {
        html += '<img src="images/star.jpg" width="30" height="30" alt="star">';
      }
      html += '</td>';
      
      html += '</tr>';
    });

    html += '</table>';

    $("#playerList").html(html);    
  }
}

// open new window
function newWin(webpage, param, windowFeatures) {   
  const handle = window.open(
    webpage + "?" + param,
    "newWindow",
    windowFeatures
  );    
}


// show search box
function displaySearchBox() {
  $('#search').show();
}

function searchPlayer() {
  let keyword = document.getElementById("keyword").value;  
  // search players
  displaySearchResult(keyword);
}


// search players
function displaySearchResult(keyword) {
  // Convert string to lowercase
  keyword = keyword.toLowerCase();

  let html = '<h1>Players List</h1><table class="playertable" width="100%"><tr><th>Avatar</th><th>Player</th><th>Level</th></tr>';  

  //Check if there are items in localstroage
  if (localStorage.getItem('players')) {

    //get the data
    let playersList = JSON.parse(localStorage.getItem('players'));  
    
    let playerInfo = "";
    let player_name = "";
    let player_age = "";
    let player_location = "";

    let imgnum = 1;

    //Add all the items to it
    playersList.forEach(player => {
      // Convert string to lowercase
      player_name = player.username.toLowerCase();
      player_age = String(player.userage).toLowerCase();
      player_location = player.userlocation.toLowerCase();

      // compare them
      if (player_name.includes(keyword)
                || player_age.includes(keyword)
                || player_location.includes(keyword)) {

        let randomNumber = Math.floor(Math.random() * 4) + 1;

        playerInfo = "name=" + player.username + "&age=" + player.userage + "&location=" + player.userlocation + "&star=" + randomNumber + "&imgnum=" + imgnum;  
        imgnum++;

        html += '<tr onclick="newWin(\'playerprofile.html\', \''+playerInfo+'\', \'left=10,top=25,width=415,height=510\')">';
        html += '<td><img src="images/person.jpg" width="100" height="100" alt="'+player.username+'"></td>';
        html += '<td>'+ player.username + ', ' + player.userage + '<br>' + player.userlocation + '</td>';

        html += '<td>';      
        for (let i = 0; i < randomNumber; i++) {
          html += '<img src="images/star.jpg" width="30" height="30" alt="star">';
        }
        html += '</td>';
        
        html += '</tr>';

      }
      
    });

    html += '</table>';

    $("#playerList").html(html);     
  }
}

