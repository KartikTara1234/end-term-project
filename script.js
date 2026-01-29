let db = JSON.parse(localStorage.getItem('ZenHabit_Final')) || {};
let activeDate = formatDateLocal(new Date());
let viewMonth = new Date();

// Helper to format date correctly without UTC offset issues
function formatDateLocal(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}

// 1. FIXED BULK ADD LOGIC
document.getElementById('habit-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('habit-name').value;
    
    // Create dates manually to avoid timezone shifting
    const startParts = document.getElementById('start-date').value.split('-');
    const endParts = document.getElementById('end-date').value.split('-');
    
    let current = new Date(startParts[0], startParts[1]-1, startParts[2]);
    const end = new Date(endParts[0], endParts[1]-1, endParts[2]);

    while (current <= end) {
        let dateKey = formatDateLocal(current);
        if (!db[dateKey]) db[dateKey] = [];
        
        if (!db[dateKey].find(h => h.name === name)) {
            db[dateKey].push({ name: name, done: false });
        }
        current.setDate(current.getDate() + 1);
    }

    save();
    e.target.reset();
});

// 2. RENDER CALENDAR (DOM Manipulation)
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
        const dKey = formatDateLocal(dObj);
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
function save() { localStorage.setItem('ZenHabit_Final', JSON.stringify(db)); refresh(); }
function refresh() { renderCalendar(); renderHabits(); }

document.getElementById('prevMonth').onclick = () => { viewMonth.setMonth(viewMonth.getMonth()-1); refresh(); };
document.getElementById('nextMonth').onclick = () => { viewMonth.setMonth(viewMonth.getMonth()+1); refresh(); };

refresh();
