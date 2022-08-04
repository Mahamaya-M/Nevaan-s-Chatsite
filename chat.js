var firebaseConfig = {
    apiKey: "AIzaSyCuPqlrN4Ofg5ZH_c0wn7M5QLk9LiEqBL4",
    authDomain: "classtest-84e08.firebaseapp.com",
    databaseURL: "https://classtest-84e08.firebaseio.com",
    projectId: "classtest-84e08",
    storageBucket: "classtest-84e08.appspot.com",
    messagingSenderId: "671082416160",
    appId: "1:671082416160:web:db4944c7d8e54595ec1445"
  };
firebase.initializeApp(firebaseConfig);

userName = localStorage.getItem("Username");
roomName = localStorage.getItem("Room Name");

function send1() {
    msg = document.getElementById("message").value;
    firebase.database().ref(roomName).push({
        Name: userName,
        Message: msg,
        Like: 0
    });
    document.getElementById("message").value = "";
}

function getData(){
    firebase.database().ref("/"+roomName).on('value', function(snapshot){
        document.getElementById("output").innerHTML="";
        snapshot.forEach(function(childSnapshot){
            childKey=childSnapshot.key;
            childData=childSnapshot.val()
            if(childKey!="purpose"){
                firebaseMessageId=childKey;
                messageData=childData;
                console.log(firebaseMessageId);
                console.log(messageData);
                name=messageData['Name'];
                message=messageData['Message'];
                like=messageData['Like'];
                nameTag="<h4>"+name+"<img class='user_tick' src='Checkmark.png'> </h4>";
                messageTag="<h4 class='message_h4'>"+message+"</h4>";
                likeButton="<button class='btn btn-success' id="+firebaseMessageId+" value="+like+" onclick='updateLikes(this.id)'>";
                spanTag="<span class='glyphicon glyphicon-thumbs-up'>Like: "+like+"</span></button><hr>";
                row=nameTag+messageTag+likeButton+spanTag;
                document.getElementById("output").innerHTML+=row;
            }
        })
    })
}

getData()

function logout() {
    localStorage.removeItem("Username");
    localStorage.removeItem("Room Name");
    window.location = "login.html";
}
function updateLikes(message_id) {
    console.log("clicked on like button - " + message_id);
    button_id = message_id;
    likes = document.getElementById(button_id).value;
    updated_likes = Number(likes) + 1;
    console.log(updated_likes);
  
    firebase.database().ref(roomName).child(message_id).update({
      Like: updated_likes
    });
  
  }