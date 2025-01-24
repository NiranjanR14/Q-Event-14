"use client";

import EventCard from "@/components/EventCard";
import SwiperComponent from "@/components/SwiperComponent";
import React, {useState, useEffect } from "react";
import { dummyEvents } from "@/constants/dummyEvents";
import { useSearchParams } from 'next/navigation';

function Events() {

    const [data, setData] = useState([]);
    const searchParams = useSearchParams();

    const artist = searchParams.get('artist');
    const tag = searchParams.get('tag');

    const classes = ['tags', 'date', 'location', 'cardName', 'detail']

    useEffect(()=>{
        const fetchData = async () => {
        try {
            const response = await fetch("https://qevent-backend.labs.crio.do/events", {cache:"no-store"});
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

    useEffect(() => {
      classes.forEach((item) => {
        const divs = document.querySelectorAll(`.${item}`); 
        if(item=="tags"){
          if (divs.length > 0) {
            let maxHeight = 100;
      
            // divs.forEach((div) => {
            //   maxHeight = Math.max(maxHeight, div.clientHeight);
            // });
      
            divs.forEach((div) => {
              div.style.height = `${maxHeight}px`;
            });
          }
        }
        else{
        if (divs.length > 0) {
          let maxHeight = 30;
    
          // divs.forEach((div) => {
          //   maxHeight = Math.max(maxHeight, div.clientHeight);
          // });
    
          divs.forEach((div) => {
            div.style.height = `${maxHeight}px`;
          });
        }
      }
      })
    }, [data]);

  return (
    <div className="h-full mb-10">
      <SwiperComponent />

      <h1 className="text-5xl font-bold max-sm:text-3xl bg-gradient-to-br from-orange-400 to-teal-600 bg-clip-text text-transparent mx-4">
        Events page
      </h1>
      
      <div id="event-grid" className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 mt-8 mb-32">
        {!artist && ! tag &&
          data?.map((eventData) => (
          <EventCard eventData={eventData} />
        )) }
        { artist && 
          data?.map((eventData) => (
            (eventData.artist == artist) &&
          <EventCard eventData={eventData} />
        ))
        }
        { tag && 
          data?.map((eventData) => (
            (Array.isArray(eventData?.tags) && (eventData?.tags)?.some((tagval)=> tagval == tag)) &&
          <EventCard eventData={eventData} />
        ))
        }
      </div>
    </div>
  );
}

export default Events;
