import React, { useState } from 'react';
import { professorsData } from '../data/academicData';
import { 
  ArrowLeft, Award, ExternalLink, FileText, 
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
    <article className="dossier-article">
      {/* Barra de Navegación del Dossier */}
      <div className="dossier-top-nav">
        <div className="hub-container">
          <div className="dossier-top-nav-inner">
            <div className="dossier-nav-left">
              <button
                onClick={onBack}
                className="btn-secondary-action dossier-back-btn"
              >
                <ArrowLeft size={14} />
                <span className="dossier-back-btn-text">Volver al HUB General</span>
                <span className="dossier-back-btn-short">Volver</span>
              </button>
              <span className="dossier-nav-sep">|</span>
              <span className="dossier-breadcrumb">
                Expediente Curricular de Investigación
              </span>
            </div>

            <div className="dossier-nav-right">
              {otherProfessor && (
                <button
                  onClick={() => onSelectProfessor(otherProfessor.id)}
                  className="btn-secondary-action dossier-switch-btn"
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
                <span className="dossier-action-label">{copiedLink ? 'Copiado' : 'Compartir'}</span>
              </button>

              <button
                onClick={() => window.print()}
                className="btn-secondary-action dossier-print-btn"
                title="Imprimir expediente"
              >
                <Printer size={13} />
                <span className="dossier-action-label">Imprimir</span>
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
            <div className="dossier-left-col">
              <img
                src={professor.foto}
                alt={professor.nombreCompleto}
                className="dossier-portrait"
              />

              <div className="dossier-badges-wrap">
                <span className="snii-badge">
                  <Award size={12} />
                  <span>{professor.snii}</span>
                </span>
                <span className="prodep-badge">
                  <span>{professor.prodep}</span>
                </span>
              </div>

              {/* Caja de Contacto */}
              <div className="dossier-contact-box">
                <div className="dossier-contact-header">
                  Ficha de Contacto
                </div>

                <div className="dossier-contact-item">
                  <Mail size={14} style={{ color: 'var(--gold)', flexShrink: 0, marginTop: '3px' }} />
                  <a href={`mailto:${professor.email}`} style={{ color: 'var(--text-main)', wordBreak: 'break-all' }}>
                    {professor.email}
                  </a>
                </div>

                <div className="dossier-contact-item">
                  <MapPin size={14} style={{ color: 'var(--gold)', flexShrink: 0, marginTop: '3px' }} />
                  <span>Facultad de Derecho y Ciencia Política, UAS Unidad Regional Norte, Los Mochis, Sin.</span>
                </div>

                <div className="dossier-orcid-wrap">
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
            <div className="dossier-right-col">
              <span className="small-caps" style={{ color: 'var(--gold)' }}>
                Cuerpo Académico UAS-CA-318
              </span>
              <h1 className="dossier-prof-name">
                {professor.nombreCompleto}
              </h1>
              <div className="dossier-prof-role">
                {professor.cargo}
              </div>

              {/* Biografía */}
              <div className="dossier-bio-text">
                {professor.biografia}
              </div>

              {/* Formación Académica */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 className="dossier-sub-title">
                  <GraduationCap size={18} style={{ color: 'var(--uas-blue)' }} />
                  <span>Formación Académica</span>
                </h3>

                <div className="dossier-education-grid">
                  {professor.educacion.map((edu, idx) => (
                    <div key={idx} className="dossier-edu-card">
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
                <h3 className="dossier-sub-title">
                  <Award size={18} style={{ color: 'var(--gold)' }} />
                  <span>Reconocimientos y Distinciones</span>
                </h3>
                <ul className="dossier-distinciones-list">
                  {professor.distinciones.map((dist, dIdx) => (
                    <li key={dIdx}>
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
      <section style={{ paddingTop: '2.5rem' }}>
        <div className="hub-container">
          <div className="editorial-rule" style={{ marginBottom: '1.75rem' }}>
            <span>Catálogo Completo de Producción Científica</span>
          </div>

          <div className="dossier-catalog-header">
            <div>
              <h2 className="section-title">Trabajos y Proyectos de Investigación</h2>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-light)', textTransform: 'uppercase' }}>
                Mostrando {filteredWorks.length} de {professor.trabajos.length} registros profesionales
              </div>
            </div>

            {/* Búsqueda y Año */}
            <div className="dossier-filter-row">
              <div style={{ position: 'relative', flex: '1 1 200px' }}>
                <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                <input
                  type="text"
                  placeholder="Buscar en trabajos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-box"
                  style={{ paddingLeft: '32px' }}
                  aria-label="Buscar en trabajos"
                />
              </div>

              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="input-box dossier-year-select"
                aria-label="Filtrar por año"
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
                <span className="dossier-tab-count">
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
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
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
                          style={{ padding: '0.3rem 0', color: 'var(--gold)', fontWeight: 600 }}
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
                      <div className="paper-citations-info">
                        {work.doi && (
                          <span className="paper-doi-wrap">DOI: <a href={work.enlace} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--uas-blue)' }}>{work.doi}</a></span>
                        )}
                        {work.citas && (
                          <span className="paper-citas-badge">Citas: {work.citas}</span>
                        )}
                      </div>

                      <div className="paper-action-btns">
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
