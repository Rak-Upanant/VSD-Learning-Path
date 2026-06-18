// --- DATABASE: รายชื่อบทเรียนทั้งหมด ---
const lessons = [
    { id: 'lesson-01', file: '01.html', title: 'What is VSD ?', module: 'Module 01: Introduction' },
    { id: 'lesson-02', file: '02.html', title: 'Basic Component', module: 'Module 01: Introduction' },
    { id: 'lesson-03', file: '03.html', title: 'Key Parameters', module: 'Module 01: Introduction' },
    { id: 'lesson-04', file: '04.html', title: 'Nameplate', module: 'Module 01: Introduction' },
    { id: 'lesson-05', file: '05.html', title: 'Case Study', module: 'Module 01: Introduction' },
    { id: 'lesson-06', file: '06.html', title: 'Construction and Operation', module: 'Module 02: AC Motor Fundamentals' },
    { id: 'lesson-07', file: '07.html', title: 'Torque-Speed', module: 'Module 02: AC Motor Fundamentals' },
    { id: 'lesson-08', file: '08.html', title: 'Heating and Cooling', module: 'Module 02: AC Motor Fundamentals' },
    { id: 'lesson-09', file: '09.html', title: 'V&f on Motor Performance', module: 'Module 02: AC Motor Fundamentals' },
    { id: 'lesson-10', file: '10.html', title: 'Selecting the Motor', module: 'Module 02: AC Motor Fundamentals' },
    { id: 'lesson-11', file: '11.html', title: 'Scalar Control', module: 'Module 03: Control & Operation' },
    { id: 'lesson-12', file: '12.html', title: 'Vector Control', module: 'Module 03: Control & Operation' },
    { id: 'lesson-13', file: '13.html', title: 'Direct Torque Control', module: 'Module 03: Control & Operation' },
    { id: 'lesson-14', file: '14.html', title: 'Slip Compensation', module: 'Module 03: Control & Operation' },
    { id: 'lesson-15', file: '15.html', title: 'Open VS Closed-Loop', module: 'Module 03: Control & Operation' },
    { id: 'lesson-16', file: '16.html', title: 'VSD User Interface', module: 'Module 04: Parameter & Config' },
    { id: 'lesson-17', file: '17.html', title: 'Set V/I/f', module: 'Module 04: Parameter & Config' },
    { id: 'lesson-18', file: '18.html', title: 'Set Accel & Decel', module: 'Module 04: Parameter & Config' },
    { id: 'lesson-19', file: '19.html', title: 'Protection Parameters', module: 'Module 04: Parameter & Config' },
    { id: 'lesson-20', file: '20.html', title: 'Hands-on', module: 'Module 04: Parameter & Config' },
    { id: 'lesson-21', file: '21.html', title: 'Pump', module: 'Module 05: Application & Benefits' },
    { id: 'lesson-22', file: '22.html', title: 'Fan', module: 'Module 05: Application & Benefits' },
    { id: 'lesson-23', file: '23.html', title: 'Conveyor', module: 'Module 05: Application & Benefits' },
    { id: 'lesson-24', file: '24.html', title: 'Energy Saving', module: 'Module 05: Application & Benefits' },
    { id: 'lesson-25', file: '25.html', title: 'VSD Application', module: 'Module 05: Application & Benefits' },
    { id: 'lesson-26', file: '26.html', title: 'Faults & Alarms', module: 'Module 06: Troubleshooting & Maintenance' },
    { id: 'lesson-27', file: '27.html', title: 'Using a Multimeter', module: 'Module 06: Troubleshooting & Maintenance' },
    { id: 'lesson-28', file: '28.html', title: 'Check Input & Output V&I', module: 'Module 06: Troubleshooting & Maintenance' },
    { id: 'lesson-29', file: '29.html', title: 'Problems Related to VSD', module: 'Module 06: Troubleshooting & Maintenance' },
    { id: 'lesson-30', file: '30.html', title: 'Maintenance Procedures', module: 'Module 06: Troubleshooting & Maintenance' },
    { id: 'resource-01', file: '#', title: 'Reference Docs & Links', module: 'Module 07: Resource Center' }
];

// --- CONFIGURATION ---
const CONFIG = {
    homePage: 'index.html',
    modules: [
        { id: 'module-01', name: 'Module 01: Introduction' },
        { id: 'module-02', name: 'Module 02: AC Motor Fundamentals' },
        { id: 'module-03', name: 'Module 03: Control & Operation' },
        { id: 'module-04', name: 'Module 04: Parameter & Config' },
        { id: 'module-05', name: 'Module 05: Application & Benefits' },
        { id: 'module-06', name: 'Module 06: Troubleshooting & Maintenance' },
        { id: 'module-07', name: 'Module 07: Resource Center' }
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
    updateHomePageLinks();
    updateProgressBar();
    updateAllModuleProgress();
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

function initializeLessonPage(container) {
    const existingFooter = container.querySelector('.lesson-footer');
    if (existingFooter) existingFooter.remove();
    setupLessonFooter(container);
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

function renderAuthUI(user) {
    const container = document.getElementById('auth-container');
    if (!container) return;
    // Clear out whatever was there before
    container.innerHTML = '';
    if (user) {
        const name = user.displayName || user.email || 'Anonymous';
        // Build the greeting with textContent so a display name can never inject HTML (XSS-safe)
        const span = document.createElement('span');
        span.textContent = `เข้าสู่ระบบ: ${name}`;
        const logoutBtn = document.createElement('button');
        logoutBtn.id = 'logout-btn';
        logoutBtn.textContent = 'ออกจากระบบ';
        logoutBtn.onclick = () => firebase.auth().signOut();
        container.append(span, logoutBtn);
    } else {
        const loginBtn = document.createElement('button');
        loginBtn.id = 'login-google-btn';
        loginBtn.textContent = 'เข้าสู่ระบบด้วย Google';
        loginBtn.onclick = () => {
            const provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider);
        };
        container.append(loginBtn);
    }
}

// Only render the auth button/greeting here.
// Progress loading is handled by the ProgressTracker's own auth listener (above),
// so we must NOT call loadProgress() again or it would attach a second listener.
firebase.auth().onAuthStateChanged(renderAuthUI);
