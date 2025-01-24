"use client";

import EventCard from "@/components/EventCard";
import SwiperComponent from "@/components/SwiperComponent";
import React, {useState, useEffect } from "react";
import { dummyEvents } from "@/constants/dummyEvents";
import { usePathname } from 'next/navigation';
import Tag from "@/components/Tag";

function Event() {
    
    const eventid = usePathname().split("/").pop();
    console.log("Event id  : "+eventid)

    const [data, setData] = useState([]);
    
    useEffect(()=>{
        const fetchData = async () => {
        try {
            const response = await fetch(`https://qevent-backend.labs.crio.do/events/${eventid}`, {cache:"no-store"});
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
    }, [eventid])


  return (
    <div className="h-full">
      <SwiperComponent />

      <div className="flex flex-col mt-5 ml-10 mr-10 mb-5">
        <div className="flex justify-end w-full">
          <img 
            className="object-contain w-50 mb-3 group-hover:filter-none shadow-lg mr-5"
            src={data?.image}
          />
        </div>
        <div className="w-full overflow-hidden text-ellipsis">
            {data?.tags?.map((tag) => (
              <Tag text={tag} key={tag} />
            ))}
          </div>
          <p className="mt-5 mb-10 overflow-hidden text-ellipsis">
            {new Date(data?.date).toDateString()} | {data?.time}
          </p>
          <p className="location overflow-hidden text-ellipsis">{data?.location}</p>
          <h2 className="text-2xl font-bold cardName overflow-hidden text-ellipsis">{data?.name}</h2>
          <div className="flex justify-between items-center mt-10 detail overflow-hidden text-ellipsis">
            <h3 className="text-2xl">{data?.artist}</h3>
            <h3 className="text-2xl">
              {" "}
              {data?.price > 0
                ? `$ ${data?.price?.toLocaleString()}`
                : "FREE"}
            </h3>
          </div>
      </div>
           
    </div>
  );
}

export default Event;
