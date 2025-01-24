"use client";

import EventCard from "@/components/EventCard";
import SwiperComponent from "@/components/SwiperComponent";
import React, {useState, useEffect} from "react";
import { dummyEvents } from "@/constants/dummyEvents";
import Tag from "@/components/Tag";

function App() {
  const [data, setData] = useState([]);

  useEffect(()=>{
          const fetchData = async () => {
          try {
              const response = await fetch("https://qevent-backend.labs.crio.do/tags", {cache:"no-store"});
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
        Tags page
      </h1>
      <div className="w-full flex items-center justify-center">
      <div className="flex flex-wrap items-center justify-center mt-8 mb-32 w-70">
        {data?.map((tag) => (
              <Tag text={tag.name} key={tag.name} />
            ))}
      </div>
      </div>
    </div>
  );
}

export default App;
