// Static JSON data for FAQs and events
const faqData = [
    {
        id: 1,
        question: "How does DOM manipulation work in modern JavaScript?",
        answer: "DOM manipulation involves selecting HTML elements using methods like getElementById, querySelector, and querySelectorAll, then modifying their properties, attributes, or content. Modern JavaScript provides powerful APIs for creating dynamic, interactive web applications."
    },
    {
        id: 2,
        question: "What are the best practices for event handling?",
        answer: "Best practices include using event delegation for dynamic content, removing event listeners when no longer needed, using passive listeners for scroll events, and properly handling event propagation with stopPropagation() when necessary."
    },
    {
        id: 3,
        question: "How can interactivity enhance user experience?",
        answer: "Interactivity enhances UX through immediate feedback, smooth animations, intuitive navigation, responsive design, and progressive disclosure of information. It makes applications feel more engaging and professional."
    },
    {
        id: 4,
        question: "What is the difference between innerHTML and textContent?",
        answer: "innerHTML sets or gets the HTML content inside an element, including HTML tags, while textContent sets or gets only the text content, ignoring HTML tags. textContent is safer for user-generated content as it prevents XSS attacks."
    },
    {
        id: 5,
        question: "How do you handle asynchronous operations in DOM manipulation?",
        answer: "Use promises, async/await, or callbacks to handle asynchronous operations. Always ensure DOM elements exist before manipulating them, and consider using requestAnimationFrame for smooth animations."
    }
];

const eventData = [
    {
        type: 'success',
        message: 'Content loaded successfully! Dynamic components are ready.'
    },
    {
        type: 'warning',
        message: 'Please ensure all form fields are completed before submission.'
    },
    {
        type: 'error',
        message: 'Connection failed. Please check your network and try again.'
    },
    {
        type: 'info',
        message: 'New features available! Check out the updated dashboard.'
    }
];

const sliderData = [
    {
        title: "Welcome to Our Portal",
        description: "Discover amazing features and functionality",
        image: "https://via.placeholder.com/600x300/4CAF50/white?text=Slide+1"
    },
    {
        title: "Interactive Components",
        description: "Experience dynamic content at its best",
        image: "https://via.placeholder.com/600x300/2196F3/white?text=Slide+2"
    },
    {
        title: "Enhanced User Experience",
        description: "Smooth animations and responsive design",
        image: "https://via.placeholder.com/600x300/FF9800/white?text=Slide+3"
    }
];