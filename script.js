document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Countdown Timer logic: Count down to 00:00 (midnight) of the current day
    const updateTimers = () => {
        const now = new Date();
        const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
        
        let totalSeconds = Math.floor((endOfDay - now) / 1000);
        if (totalSeconds < 0) totalSeconds = 0;

        const h = Math.floor(totalSeconds / 3600);
        const m = Math.floor((totalSeconds % 3600) / 60);
        const s = totalSeconds % 60;

        const hoursStr = h < 10 ? '0' + h : h;
        const minutesStr = m < 10 ? '0' + m : m;
        const secondsStr = s < 10 ? '0' + s : s;

        // Update all timer instances on the page
        document.querySelectorAll('.timer_container').forEach(container => {
            const hEl = container.querySelector('.hours');
            const mEl = container.querySelector('.minutes');
            const sEl = container.querySelector('.seconds');

            if (hEl) hEl.textContent = hoursStr;
            if (mEl) mEl.textContent = minutesStr;
            if (sEl) sEl.textContent = secondsStr;
        });
    };

    updateTimers();
    setInterval(updateTimers, 1000);

    // Form submission natively with hidden iframe to bypass redirect
    const orderForm = document.getElementById('order_form');
    const hiddenIframe = document.getElementById('hidden_iframe');
    let isSubmitting = false;

    if (orderForm && hiddenIframe) {
        // Слушаем загрузку iframe (ответ от сервера FormSubmit)
        hiddenIframe.onload = function() {
            if (isSubmitting) {
                window.location.href = 'success.html';
            }
        };

        orderForm.addEventListener('submit', function(event) {
            const formData = {
                name: document.querySelector('input[name="name"]').value.trim(),
                phone: document.querySelector('input[name="phone"]').value.trim()
            };

            const validationRules = {
                name: {
                    required: false,
                    pattern: /^[a-zA-Zа-яА-ЯёЁ\s]*$/ 
                },
                phone: {
                    required: true,
                    minLength: 9,
                    maxLength: 28,
                    pattern: /^[\d+\-\s()]+$/
                }
            };

            let isValid = true;

            if (!formData.phone) {
                alert('Пожалуйста, введите номер телефона');
                isValid = false;
            } else if (formData.phone.length < validationRules.phone.minLength) {
                alert(`Номер должен содержать не менее ${validationRules.phone.minLength} символов`);
                isValid = false;
            } else if (formData.phone.length > validationRules.phone.maxLength) {
                alert(`Номер не должен превышать ${validationRules.phone.maxLength} символов`);
                isValid = false;
            } else if (!validationRules.phone.pattern.test(formData.phone)) {
                alert('Номер телефона введен неверно. Допускаются только цифры, плюсы, минусы и скобки.');
                isValid = false;
            }

            if (isValid && formData.name) {
                if (!validationRules.name.pattern.test(formData.name)) {
                    alert('Имя должно содержать только буквы.');
                    isValid = false;
                }
            }

            if (!isValid) {
                // Если не валидно, запрещаем отправку
                event.preventDefault();
                return;
            }

            // Если все хорошо, разрешаем браузеру отправить форму в iframe
            isSubmitting = true;
            const submitBtn = orderForm.querySelector('.submit_btn');
            submitBtn.textContent = 'Отправка...';
            // Form is automatically submitted to target="hidden_iframe"
        });
    }
});
