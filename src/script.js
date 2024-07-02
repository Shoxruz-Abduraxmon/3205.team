document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('searchForm');
    const resultsDiv = document.getElementById('results');
    const loadingDiv = document.getElementById('loading');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        resultsDiv.innerHTML = '';
        loadingDiv.style.display = 'block';

        const email = form.email.value;
        const number = form.number.value.replace(/-/g, '');

        try {
            const response = await axios.post('http://localhost:3000/search', { email, number });
            const users = response.data;

            if (users.length === 0) {
                resultsDiv.textContent = 'Hech qanday foydalanuvchi topilmadi';
            } else {
                users.forEach(user => {
                    const userDiv = document.createElement('div');
                    userDiv.textContent = `${user.email} - ${user.number}`;
                    resultsDiv.appendChild(userDiv);
                });
            }
        } catch (error) {
            resultsDiv.textContent = 'Ma‘lumotlarni olishda xatolik yuz berdi';
        } finally {
            loadingDiv.style.display = 'none';
        }
    });

    const numberInput = document.getElementById('number');
    numberInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 6) value = value.slice(0, 6);
        e.target.value = value.match(/.{1,2}/g)?.join('-') || '';
    });
});
