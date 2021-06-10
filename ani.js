const backgroundImg = document.querySelector('[data-background-img]');
const mars = document.querySelector('[data-mars]');
const blocks = document.querySelectorAll('.block');
const windBlock = document.querySelector('[data-wind-block]');
const tempBlock = document.querySelector('[data-temp-block]');
const dateBlock = document.querySelector('[data-date-block]');
const toggleBlock = document.querySelector('[data-toggle-block]');
const previousSection = document.querySelector('[data-previous-section]');
const previousSol = document.querySelector('[data-previous-sol-container]');

setTimeout(() => {
const prevDay = document.querySelectorAll('.previous-day')

prevDay.forEach((el, index) =>{
    el.style.animation = `slideUpIn  1.5s forwards`;
    el.style.animationDelay = `${index * 125}ms`;

})
}, 1000);




const tl = new TimelineMax();
tl.fromTo(backgroundImg, 1,
    {width:"0%"}, 
     {width:"102%", 
     ease:Power2.easeInOut}
)
.fromTo(mars, 1, 
    {x: "128%"},
    {x: "0%", 
    ease:Power1.easeInOut},
    "-=.5"
)
.fromTo(dateBlock, 1, 
{opacity: 0},
{opacity:1, ease:Power1.easeInOut},
"-=.8"
)
.fromTo(tempBlock, 1, 
    {opacity: 0},
    {opacity:1, ease:Power1.easeInOut},
    "-=.7"
)
.fromTo(windBlock, 1, 
    {opacity: 0},
    {opacity:1, ease:Power1.easeInOut},
    "-=.7"
)
.fromTo(toggleBlock, 1, 
    {opacity: 0},
    {opacity:1, ease:Power1.easeInOut},
    "-=.7"
)
.fromTo(previousSection, .5, 
    {height: "0vh"},
    {height: "35vh",
     ease:Power1.easeInOut}
)
.fromTo(previousSol, 1,
    {display:"none"},
    {display:"flex"}
);



















