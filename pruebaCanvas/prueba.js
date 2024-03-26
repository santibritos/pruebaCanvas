

    window.onload = function(){
    
    const canvasEl = document.getElementById('canvas1');
    const context = canvasEl.getContext('2d');
    const mouse =
    {
        x : null,
        y : null,
    }
    const particlesArray = [];
    let hue = 0;


    canvasEl.width = window.innerWidth;
    canvasEl.height = window.innerHeight;

   
canvasEl.addEventListener('click',function(event)
{

    mouse.x = event.offsetX;
    mouse.y = event.offsetY;
    init();

     console.log('Clickeo');
})


canvasEl.addEventListener('mousemove',function(event)
{

    mouse.x = event.offsetX;
    mouse.y = event.offsetY;
    init();

     console.log('Clickeo');
    //  drawMiniCircle(context,mouse);
})



class Particle
{
    constructor()
    {
        this.x= mouse.x;
        this.y = mouse.y;
        // this.x = Math.random() * canvasEl.width;
        // this.y = Math.random() * canvasEl.height;
        this.size = Math.random() * 15+1;
        this.speedX = Math.random() * 3 -1.5;
        this.speedY = Math.random() * 3 -1.5;
        this.color = 'hsl('+hue+',100%,50%)';
    }
    update()
    {
         
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.1;
    }
    draw()
    {
        context.beginPath();
        context.arc(this.x, this.y,this.size,0,360);
        // context.strokeStyle = 'yellow';
        // context.lineWidth = 5;
        // context.stroke();
        context.fillStyle =this.color;
        context.fill();
        context.closePath();
    }

}

function init()
{
    for (let i = 0;i < 7 ; i++)
    {
        particlesArray.push(new Particle());
    }
}

function handleParticles()
{
    
    for(let i = 0;i<particlesArray.length;i++)
    {
        particlesArray[i].update();
        particlesArray[i].draw();

        for(let j = i; j < particlesArray.length;j++)
        {
            const dx = particlesArray[i].x - particlesArray[j].x;
            const dy = particlesArray[i].y - particlesArray[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if(distance < 100)
            {
                context.beginPath();
                context.strokeStyle = particlesArray[i].color;
                context.lineWidth = 0.5;
                context.moveTo(particlesArray[i].x,particlesArray[i].y);
                context.lineTo(particlesArray[j].x,particlesArray[j].y);
                context.stroke();
               
            }
        }
        if(particlesArray[i].size <= 0.2)
        {
            particlesArray.splice(i,1);
            i--;
        }
    }
}



init();

function animate()
{
    //  context.clearRect(0,0,canvasEl.width,canvasEl.height);

     context.fillStyle = 'rgba(0,0,0,0.02)';
     context.fillRect(0,0,canvasEl.width,canvasEl.height)
   
   
   handleParticles();
   hue++;
    console.log("frame");
    requestAnimationFrame(animate);
    
}

    animate(context,mouse);

   
}

window.addEventListener('resize',function()
{
    canvasEl.width = window.innerWidth;
    canvasEl.height = window.innerHeight;

})

function drawCircle(context)
{
    context.beginPath();
    context.arc(400, 100,50,0,360);
    context.strokeStyle = 'yellow';
    context.lineWidth = 10;
    context.stroke();
    context.fillStyle ='green';
    context.fill();
    context.closePath();
}

function drawMiniCircle(context,mouse)
{
    context.beginPath();
    context.arc(mouse.x, mouse.y,25,0,360);
    context.strokeStyle = 'yellow';
    context.lineWidth = 5;
    context.stroke();
    context.fillStyle ='green';
    context.fill();
    context.closePath();
}

