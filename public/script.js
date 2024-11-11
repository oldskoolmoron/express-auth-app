async function signup() {
  const username = document.getElementById("signup-username").value; 
  const password = document.getElementById("signup-password").value;

  await axios.post("http://localhost:3002/signup", {
    username: username,
    password: password
  });
  alert("You're signed up!");
}

async function signin() {
  const username = document.getElementById("signin-username").value;
  const password = document.getElementById("signin-password").value;

  try {
    const response = await axios.post("http://localhost:3002/signin", {
      username: username,
      password: password
    });

    // Ensure token is stored properly
    const token = response.data.token;
    if (token) {
      localStorage.setItem("token", token);
      alert("You're signed in!");
      getuserinformation(); // Call getuserinformation after sign-in
    } else {
      alert("Failed to retrieve token.");
    }
  } catch (error) {
    console.error("Sign-in failed:", error);
    alert("Sign-in failed. Please try again.");
  }
}

  async function getuserinformation() {
    const token = localStorage.getItem("token");
  
    if (!token) {
      alert("No token found. Please sign in.");
      return;
    }
  
    try {
      const response = await axios.get("http://localhost:3002/me", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      // Log the response data to verify
      console.log(response.data);
  
      // Access username and password correctly from response.data
      document.getElementById("information").innerHTML = 
        "Username: " + (response.data.username || "Not available") + 
        " Password: " + (response.data.password || "Not available");
    } catch (error) {
      console.error("Error fetching user information:", error);
      alert("Error fetching user information");
    }
  }
  
  
function logout() {
  localStorage.removeItem("token");
  document.getElementById("information").innerHTML = "User logged out.";
  alert("You're logged out!");
}


