"use client";
import { useRouter } from 'next/navigation';

const Tag = (props) => {
  const { text } = props;
  ``;
  const router = useRouter();

  const handleClick = (tagval) => {
    const newQueryParams = {
      tag: tagval,
    };
    const searchParams = new URLSearchParams();
    searchParams.set('tag', newQueryParams.tag); 
    const queryString = searchParams.toString()
    const url = `/events?${queryString}`
    router.push(url)
  }

  return (
    <div onClick={()=>handleClick(text)} className="m-2 inline-block bg-gradient-to-r from-orange-400 to-teal-600 text-white rounded-2xl h-fit w-fit px-3 py-1 text-center font-bold hover:scale-110 hover:cursor-pointer">
      # {text}
    </div>
  );
};

export default Tag;
