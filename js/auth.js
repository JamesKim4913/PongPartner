
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
    let referer = document.referrer;    
   
    let loginUser = getLoginUser();
    if(loginUser != "") {
        return loginUser;
    } 
    
    if(referer == "") {
        location.href = "/";
    } 
}

// logout
function logout() {
    localStorage.removeItem('loginUser');
    location.href = "/";
}




// call function
checkLoginUser();