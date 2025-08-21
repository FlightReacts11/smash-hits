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

   
    tl.from(".heading", { y: 20, opacity: 0, duration: 1, ease: "power2.out" }, "-=0.8");

    tl.from(".gsap-enhancement", {fontSize: 40, duration: 0.75, ease: "power2.out"}, "-=0.2");
});
