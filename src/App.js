import "./App.css";
import { RouterProvider } from "react-router-dom";
import { Suspense } from "react";
import { router } from "./components/routes/route";
import FallbackLoader from "./components/Loaders/FallbackLoader";

function App() {
  return (
    <Suspense fallback={<FallbackLoader />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
