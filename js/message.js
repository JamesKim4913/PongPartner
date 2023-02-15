function sendMessage(urlParams) {   

    //Declare an array
    let messageList = [];

    let messageContent = document.getElementById("messageContent").value;

    if(messageContent == "") {
        displayMessageError();
        return;
    }

    let player_name = urlParams.get('name');  
    let loginUser = getLoginUser();
    let imgnumber = urlParams.get('imgnum');

    //Declare on object
    let messageItem = {};
    messageItem.from = loginUser;
    messageItem.to = player_name;
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

    displayMessageSuccess(); 
}

// display message error
function displayMessageError() {
    $('#displayError').show();
    $('#displayError').css("color", "red");
    $('#displayError').text("Enter message content!");
    // after 3 second
    setTimeout(function() {
        $('#displayError').fadeOut();
    }, 3000);
}

// display message success
function displayMessageSuccess() {
    $('#displayError').show();
    $('#displayError').css("color", "green");
    $('#displayError').text("You successfully sent message!");
    // after 1 second
    setTimeout(function() {
        $('#displayError').fadeOut();
        // Close your own window.
        self.close();
    }, 1000);    
}


function readMessage() {
    let loginUser = getLoginUser();

    let html = "";
    let from = "";
    let to = "";
    let content = ""; 
    let status = ""; 
    let imgnum = "";
    let query = "";  
                
    let totalContent = "";
    let chatIcon = "";
    let randomNumber = Math.floor(Math.random() * 7) + 1;

    //Check if there are items in localstroage
    if (localStorage.getItem('messages')) {

        //get the data
        let messageList = JSON.parse(localStorage.getItem('messages')); 

        messageList.forEach(message => { 
            if(message.to === loginUser) {
                from = message.from;
                to = message.to;
                content = message.content; 
                //imgnum = message.imgnum;
                //status = message.status; 

                totalContent += "From: " + from + "<br>" + content + "<br><br>";  
                if(message.status === false) {
                    chatIcon = "chat_icon_new.png";
                } else {
                    chatIcon = "chat_icon.png";
                }             
            }
            
        });

        if(totalContent !="") {
            query = 'content=' + totalContent + '&imgnum=' + randomNumber;
            // URLSearchParams
            let urlParams = new URLSearchParams(query);
            $("#chatIcon").css("display", "block");   
            html = '<a class="nav-link active" aria-current="page" href="#" onclick="newWin(\'readmessage.html\', \''+
                urlParams+'\', \'left=10,top=25,width=415,height=570\')"><img src="images/'+chatIcon+'" width="30" height="30"></a>';             
            $("#chatIcon").html(html);
        }
    }
}


// Mark message read
function markMessageRead() {
    let loginUser = getLoginUser();

    //Declare an array
    let newMessageList = [];

    //Check if there are items in localstroage
    if (localStorage.getItem('messages')) {

        //get the data
        let messageList = JSON.parse(localStorage.getItem('messages')); 

        //Declare on object
        let messageItem = {};

        messageList.forEach(message => { 
            messageItem.from = message.from;
            messageItem.to = message.to;
            messageItem.content = message.content;
            messageItem.imgnum = message.imgnum;           

            if(message.to === loginUser) {
                // change status
                messageItem.status = true;                         
            } else {
                messageItem.status = message.status;
            }

            //Pushes object to the array
            newMessageList.push(messageItem);            
        });
        

        // remove messages localstorage
        localStorage.removeItem('messages');

        //Push the whole array to LocalStorage
        localStorage.setItem('messages', JSON.stringify(newMessageList));
    }    
}