const topics = window.TOPICS || [];
const topicGrid = document.getElementById('topicGrid');

topics.forEach(topic => {
  const card = document.createElement('div');
  card.className = 'topic-card';
  card.tabIndex = 0;
  card.setAttribute('role', 'button');
  card.setAttribute('aria-label', `Practice ${topic.name} slang`);
  card.innerHTML = `
    <span class="topic-emoji">${topic.emoji}</span>
    <div class="topic-title">${topic.name}</div>
    <div class="topic-desc">${topic.desc}</div>
  `;
  card.onclick = () => {
    window.location.href = `topic.html?topic=${encodeURIComponent(topic.id)}`;
  };
  card.onkeypress = (e) => {
    if (e.key === "Enter" || e.key === " ") card.onclick();
  };
  topicGrid.appendChild(card);
});