import os
import sys
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.units import inch
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, Image, KeepTogether, PageBreak, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY, TA_LEFT, TA_RIGHT
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_header_footer(num_pages)
            super().showPage()
        super().save()

    def draw_header_footer(self, page_count):
        self.saveState()
        
        # Don't draw header/footer on cover page (page 1)
        if self._pageNumber > 1:
            # Running Header
            self.setFont("Helvetica-Bold", 8)
            self.setFillColor(colors.HexColor("#08338F"))
            self.drawString(54, 755, "UNIVERSIDAD AUTÓNOMA DE SINALOA")
            
            self.setFont("Helvetica", 7.5)
            self.setFillColor(colors.HexColor("#555555"))
            self.drawString(54, 744, "UADyCP MOCHIS • UNIDAD REGIONAL NORTE")
            
            self.setFont("Helvetica-Bold", 7.5)
            self.setFillColor(colors.HexColor("#C49E0D"))
            self.drawRightString(558, 744, "C.A. UAS-0356: ESTUDIOS SOCIOCULTURALES")
            
            # Header Rules (Azul y Oro UAS)
            self.setStrokeColor(colors.HexColor("#08338F"))
            self.setLineWidth(1)
            self.line(54, 737, 558, 737)
            self.setStrokeColor(colors.HexColor("#C49E0D"))
            self.setLineWidth(0.75)
            self.line(54, 735, 558, 735)

            # Footer
            self.setStrokeColor(colors.HexColor("#E2DCD2"))
            self.setLineWidth(0.75)
            self.line(54, 45, 558, 45)

            self.setFont("Helvetica", 7.5)
            self.setFillColor(colors.HexColor("#666666"))
            self.drawString(54, 33, "Informe Diagnóstico de la Unidad Receptora • Servicio Social / Prácticas Profesionales")
            
            page_text = f"Página {self._pageNumber} de {page_count}"
            self.drawRightString(558, 33, page_text)

        self.restoreState()

def build_pdf(filename="Informe_Unidad_Receptora_UAS_0356.pdf"):
    doc = SimpleDocTemplate(
        filename,
        pagesize=letter,
        leftMargin=54,
        rightMargin=54,
        topMargin=68,
        bottomMargin=58
    )

    styles = getSampleStyleSheet()

    # Custom Palettes
    c_primary = colors.HexColor("#08338F")    # Azul UAS
    c_secondary = colors.HexColor("#C49E0D")  # Oro UAS
    c_dark = colors.HexColor("#1A1A1A")       # Charcoal
    c_gray = colors.HexColor("#555555")       # Text muted
    c_bg_light = colors.HexColor("#F8F9FA")
    c_border = colors.HexColor("#D8D2C4")

    # Typography Styles
    title_cover = ParagraphStyle(
        'TitleCover',
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=25,
        alignment=TA_CENTER,
        textColor=c_primary
    )

    h1_style = ParagraphStyle(
        'Heading1_Custom',
        fontName='Helvetica-Bold',
        fontSize=13,
        leading=17,
        textColor=c_primary,
        spaceBefore=10,
        spaceAfter=6,
        keepWithNext=True
    )

    h2_style = ParagraphStyle(
        'Heading2_Custom',
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=14,
        textColor=c_secondary,
        spaceBefore=10,
        spaceAfter=4,
        keepWithNext=True
    )

    body_style = ParagraphStyle(
        'Body_Custom',
        fontName='Helvetica',
        fontSize=9,
        leading=13.5,
        textColor=c_dark,
        alignment=TA_JUSTIFY,
        spaceAfter=6
    )

    bullet_style = ParagraphStyle(
        'Bullet_Custom',
        fontName='Helvetica',
        fontSize=8.5,
        leading=12.5,
        textColor=c_dark,
        leftIndent=15,
        firstLineIndent=-10,
        spaceAfter=4,
        alignment=TA_JUSTIFY
    )

    table_header = ParagraphStyle(
        'TableHeader',
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=11,
        textColor=colors.white,
        alignment=TA_LEFT
    )

    table_cell = ParagraphStyle(
        'TableCell',
        fontName='Helvetica',
        fontSize=8,
        leading=11,
        textColor=c_dark,
        alignment=TA_LEFT
    )

    table_cell_bold = ParagraphStyle(
        'TableCellBold',
        fontName='Helvetica-Bold',
        fontSize=8,
        leading=11,
        textColor=c_primary,
        alignment=TA_LEFT
    )

    story = []

    # =========================================================================
    # PÁGINA 1: PORTADA INSTITUCIONAL
    # =========================================================================
    story.append(Spacer(1, 25))
    
    # UAS Escudo / Logo limpio
    logo_path = "public/assets/uas_logo_clean.png"
    if not os.path.exists(logo_path):
        logo_path = "public/assets/uas_eagle_pure.png"
        
    if os.path.exists(logo_path):
        img = Image(logo_path, width=1.65*inch, height=1.0*inch)
        img.hAlign = 'CENTER'
        story.append(img)
        story.append(Spacer(1, 14))

    inst_header = Paragraph(
        "<b>UNIVERSIDAD AUTÓNOMA DE SINALOA</b><br/>"
        "<font size=10 color='#555555'>UNIDAD REGIONAL NORTE • ZONA LOS MOCHIS</font><br/>"
        "<b>UNIDAD ACADÉMICA DE DERECHO Y CIENCIA POLÍTICA MOCHIS</b>",
        ParagraphStyle('InstHeader', fontName='Helvetica', fontSize=12, leading=16, alignment=TA_CENTER, textColor=c_primary)
    )
    story.append(inst_header)
    story.append(Spacer(1, 20))

    story.append(HRFlowable(width="60%", thickness=2, color=c_secondary, spaceBefore=5, spaceAfter=20, hAlign='CENTER'))

    report_title = Paragraph(
        "<b>INFORME DIAGNÓSTICO INSTITUCIONAL</b><br/>"
        "<font size=14 color='#C49E0D'>INFORMACIÓN BÁSICA, RESEÑA HISTÓRICA, ASPECTO ORGANIZACIONAL Y ORGANIGRAMA</font>",
        title_cover
    )
    story.append(report_title)
    story.append(Spacer(1, 15))

    ca_badge = Paragraph(
        "<b>UNIDAD RECEPTORA DE SERVICIO SOCIAL / PRÁCTICAS PROFESIONALES:</b><br/>"
        "<b>C.A. UAS - 0356: ESTUDIOS SOCIOCULTURALES POLÍTICO E INSTITUCIONES</b>",
        ParagraphStyle('CABadge', fontName='Helvetica-Bold', fontSize=10.5, leading=15, alignment=TA_CENTER, textColor=c_primary)
    )
    story.append(ca_badge)
    story.append(Spacer(1, 28))

    # Meta Table on Cover
    cover_meta = [
        [Paragraph("<b>Institución Educativa:</b>", table_cell_bold), Paragraph("Universidad Autónoma de Sinaloa (UAS)", table_cell)],
        [Paragraph("<b>Unidad Académica Receptora:</b>", table_cell_bold), Paragraph("Unidad Académica de Derecho y Ciencia Política Mochis (UADyCP)", table_cell)],
        [Paragraph("<b>Cuerpo Académico Adscrito:</b>", table_cell_bold), Paragraph("C.A. UAS - 0356: Estudios Socioculturales, Político e Instituciones", table_cell)],
        [Paragraph("<b>Titular de la Unidad Receptora:</b>", table_cell_bold), Paragraph("Dr. Víctor Sepúlveda Álvarez (Director de la UADyCP)", table_cell)],
        [Paragraph("<b>Ubicación y Sede:</b>", table_cell_bold), Paragraph("Ciudad Universitaria, Los Mochis, Ahome, Sinaloa", table_cell)],
        [Paragraph("<b>Marco de Elaboración:</b>", table_cell_bold), Paragraph("Conforme a la Guía Oficial de Servicio Social / Prácticas Profesionales", table_cell)],
    ]
    meta_table = Table(cover_meta, colWidths=[2.2*inch, 4.3*inch])
    meta_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), c_bg_light),
        ('BOX', (0,0), (-1,-1), 1, c_border),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor("#E8E4DF")),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('LEFTPADDING', (0,0), (-1,-1), 10),
        ('RIGHTPADDING', (0,0), (-1,-1), 10),
    ]))
    story.append(meta_table)

    story.append(Spacer(1, 40))
    footer_cover = Paragraph(
        "<font size=8 color='#777777'>Documento elaborado con apego a los lineamientos normativos y guías institucionales de la Universidad Autónoma de Sinaloa.</font>",
        ParagraphStyle('CoverFoot', fontName='Helvetica-Oblique', fontSize=8, leading=11, alignment=TA_CENTER)
    )
    story.append(footer_cover)

    story.append(PageBreak())

    # =========================================================================
    # PÁGINA 2: SECCIÓN 1 - INFORMACIÓN BÁSICA DE LA UNIDAD RECEPTORA
    # =========================================================================
    sec1_title = Paragraph("1. INFORMACIÓN BÁSICA DE LA UNIDAD RECEPTORA", h1_style)
    story.append(sec1_title)
    story.append(HRFlowable(width="100%", thickness=1.5, color=c_primary, spaceBefore=2, spaceAfter=10))

    intro_p1 = Paragraph(
        "Conforme a los lineamientos de la guía institucional de servicio social y prácticas profesionales, a continuación se detallan "
        "los datos de identificación, adscripción y localización de la Unidad Receptora, comprendiendo a la <b>Unidad Académica de Derecho "
        "y Ciencia Política Mochis</b> de la <b>Universidad Autónoma de Sinaloa</b> y específicamente al grupo colegiado de investigación "
        "<b>C.A. UAS - 0356: Estudios Socioculturales Político e Instituciones</b>.",
        body_style
    )
    story.append(intro_p1)
    story.append(Spacer(1, 6))

    # Basic Info Table
    info_data = [
        [Paragraph("CAMPO / RUBRO", table_header), Paragraph("DATOS GENERALES DE LA UNIDAD RECEPTORA", table_header)],
        [Paragraph("<b>Nombre de la Institución:</b>", table_cell_bold), Paragraph("Universidad Autónoma de Sinaloa (UAS)", table_cell)],
        [Paragraph("<b>Nombre de la Unidad Receptora:</b>", table_cell_bold), Paragraph("Unidad Académica de Derecho y Ciencia Política Mochis (Facultad de Derecho y Ciencia Política Los Mochis)", table_cell)],
        [Paragraph("<b>Zona / Región Universitaria:</b>", table_cell_bold), Paragraph("Unidad Regional Norte (URN)", table_cell)],
        [Paragraph("<b>Departamento / Área de Adscripción:</b>", table_cell_bold), Paragraph("Cuerpo Académico C.A. UAS - 0356 'Estudios Socioculturales Político e Instituciones' / Coordinación de Posgrado e Investigación", table_cell)],
        [Paragraph("<b>Clave de Identificación Oficial:</b>", table_cell_bold), Paragraph("PRODEP / UAS: <b>CA-UAS-0356</b>", table_cell)],
        [Paragraph("<b>Giro o Actividad Sustantiva:</b>", table_cell_bold), Paragraph("Educación Superior Pública, Investigación Científica Social y Jurídica, Docencia, Extensión Universitaria y Vinculación Comunitaria.", table_cell)],
        [Paragraph("<b>Titular de la Unidad Académica:</b>", table_cell_bold), Paragraph("<b>Dr. Víctor Sepúlveda Álvarez</b> (Director de la Unidad Académica)", table_cell)],
        [Paragraph("<b>Investigadores del Cuerpo Académico:</b>", table_cell_bold), Paragraph("Dra. Janeth Yolanda Gastélum Urquidy, Dr. Pedro Cázares Aboytes, Dr. Ulises Suárez Estavillo, Dr. Rafael Santos Cenobio, Dr. Luis Felipe Bernal Hernández.", table_cell)],
        [Paragraph("<b>Domicilio Oficial / Sede:</b>", table_cell_bold), Paragraph("Ciudad Universitaria Los Mochis, Blvd. Prolongación Ángel Flores y Justicia Social s/n, Colonia Jiquilpan, C.P. 81223, Los Mochis, Ahome, Sinaloa.", table_cell)],
        [Paragraph("<b>Teléfono de Oficina:</b>", table_cell_bold), Paragraph("+52 (668) 812-4520 / Conmutador Ciudad Universitaria", table_cell)],
        [Paragraph("<b>Correos Electrónicos:</b>", table_cell_bold), Paragraph("uadycp.mochis@uas.edu.mx | cuerpoacademico.356@uas.edu.mx", table_cell)],
        [Paragraph("<b>Portal Web Institucional:</b>", table_cell_bold), Paragraph("https://www.uas.edu.mx | Facultad de Derecho y Ciencia Política", table_cell)],
        [Paragraph("<b>Horario de Operación:</b>", table_cell_bold), Paragraph("Lunes a Viernes de 08:00 a 19:00 horas (Turnos Matutino y Vespertino)", table_cell)]
    ]

    t_info = Table(info_data, colWidths=[2.2*inch, 4.3*inch])
    t_info.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), c_primary),
        ('TEXTCOLOR', (0,0), (-1,0), colors.white),
        ('ALIGN', (0,0), (-1,-1), 'LEFT'),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, c_bg_light]),
        ('GRID', (0,0), (-1,-1), 0.5, c_border),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(t_info)
    story.append(Spacer(1, 10))

    story.append(Paragraph(
        "<b>Ámbito de Incidencia del Área Receptora:</b> El Cuerpo Académico UAS-0356 desarrolla proyectos de investigación aplicada, "
        "seminarios metodológicos y publicaciones especializadas enfocadas en problemáticas sociales, instituciones democráticas, "
        "derechos fundamentales y dinámicas culturales contemporáneas en el noroeste de México. "
        "Los prestadores de servicio social se insertan en tareas de sistematización de fuentes bibliográficas y hemerográficas, "
        "elaboración de bases de datos cualitativas y cuantitativas, apoyo en la logística de coloquios y asistencia técnica a las publicaciones colegiadas.",
        body_style
    ))

    story.append(PageBreak())

    # =========================================================================
    # PÁGINA 3: SECCIÓN 2 - ASPECTO HISTÓRICO
    # =========================================================================
    sec2_title = Paragraph("2. ASPECTO HISTÓRICO", h1_style)
    story.append(sec2_title)
    story.append(HRFlowable(width="100%", thickness=1.5, color=c_primary, spaceBefore=2, spaceAfter=10))

    story.append(Paragraph("<b>2.1 Origen y Fundación de la Escuela de Derecho en Los Mochis</b>", h2_style))
    story.append(Paragraph(
        "La historia de la <b>Unidad Académica de Derecho y Ciencia Política Mochis</b> representa un hito fundamental en el desarrollo "
        "cultural, cívico y profesional de la zona norte de Sinaloa. Hacia finales de la década de 1960 y principios de los años setenta, "
        "la Universidad Autónoma de Sinaloa emprendió una ambiciosa política de desconcentración académica para responder al crecimiento regional. "
        "En aquella época, los jóvenes del norte del estado que aspiraban a formarse en la abogacía debían migrar obligatoriamente a Culiacán, "
        "Guadalajara o la Ciudad de México, lo cual marginaba a un amplio sector estudiantil de escasos recursos económicos.",
        body_style
    ))
    story.append(Paragraph(
        "Gracias al liderazgo académico y cívico de distinguidos abogados de la región —encabezados de manera emblemática por el "
        "<b>Dr. Miguel Antonio Ocaña Montaño</b>, jurista recordado con profunda admiración como uno de los principales fundadores y pilares "
        "intelectuales de la institución— se cristalizó la fundación de la Escuela de Derecho en Los Mochis. Este acontecimiento consagró a la facultad "
        "como <b>la unidad universitaria más antigua de la UAS en la zona norte</b>, graduando a las primeras generaciones de jueces, litigantes, "
        "notarios y servidores públicos que forjaron el andamiaje institucional del Valle del Fuerte.",
        body_style
    ))

    story.append(Paragraph("<b>2.2 Crecimiento, Ciudad Universitaria y Apertura a la Ciencia Política</b>", h2_style))
    story.append(Paragraph(
        "Conforme la matrícula se incrementó, la facultad se reubicó en el campus moderno de <b>Ciudad Universitaria Los Mochis</b> "
        "(sobre la prolongación Ángel Flores y Justicia Social). Hacia finales del siglo XX y principios de la década de 2000, los cambios estructurales "
        "en el régimen político sinaloense —marcados por la competencia electoral, las exigencias de transparencia gubernamental y las reformas "
        "constitucionales en materia de derechos humanos— exigieron trascender la enseñanza meramente formalista del Derecho.",
        body_style
    ))
    story.append(Paragraph(
        "En respuesta, la UAS aprobó la incorporación de la <b>Licenciatura en Ciencia Política</b>, transformando a la institución en la "
        "<b>Unidad Académica de Derecho y Ciencia Política (UADyCP)</b>. Esta visión integradora se robusteció con programas de posgrado "
        "(Maestría y Doctorado), consolidando a la unidad como un epicentro de análisis crítico, investigación empírica y formación de liderazgos.",
        body_style
    ))

    story.append(Paragraph("<b>2.3 Creación y Trayectoria del Cuerpo Académico UAS-0356</b>", h2_style))
    story.append(Paragraph(
        "Para responder a los parámetros de calidad del Programa para el Desarrollo Profesional Docente (PRODEP) de la SEP, los investigadores "
        "de la facultad conformaron el <b>C.A. UAS - 0356: 'Estudios Socioculturales Político e Instituciones'</b>. Este colectivo académico "
        "nació con la vocación de articular los estudios jurídicos con la sociología, la antropología cultural y la ciencia política, superando los "
        "enfoques aislados para generar diagnósticos integrales sobre la realidad del noroeste mexicano.",
        body_style
    ))
    story.append(Paragraph(
        "A lo largo de sus años de labor ininterrumpida, el CA-UAS-0356 ha coordinado la publicación de importantes libros colectivos con editoriales "
        "de prestigio nacional, tales como análisis sobre fenómenos socioculturales, derechos humanos, políticas de inclusión y educación. Asimismo, "
        "ha instituido el Congreso de Estudios Socioculturales y foros de deliberación ciudadana en vinculación con el Instituto Electoral del Estado "
        "de Sinaloa (IEES) y la Comisión Estatal de Derechos Humanos.",
        body_style
    ))

    story.append(PageBreak())

    # =========================================================================
    # PÁGINA 4: SECCIÓN 3 - ASPECTO ORGANIZACIONAL
    # =========================================================================
    sec3_title = Paragraph("3. ASPECTO ORGANIZACIONAL", h1_style)
    story.append(sec3_title)
    story.append(HRFlowable(width="100%", thickness=1.5, color=c_primary, spaceBefore=2, spaceAfter=10))

    story.append(Paragraph(
        "El aspecto organizacional comprende la filosofía institucional, los principios axiológicos y el marco de operación que guían "
        "el quehacer de la Unidad Académica de Derecho y Ciencia Política Mochis y del Cuerpo Académico UAS-0356.",
        body_style
    ))

    # Misión y Visión Callout Boxes
    mv_data = [
        [
            Paragraph("<b>MISIÓN INSTITUCIONAL</b>", table_header),
            Paragraph("<b>VISIÓN INSTITUCIONAL</b>", table_header)
        ],
        [
            Paragraph(
                "Formar profesionales e investigadores de alta calidad ética, científica y humanista en las áreas de Derecho y Ciencia Política, "
                "con sólida preparación crítica y compromiso cívico. Capaces de generar conocimientos de vanguardia mediante la investigación, "
                "proponer soluciones innovadoras a los problemas jurídicos, socioculturales y democráticos de la sociedad, y contribuir "
                "decididamente a la justicia social y el Estado democrático de derecho en Sinaloa y México.",
                table_cell
            ),
            Paragraph(
                "Consolidarse como una Unidad Académica de excelencia y liderazgo regional y nacional en la enseñanza e investigación del Derecho "
                "y las Ciencias Políticas, acreditada por organismos evaluadores por su calidad académica. Distinguida por cuerpos académicos consolidados "
                "cuyos productos científicos impacten positivamente en el diseño de políticas públicas, el fortalecimiento de las instituciones democráticas, "
                "la cultura cívica y la equidad social.",
                table_cell
            )
        ]
    ]
    t_mv = Table(mv_data, colWidths=[3.25*inch, 3.25*inch])
    t_mv.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), c_primary),
        ('ALIGN', (0,0), (-1,-1), 'LEFT'),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BACKGROUND', (0,1), (-1,1), c_bg_light),
        ('BOX', (0,0), (-1,-1), 1, c_secondary),
        ('INNERGRID', (0,0), (-1,-1), 0.5, c_border),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(t_mv)
    story.append(Spacer(1, 10))

    story.append(Paragraph("<b>3.1 Valores Institucionales</b>", h2_style))
    valores_list = [
        ("• Justicia y Legalidad:", "Promoción inquebrantable del respeto irrestricto a los derechos humanos y el orden jurídico democrático."),
        ("• Honestidad y Ética:", "Actuación transparente, responsable y rigurosa en el ejercicio profesional, docente y científico."),
        ("• Responsabilidad Social:", "Orientación humanista del conocimiento al servicio de las necesidades de la comunidad y grupos vulnerables."),
        ("• Libertad de Cátedra e Investigación:", "Fomento del pensamiento plural, crítico, tolerante y abierto al debate fundamentado."),
        ("• Excelencia y Rigor Académico:", "Búsqueda continua de los más altos estándares metodológicos y pedagógicos en la generación de saberes."),
        ("• Equidad e Inclusión:", "Firme compromiso con la no discriminación, la perspectiva de género y la igualdad de oportunidades.")
    ]
    for val_tit, val_desc in valores_list:
        story.append(Paragraph(f"<b>{val_tit}</b> {val_desc}", bullet_style))

    story.append(Spacer(1, 6))
    story.append(Paragraph("<b>3.2 Objetivos Estratégicos del Cuerpo Académico UAS-0356</b>", h2_style))
    objetivos_list = [
        "Desarrollar y consolidar las Líneas de Generación y Aplicación del Conocimiento (LGAC) en estudios socioculturales, dinámicas de poder e instituciones.",
        "Generar producción científica arbitrada de alto impacto (artículos indexados, libros coordinados, capítulos de libro y memorias de investigación).",
        "Incorporar activamente a estudiantes de licenciatura y posgrado en calidad de prestadores de servicio social, becarios y tesistas en proyectos vigentes.",
        "Organizar foros de difusión científica, congresos temáticos y talleres metodológicos para la comunidad universitaria y la sociedad civil.",
        "Establecer convenios y redes de colaboración académica con instituciones afines a nivel nacional e internacional."
    ]
    for obj in objetivos_list:
        story.append(Paragraph(f"<b>•</b> {obj}", bullet_style))

    story.append(Spacer(1, 6))
    story.append(Paragraph("<b>3.3 Marco Normativo y Políticas de Operación</b>", h2_style))
    story.append(Paragraph(
        "La operación académica, administrativa y de servicio social de la unidad se rige por: "
        "<b>1)</b> Ley Orgánica de la Universidad Autónoma de Sinaloa; "
        "<b>2)</b> Estatuto General de la UAS; "
        "<b>3)</b> Reglamento General de Servicio Social de la UAS; "
        "<b>4)</b> Lineamientos del Programa para el Desarrollo Profesional Docente (PRODEP - SEP); "
        "<b>5)</b> Reglamento de Cuerpos Académicos de la Coordinación General de Investigación y Posgrado (CGIP - UAS).",
        body_style
    ))

    story.append(PageBreak())

    # =========================================================================
    # PÁGINA 5: SECCIÓN 4 - ORGANIGRAMA Y ESTRUCTURA ORGÁNICA
    # =========================================================================
    sec4_title = Paragraph("4. ORGANIGRAMA Y ESTRUCTURA ORGÁNICA", h1_style)
    story.append(sec4_title)
    story.append(HRFlowable(width="100%", thickness=1.5, color=c_primary, spaceBefore=2, spaceAfter=10))

    story.append(Paragraph(
        "A continuación se presenta la estructura jerárquica y de coordinación funcional de la <b>Unidad Académica de Derecho "
        "y Ciencia Política Mochis</b>, visualizando la ubicación estratégica del <b>Cuerpo Académico UAS-0356: Estudios Socioculturales Político e Instituciones</b> "
        "y la articulación de los prestadores de servicio social dentro del flujo organizativo:",
        body_style
    ))
    story.append(Spacer(1, 6))

    # Structured Visual Diagram / Hierarchy Table
    org_rows = [
        # Nivel 1: Institucional
        [
            Paragraph("<b>NIVEL 1: GOBIERNO INSTITUCIONAL</b>", table_cell_bold),
            Paragraph("<b>RECTORÍA GENERAL DE LA UAS</b><br/><font size=7.5 color='#555555'>Órgano máximo de gobierno universitario central</font>", table_cell)
        ],
        # Nivel 2: Regional
        [
            Paragraph("<b>NIVEL 2: COORDINACIÓN REGIONAL</b>", table_cell_bold),
            Paragraph("<b>VICERRECTORÍA UNIDAD REGIONAL NORTE (LOS MOCHIS)</b><br/><font size=7.5 color='#555555'>Coordinación administrativa y académica en la Zona Norte</font>", table_cell)
        ],
        # Nivel 3: Dirección de la Unidad Receptora
        [
            Paragraph("<b>NIVEL 3: DIRECCIÓN DE LA UNIDAD</b>", table_cell_bold),
            Paragraph("<b>DIRECCIÓN DE LA UNIDAD ACADÉMICA DE DERECHO Y CIENCIA POLÍTICA</b><br/><font size=7.5 color='#08338F'><b>Titular: Dr. Víctor Sepúlveda Álvarez</b></font>", table_cell)
        ],
        # Nivel 4: Órganos de Apoyo
        [
            Paragraph("<b>NIVEL 4: SECRETARÍAS DE APOYO</b>", table_cell_bold),
            Paragraph("• Secretaría Académica<br/>• Secretaría Administrativa<br/>• Coordinación de Vinculación y Servicio Social", table_cell)
        ],
        # Nivel 5: Coordinación Académica y de Posgrado
        [
            Paragraph("<b>NIVEL 5: ÁREA DE INVESTIGACIÓN</b>", table_cell_bold),
            Paragraph("<b>COORDINACIÓN DE POSGRADO E INVESTIGACIÓN DE LA UADyCP</b><br/><font size=7.5 color='#555555'>Seguimiento a programas de maestría, doctorado y cuerpos académicos</font>", table_cell)
        ],
        # Nivel 6: Cuerpo Académico
        [
            Paragraph("<b>NIVEL 6: UNIDAD ESPECÍFICA RECEPTORA</b>", ParagraphStyle('OrgPill', fontName='Helvetica-Bold', fontSize=8, leading=10, textColor=colors.HexColor("#08338F"))),
            Paragraph(
                "<b>C.A. UAS - 0356: ESTUDIOS SOCIOCULTURALES POLÍTICO E INSTITUCIONES</b><br/>"
                "<b>Responsable / Representante:</b> Dra. Janeth Yolanda Gastélum Urquidy<br/>"
                "<b>Investigadores Integrantes:</b><br/>"
                "• Dr. Pedro Cázares Aboytes &nbsp;&nbsp;&nbsp;&nbsp;• Dr. Ulises Suárez Estavillo<br/>"
                "• Dr. Rafael Santos Cenobio &nbsp;&nbsp;&nbsp;&nbsp;• Dr. Luis Felipe Bernal Hernández",
                table_cell
            )
        ],
        # Nivel 7: Prestadores / Estudiantes
        [
            Paragraph("<b>NIVEL 7: ÁREA OPERATIVA / ESTUDIANTIL</b>", table_cell_bold),
            Paragraph(
                "<b>EQUIPO DE APOYO, PRESTADORES DE SERVICIO SOCIAL Y TESISTAS</b><br/>"
                "<font size=7.5 color='#555555'>Soporte a la investigación, sistematización de datos, apoyo editorial y foros académicos</font>",
                table_cell
            )
        ]
    ]

    t_org = Table(org_rows, colWidths=[2.2*inch, 4.3*inch])
    t_org.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.white),
        ('BOX', (0,0), (-1,-1), 1.5, c_primary),
        ('INNERGRID', (0,0), (-1,-1), 0.5, c_border),
        ('BACKGROUND', (0,2), (1,2), colors.HexColor("#EEF3FA")), # Dirección highlight
        ('BACKGROUND', (0,5), (1,5), colors.HexColor("#FEF9E7")), # Cuerpo Académico highlight
        ('LINEBEFORE', (1,0), (1,-1), 2, c_secondary),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(t_org)
    story.append(Spacer(1, 10))

    story.append(Paragraph(
        "<b>Descripción de Funciones Clave en la Estructura:</b><br/>"
        "<b>a) Dirección de la Unidad:</b> Coordina el rumbo estratégico general, la gestión presupuestal y la representación institucional ante las autoridades universitarias.<br/>"
        "<b>b) Coordinación de Vinculación y Servicio Social:</b> Supervisa el cumplimiento de los reglamentos, la asignación de plazas receptoras y el seguimiento a los informes de servicio.<br/>"
        "<b>c) Cuerpo Académico UAS-0356:</b> Diseña la agenda de investigación, asigna y asesora a los prestadores de servicio social en tareas sustantivas científicas, y valida los productos generados.<br/>"
        "<b>d) Prestador de Servicio Social:</b> Ejecuta con ética y puntualidad las comisiones de investigación, recopilación de información, archivo y apoyo logístico encomendadas.",
        body_style
    ))

    # Build PDF
    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"PDF successfully generated: {filename}")

if __name__ == "__main__":
    build_pdf()
