import React, { useState, useMemo } from 'react';
import { professorsData } from '../data/academicData';
import { Search, Quote, ExternalLink, FileText, ChevronDown, ChevronUp } from 'lucide-react';

export const PublicationsHub = ({ onOpenCitation, onSelectProfessor }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState('todos');
  const [selectedType, setSelectedType] = useState('todos');
  const [selectedYear, setSelectedYear] = useState('todos');
  const [expandedAbstracts, setExpandedAbstracts] = useState({});

  const allWorks = useMemo(() => {
    const list = [];
    professorsData.forEach((prof) => {
      prof.trabajos.forEach((work) => {
        list.push({
          ...work,
          authorId: prof.id,
          authorName: prof.nombreCompleto,
          authorShort: prof.tituloCorto,
          authorPhoto: prof.foto
        });
      });
    });
    const seen = new Set();
    const unique = [];
    for (const item of list) {
      if (!seen.has(item.id)) {
        seen.add(item.id);
        unique.push(item);
      }
    }
    return unique.sort((a, b) => (b.anio || 0) - (a.anio || 0));
  }, []);

  const years = useMemo(() => {
    return Array.from(new Set(allWorks.map(w => w.anio).filter(Boolean))).sort((a, b) => b - a);
  }, [allWorks]);

  const filteredWorks = useMemo(() => {
    return allWorks.filter((work) => {
      if (selectedAuthor !== 'todos' && work.authorId !== selectedAuthor) return false;
      if (selectedType !== 'todos' && work.tipo !== selectedType) return false;
      if (selectedYear !== 'todos' && String(work.anio) !== String(selectedYear)) return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = work.titulo?.toLowerCase().includes(q);
        const matchRevista = work.revista?.toLowerCase().includes(q) || work.editorial?.toLowerCase().includes(q);
        const matchResumen = work.resumen?.toLowerCase().includes(q);
        const matchAutores = work.autores?.toLowerCase().includes(q);
        if (!matchTitle && !matchRevista && !matchResumen && !matchAutores) return false;
      }
      return true;
    });
  }, [allWorks, selectedAuthor, selectedType, selectedYear, searchQuery]);

  const toggleAbstract = (id) => {
    setExpandedAbstracts(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="publicaciones" className="editorial-section publications-section-wrap">
      <div className="hub-container">
        {/* Regla de Sección */}
        <div className="editorial-rule" style={{ maxWidth: '600px', margin: '0 auto 1.5rem auto' }}>
          <span>02 / Repositorio y Trabajos de Investigación</span>
        </div>

        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 2.5rem auto' }}>
          <h2 className="section-title">
            Catálogo Unificado de Publicaciones y Papers
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.65 }}>
            Producción científica arbitrada del Cuerpo Académico en Ciencia Política. Consulta artículos indexados en JCR y Scopus, libros monográficos, proyectos de investigación y tesis dirigidas en la Universidad Autónoma de Sinaloa.
          </p>
        </div>

        {/* Barra de Filtros y Búsqueda */}
        <div className="search-control-bar">
          <div className="filter-grid">
            {/* Input de Búsqueda */}
            <div style={{ position: 'relative' }}>
              <Search size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
              <input
                type="text"
                placeholder="Buscar por título, palabra clave o revista..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-box"
                style={{ paddingLeft: '34px' }}
                aria-label="Buscar publicaciones"
              />
            </div>

            {/* Selector de Autor */}
            <div>
              <select
                value={selectedAuthor}
                onChange={(e) => setSelectedAuthor(e.target.value)}
                className="input-box"
                style={{ cursor: 'pointer' }}
                aria-label="Filtrar por autor"
              >
                <option value="todos">Todos los Investigadores</option>
                {professorsData.map(p => (
                  <option key={p.id} value={p.id}>{p.tituloCorto}</option>
                ))}
              </select>
            </div>

            {/* Selector de Tipo */}
            <div>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="input-box"
                style={{ cursor: 'pointer' }}
                aria-label="Filtrar por tipo"
              >
                <option value="todos">Todos los Tipos</option>
                <option value="Artículo">Artículos Arbitrados</option>
                <option value="Libro">Libros</option>
                <option value="Capítulo">Capítulos de Libro</option>
                <option value="Proyecto">Proyectos Financiados</option>
                <option value="Tesis">Tesis Dirigidas</option>
              </select>
            </div>

            {/* Selector de Año */}
            <div>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="input-box"
                style={{ cursor: 'pointer' }}
                aria-label="Filtrar por año"
              >
                <option value="todos">Todos los Años</option>
                {years.map(y => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="filter-info-row">
            <div>
              Mostrando <strong style={{ color: 'var(--text-main)' }}>{filteredWorks.length}</strong> trabajos académicos
            </div>
            {(searchQuery || selectedAuthor !== 'todos' || selectedType !== 'todos' || selectedYear !== 'todos') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedAuthor('todos');
                  setSelectedType('todos');
                  setSelectedYear('todos');
                }}
                className="filter-clear-btn"
              >
                Limpiar filtros
              </button>
            )}
          </div>
        </div>

        {/* Listado de Trabajos */}
        {filteredWorks.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3.5rem 1rem', backgroundColor: '#FFFFFF', border: '1px solid var(--border-light)', borderRadius: '8px' }}>
            <FileText size={36} style={{ color: 'var(--border-medium)', margin: '0 auto 1rem auto' }} />
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', marginBottom: '0.5rem' }}>
              No se encontraron publicaciones coincidentes
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-light)' }}>
              Intenta flexibilizar los términos de búsqueda o cambiar los filtros.
            </p>
          </div>
        ) : (
          <div>
            {filteredWorks.map((work) => {
              const isExpanded = !!expandedAbstracts[work.id];
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

                    {/* Chip del Autor */}
                    <button
                      onClick={() => onSelectProfessor(work.authorId)}
                      className="paper-author-chip"
                      title={`Ver ficha completa de ${work.authorName}`}
                    >
                      <img
                        src={work.authorPhoto}
                        alt=""
                        style={{ width: '18px', height: '18px', borderRadius: '50%', objectFit: 'cover' }}
                      />
                      <span style={{ fontWeight: 600 }}>{work.authorShort}</span>
                    </button>
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

                  {work.resumen && (
                    <div style={{ marginTop: '0.5rem' }}>
                      <button
                        onClick={() => toggleAbstract(work.id)}
                        className="btn-text-action"
                        style={{ padding: '0.3rem 0', color: 'var(--gold)', fontWeight: 600 }}
                      >
                        <span>{isExpanded ? 'Ocultar Resumen' : 'Ver Resumen'}</span>
                        {isExpanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                      </button>
                      {isExpanded && (
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
                      {work.bibtex && (
                        <button
                          onClick={() => onOpenCitation(work)}
                          className="btn-text-action"
                          style={{ color: 'var(--gold)', fontFamily: 'var(--font-mono)' }}
                        >
                          <Quote size={13} />
                          <span>Citar</span>
                        </button>
                      )}

                      {work.enlace && work.enlace !== '#' && (
                        <a
                          href={work.enlace}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-secondary-action"
                          style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem' }}
                        >
                          <span>Documento</span>
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
  );
};
