import React from 'react';
import { professorsData } from '../data/academicData';
import { Award, BookOpen, ExternalLink, Mail, ArrowRight } from 'lucide-react';

export const ProfessorsSection = ({ onSelectProfessor }) => {
  return (
    <section id="investigadores" className="editorial-section professors-section-wrap">
      <div className="hub-container">
        {/* Regla de Sección */}
        <div className="editorial-rule" style={{ maxWidth: '600px', margin: '0 auto 1.5rem auto' }}>
          <span>01 / Personal Académico e Investigadores</span>
        </div>

        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 2.5rem auto' }}>
          <h2 className="section-title">
            Investigadores de Ciencia Política en Los Mochis
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.65 }}>
            Profesores investigadores de tiempo completo adscritos a la Facultad de Derecho y Ciencia Política, reconocidos por el Sistema Nacional de Investigadoras e Investigadores (SNII) y con Perfil Deseable PRODEP. Haz clic en su ficha para consultar su expediente completo de trabajos.
          </p>
        </div>

        {/* Rejilla de las 2 Fichas */}
        <div className="professors-grid">
          {professorsData.map((prof) => (
            <div key={prof.id} className="professor-card">
              <div>
                {/* Meta superior e icono de nueva pestaña */}
                <div className="prof-top-meta">
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <span className="snii-badge">
                      <Award size={13} />
                      <span>{prof.snii}</span>
                    </span>
                    <span className="prodep-badge">
                      <span>{prof.prodep}</span>
                    </span>
                  </div>

                  <a
                    href={`?profesor=${prof.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Abrir expediente en nueva pestaña del navegador"
                    className="prof-new-tab-link"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span>Nueva pestaña</span>
                    <ExternalLink size={12} />
                  </a>
                </div>

                {/* Retrato y Datos Principales */}
                <div className="prof-header-flex">
                  <img
                    src={prof.foto}
                    alt={prof.nombreCompleto}
                    className="prof-avatar"
                  />
                  <div className="prof-header-info">
                    <h3 className="prof-name">{prof.nombreCompleto}</h3>
                    <div className="prof-role">{prof.cargo}</div>
                    <p className="prof-bio-brief">{prof.resumen}</p>
                  </div>
                </div>

                {/* Líneas de Investigación */}
                <div className="prof-lines-box">
                  <div className="lines-header">
                    <BookOpen size={13} style={{ color: 'var(--gold)' }} />
                    <span>Líneas de Especialización</span>
                  </div>
                  <ul className="lines-list">
                    {prof.lineasInvestigacion.map((linea, idx) => (
                      <li key={idx}>{linea}</li>
                    ))}
                  </ul>
                </div>

                {/* Resumen Numérico */}
                <div className="prof-stats-bar">
                  <div className="prof-stat-col">
                    <div className="prof-stat-val">
                      {prof.trabajos.filter(t => t.tipo === 'Artículo').length}
                    </div>
                    <div className="prof-stat-lbl">Artículos</div>
                  </div>
                  <div className="prof-stat-col prof-stat-col-center">
                    <div className="prof-stat-val">
                      {prof.trabajos.filter(t => t.tipo === 'Libro' || t.tipo === 'Capítulo').length}
                    </div>
                    <div className="prof-stat-lbl">Libros/Cap.</div>
                  </div>
                  <div className="prof-stat-col">
                    <div className="prof-stat-val">
                      {prof.citasTotales}+
                    </div>
                    <div className="prof-stat-lbl">Citas Acad.</div>
                  </div>
                </div>
              </div>

              {/* Botón de Expediente */}
              <div className="prof-card-footer">
                <div className="prof-contact-meta">
                  <a 
                    href={`mailto:${prof.email}`} 
                    className="prof-contact-link"
                  >
                    <Mail size={13} />
                    <span>Contacto</span>
                  </a>
                  <span>•</span>
                  <span>ORCID: {prof.orcid.slice(-9)}</span>
                </div>

                <button
                  onClick={() => onSelectProfessor(prof.id)}
                  className="btn-gold-action prof-dossier-btn"
                >
                  <span>Ver Expediente Completo</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
