'use client';

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef, useEffect, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const Showcase = () => {
    const [isClient, setIsClient] = useState(false);
    const container = useRef(null);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useGSAP(
        (context) => {
            if (!isClient) return;

            const ctx = gsap.context(() => {
                // Verificar width diretamente no cliente
                const isTablet = window.innerWidth <= 1024;

                if (!isTablet) {
                    const timeline = gsap.timeline({
                        scrollTrigger: {
                            trigger: container.current,
                            start: "top",
                            end: "bottom top",
                            scrub: true,
                            pin: true,
                        },
                    });

                    timeline.to(".mask img", {
                        scale: 1, // <= o valor final da máscara no desktop
                        ease: "none"
                    });
                }
            }, container);

            return () => ctx.revert();
        },
        { dependencies: [isClient], scope: container }
    );

    if (!isClient) {
        return (
            <section id='showcase'>
                <div className='media'>
                    <div className="w-full h-[500px] bg-gray-200 animate-pulse rounded-lg"></div>
                </div>
            </section>
        );
    }

    return (
        <section id='showcase' ref={container}>
            <div className='media'>
                <video src='/videos/showcase.webm' loop muted autoPlay playsInline />
                <div className='mask'>
                    <img src='/mask-black.webp' alt="Showcase logo" />
                </div>
            </div>
        </section>
    );
};

export default Showcase;


// #showcase {
//   @apply relative;

//   .media {
//     @apply relative lg:overflow-hidden;

//     video {
//       @apply w-full object-cover object-center;
//     }

//     .mask {
//       @apply absolute inset-0;

//       img {
//         @apply h-full w-full scale-[155];
//         /* máscara começa grande */
//       }

//       @media (max-width: 1024px) {
//         img {
//           @apply scale-[1.2];
//           /* mobile fica menor */
//         }
//       }
//     }
//   }
// }