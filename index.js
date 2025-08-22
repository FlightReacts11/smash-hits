document.addEventListener('DOMContentLoaded', () => {
    if (typeof gsap === 'undefined') {
        console.error("GSAP could not be found. Please check the script tag.");
        return;
    }


    /*GSAP timeline container*/
    const tl = gsap.timeline();
   
    tl.from(".header-logo", {
        y: -50,
        opacity: 0,
        duration: 1.2,
        ease: "power2.out"
    });

    tl.fromTo(".header-logo", {
        height: 110,
        width: "auto",
        rotation: 0,

    },
    { height: 110,
      rotation: 360,
      duration: 1

    }
);

   
    tl.from(".heading", { y: 20, opacity: 0, duration: 1, ease: "power2.out" }, "-=0.8");

    tl.from(".gsap-enhancement", {fontSize: 40, duration: 0.75, ease: "power2.out"}, "-=0.2");

});



/*Image carousel*/

  document.addEventListener('DOMContentLoaded', () => {
            
            const carouselItems = document.querySelectorAll(".carousel-item");

            let currentIndex = 0;

            function showSlide(index) {
                carouselItems.forEach(item => {
                    item.classList.remove('visible');
                });

                carouselItems[index].classList.add('visible');
            }
            
             
            function showNextSlide() {
                currentIndex++;
                if (currentIndex >= carouselItems.length) {
                    currentIndex = 0; 
                }
                showSlide(currentIndex);
            }
            
            function startAutoplay() {
                setInterval(showNextSlide, 4500); 
            }

           
            if (carouselItems.length > 0) {  
                showSlide(currentIndex); 
                startAutoplay();
            }
        });
