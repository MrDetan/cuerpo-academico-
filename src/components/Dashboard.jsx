import React, { useState } from 'react';
import { 
  Calendar, Clock, MapPin, Plus, Edit2, Trash2, CheckCircle2, 
  ArrowLeft, Eye, RefreshCw, Download, Sparkles, AlertCircle, Save
} from 'lucide-react';
import { professorsData, eventsData as defaultEventsData } from '../data/academicData';

export const Dashboard = ({ events, onUpdateEvents, onBackToLiveSite }) => {
  const [editingId, setEditingId] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  // Form State
  const initialForm = {
    titulo: '',
    fecha: '',
    hora: '',
    modalidad: 'Presencial',
    sede: 'Facultad de Derecho y Ciencia Política, UAS Los Mochis',
    organizador: 'Cuerpo Académico UAS-CA-318',
    ponentePrincipal: 'Dra. Celia Margarita Gastélum Norzagaray y Dr. Jesús Roberto Valenzuela Cázarez',
    estado: 'Próximo Evento',
    descripcion: ''
  };

  const [formData, setFormData] = useState(initialForm);

  const showNotification = (msg, type = 'success') => {
    setStatusMessage({ msg, type });
    setTimeout(() => setStatusMessage(null), 4000);
  };

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData(initialForm);
    setIsFormOpen(true);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const handleOpenEdit = (evento) => {
    setEditingId(evento.id);
    setFormData({
      titulo: evento.titulo || '',
      fecha: evento.fecha || '',
      hora: evento.hora || '',
      modalidad: evento.modalidad || 'Presencial',
      sede: evento.sede || '',
      organizador: evento.organizador || 'Cuerpo Académico UAS-CA-318',
      ponentePrincipal: evento.ponentePrincipal || '',
      estado: evento.estado || 'Próximo Evento',
      descripcion: evento.descripcion || ''
    });
    setIsFormOpen(true);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const handleCancelForm = () => {
    setIsFormOpen(false);
    setEditingId(null);
    setFormData(initialForm);
  };

  const handleSaveEvent = async (e) => {
    e.preventDefault();
    if (!formData.titulo.trim() || !formData.fecha.trim()) {
      showNotification('Por favor completa al menos el título y la fecha del evento.', 'error');
      return;
    }

    let updatedList;
    if (editingId) {
      // Edit existing
      updatedList = events.map(ev => {
        if (ev.id === editingId) {
          return { ...ev, ...formData };
        }
        return ev;
      });
      showNotification('¡Evento actualizado y publicado en vivo!');
    } else {
      // Create new
      const newEvent = {
        id: `evento-${Date.now()}`,
        ...formData
      };
      updatedList = [newEvent, ...events];
      showNotification('¡Nuevo evento creado y enviado a la página en vivo con éxito!');
    }

    onUpdateEvents(updatedList);
    setIsFormOpen(false);
    setEditingId(null);
    setFormData(initialForm);
  };

  const handleDelete = (id, titulo) => {
    if (window.confirm(`¿Estás seguro de eliminar el evento "${titulo}"? Los cambios se reflejarán en la página en vivo inmediatamente.`)) {
      const updatedList = events.filter(ev => ev.id !== id);
      onUpdateEvents(updatedList);
      showNotification('Evento eliminado de la página en vivo.');
    }
  };

  const handleResetDefaults = () => {
    if (window.confirm('¿Deseas restaurar la lista de eventos a los valores predeterminados de la UAS?')) {
      onUpdateEvents(defaultEventsData);
      showNotification('Eventos restaurados a los originales.');
    }
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(events, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `eventos_cuerpo_academico_uas_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showNotification('Respaldo JSON descargado con éxito.');
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-page)', minHeight: '100vh', paddingBottom: '6rem' }}>
      {/* Top Banner de Navegación del Dashboard */}
      <div style={{ 
        backgroundColor: '#FFFFFF', 
        borderBottom: '1px solid var(--border-light)', 
        position: 'sticky', 
        top: '72px', 
        zIndex: 40,
        boxShadow: '0 1px 4px rgba(0, 0, 0, 0.03)'
      }}>
        <div className="hub-container">
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            padding: '0.85rem 0',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button
                onClick={onBackToLiveSite}
                className="btn-secondary-action"
                style={{ padding: '0.45rem 0.85rem', fontSize: '0.8125rem' }}
              >
                <ArrowLeft size={14} />
                <span>Volver al Portal en Vivo</span>
              </button>
              <span style={{ color: 'var(--border-medium)' }}>|</span>
              <span style={{ 
                fontFamily: 'var(--font-mono)', 
                fontSize: '0.8125rem', 
                fontWeight: 600,
                color: 'var(--uas-blue)'
              }}>
                Panel de Gestión de Eventos Académicos
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={handleOpenCreate}
                className="btn-gold-action"
                style={{ padding: '0.45rem 1rem', fontSize: '0.8125rem' }}
              >
                <Plus size={14} />
                <span>Subir Nuevo Evento</span>
              </button>

              <button
                onClick={onBackToLiveSite}
                className="btn-primary-action"
                style={{ padding: '0.45rem 1rem', fontSize: '0.8125rem' }}
              >
                <Eye size={14} />
                <span>Ver en Vivo</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="hub-container" style={{ paddingTop: '2.5rem' }}>
        {/* Mensaje de Estado / Notificación en Vivo */}
        {statusMessage && (
          <div style={{
            backgroundColor: statusMessage.type === 'error' ? '#fdebd0' : '#e8f8f5',
            color: statusMessage.type === 'error' ? '#922b21' : '#0e6251',
            border: `1px solid ${statusMessage.type === 'error' ? '#f5b7b1' : '#a3e4d7'}`,
            padding: '1rem 1.25rem',
            borderRadius: '8px',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '0.875rem',
            fontWeight: 500,
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
          }}>
            {statusMessage.type === 'error' ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
            <span>{statusMessage.msg}</span>
          </div>
        )}

        {/* Encabezado del Dashboard */}
        <div style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--border-light)',
          borderRadius: '10px',
          padding: '2rem',
          marginBottom: '2rem',
          boxShadow: 'var(--shadow-card)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            backgroundColor: 'var(--uas-gold)'
          }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div>
              <div className="small-caps" style={{ color: 'var(--gold)', marginBottom: '4px' }}>
                Cuerpo Académico UAS-CA-318 • Los Mochis
              </div>
              <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                Gestor de Eventos, Coloquios y Seminarios en Vivo
              </h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', maxWidth: '680px', lineHeight: 1.6 }}>
                Administra los eventos académicos en los que participan la <strong>Dra. Celia Gastélum</strong> y el <strong>Dr. Jesús Roberto Valenzuela</strong>. Cualquier evento que registres o edites aquí se publicará y reflejará <strong>en tiempo real</strong> en el portal público del Cuerpo Académico.
              </p>
            </div>

            {/* Acciones de Respaldo */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button
                onClick={handleExportJSON}
                className="btn-secondary-action"
                style={{ padding: '0.45rem 0.85rem', fontSize: '0.78rem' }}
                title="Descargar todos los eventos en formato JSON"
              >
                <Download size={13} />
                <span>Exportar JSON</span>
              </button>

              <button
                onClick={handleResetDefaults}
                className="btn-secondary-action"
                style={{ padding: '0.45rem 0.85rem', fontSize: '0.78rem' }}
                title="Restaurar eventos predeterminados"
              >
                <RefreshCw size={13} />
                <span>Restaurar Predeterminados</span>
              </button>
            </div>
          </div>

          {/* Estadísticas de Eventos */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1rem',
            marginTop: '1.75rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid var(--border-light)'
          }}>
            <div style={{ backgroundColor: 'var(--bg-subtle)', padding: '1rem', borderRadius: '6px', border: '1px solid var(--border-light)' }}>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', fontWeight: 700, color: 'var(--uas-blue)' }}>
                {events.length}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', textTransform: 'uppercase', color: 'var(--text-light)' }}>
                Total de Eventos Registrados
              </div>
            </div>

            <div style={{ backgroundColor: 'var(--bg-subtle)', padding: '1rem', borderRadius: '6px', border: '1px solid var(--border-light)' }}>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', fontWeight: 700, color: 'var(--gold)' }}>
                {events.filter(e => e.estado.includes('Próximo') || e.estado.includes('Abierto')).length}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', textTransform: 'uppercase', color: 'var(--text-light)' }}>
                Eventos Próximos / En Registro
              </div>
            </div>

            <div style={{ backgroundColor: 'var(--bg-subtle)', padding: '1rem', borderRadius: '6px', border: '1px solid var(--border-light)' }}>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', fontWeight: 700, color: 'var(--text-main)' }}>
                {events.filter(e => e.estado.includes('Concluido')).length}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', textTransform: 'uppercase', color: 'var(--text-light)' }}>
                Memorias / Eventos Concluidos
              </div>
            </div>
          </div>
        </div>

        {/* Formulario de Creación / Edición */}
        {isFormOpen && (
          <div style={{
            backgroundColor: '#FFFFFF',
            border: '2px solid var(--uas-blue)',
            borderRadius: '10px',
            padding: '2rem',
            marginBottom: '2.5rem',
            boxShadow: 'var(--shadow-hover)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1.5rem',
              paddingBottom: '0.75rem',
              borderBottom: '1px solid var(--border-light)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  padding: '6px',
                  borderRadius: '6px',
                  backgroundColor: 'var(--uas-blue-soft)',
                  color: 'var(--uas-blue)',
                  display: 'flex'
                }}>
                  <Calendar size={18} />
                </div>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', fontWeight: 600 }}>
                    {editingId ? 'Editar Evento Académico' : 'Publicar Nuevo Evento en Vivo'}
                  </h3>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-light)' }}>
                    Al hacer clic en guardar, se publicará de inmediato en la sección de eventos del sitio web.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCancelForm}
                style={{ fontSize: '0.8125rem', color: 'var(--text-light)', cursor: 'pointer' }}
              >
                Cerrar Formulario ✕
              </button>
            </div>

            <form onSubmit={handleSaveEvent}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.25rem', marginBottom: '1.5rem' }}>
                {/* Título */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '6px', color: 'var(--text-main)' }}>
                    Título del Evento o Conferencia *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Coloquio Internacional: Gobernanza y Comportamiento Electoral en Sinaloa"
                    value={formData.titulo}
                    onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                    className="input-box"
                    style={{ fontSize: '0.9375rem', fontWeight: 500 }}
                  />
                </div>

                {/* Grid 2 columnas: Fecha y Hora */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '6px' }}>
                      Fecha del Evento *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. 15 de Noviembre de 2026"
                      value={formData.fecha}
                      onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                      className="input-box"
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '6px' }}>
                      Horario
                    </label>
                    <input
                      type="text"
                      placeholder="Ej. 10:00 - 13:30 hrs"
                      value={formData.hora}
                      onChange={(e) => setFormData({ ...formData, hora: e.target.value })}
                      className="input-box"
                    />
                  </div>
                </div>

                {/* Grid 2 columnas: Modalidad y Estado */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '6px' }}>
                      Modalidad
                    </label>
                    <select
                      value={formData.modalidad}
                      onChange={(e) => setFormData({ ...formData, modalidad: e.target.value })}
                      className="input-box"
                    >
                      <option value="Presencial">Presencial</option>
                      <option value="Virtual vía Zoom Institucional UAS">Virtual (Zoom UAS)</option>
                      <option value="Híbrida (Presencial y Transmisión en Vivo)">Híbrida (Presencial y Transmisión)</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '6px' }}>
                      Estado del Evento
                    </label>
                    <select
                      value={formData.estado}
                      onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
                      className="input-box"
                    >
                      <option value="Próximo Evento">Próximo Evento</option>
                      <option value="Registro Abierto">Registro Abierto</option>
                      <option value="Concluido">Concluido (Memoria)</option>
                    </select>
                  </div>
                </div>

                {/* Sede / Lugar */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '6px' }}>
                    Sede / Espacio Físico o Virtual
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. Auditorio 'Dr. José Vasconcelos', Facultad de Derecho y Ciencia Política, UAS Los Mochis"
                    value={formData.sede}
                    onChange={(e) => setFormData({ ...formData, sede: e.target.value })}
                    className="input-box"
                  />
                </div>

                {/* Investigadores Participantes / Ponentes */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '6px' }}>
                    Investigadores Participantes / Ponente(s) Principal(es)
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. Conferencia magistral impartida por la Dra. Celia Gastélum y el Dr. Jesús Roberto Valenzuela"
                    value={formData.ponentePrincipal}
                    onChange={(e) => setFormData({ ...formData, ponentePrincipal: e.target.value })}
                    className="input-box"
                  />
                </div>

                {/* Descripción Detallada */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '6px' }}>
                    Descripción o Resumen del Evento
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describe los ejes temáticos, los objetivos de la jornada académica y los detalles para la comunidad estudiantil y académica..."
                    value={formData.descripcion}
                    onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                    className="input-box"
                    style={{ height: 'auto', padding: '0.75rem', resize: 'vertical' }}
                  />
                </div>
              </div>

              {/* Botones del Formulario */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: '10px',
                paddingTop: '1.25rem',
                borderTop: '1px solid var(--border-light)'
              }}>
                <button
                  type="button"
                  onClick={handleCancelForm}
                  className="btn-secondary-action"
                  style={{ padding: '0.6rem 1.25rem' }}
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="btn-primary-action"
                  style={{ padding: '0.6rem 1.5rem', fontWeight: 700 }}
                >
                  <Save size={16} />
                  <span>{editingId ? 'Guardar Cambios en Vivo' : 'Publicar Evento en Vivo 🚀'}</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Lista de Eventos Actuales */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <h2 className="section-title" style={{ fontSize: '1.4rem' }}>
              Eventos Actuales en el Portal Público ({events.length})
            </h2>
            {!isFormOpen && (
              <button
                onClick={handleOpenCreate}
                className="btn-gold-action"
                style={{ padding: '0.45rem 0.95rem', fontSize: '0.8125rem' }}
              >
                <Plus size={14} />
                <span>Agregar Nuevo</span>
              </button>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.25rem' }}>
            {events.map((ev) => {
              const isUpcoming = ev.estado.includes('Próximo') || ev.estado.includes('Abierto');
              return (
                <div
                  key={ev.id}
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid var(--border-light)',
                    borderRadius: '8px',
                    padding: '1.5rem',
                    boxShadow: 'var(--shadow-card)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginBottom: '0.75rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
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
                          {ev.estado}
                        </span>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-light)' }}>
                          {ev.modalidad}
                        </span>
                      </div>

                      {/* Botones de Gestión */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <button
                          onClick={() => handleOpenEdit(ev)}
                          className="btn-secondary-action"
                          style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem' }}
                          title="Editar evento"
                        >
                          <Edit2 size={12} />
                          <span>Editar</span>
                        </button>

                        <button
                          onClick={() => handleDelete(ev.id, ev.titulo)}
                          className="btn-secondary-action"
                          style={{ padding: '0.35rem 0.65rem', fontSize: '0.75rem', color: '#c0392b' }}
                          title="Eliminar evento de la página en vivo"
                        >
                          <Trash2 size={12} />
                          <span>Eliminar</span>
                        </button>
                      </div>
                    </div>

                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem', lineHeight: 1.3 }}>
                      {ev.titulo}
                    </h3>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--text-main)', fontWeight: 600 }}>
                        <Calendar size={13} style={{ color: 'var(--uas-blue)' }} />
                        <span>{ev.fecha}</span>
                      </div>
                      {ev.hora && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                          <Clock size={13} style={{ color: 'var(--gold)' }} />
                          <span>{ev.hora}</span>
                        </div>
                      )}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <MapPin size={13} style={{ color: 'var(--gold)' }} />
                        <span>{ev.sede}</span>
                      </div>
                    </div>

                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '0.75rem' }}>
                      {ev.descripcion}
                    </p>
                  </div>

                  <div style={{
                    paddingTop: '0.75rem',
                    borderTop: '1px solid var(--border-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '0.78rem',
                    color: 'var(--text-light)',
                    fontStyle: 'italic'
                  }}>
                    <span>{ev.ponentePrincipal}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem' }}>
                      ID: {ev.id}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
