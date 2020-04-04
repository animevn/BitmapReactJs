import React, {useEffect, useRef} from "react";

const getPixelRatio = context => {
  var backingStore =
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
    let i = 0;
    const render = ()=>{
      ctx.beginPath();
      ctx.fillStyle = "#ffbf00";
      ctx.arc(canvas.width/2, canvas.height/2,
        (canvas.width/2) * Math.abs(Math.cos(i)), 0, 2 * Math.PI);
      ctx.fill();
      i += 0.05;
      requestId = requestAnimationFrame(render);
    };

    render();
    return ()=> {
      cancelAnimationFrame(requestId);
    }

  });

  return (
    <canvas ref={canvasRef} style={{ width: '100px', height: '100px' }}/>
  )
}

export default Home;