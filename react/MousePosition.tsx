import { useState, useEffect } from "react";

const MousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 10, y: 10 });

  const updateMousePosition = (ev: {clientX: any, clientY: any}) => {
    setMousePosition({ x: ev.clientX, y: ev.clientY });
  };

  useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition);

    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  return mousePosition;
};

export default MousePosition;