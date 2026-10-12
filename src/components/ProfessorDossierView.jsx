import React, { useState } from 'react';
import { professorsData } from '../data/academicData';
import { 
  ArrowLeft, Award, BookOpen, ExternalLink, FileText, 
  GraduationCap, Mail, MapPin, Share2, Quote, Search, 
  Printer, Check, ChevronDown, ChevronUp, Users 
} from 'lucide-react';

export const ProfessorDossierView = ({ professorId, onBack, onSelectProfessor, onOpenCitation }) => {
  const professor = professorsData.find(p => p.id === professorId) || professorsData[0];
  const otherProfessor = professorsData.find(p => p.id !== professor.id);

  const [activeTab, setActiveTab] = useState('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('todos');
  const [expandedAbstracts, setExpandedAbstracts] = useState({});
  const [copiedLink, setCopiedLink] = useState(false);

  // Filter works by tab, search and year
  const filteredWorks = professor.trabajos.filter((work) => {
    if (activeTab === 'articulos' && work.tipo !== 'Artículo') return false;
    if (activeTab === 'libros' && work.tipo !== 'Libro' && work.tipo !== 'Capítulo') return false;
    if (activeTab === 'proyectos' && work.tipo !== 'Proyecto') return false;
    if (activeTab === 'tesis' && work.tipo !== 'Tesis') return false;
    if (activeTab === 'conferencias' && work.tipo !== 'Conferencia') return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = work.titulo?.toLowerCase().includes(q);
      const matchRevista = work.revista?.toLowerCase().includes(q) || work.editorial?.toLowerCase().includes(q);
      const matchResumen = work.resumen?.toLowerCase().includes(q);
      const matchEstudiante = work.estudiante?.toLowerCase().includes(q);
      if (!matchTitle && !matchRevista && !matchResumen && !matchEstudiante) return false;
    }

    if (selectedYear !== 'todos') {
      if (work.anio && String(work.anio) !== String(selectedYear)) return false;
    }

    return true;
  });

  const availableYears = Array.from(
    new Set(professor.trabajos.map(w => w.anio).filter(Boolean))
  ).sort((a, b) => b - a);

  const toggleAbstract = (workId) => {
    setExpandedAbstracts(prev => ({
      ...prev,
      [workId]: !prev[workId]
    }));
  };

  const handleCopyLink = () => {
    const url = `${window.location.origin}${window.location.pathname}?profesor=${professor.id}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <article style={{ minHeight: '100vh', backgroundColor: 'var(--bg-page)', paddingBottom: '5rem' }}>
      {/* Barra de Navegación del Dossier */}
      <div className="dossier-top-nav">
        <div className="hub-container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button
                onClick={onBack}
                className="btn-secondary-action"
                style={{ padding: '0.45rem 0.85rem', fontSize: '0.8125rem' }}
              >
                <ArrowLeft size={14} />
                <span>Volver al HUB General</span>
              </button>
              <span style={{ color: 'var(--border-medium)' }}>|</span>
              <span style={{ fontSize: '0.8125rem', color: 'var(--text-light)', fontFamily: 'var(--font-mono)' }}>
                Expediente Curricular de Investigación
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {otherProfessor && (
                <button
                  onClick={() => onSelectProfessor(otherProfessor.id)}
                  className="btn-secondary-action"
                  style={{ padding: '0.45rem 0.85rem', fontSize: '0.8125rem', color: 'var(--uas-blue)' }}
                >
                  <Users size={13} />
                  <span>Ver a {otherProfessor.tituloCorto}</span>
                </button>
              )}

              <button
                onClick={handleCopyLink}
                className="btn-secondary-action"
                style={{ padding: '0.45rem 0.75rem', fontSize: '0.8125rem' }}
                title="Copiar enlace directo"
              >
                {copiedLink ? <Check size={13} style={{ color: 'green' }} /> : <Share2 size={13} />}
                <span>{copiedLink ? 'Copiado' : 'Compartir'}</span>
              </button>

              <button
                onClick={() => window.print()}
                className="btn-secondary-action"
                style={{ padding: '0.45rem 0.75rem', fontSize: '0.8125rem' }}
                title="Imprimir expediente"
              >
                <Printer size={13} />
                <span>Imprimir</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cabecera del Investigador */}
      <section className="dossier-header-section">
        <div className="hub-container">
          <div className="dossier-grid">
            {/* Columna Izquierda: Retrato y Contacto */}
            <div>
              <img
                src={professor.foto}
                alt={professor.nombreCompleto}
                className="dossier-portrait"
              />

              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                <span className="snii-badge">
                  <Award size={12} />
                  <span>{professor.snii}</span>
                </span>
                <span className="prodep-badge">
                  <span>{professor.prodep}</span>
                </span>
              </div>

              {/* Caja de Contacto */}
              <div style={{
                backgroundColor: 'var(--bg-subtle)',
                border: '1px solid var(--border-light)',
                borderRadius: '8px',
                padding: '1.25rem',
                fontSize: '0.8125rem'
              }}>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: 'var(--gold)',
                  letterSpacing: '0.1em',
                  marginBottom: '0.75rem',
                  borderBottom: '1px solid var(--border-light)',
                  paddingBottom: '0.4rem'
                }}>
                  Ficha de Contacto
                </div>

                <div style={{ display: 'flex', gap: '8px', marginBottom: '0.6rem', color: 'var(--text-muted)' }}>
                  <Mail size={14} style={{ color: 'var(--gold)', flexShrink: 0, marginTop: '3px' }} />
                  <a href={`mailto:${professor.email}`} style={{ color: 'var(--text-main)', wordBreak: 'break-all' }}>
                    {professor.email}
                  </a>
                </div>

                <div style={{ display: 'flex', gap: '8px', marginBottom: '0.75rem', color: 'var(--text-muted)' }}>
                  <MapPin size={14} style={{ color: 'var(--gold)', flexShrink: 0, marginTop: '3px' }} />
                  <span>Facultad de Derecho y Ciencia Política, UAS Unidad Regional Norte, Los Mochis, Sin.</span>
                </div>

                <div style={{
                  paddingTop: '0.6rem',
                  borderTop: '1px solid var(--border-light)',
                  fontFamily: 'var(--font-mono)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <span style={{ color: 'var(--text-light)' }}>ORCID:</span>
                  <a 
                    href={`https://orcid.org/${professor.orcid}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ color: 'var(--uas-blue)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '3px' }}
                  >
                    <span>{professor.orcid}</span>
                    <ExternalLink size={11} />
                  </a>
                </div>
              </div>
            </div>

            {/* Columna Derecha: Biografía, Grados y Distinciones */}
            <div>
              <span className="small-caps" style={{ color: 'var(--gold)' }}>
                Cuerpo Académico UAS-CA-318
              </span>
              <h1 style={{ 
                fontFamily: 'var(--font-serif)', 
                fontSize: '2.4rem', 
                fontWeight: 600, 
                lineHeight: 1.25, 
                margin: '0.35rem 0 0.5rem 0' 
              }}>
                {professor.nombreCompleto}
              </h1>
              <div style={{ 
                fontSize: '0.95rem', 
                fontWeight: 600, 
                color: 'var(--uas-blue)', 
                marginBottom: '1.25rem' 
              }}>
                {professor.cargo}
              </div>

              {/* Biografía */}
              <div style={{ 
                fontSize: '0.9375rem', 
                color: 'var(--text-muted)', 
                lineHeight: 1.75, 
                borderLeft: '2px solid var(--gold)', 
                paddingLeft: '1rem', 
                marginBottom: '2rem',
                whiteSpace: 'pre-line'
              }}>
                {professor.biografia}
              </div>

              {/* Formación Académica */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ 
                  fontFamily: 'var(--font-serif)', 
                  fontSize: '1.2rem', 
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <GraduationCap size={18} style={{ color: 'var(--uas-blue)' }} />
                  <span>Formación Académica</span>
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                  {professor.educacion.map((edu, idx) => (
                    <div 
                      key={idx} 
                      style={{ 
                        backgroundColor: 'var(--bg-subtle)', 
                        border: '1px solid var(--border-light)', 
                        borderRadius: '8px', 
                        padding: '1rem' 
                      }}
                    >
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--gold)', fontWeight: 700, marginBottom: '4px' }}>
                        {edu.anio}
                      </div>
                      <div style={{ fontFamily: 'var(--font-serif)', fontSize: '0.95rem', fontWeight: 600, marginBottom: '4px', lineHeight: 1.3 }}>
                        {edu.grado}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        {edu.institucion}
                      </div>
                      {edu.distincion && (
                        <div style={{ 
                          fontSize: '0.6875rem', 
                          fontFamily: 'var(--font-mono)', 
                          color: '#0e6251', 
                          backgroundColor: '#e8f8f5', 
                          padding: '2px 6px', 
                          borderRadius: '3px', 
                          display: 'inline-block',
                          marginTop: '6px'
                        }}>
                          {edu.distincion}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Reconocimientos */}
              <div>
                <h3 style={{ 
                  fontFamily: 'var(--font-serif)', 
                  fontSize: '1.2rem', 
                  marginBottom: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <Award size={18} style={{ color: 'var(--gold)' }} />
                  <span>Reconocimientos y Distinciones</span>
                </h3>
                <ul style={{ listStyle: 'none', fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  {professor.distinciones.map((dist, dIdx) => (
                    <li key={dIdx} style={{ position: 'relative', paddingLeft: '1.2rem', marginBottom: '0.35rem' }}>
                      <span style={{ position: 'absolute', left: 0, color: 'var(--gold)', fontWeight: 'bold' }}>•</span>
                      <span>{dist}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Catálogo de Trabajos del Investigador */}
      <section style={{ paddingTop: '3rem' }}>
        <div className="hub-container">
          <div className="editorial-rule" style={{ marginBottom: '2rem' }}>
            <span>Catálogo Completo de Producción Científica</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <h2 className="section-title">Trabajos y Proyectos de Investigación</h2>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-light)', textTransform: 'uppercase' }}>
                Mostrando {filteredWorks.length} de {professor.trabajos.length} registros profesionales
              </div>
            </div>

            {/* Búsqueda y Año */}
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ position: 'relative', minWidth: '220px' }}>
                <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                <input
                  type="text"
                  placeholder="Buscar en trabajos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-box"
                  style={{ paddingLeft: '32px' }}
                />
              </div>

              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="input-box"
                style={{ width: 'auto', cursor: 'pointer' }}
              >
                <option value="todos">Todos los Años</option>
                {availableYears.map(yr => (
                  <option key={yr} value={yr}>{yr}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Sub-Pestañas de Categoría */}
          <div className="dossier-tab-bar">
            {[
              { id: 'todos', label: 'Todos', count: professor.trabajos.length },
              { id: 'articulos', label: 'Artículos Indexados', count: professor.trabajos.filter(w => w.tipo === 'Artículo').length },
              { id: 'libros', label: 'Libros y Capítulos', count: professor.trabajos.filter(w => w.tipo === 'Libro' || w.tipo === 'Capítulo').length },
              { id: 'proyectos', label: 'Proyectos Financiados', count: professor.trabajos.filter(w => w.tipo === 'Proyecto').length },
              { id: 'tesis', label: 'Dirección de Tesis', count: professor.trabajos.filter(w => w.tipo === 'Tesis').length },
              { id: 'conferencias', label: 'Conferencias', count: professor.trabajos.filter(w => w.tipo === 'Conferencia').length },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`dossier-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              >
                <span>{tab.label}</span>
                <span style={{ 
                  backgroundColor: 'var(--bg-muted)', 
                  padding: '1px 6px', 
                  borderRadius: '10px', 
                  fontSize: '0.65rem',
                  fontFamily: 'var(--font-mono)'
                }}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Listado de Trabajos */}
          {filteredWorks.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3.5rem 1rem', backgroundColor: '#FFFFFF', border: '1px solid var(--border-light)', borderRadius: '8px' }}>
              <FileText size={36} style={{ color: 'var(--border-medium)', margin: '0 auto 1rem auto' }} />
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                No se encontraron trabajos con los criterios seleccionados
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>
                Intenta borrando el texto de búsqueda o cambiando de categoría.
              </p>
            </div>
          ) : (
            <div>
              {filteredWorks.map((work) => {
                const isAbstractExpanded = !!expandedAbstracts[work.id];
                return (
                  <div key={work.id} className="paper-item-card">
                    <div className="paper-header">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span className="type-pill">
                          {work.tipoDetalle || work.tipo}
                        </span>
                        {work.anio && (
                          <span className="paper-year">
                            {work.anio}
                          </span>
                        )}
                      </div>

                      {work.bibtex && (
                        <button
                          onClick={() => onOpenCitation(work)}
                          className="btn-text-action"
                          title="Citar este trabajo en formato APA o BibTeX"
                        >
                          <Quote size={13} style={{ color: 'var(--gold)' }} />
                          <span>Citar trabajo</span>
                        </button>
                      )}
                    </div>

                    <h3 className="paper-title">{work.titulo}</h3>

                    {work.autores && (
                      <div className="paper-meta">
                        <strong>Autores:</strong> {work.autores}
                      </div>
                    )}

                    {work.revista && (
                      <div className="paper-meta" style={{ fontStyle: 'italic' }}>
                        {work.revista}, {work.volumen}.
                      </div>
                    )}

                    {work.editorial && (
                      <div className="paper-meta">
                        Editorial: <em>{work.editorial}</em> ({work.lugar}). {work.paginas}.
                      </div>
                    )}

                    {work.institucionFinanciadora && (
                      <div className="paper-meta">
                        <strong>Financiamiento:</strong> {work.institucionFinanciadora} • <strong>Vigencia:</strong> {work.periodo} • <strong>Rol:</strong> {work.rol}
                      </div>
                    )}

                    {work.estudiante && (
                      <div className="paper-meta">
                        <strong>Tesista:</strong> {work.estudiante} • {work.programa} {work.distincion && `(${work.distincion})`}
                      </div>
                    )}

                    {/* Resumen desplegable */}
                    {work.resumen && (
                      <div style={{ marginTop: '0.5rem' }}>
                        <button
                          onClick={() => toggleAbstract(work.id)}
                          className="btn-text-action"
                          style={{ padding: '0.2rem 0', color: 'var(--gold)', fontWeight: 600 }}
                        >
                          <span>{isAbstractExpanded ? 'Ocultar Resumen' : 'Ver Resumen / Abstract'}</span>
                          {isAbstractExpanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                        </button>

                        {isAbstractExpanded && (
                          <div style={{
                            backgroundColor: 'var(--bg-subtle)',
                            border: '1px solid var(--border-light)',
                            borderRadius: '6px',
                            padding: '1rem',
                            marginTop: '0.5rem',
                            fontSize: '0.85rem',
                            color: 'var(--text-muted)',
                            lineHeight: 1.6,
                            fontStyle: 'italic'
                          }}>
                            {work.resumen}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Pie de Trabajo */}
                    <div className="paper-footer">
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-light)' }}>
                        {work.doi && (
                          <span>DOI: <a href={work.enlace} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--uas-blue)' }}>{work.doi}</a></span>
                        )}
                        {work.citas && (
                          <span style={{ marginLeft: '12px', fontWeight: 600, color: 'var(--text-main)' }}>Citas: {work.citas}</span>
                        )}
                      </div>

                      {work.enlace && work.enlace !== '#' && (
                        <a
                          href={work.enlace}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-secondary-action"
                          style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem' }}
                        >
                          <span>Acceso al Documento</span>
                          <ExternalLink size={12} />
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </article>
  );
};
