import React, { useState } from 'react';
import { BookOpen, Users, Calendar, Mail, FileText, Menu, X, Settings } from 'lucide-react';

export const Navbar = ({ activeView, setActiveView, onOpenDashboard }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { id: 'hub', label: 'Inicio', icon: BookOpen },
    { id: 'investigadores', label: 'Investigadores', icon: Users },
    { id: 'publicaciones', label: 'Repositorio de Papers', icon: FileText },
    { id: 'lgac', label: 'Líneas de Investigación', icon: BookOpen },
    { id: 'eventos', label: 'Eventos y Coloquios', icon: Calendar },
    { id: 'contacto', label: 'Contacto', icon: Mail },
  ];

  const handleNavClick = (id) => {
    setActiveView(id);
    setMobileOpen(false);
    if (id !== 'hub') {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="main-navbar">
      {/* Franja Superior Institucional Oficial UAS */}
      <div className="top-institutional-bar">
        <div className="hub-container">
          <div className="top-bar-inner">
            <div className="top-bar-left">
              <span className="badge-uas-pill">UAS • URN</span>
              <span className="top-bar-text">
                Universidad Autónoma de Sinaloa • Facultad de Derecho y Ciencia Política (Los Mochis)
              </span>
            </div>
            <div className="top-bar-right">
              <span>CLAVE: UAS-CA-318</span>
              <span>•</span>
              <button
                onClick={onOpenDashboard}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  backgroundColor: '#041842',
                  color: '#F1C40F',
                  padding: '2px 8px',
                  borderRadius: '3px',
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                  border: '1px solid rgba(241, 196, 15, 0.4)',
                  cursor: 'pointer'
                }}
                title="Abrir Dashboard de Gestión para editar y subir eventos"
              >
                <Settings size={11} />
                <span>⚙️ Dashboard de Gestión</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Barra de Navegación Principal */}
      <div className="hub-container">
        <div className="navbar-inner">
          {/* Identidad del Cuerpo Académico */}
          <div 
            onClick={() => handleNavClick('hub')} 
            className="navbar-brand"
          >
            <div className="brand-crest-box">
              <img 
                src="./assets/uas_imago.png" 
                alt="Águila UAS" 
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
            <div className="brand-details">
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span className="brand-eyebrow">Cuerpo Académico UAS-CA-318</span>
                <span style={{ 
                  fontFamily: 'var(--font-mono)', 
                  fontSize: '0.62rem', 
                  backgroundColor: 'var(--bg-muted)', 
                  color: 'var(--text-light)', 
                  padding: '1px 5px', 
                  borderRadius: '3px',
                  textTransform: 'uppercase'
                }}>
                  En Consolidación
                </span>
              </div>
              <h2 className="brand-title">Estudios Políticos y Gobernanza</h2>
              <span className="brand-sub">Ciencia Política • Los Mochis, Sinaloa</span>
            </div>
          </div>

          {/* Menú de Enlaces Desktop */}
          <nav className="nav-links-desktop">
            {navItems.map((item) => {
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`nav-link-btn ${isActive ? 'active' : ''}`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Acción Rápida & Botón Móvil */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={onOpenDashboard}
              className="btn-secondary-action"
              style={{ padding: '0.45rem 0.85rem', fontSize: '0.78rem' }}
              title="Panel de administración de eventos"
            >
              <Settings size={13} style={{ color: 'var(--gold)' }} />
              <span className="hidden sm:inline">Gestor Eventos</span>
            </button>

            <button
              onClick={() => handleNavClick('publicaciones')}
              className="btn-gold-action"
              style={{ padding: '0.45rem 0.95rem', fontSize: '0.78rem' }}
            >
              <FileText style={{ width: '13px', height: '13px' }} />
              <span>Ver Papers</span>
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="btn-secondary-action"
              style={{ display: 'none', padding: '0.45rem', minHeight: 'unset' }}
              aria-label="Menú"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
