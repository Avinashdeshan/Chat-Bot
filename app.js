const chatList = []; // Array to store chat messages

function sendMassage() {
  let txtUserInput = document.getElementById("txtUserInput").value;

  let chatBubble = `<div class="message me">${txtUserInput}</div>`;
  chatList.push(chatBubble);

  loadChatBox(); 

  // Set up request headers
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  // Request payload
  const raw = JSON.stringify({
    contents: [
      {
        parts: [
          {
            text: txtUserInput,
          },
        ],
      },
    ],
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=", requestOptions)

    .then((response) => response.json())
    .then((result) => {
      let chatBubble2 = `<div class="message user">${result.candidates[0].content.parts[0].text}</div>`;
      chatList.push(chatBubble2);

      loadChatBox(); 
    })
    // .catch((error) => {
    //   console.error("Error:", error);
     
    //   loadChatBox();
    // });
}

function loadChatBox() {
  const contain = document.getElementById("contain"); // Correctly reference the chat container

  contain.innerHTML = "";

  // Add each message from chatList to the container
  chatList.forEach((element) => {
    contain.innerHTML += element;
  });

  // Scroll to the bottom to display the latest messages
  contain.scrollTop = contain.scrollHeight;
}

document.getElementById("txtUserInput").addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault(); // Prevent default form submission (if applicable)
    sendMassage(); 
  }
});




