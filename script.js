// Show/hide tips
function showTips(tipsId) {
    const tips = document.getElementById(tipsId);
    tips.style.display = tips.style.display === "block" ? "none" : "block";
}

// Modules list
const modules = ['phishing', 'passwords', 'scams'];

// Update progress bar
function updateProgressBar(currentModule) {
    let completed = JSON.parse(localStorage.getItem('completedModules') || "[]");
    if(!completed.includes(currentModule)) {
        completed.push(currentModule);
        localStorage.setItem('completedModules', JSON.stringify(completed));
    }
    const progressPercent = (completed.length / modules.length) * 100;
    const bar = document.getElementById('progressBar');
    if(bar) bar.style.width = progressPercent + '%';
}

// Quiz submission
function submitQuiz(formId, certificatePage, currentModule) {
    const form = document.getElementById(formId);
    const questions = form.querySelectorAll('.quiz-question');
    let score = 0;

    questions.forEach(q => {
        const selected = q.querySelector('input[type="radio"]:checked');
        const feedback = q.querySelector('.feedback');
        if(selected) {
            if(selected.value === "correct") {
                score++;
                feedback.textContent = "✅ Correct!";
                feedback.style.color = "green";
            } else {
                feedback.textContent = "❌ Wrong!";
                feedback.style.color = "red";
            }
        } else {
            feedback.textContent = "⚠️ No answer selected";
            feedback.style.color = "orange";
        }
    });

    // Mark module as completed
    updateProgressBar(currentModule);

    // Save score
    let totalScore = parseInt(localStorage.getItem('cyberScore') || 0);
    totalScore += score;
    localStorage.setItem('cyberScore', totalScore);

    setTimeout(() => {
        const completedModules = JSON.parse(localStorage.getItem('completedModules'));
        if(completedModules.length === modules.length) {
            window.location.href = certificatePage;
        } else {
            alert(`You scored ${score} in this module! Total Score: ${totalScore}`);
        }
    }, 500);
}

// Initialize progress bar on page load
window.addEventListener('load', () => {
    const currentPage = document.body.dataset.module || "home";
    updateProgressBar(currentPage);
});
