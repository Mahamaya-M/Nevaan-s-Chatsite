function addUser(){
    userName=document.getElementById("userName").value;
    localStorage.setItem("Username", userName);
    window.location="rooms.html";
}