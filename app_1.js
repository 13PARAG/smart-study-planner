// Smart Study Planner JavaScript

class StudyPlanner {
    constructor() {
        this.tasks = [];
        this.currentTaskId = 1;
        this.currentView = 'dashboard';
        this.currentDate = new Date();
        this.isDarkMode = false;
        
        // Sample data for demo purposes
        this.initializeSampleData();
        
        // Initialize the application
        this.init();
    }

    init() {
        this.bindEvents();
        this.setupTheme();
        this.populateSubjects();
        this.renderCurrentView();
        this.updateStats();
    }

    // Initialize with sample data since localStorage is not available
    initializeSampleData() {
        const sampleTasks = [
            {
                id: 1,
                title: "Complete Math Assignment",
                subject: "Mathematics",
                priority: "high",
                dueDate: "2025-10-05",
                description: "Solve problems 1-20 from Chapter 5",
                completed: false,
                createdAt: "2025-10-02",
                reminder: true
            },
            {
                id: 2,
                title: "Read History Chapter",
                subject: "History",
                priority: "medium",
                dueDate: "2025-10-04",
                description: "Read Chapter 12: World War II",
                completed: true,
                createdAt: "2025-10-01",
                reminder: false
            },
            {
                id: 3,
                title: "Science Lab Report",
                subject: "Science",
                priority: "high",
                dueDate: "2025-10-06",
                description: "Write lab report on chemical reactions experiment",
                completed: false,
                createdAt: "2025-10-02",
                reminder: true
            },
            {
                id: 4,
                title: "English Essay",
                subject: "English",
                priority: "medium",
                dueDate: "2025-10-03",
                description: "Write 500-word essay on climate change",
                completed: false,
                createdAt: "2025-10-01",
                reminder: true
            },
            {
                id: 5,
                title: "Study for Geography Quiz",
                subject: "Geography",
                priority: "high",
                dueDate: "2025-10-02",
                description: "Review chapters 8-10 on continental geography",
                completed: false,
                createdAt: "2025-10-01",
                reminder: true
            }
        ];
        
        this.tasks = sampleTasks;
        this.currentTaskId = Math.max(...sampleTasks.map(t => t.id)) + 1;
    }

    bindEvents() {
        // Navigation
        document.querySelectorAll('.nav__item').forEach(item => {
            item.addEventListener('click', (e) => {
                this.switchView(e.target.dataset.view);
            });
        });

        // Add task buttons
        document.getElementById('addTaskBtn').addEventListener('click', () => this.openTaskModal());
        document.getElementById('addTaskBtnList').addEventListener('click', () => this.openTaskModal());
        document.getElementById('addTaskBtnCalendar').addEventListener('click', () => this.openTaskModal());

        // Modal events
        document.getElementById('closeModal').addEventListener('click', () => this.closeTaskModal());
        document.getElementById('cancelBtn').addEventListener('click', () => this.closeTaskModal());
        document.querySelector('#taskModal .modal__overlay').addEventListener('click', () => this.closeTaskModal());
        
        // Form submission
        document.getElementById('taskForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveTask();
        });

        // Theme toggle
        document.getElementById('themeToggle').addEventListener('click', () => this.toggleTheme());

        // Export/Import
        document.getElementById('exportBtn').addEventListener('click', () => this.exportTasks());
        document.getElementById('importBtn').addEventListener('click', () => this.openImportModal());
        document.getElementById('closeImportModal').addEventListener('click', () => this.closeImportModal());
        document.getElementById('cancelImportBtn').addEventListener('click', () => this.closeImportModal());
        document.getElementById('confirmImportBtn').addEventListener('click', () => this.importTasks());
        document.querySelector('#importModal .modal__overlay').addEventListener('click', () => this.closeImportModal());

        // File import
        document.getElementById('importFile').addEventListener('change', (e) => this.handleFileImport(e));

        // Filters
        document.getElementById('searchInput').addEventListener('input', () => this.applyFilters());
        document.getElementById('subjectFilter').addEventListener('change', () => this.applyFilters());
        document.getElementById('priorityFilter').addEventListener('change', () => this.applyFilters());
        document.getElementById('statusFilter').addEventListener('change', () => this.applyFilters());

        // Calendar navigation
        document.getElementById('prevMonth').addEventListener('click', () => this.navigateMonth(-1));
        document.getElementById('nextMonth').addEventListener('click', () => this.navigateMonth(1));
    }

    setupTheme() {
        // Check system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            this.isDarkMode = true;
            document.documentElement.setAttribute('data-color-scheme', 'dark');
            document.getElementById('themeToggle').textContent = '☀️ Light';
        }
    }

    populateSubjects() {
        const subjects = ["Mathematics", "Science", "History", "English", "Geography", "Computer Science", "Languages"];
        const subjectSelects = [document.getElementById('taskSubject'), document.getElementById('subjectFilter')];
        
        subjectSelects.forEach(select => {
            if (select.id === 'subjectFilter') {
                select.innerHTML = '<option value="">All Subjects</option>';
            } else {
                select.innerHTML = '<option value="">Select Subject</option>';
            }
            
            subjects.forEach(subject => {
                const option = document.createElement('option');
                option.value = subject;
                option.textContent = subject;
                select.appendChild(option);
            });
        });
    }

    switchView(view) {
        // Update navigation
        document.querySelectorAll('.nav__item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`[data-view="${view}"]`).classList.add('active');

        // Update views
        document.querySelectorAll('.view').forEach(viewEl => {
            viewEl.classList.add('hidden');
        });
        document.getElementById(`${view}-view`).classList.remove('hidden');

        this.currentView = view;
        this.renderCurrentView();
    }

    renderCurrentView() {
        switch (this.currentView) {
            case 'dashboard':
                this.renderDashboard();
                break;
            case 'list':
                this.renderListView();
                break;
            case 'calendar':
                this.renderCalendarView();
                break;
        }
    }

    renderDashboard() {
        this.updateStats();
        this.renderTodayTasks();
        this.renderUpcomingTasks();
    }

    updateStats() {
        const total = this.tasks.length;
        const completed = this.tasks.filter(task => task.completed).length;
        const pending = total - completed;
        const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

        document.getElementById('totalTasks').textContent = total;
        document.getElementById('completedTasks').textContent = completed;
        document.getElementById('pendingTasks').textContent = pending;
        document.getElementById('progressPercent').textContent = `${progress}%`;
        document.getElementById('progressBarFill').style.width = `${progress}%`;
    }

    renderTodayTasks() {
        const today = new Date().toISOString().split('T')[0];
        const todayTasks = this.tasks.filter(task => task.dueDate === today);
        this.renderTaskList(todayTasks, 'todayTasks');
    }

    renderUpcomingTasks() {
        const today = new Date();
        const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
        const upcomingTasks = this.tasks.filter(task => {
            const taskDate = new Date(task.dueDate);
            return taskDate > today && taskDate <= nextWeek;
        }).sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
        
        this.renderTaskList(upcomingTasks, 'upcomingTasks');
    }

    renderListView() {
        this.applyFilters();
    }

    applyFilters() {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        const subjectFilter = document.getElementById('subjectFilter').value;
        const priorityFilter = document.getElementById('priorityFilter').value;
        const statusFilter = document.getElementById('statusFilter').value;

        let filteredTasks = this.tasks.filter(task => {
            const matchesSearch = task.title.toLowerCase().includes(searchTerm) || 
                                task.description.toLowerCase().includes(searchTerm);
            const matchesSubject = !subjectFilter || task.subject === subjectFilter;
            const matchesPriority = !priorityFilter || task.priority === priorityFilter;
            const matchesStatus = !statusFilter || 
                                (statusFilter === 'completed' && task.completed) ||
                                (statusFilter === 'pending' && !task.completed);

            return matchesSearch && matchesSubject && matchesPriority && matchesStatus;
        });

        // Sort by due date
        filteredTasks.sort((a, b) => {
            if (a.completed !== b.completed) {
                return a.completed ? 1 : -1;
            }
            return new Date(a.dueDate) - new Date(b.dueDate);
        });

        this.renderTaskList(filteredTasks, 'allTasks');
    }

    renderTaskList(tasks, containerId) {
        const container = document.getElementById(containerId);
        
        if (tasks.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state__icon">📝</div>
                    <h3 class="empty-state__title">No tasks found</h3>
                    <p class="empty-state__message">Create your first task to get started!</p>
                    <button class="btn btn--primary" onclick="studyPlanner.openTaskModal()">+ Add Task</button>
                </div>
            `;
            return;
        }

        container.innerHTML = tasks.map(task => this.createTaskHTML(task)).join('');
        
        // Bind task events
        container.querySelectorAll('.task-item__checkbox input').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const taskId = parseInt(e.target.closest('.task-item').dataset.taskId);
                this.toggleTaskCompletion(taskId);
            });
        });

        container.querySelectorAll('.task-item').forEach(item => {
            item.addEventListener('click', (e) => {
                if (!e.target.closest('.task-item__checkbox') && !e.target.closest('.task-action-btn')) {
                    const taskId = parseInt(item.dataset.taskId);
                    this.editTask(taskId);
                }
            });
        });

        container.querySelectorAll('.task-action-btn--edit').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const taskId = parseInt(e.target.closest('.task-item').dataset.taskId);
                this.editTask(taskId);
            });
        });

        container.querySelectorAll('.task-action-btn--delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const taskId = parseInt(e.target.closest('.task-item').dataset.taskId);
                this.deleteTask(taskId);
            });
        });
    }

    createTaskHTML(task) {
        const isOverdue = new Date(task.dueDate) < new Date() && !task.completed;
        const formattedDate = this.formatDate(task.dueDate);
        
        return `
            <div class="task-item ${task.completed ? 'task-item--completed' : ''}" data-task-id="${task.id}">
                <div class="task-item__checkbox">
                    <label class="checkbox-container">
                        <input type="checkbox" ${task.completed ? 'checked' : ''}>
                        <span class="checkmark"></span>
                    </label>
                </div>
                <div class="task-item__content">
                    <div class="task-item__header">
                        <h3 class="task-item__title">${task.title}</h3>
                        <span class="task-item__priority task-item__priority--${task.priority}">
                            ${task.priority}
                        </span>
                    </div>
                    <div class="task-item__meta">
                        <span class="task-item__subject">${task.subject}</span>
                        <span class="task-item__due-date ${isOverdue ? 'task-item__due-date--overdue' : ''}">
                            📅 ${formattedDate}
                            ${isOverdue ? '(Overdue)' : ''}
                            ${task.reminder ? '🔔' : ''}
                        </span>
                    </div>
                    ${task.description ? `<p class="task-item__description">${task.description}</p>` : ''}
                </div>
                <div class="task-item__actions">
                    <button class="task-action-btn task-action-btn--edit" title="Edit Task">✏️</button>
                    <button class="task-action-btn task-action-btn--delete" title="Delete Task">🗑️</button>
                </div>
            </div>
        `;
    }

    renderCalendarView() {
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                          'July', 'August', 'September', 'October', 'November', 'December'];
        
        document.getElementById('currentMonth').textContent = 
            `${monthNames[this.currentDate.getMonth()]} ${this.currentDate.getFullYear()}`;
        
        this.generateCalendar();
    }

    generateCalendar() {
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();
        const today = new Date();
        
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay());
        
        const calendarGrid = document.getElementById('calendarGrid');
        calendarGrid.innerHTML = '';
        
        // Add day headers
        const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        dayHeaders.forEach(day => {
            const header = document.createElement('div');
            header.style.cssText = 'padding: var(--space-8); font-weight: var(--font-weight-bold); text-align: center; background: var(--color-secondary);';
            header.textContent = day;
            calendarGrid.appendChild(header);
        });
        
        // Generate calendar days
        const currentDate = new Date(startDate);
        for (let i = 0; i < 42; i++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            
            const isCurrentMonth = currentDate.getMonth() === month;
            const isToday = currentDate.toDateString() === today.toDateString();
            
            if (!isCurrentMonth) {
                dayElement.classList.add('calendar-day--other-month');
            }
            if (isToday) {
                dayElement.classList.add('calendar-day--today');
            }
            
            const dayTasks = this.tasks.filter(task => 
                task.dueDate === currentDate.toISOString().split('T')[0]
            );
            
            dayElement.innerHTML = `
                <div class="calendar-day__number">${currentDate.getDate()}</div>
                <div class="calendar-day__tasks">
                    ${dayTasks.map(task => 
                        `<div class="calendar-task calendar-task--${task.priority}" title="${task.title}">
                            ${task.title}
                        </div>`
                    ).join('')}
                </div>
            `;
            
            calendarGrid.appendChild(dayElement);
            currentDate.setDate(currentDate.getDate() + 1);
        }
    }

    navigateMonth(direction) {
        this.currentDate.setMonth(this.currentDate.getMonth() + direction);
        this.renderCalendarView();
    }

    openTaskModal(task = null) {
        const modal = document.getElementById('taskModal');
        const form = document.getElementById('taskForm');
        
        // Reset form
        form.reset();
        this.clearErrors();
        
        if (task) {
            // Edit mode
            document.getElementById('modalTitle').textContent = 'Edit Task';
            document.getElementById('taskTitle').value = task.title;
            document.getElementById('taskSubject').value = task.subject;
            document.getElementById('taskPriority').value = task.priority;
            document.getElementById('taskDueDate').value = task.dueDate;
            document.getElementById('taskDescription').value = task.description;
            document.getElementById('taskReminder').checked = task.reminder;
            form.dataset.taskId = task.id;
        } else {
            // Add mode
            document.getElementById('modalTitle').textContent = 'Add New Task';
            // Set default due date to today
            document.getElementById('taskDueDate').value = new Date().toISOString().split('T')[0];
            delete form.dataset.taskId;
        }
        
        modal.classList.remove('hidden');
        document.getElementById('taskTitle').focus();
    }

    closeTaskModal() {
        document.getElementById('taskModal').classList.add('hidden');
    }

    openImportModal() {
        document.getElementById('importModal').classList.remove('hidden');
    }

    closeImportModal() {
        document.getElementById('importModal').classList.add('hidden');
        document.getElementById('importFile').value = '';
        document.getElementById('importText').value = '';
    }

    saveTask() {
        const form = document.getElementById('taskForm');
        const taskData = {
            title: document.getElementById('taskTitle').value.trim(),
            subject: document.getElementById('taskSubject').value,
            priority: document.getElementById('taskPriority').value,
            dueDate: document.getElementById('taskDueDate').value,
            description: document.getElementById('taskDescription').value.trim(),
            reminder: document.getElementById('taskReminder').checked
        };
        
        if (!this.validateTask(taskData)) {
            return;
        }
        
        if (form.dataset.taskId) {
            // Update existing task
            const taskId = parseInt(form.dataset.taskId);
            const taskIndex = this.tasks.findIndex(task => task.id === taskId);
            if (taskIndex !== -1) {
                this.tasks[taskIndex] = { ...this.tasks[taskIndex], ...taskData };
                this.showNotification('Task updated successfully!', 'success');
            }
        } else {
            // Create new task
            const newTask = {
                id: this.currentTaskId++,
                ...taskData,
                completed: false,
                createdAt: new Date().toISOString().split('T')[0]
            };
            this.tasks.push(newTask);
            this.showNotification('Task created successfully!', 'success');
        }
        
        this.closeTaskModal();
        this.renderCurrentView();
        this.updateStats();
    }

    validateTask(taskData) {
        this.clearErrors();
        let isValid = true;
        
        if (!taskData.title) {
            this.showError('titleError', 'Title is required');
            isValid = false;
        }
        
        if (!taskData.subject) {
            this.showError('subjectError', 'Subject is required');
            isValid = false;
        }
        
        if (!taskData.priority) {
            this.showError('priorityError', 'Priority is required');
            isValid = false;
        }
        
        if (!taskData.dueDate) {
            this.showError('dueDateError', 'Due date is required');
            isValid = false;
        }
        
        return isValid;
    }

    showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        const inputElement = errorElement.previousElementSibling;
        
        errorElement.textContent = message;
        errorElement.classList.add('show');
        inputElement.classList.add('error');
    }

    clearErrors() {
        document.querySelectorAll('.error-message').forEach(el => {
            el.classList.remove('show');
            el.textContent = '';
        });
        document.querySelectorAll('.form-control.error').forEach(el => {
            el.classList.remove('error');
        });
    }

    editTask(taskId) {
        const task = this.tasks.find(task => task.id === taskId);
        if (task) {
            this.openTaskModal(task);
        }
    }

    deleteTask(taskId) {
        if (confirm('Are you sure you want to delete this task?')) {
            this.tasks = this.tasks.filter(task => task.id !== taskId);
            this.showNotification('Task deleted successfully!', 'success');
            this.renderCurrentView();
            this.updateStats();
        }
    }

    toggleTaskCompletion(taskId) {
        const task = this.tasks.find(task => task.id === taskId);
        if (task) {
            task.completed = !task.completed;
            this.renderCurrentView();
            this.updateStats();
            
            const message = task.completed ? 'Task completed! 🎉' : 'Task marked as pending';
            this.showNotification(message, 'success');
        }
    }

    toggleTheme() {
        this.isDarkMode = !this.isDarkMode;
        const themeBtn = document.getElementById('themeToggle');
        
        if (this.isDarkMode) {
            document.documentElement.setAttribute('data-color-scheme', 'dark');
            themeBtn.textContent = '☀️ Light';
        } else {
            document.documentElement.setAttribute('data-color-scheme', 'light');
            themeBtn.textContent = '🌙 Dark';
        }
    }

    exportTasks() {
        const dataStr = JSON.stringify(this.tasks, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `study-planner-tasks-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        this.showNotification('Tasks exported successfully!', 'success');
    }

    handleFileImport(event) {
        const file = event.target.files[0];
        if (file && file.type === 'application/json') {
            const reader = new FileReader();
            reader.onload = (e) => {
                document.getElementById('importText').value = e.target.result;
            };
            reader.readAsText(file);
        }
    }

    importTasks() {
        const importText = document.getElementById('importText').value.trim();
        if (!importText) {
            this.showNotification('Please select a file or paste JSON data', 'error');
            return;
        }
        
        try {
            const importedTasks = JSON.parse(importText);
            
            if (!Array.isArray(importedTasks)) {
                throw new Error('Invalid format: Expected an array of tasks');
            }
            
            // Validate and process imported tasks
            const validTasks = importedTasks.filter(task => 
                task.title && task.subject && task.priority && task.dueDate
            );
            
            if (validTasks.length === 0) {
                throw new Error('No valid tasks found in the imported data');
            }
            
            // Update IDs to avoid conflicts
            validTasks.forEach(task => {
                task.id = this.currentTaskId++;
            });
            
            this.tasks = [...this.tasks, ...validTasks];
            this.closeImportModal();
            this.renderCurrentView();
            this.updateStats();
            
            this.showNotification(`Successfully imported ${validTasks.length} tasks!`, 'success');
            
        } catch (error) {
            this.showNotification(`Import failed: ${error.message}`, 'error');
        }
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const options = { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric',
            weekday: 'short'
        };
        return date.toLocaleDateString('en-US', options);
    }

    showNotification(message, type = 'info') {
        const container = document.getElementById('notificationContainer');
        const notification = document.createElement('div');
        
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };
        
        notification.className = `notification notification--${type}`;
        notification.innerHTML = `
            <div class="notification__content">
                <div class="notification__title">${icons[type]} ${type.charAt(0).toUpperCase() + type.slice(1)}</div>
                <div class="notification__message">${message}</div>
            </div>
            <button class="notification__close">×</button>
        `;
        
        notification.querySelector('.notification__close').addEventListener('click', () => {
            notification.remove();
        });
        
        container.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }
}

// Initialize the application
const studyPlanner = new StudyPlanner();