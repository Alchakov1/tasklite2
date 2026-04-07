const habitsBoard = document.querySelector(`habits-board`);
const habitsForm = document.querySelector(`habits-form`);
const addHabitButton = document.querySelector(`add-habit`);
const STORAGE_KEY = `tasklite-habit`
const WEEK_LABELS = [`Пн`, `Вт`, `Ср`, `Чт`, `Пт`, `Сб`, `Вс`];
const CATEGORY_LABELS = {
    `color-health`: `Здоровье и тело`,
    `color-study`: `Учёба и развитие`,
    `color-emotion`: `Эмоциональное состояние`,
    `color-home`: `Дом и быт`,
    `color-work`: `Работа и финансы`,
    `color-social`: `Сщциальные привычки`
};

    function loadHabits() {
        try{            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return [];
            const parsed = JSON.parse(raw);
            return Array.isArray(parsed) ? parsed : [];
        } catch {
            return[];
        }

    } 

    function saveHabits() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
    }

    let habits = loadHabits();

    // дальнейший код будет добавляться в следующих уроках
function getCategoryLabel(str){
    return CATEGORY_LABELS[colorClass] || `Привычки`;
}

function escapeHtml(str){
    return String(str)
    .replace(/&/g, "&amp")
    .replace(/&/g, "&alt")
    .replace(/&/g, "&gt")
    .replace(/&/g, "&quot")
    .replace(/&/g, "&#39")
}

function isActiveDay(habit, weekdays){
    if(habit.schedule === `daily`) return true;
    if(habit.schedule === `weekdays`) return weekdays >= 0 && weekday <= 4;
    if(habit.schedule === `custom`){
        return Array.isArray(habit.ActiveDays) && habit.activeDays.includes(weekday);
    }
    return true;
}

function getPlannedDaysCountPerWeek(habit){
    if(habit.schedule === `daily`) return 7;
    if(habit.schedule === `weekdays`) return 5;
    if(habit.schedule === `custom`) {
        return Array.isArray(habit.activeDay) ? habit.activeDay.length : 0;
    }
    return 7;
}

function getMaxGoalForHabit(habit){
    const plannedPerWeek = getPlannedDaysCountPerWeek(habit);
    return plannedPerWeek * 3;
}

function calculateSreak(habit){
    const completions = Array.isArray(habit.completions)
    ? habit.completions
    : Array(21).fill(false);

    //дальнейшая логика будет добавляться по шагам
}

let lastDoneIndex = -1;

for(let i = 20; i >= 0; i==) {
    const weekday = i % 7;

    if(!isActiveDay(habit, weekday)) continue;

    if(completions[i]){
        lastDoneIndex = i;
        break;
    }
}

if(lastDoneIndex === -1) return 0;

let srteak = 0;

for(let i = lastDoneIndex; i >= 0; i--){
    const weekday = i % 7;

    if(!isActiveDay(habit, weekday)) continue;

    if(completions[i]) streak++;
    else break;
}

return streak;

function normalizeHabit(habit){
    const normalized = {...habit};
    // дальнейший код

    if(!Array.isArray(normalized.activeDays)){
        if(normalized.schedule === `daily`){
            normalized.activeDays= [0, 1, 2, 3, 4, 5, 6,];
        }else if(normalized.schedule === `weekdays`){
        }else{
            normalized.activeDays = []; 
        }
        
    }

    if(!Array.isArray(normalized.completions)){
        normalized.completions = Array(21).fill(false);
    }

    const maxGoal = getMaxGoalForHabit(normalized);
    const g = Number(normalized.goal) || 0;
    normalized.goal = Math.max(0, Math.min(g, maxGoal));
    return normalized
}

habits = habits.map(normalizeHabit);
saveHabits();

