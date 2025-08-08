// AI Risk Assessment Tool
document.addEventListener('DOMContentLoaded', function() {
    const riskForm = document.getElementById('riskAssessmentForm');
    const riskResults = document.getElementById('riskResults');
    
    if (riskForm) {
        riskForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Collect form data
            const formData = {
                ageRange: document.getElementById('ageRange').value,
                timeHorizon: document.getElementById('timeHorizon').value,
                riskTolerance: document.getElementById('riskTolerance').value,
                savingsRate: document.getElementById('savingsRate').value,
                investmentGoal: document.getElementById('investmentGoal').value
            };
            
            // Validate all fields are filled
            if (!Object.values(formData).every(value => value)) {
                alert('Please fill in all fields to get your risk assessment.');
                return;
            }
            
            // Calculate risk score using AI algorithm
            const riskScore = calculateRiskScore(formData);
            const riskLevel = getRiskLevel(riskScore);
            
            // Display results with animation
            displayRiskResults(riskScore, riskLevel, formData);
        });
    }
    
    function calculateRiskScore(data) {
        let score = 0;
        
        // Age factor (0-20 points)
        const ageFactors = {
            '18-25': 20,
            '26-35': 18,
            '36-45': 15,
            '46-55': 12,
            '55+': 8
        };
        score += ageFactors[data.ageRange] || 0;
        
        // Time horizon factor (0-25 points)
        const timeFactors = {
            '1-3': 8,
            '3-5': 15,
            '5-10': 20,
            '10+': 25
        };
        score += timeFactors[data.timeHorizon] || 0;
        
        // Risk tolerance factor (0-25 points)
        const toleranceFactors = {
            'panic': 5,
            'concerned': 12,
            'neutral': 18,
            'opportunity': 25
        };
        score += toleranceFactors[data.riskTolerance] || 0;
        
        // Savings rate factor (0-15 points)
        const savingsFactors = {
            '0-5': 5,
            '5-10': 10,
            '10-20': 13,
            '20+': 15
        };
        score += savingsFactors[data.savingsRate] || 0;
        
        // Investment goal factor (0-15 points)
        const goalFactors = {
            'preservation': 5,
            'income': 10,
            'growth': 13,
            'aggressive': 15
        };
        score += goalFactors[data.investmentGoal] || 0;
        
        return Math.min(100, score);
    }
    
    function getRiskLevel(score) {
        if (score <= 30) return { level: 'Conservative', color: '#10b981', allocation: { stocks: 20, bonds: 60, cash: 20 } };
        if (score <= 50) return { level: 'Moderate Conservative', color: '#f59e0b', allocation: { stocks: 40, bonds: 50, cash: 10 } };
        if (score <= 70) return { level: 'Moderate', color: '#3b82f6', allocation: { stocks: 60, bonds: 30, cash: 10 } };
        if (score <= 85) return { level: 'Moderate Aggressive', color: '#8b5cf6', allocation: { stocks: 80, bonds: 15, cash: 5 } };
        return { level: 'Aggressive', color: '#ef4444', allocation: { stocks: 90, bonds: 8, cash: 2 } };
    }
    
    function displayRiskResults(score, riskLevel, formData) {
        // Show results section
        riskResults.style.display = 'block';
        
        // Animate risk score
        anime({
            targets: '#riskScore',
            innerHTML: [0, score],
            duration: 2000,
            easing: 'easeOutExpo',
            round: 1,
            update: function(anim) {
                document.getElementById('riskScore').textContent = anim.animations[0].currentValue;
            }
        });
        
        // Update risk level
        document.getElementById('riskLevel').textContent = riskLevel.level;
        document.getElementById('riskLevel').style.color = riskLevel.color;
        
        // Animate factor bars
        animateFactorBars(formData);
        
        // Generate AI recommendations
        generateAIRecommendations(score, riskLevel, formData);
        
        // Show portfolio allocation
        showPortfolioAllocation(riskLevel.allocation);
        
        // Scroll to results
        riskResults.scrollIntoView({ behavior: 'smooth' });
    }
    
    function animateFactorBars(formData) {
        const factors = {
            'ageFactor': getAgeFactorScore(formData.ageRange),
            'timeFactor': getTimeFactorScore(formData.timeHorizon),
            'toleranceFactor': getToleranceFactorScore(formData.riskTolerance),
            'savingsFactor': getSavingsFactorScore(formData.savingsRate),
            'goalFactor': getGoalFactorScore(formData.investmentGoal)
        };
        
        Object.keys(factors).forEach(factorId => {
            const factorBar = document.getElementById(factorId);
            if (factorBar) {
                anime({
                    targets: factorBar,
                    width: [0, factors[factorId] + '%'],
                    duration: 1500,
                    delay: 300,
                    easing: 'easeOutExpo'
                });
            }
        });
    }
    
    function getAgeFactorScore(age) {
        const scores = { '18-25': 80, '26-35': 75, '36-45': 65, '46-55': 55, '55+': 40 };
        return scores[age] || 0;
    }
    
    function getTimeFactorScore(time) {
        const scores = { '1-3': 30, '3-5': 50, '5-10': 70, '10+': 90 };
        return scores[time] || 0;
    }
    
    function getToleranceFactorScore(tolerance) {
        const scores = { 'panic': 20, 'concerned': 45, 'neutral': 70, 'opportunity': 95 };
        return scores[tolerance] || 0;
    }
    
    function getSavingsFactorScore(savings) {
        const scores = { '0-5': 25, '5-10': 50, '10-20': 75, '20+': 90 };
        return scores[savings] || 0;
    }
    
    function getGoalFactorScore(goal) {
        const scores = { 'preservation': 30, 'income': 55, 'growth': 75, 'aggressive': 90 };
        return scores[goal] || 0;
    }
    
    function generateAIRecommendations(score, riskLevel, formData) {
        const recommendationsList = document.getElementById('recommendationsList');
        const recommendations = [];
        
        // Generate personalized recommendations based on risk profile
        if (score <= 30) {
            recommendations.push(
                "Focus on capital preservation with high-quality bonds and dividend-paying stocks.",
                "Consider municipal bonds for tax advantages.",
                "Maintain a larger emergency fund (6-12 months of expenses)."
            );
        } else if (score <= 50) {
            recommendations.push(
                "Balance growth and income with a mix of blue-chip stocks and investment-grade bonds.",
                "Consider target-date funds for automatic rebalancing.",
                "Diversify across different sectors and geographies."
            );
        } else if (score <= 70) {
            recommendations.push(
                "Focus on growth-oriented investments with moderate risk exposure.",
                "Consider index funds for broad market exposure and lower costs.",
                "Rebalance portfolio quarterly to maintain target allocation."
            );
        } else {
            recommendations.push(
                "Embrace growth opportunities with higher-risk, higher-reward investments.",
                "Consider alternative investments like real estate or commodities.",
                "Monitor portfolio more frequently and be prepared for higher volatility."
            );
        }
        
        // Add age-specific recommendations
        if (formData.ageRange === '18-25' || formData.ageRange === '26-35') {
            recommendations.push("Take advantage of compound interest by starting early and investing regularly.");
        } else if (formData.ageRange === '55+') {
            recommendations.push("Consider shifting towards more conservative investments as you approach retirement.");
        }
        
        // Display recommendations with animation
        recommendationsList.innerHTML = '';
        recommendations.forEach((rec, index) => {
            const recElement = document.createElement('div');
            recElement.className = 'recommendation-item';
            recElement.innerHTML = `<i class="fas fa-check-circle"></i><span>${rec}</span>`;
            recommendationsList.appendChild(recElement);
            
            anime({
                targets: recElement,
                opacity: [0, 1],
                translateX: [20, 0],
                duration: 600,
                delay: index * 200,
                easing: 'easeOutExpo'
            });
        });
    }
    
    function showPortfolioAllocation(allocation) {
        const allocationChart = document.getElementById('allocationChart');
        const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
        
        allocationChart.innerHTML = '';
        
        Object.entries(allocation).forEach(([asset, percentage], index) => {
            const segment = document.createElement('div');
            segment.className = 'allocation-segment';
            segment.style.width = percentage + '%';
            segment.style.background = colors[index];
            segment.textContent = `${asset.charAt(0).toUpperCase() + asset.slice(1)} ${percentage}%`;
            allocationChart.appendChild(segment);
            
            anime({
                targets: segment,
                width: [0, percentage + '%'],
                duration: 1200,
                delay: index * 200,
                easing: 'easeOutExpo'
            });
        });
    }
}); 