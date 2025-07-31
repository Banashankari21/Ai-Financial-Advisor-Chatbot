import React from "react";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseTable from "./components/ExpenseTable";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import Chatbot from './components/Chatbot';

const AppContent = () => {
  const { isAuthenticated, logout, user } = useAuth();

  const [expenses, setExpenses] = React.useState([]);
  const handleAddExpense = (newExpense) => {
  setExpenses((prev) => [newExpense, ...prev]);
};


  return (
      <div
      className="container mt-5 p-4 rounded shadow"
      style={{
        backgroundColor: "#1e1e1e", // Darker card background
        color: "#ffffff",
        
      }}
    >
      <h2 className="text-center mb-4">AI Financial Advisor</h2>
      {isAuthenticated ? (
        <>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5>Welcome, {user?.name}</h5>
            <button onClick={logout} className="btn btn-danger btn-sm">Logout</button>
          </div>
          <ExpenseForm onAdd={handleAddExpense} />
          <ExpenseTable expenses={expenses} />
          {/* ✅ Chatbot should be outside of the conditional */}
      <Chatbot />

        </>
      ) : (
        <>
          <SignupForm />
          <hr />
          <LoginForm />
          
        </>
      )
    
    }
    
    
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
