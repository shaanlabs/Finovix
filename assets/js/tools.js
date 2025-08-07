// Loan/EMI Calculator Logic
function formatCurrency(val) {
  return '$' + Number(val).toLocaleString();
}

function calculateEMI(P, r, n) {
  // P = principal, r = monthly rate, n = months
  r = r / (12 * 100);
  const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  return emi;
}

function updateEMICalculator() {
  const amount = Number(document.getElementById('loanAmount').value);
  const rate = Number(document.getElementById('interestRate').value);
  const years = Number(document.getElementById('loanTenure').value);
  const months = years * 12;
  const emi = calculateEMI(amount, rate, months);
  const total = emi * months;
  const interest = total - amount;

  // Animate results
  anime({
    targets: '#emiResult',
    innerHTML: [Number(document.getElementById('emiResult').textContent.replace(/[^\d.]/g, '')), emi],
    duration: 700,
    easing: 'easeOutExpo',
    round: 1,
    update: function(anim) {
      document.getElementById('emiResult').textContent = formatCurrency(anim.animations[0].currentValue);
    }
  });
  anime({
    targets: '#interestResult',
    innerHTML: [Number(document.getElementById('interestResult').textContent.replace(/[^\d.]/g, '')), interest],
    duration: 700,
    easing: 'easeOutExpo',
    round: 1,
    update: function(anim) {
      document.getElementById('interestResult').textContent = formatCurrency(anim.animations[0].currentValue);
    }
  });
  anime({
    targets: '#totalResult',
    innerHTML: [Number(document.getElementById('totalResult').textContent.replace(/[^\d.]/g, '')), total],
    duration: 700,
    easing: 'easeOutExpo',
    round: 1,
    update: function(anim) {
      document.getElementById('totalResult').textContent = formatCurrency(anim.animations[0].currentValue);
    }
  });
}

function updateSliderLabels() {
  document.getElementById('loanAmountValue').textContent = formatCurrency(document.getElementById('loanAmount').value);
  document.getElementById('interestRateValue').textContent = document.getElementById('interestRate').value + '%';
  document.getElementById('loanTenureValue').textContent = document.getElementById('loanTenure').value + ' years';
}

document.addEventListener('DOMContentLoaded', function() {
  // EMI Calculator
  if (document.getElementById('emiForm')) {
    updateSliderLabels();
    updateEMICalculator();
    ['loanAmount', 'interestRate', 'loanTenure'].forEach(id => {
      document.getElementById(id).addEventListener('input', function() {
        updateSliderLabels();
        updateEMICalculator();
      });
    });
  }

  // Animate savings progress bars
  document.querySelectorAll('.goal-progress-fill').forEach(bar => {
    const width = bar.style.width;
    bar.style.width = '0%';
    anime({
      targets: bar,
      width: [0, width],
      duration: 1200,
      easing: 'easeOutExpo',
      delay: 300
    });
  });
}); 