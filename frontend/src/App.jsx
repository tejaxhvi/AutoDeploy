import { Routes, Route } from "react-router";
import { SignupForm } from "./components/signup-form";
import { LoginForm } from "./components/login-form";
import Home from "./pages/Home";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </div>
  );
}
