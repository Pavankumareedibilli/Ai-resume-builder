import { useState } from "react";
import { Button } from "./components/ui/button";
import "./App.css";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="flex min-h-svh flex-col items-center justify-center">
        <Button>Click me</Button>
      </div>
    </div>
  );
}

export default App;
