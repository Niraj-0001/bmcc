// Mobile-specific JavaScript (mobile_script.js)
document.addEventListener('DOMContentLoaded', function() {
    // ====================== Mobile Sidebar ======================
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const body = document.body;

    // Create overlay if it doesn't exist
    if (!sidebarOverlay && document.querySelector('.sidebar')) {
        const overlay = document.createElement('div');
        overlay.className = 'sidebar-overlay';
        overlay.id = 'sidebarOverlay';
        document.body.appendChild(overlay);
    }

    // Toggle sidebar when menu button is clicked
    if (mobileMenuBtn && sidebar) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            sidebar.classList.toggle('active');
            body.classList.toggle('sidebar-open');
            
            // Update overlay visibility
            const overlay = document.getElementById('sidebarOverlay');
            if (overlay) {
                overlay.style.visibility = sidebar.classList.contains('active') ? 'visible' : 'hidden';
                overlay.style.opacity = sidebar.classList.contains('active') ? '1' : '0';
            }
        });
    }

    // Close sidebar when clicking on overlay
    document.addEventListener('click', function(e) {
        const overlay = document.getElementById('sidebarOverlay');
        if (overlay && e.target === overlay) {
            if (mobileMenuBtn) mobileMenuBtn.classList.remove('active');
            if (sidebar) sidebar.classList.remove('active');
            body.classList.remove('sidebar-open');
            overlay.style.visibility = 'hidden';
            overlay.style.opacity = '0';
        }
    });

    // ====================== Mobile Page Navigation ======================
    const footerLinks = document.querySelectorAll('.footer-link');
    
    // Handle footer navigation specifically for mobile
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = this.getAttribute('data-page');
            
            // Close sidebar if open
            if (mobileMenuBtn && mobileMenuBtn.classList.contains('active')) {
                mobileMenuBtn.classList.remove('active');
                if (sidebar) sidebar.classList.remove('active');
                body.classList.remove('sidebar-open');
                const overlay = document.getElementById('sidebarOverlay');
                if (overlay) {
                    overlay.style.visibility = 'hidden';
                    overlay.style.opacity = '0';
                }
            }
            
            // Scroll to top
            window.scrollTo(0, 0);
        });
    });

    // ====================== Responsive Adjustments ======================
    function handleResize() {
        // On desktop, ensure mobile states are reset
        if (window.innerWidth >= 992) {
            if (mobileMenuBtn) mobileMenuBtn.classList.remove('active');
            if (sidebar) sidebar.classList.remove('active');
            body.classList.remove('sidebar-open');
            const overlay = document.getElementById('sidebarOverlay');
            if (overlay) {
                overlay.style.visibility = 'hidden';
                overlay.style.opacity = '0';
            }
        }
    }
    
    window.addEventListener('resize', handleResize);
});
