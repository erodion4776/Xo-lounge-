import { supabase } from "./supabase.js";

// Login functionality
document.getElementById('login-btn').addEventListener('click', async () => {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password
  });

  if (error) {
    alert("Login failed: " + error.message);
  } else {
    alert("Login successful!");
    window.location.href = "dashboard.html";
  }
});

// Signup functionality (admin will later restrict access)
document.getElementById('signup-btn').addEventListener('click', async () => {
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;
  const role = document.getElementById('signup-role').value;

  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password
  });

  if (error) {
    alert("Signup failed: " + error.message);
  } else {
    alert("Account created!");
    // Later we will store role in database
  }
});
