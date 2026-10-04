// Portfolio Assets Management
// This file centralizes all images, PDFs, and data lists for the portfolio.

// Import local assets here (when available)
import profile_img from './sou.png';
import resume_pdf from './SOUGATA_MANNA_CV.pdf';
import Quiz_img from './Quiz.png';
import Food_img from './food.png';
import Portfolio_img from './fro.png';

export const assets = {
    profile: profile_img,
    resume: resume_pdf,
    projects: {
        ecommerce: Quiz_img,
        taskManager: Food_img,
        portfolio: Portfolio_img,
    }
}

// Roles for the Hero section typing effect
export const roles_list = [
    "BCA Student",
    "Full Stack Developer",
    "Frontend Engineer",
    "UI/UX Enthusiast",
    "Backend Developer",
    "React Specialist"
];

export const projects_list = [
    {
        name: 'QuizzyPro Ai',
        title: 'QuizzyPro Ai - AI-Powered Quiz App',
        description: 'Full-stack AI-Powered Quiz App with authentication, dynamic quizzes, and real-time feedback. Built with React, Node.js, Express, and MongoDB. ',
        techStack: ['React', 'Node.js', 'Express', 'MongoDB'],
        github: 'https://github.com/codewithsougata/Quiz_App',
        live: 'https://ai-quiz-generator-khaki-xi.vercel.app/',
        color: 'var(--cyan)',
        image: assets.projects.ecommerce,
    },
    {
        name: 'FoodyFly',
        title: 'FoodyFly - Food Delivery App',
        description: 'Responsive food delivery app with real-time order tracking, restaurant browsing, and seamless checkout experience. Intuitive UI/UX design.',
        techStack: ['React', 'MongoDB', 'CSS', 'Node.js', 'Express'],
        github: 'https://github.com/codewithsougata/Food_App',
        live: '#',
        color: '#a78bfa',
        image: assets.projects.taskManager,
    },
    {
        name: 'portfolio-v2',
        title: 'Portfolio Website',
        description: 'Modern developer portfolio with immersive 3D animations, sleek card layouts, and responsive design natively built.',
        techStack: ['React', 'Framer Motion', 'Tailwind CSS'],
        github: 'https://github.com/codewithsougata/Portfolio',
        live: '#',
        color: 'var(--green)',
        image: assets.projects.portfolio,
    },
];
