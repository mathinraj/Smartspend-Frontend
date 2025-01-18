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

###Structure

smartspend-frontend/
├── node_modules/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/           # Static assets like images, icons
│   │   └── styles.css
│   ├── components/       # Reusable UI components
│   │   ├── AddExpenseModal.jsx
│   │   ├── BudgetForm.jsx
│   │   ├── CategoryForm.jsx
│   │   ├── CategoryList.jsx
│   │   ├── ChartComponent.jsx
│   │   ├── DateFilter.jsx
│   │   ├── ExpenseCard.jsx
│   │   ├── ExpenseFilter.jsx
│   │   ├── ExpenseList.jsx
│   │   ├── LoadingSpinner.jsx
│   │   ├── Sidebar.jsx
│   │   ├── UserForm.jsx
│   │   ├── UserList.jsx
│   │   └── Header.jsx
│   ├── contexts/         # React Contexts for global state
│   │   └── AuthContext.jsx
│   ├── hooks/            # Custom React Hooks
│   │   └── useAuth.jsx
│   ├── pages/            # Main application pages
│   │   ├── Auth/
│   │   │   ├── LoginPage.jsx
│   │   │   └── HomePage.jsx
│   │   ├── Dashboard/
│   │   │   ├── DashboardPage.jsx
│   │   │   └── DashboardCharts.jsx
│   │   ├── TransactionsPage.jsx
│   │   ├── CategoriesPage.jsx
│   │   ├── BudgetsPage.jsx
│   │   └── UsersPage.jsx
│   ├── services/         # API service calls
│   │   ├── authService.js
│   │   ├── budgetService.js
│   │   ├── categoryService.js
│   │   ├── expenseService.js
│   │   └── userService.js
│   ├── utils/            # Utility functions
│   │   └── api.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css        
├── .env                # Environment variables
├── index.html
├── package.json
├── vite.config.js
└── ...