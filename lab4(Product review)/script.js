// Data Storage - Maintains reviews during session
let reviews = [];
let selectedRating = 0;

// DOM Elements
const reviewForm = document.getElementById('reviewForm');
const customerNameInput = document.getElementById('customerName');
const customerEmailInput = document.getElementById('customerEmail');
const reviewTitleInput = document.getElementById('reviewTitle');
const reviewDescriptionInput = document.getElementById('reviewDescription');
const starRating = document.getElementById('starRating');
const stars = document.querySelectorAll('.star');
const selectedRatingDisplay = document.getElementById('selectedRating');
const charCountDisplay = document.getElementById('charCount');
const sortReviewsSelect = document.getElementById('sortReviews');
const reviewsList = document.getElementById('reviewsList');

// Error message elements
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const titleError = document.getElementById('titleError');
const descriptionError = document.getElementById('descriptionError');
const ratingError = document.getElementById('ratingError');

// Statistics elements
const totalReviewsDisplay = document.getElementById('totalReviews');
const averageRatingDisplay = document.getElementById('averageRating');
const averageStarsDisplay = document.getElementById('averageStars');
const recommendPercentageDisplay = document.getElementById('recommendPercentage');

// ==================== VALIDATION FUNCTIONS ====================

/**
 * Validates customer name field
 * @param {string} name - Customer name
 * @returns {object} - {isValid: boolean, errorMessage: string}
 */
function validateName(name) {
    const trimmedName = name.trim();
    
    if (trimmedName.length === 0) {
        return {
            isValid: false,
            errorMessage: 'Name should be between 2 and 30 characters'
        };
    }
    
    if (trimmedName.length < 2 || trimmedName.length > 30) {
        return {
            isValid: false,
            errorMessage: 'Name should be between 2 and 30 characters'
        };
    }
    
    return { isValid: true, errorMessage: '' };
}

/**
 * Validates email field (optional but validated if provided)
 * @param {string} email - Customer email
 * @returns {object} - {isValid: boolean, errorMessage: string}
 */
function validateEmail(email) {
    const trimmedEmail = email.trim();
    
    // Email is optional, so empty is valid
    if (trimmedEmail.length === 0) {
        return { isValid: true, errorMessage: '' };
    }
    
    // Check for @ symbol and domain extension
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(trimmedEmail)) {
        return {
            isValid: false,
            errorMessage: 'Please enter a valid email address'
        };
    }
    
    return { isValid: true, errorMessage: '' };
}

/**
 * Validates review title
 * @param {string} title - Review title
 * @returns {object} - {isValid: boolean, errorMessage: string}
 */
function validateTitle(title) {
    const trimmedTitle = title.trim();
    
    if (trimmedTitle.length === 0) {
        return {
            isValid: false,
            errorMessage: 'Review title should be between 5 and 100 characters'
        };
    }
    
    if (trimmedTitle.length < 5 || trimmedTitle.length > 100) {
        return {
            isValid: false,
            errorMessage: 'Review title should be between 5 and 100 characters'
        };
    }
    
    return { isValid: true, errorMessage: '' };
}

/**
 * Validates review description
 * @param {string} description - Review description
 * @returns {object} - {isValid: boolean, errorMessage: string}
 */
function validateDescription(description) {
    const trimmedDescription = description.trim();
    
    if (trimmedDescription.length === 0) {
        return {
            isValid: false,
            errorMessage: 'Review description should be between 20 and 1000 characters'
        };
    }
    
    if (trimmedDescription.length < 20 || trimmedDescription.length > 1000) {
        return {
            isValid: false,
            errorMessage: 'Review description should be between 20 and 1000 characters'
        };
    }
    
    return { isValid: true, errorMessage: '' };
}

/**
 * Validates product rating
 * @param {number} rating - Selected rating (1-5)
 * @returns {object} - {isValid: boolean, errorMessage: string}
 */
function validateRating(rating) {
    if (rating === 0 || rating === null || rating === undefined) {
        return {
            isValid: false,
            errorMessage: 'Please select a product rating'
        };
    }
    
    if (rating < 1 || rating > 5) {
        return {
            isValid: false,
            errorMessage: 'Please select a product rating'
        };
    }
    
    return { isValid: true, errorMessage: '' };
}

/**
 * Displays error message and applies error styling
 * @param {HTMLElement} inputElement - Input element
 * @param {HTMLElement} errorElement - Error message element
 * @param {string} message - Error message
 */
function showError(inputElement, errorElement, message) {
    errorElement.textContent = message;
    inputElement.classList.add('error');
    inputElement.classList.remove('success');
}

/**
 * Clears error message and applies success styling
 * @param {HTMLElement} inputElement - Input element
 * @param {HTMLElement} errorElement - Error message element
 */
function clearError(inputElement, errorElement) {
    errorElement.textContent = '';
    inputElement.classList.remove('error');
    inputElement.classList.add('success');
}

// ==================== STAR RATING SYSTEM ====================

/**
 * Updates visual display of star rating
 * @param {number} rating - Rating value (0-5)
 */
function updateStarDisplay(rating) {
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('selected');
            star.textContent = '★';
        } else {
            star.classList.remove('selected');
            star.textContent = '☆';
        }
    });
}

/**
 * Handles star hover effect
 */
stars.forEach((star, index) => {
    star.addEventListener('mouseenter', () => {
        stars.forEach((s, i) => {
            if (i <= index) {
                s.classList.add('hover');
                s.textContent = '★';
            } else {
                s.classList.remove('hover');
                if (!s.classList.contains('selected')) {
                    s.textContent = '☆';
                }
            }
        });
    });
});

/**
 * Removes hover effect when mouse leaves star rating area
 */
starRating.addEventListener('mouseleave', () => {
    stars.forEach(star => {
        star.classList.remove('hover');
    });
    updateStarDisplay(selectedRating);
});

/**
 * Handles star click to select rating
 */
stars.forEach(star => {
    star.addEventListener('click', () => {
        selectedRating = parseInt(star.getAttribute('data-rating'));
        updateStarDisplay(selectedRating);
        selectedRatingDisplay.textContent = `${selectedRating} star${selectedRating > 1 ? 's' : ''} selected`;
        selectedRatingDisplay.style.color = '#27ae60';
        clearError(starRating, ratingError);
    });
});

// ==================== CHARACTER COUNTER ====================

/**
 * Updates character count display for review description
 */
reviewDescriptionInput.addEventListener('input', () => {
    const charCount = reviewDescriptionInput.value.length;
    charCountDisplay.textContent = charCount;
    
    if (charCount > 1000) {
        charCountDisplay.style.color = 'var(--danger-color)';
    } else if (charCount >= 20) {
        charCountDisplay.style.color = 'var(--success-color)';
    } else {
        charCountDisplay.style.color = 'var(--dark-gray)';
    }
});

// ==================== REAL-TIME VALIDATION ====================

/**
 * Real-time validation for name field
 */
customerNameInput.addEventListener('blur', () => {
    const validation = validateName(customerNameInput.value);
    if (!validation.isValid) {
        showError(customerNameInput, nameError, validation.errorMessage);
    } else {
        clearError(customerNameInput, nameError);
    }
});

customerNameInput.addEventListener('input', () => {
    if (nameError.textContent) {
        const validation = validateName(customerNameInput.value);
        if (validation.isValid) {
            clearError(customerNameInput, nameError);
        }
    }
});

/**
 * Real-time validation for email field
 */
customerEmailInput.addEventListener('blur', () => {
    const validation = validateEmail(customerEmailInput.value);
    if (!validation.isValid) {
        showError(customerEmailInput, emailError, validation.errorMessage);
    } else {
        clearError(customerEmailInput, emailError);
    }
});

customerEmailInput.addEventListener('input', () => {
    if (emailError.textContent) {
        const validation = validateEmail(customerEmailInput.value);
        if (validation.isValid) {
            clearError(customerEmailInput, emailError);
        }
    }
});

/**
 * Real-time validation for title field
 */
reviewTitleInput.addEventListener('blur', () => {
    const validation = validateTitle(reviewTitleInput.value);
    if (!validation.isValid) {
        showError(reviewTitleInput, titleError, validation.errorMessage);
    } else {
        clearError(reviewTitleInput, titleError);
    }
});

reviewTitleInput.addEventListener('input', () => {
    if (titleError.textContent) {
        const validation = validateTitle(reviewTitleInput.value);
        if (validation.isValid) {
            clearError(reviewTitleInput, titleError);
        }
    }
});

/**
 * Real-time validation for description field
 */
reviewDescriptionInput.addEventListener('blur', () => {
    const validation = validateDescription(reviewDescriptionInput.value);
    if (!validation.isValid) {
        showError(reviewDescriptionInput, descriptionError, validation.errorMessage);
    } else {
        clearError(reviewDescriptionInput, descriptionError);
    }
});

reviewDescriptionInput.addEventListener('input', () => {
    if (descriptionError.textContent) {
        const validation = validateDescription(reviewDescriptionInput.value);
        if (validation.isValid) {
            clearError(reviewDescriptionInput, descriptionError);
        }
    }
});

// ==================== FORM SUBMISSION ====================

/**
 * Handles form submission
 */
reviewForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Validate all fields
    const nameValidation = validateName(customerNameInput.value);
    const emailValidation = validateEmail(customerEmailInput.value);
    const titleValidation = validateTitle(reviewTitleInput.value);
    const descriptionValidation = validateDescription(reviewDescriptionInput.value);
    const ratingValidation = validateRating(selectedRating);
    
    let isFormValid = true;
    
    // Show errors for invalid fields
    if (!nameValidation.isValid) {
        showError(customerNameInput, nameError, nameValidation.errorMessage);
        isFormValid = false;
    } else {
        clearError(customerNameInput, nameError);
    }
    
    if (!emailValidation.isValid) {
        showError(customerEmailInput, emailError, emailValidation.errorMessage);
        isFormValid = false;
    } else {
        clearError(customerEmailInput, emailError);
    }
    
    if (!titleValidation.isValid) {
        showError(reviewTitleInput, titleError, titleValidation.errorMessage);
        isFormValid = false;
    } else {
        clearError(reviewTitleInput, titleError);
    }
    
    if (!descriptionValidation.isValid) {
        showError(reviewDescriptionInput, descriptionError, descriptionValidation.errorMessage);
        isFormValid = false;
    } else {
        clearError(reviewDescriptionInput, descriptionError);
    }
    
    if (!ratingValidation.isValid) {
        ratingError.textContent = ratingValidation.errorMessage;
        selectedRatingDisplay.style.color = 'var(--danger-color)';
        isFormValid = false;
    } else {
        ratingError.textContent = '';
    }
    
    // If form is valid, create and store review
    if (isFormValid) {
        const recommendRadios = document.getElementsByName('recommend');
        let recommendValue = null;
        
        for (const radio of recommendRadios) {
            if (radio.checked) {
                recommendValue = radio.value === 'yes';
                break;
            }
        }
        
        const review = {
            id: Date.now(),
            name: customerNameInput.value.trim(),
            email: customerEmailInput.value.trim(),
            title: reviewTitleInput.value.trim(),
            description: reviewDescriptionInput.value.trim(),
            rating: selectedRating,
            recommend: recommendValue,
            date: new Date(),
            helpfulCount: 0,
            helpfulVoted: false
        };
        
        // Add review to array
        reviews.push(review);
        
        // Reset form
        resetForm();
        
        // Update display
        updateStatistics();
        displayReviews();
        
        // Scroll to reviews section
        document.getElementById('reviewsList').scrollIntoView({ behavior: 'smooth' });
    }
});

/**
 * Resets the form to initial state
 */
function resetForm() {
    reviewForm.reset();
    selectedRating = 0;
    updateStarDisplay(0);
    selectedRatingDisplay.textContent = 'No rating selected';
    selectedRatingDisplay.style.color = 'var(--dark-gray)';
    charCountDisplay.textContent = '0';
    charCountDisplay.style.color = 'var(--dark-gray)';
    
    // Clear all error messages and styling
    const inputs = [customerNameInput, customerEmailInput, reviewTitleInput, reviewDescriptionInput];
    const errors = [nameError, emailError, titleError, descriptionError];
    
    inputs.forEach((input, index) => {
        input.classList.remove('error', 'success');
        errors[index].textContent = '';
    });
    
    ratingError.textContent = '';
}

// ==================== STATISTICS CALCULATION ====================

/**
 * Calculates and updates review statistics
 */
function updateStatistics() {
    const totalReviews = reviews.length;
    
    if (totalReviews === 0) {
        totalReviewsDisplay.textContent = '0';
        averageRatingDisplay.textContent = '0.0';
        averageStarsDisplay.innerHTML = '';
        recommendPercentageDisplay.textContent = '0%';
        return;
    }
    
    // Calculate average rating
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = (totalRating / totalReviews).toFixed(1);
    
    // Calculate recommendation percentage
    const recommendCount = reviews.filter(review => review.recommend === true).length;
    const recommendPercentage = Math.round((recommendCount / totalReviews) * 100);
    
    // Update displays
    totalReviewsDisplay.textContent = totalReviews;
    averageRatingDisplay.textContent = averageRating;
    recommendPercentageDisplay.textContent = `${recommendPercentage}%`;
    
    // Update star display
    averageStarsDisplay.innerHTML = generateStarHTML(parseFloat(averageRating));
}

/**
 * Generates star HTML for rating display
 * @param {number} rating - Rating value
 * @returns {string} - HTML string for stars
 */
function generateStarHTML(rating) {
    let starsHTML = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '★';
    }
    
    if (hasHalfStar) {
        starsHTML += '★';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '☆';
    }
    
    return starsHTML;
}

// ==================== REVIEWS DISPLAY ====================

/**
 * Displays all reviews based on current sort order
 */
function displayReviews() {
    if (reviews.length === 0) {
        reviewsList.innerHTML = '<p class="no-reviews">No reviews yet. Be the first to review this product!</p>';
        return;
    }
    
    const sortedReviews = getSortedReviews();
    
    reviewsList.innerHTML = sortedReviews.map(review => createReviewCard(review)).join('');
    
    // Add event listeners to helpful buttons
    document.querySelectorAll('.helpful-button').forEach(button => {
        button.addEventListener('click', handleHelpfulClick);
    });
}

/**
 * Gets reviews sorted by current selection
 * @returns {Array} - Sorted reviews array
 */
function getSortedReviews() {
    const sortValue = sortReviewsSelect.value;
    const sortedReviews = [...reviews];
    
    if (sortValue === 'newest') {
        sortedReviews.sort((a, b) => b.date - a.date);
    } else if (sortValue === 'highest') {
        sortedReviews.sort((a, b) => b.rating - a.rating);
    }
    
    return sortedReviews;
}

/**
 * Creates HTML for a single review card
 * @param {object} review - Review object
 * @returns {string} - HTML string for review card
 */
function createReviewCard(review) {
    const dateString = formatDate(review.date);
    const starsHTML = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
    
    const recommendHTML = review.recommend !== null 
        ? `<div class="review-recommendation ${review.recommend ? '' : 'not-recommend'}">
               ${review.recommend ? 'Recommends this product' : 'Does not recommend'}
           </div>`
        : '';
    
    return `
        <div class="review-card">
            <div class="review-header">
                <div class="review-author-info">
                    <div class="review-author">${escapeHTML(review.name)}</div>
                    <div class="review-date">${dateString}</div>
                </div>
                <div class="review-rating">
                    <span class="review-stars">${starsHTML}</span>
                    <span>${review.rating}/5</span>
                </div>
            </div>
            <h3 class="review-title">${escapeHTML(review.title)}</h3>
            <p class="review-description">${escapeHTML(review.description)}</p>
            <div class="review-footer">
                ${recommendHTML}
                <button class="helpful-button ${review.helpfulVoted ? 'voted' : ''}" data-review-id="${review.id}">
                    👍 Helpful (${review.helpfulCount})
                </button>
            </div>
        </div>
    `;
}

/**
 * Formats date for display
 * @param {Date} date - Date object
 * @returns {string} - Formatted date string
 */
function formatDate(date) {
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return date.toLocaleDateString('en-US', options);
}

/**
 * Escapes HTML special characters to prevent XSS
 * @param {string} text - Text to escape
 * @returns {string} - Escaped text
 */
function escapeHTML(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Handles helpful button click
 */
function handleHelpfulClick(e) {
    const button = e.currentTarget;
    const reviewId = parseInt(button.getAttribute('data-review-id'));
    const review = reviews.find(r => r.id === reviewId);
    
    if (review && !review.helpfulVoted) {
        review.helpfulCount++;
        review.helpfulVoted = true;
        displayReviews();
    }
}

// ==================== SORT FUNCTIONALITY ====================

/**
 * Handles sort selection change
 */
sortReviewsSelect.addEventListener('change', () => {
    displayReviews();
});

// ==================== INITIALIZATION ====================

/**
 * Initialize the page
 */
document.addEventListener('DOMContentLoaded', () => {
    updateStatistics();
    displayReviews();
});
