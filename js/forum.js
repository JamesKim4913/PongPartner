function populateForumData() {
    // The playersData object is imported from the data.js file
  
    // If no data is available, add
    if (!localStorage.getItem('forum')) {  
      //Add in the new items to localstorage
      localStorage.setItem('forum', JSON.stringify(forumData));
    } 
}


// display forum
function displayForumTable() {
    let html = '<h1>Forum</h1><table class="forumtable" width="100%"><tr><th>Content</th><th>Author</th><th>Date</th></tr>';  

    // Number of outputs to the screen
    let displayNumber = 10;
  
    //Check if there are items in localstroage
    if (localStorage.getItem('forum')) {
  
      //get the data
      let forumList = JSON.parse(localStorage.getItem('forum'));  

      let arrLength = forumList.length;

      for (var i = arrLength - 1; i >= arrLength - displayNumber; i--) {        
        html += '<tr>';      
        html += '<td>'+ forumList[i].content + '</td>';
        html += '<td>'+ forumList[i].username + '</td>';
        html += '<td>'+ forumList[i].date + '</td>';        
        html += '</tr>';        
      }
  
      html += '</table>';
  
      $("#forumList").html(html);    
    }
}


function searchForum() {
    let keyword = document.getElementById("keyword").value;  
    
    searchForumResult(keyword);
}


function searchForumResult(keyword) {
  // Convert string to lowercase
  keyword = keyword.toLowerCase();

  let html = '<h1>Forum</h1><table class="forumtable" width="100%"><tr><th>Content</th><th>Author</th><th>Date</th></tr>';   

  //Check if there are items in localstroage
  if (localStorage.getItem('forum')) {

    //get the data
    let forumList = JSON.parse(localStorage.getItem('forum'));  
    
    let username = "";
    let content = "";
    let date = "";

    let imgnum = 1;

    //Add all the items to it
    forumList.forEach(forum => {
      // Convert string to lowercase
      username = forum.username.toLowerCase();
      content = forum.content.toLowerCase();
      date = forum.date.toLowerCase();

      // compare them
      if (username.includes(keyword)
                || content.includes(keyword)
                || date.includes(keyword)) {

            html += '<tr>';      
            html += '<td>'+ forum.content + '</td>';
            html += '<td>'+ forum.username + '</td>';
            html += '<td>'+ forum.date + '</td>';        
            html += '</tr>';  
      }
      
    });

    html += '</table>';

    $("#forumList").html(html);     
  }
}


// send forum
function sendForum() {   

    //Declare an array
    let forumList = [];

    let forumContent = document.getElementById("forumcontent").value;

    if(forumContent == "") {
        return;
    }

    let loginUser = getLoginUser();
    let date = new Date().toLocaleDateString();

    //Declare on object
    let forumItem = {};
    forumItem.username = loginUser;
    forumItem.content = forumContent;
    forumItem.date = date;  
    
    //Check if there are items in localstroage
    if (localStorage.getItem('forum')) {
        //get the data
        forumList = JSON.parse(localStorage.getItem('forum'));  
    } 

    //Pushes object to the array
    forumList.push(forumItem);

    //Push the whole array to LocalStorage
    localStorage.setItem('forum', JSON.stringify(forumList));

    // display forum
    displayForumTable();
}