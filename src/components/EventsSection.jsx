import React from 'react';
import { Calendar, Clock, MapPin, Settings } from 'lucide-react';
import { eventsData as fallbackEvents } from '../data/academicData';

export const EventsSection = ({ events, onOpenDashboard }) => {
  const eventsList = (Array.isArray(events) && events.length > 0) ? events : fallbackEvents;

  return (
    <section id="eventos" className="editorial-section events-section-wrap">
      <div className="hub-container">
        {/* Regla de Sección */}
        <div className="editorial-rule" style={{ maxWidth: '600px', margin: '0 auto 1.5rem auto' }}>
          <span>04 / Vinculación y Vida Académica</span>
        </div>

        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 2rem auto' }}>
          <h2 className="section-title">
            Coloquios, Seminarios y Foros Académicos
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.65, marginBottom: '1.25rem' }}>
            Espacios de discusión crítica organizados por los profesores del Cuerpo Académico en la Unidad Regional Norte, abiertos a estudiantes, investigadores y el público en general.
          </p>

          {/* Botón directo para ingresar al Dashboard de gestión de eventos */}
          {onOpenDashboard && (
            <button
              onClick={onOpenDashboard}
              className="btn-secondary-action events-dash-cta"
            >
              <Settings size={14} style={{ color: 'var(--gold)' }} />
              <span>Abrir Gestor de Eventos (Dashboard en Vivo)</span>
            </button>
          )}
        </div>

        {/* Rejilla Responsiva de Eventos */}
        <div className="events-grid">
          {eventsList.map((evento) => {
            const isUpcoming = evento.estado?.includes('Próximo') || evento.estado?.includes('Abierto');
            return (
              <div key={evento.id} className="event-card">
                <div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1rem',
                    paddingBottom: '0.6rem',
                    borderBottom: '1px solid var(--border-light)'
                  }}>
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.6875rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      backgroundColor: isUpcoming ? '#fef9e7' : 'var(--bg-muted)',
                      color: isUpcoming ? 'var(--gold)' : 'var(--text-light)',
                      border: isUpcoming ? '1px solid rgba(184, 134, 11, 0.3)' : 'none'
                    }}>
                      {evento.estado}
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-light)' }}>
                      {evento.modalidad?.split(' ')[0] || 'Evento'}
                    </span>
                  </div>

                  <h3 style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.2rem',
                    fontWeight: 600,
                    lineHeight: 1.35,
                    marginBottom: '0.85rem'
                  }}>
                    {evento.titulo}
                  </h3>

                  <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px', color: 'var(--text-main)', fontWeight: 600 }}>
                      <Calendar size={14} style={{ color: 'var(--uas-blue)' }} />
                      <span>{evento.fecha}</span>
                    </div>
                    {evento.hora && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                        <Clock size={14} style={{ color: 'var(--gold)' }} />
                        <span>{evento.hora}</span>
                      </div>
                    )}
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                      <MapPin size={14} style={{ color: 'var(--gold)', flexShrink: 0, marginTop: '2px' }} />
                      <span>{evento.sede}</span>
                    </div>
                  </div>

                  <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                    {evento.descripcion}
                  </p>
                </div>

                <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--border-light)', fontSize: '0.78rem' }}>
                  <div style={{ fontStyle: 'italic', color: 'var(--text-light)', marginBottom: '0.85rem' }}>
                    {evento.ponentePrincipal}
                  </div>
                  {isUpcoming ? (
                    <a
                      href="#contacto"
                      className="btn-primary-action event-register-btn"
                    >
                      Solicitar Registro / Enlace
                    </a>
                  ) : (
                    <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-light)', textAlign: 'center', padding: '0.35rem 0' }}>
                      Memoria del evento archivada
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
