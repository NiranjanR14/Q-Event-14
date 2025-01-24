"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {useState, useEffect } from "react";
import SwiperComponent from "@/components/SwiperComponent";
import {v4 as uuidv4} from 'uuid';


const CreateEvent = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const randomImageNumber = Math.floor(Math.random() * 99) + 1;

  const [formData, setFormData] = useState({
    id: uuidv4(),
    name: '',
    date: '',
    time: '',
    location: '',
    artist: '',
    price: '',
    tags: [],
    image: `https://randomuser.me/api/portraits/men/${randomImageNumber}.jpg`,
  });

  useEffect(() => {
    if (status === "loading") return; // Do nothing while loading
    if (!session) {
      router.push("/events"); // Redirect to events page if not authenticated
    }
  }, [session, status, router]);

  if (!session) {
    return <p>Loading...</p>; // Show a loading message while redirecting
  }

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'tags') {
      setFormData({
        ...formData,
        [name]: value.split(',')
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://qevent-backend.labs.crio.do/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log('Event created:', data);
      router.push("/events");
    } catch (error) {
      console.error('Error creating event:', error);
      window.alert('Event creation failed');
    }
  };

  return (
    <div className="h-full mb-10">
      <SwiperComponent />
      <h1 className="text-5xl font-bold max-sm:text-3xl bg-gradient-to-br from-orange-400 to-teal-600 bg-clip-text text-transparent mx-4">
        Create Event
      </h1>
      <div className="flex justify-center mt-6">
      <form onSubmit={handleSubmit} className="space-y-4 w-1/2">
      <div>
        <label className="block text-md font-bold text-gray-700">Event Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div>
        <label className="block text-md font-bold text-gray-700">Date</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="mt-1 block w-1/2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div>
        <label className="block text-md font-bold text-gray-700">Time</label>
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          className="mt-1 block w-1/2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div>
        <label className="block text-md font-bold text-gray-700">Location</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div>
        <label className="block text-md font-bold text-gray-700">Artist</label>
        <input
          type="text"
          name="artist"
          value={formData.artist}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div>
        <label className="block text-md font-bold text-gray-700">Price (in $)</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="mt-1 block w-1/2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div>
        <label className="block text-md font-bold text-gray-700">Tags (enter each tag with space between them)</label>
        <input
          type="text"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      
      <button
        type="submit"
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Create Event
      </button>
    </form>
    </div>
    </div>
  );
};

export default CreateEvent;