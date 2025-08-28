import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import RateLimitedUI from '../components/RateLimitedUI'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import NoteCard from '../components/NoteCard'
import api from "../lib/api.js"
import NotesNotFound from '../components/NotesNotFound.jsx'

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { 
    const fetchNotes = async () => { 
      try{ 
        const res = await api.get("/notes")
        console.log(res.data)
        setNotes(res.data)
        setIsRateLimited(false)
      }
      catch(error){ 
          console.log("Error fetching notes");
          if(error.response.status === 429){ 
            setIsRateLimited(true)
          }else{ 
            toast.error("Error fetchin notes")
          }
      }finally{ 
        setLoading(false)
      }
    };
    fetchNotes();
  }, []);
  return (
    <div className="min-h-screen bg-base-300"> 
      <Navbar />

      {isRateLimited && <RateLimitedUI  />}

      <div className="max-w-7xl mx-auto  p-4 mt-6"> 
        {loading && <div className="text-center font-bold tracking-tight text-black-900 py-10">loading notes...</div>}

        {notes.length === 0 && !isRateLimited && <NotesNotFound />}

        {notes.length > 0 && !isRateLimited && ( 
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> 
            {notes.map(note => ( 
              <NoteCard key={note._id} note={note} setNotes={setNotes}/>
            ))}
          </div>
        )}
      </div>


    </div>
  )
}

export default HomePage