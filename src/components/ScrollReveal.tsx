"use client";

import { useEffect } from "react";

export default function ScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target.classList.contains("reveal")) {
              entry.target.classList.add("reveal-active");
            } else if (entry.target.classList.contains("reveal-left")) {
              entry.target.classList.add("reveal-left-active");
            } else if (entry.target.classList.contains("reveal-right")) {
              entry.target.classList.add("reveal-right-active");
            }
            // Once revealed, no need to observe anymore
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    const elements = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");
    elements.forEach((el) => {
      // Set initial styles in JS to avoid layout shift before JS loads
      if (el.classList.contains("reveal")) {
        el.style.opacity = "0";
        el.style.transform = "translateY(40px)";
        el.style.transition = "all 0.8s cubic-bezier(0.5, 0, 0, 1)";
      } else if (el.classList.contains("reveal-left")) {
        el.style.opacity = "0";
        el.style.transform = "translateX(-50px)";
        el.style.transition = "all 0.8s cubic-bezier(0.5, 0, 0, 1)";
      } else if (el.classList.contains("reveal-right")) {
        el.style.opacity = "0";
        el.style.transform = "translateX(50px)";
        el.style.transition = "all 0.8s cubic-bezier(0.5, 0, 0, 1)";
      }
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
