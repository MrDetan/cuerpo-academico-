import React from 'react';
import { academicBodyData } from '../data/academicData';
import { Mail, MapPin, Phone, ExternalLink } from 'lucide-react';

export const Footer = () => {
  return (
    <footer id="contacto" className="editorial-footer">
      <div className="hub-container">
        <div className="footer-grid">
          {/* Identidad Institucional */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '6px', backgroundColor: '#FFFFFF', padding: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img
                  src="./assets/uas_imago.png"
                  alt="UAS"
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </div>
              <div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--uas-gold)', fontWeight: 700, display: 'block' }}>
                  Universidad Autónoma de Sinaloa
                </span>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: '#FFFFFF', fontWeight: 600 }}>
                  Facultad de Derecho y Ciencia Política
                </h4>
                <div style={{ fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.6)' }}>
                  Unidad Regional Norte • Los Mochis, Sinaloa
                </div>
              </div>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.75)', lineHeight: 1.6, maxWidth: '440px' }}>
              <strong>{academicBodyData.codigo}</strong> — {academicBodyData.nombre}. Portal académico para la consulta abierta y difusión de la producción científica y perfiles de investigación.
            </p>

            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--uas-gold)' }}>
              <em>"Sursum Versus • Hacia la Cúspide"</em>
            </div>
          </div>

          {/* Enlaces Rápidos */}
          <div style={{ fontSize: '0.8125rem' }}>
            <h5 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--uas-gold)', fontWeight: 700, marginBottom: '0.85rem' }}>
              Secciones del HUB
            </h5>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', color: 'rgba(255, 255, 255, 0.8)' }}>
              <li><a href="#investigadores" style={{ color: 'inherit' }}>Investigadores de Ciencia Política</a></li>
              <li><a href="#publicaciones" style={{ color: 'inherit' }}>Repositorio de Papers y Libros</a></li>
              <li><a href="#lgac" style={{ color: 'inherit' }}>Líneas de Investigación (PRODEP)</a></li>
              <li><a href="#eventos" style={{ color: 'inherit' }}>Coloquios y Seminarios</a></li>
            </ul>

            <div style={{ marginTop: '1.25rem' }}>
              <h5 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--uas-gold)', fontWeight: 700, marginBottom: '0.5rem' }}>
                Enlaces Oficiales
              </h5>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', color: 'rgba(255, 255, 255, 0.6)' }}>
                <a href="https://uas.edu.mx" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <span>Portal Oficial UAS</span>
                  <ExternalLink size={11} />
                </a>
                <a href="https://conahcyt.mx" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <span>Conahcyt • SNII</span>
                  <ExternalLink size={11} />
                </a>
              </div>
            </div>
          </div>

          {/* Sede y Correspondencia */}
          <div style={{ fontSize: '0.8125rem', color: 'rgba(255, 255, 255, 0.8)' }}>
            <h5 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--uas-gold)', fontWeight: 700, marginBottom: '0.85rem' }}>
              Sede y Correspondencia
            </h5>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '0.5rem' }}>
              <MapPin size={15} style={{ color: 'var(--uas-gold)', flexShrink: 0, marginTop: '2px' }} />
              <span>{academicBodyData.contacto.direccion}</span>
            </div>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '0.5rem' }}>
              <span style={{ color: 'var(--uas-gold)', fontWeight: 'bold', width: '15px', textAlign: 'center' }}>#</span>
              <span>{academicBodyData.contacto.edificio}</span>
            </div>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '0.5rem' }}>
              <Phone size={15} style={{ color: 'var(--uas-gold)', flexShrink: 0 }} />
              <span>{academicBodyData.contacto.telefono}</span>
            </div>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '0.5rem' }}>
              <Mail size={15} style={{ color: 'var(--uas-gold)', flexShrink: 0 }} />
              <a href={`mailto:${academicBodyData.contacto.email}`} style={{ color: 'var(--uas-gold)', fontFamily: 'var(--font-mono)' }}>
                {academicBodyData.contacto.email}
              </a>
            </div>
            <div style={{ fontSize: '0.72rem', color: 'rgba(255, 255, 255, 0.45)', fontFamily: 'var(--font-mono)', marginTop: '0.5rem' }}>
              Horario de atención: {academicBodyData.contacto.horario}
            </div>
          </div>
        </div>

        {/* Derechos */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem',
          paddingTop: '1.75rem',
          fontSize: '0.75rem',
          fontFamily: 'var(--font-mono)',
          color: 'rgba(255, 255, 255, 0.45)'
        }}>
          <div>
            © {new Date().getFullYear()} Universidad Autónoma de Sinaloa • Cuerpo Académico UAS-CA-318.
          </div>
          <div>
            Facultad de Derecho y Ciencia Política • Unidad Regional Norte, Los Mochis.
          </div>
        </div>

        {/* Powered by POLYLAB */}
        <div style={{
          textAlign: 'center',
          paddingTop: '1.5rem',
          marginTop: '1.25rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.72rem',
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: 'rgba(255, 255, 255, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px'
        }}>
          <span>Powered by </span>
          <strong style={{
            color: '#F1C40F',
            fontWeight: 700,
            letterSpacing: '0.2em'
          }}>
            POLYLAB
          </strong>
          <span style={{ color: 'rgba(255, 255, 255, 0.3)' }}>•</span>
          <span style={{
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            padding: '2px 7px',
            borderRadius: '4px',
            color: '#FFFFFF',
            fontSize: '0.68rem',
            fontWeight: 600
          }}>
            v0.1
          </span>
        </div>
      </div>
    </footer>
  );
};
