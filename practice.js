// Get the topic ID from URL parameters
const urlParams = new URLSearchParams(window.location.search);
const topicId = urlParams.get('topic');

// Find the topic object
const topicObj = window.TOPICS.find(t => t.id === topicId);
if (!topicObj) {
    alert('Topic not found! Going back to topics...');
    window.location.href = 'index.html';
}

// Set the topic title
document.getElementById('topicTitle').textContent = `${topicObj.emoji} ${topicObj.name}`;

// Get the slang words for this topic
const cards = window.SLANG[topicId] || [];
let current = 0;
let flipped = false;
let known = 0;
let unknown = 0;

const flashcard = document.getElementById('flashcard');
const front = document.getElementById('card-front');
const back = document.getElementById('card-back');
const controls = document.getElementById('controls');
const progress = document.getElementById('progress');

function showCard() {
    if (cards.length === 0) {
        front.textContent = 'No cards yet!';
        back.textContent = 'Check another topic';
        progress.textContent = 'No cards available';
        return;
    }
    flipped = false;
    flashcard.classList.remove('flipped');
    front.textContent = cards[current].french;
    back.textContent = cards[current].english;
    controls.style.display = 'none';
    updateProgress();
}

function updateProgress() {
    progress.textContent = `Card ${current + 1} of ${cards.length} • Knew: ${known} | Didn't Know: ${unknown}`;
}

function handleCardFlip() {
    if (!flipped && cards.length > 0) {
        flashcard.classList.add('flipped');
        flipped = true;
        controls.style.display = 'flex';
    }
}

function nextCard() {
    if (current + 1 >= cards.length) {
        const retry = confirm(`Topic complete!\nKnew: ${known}\nDidn't Know: ${unknown}\n\nTry again?`);
        if (retry) {
            current = 0;
            known = 0;
            unknown = 0;
        } else {
            window.location.href = 'index.html';
            return;
        }
    } else {
        current++;
    }
    showCard();
}

// Event Listeners
flashcard.addEventListener('click', handleCardFlip);
flashcard.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        handleCardFlip();
    }
});

document.getElementById('knew').addEventListener('click', (e) => {
    e.stopPropagation();
    known++;
    nextCard();
});

document.getElementById('didnt').addEventListener('click', (e) => {
    e.stopPropagation();
    unknown++;
    nextCard();
});

// Initialize
showCard();