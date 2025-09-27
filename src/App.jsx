import { useUser } from "@clerk/clerk-react";
import "./App.css";

import { Navigate, Outlet } from "react-router-dom";
import Header from "./components/custom/Header";

function App() {
  const { user, isLoaded, isSignedIn } = useUser();
  if (!isSignedIn && isLoaded) {
    return <Navigate to="/auth/sign-in" />;
  }

  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
