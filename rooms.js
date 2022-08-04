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
document.getElementById("userName").innerHTML = "Welcome, " + userName;

function addRoom() {
      roomName = document.getElementById("roomName").value;
      firebase.database().ref("/").child(roomName).update({
            purpose: "Adding Room Name"
      })
      localStorage.setItem("Room Name", roomName);
      window.location = "chat.html";
}

function getData() {
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  Room_names = childKey;
                  console.log("Room Name: " + Room_names);
                  row = "<div class='room_name' id=" + Room_names + " onclick='redirectToRoomName(this.id)'>" + Room_names + "</div><hr>";
                  document.getElementById("output").innerHTML += row;
            });
      });
}

getData();

function redirectToRoomName(name){
      console.log(name);
      localStorage.setItem("Room Name", name);
      window.location="chat.html";
}

function logout() {
      localStorage.removeItem("Username");
      localStorage.removeItem("Room Name")
      window.location = "login.html";
}