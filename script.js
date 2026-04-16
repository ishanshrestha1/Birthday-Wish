
function reveal(){
  document.getElementById("msg").style.display="block";
  document.getElementById("music").play();
}

// Simple Fireworks
const canvas=document.getElementById('fireworks');
const ctx=canvas.getContext('2d');
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

let particles=[];

function createFirework(){
  let x=Math.random()*canvas.width;
  let y=Math.random()*canvas.height/2;
  for(let i=0;i<50;i++){
    particles.push({
      x:x,
      y:y,
      vx:(Math.random()-0.5)*5,
      vy:(Math.random()-0.5)*5,
      life:100
    });
  }
}

function animate(){
  ctx.fillStyle="rgba(0,0,0,0.2)";
  ctx.fillRect(0,0,canvas.width,canvas.height);

  particles.forEach((p,i)=>{
    p.x+=p.vx;
    p.y+=p.vy;
    p.life--;

    ctx.fillStyle="hsl("+Math.random()*360+",100%,50%)";
    ctx.fillRect(p.x,p.y,3,3);

    if(p.life<=0)particles.splice(i,1);
  });

  requestAnimationFrame(animate);
}

setInterval(createFirework,1000);
animate();
