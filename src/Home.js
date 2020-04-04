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
    const render = ()=>{
      ctx.beginPath();
      ctx.fillStyle = "#ffbf00";
      ctx.arc(canvas.width/4, canvas.height/4, canvas.width/4, 0, 2 * Math.PI);
      ctx.fill();
    };

    requestAnimationFrame(render);
  });

  return (
    <div className="container mt-3">

      <canvas ref={canvasRef}
              className="row col-xl-7 col-lg-8 col-md-10 col-sm-12 col-12 mx-auto my-3 px-0">

      </canvas>

    </div>
  )
}

export default Home;