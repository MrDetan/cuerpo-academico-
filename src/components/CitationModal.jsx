import React, { useState } from 'react';
import { X, Copy, Check, Quote } from 'lucide-react';

export const CitationModal = ({ work, onClose }) => {
  const [activeFormat, setActiveFormat] = useState('apa');
  const [copied, setCopied] = useState(false);

  if (!work) return null;

  const apaCitation = `${work.autores || 'Autor'} (${work.anio || 's.f.'}). ${work.titulo}. ${work.revista ? `${work.revista}, ${work.volumen}.` : ''}${work.editorial ? `${work.editorial}.` : ''} ${work.doi ? `https://doi.org/${work.doi}` : ''}`.trim();
  const chicagoCitation = `${work.autores || 'Autor'}. "${work.titulo}." ${work.revista ? `${work.revista} ${work.volumen}` : ''} (${work.anio || 's.f.'}). ${work.editorial ? `${work.editorial}.` : ''}`.trim();
  const bibtexCitation = work.bibtex || `@misc{uas_${work.id},
  title={${work.titulo}},
  author={${work.autores || 'Cuerpo Academico UAS'}},
  year={${work.anio || 2024}}
}`;

  const currentText = activeFormat === 'apa' 
    ? apaCitation 
    : activeFormat === 'chicago' 
      ? chicagoCitation 
      : bibtexCitation;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-top-accent" />

        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '1.25rem', paddingBottom: '0.85rem', borderBottom: '1px solid var(--border-light)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ padding: '8px', borderRadius: '6px', backgroundColor: 'var(--uas-blue-soft)', color: 'var(--uas-blue)', display: 'flex' }}>
              <Quote size={20} />
            </div>
            <div>
              <span className="small-caps" style={{ color: 'var(--gold)', display: 'block' }}>
                Citar Trabajo Académico
              </span>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', fontWeight: 600, lineHeight: 1.25 }}>
                Exportar Referencia Bibliográfica
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{ 
              width: '40px', 
              height: '40px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              color: 'var(--text-light)', 
              borderRadius: '6px',
              cursor: 'pointer' 
            }}
            aria-label="Cerrar modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Resumen del trabajo */}
        <div style={{ backgroundColor: 'var(--bg-subtle)', padding: '0.85rem 1rem', borderRadius: '6px', border: '1px solid var(--border-light)', marginBottom: '1rem' }}>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: '0.95rem', fontWeight: 600, marginBottom: '4px', lineHeight: 1.35 }}>
            {work.titulo}
          </p>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            {work.autores} • ({work.anio})
          </p>
        </div>

        {/* Selector de Formatos */}
        <div style={{ display: 'flex', gap: '6px', borderBottom: '1px solid var(--border-light)', marginBottom: '1rem', overflowX: 'auto', paddingBottom: '2px' }}>
          {[
            { id: 'apa', label: 'APA (7ma Ed.)' },
            { id: 'chicago', label: 'Chicago' },
            { id: 'bibtex', label: 'BibTeX (LaTeX)' }
          ].map(fmt => (
            <button
              key={fmt.id}
              onClick={() => setActiveFormat(fmt.id)}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                padding: '0.5rem 0.85rem',
                borderBottom: activeFormat === fmt.id ? '2px solid var(--gold)' : '2px solid transparent',
                color: activeFormat === fmt.id ? 'var(--gold)' : 'var(--text-light)',
                whiteSpace: 'nowrap',
                transition: 'all 150ms ease'
              }}
            >
              {fmt.label}
            </button>
          ))}
        </div>

        {/* Caja de Código */}
        <pre style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.78rem',
          backgroundColor: 'var(--bg-subtle)',
          padding: '1rem',
          borderRadius: '6px',
          border: '1px solid var(--border-light)',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-all',
          lineHeight: 1.6,
          maxHeight: '180px',
          overflowY: 'auto',
          marginBottom: '1.25rem'
        }}>
          {currentText}
        </pre>

        {/* Acciones */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
          <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-light)' }}>
            {activeFormat === 'bibtex' ? 'Compatible con Overleaf y Zotero' : 'Listo para copiar y pegar'}
          </span>

          <button
            onClick={handleCopy}
            className="btn-gold-action"
            style={{ padding: '0.6rem 1.25rem', fontSize: '0.85rem', width: 'auto' }}
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            <span>{copied ? '¡Copiado con Éxito!' : 'Copiar Cita'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
