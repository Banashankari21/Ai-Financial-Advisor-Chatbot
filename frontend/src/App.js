//import React from "react";
//import SignupForm from "./components/SignupForm";
//import LoginForm from "./components/LoginForm";
//import ExpenseForm from "./components/ExpenseForm";
//import ExpenseTable from "./components/ExpenseTable";
//import { AuthProvider, useAuth } from "./contexts/AuthContext";
//import 'bootstrap/dist/css/bootstrap.min.css';
//import Chatbot from './components/Chatbot';

//const AppContent = () => {
//  const { isAuthenticated, logout, user } = useAuth();

//  const [expenses, setExpenses] = React.useState([]);
//  const handleAddExpense = (newExpense) => {
//  setExpenses((prev) => [newExpense, ...prev]);
//};


//  return (
//      <div
//      className="container mt-5 p-4 rounded shadow"
//      style={{
//        backgroundColor: "#1e1e1e", // Darker card background
//      color: "#ffffff",
        
//      }}
//    >
//    <h2 className="text-center mb-4">AI Financial Advisor</h2>
//    {isAuthenticated ? (
//      <>
//        <div className="d-flex justify-content-between align-items-center mb-3">
//          <h5>Welcome, {user?.name}</h5>
//          <button onClick={logout} className="btn btn-danger btn-sm">Logout</button>
//        </div>
//        <ExpenseForm onAdd={handleAddExpense} />
//        <ExpenseTable expenses={expenses} />
//        {/* ✅ Chatbot should be outside of the conditional */}
//      <Chatbot />

  //      </>
  //    ) : (
  //      <>
  //        <SignupForm />
  //        <hr />
  //        <LoginForm />
          
  //      </>
  //    )
    
  //  }
    
    
  //  </div>
//  );
//};

//function App() {
  //return (
   // <AuthProvider>
    //  <AppContent />
    //</AuthProvider>
  //);
//}

//export default App;

/*import React, { useState } from "react";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseTable from "./components/ExpenseTable";
import Chatbot from "./components/Chatbot";
import "./App.css";

const MainApp = () => {
  const { token, logout } = useAuth();
  const [isSignup, setIsSignup] = useState(false);

  if (!token) {
    return isSignup ? (
      <SignupForm onSwitch={() => setIsSignup(false)} />
    ) : (
      <LoginForm onSwitch={() => setIsSignup(true)} />
    );
  }

  return (
    <div className="app-container">
      <header>
        <h1>S to E (Savings to Earnings)</h1>
        <button onClick={logout}>Logout</button>
      </header>
      <main>
        <ExpenseForm />
        <ExpenseTable />
        <Chatbot />
      </main>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}

export default App;*/

import React, { useContext } from "react";
import { AuthProvider, AuthContext } from "./contexts/AuthContext";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import Dashboard from "./components/Dashboard";
import "./App.css";

function AppContent() {
  const { token, isSignupMode } = useContext(AuthContext);

  if (!token) {
    return isSignupMode ? <SignupForm /> : <LoginForm />;
  }

  return <Dashboard />;
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

