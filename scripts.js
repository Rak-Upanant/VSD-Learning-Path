// --- DATABASE: รายชื่อบทเรียนทั้งหมด ---
// Each lesson also has a `level` field: which Specialist Roadmap level it maps to.
// This lets a lesson page show a "part of the roadmap" badge. resource-01 has no level.
const lessons = [
    { id: 'lesson-01', file: '01.html', title: 'What is VSD ?', module: 'Module 01: Introduction', level: 'L1' },
    { id: 'lesson-02', file: '02.html', title: 'Basic Component', module: 'Module 01: Introduction', level: 'L1' },
    { id: 'lesson-03', file: '03.html', title: 'Key Parameters', module: 'Module 01: Introduction', level: 'L1' },
    { id: 'lesson-04', file: '04.html', title: 'Nameplate', module: 'Module 01: Introduction', level: 'L1' },
    { id: 'lesson-05', file: '05.html', title: 'Case Study', module: 'Module 01: Introduction', level: 'L1' },
    { id: 'lesson-06', file: '06.html', title: 'Construction and Operation', module: 'Module 02: AC Motor Fundamentals', level: 'L2' },
    { id: 'lesson-07', file: '07.html', title: 'Torque-Speed', module: 'Module 02: AC Motor Fundamentals', level: 'L2' },
    { id: 'lesson-08', file: '08.html', title: 'Heating and Cooling', module: 'Module 02: AC Motor Fundamentals', level: 'L2' },
    { id: 'lesson-09', file: '09.html', title: 'V&f on Motor Performance', module: 'Module 02: AC Motor Fundamentals', level: 'L2' },
    { id: 'lesson-10', file: '10.html', title: 'Selecting the Motor', module: 'Module 02: AC Motor Fundamentals', level: 'L2' },
    { id: 'lesson-11', file: '11.html', title: 'Scalar Control', module: 'Module 03: Control & Operation', level: 'L1' },
    { id: 'lesson-12', file: '12.html', title: 'Vector Control', module: 'Module 03: Control & Operation', level: 'L1' },
    { id: 'lesson-13', file: '13.html', title: 'Direct Torque Control', module: 'Module 03: Control & Operation', level: 'L1' },
    { id: 'lesson-14', file: '14.html', title: 'Slip Compensation', module: 'Module 03: Control & Operation', level: 'L1' },
    { id: 'lesson-15', file: '15.html', title: 'Open VS Closed-Loop', module: 'Module 03: Control & Operation', level: 'L1' },
    { id: 'lesson-16', file: '16.html', title: 'VSD User Interface', module: 'Module 04: Parameter & Config', level: 'L3' },
    { id: 'lesson-17', file: '17.html', title: 'Set V/I/f', module: 'Module 04: Parameter & Config', level: 'L3' },
    { id: 'lesson-18', file: '18.html', title: 'Set Accel & Decel', module: 'Module 04: Parameter & Config', level: 'L3' },
    { id: 'lesson-19', file: '19.html', title: 'Protection Parameters', module: 'Module 04: Parameter & Config', level: 'L3' },
    { id: 'lesson-20', file: '20.html', title: 'Hands-on', module: 'Module 04: Parameter & Config', level: 'L3' },
    { id: 'lesson-21', file: '21.html', title: 'Pump', module: 'Module 05: Application & Benefits', level: 'L2' },
    { id: 'lesson-22', file: '22.html', title: 'Fan', module: 'Module 05: Application & Benefits', level: 'L2' },
    { id: 'lesson-23', file: '23.html', title: 'Conveyor', module: 'Module 05: Application & Benefits', level: 'L2' },
    { id: 'lesson-24', file: '24.html', title: 'Energy Saving', module: 'Module 05: Application & Benefits', level: 'L2' },
    { id: 'lesson-25', file: '25.html', title: 'VSD Application', module: 'Module 05: Application & Benefits', level: 'L2' },
    { id: 'lesson-26', file: '26.html', title: 'Faults & Alarms', module: 'Module 06: Troubleshooting & Maintenance', level: 'L9' },
    { id: 'lesson-27', file: '27.html', title: 'Using a Multimeter', module: 'Module 06: Troubleshooting & Maintenance', level: 'L13' },
    { id: 'lesson-28', file: '28.html', title: 'Check Input & Output V&I', module: 'Module 06: Troubleshooting & Maintenance', level: 'L9' },
    { id: 'lesson-29', file: '29.html', title: 'Problems Related to VSD', module: 'Module 06: Troubleshooting & Maintenance', level: 'L9' },
    { id: 'lesson-30', file: '30.html', title: 'Maintenance Procedures', module: 'Module 06: Troubleshooting & Maintenance', level: 'L10' },
    { id: 'resource-01', file: '#', title: 'Reference Docs & Links', module: 'Module 07: Resource Center' }
];

// Roadmap level titles, so a lesson page can show its level name
// WITHOUT loading the full roadmap data (roadmap.html keeps its own copy).
const ROADMAP_LEVELS = {
    L1: 'Drive System Basics',
    L2: 'Motor & Load Knowledge',
    L3: 'Single Drive System',
    L9: 'Troubleshooting',
    L10: 'Preventive & Predictive Maintenance',
    L13: 'Tools & Test Equipment'
};

// --- CONFIGURATION ---
const CONFIG = {
    homePage: 'index.html',
    // Each module card on the home page is built from this data.
    //   icon  = the emoji shown in the card header
    //   level = which roadmap level the card's "🗺️ Lx" tag links to (omit = no tag)
    // Module 07 (Resource Center) is special: it has external links (resources),
    // no roadmap tag, and no progress bar.
    modules: [
        { id: 'module-01', name: 'Module 01: Introduction',                    icon: '💡', level: 'L1' },
        { id: 'module-02', name: 'Module 02: AC Motor Fundamentals',           icon: '⚙️', level: 'L2' },
        { id: 'module-03', name: 'Module 03: Control & Operation',             icon: '🕹️', level: 'L1' },
        { id: 'module-04', name: 'Module 04: Parameter & Config',              icon: '🖥️', level: 'L3' },
        { id: 'module-05', name: 'Module 05: Application & Benefits',          icon: '🏭', level: 'L2' },
        { id: 'module-06', name: 'Module 06: Troubleshooting & Maintenance',   icon: '🔧', level: 'L9' },
        {
            id: 'module-07',
            name: 'Module 07: Resource Center',
            icon: '📚',
            // Resources: the internal Mindmap page plus external Google Drive docs.
            // `internal: true` items open in the same tab (no target="_blank").
            resources: [
                { title: '🧠 Mindmap — แผนผัง 16 ระดับ', url: 'mindmap.html', internal: true },
                { title: 'VSD Documentation', url: 'https://drive.google.com/drive/folders/1ZYRl4NX98prXOLIfT81KO_RmUFIP7uAT?usp=sharing' },
                { title: 'Technical Papers',  url: 'https://drive.google.com/drive/folders/1ZYRl4NX98prXOLIfT81KO_RmUFIP7uAT?usp=sharing' },
                { title: 'Video Library',     url: 'https://drive.google.com/drive/folders/1ZYRl4NX98prXOLIfT81KO_RmUFIP7uAT?usp=sharing' },
                { title: 'Tools & Downloads', url: 'https://drive.google.com/drive/folders/1ZYRl4NX98prXOLIfT81KO_RmUFIP7uAT?usp=sharing' }
            ]
        }
    ]
};

// Helper: List of modules to track progress for
const TRACKED_MODULES = CONFIG.modules
    .filter(m => m.id !== 'module-07') // Exclude Resource Center
    .map(m => m.name);

// --- PROGRESS TRACKING SYSTEM ---
class ProgressTracker {
    constructor() {
        this.userId = null;
        this.progress = {};
        this.progressRef = null; // keep a handle so we can stop the old listener
        firebase.auth().onAuthStateChanged(user => {
            const lessonContainer = document.querySelector('.vsd-learning-path:not(:has(.module-grid))');
            if (user) {
                this.userId = user.uid;
                this.loadProgress();
                updateQuizScores(user.uid);   // home page: show saved quiz %
            } else {
                // User signed out: stop listening to the previous user's data
                if (this.progressRef) {
                    this.progressRef.off();
                    this.progressRef = null;
                }
                this.userId = null;
                this.progress = {};
                updateHomePageLinks();
                updateProgressBar();
                updateAllModuleProgress();
                updateQuizScores(null);       // home page: clear saved quiz %
                if (lessonContainer) {
                    initializeLessonPage(lessonContainer);
                }
            }
        });
    }

    loadProgress() {
        if (!this.userId) return;
        // Detach any previous listener first so updates don't fire multiple times
        if (this.progressRef) this.progressRef.off();
        this.progressRef = firebase.database().ref('progress/' + this.userId);

        this.progressRef.on('value', snapshot => {
            this.progress = snapshot.val() || {};
            updateHomePageLinks();
            updateProgressBar();
            updateAllModuleProgress();

            const lessonContainer = document.querySelector('.vsd-learning-path:not(:has(.module-grid))');
            if (lessonContainer) {
                initializeLessonPage(lessonContainer);
            }
        });
    }

    saveProgress() {
        if (!this.userId) return;
        firebase.database().ref('progress/' + this.userId).set(this.progress);
    }

    markComplete(lessonId) {
        this.progress[lessonId] = true;
        this.saveProgress();
    }

    resetProgress(lessonId) {
        if (this.progress[lessonId]) {
            delete this.progress[lessonId];
            this.saveProgress();
        }
    }

    isComplete(lessonId) {
        return !!this.progress[lessonId];
    }

    getCompletionStats() {
        const trackedLessons = lessons.filter(l => TRACKED_MODULES.includes(l.module));
        const completedCount = trackedLessons.filter(l => this.isComplete(l.id)).length;
        const totalLessons = trackedLessons.length;
        const percentage = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
        return { completedCount, totalLessons, percentage };
    }

    getModuleProgress(moduleName) {
        const moduleLessons = lessons.filter(l => l.module === moduleName);
        if (moduleLessons.length === 0) return { completedCount: 0, totalLessons: 0, percentage: 0 };
        const completedCount = moduleLessons.filter(l => this.isComplete(l.id)).length;
        const totalLessons = moduleLessons.length;
        const percentage = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
        return { completedCount, totalLessons, percentage };
    }
}

// --- NAVIGATION SYSTEM ---
class LessonNavigator {
    constructor() {
        this.lessons = lessons;
    }

    getCurrentLessonIndex() {
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        return this.lessons.findIndex(lesson => lesson.file === currentPath);
    }

    getNavigationInfo() {
        const currentIndex = this.getCurrentLessonIndex();
        if (currentIndex === -1) return null;
        
        const prevLesson = currentIndex > 0 ? this.lessons[currentIndex - 1] : null;
        // Don't show next if current is the last lesson
        const nextLesson = currentIndex < this.lessons.length - 2 ? this.lessons[currentIndex + 1] : null;
        
        return { prev: prevLesson, next: nextLesson };
    }
}

// --- INITIALIZATION ---
const progressTracker = new ProgressTracker();
const lessonNavigator = new LessonNavigator();

// --- MAIN APPLICATION LOGIC ---
document.addEventListener('DOMContentLoaded', () => {
    const isHomePage = document.querySelector('.module-grid');
    const lessonContainer = document.querySelector('.vsd-learning-path:not(:has(.module-grid))');

    if (isHomePage) {
        initializeHomePage();
    } else if (lessonContainer) {
        initializeLessonPage(lessonContainer);
    }
});

function initializeHomePage() {
    // Build the module cards from data FIRST, so the progress functions below
    // (and the ProgressTracker's auth listener) have real DOM to update.
    renderModuleCards();
    updateHomePageLinks();
    updateProgressBar();
    updateAllModuleProgress();
}

// Build all module cards into the .module-grid container from CONFIG.modules + lessons[].
// This reproduces the exact markup that used to be hand-written in index.html,
// so the existing CSS styles every card identically. There is now ONE source of truth.
//
// Note on safety: every value here comes from our own static CONFIG/lessons data
// (no user input), so template strings are safe — this matches the roadmap's
// existing rendering style. The only "dynamic" text is lesson titles we wrote.
function renderModuleCards() {
    const grid = document.querySelector('.module-grid');
    if (!grid) return;

    // Helper: turn a lesson id like "lesson-07" into the number "07".
    const lessonNumber = (id) => id.replace('lesson-', '');

    // Build the HTML for one module card.
    const cardHTML = (module) => {
        const isResourceCenter = module.id === 'module-07';

        // --- Header: icon + title ---
        const header = `
                    <div class="module-header">
                        <span class="module-icon">${module.icon}</span>
                        <h3>${module.name}</h3>
                    </div>`;

        // --- Lesson list ---
        let listItems;
        if (isResourceCenter) {
            // Resource Center: external links that open in a new tab.
            listItems = module.resources.map(r =>
                `<li><a${r.internal ? ' class="resource-internal"' : ''} href="${r.url}"${r.internal ? '' : ' target="_blank"'}>${r.title}</a></li>`
            ).join('\n                        ');
        } else {
            // Normal module: one link per lesson belonging to this module.
            const moduleLessons = lessons.filter(l => l.module === module.name);
            listItems = moduleLessons.map(l => {
                const num = lessonNumber(l.id);
                return `<li><a href="${l.file}">Lesson ${num}: ${l.title}</a></li>`;
            }).join('\n                        ');
        }
        const lessonList = `
                    <ul class="lesson-list">
                        ${listItems}
                    </ul>`;

        // --- Progress bar (hidden for the Resource Center) ---
        const progressStyle = isResourceCenter ? ' style="display:none;"' : '';
        const progress = `
                    <div class="module-progress"${progressStyle}>
                        <div class="module-progress-bar">
                            <div class="module-progress-fill" style="width: 0%"></div>
                        </div>
                        <div class="module-progress-text">0% (0/0)</div>
                    </div>`;

        // --- Quiz button (modules 01–06 only; Resource Center has no quiz) ---
        // Links to the reusable quiz page, e.g. quiz.html?m=module-01.
        // The "<span class="module-quiz-score">" is filled in later with the
        // saved % once the logged-in user's scores load (updateQuizScores).
        // Hidden until the module is 100% complete (revealed by updateAllModuleProgress).
        const quizLink = isResourceCenter ? '' : `
                    <a class="module-quiz-link" href="quiz.html?m=${module.id}" style="display:none;">📝 ทำแบบทดสอบ<span class="module-quiz-score"></span></a>`;

        return `
                <div id="${module.id}" class="module-card">${header}${lessonList}${progress}${quizLink}
                </div>`;
    };

    // Join all cards and drop them into the grid in one write.
    grid.innerHTML = CONFIG.modules.map(cardHTML).join('\n');
}

function updateHomePageLinks() {
    document.querySelectorAll('.lesson-list a').forEach(link => {
        const linkFile = link.getAttribute('href');
        const lesson = lessons.find(l => l.file === linkFile);
        if (lesson && progressTracker.isComplete(lesson.id)) {
            link.classList.add('completed');
        } else {
            link.classList.remove('completed');
        }
    });
}

function updateProgressBar() {
    const stats = progressTracker.getCompletionStats();
    const progressBar = document.getElementById('progress-bar'); 
    const progressText = document.getElementById('progress-text');
    if (progressBar && progressText) {
        progressBar.style.width = `${stats.percentage}%`;
        progressText.textContent = `สำเร็จไปแล้ว ${stats.percentage}% (${stats.completedCount} จาก ${stats.totalLessons} บทเรียน)`;
    }
}

function updateAllModuleProgress() {
    CONFIG.modules.forEach(module => {
        const stats = progressTracker.getModuleProgress(module.name);
        const moduleCard = document.getElementById(module.id);
        if (!moduleCard) return;
        // Quiz button appears only once the whole module is complete (100%).
        const quizLink = moduleCard.querySelector('.module-quiz-link');
        if (quizLink) {
            quizLink.style.display = (stats.totalLessons > 0 && stats.percentage === 100) ? 'block' : 'none';
        }
        const progressContainer = moduleCard.querySelector('.module-progress');
        if (!progressContainer) return;
        if (module.id === 'module-07' || stats.totalLessons === 0) {
            progressContainer.style.display = 'none';
            return;
        }
        progressContainer.style.display = 'block';
        progressContainer.innerHTML = `
            <div class="module-progress-bar">
                <div class="module-progress-fill" style="width: ${stats.percentage}%"></div>
            </div>
            <div class="module-progress-text">${stats.percentage}% (${stats.completedCount}/${stats.totalLessons})</div>
        `;
    });
}

// Show the saved quiz score (%) on each module card's "ทำแบบทดสอบ" button.
// Reads quizScores/$uid ONCE when logged in; clears the text when logged out.
// `uid` is the user id string, or null when signed out.
function updateQuizScores(uid) {
    // Helper to write the % text (or clear it) on every module's quiz button.
    const setScores = (scores) => {
        document.querySelectorAll('.module-card').forEach(card => {
            const span = card.querySelector('.module-quiz-score');
            if (!span) return;                       // module-07 has no quiz button
            const saved = scores && scores[card.id]; // e.g. scores['module-01']
            span.textContent = saved ? `· ${saved.percent}%` : '';
        });
    };

    if (!uid) {
        setScores(null);                             // logged out: clear all
        return;
    }
    // Read this user's quiz scores once (not a live listener — a one-time read).
    firebase.database().ref('quizScores/' + uid).once('value')
        .then(snapshot => setScores(snapshot.val()))
        .catch(() => setScores(null));               // on error, just show no %
}

function initializeLessonPage(container) {
    const existingFooter = container.querySelector('.lesson-footer');
    if (existingFooter) existingFooter.remove();
    setupRoadmapBadge(container);
    setupLessonFooter(container);
}

// Show a small "part of the Roadmap" badge right under the lesson title.
// It links to the matching roadmap level (e.g. roadmap.html#L1).
function setupRoadmapBadge(container) {
    // Remove an old badge first so re-running this (e.g. after login) doesn't duplicate it.
    const existingBadge = container.querySelector('.lesson-roadmap-badge');
    if (existingBadge) existingBadge.remove();

    const currentIndex = lessonNavigator.getCurrentLessonIndex();
    if (currentIndex === -1) return;
    const currentLesson = lessons[currentIndex];

    // Skip lessons that have no roadmap level (e.g. the Resource Center).
    if (!currentLesson.level) return;
    const levelTitle = ROADMAP_LEVELS[currentLesson.level];
    if (!levelTitle) return;

    // Find the first <h2> (the lesson heading) so we can insert the badge after it.
    const heading = container.querySelector('h2');
    if (!heading) return;

    // Build the badge with createElement + textContent (XSS-safe).
    const badge = document.createElement('a');
    badge.className = 'lesson-roadmap-badge';
    badge.href = `roadmap.html#${currentLesson.level}`;
    badge.textContent = `🗺️ ส่วนหนึ่งของ Roadmap · ${currentLesson.level} — ${levelTitle}`;

    // Place the badge right after the lesson title.
    heading.insertAdjacentElement('afterend', badge);
}

function setupLessonFooter(container) {
    const navInfo = lessonNavigator.getNavigationInfo();
    const currentIndex = lessonNavigator.getCurrentLessonIndex();
    if (currentIndex === -1) return;
    const currentLesson = lessons[currentIndex];
    const isCompleted = progressTracker.isComplete(currentLesson.id);

    const footerDiv = document.createElement('div');
    footerDiv.className = 'lesson-footer';

    let navHTML = '<div class="lesson-nav">';
    navHTML += navInfo.prev 
        ? `<a href="${navInfo.prev.file}" class="nav-button nav-prev">⇦ ${navInfo.prev.title}</a>`
        : `<div></div>`;
    navHTML += `<a href="${CONFIG.homePage}" class="nav-button home-button">🏠 กลับหน้าแรก</a>`;
    navHTML += navInfo.next 
        ? `<a href="${navInfo.next.file}" class="nav-button nav-next">${navInfo.next.title} ⇨</a>`
        : `<div></div>`;
    navHTML += '</div>';
    footerDiv.innerHTML = navHTML;

    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-container';

    const completeButton = document.createElement('button');
    completeButton.id = 'mark-complete-btn';
    completeButton.textContent = isCompleted ? '✅ เรียนจบบทนี้แล้ว' : 'ทำเครื่องหมายว่าเรียนจบแล้ว';
    if (isCompleted) completeButton.classList.add('completed');

    let resetButton = null;
    if (progressTracker.userId) {
        resetButton = document.createElement('button');
        resetButton.id = 'reset-progress-btn';
        resetButton.textContent = '🔄 รีเซ็ตบทเรียนนี้';
        resetButton.style.display = isCompleted ? 'inline-block' : 'none';
    }

    completeButton.addEventListener('click', () => {
        if (!progressTracker.userId) {
            showNotification('กรุณาเข้าสู่ระบบ Google ก่อนบันทึกความคืบหน้า');
            return;
        }
        if (!progressTracker.isComplete(currentLesson.id)) {
            progressTracker.markComplete(currentLesson.id);
            completeButton.textContent = '✅ เรียนจบบทนี้แล้ว';
            completeButton.classList.add('completed');
            if (resetButton) resetButton.style.display = 'inline-block';
            showNotification('บันทึกความคืบหน้าเรียบร้อย!');
        }
    });

    if (resetButton) {
        resetButton.addEventListener('click', () => {
            progressTracker.resetProgress(currentLesson.id);
            completeButton.textContent = 'ทำเครื่องหมายว่าเรียนจบแล้ว';
            completeButton.classList.remove('completed');
            resetButton.style.display = 'none';
            showNotification('รีเซ็ตบทเรียนเรียบร้อย!');
        });
    }

    buttonContainer.appendChild(completeButton);
    if (resetButton) buttonContainer.appendChild(resetButton);
    footerDiv.appendChild(buttonContainer);
    container.appendChild(footerDiv);
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.classList.add('show'), 10);
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (document.body.contains(notification)) document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// NOTE: the auth button/greeting (renderAuthUI) now lives in the shared auth.js file,
// which each page loads before scripts.js. Progress loading is still handled by the
// ProgressTracker's own auth listener (above) — that stays here.
