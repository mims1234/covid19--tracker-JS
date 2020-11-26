const canvas = document.getElementById("canvas1")
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

//get mouse Position
let mouse = {
    x: null,
    y: null,
    radius: (canvas.height/80) * (canvas.width/80)
}

window.addEventListener('mousemove',
    function(event){
        mouse.x = event.x;
        mouse.y = event.y;
    }
);

// create particle
class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }

    //method to draw individual particle
    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, Math.PI * 2, false);
        ctx.fillStyle = `#555555`;
        ctx.fill();
    }

    //check particle position, check mouse position, move the particle, draw the particle
    update(){
        //check if particle is still within canvas
        if(this.x > canvas.width || this.x < 0){
            this.directionX = -this.directionX;
        }
        if(this.y > canvas.height || this.y < 0){
            this.directionY = -this.directionY;
        }

        //check collision detection - mouse position / particle position
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx*dx + dy*dy);
        if(distance < mouse.radius + this.size) {
            if(mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                this.x +=3;
            }
            if(mouse.x > this.x && this.x > this.size * 10){
                this.x -=3;
            }
            if(mouse.y < this.y && this.y < canvas.height - this.size * 10){
                this.y+=3;
            }
            if(mouse.y > this.y && this.y > this.size * 10){
                this.y -=3;
            }
        }

        //move particle
        this.x += this.directionX;
        this.y += this.directionY;

        //draw particle
        this.draw();
    }
}

//create particle array
function init(){
    particlesArray = [];
    integersArray = [-1,1];
    let numberOfParticles = (canvas.height * canvas.width) / 9000;
    for (let i=0;i< numberOfParticles;i++){
        let size = (Math.random() * 5) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 1 * integersArray[Math.floor(Math.random() * integersArray.length)])
        let directionY = (Math.random() * 1 * integersArray[Math.floor(Math.random() * integersArray.length)])
        let color = '#FFFFFF'

        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

//animation loop
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,innerWidth,innerHeight);

    for(let i=0;i<particlesArray.length;i++) {
        particlesArray[i].update();
    }
    connnect()
}

//check if particles are close enough to draw line between them
function connnect() {
    let opactityValue = 0.75;
    for(let a=0; a<particlesArray.length; a++) {
        for(let b=a; b<particlesArray.length; b++) {
            let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
            if(distance < (canvas.width/30) * (canvas.height/30)) {
                opactityValue = 0.75 - (distance/20000);
                ctx.strokeStyle=`rgba(248, 1, 1, ${opactityValue})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
            else if(distance < (canvas.width/7) * (canvas.height/7)) {
                opactityValue = 0.75 - (distance/20000);
                ctx.strokeStyle=`rgba(80,80,80,${opactityValue})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

// resize event
window.addEventListener('resize',
    function(){
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        mouse.radius = ((canvas.height/80) * (canvas.height/80));
        init();
    }
)

//mouse out event
window.addEventListener('mouseout',
    function(){
        mouse.x = undefined;
        mouse.y = undefined;
    }
)

init()
animate()