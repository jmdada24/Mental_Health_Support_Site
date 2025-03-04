document.addEventListener('DOMContentLoaded', function() {
    // Initialize sidebar toggle functionality
    const sidebar = document.querySelector('.sidebar');
    const mobileToggle = document.querySelector('.mobile-toggle');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            sidebar.classList.toggle('show');
        });

        // Close sidebar when clicking outside
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                const isClickInsideSidebar = sidebar.contains(e.target);
                const isClickOnToggle = e.target.closest('.mobile-toggle');
                
                if (!isClickInsideSidebar && !isClickOnToggle && sidebar.classList.contains('show')) {
                    sidebar.classList.remove('show');
                }
            }
        });
    }

    // Close sidebar when window is resized above mobile breakpoint
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            sidebar.classList.remove('show');
        }
    });

    // Tab Switching Logic
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabName = button.getAttribute('data-tab');
            
            // Update active states
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            button.classList.add('active');
            document.getElementById(`${tabName}Content`).classList.add('active');
        });
    });

    // Testimonials Management
    const testimonialForm = document.getElementById('testimonialForm');
    const addTestimonialBtn = document.getElementById('addTestimonialBtn');
    const cancelTestimonialBtn = document.getElementById('cancelTestimonialBtn');
    const closeTestimonialBtn = document.getElementById('closeTestimonialBtn');
    const addTestimonialForm = document.getElementById('addTestimonialForm');

    // Sample testimonials data
    let testimonials = [
        {
            id: 1,
            clientName: "John",
            content: "Amazing therapy sessions!",
            rating: 5
        }
    ];

    // Toggle testimonial form
    addTestimonialBtn.addEventListener('click', () => {
        testimonialForm.style.display = 'flex';
    });

    [cancelTestimonialBtn, closeTestimonialBtn].forEach(btn => {
        if (btn) {
            btn.addEventListener('click', () => {
                testimonialForm.style.display = 'none';
                addTestimonialForm.reset();
            });
        }
    });

    // Update add testimonial button visibility
    function updateAddTestimonialButtonState() {
        addTestimonialBtn.style.display = testimonials.length >= 6 ? 'none' : 'block';
    }

    // Add formatUsername function
    function formatUsername(username) {
        // Remove any email format if entered
        username = username.split('@')[0];
        // Take only the first name if full name is entered
        username = username.split(' ')[0];
        // Capitalize first letter
        return username.charAt(0).toUpperCase() + username.slice(1);
    }

    // Handle testimonial form submission
    addTestimonialForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (testimonials.length >= 6) {
            alert('Maximum of 6 testimonials reached. Please delete some to add more.');
            return;
        }

        const username = formatUsername(document.getElementById('clientName').value);
        
        const newTestimonial = {
            id: Date.now(),
            clientName: username,
            content: document.getElementById('testimonialContent').value,
            rating: document.getElementById('rating').value
        };

        testimonials.push(newTestimonial);
        updateTestimonialsTable();
        updateAddTestimonialButtonState();
        testimonialForm.style.display = 'none';
        addTestimonialForm.reset();
    });

    // Update testimonials table
    function updateTestimonialsTable() {
        const tbody = document.getElementById('testimonialsTableBody');
        tbody.innerHTML = '';

        testimonials.forEach(testimonial => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${testimonial.clientName}</td>
                <td>${testimonial.content}</td>
                <td>${"★".repeat(testimonial.rating)}</td>
                <td>
                    <button class="btn btn-primary btn-sm" onclick="editTestimonial(${testimonial.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-secondary btn-sm" onclick="deleteTestimonial(${testimonial.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    // Word of the Day Management
    const wordForm = document.getElementById('wordForm');
    const addWordBtn = document.getElementById('addWordBtn');
    const cancelWordBtn = document.getElementById('cancelWordBtn');
    const closeWordBtn = document.getElementById('closeWordBtn');
    const addWordForm = document.getElementById('addWordForm');

    // Sample words data
    let words = [
        {
            id: 1,
            word: "Mindfulness",
            definition: "The practice of maintaining a nonjudgmental state of heightened awareness.",
            category: "mental-health",
            displayDate: "2024-01-20"
        }
    ];

    // Toggle word form
    addWordBtn.addEventListener('click', () => {
        wordForm.style.display = 'flex';
    });

    [cancelWordBtn, closeWordBtn].forEach(btn => {
        if (btn) {
            btn.addEventListener('click', () => {
                wordForm.style.display = 'none';
                addWordForm.reset();
            });
        }
    });

    // Handle word form submission
    addWordForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const newWord = {
            id: Date.now(),
            word: document.getElementById('word').value,
            definition: document.getElementById('definition').value,
            category: document.getElementById('category').value,
            displayDate: document.getElementById('displayDate').value
        };

        words.push(newWord);
        updateWordsTable();
        wordForm.style.display = 'none';
        addWordForm.reset();
    });

    // Update words table
    function updateWordsTable() {
        const tbody = document.getElementById('wordTableBody');
        tbody.innerHTML = '';

        words.forEach(word => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${word.word}</td>
                <td>${word.definition}</td>
                <td>${word.category}</td>
                <td>${word.displayDate}</td>
                <td>
                    <button class="btn btn-primary btn-sm" onclick="editWord(${word.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-secondary btn-sm" onclick="deleteWord(${word.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    // Close modals when clicking outside
    [testimonialForm, wordForm].forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                const form = modal.querySelector('form');
                if (form) form.reset();
            }
        });
    });

    // Initialize tables
    updateTestimonialsTable();
    updateWordsTable();
    updateAddTestimonialButtonState();

    // Make functions globally available
    window.editTestimonial = (id) => {
        const testimonial = testimonials.find(t => t.id === id);
        if (testimonial) {
            document.getElementById('clientName').value = testimonial.clientName;
            document.getElementById('testimonialContent').value = testimonial.content;
            document.getElementById('rating').value = testimonial.rating;
            testimonialForm.style.display = 'flex';
            testimonial._editing = true;
        }
    };

    window.deleteTestimonial = (id) => {
        if (confirm('Are you sure you want to delete this testimonial?')) {
            testimonials = testimonials.filter(t => t.id !== id);
            updateTestimonialsTable();
            updateAddTestimonialButtonState();
        }
    };

    window.editWord = (id) => {
        const word = words.find(w => w.id === id);
        if (word) {
            document.getElementById('word').value = word.word;
            document.getElementById('definition').value = word.definition;
            document.getElementById('category').value = word.category;
            document.getElementById('displayDate').value = word.displayDate;
            wordForm.style.display = 'flex';
            word._editing = true;
        }
    };

    window.deleteWord = (id) => {
        if (confirm('Are you sure you want to delete this word?')) {
            words = words.filter(w => w.id !== id);
            updateWordsTable();
        }
    };
});
