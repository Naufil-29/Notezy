import React, { useState } from 'react'
import { ArrowLeftIcon } from 'lucide-react'
import { Link, useNavigate } from 'react-router'
import { toast } from 'react-hot-toast'
import api from "../lib/api.js"

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => { 
    e.preventDefault();
    if (!title.trim() || !content.trim()) { 
      toast.error("All fields are required");
      return;
    }

    console.log("Token in localStorage:", localStorage.getItem("token")); 
    setLoading(true);

    try {
      const res = await api.post("/notes", { title, content });  // ✅ save response
      console.log("📌 Response from backend:", res.data);

      toast.success("Note created successfully");
      navigate("/");
    } catch (error) {
      console.log("Error creating notes:", error.response?.data || error.message);

      if (error.response?.status === 429) {  // ✅ safe check with ?
        toast.error("Slow down, you are making notes too fast!", { 
          duration: 4000,
          icon: "💀",
        });
      } else if (error.response?.status === 401) {
        toast.error("Unauthorized! Please login again.");
        navigate("/login"); // optional redirect
      } else {
        toast.error("Failed to create note");
      }
    } finally { 
      setLoading(false);
    }
  }
  return (
    <div className="min-h-screen w-full bg-base-200">  
      <div className="container mx-auto px-4 py-8"> 
        <div className="max-w-2xl mx-auto"> 
          <Link to={"/"} className="btn btn-ghost mb-6"> 
            <ArrowLeftIcon className="size-5"/>
            Back To Notes
          </Link>
          <div className="card bg-base-100"> 
            <div className="card-body"> 
              <h2 className="card-title text-2xl mb-4"> </h2>
              <form onSubmit={handleSubmit}> 
                <div className="form-control mb-4"> 
                  <label className="label">
                  <span className="label-text">Title</span>
                  </label>
                  <input type="text" placeholder='Title' className='input input-bordered' value={title} onChange={(e) => setTitle(e.target.value)}/>
                </div>

                <div className='form-control mb-5'> 
                  <label className='label'> 
                    <span className='label-text'>Content</span>
                  </label>
                  <textarea placeholder='Write your note here' className='textarea textarea-bordered h-32' value={content} onChange={(e) => setContent(e.target.value)} />
                </div>


                <div className='card-actions justify-end'> 
                  <button type='submit' className='btn btn-primary' disabled={loading}> 
                    {loading ? "creating..." : "Create Note"}
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div> 
   )
}

export default CreatePage