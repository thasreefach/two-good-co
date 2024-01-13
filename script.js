
// const scroll = new LocomotiveScroll({
//     el: document.querySelector('#main'),
//     smooth: true
// });

function locopage(){

    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
    
    const locoScroll = new LocomotiveScroll({
      el: document.querySelector("#main"),
      smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);
    
    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
      scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
      }, // we don't have to define a scrollLeft because we're only scrolling vertically.
      getBoundingClientRect() {
        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
      },
      // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
      pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });
    
    
    
    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    
    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
}
locopage()

function navbarAnim(){
    gsap.to(".nav1 svg",{
        transform:"translateY(-100%)",
        scrollTrigger:{
            trigger:"#page1",
            scroller:"#main",
            // markers:true,
            start:"top 0",
            end:"top -5%",
            scrub:true
        }
    })
    gsap.to(".nav2 .prt1",{
        transform:"translateY(-100%)",
        opacity:0,
        scrollTrigger:{
            trigger:"#page1",
            scroller:"#main",
            // markers:true,
            start:"top 0",
            end:"top -5%",
            scrub:true
        }
    })
}
navbarAnim()

function page1Anim(){
    gsap.from("#page1 h1",{
        y:100,
        opacity:0,
        duration:1,
        delay:.5,
        stagger:0.2
    })
    gsap.from("#page1 .vedcn",{
        scale:0.9,
        y:100,
        opacity:0,
        duration:.5,
        delay:1,
    })
}
page1Anim()

function playAnim(){
    let vd = document.querySelector(".vedcn");
    let play = document.querySelector(".play");

    vd.addEventListener("mousemove",function(dets){
        gsap.to(play,{
            left:dets.x - 70,
            top:dets.y - 80
        })
    })

    vd.addEventListener("mouseenter",function(){
        gsap.to(play,{
            opacity:1,
            scale:1
        })
    })

    vd.addEventListener("mouseleave",function(){
        gsap.to(play,{
            opacity:0,
            scale:0
        })
    })
}
playAnim()




function cursorAnim(){
    document.addEventListener("mousemove", function (dets) {
        gsap.to("#cursor", {
          left: dets.x-70,
          top: dets.y-80,
        });
      });
    
    document.querySelectorAll(".child").forEach(function(elem){
        elem.addEventListener("mouseenter",function(){
            gsap.to("#cursor",{
            scale:1
            })
        })
        
        elem.addEventListener("mouseleave",function(){
            gsap.to("#cursor",{
            scale:0
            })
        })
    })
}
cursorAnim()