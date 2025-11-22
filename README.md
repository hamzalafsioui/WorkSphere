

# Work Sphere – Virtual Workspace Management

**Work Sphere** is a web-based application designed to manage employees and their assignments in a virtual office environment. Users can add employees, view their profiles, manage work zones, and automatically assign staff to appropriate areas based on their roles.

---

## Table of Contents

* [Features](#features)
* [Technologies](#technologies)
* [Installation](#installation)
* [Usage](#usage)
* [Folder Structure](#folder-structure)
* [Functionality Overview](#functionality-overview)
* [License](#license)

---

## Features

* **Add New Employees** with details such as name, email, phone, photo, role, and experiences.
* **View Employee Profiles** in a modal, showing detailed information and experiences.
* **Manage Work Zones** visually on a floor plan.
* **Assign Employees to Zones** manually or automatically.
* **Role-Based Assignments**, e.g., IT staff can only go to the server room, Receptionists only to the reception, etc.
* **Search Employees** by name or role.
* **Experience Validation** ensures 'From' date is before 'To' date.
* **Local Storage Support** to persist employee and assignment data.
* **Responsive Layout** using TailwindCSS.

---

## Technologies

* **Frontend**: HTML, CSS, JavaScript
* **CSS Framework**: TailwindCSS
* **Storage**: LocalStorage
* **Optional**: Vanilla JS for DOM manipulation

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/hamzalafsioui/WorkSphere
   ```
2. Open `index.html` in your browser.
3. Ensure the folder structure remains the same to correctly load scripts, styles, and images.

---

## Usage

1. Click **"Add New Worker"** to open the modal and fill in employee details.
2. Assign experiences using the **"Add Experience"** button.
3. Save the employee. It will appear in the **Unassigned Staff** list.
4. Click the **"+" button** in each zone on the floor plan to manually assign employees.
5. Use **Auto Assign** to automatically place employees based on role rules.
6. Click an employee’s name to view detailed profile info.
7. Search employees using the search bar by **name** or **role**.
8. Remove employees using the **X button** in unassigned list or assigned zones.

---

## Folder Structure

```
project/
│
├─ index.html
├─ style.css
├─ src/
│   └─ output.css       # TailwindCSS output file
├─ scripts/
│   └─ script.js        # Main JS logic
├─ img/
│   └─ plan.jpg         # Floor plan image
└─ README.md
```

---

## Functionality Overview

### 1. Employee Management

* Employees have attributes: `name`, `role`, `email`, `phone`, `photo`, `experiences`, and assigned `zone`.
* Experiences include `title`, `from` and `to` dates.

### 2. Zones Management

* Zones defined in the floor plan: **Conference**, **Reception**, **Server Room**, **Security Room**, **Staff Room**, **Archives**.
* Each zone has a **capacity limit**.
* Role-based rules define which employees can be assigned to which zones.

### 3. Modals

* **Add Employee Modal**: For adding new employees.
* **Profile Modal**: To display detailed employee info.
* **Select Modal**: To manually assign employees to a zone.

### 4. Auto Assignment

* Automatically assigns unassigned employees to zones based on role and capacity limits.

### 5. Validation

* Name, email, phone, and experiences are validated before saving.
* Emails use regex: `/\S+@\S+\.\S+/`
* Phones use regex: `/^[0-9\s+()-]{6,20}$/`
* Experience dates are validated so that `from < to`.

---
**Do The Best & Forget The Rest -)**

