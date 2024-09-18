const validAdminEmail = "admin@gmail.com";
const validAdminPassword = "admin123";

// Login
document.getElementById("login-form").addEventListener("submit", (event) => {
    event.preventDefault();
    
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    if (email === validAdminEmail && password === validAdminPassword) {
        alert("Welcome!");  
        window.location.href = "Avilon/assets/Project/Project/admin.html"; 
    } 
    else if(email == "doctor@gmail.com" && password == "doctor") {  
            window.location.href = "doctor.html";
    }
    else if(email == "lab@gmail.com" && password == "lab") {
        alert("Welcome!");  
        window.location.href = "Avilon/assets/faithne2w/faithprject/template/lab.html";
    }
    else if(email == "pharma@gmail.com" && password == "pharma") {
        alert("Welcome!");  
        window.location.href = "Avilon/assets/new/index/index/index.html";
    }
    else if(email == "rec@gmail.com" && password == "rec") {
        alert("Welcome!");  
        window.location.href = "Avilon/assets/final/final/new1.html";
    }
    else {
        alert("Invalid email or password. Please try again.");
    }
});
