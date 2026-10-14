import React, { useState, useEffect } from 'react';
import { BookOpen, Users, Calendar, Mail, FileText, Menu, X, Settings, ChevronRight } from 'lucide-react';

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

  // Close mobile drawer on desktop resize or Esc key
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

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
              <span className="top-bar-text top-bar-text-full">
                Universidad Autónoma de Sinaloa • Facultad de Derecho y Ciencia Política (Los Mochis)
              </span>
              <span className="top-bar-text top-bar-text-compact">
                UAS • Fac. Derecho y C. Política
              </span>
            </div>
            <div className="top-bar-right">
              <span className="top-bar-code">CLAVE: UAS-CA-318</span>
              <span className="top-bar-sep">•</span>
              <button
                onClick={onOpenDashboard}
                className="top-bar-dash-btn"
                title="Abrir Dashboard de Gestión para editar y subir eventos"
              >
                <Settings size={11} />
                <span>⚙️ Dashboard</span>
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
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleNavClick('hub')}
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
                <span className="brand-status-tag">
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

          {/* Acciones Rápidas & Botón de Menú Móvil */}
          <div className="navbar-actions-wrap">
            <button
              onClick={onOpenDashboard}
              className="btn-secondary-action nav-action-dash"
              title="Panel de administración de eventos"
            >
              <Settings size={13} style={{ color: 'var(--gold)' }} />
              <span>Gestor Eventos</span>
            </button>

            <button
              onClick={() => handleNavClick('publicaciones')}
              className="btn-gold-action nav-action-papers"
              title="Ir al catálogo de publicaciones y papers"
            >
              <FileText style={{ width: '13px', height: '13px' }} />
              <span>Ver Papers</span>
            </button>

            {/* Botón Hamburger / Toggle Móvil */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="navbar-mobile-toggle"
              aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Menú Móvil Desplegable (Drawer) */}
      {mobileOpen && (
        <div className="mobile-menu-drawer">
          <div className="hub-container" style={{ padding: '1rem' }}>
            {/* Lista de Enlaces de Navegación */}
            <nav className="mobile-nav-list">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = activeView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`mobile-nav-item ${isActive ? 'active' : ''}`}
                  >
                    <div className="mobile-nav-icon-wrap">
                      <IconComponent size={18} />
                    </div>
                    <span className="mobile-nav-label">{item.label}</span>
                    {isActive ? (
                      <span className="mobile-nav-active-pill">Actual</span>
                    ) : (
                      <ChevronRight size={16} className="mobile-nav-arrow" />
                    )}
                  </button>
                );
              })}
            </nav>

            <div className="mobile-menu-divider" />

            {/* Acciones Principales en Menú Móvil */}
            <div className="mobile-menu-actions">
              <button
                onClick={() => {
                  setMobileOpen(false);
                  onOpenDashboard();
                }}
                className="btn-primary-action mobile-action-btn"
              >
                <Settings size={16} />
                <span>⚙️ Dashboard de Eventos en Vivo</span>
              </button>

              <button
                onClick={() => handleNavClick('publicaciones')}
                className="btn-gold-action mobile-action-btn"
              >
                <FileText size={16} />
                <span>Explorar Repositorio de Papers</span>
              </button>
            </div>

            {/* Pie de Menú Móvil Institucional */}
            <div className="mobile-menu-footer">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                <span className="badge-uas-pill">UAS-CA-318</span>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-light)', fontFamily: 'var(--font-mono)' }}>
                  En Consolidación • PRODEP
                </span>
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                Facultad de Derecho y Ciencia Política • UAS Los Mochis
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
