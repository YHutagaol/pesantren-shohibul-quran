// script.js

// Fungsi Scroll Reveal
function triggerRevealAnimation() {
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    const windowHeight = window.innerHeight;
    const elementVisible = 100;

    reveals.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible) {
            el.classList.add('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    const navbarContainer = document.getElementById('navbar-container');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            if(navbar) navbar.classList.add('shadow-md');
            if(navbarContainer) {
                navbarContainer.classList.remove('h-20');
                navbarContainer.classList.add('h-16'); 
            }
        } else {
            if(navbar) navbar.classList.remove('shadow-md');
            if(navbarContainer) {
                navbarContainer.classList.add('h-20');
                navbarContainer.classList.remove('h-16');
            }
        }

        if (scrollTopBtn) {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        }

        triggerRevealAnimation();
    });

    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Mobile Menu
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if(mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // FAQ Accordion
    const faqs = document.querySelectorAll('.faq-item');
    if (faqs.length > 0) {
        faqs.forEach(faq => {
            faq.querySelector('.faq-button').addEventListener('click', () => {
                faqs.forEach(item => {
                    if (item !== faq && item.classList.contains('active')) {
                        item.classList.remove('active');
                        item.querySelector('.faq-content').style.maxHeight = null;
                    }
                });
                faq.classList.toggle('active');
                const content = faq.querySelector('.faq-content');
                if (faq.classList.contains('active')) {
                    content.style.maxHeight = content.scrollHeight + "px";
                } else {
                    content.style.maxHeight = null;
                }
            });
        });
    }

   
    // Inisialisasi reveal saat pertama buka
            setTimeout(triggerRevealAnimation, 100);
            window.addEventListener('load', triggerRevealAnimation);
    
   
    // Logic Tabs Visi Misi
    window.openTab = function(evt, tabName) {
        const tabcontent = document.getElementsByClassName("tab-content");
        for (let i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
            tabcontent[i].classList.remove("active");
        }
        
        const tablinks = document.getElementsByClassName("tab-link");
        for (let i = 0; i < tablinks.length; i++) {
            // Menghapus warna hijau dari semua tombol
            tablinks[i].classList.remove("bg-primary", "text-white", "shadow-lg", "shadow-green-200", "active");
            // Mengembalikan warna ke putih/abu-abu
            tablinks[i].classList.add("bg-white", "text-gray-600", "border", "border-gray-200");
        }
        
        const selectedTab = document.getElementById(tabName);
        if(selectedTab){
            selectedTab.style.display = "block";
            void selectedTab.offsetWidth; // Trigger reflow untuk animasi
            selectedTab.classList.add("active");
        }
        
        // Mengubah tombol yang sedang di-klik menjadi warna hijau
        evt.currentTarget.classList.remove("bg-white", "text-gray-600", "border", "border-gray-200");
        evt.currentTarget.classList.add("bg-primary", "text-white", "shadow-lg", "shadow-green-200", "active");
    }
});