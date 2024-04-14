document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('tax-form');
    const modal = document.getElementById('tax-modal');
    const closeButton = document.getElementsByClassName('close-button')[0];
  
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      let hasError = false;
  
      const grossIncome = parseFloat(document.getElementById('gross-income').value);
      const extraIncome = parseFloat(document.getElementById('extra-income').value);
      const deductions = parseFloat(document.getElementById('deductions').value);
      const ageSelect = document.getElementById('age');
      const selectedAge = ageSelect.value;
  
      if (isNaN(grossIncome) || grossIncome < 0) {
        document.getElementById('gross-income-error').style.display = 'inline-block';
        hasError = true;
      } else {
        document.getElementById('gross-income-error').style.display = 'none';
      }
  
      if (isNaN(extraIncome) || extraIncome < 0) {
        document.getElementById('extra-income-error').style.display = 'inline-block';
        hasError = true;
      } else {
        document.getElementById('extra-income-error').style.display = 'none';
      }
  
      if (isNaN(deductions) || deductions < 0) {
        document.getElementById('deductions-error').style.display = 'inline-block';
        hasError = true;
      } else {
        document.getElementById('deductions-error').style.display = 'none';
      }
  
      if (selectedAge === '') {
        document.getElementById('age-error').style.display = 'inline-block';
        hasError = true;
      } else {
        document.getElementById('age-error').style.display = 'none';
      }
  
      if (!hasError) {
        const totalIncome = grossIncome + extraIncome - deductions;
        let taxRate = 0;
        let taxAmount = 0;
  
        if (totalIncome <= 800000) {
          taxAmount = 0;
        } else {
          const taxableIncome = totalIncome - 800000;
          switch (selectedAge) {
            case 'under-40':
              taxRate = 0.3;
              break;
            case '40-60':
              taxRate = 0.4;
              break;
            case 'over-60':
              taxRate = 0.1;
              break;
          }
          taxAmount = taxableIncome * taxRate;
        }
  
        document.getElementById('tax-amount').textContent = `₹${taxAmount.toFixed(2)}`;
        modal.style.display = 'block';
      }
    });
  
    closeButton.addEventListener('click', function() {
      modal.style.display = 'none';
    });
  
    window.addEventListener('click', function(event) {
      if (event.target == modal) {
        modal.style.display = 'none';
      }
    });
  });