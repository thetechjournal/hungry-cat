const cat = document.getElementById('cat');
const catSatisfied = document.getElementById('cat-satisfied');
const catHungry = document.getElementById('cat-hungry');
const awesome = document.querySelector('.awesome');
const counter = document.getElementById('counter');

let score = 0;
const randomNumber = Math.floor(Math.random() * 7) + 2 // 0-7 -> 2-8

let current = '';

if(score === 0) counter.innerHTML = `I'm very hungry. Feed me ${randomNumber} fishes today. 😿`;

const fishes = document.querySelectorAll('.fish');

fishes.forEach(fish => {
    fish.addEventListener('click', () => {
        score++;
        const burp = new Audio('./sounds/burp.wav');
        cat.classList.add("satified");
        tl.play();
        cat.classList.add("jumpup");
        setTimeout(() => {
            cat.classList.remove("jumpup");
        }, 100);

        fish.style.display = "none";

        if(score === 1) {
            const catPlayer = new Audio('./sounds/cat.mp3');
            catPlayer.play();
            counter.innerHTML = `Thanks for giving me ${score} fish. I want ${randomNumber-score} more... 😸`;
        } else if(score < randomNumber) {
            burp.play();
            counter.innerHTML = `Thanks for giving me ${score} fishes. I still want ${randomNumber-score} more... 😽`;

        }
        if(score === randomNumber){
            tl.play();
            catHungry.style.display = "none";
            catSatisfied.style.display = "block"; 
            counter.innerHTML = `I am now full, don't disturb me while I am sleeping...😻`;
            fish.removeEventListener('click');
            
        } 
    })
})

const tl = new TimelineLite({paused: true});

tl.to('.awesome', 0.5, {
    y: -10,
    ease: Power2.easeOut
})
.to('.awesome', 0.5, {
    y: 10,
    ease: Power2.easeOut
})

const flightpath1 = {
    curviness: 1.25,
    autoRotate: true,
    values: [
        {x: 100, y: -20}, 
        {x: 300, y: 10}, 
        {x: 800, y: -20}, 
        {x: 900, y: 40}, 
        {x: 1200, y: -40}, 
        {x: 1500, y: -90},  
        {x: 1800, y: 90},
        {x: 1200, y: -90},
        {x: 700, y: 90},
        {x: 1400, y: 40}

    ]
}

const flightpath2 = {
    curviness: 1,
    autoRotate: false,
    values: [
        {x: -300, y: -90},
        {x: -700, y: 90},
        {x: -800, y: -10}, 
        {x: -1200, y: 10}, 
        {x: -1600, y: -10}
    ]
}

const tween = new TimelineLite({ repeat: 5, repeatDelay: 0 });
    
tween
    .add(
        TweenLite.to('.green-fish', 10, {
            bezier: flightpath1,
            ease: Power1.easeInOut
        }))
    .add(
        TweenLite.to('.orange-fish', 10, {
            bezier: flightpath2,
            ease: Power1.easeInOut
    }));

