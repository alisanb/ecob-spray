document.getElementById('order_form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the default form submission

  // Define validation rules
  const validationRules = {
    name: {
      required: true,
      minLength: 2,
      maxLength: 50,
      pattern: /^[a-zA-Zа-яА-ЯёЁ ]+$/ // allow letters (Latin and Cyrillic) and spaces
    },
    phone: {
      required: true,
      minLength: 9,
      maxLength: 28,
      pattern: /^[\d+\-\s]+$/ // allow digits, spaces, plus and minus
    }
  };

  // Get form data
  const formData = {
    name: document.querySelector('input[name="name"]').value,
    phone: document.querySelector('input[name="phone"]').value
  };

  // Validate form data
  let isValid = true;
  Object.keys(validationRules).forEach((field) => {
    const fieldValue = formData[field];
    const rule = validationRules[field];

    if (rule.required && !fieldValue) {
      alert(`Xahiş olunur ${field} əlavə edin`);
      isValid = false;
    } else if (fieldValue.length < rule.minLength) {
      alert(`Ən azı ${rule.minLength} simvol olmalıdır`);
      isValid = false;
    } else if (fieldValue.length > rule.maxLength) {
      alert(`Ən çox ${rule.maxLength} simvol olmalıdır`);
      isValid = false;
    } else if (!rule.pattern.test(fieldValue)) {
      alert(`${field} düzgün yığılmayıb. Xahiş olunur nümrəni sadəcə rəqəmlərdən, adınızı sadəcə hərflərdən yazasınız.`);
      isValid = false;
    }
  });

  // If form is valid, send email
  if (isValid) {
    // Prepare template parameters
    const templateParams = {
      name: formData.name,
      phone: formData.phone
    };

    // Send email using EmailJS
    emailjs.send('service_b637t9b', 'template_sk6mwbq', templateParams)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        alert('Sifarişiniz qeydə alındı. Sizinlə əlaqə qurulacaq. Bizi seçdiyiniz üçün minnətdarıq');
      }, (error) => {
        console.error('Failed to send email:', error);
        alert('Ups! Saytımızda səhvlik var! Bununla bağlı tədbir görəcəyik');
      });
  }
});
