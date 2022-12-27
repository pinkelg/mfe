import React, {useRef, useEffect} from 'react'; 
import {mount} from 'marketing/MarketingIndex';

const Marketing = () => {
  const ref = useRef(null);

  useEffect(()=>{
    mount(ref.current);
  },[]);

  return <div ref={ref} />;
}

export {Marketing};