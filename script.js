let db = JSON.parse(localStorage.getItem('AAGGEEE')) || {};
let activeDate = new Date().toISOString().split('T')[0];
let viewMonth = new Date();

// 1. BULK ADD LOGIC
document.getElementById('habit-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('habit-name').value;
    const start = new Date(document.getElementById('start-date').value);
    const end = new Date(document.getElementById('end-date').value);

    // Loop through every day in range
    let current = new Date(start);
    while (current <= end) {
        let dateKey = current.toISOString().split('T')[0];
        if (!db[dateKey]) db[dateKey] = [];
        
        // Prevent duplicates
        if (!db[dateKey].find(h => h.name === name)) {
            db[dateKey].push({ name: name, done: false });
        }
        current.setDate(current.getDate() + 1);
    }

    save();
    e.target.reset();
    alert("Habit added to all days in range!");
});

// 2. RENDER CALENDAR
function renderCalendar() {
    const grid = document.getElementById('calendarGrid');
    grid.innerHTML = '';
    const y = viewMonth.getFullYear();
    const m = viewMonth.getMonth();
    
    document.getElementById('monthLabel').innerText = 
        new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(viewMonth);

    const first = new Date(y, m, 1).getDay();
    const days = new Date(y, m + 1, 0).getDate();

    for (let i = 0; i < first; i++) grid.appendChild(document.createElement('div'));

    for (let d = 1; d <= days; d++) {
        const dObj = new Date(y, m, d);
        const dKey = dObj.toISOString().split('T')[0];
        const cell = document.createElement('div');
        cell.className = `day ${dKey === activeDate ? 'selected' : ''}`;
        cell.innerText = d;
        cell.onclick = () => { activeDate = dKey; refresh(); };
        grid.appendChild(cell);
    }
}

// 3. RENDER HABITS
function renderHabits() {
    const list = document.getElementById('habit-list');
    list.innerHTML = '';
    document.getElementById('view-date-label').innerText = `Tasks for: ${activeDate}`;
    
    const habits = db[activeDate] || [];
    let done = 0;

    habits.forEach((h, i) => {
        const div = document.createElement('div');
        div.className = `habit-item ${h.done ? 'done' : ''}`;
        div.innerHTML = `
            <span>${h.name}</span>
            <button onclick="toggle(${i})">${h.done ? 'Undo' : 'Done'}</button>
        `;
        list.appendChild(div);
        if (h.done) done++;
    });
    
    document.getElementById('stat-percent').innerText = 
        habits.length ? Math.round((done/habits.length)*100) + '%' : '0%';
}

window.toggle = (i) => { db[activeDate][i].done = !db[activeDate][i].done; save(); };
function save() { localStorage.setItem('AAGGEEE', JSON.stringify(db)); refresh(); }
function refresh() { renderCalendar(); renderHabits(); }

document.getElementById('prevMonth').onclick = () => { viewMonth.setMonth(viewMonth.getMonth()-1); refresh(); };
document.getElementById('nextMonth').onclick = () => { viewMonth.setMonth(viewMonth.getMonth()+1); refresh(); };

refresh();