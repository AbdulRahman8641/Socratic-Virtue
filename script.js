// State management
let selectedMood = null;

// Philosophy insights database
const philosophyInsights = {
    1: {
        quote: "Life swings like a pendulum backward and forward between pain and boredom.",
        author: "Arthur Schopenhauer",
        reflection: "In moments of sadness, Schopenhauer reminds us that suffering is part of the human condition. How might acknowledging this truth help you find meaning even in difficult emotions?",
        photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Arthur_Schopenhauer_by_J_Sch%C3%A4fer%2C_1859b.jpg/330px-Arthur_Schopenhauer_by_J_Sch%C3%A4fer%2C_1859b.jpg"
    },
    2: {
        quote: "One day, in retrospect, the years of struggle will strike you as the most beautiful.",
        author: "Sigmund Freud",
        reflection: "Freud suggests that our struggles shape us. Consider how today's challenges might be transforming you in meaningful ways that you'll recognize in the future.",
        photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Sigmund_Freud%2C_by_Max_Halberstadt_%28cropped%29.jpg/330px-Sigmund_Freud%2C_by_Max_Halberstadt_%28cropped%29.jpg"
    },
    3: {
        quote: "He who has a why to live for can bear almost any how.",
        author: "Friedrich Nietzsche",
        reflection: "Nietzsche reminds us that purpose gives us strength. What meaning can you find in this neutral moment that might guide your actions?",
        photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Nietzsche187a.jpg/330px-Nietzsche187a.jpg"
    },
    4: {
        quote: "Without music, life would be a mistake.",
        author: "Friedrich Nietzsche",
        reflection: "In your happiness, Nietzsche would encourage you to embrace the aesthetic joys of life. What beauty can you create or appreciate in this positive state?",
        photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Nietzsche187a.jpg/330px-Nietzsche187a.jpg"
    },
    5: {
        quote: "Happiness is the feeling that power increases — that resistance is being overcome.",
        author: "Friedrich Nietzsche",
        reflection: "Your joy may come from overcoming challenges. Nietzsche would encourage you to recognize your strength and use this positive energy to tackle even greater heights.",
        photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Nietzsche187a.jpg/330px-Nietzsche187a.jpg"
    }
};

// Mock mood data for chart
const mockMoodData = [4, 3, 5, 2, 4, 3];

// Authentication functions
function toggleForm() {
    document.getElementById('loginForm').classList.toggle('hidden');
    document.getElementById('registerForm').classList.toggle('hidden');
}

function login() {
    document.getElementById('authScreen').classList.add('hidden');
    document.getElementById('dashboard').classList.remove('hidden');
    document.getElementById('userName').textContent = 'Demo User';
    
    // Initialize dashboard
    drawMoodChart();
}

function register() {
    const name = document.getElementById('regName').value;
    document.getElementById('authScreen').classList.add('hidden');
    document.getElementById('dashboard').classList.remove('hidden');
    document.getElementById('userName').textContent = name || 'New User';
    
    // Initialize dashboard
    drawMoodChart();
}

function logout() {
    document.getElementById('authScreen').classList.remove('hidden');
    document.getElementById('dashboard').classList.add('hidden');
    resetMoodTracker();
}

// Mood tracking functions
function selectMood(mood) {
    selectedMood = mood;
    
    document.querySelectorAll('.mood-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    document.querySelector(`[data-mood="${mood}"]`).classList.add('selected');
    document.getElementById('saveMoodBtn').disabled = false;
}

function saveMood() {
    if (!selectedMood) return;
    
    // Update today's mood in stats
    const emojiMap = { 1: '😢', 2: '😞', 3: '😐', 4: '😊', 5: '😄' };
    document.getElementById('todayMood').textContent = emojiMap[selectedMood];
    
    // Hide mood tracker, show status
    document.getElementById('moodTracker').classList.add('hidden');
    document.getElementById('moodStatus').classList.remove('hidden');
    document.getElementById('updateBtn').classList.remove('hidden');

    // Update status emoji
    const emojiMap = { 1: '😢', 2: '😞', 3: '😐', 4: '😊', 5: '😄' };
    document.getElementById('statusEmoji').textContent = emojiMap[selectedMood];

    // Show philosophy insight
    showPhilosophyInsight(selectedMood);

    // Update chart with new data point
    updateMoodChart(selectedMood);
}

function showMoodTracker() {
    document.getElementById('moodTracker').classList.remove('hidden');
    document.getElementById('moodStatus').classList.add('hidden');
    document.getElementById('updateBtn').classList.add('hidden');
}

function resetMoodTracker() {
    document.getElementById('moodTracker').classList.remove('hidden');
    document.getElementById('moodStatus').classList.add('hidden');
    document.getElementById('updateBtn').classList.add('hidden');
    
    document.querySelectorAll('.mood-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    document.getElementById('moodNote').value = '';
    document.getElementById('saveMoodBtn').disabled = true;
    document.getElementById('todayMood').textContent = 'Not Set';
    
    // Reset philosophy content
    document.getElementById('philosophyContent').innerHTML = `
        <p style="color: #666; text-align: center; padding: 40px 20px;">
            Complete your mood check-in to receive a personalized philosophical insight.
        </p>
    `;
}

// Philosophy insight function
function showPhilosophyInsight(mood) {
    const insight = philosophyInsights[mood];
    
    document.getElementById('philosophyContent').innerHTML = `
        <div class="philosophy-insight">
            <div class="philosopher-container">
                <img src="${insight.photo}" alt="${insight.author}" class="philosopher-photo">
                <div class="philosopher-info">
                    <div class="quote">"${insight.quote}"</div>
                    <div class="author">— ${insight.author}</div>
                </div>
            </div>
            <div class="reflection">${insight.reflection}</div>
        </div>
    `;
}

// Chart functions
function drawMoodChart() {
    const canvas = document.getElementById('moodChart');
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Chart settings
    const padding = 40;
    const chartWidth = canvas.width - 2 * padding;
    const chartHeight = canvas.height - 2 * padding;
    const pointSpacing = chartWidth / (mockMoodData.length - 1);
    
    // Draw axes
    ctx.strokeStyle = '#e1e5e9';
    ctx.lineWidth = 2;
    
    // Y-axis
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, canvas.height - padding);
    ctx.stroke();
    
    // X-axis
    ctx.beginPath();
    ctx.moveTo(padding, canvas.height - padding);
    ctx.lineTo(canvas.width - padding, canvas.height - padding);
    ctx.stroke();
    
    // Draw mood points and connecting lines
    ctx.strokeStyle = '#667eea';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    mockMoodData.forEach((mood, index) => {
        const x = padding + index * pointSpacing;
        const y = canvas.height - padding - (mood - 1) * (chartHeight / 4);
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
        
        // Draw point
        ctx.fillStyle = '#764ba2';
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw day label
        ctx.fillStyle = '#666';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`Day ${index + 1}`, x, canvas.height - padding + 20);
    });
    
    ctx.stroke();
    
    // Draw mood level labels
    const moodLabels = ['Very Sad', 'Sad', 'Neutral', 'Happy', 'Very Happy'];
    
    moodLabels.forEach((label, index) => {
        const y = canvas.height - padding - index * (chartHeight / 4);
        
        ctx.fillStyle = '#666';
        ctx.font = '12px Arial';
        ctx.textAlign = 'right';
        ctx.fillText(label, padding - 10, y + 4);
        
        // Draw horizontal grid line
        ctx.strokeStyle = '#e1e5e9';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(canvas.width - padding, y);
        ctx.stroke();
    });
}

function updateMoodChart(newMood) {
    // In a real app, we would update the data array with the new mood
    // For this demo, we'll just redraw the chart
    drawMoodChart();
}

// Set initial focus on email input when page loads
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('email').focus();
});