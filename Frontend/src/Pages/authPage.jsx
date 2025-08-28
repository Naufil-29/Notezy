import react , { useState } from "react";
import { data, useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import axios from "axios";

const AuthPage = () => { 
    const navigate = useNavigate();

    const [isRegister, setIsRegister] = useState(false); // Login/Register
    const [formData, setFormData] = useState({ 
        username: "",
        email: "",
        password: "",
    })
 

//handle input changes

const handleChange = (e) => { 
    setFormData({ ...formData, [e.target.name]: e.target.value });
};

//handle submit

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("http://localhost:5001/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        action: isRegister ? "register" : "login",
      }),
    });

    const data = await res.json();

    if (res.ok) {
      if (isRegister) {
        // ✅ If user just registered
        toast.success("Account created successfully! Please login.");
        setIsRegister(false); // switch to login form
      } else {
        // ✅ If user logged in
        toast.success("Login successful!");
        localStorage.setItem("token", data.token); // save token
        navigate("/notes"); // go to notes page
      }
    } else {
      toast.error(data.message || "Something went wrong");
    }
  } catch (error) {
    console.error(error);
    toast.error("Server error. Try again later.");
  }
};

return( 

    <div className="flex items-center justify-center min-h-screen bg-gray-100"> 
        <div className="card-w[400px] bg-white shadow-xl p-6"> 
            <h2 className="text-2xl font-bold mb-4 text-center"> 
                {isRegister ? "Register": "Login"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4"> 
                {isRegister && ( <input type="text" name="username" placeholder="Username" className="input input-bordered w-full" onChange={handleChange} required /> )}
                <input type="email" name="email" placeholder="Email" className="input input-bordered w-full" onChange={handleChange} required />     
                <input type="password" name="password" placeholder="Password" className="input input-bordered w-full" onChange={handleChange} required />     
                <button type="submit" className="btn w-full bg-black text-white">{isRegister ? "Register": "Login"} </button>
            </form> 

            <p className="mt-4 text-center"> 
                {isRegister ? "Already have an account" : "Don't have an account"}{" "}
                <button type="button" className="text-blue-500 underline" onClick={() => setIsRegister(!isRegister)}>{isRegister ? "Login here" : "Register here"}</button> 
            </p>
        </div>
    </div>

)
};

export default AuthPage;