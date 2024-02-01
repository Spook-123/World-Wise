import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// import { CitiesProvider } from "./contexts/CitiesContext";
// import { AuthProvider } from "./contexts/FakeAuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";

import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import SpinnerFullPage from "./components/SpinnerFullPage";
import Signup from "./pages/Signup";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

// import Product from "./pages/Product";
// import Pricing from "./pages/Pricing";
// import HomePage from "./pages/HomePage";
// import Login from "./pages/Login";
// import AppLayout from "./pages/AppLayout";
// import PageNotFound from "./pages/PageNotFound";

// Lazy loading -> allows to render pages in packets
const HomePage = lazy(() => import("./pages/Homepage"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Login = lazy(() => import("./pages/Login"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

// Before lazy loading
// *****************************************************************************//
// dist/assets/index-7800d449.css   30.20 kB │ gzip:   5.06 kB
// dist/assets/index-d44eeb98.js   524.11 kB │ gzip: 148.40 kB
//*******************************************************************/
// After lazy loading
// *****************************************************************************//
// dist/assets/Logo-515b84ce.css             0.03 kB │ gzip:   0.05 kB
// dist/assets/Login-f39ef3ff.css            0.35 kB │ gzip:   0.22 kB
// dist/assets/Product-cf1be470.css          0.47 kB │ gzip:   0.27 kB
// dist/assets/PageNav-d3c5d403.css          0.51 kB │ gzip:   0.28 kB
// dist/assets/Homepage-380f4eeb.css         0.51 kB │ gzip:   0.30 kB
// dist/assets/AppLayout-a9e6818a.css        1.91 kB │ gzip:   0.70 kB
// dist/assets/index-337c026f.css           26.53 kB │ gzip:   4.37 kB
// dist/assets/Product.module-02d70b80.js    0.06 kB │ gzip:   0.07 kB
// dist/assets/PageNotFound-25f22413.js      0.15 kB │ gzip:   0.15 kB
// dist/assets/Logo-a89e7409.js              0.21 kB │ gzip:   0.19 kB
// dist/assets/PageNav-dba4c120.js           0.49 kB │ gzip:   0.27 kB
// dist/assets/Pricing-546cd19f.js           0.65 kB │ gzip:   0.41 kB
// dist/assets/Homepage-55406cf6.js          0.67 kB │ gzip:   0.41 kB
// dist/assets/Product-e402057e.js           0.86 kB │ gzip:   0.49 kB
// dist/assets/Login-e51d1a3f.js             1.01 kB │ gzip:   0.53 kB
// dist/assets/AppLayout-da5eda5e.js       156.95 kB │ gzip:  46.11 kB
// dist/assets/index-7d5cfe67.js           365.42 kB │ gzip: 101.80 kB
// *****************************************************************************//

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      {/* <AuthProvider>
        <CitiesProvider> */}
      <BrowserRouter>
        {/* Suspense -> it will load page as we need them (splitting bundle in separates chunks) */}
        <Suspense fallback={<SpinnerFullPage />}>
          <Routes>
            {/* index -> makes it the default route to direct to */}
            <Route index element={<HomePage />} />
            <Route path="product" element={<Product />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route
              path="app"
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              {/* Active the cities -> Navigate */}
              <Route index element={<Navigate replace to="cities" />} />
              <Route path="cities" element={<CityList />} />
              <Route path="cities/:id" element={<City />} />
              <Route path="countries" element={<CountryList />} />
              <Route path="form" element={<Form />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      {/* </CitiesProvider>
      </AuthProvider> */}
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "white",
            color: "grey",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
