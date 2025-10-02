# 📚 Smart Study Planner

A comprehensive web application designed to help students organize and track their academic tasks efficiently, boost productivity, and manage time effectively.

## 📋 Project Overview

Smart Study Planner is a modern, responsive web application that addresses the common challenges students face when organizing study schedules and tracking academic tasks. This intuitive planner helps users create, manage, and monitor their study goals with visual timelines, reminders, and progress tracking. Built with vanilla JavaScript and designed with a mobile-first approach, it provides a seamless experience across all devices while keeping all data stored locally for privacy and offline access.

## ✨ Features

### Core Task Management
- **Create, Edit & Delete Tasks**: Full CRUD operations for managing study tasks and academic goals
- **Due Dates & Scheduling**: Set and track important deadlines with visual date indicators
- **Priority Levels**: Organize tasks by importance (High, Medium, Low) with color-coded labels
- **Subject Categorization**: Group tasks by academic subjects with customizable categories
- **Task Descriptions**: Add detailed notes and requirements for each task
- **Completion Tracking**: Mark tasks as complete with visual feedback and progress updates

### Multiple View Modes
- **Dashboard View**: Overview of today's tasks, upcoming deadlines, and progress statistics
- **List View**: Comprehensive task list with advanced filtering and sorting options
- **Calendar View**: Timeline-based visualization of tasks and due dates

### Visual Progress Tracking
- **Animated Progress Bars**: Real-time visual representation of task completion
- **Statistics Cards**: Total tasks, completed tasks, and pending tasks overview
- **Completion Percentage**: Dynamic progress indicators with smooth animations
- **Today's Tasks Summary**: Quick overview of daily objectives and priorities

### Data Management
- **Local Storage Integration**: All data persists locally in the browser for privacy and offline access
- **Export/Import Functionality**: Backup and restore tasks using JSON file format
- **Auto-save**: Automatic data persistence with every action
- **Sample Data**: Pre-loaded demo tasks to showcase functionality

### Advanced Filtering & Search
- **Multi-criteria Filtering**: Filter by subject, priority level, due date, and completion status
- **Real-time Search**: Instantly find tasks by title or description
- **Smart Sorting**: Sort tasks by due date, priority, or creation date
- **Bulk Operations**: Select and manage multiple tasks simultaneously

### User Experience
- **Light/Dark Mode Toggle**: Switch between themes with smooth transitions
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Intuitive Modal Forms**: User-friendly task creation and editing interfaces
- **Visual Feedback**: Hover effects, animations, and interactive elements
- **Accessibility Features**: Semantic HTML and keyboard navigation support

### Notifications & Alerts
- **Due Date Notifications**: Visual indicators for upcoming and overdue tasks
- **Priority Highlighting**: Color-coded task cards based on importance level
- **Progress Alerts**: Motivational feedback on task completion milestones

## 🛠️ Tech Stack

### Frontend Technologies
- **HTML5**: Semantic markup with proper document structure and accessibility features
- **CSS3**: Modern styling with custom properties, Flexbox, and Grid layouts
- **JavaScript (ES6+)**: Vanilla JavaScript with class-based architecture and modular design

### Key Features & APIs
- **CSS Custom Properties**: Dynamic theming system for light/dark mode switching
- **Local Storage API**: Client-side data persistence without external dependencies
- **Responsive Design**: Mobile-first approach with CSS media queries
- **Modern CSS**: Animations, transitions, and visual effects for enhanced UX
- **Cross-browser Compatibility**: Support for all modern web browsers

### Development Approach
- **Modular Architecture**: Clean separation of concerns with organized code structure
- **Progressive Enhancement**: Core functionality works without JavaScript, enhanced with interactive features
- **Performance Optimized**: Minimal dependencies and efficient rendering
- **Accessibility First**: WCAG compliant with proper ARIA labels and keyboard navigation

## 🚀 Installation & Usage

### Prerequisites
- Any modern web browser (Chrome, Firefox, Safari, Edge)
- Basic text editor (VS Code, Sublime Text, etc.) for modifications
- Local web server (optional, for development)

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/smart-study-planner.git
   cd smart-study-planner
   ```

2. **Open the Application**
   ```bash
   # Option 1: Direct file opening
   open index.html
   
   # Option 2: Using Python server
   python -m http.server 3000
   
   # Option 3: Using Node.js server
   npx http-server
   ```

3. **Access the App**
   - Direct file: Open `index.html` in your browser
   - Local server: Navigate to `http://localhost:3000`

### How to Use

1. **Getting Started**
   - Open the application in your web browser
   - The dashboard will display with sample tasks pre-loaded
   - Explore different views using the navigation menu

2. **Creating Tasks**
   - Click the "Add New Task" button on the dashboard
   - Fill in task details: title, subject, priority, due date, and description
   - Enable reminders if needed
   - Click "Save Task" to add to your planner

3. **Managing Tasks**
   - Click on any task to edit its details
   - Use the checkbox to mark tasks as complete
   - Delete tasks using the trash icon
   - Filter tasks using the sidebar controls

4. **Customization**
   - Toggle between light and dark modes
   - Add custom subjects for better organization
   - Export your tasks for backup
   - Import previously saved task data

5. **Productivity Features**
   - Monitor progress with visual indicators
   - Focus on today's tasks from the dashboard
   - Use priority levels to organize workload
   - Set up reminders for important deadlines

## 📸 Screenshots / Demo

### Live Demo
🔗 **[View Live Demo](https://your-demo-link.com)**

### Screenshots

#### Dashboard View
![Dashboard Screenshot](./screenshots/dashboard.png)
*Clean dashboard showing today's tasks, progress statistics, and upcoming deadlines*

#### Task Management
![Task Creation Modal](./screenshots/task-modal.png)
*Intuitive task creation form with all necessary fields and validation*

#### List View with Filtering
![List View Screenshot](./screenshots/list-view.png)
*Comprehensive task list with advanced filtering and search capabilities*

#### Dark Mode
![Dark Mode Screenshot](./screenshots/dark-mode.png)
*Elegant dark theme for comfortable studying during evening hours*

#### Mobile Responsive
![Mobile Screenshot](./screenshots/mobile-view.png)
*Fully responsive design optimized for mobile devices*

### Key Features Demo
- ✅ Real-time task creation and editing
- ✅ Visual progress tracking with animations
- ✅ Seamless theme switching
- ✅ Advanced filtering and search
- ✅ Data export/import functionality
- ✅ Mobile-responsive design

## 🤝 Contributing

We welcome contributions from the community! Whether you're fixing bugs, adding new features, or improving documentation, your help is appreciated.

### How to Contribute

1. **Fork the Repository**
   ```bash
   git fork https://github.com/yourusername/smart-study-planner.git
   ```

2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make Your Changes**
   - Follow the existing code style and conventions
   - Add comments for complex functionality
   - Test your changes thoroughly

4. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "Add: Your descriptive commit message"
   ```

5. **Push to Your Branch**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**
   - Provide a clear description of your changes
   - Include screenshots for UI modifications
   - Reference any related issues

### Contribution Guidelines

- **Code Quality**: Maintain clean, readable, and well-commented code
- **Testing**: Test your changes across different browsers and devices
- **Documentation**: Update README.md and inline comments as needed
- **UI/UX**: Ensure changes maintain the current design language and accessibility standards
- **Performance**: Optimize for speed and minimal resource usage

### Reporting Issues

Found a bug or have a suggestion? Please create an issue with:
- Clear description of the problem or suggestion
- Steps to reproduce (for bugs)
- Expected vs actual behavior
- Screenshots or screen recordings if applicable
- Browser and device information

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### MIT License Summary
- ✅ Commercial use allowed
- ✅ Modification allowed  
- ✅ Distribution allowed
- ✅ Private use allowed
- ❌ No liability or warranty provided

## 📬 Contact Information

### Developer
**[Your Name]**
- 📧 **Email**: your.email@example.com
- 🌐 **Portfolio**: [your-portfolio.com](https://your-portfolio.com)
- 💼 **LinkedIn**: [linkedin.com/in/yourprofile](https://linkedin.com/in/yourprofile)
- 🐱 **GitHub**: [github.com/yourusername](https://github.com/yourusername)
- 🐦 **Twitter**: [@yourusername](https://twitter.com/yourusername)

### Project Links
- 🔗 **Live Demo**: [smart-study-planner-demo.com](https://smart-study-planner-demo.com)
- 📂 **Repository**: [github.com/yourusername/smart-study-planner](https://github.com/yourusername/smart-study-planner)
- 📋 **Issues**: [Report bugs and request features](https://github.com/yourusername/smart-study-planner/issues)

---

### Acknowledgments

- Thanks to all contributors who helped improve this project
- Inspired by the need for better student productivity tools
- Built with modern web standards and accessibility in mind

### Support This Project

If you find Smart Study Planner helpful, please consider:
- ⭐ Starring the repository
- 🐛 Reporting bugs and issues
- 🚀 Contributing new features
- 📢 Sharing with fellow students

---

**Made with ❤️ for students everywhere | Happy studying! 📚✨**