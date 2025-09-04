document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const languageSelect = document.getElementById('language-select');
    const weeklyCalendar = document.getElementById('weekly-calendar');
    const schedulingForm = document.getElementById('scheduling-form');
    const schedulingConfirmation = document.getElementById('scheduling-confirmation');
    const confirmationDetails = document.getElementById('confirmation-details');
    const schedulingHistory = document.getElementById('scheduling-history');

    // Função para alternar o tema
    function toggleTheme() {
        const body = document.body;
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        body.setAttribute('data-theme', newTheme);
    }

    // Função para mudar o idioma (exemplo)
    function changeLanguage(language) {
        // Implemente a lógica de tradução aqui
        console.log('Mudando para o idioma:', language);
    }

    // Função para gerar o calendário semanal
    function generateWeeklyCalendar() {
        const now = new Date();
        const dayOfWeek = now.getDay(); // 0 (Domingo) a 6 (Sábado)
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - dayOfWeek);

        let calendarHTML = '';
        const hours = Array.from({ length: 24 }, (_, i) => i); // Cria um array de 0 a 23

        hours.forEach(hour => {
            calendarHTML += `<div class="hour-row"><span>${hour}:00</span>`;
            for (let i = 0; i < 7; i++) {
                const date = new Date(startOfWeek);
                date.setDate(startOfWeek.getDate() + i);
                calendarHTML += `<div class="calendar-cell" data-date="${date.toISOString().slice(0, 10)}" data-hour="${hour}"></div>`;
            }
            calendarHTML += '</div>';
        });

        weeklyCalendar.innerHTML = calendarHTML;
    }

    // Função para lidar com o envio do formulário de agendamento
    function handleSchedulingFormSubmit(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const notes = document.getElementById('notes').value;

        const details = `Nome: ${name}, Data: ${date}, Hora: ${time}, Observações: ${notes}`;
        confirmationDetails.textContent = details;
        schedulingConfirmation.style.display = 'block';

        // Adiciona o agendamento ao histórico
        addSchedulingToHistory(details);
    }

    // Função para adicionar agendamentos ao histórico
    function addSchedulingToHistory(details) {
        const historyItem = document.createElement('p');
        historyItem.textContent = details;
        schedulingHistory.appendChild(historyItem);
    }

    // Event listeners
    themeToggle.addEventListener('click', toggleTheme);
    languageSelect.addEventListener('change', function() {
        changeLanguage(this.value);
    });
    schedulingForm.addEventListener('submit', handleSchedulingFormSubmit);

    // Inicialização
    generateWeeklyCalendar();
});