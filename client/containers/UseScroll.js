import React, { useState, useEffect } from "react";

export const UseScrollLeft = () => {
  const [hidden, setHidden] = useState(false);

  const handleScroll = () => {
    const top = window.pageYOffset || document.documentElement.scrollTop;
    setHidden(top > 0 && top < 360);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return hidden;
};

export const UseScrollRight = () => {
    const [hidden, setHidden] = useState(false);
  
    const handleScroll = () => {
      const top = window.pageYOffset || document.documentElement.scrollTop;
      setHidden(top > 0 && top < 870);
    };
  
    useEffect(() => {
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);
  
    return hidden;
  };

  export const UseScrollNav = () => {
    const [hidden, setHidden] = useState(false);
  
    const handleScroll = () => {
      const top = window.pageYOffset || document.documentElement.scrollTop;
      setHidden(top < 1350);
    };
  
    useEffect(() => {
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);
  
    return hidden;
  };

  export const UseScrollCharts = () => {
    const [hidden, setHidden] = useState(false);
  
    const handleScroll = () => {
      const top = window.pageYOffset || document.documentElement.scrollTop;
      setHidden(top < 1680);
    };
  
    useEffect(() => {
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);
  
    return hidden;
  };

  export const UseScrollNumbers = () => {
    const [hidden, setHidden] = useState(false);
  
    const handleScroll = () => {
      const top = window.pageYOffset || document.documentElement.scrollTop;
      setHidden(top < 2000);
    };
  
    useEffect(() => {
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);
  
    return hidden;
  };
