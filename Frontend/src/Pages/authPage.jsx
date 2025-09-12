
import { data, useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import { useTheme } from "next-themes"
import axios from "axios";
import React from 'react'
import { PlusIcon } from 'lucide-react'
import { Link } from "react-router";
import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { Textarea } from "../components/ui/textarea.tsx";
import { Card } from "../components/ui/card.tsx"
import  { Button } from '../components/ui/button.tsx' 
import { Input } from "../components/ui/input.tsx";

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
    const res = await api.post("/auth", {
        ...formData,
        action: isRegister ? "register" : "login",
      }),
      console.log(res.data)
    };

    const data = await res.json();

    if (res.ok) {
      if (isRegister) {
        // ✅ If user just registered
        setIsRegister(false); // switch to login form
        toast.success("Account created successfully! Please login.");
      } else {
        // ✅ If user logged in
        localStorage.setItem("token", data.token); // save token
        navigate("/notes"); // go to notes page
        toast.success("Login successful!");
      }
    } else {
      toast.error(data.message || "Something went wrong");
    }
  } catch (error) {
    console.error(error);
    toast.error("Server error. Try again later.");
  }

  
  
};
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

    if (!mounted) return null 


return( 

  <div> 

    <header className="bg-base-300 border-b border-base-content/10">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-yellow font-bolder text-outline tracking-tight">Notezy</h1>
       
              <Button
                  className="bg-gray-200"
                  onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                  variant="outline"
                   size="icon">
    
                   {theme === "light" ? (
                   <Sun className="w-5 h-5" />
                    ) : (
                     <Moon className="w-5 h-5" />
                     )}
                  </Button>
        </div>
        </div> 
    </header>


    <div className="flex items-center justify-center min-h-screen bg-base-100"> 
       
        <Card className="w-1/3 bg-base-200 shadow-xl p-6"> 
            <h2 className="text-2xl font-bold mb-4 text-center text-blue-600"> 
                {isRegister ? "Register": "Login"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4"> 
                {isRegister && ( <Input type="text" name="username" placeholder="Username" className="input input-bordered w-full bg-base-100 text-black" onChange={handleChange} required /> )}
                <Input type="email" name="email" placeholder="Email" className="input input-bordered bg-base-100 w-full text-black" onChange={handleChange} required />     
                <Input type="password" name="password" placeholder="Password" className="input input-bordered bg-base-100 w-full text-black" onChange={handleChange} required />     
                <Button type="submit" className=" w-full">{isRegister ? "Register": "Login"} </Button>
            </form> 

            <p className="mt-4 text-center"> 
                {isRegister ? "Already have an account" : "Don't have an account"}{" "}
                <Button type="button" className="btn btn-xs text-blue-500" onClick={() => setIsRegister(!isRegister)}>{isRegister ? "Login here" : "Register here"}</Button> 
            </p>
        </Card>
    
    </div>
   </div> 

)
};

export default AuthPage;
