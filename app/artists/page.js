"use client";


import SwiperComponent from "@/components/SwiperComponent";
import React, {useState, useEffect} from "react";
import { dummyEvents } from "@/constants/dummyEvents";
import ArtistCard from "@/components/ArtistCard";

function App() {

  const [data, setData] = useState([]);
      
      useEffect(()=>{
          const fetchData = async () => {
          try {
              const response = await fetch("https://qevent-backend.labs.crio.do/artists", {cache:"no-store"});
              setData(await response.json());
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
              
            } catch (error) {
              console.error('Error fetching data:', error);
              // Handle error, e.g., return a default value or throw a custom error
              
            }
          }
          fetchData()
      }, [])

  return (
    <div className="h-full mb-10">
      <SwiperComponent />

      <h1 className="text-5xl font-bold max-sm:text-3xl bg-gradient-to-br from-orange-400 to-teal-600 bg-clip-text text-transparent mx-4">
        Artists page
      </h1>

      <div className="grid grid-cols-4 gap-x-3 gap-y-6 items-center justify-center mt-8 mb-32 ">
        {data?.map((artistData) => (
          <ArtistCard artistData={artistData} />
        ))}
      </div>
    </div>
  );
}

export default App;
