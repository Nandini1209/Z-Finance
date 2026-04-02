# Z-Finance Dashboard

Z-Finance is a minimal, modern, and highly responsive personal finance management dashboard. Built as an intern assessment project for Zorvyn, it provides an intuitive interface to monitor financial activity, manage transactions, and deliver robust insights into your overall spending habits.

## 🚀 Features

- **Dashboard Overview**: Automatically calculated metrics for Total Balance, Monthly Income, and Monthly Expenses.
- **Spending Insights**: Interactive pie-charts to break down spending by category.
- **Transactions Management**: Includes searching by name/amount and filtering by category.
- **Role-Based UI**:
  - `User`: View-only access.
  - `Admin`: Full access including "Delete" and "Edit" capabilities to manage transaction data.
- **Dark Mode / Light Mode**: Dynamic theme toggling utilizing Tailwind's class-based architecture.

## 🛠 Tech Stack

- **Framework**: [React.js](https://react.dev/) + [Vite](https://vite.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)
- **State Management**: React Context API

## 💻 Running Locally

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Copy or clone the repository to your local machine.
2. Navigate into the project directory:
   ```bash
   cd z-finance
   ```
3. Install the specific dependencies:
   ```bash
   npm install
   ```

### Start the Development Server

Run the development command to start the Vite server:
```bash
npm run dev
```
By default, the server will be available at [http://localhost:5173/](http://localhost:5173/).

## 📁 Project Structure highlights

- `src/components/` - Houses all reusable frontend UI component modules.
  - `/Layout` - Holds structural UI elements like Sidebar and Header.
  - `/Dashboard` - Hosts analytic elements like Overview Cards and spending charts.
  - `/Transactions` - Keeps logic concerning transaction listing and manipulation.
- `src/context/` - Hosts the Context Providers (`FinanceContext.jsx`); acting as our simplified global state manager supporting fake CRUD logic, mock data feeding, role toggling, and theme swapping.

