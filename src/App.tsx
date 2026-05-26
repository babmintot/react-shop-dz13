import { Suspense, lazy } from 'react';  // ✅ Добавляем lazy и Suspense
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from '@/context/AppContext';
import { Navbar } from '@/components/Navbar';
import { Spinner } from '@/components/Spinner';

// ✅ Ленивая загрузка страниц (адаптация под named exports)
const Home = lazy(() => import('@/pages/Home').then(m => ({ default: m.Home })));
const List = lazy(() => import('@/pages/List').then(m => ({ default: m.List })));
const Details = lazy(() => import('@/pages/Details').then(m => ({ default: m.Details })));
const About = lazy(() => import('@/pages/About').then(m => ({ default: m.About })));
const Favorites = lazy(() => import('@/pages/Favorites').then(m => ({ default: m.Favorites })));

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Navbar />
        <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem' }}>
          {/* ✅ Оборачиваем Routes в Suspense */}
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/list" element={<List />} />
              <Route path="/list/:id" element={<Details />} />
              <Route path="/about" element={<About />} />
              <Route path="/favorites" element={<Favorites />} />
            </Routes>
          </Suspense>
        </main>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;