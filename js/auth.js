
//Get login user
function getLoginUser() {
    if (localStorage.getItem('loginUser') === null) {
        return "";     
    } else {
        return localStorage.getItem('loginUser');
    } 
  }
  
//Display login user
function displayLoginUser() {
    let loginUser = getLoginUser();  
    $("#loginUser").append(loginUser);
}

// check login user
function checkLoginUser() {   
    let loginUser = getLoginUser();
    if(loginUser == "") {
        location.href = "/index.html";
    } 
}

// logout
function logout() {
    localStorage.removeItem('loginUser');
    location.href = "/index.html";
}




// call function
checkLoginUser();