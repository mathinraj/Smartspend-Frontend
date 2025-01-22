## SmartSpend 💼💰

A comprehensive expense tracker built with Spring Boot, MySQL, and React.

SmartSpend helps you manage your finances effortlessly by tracking your daily expenses and categorizing them. Built as a full-stack application, it leverages Spring Boot for the backend, MySQL for database management, and will soon feature a React frontend for a seamless user experience.

#### **Features**
- 📝 Add, Edit, and Delete Expenses
- 📊 Categorize Expenses (Food, Travel, Housing, etc.)
- 📅 Track Spending Over Time
- ✅ CRUD Operations with a RESTful API
- 🧪 Unit Testing using JUnit

#### **Tech Stack**
- **Backend**: Spring Boot, Hibernate, MySQL
- **Frontend**: React
- **Build Tool**: Maven
- **Testing**: JUnit

####  **Setup Instructions**
- Clone the repository:
`git clone https://github.com/mathinraj/Smartspend`

- Configure your `application.properties` with MySQL credentials.
- Run the application using Maven:
`mvn spring-boot:run`

npm install react-router-dom axios bootstrap react-chartjs-2 chart.js react-icons react-toastify react-calendar

###Structure

expense-tracker-frontend/
├── public/
│   └── index.html
├── src/
│   ├── assets/
│   │   └── images/ (store images like logos, icons, etc.)
│   ├── components/
│   │   ├── common/
│   │   │   ├── Header.jsx
│   │   │   ├── SideMenu.jsx
│   │   │   └── Footer.jsx
│   │   ├── Dashboard/
│   │   │   ├── ExpensePieChart.jsx
│   │   │   ├── CategoryPieChart.jsx
│   │   │   └── AddExpenseButton.jsx
│   │   ├── Transactions/
│   │   │   ├── TransactionList.jsx
│   │   │   ├── TransactionFilter.jsx
│   │   │   └── AddExpenseButton.jsx
│   │   ├── Categories/
│   │   │   ├── CategoryList.jsx
│   │   │   ├── CategoryPieChart.jsx
│   │   │   └── AddCategoryButton.jsx
│   │   ├── Budgets/
│   │   │   ├── BudgetList.jsx
│   │   │   ├── BudgetProgress.jsx
│   │   │   └── AddBudgetButton.jsx
│   │   └── Users/
│   │       ├── UserList.jsx
│   │       └── AddUserButton.jsx
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── DashboardPage.jsx
│   │   ├── TransactionsPage.jsx
│   │   ├── CategoriesPage.jsx
│   │   ├── BudgetsPage.jsx
│   │   └── UsersPage.jsx
│   ├── services/
│   │   ├── api.js (Axios instance for API calls)
│   │   ├── auth.js (Authentication service)
│   │   └── expenseService.js (API calls for expenses, categories, budgets, etc.)
│   ├── utils/
│   │   ├── authUtils.js (Utility functions for authentication)
│   │   └── chartUtils.js (Utility functions for charts)
│   ├── App.jsx
│   ├── main.jsx
│   ├── routes.jsx (React Router configuration)
│   └── styles/
│       ├── global.css (Global styles)
│       ├── dashboard.css (Styles for dashboard)
│       ├── transactions.css (Styles for transactions)
│       ├── categories.css (Styles for categories)
│       ├── budgets.css (Styles for budgets)
│       └── users.css (Styles for users)
├── package.json
├── vite.config.js
└── README.md


Phase 1: Project Setup and Basic Routing
Initialize the Project:

You’ve already initialized the project using Vite.

Install dependencies: npm install react-router-dom bootstrap axios

Folder Structure:

Copy
src/
├── components/
├── pages/
├── services/
├── App.jsx
├── main.jsx
└── styles/
Set Up Routing:

Create basic pages: HomePage, LoginPage, DashboardPage.

Set up React Router to navigate between these pages.

Basic Styling:

Add Bootstrap CSS in main.jsx:

javascript
Copy
import 'bootstrap/dist/css/bootstrap.min.css';
Deliverables:

A working app with a home page, login page, and dashboard page.

Navigation between pages using React Router.

Phase 2: Authentication and Login
Login Page:

Create a login form with username and password fields.

Use Axios to call the backend login API.

Store the JWT token in local storage on successful login.

Protected Routes:

Create a ProtectedRoute component to restrict access to pages like DashboardPage unless the user is logged in.

Logout Functionality:

Add a logout button in the dashboard to clear the token and redirect to the login page.

Deliverables:

A functional login system.

Protected routes for authenticated users.

Phase 3: Dashboard Page
Side Menu:

Create a SideMenu component with links to Dashboard, Transactions, Categories, Budgets, and Users (admin-only).

Charts:

Add a simple pie chart or bar chart using a library like react-chartjs-2 or plain HTML/CSS.

Add Expense Button:

Add a floating action button (FAB) at the bottom right to open a modal for adding expenses.

Deliverables:

A dashboard with a side menu and basic charts.

A button to add expenses (modal functionality can be added later).

Phase 4: Transactions Page
Transaction List:

Display a list of transactions fetched from the backend.

Show details like date, category, amount, and description.

Filters:

Add basic filters for date, category, and date range.

Add Expense Button:

Add a FAB to open a modal for adding expenses.

Deliverables:

A transactions page with a list of transactions and basic filters.

Phase 5: Categories Page
Category List:

Display a list of categories fetched from the backend.

Add options to edit or delete categories.

Pie Chart:

Show a pie chart of expenses by category for the current month.

Add Category Button:

Add a button to open a modal for adding new categories.

Deliverables:

A categories page with a list of categories and a pie chart.

Phase 6: Budgets Page
Budget List:

Display a list of budgets fetched from the backend.

Show details like category, amount, start date, and end date.

Budget Progress:

Show progress bars indicating how much of the budget is left for each category.

Add Budget Button:

Add a button to open a modal for adding new budgets.

Deliverables:

A budgets page with a list of budgets and progress bars.

Phase 7: Users Page (Admin Only)
User List:

Display a list of users fetched from the backend.

Add options to edit or delete users.

Add User Button:

Add a button to open a modal for adding new users.

Admin Restriction:

Only show the Users page and its functionality to users with the ADMIN role.

Deliverables:

A users page with a list of users and options to manage them (admin-only).

Phase 8: Final Touches
Styling:

Polish the UI using Bootstrap classes and custom CSS.

Error Handling:

Add error handling for API calls (e.g., display error messages if login fails).

Responsive Design:

Ensure the app is mobile-friendly using Bootstrap’s responsive utilities.

Testing:

Test all functionalities (login, transactions, categories, budgets, users).

Deliverables:

A fully functional, polished expense tracker app.

Phase-by-Phase Code Requests
You can ask for code for each phase as you progress. For example:

Phase 1: "Give me the code for setting up basic routing and pages."

Phase 2: "Give me the code for the login page and protected routes."

Phase 3: "Give me the code for the dashboard page with a side menu and charts."