import React, {useEffect, useRef, useState} from "react";

const getPixelRatio = context => {
  let backingStore =
  context.backingStorePixelRatio ||
  context.webkitBackingStorePixelRatio ||
  context.mozBackingStorePixelRatio ||
  context.msBackingStorePixelRatio ||
  context.oBackingStorePixelRatio ||
  context.backingStorePixelRatio || 1;
  return (window.devicePixelRatio || 1) / backingStore;
  };

function Home() {
  let canvasRef = useRef();
  const [i, setI] = useState(0);

  useEffect(()=>{
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let ratio = getPixelRatio(ctx);
    let width = getComputedStyle(canvas).getPropertyValue("width").slice(0, -2);
    let height = getComputedStyle(canvas).getPropertyValue("height").slice(0, -2);
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    let requestId;
    const render = ()=>{
      ctx.beginPath();
      ctx.fillStyle = "#ffbf00";
      ctx.arc(canvas.width/2, canvas.height/2,
        (canvas.width/2) * Math.abs(Math.sin(i)), 0, 2 * Math.PI);
      ctx.fill();
      setI(old=>old + 0.0005);
      requestId = requestAnimationFrame(render);
    };

    render();
    return ()=> {
      cancelAnimationFrame(requestId);
    }

  });

  return (
    <div className="container d-flex flex-column mt-5">
      <canvas className="mx-auto" ref={canvasRef} style={{ width: '200px', height: '200px' }}/>
    </div>

  )
}

export default Home;