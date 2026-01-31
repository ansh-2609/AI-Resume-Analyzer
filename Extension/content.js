// extension/content.js
// This runs on LinkedIn/Indeed pages

// Wait for page to load
setTimeout(() => {
    // Find job description on LinkedIn
    const jobDesc = document.querySelector('.description__text') || 
                    document.querySelector('.jobs-description__content');
    
    if (jobDesc) {
        // Add our button near the job title
        const applySection = document.querySelector('.jobs-apply-button') ||
                             document.querySelector('.apply-button');
        
        if (applySection) {
            const analyzeBtn = document.createElement('button');
            analyzeBtn.innerHTML = '🔍 AI Analyze Match';
            analyzeBtn.style.cssText = `
                background: linear-gradient(45deg, #2196F3, #21CBF3);
                color: white;
                border: none;
                padding: 10px 15px;
                border-radius: 5px;
                cursor: pointer;
                margin-left: 10px;
                font-weight: bold;
            `;
            
            analyzeBtn.onclick = async () => {
                const jobText = jobDesc.innerText;
                
                // Get user's resume ID from storage
                chrome.storage.sync.get(['resumeId'], async (result) => {
                    if (!result.resumeId) {
                        alert('Please upload your resume on the web app first!');
                        return;
                    }
                    
                    // Send to our backend
                    const response = await fetch('http://localhost:5000/api/analyze/match-job', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            resumeId: result.resumeId,
                            jobDescription: jobText.substring(0, 3000)
                        })
                    });
                    
                    const matchResult = await response.json();
                    
                    // Show results
                    alert(`Match Score: ${matchResult.score}%\n\nStrong Matches:\n${matchResult.strongMatches.join('\n')}`);
                });
            };
            
            applySection.parentNode.insertBefore(analyzeBtn, applySection.nextSibling);
        }
    }
}, 2000);