import React from 'react';
import { academicBodyData } from '../data/academicData';
import { BookOpen, Users } from 'lucide-react';

export const Hero = ({ onExploreProfessors, onExplorePapers }) => {
  return (
    <section className="hero-section">
      {/* Resplandor ambiental de fondo */}
      <div 
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '500px',
          height: '250px',
          borderRadius: '50%',
          backgroundColor: 'rgba(184, 134, 11, 0.04)',
          filter: 'blur(90px)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div className="hub-container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Filete Editorial Superior */}
        <div className="editorial-rule" style={{ maxWidth: '640px', margin: '0 auto 1.75rem auto' }}>
          <span>{academicBodyData.institucion} • {academicBodyData.zona}</span>
        </div>

        {/* Insignia Institucional Central */}
        <div className="hero-badge-wrap">
          <span style={{ 
            width: '8px', 
            height: '8px', 
            borderRadius: '50%', 
            backgroundColor: 'var(--gold)',
            display: 'inline-block' 
          }} />
          <strong style={{ color: 'var(--uas-blue)' }}>{academicBodyData.codigo}</strong>
          <span style={{ color: 'var(--border-medium)' }}>|</span>
          <span style={{ color: 'var(--text-muted)' }}>{academicBodyData.grado}</span>
        </div>

        {/* Titular Serif Principal (Con espacio seguro entre líneas) */}
        <h1 className="hero-headline" style={{ maxWidth: '920px', margin: '0 auto 1.5rem auto' }}>
          Investigación en Ciencia Política, Democracia y Gobernanza Regional
        </h1>

        {/* Subtítulo Descriptivo */}
        <p className="hero-subtitle">
          Unidad de investigación de la <strong>Facultad de Derecho y Ciencia Política en Los Mochis</strong>. Dedicada al análisis sistemático de las instituciones electorales, la rendición de cuentas y las políticas públicas locales en el estado de Sinaloa.
        </p>

        {/* Botones de Llamada a la Acción */}
        <div className="hero-actions">
          <button
            onClick={onExploreProfessors}
            className="btn-primary-action"
          >
            <Users size={16} />
            <span>Conocer a los Profesores Investigadores</span>
          </button>
          
          <button
            onClick={onExplorePapers}
            className="btn-secondary-action"
          >
            <BookOpen size={16} style={{ color: 'var(--gold)' }} />
            <span>Explorar Trabajos y Papers</span>
          </button>
        </div>

        {/* Cifras y Estadísticas Clave */}
        <div className="hero-stats-grid">
          {academicBodyData.metricas.map((stat, idx) => (
            <div key={idx} className="stat-item">
              <div className="stat-number">
                {stat.numero}
              </div>
              <div className="stat-label">
                {stat.etiqueta}
              </div>
              <p className="stat-desc">
                {stat.descripcion}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
