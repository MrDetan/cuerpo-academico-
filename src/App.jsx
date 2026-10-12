import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProfessorsSection } from './components/ProfessorsSection';
import { ProfessorDossierView } from './components/ProfessorDossierView';
import { PublicationsHub } from './components/PublicationsHub';
import { LgacSection } from './components/LgacSection';
import { EventsSection } from './components/EventsSection';
import { CitationModal } from './components/CitationModal';
import { Dashboard } from './components/Dashboard';
import { Footer } from './components/Footer';
import { eventsData as initialDefaultEvents } from './data/academicData';

export function App() {
  const [selectedProfessorId, setSelectedProfessorId] = useState(null);
  const [activeView, setActiveView] = useState('hub');
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [citationWork, setCitationWork] = useState(null);

  // Dynamic Live Events State (persisted in localStorage and synchronized via disk API)
  const [events, setEvents] = useState(() => {
    try {
      const saved = localStorage.getItem('uas_ca_live_events');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Error reading events from localStorage', e);
    }
    return initialDefaultEvents;
  });

  // On mount, check if disk API has more recent events
  useEffect(() => {
    const fetchDiskEvents = async () => {
      try {
        const res = await fetch('/api/events');
        if (res.ok) {
          const diskData = await res.json();
          if (Array.isArray(diskData) && diskData.length > 0) {
            setEvents(diskData);
            localStorage.setItem('uas_ca_live_events', JSON.stringify(diskData));
          }
        }
      } catch (err) {
        // Fallback to localStorage or defaults
      }
    };
    fetchDiskEvents();
  }, []);

  // Update events both locally and via server API
  const handleUpdateEvents = async (newEvents) => {
    // 1. Instant Live React State update
    setEvents(newEvents);

    // 2. Client-side LocalStorage persistence
    try {
      localStorage.setItem('uas_ca_live_events', JSON.stringify(newEvents));
    } catch (err) {
      console.error('Error saving to localStorage', err);
    }

    // 3. Disk API persistence via Vite server middleware
    try {
      await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEvents)
      });
    } catch (err) {
      console.warn('Could not persist to server disk, saved to localStorage', err);
    }
  };

  // URL routing for professor dossiers or dashboard
  useEffect(() => {
    const checkUrlParams = () => {
      const params = new URLSearchParams(window.location.search);
      const profParam = params.get('profesor');
      const dashParam = params.get('dashboard') || params.get('panel');

      if (dashParam === 'true') {
        setIsDashboardOpen(true);
        setSelectedProfessorId(null);
      } else if (profParam) {
        setSelectedProfessorId(profParam);
        setIsDashboardOpen(false);
      } else {
        setSelectedProfessorId(null);
        setIsDashboardOpen(false);
      }
    };

    checkUrlParams();
    window.addEventListener('popstate', checkUrlParams);
    return () => window.removeEventListener('popstate', checkUrlParams);
  }, []);

  const handleSelectProfessor = (id) => {
    setIsDashboardOpen(false);
    setSelectedProfessorId(id);
    const newUrl = `${window.location.pathname}?profesor=${id}`;
    window.history.pushState({ profesor: id }, '', newUrl);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHub = () => {
    setIsDashboardOpen(false);
    setSelectedProfessorId(null);
    window.history.pushState({}, '', window.location.pathname);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenDashboard = () => {
    setSelectedProfessorId(null);
    setIsDashboardOpen(true);
    const newUrl = `${window.location.pathname}?dashboard=true`;
    window.history.pushState({ dashboard: true }, '', newUrl);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExploreProfessors = () => {
    if (selectedProfessorId || isDashboardOpen) {
      handleBackToHub();
    }
    setTimeout(() => {
      const el = document.getElementById('investigadores');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 60);
  };

  const handleExplorePapers = () => {
    if (selectedProfessorId || isDashboardOpen) {
      handleBackToHub();
    }
    setTimeout(() => {
      const el = document.getElementById('publicaciones');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 60);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF8] text-[#1A1A1A]">
      {/* Barra de Navegación Principal */}
      <Navbar
        activeView={isDashboardOpen ? 'dashboard' : selectedProfessorId ? 'investigadores' : activeView}
        setActiveView={(view) => {
          if (isDashboardOpen || selectedProfessorId) {
            handleBackToHub();
          }
          setActiveView(view);
        }}
        onOpenDashboard={handleOpenDashboard}
      />

      {/* Contenido Principal */}
      <main style={{ flex: 1 }}>
        {isDashboardOpen ? (
          /* VISTA: DASHBOARD DE GESTIÓN DE EVENTOS EN VIVO */
          <Dashboard
            events={events}
            onUpdateEvents={handleUpdateEvents}
            onBackToLiveSite={handleBackToHub}
          />
        ) : selectedProfessorId ? (
          /* VISTA: EXPEDIENTE COMPLETO DEL INVESTIGADOR */
          <ProfessorDossierView
            professorId={selectedProfessorId}
            onBack={handleBackToHub}
            onSelectProfessor={handleSelectProfessor}
            onOpenCitation={(work) => setCitationWork(work)}
          />
        ) : (
          /* VISTA: PORTAL PRINCIPAL DEL CUERPO ACADÉMICO */
          <>
            <Hero
              onExploreProfessors={handleExploreProfessors}
              onExplorePapers={handleExplorePapers}
            />

            <ProfessorsSection
              onSelectProfessor={handleSelectProfessor}
            />

            <PublicationsHub
              onOpenCitation={(work) => setCitationWork(work)}
              onSelectProfessor={handleSelectProfessor}
            />

            <LgacSection />

            <EventsSection
              events={events}
              onOpenDashboard={handleOpenDashboard}
            />
          </>
        )}
      </main>

      {/* Modal de Citación Bibliográfica */}
      {citationWork && (
        <CitationModal
          work={citationWork}
          onClose={() => setCitationWork(null)}
        />
      )}

      {/* Pie de Página Oficial UAS */}
      <Footer />
    </div>
  );
}

export default App;
