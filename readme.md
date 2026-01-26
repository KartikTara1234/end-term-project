AAGGEEEE

To help you excel in your Web Dev II Final Project, here is the finalized README.md tailored to the evaluation rubric. This document clearly defines your problem statement, technical depth, and compliance with the "no frameworks" rule.

AAGGEEE: Long-Term Growth Tracker
1. Project Overview 


AAGGEEE is a fully functional, interactive DOM-based web application built with Vanilla JavaScript. It is designed to help users achieve long-term self-improvement through structured habit tracking across custom date ranges.

2. Problem Statement 

Maintaining consistency is the primary challenge in self-improvement. Most trackers require tedious daily logging, leading to user burnout. AAGGEEE solves this by providing a Bulk-Add feature, allowing users to schedule discipline across weeks or months in a single action, fostering long-term commitment.

3. Core Features 


Bulk Habit Scheduling: Add a habit to a specific range of dates simultaneously.


Interactive Single-Calendar UI: Navigate through months and select specific dates to view unique task lists.


Live Progress Logic: Real-time calculation of completion percentages for the selected day.


Persistent Data Handling: Utilizes localStorage to ensure habits persist across browser sessions.


Aesthetic Dark Theme: A clean Purple and Teal UI designed for high readability and focus.

4. DOM & JavaScript Concepts Used 

This project demonstrates the following core frontend engineering principles:


Dynamic Element Creation: Using document.createElement to generate calendar grids and habit rows based on state.


State Handling: Managing a central JavaScript object that synchronizes with the DOM and localStorage.


Event-Driven Programming: Implementing complex listeners for form submissions, date selections, and habit toggling.


Conditional Rendering: Dynamically updating styles (e.g., strike-throughs for completed tasks) based on user interaction.

5. Technology Stack 


HTML5: Semantic structure.


CSS3 (Flexbox & Grid): Responsive layout without external libraries.


Vanilla JavaScript (ES6+): All logic is written in pure JS.


Browser APIs: Use of localStorage for data persistence.


Note: No frameworks (React, Angular, Vue) or jQuery were used in compliance with project guidelines.

6. How to Run the Project 

Clone the repository to your local machine.

Open index.html in any modern web browser.

Enter a habit name, select a "Start" and "End" date, and click "Add to All Days."

Navigate the calendar to track your progress on any specific date.
