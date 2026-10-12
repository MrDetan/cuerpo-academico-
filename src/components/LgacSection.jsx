import React from 'react';
import { academicBodyData } from '../data/academicData';
import { Compass } from 'lucide-react';

export const LgacSection = () => {
  return (
    <section id="lgac" style={{ padding: '4.5rem 0', borderBottom: '1px solid var(--border-light)', backgroundColor: '#FFFFFF' }}>
      <div className="hub-container">
        {/* Regla de Sección */}
        <div className="editorial-rule" style={{ maxWidth: '600px', margin: '0 auto 1.5rem auto' }}>
          <span>03 / Marco Científico y Disciplinar</span>
        </div>

        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 2.5rem auto' }}>
          <h2 className="section-title">
            Líneas de Generación y Aplicación del Conocimiento (LGAC)
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.65 }}>
            El Cuerpo Académico orienta su quehacer en tres ejes temáticos estratégicos dictaminados y avalados por el Programa para el Desarrollo Profesional Docente (PRODEP).
          </p>
        </div>

        {/* Rejilla de LGACs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '2rem' }}>
          {academicBodyData.lgac.map((linea) => (
            <div
              key={linea.id}
              style={{
                backgroundColor: 'var(--bg-subtle)',
                border: '1px solid var(--border-light)',
                borderRadius: '8px',
                padding: '1.75rem',
                borderTop: '3px solid var(--gold)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: 'var(--shadow-card)'
              }}
            >
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
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    color: 'var(--gold)'
                  }}>
                    {linea.codigo}
                  </span>
                  <Compass size={16} style={{ color: 'var(--uas-blue)', opacity: 0.8 }} />
                </div>

                <h3 style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.2rem',
                  fontWeight: 600,
                  lineHeight: 1.35,
                  marginBottom: '0.75rem'
                }}>
                  {linea.titulo}
                </h3>

                <p style={{
                  fontSize: '0.875rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1.6,
                  marginBottom: '1.5rem'
                }}>
                  {linea.descripcion}
                </p>
              </div>

              <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--border-light)' }}>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--text-main)',
                  marginBottom: '0.5rem'
                }}>
                  Proyectos Clave en Desarrollo:
                </div>
                <ul style={{ listStyle: 'none', fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  {linea.proyectosClave.map((proy, pIdx) => (
                    <li key={pIdx} style={{ position: 'relative', paddingLeft: '0.85rem', marginBottom: '0.4rem' }}>
                      <span style={{ position: 'absolute', left: 0, color: 'var(--gold)', fontWeight: 'bold' }}>•</span>
                      <span>{proy}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
