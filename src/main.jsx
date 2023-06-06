import { ThemeProvider } from "@material-tailwind/react";
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import routes from './Routes/Routes';
import AuthProvider from "./Providers/AuthProvider/AuthProvider";

ReactDOM.createRoot( document.getElementById( 'root' ) ).render(
  <AuthProvider>
    <ThemeProvider>
      <RouterProvider router={ routes } />
    </ThemeProvider>
  </AuthProvider>,
);
