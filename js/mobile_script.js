document.addEventListener('DOMContentLoaded', function() {
    // =============================================
    // COURSES TAB FUNCTIONALITY
    // =============================================
    
    // 1. Get all the tab buttons and tab content sections
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // 2. Function to switch between tabs
    function switchTab(tabId) {
        // First remove 'active' class from all buttons and contents
        tabButtons.forEach(button => {
            button.classList.remove('active');
        });
        
        tabContents.forEach(content => {
            content.classList.remove('active');
        });
        
        // Then add 'active' class to the clicked button and corresponding content
        const selectedButton = document.querySelector(`.tab-btn[data-tab="${tabId}"]`);
        const selectedContent = document.getElementById(`${tabId}-tab`);
        
        if (selectedButton && selectedContent) {
            selectedButton.classList.add('active');
            selectedContent.classList.add('active');
            
            // On mobile, scroll to the courses section after switching tabs
            if (window.innerWidth <= 768) {
                setTimeout(() => {
                    document.querySelector('.courses-section').scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 100);
            }
        }
    }
    
    // 3. Add click event to each tab button
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            switchTab(tabId);
        });
    });
    
    // 4. Initialize - show the first tab by default
    if (tabButtons.length > 0 && tabContents.length > 0) {
        tabButtons[0].classList.add('active');
        tabContents[0].classAdd('active');
    }
    
    // =============================================
    // MOBILE-SPECIFIC ADJUSTMENTS
    // =============================================
    
    function handleMobileLayout() {
        // Check if we're on mobile view
        const isMobile = window.innerWidth <= 768;
        
        // Adjust tab buttons for mobile
        tabButtons.forEach(button => {
            if (isMobile) {
                // Make buttons full width on mobile
                button.style.width = '100%';
                button.style.marginBottom = '8px';
            } else {
                // Reset styles for desktop
                button.style.width = '';
                button.style.marginBottom = '';
            }
        });
    }
    
    // Run on page load and when window is resized
    handleMobileLayout();
    window.addEventListener('resize', handleMobileLayout);
    
    // =============================================
    // TOUCH DEVICE DETECTION (for better UX)
    // =============================================
    
    // Add touch class to body if using a touch device
    function detectTouch() {
        if ('ontouchstart' in window || navigator.maxTouchPoints) {
            document.body.classList.add('touch-device');
        } else {
            document.body.classList.remove('touch-device');
        }
    }
    
    detectTouch();
    window.addEventListener('resize', detectTouch);
});
