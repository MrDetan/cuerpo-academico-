import os
import pymupdf
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, Image, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT, TA_JUSTIFY
from reportlab.lib.units import inch

def create_organigrama_vertical():
    pdf_path = "temp_organigrama_vertical.pdf"
    png_path = "Organigrama_Unidad_Receptora_UAS_0356_Vertical.png"

    # Letter portrait: 8.5 x 11 inches = 612 x 792 pt
    margin_x = 24
    margin_y = 20
    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=letter,
        leftMargin=margin_x,
        rightMargin=margin_x,
        topMargin=margin_y,
        bottomMargin=margin_y
    )

    # Printable width: 612 - 48 = 564 pt (~7.83 in)
    p_width = 564

    # Palette
    c_blue = colors.HexColor("#08338F")       # Pantone 661 C
    c_blue_dark = colors.HexColor("#052366")
    c_gold = colors.HexColor("#C49E0D")       # Pantone 117 C
    c_gold_dark = colors.HexColor("#9E7D07")
    c_gold_light = colors.HexColor("#FDF9EE")
    c_blue_light = colors.HexColor("#F0F4FC")
    c_dark = colors.HexColor("#1A202C")
    c_border = colors.HexColor("#CBD5E1")
    c_green = colors.HexColor("#0D7A5F")
    c_green_light = colors.HexColor("#EBFBF5")
    c_gray_bg = colors.HexColor("#F8FAFC")

    # Typography styles
    title_style = ParagraphStyle(
        'VTitle',
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=15,
        textColor=c_blue,
        alignment=TA_LEFT
    )

    subtitle_style = ParagraphStyle(
        'VSubtitle',
        fontName='Helvetica-Bold',
        fontSize=8,
        leading=10.5,
        textColor=c_gold,
        alignment=TA_LEFT
    )

    meta_header_style = ParagraphStyle(
        'VMetaHeader',
        fontName='Helvetica',
        fontSize=7,
        leading=9.5,
        textColor=colors.HexColor("#4A5568"),
        alignment=TA_RIGHT
    )

    badge_white = ParagraphStyle(
        'VBadgeWhite',
        fontName='Helvetica-Bold',
        fontSize=7,
        leading=8.5,
        textColor=colors.white,
        alignment=TA_CENTER
    )

    card_h1_white = ParagraphStyle(
        'VCardH1White',
        fontName='Helvetica-Bold',
        fontSize=9,
        leading=11.5,
        textColor=colors.white,
        alignment=TA_CENTER
    )

    card_sub_white = ParagraphStyle(
        'VCardSubWhite',
        fontName='Helvetica',
        fontSize=7,
        leading=9,
        textColor=colors.HexColor("#E2E8F0"),
        alignment=TA_CENTER
    )

    card_text_bold = ParagraphStyle(
        'VCardTextBold',
        fontName='Helvetica-Bold',
        fontSize=7.5,
        leading=10,
        textColor=c_dark,
        alignment=TA_CENTER
    )

    card_body_left = ParagraphStyle(
        'VCardBodyLeft',
        fontName='Helvetica',
        fontSize=7,
        leading=9.5,
        textColor=c_dark,
        alignment=TA_LEFT
    )

    arrow_style = ParagraphStyle(
        'VArrow',
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=9,
        textColor=c_gold,
        alignment=TA_CENTER
    )

    story = []

    # ================= 1. HEADER BRANDING =================
    logo_path = "public/assets/uas_logo_clean.png"
    if not os.path.exists(logo_path):
        logo_path = "public/assets/uas_imago.png"

    logo_img = Image(logo_path, width=1.1*inch, height=0.67*inch) if os.path.exists(logo_path) else Paragraph("<b>UAS</b>", title_style)

    header_text = [
        Paragraph("ORGANIGRAMA Y ESTRUCTURA ORGÁNICA", title_style),
        Paragraph("UNIDAD ACADÉMICA DE DERECHO Y CIENCIA POLÍTICA MOCHIS", subtitle_style),
        Paragraph("C.A. UAS - 0356: Estudios Socioculturales Político e Instituciones", ParagraphStyle('VSub2', fontName='Helvetica-Bold', fontSize=7.5, leading=9.5, textColor=c_blue)),
        Paragraph("Unidad Receptora Oficial de Servicio Social y Prácticas Profesionales", ParagraphStyle('VSub3', fontName='Helvetica', fontSize=6.5, leading=8.5, textColor=colors.HexColor("#64748B")))
    ]

    header_meta = [
        Paragraph("<b>Clave PRODEP:</b> UAS-0356", meta_header_style),
        Paragraph("<b>Región:</b> URN Los Mochis", meta_header_style),
        Paragraph("<b>Ubicación:</b> Cd. Universitaria", meta_header_style),
    ]

    header_table = Table(
        [[logo_img, header_text, header_meta]],
        colWidths=[1.15*inch, 5.0*inch, 1.68*inch]
    )
    header_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(header_table)
    story.append(Spacer(1, 2))
    story.append(HRFlowable(width="100%", thickness=1.5, color=c_blue, spaceBefore=2, spaceAfter=5))

    # ================= NIVEL 1: RECTORÍA GENERAL =================
    n1_data = [
        [Paragraph("NIVEL 1: GOBIERNO INSTITUCIONAL CENTRAL", badge_white)],
        [Paragraph("RECTORÍA GENERAL DE LA UNIVERSIDAD AUTÓNOMA DE SINALOA", card_h1_white)],
        [Paragraph("Máximo órgano ejecutivo y normativo del régimen universitario autónomo", card_sub_white)]
    ]
    t_n1 = Table(n1_data, colWidths=[p_width])
    t_n1.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), c_blue_dark),
        ('BACKGROUND', (0,1), (-1,-1), c_blue),
        ('ALIGN', (0,0), (-1,-1), 'CENTER'),
        ('TOPPADDING', (0,0), (-1,-1), 2),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2.5),
        ('BOX', (0,0), (-1,-1), 1, c_blue),
    ]))
    story.append(t_n1)
    story.append(Spacer(1, 2))
    story.append(Paragraph("▼", arrow_style))
    story.append(Spacer(1, 2))

    # ================= NIVEL 2: VICERRECTORÍA URN =================
    n2_data = [
        [Paragraph("NIVEL 2: COORDINACIÓN REGIONAL", badge_white)],
        [Paragraph("VICERRECTORÍA UNIDAD REGIONAL NORTE (URN)", card_h1_white)],
        [Paragraph("Conducción, gestión institucional y enlace operativo en la zona norte (Los Mochis, Ahome)", card_sub_white)]
    ]
    t_n2 = Table(n2_data, colWidths=[p_width])
    t_n2.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), c_blue_dark),
        ('BACKGROUND', (0,1), (-1,-1), c_blue),
        ('ALIGN', (0,0), (-1,-1), 'CENTER'),
        ('TOPPADDING', (0,0), (-1,-1), 2),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2.5),
        ('BOX', (0,0), (-1,-1), 1, c_blue),
    ]))
    story.append(t_n2)
    story.append(Spacer(1, 2))
    story.append(Paragraph("▼", arrow_style))
    story.append(Spacer(1, 2))

    # ================= NIVEL 3: DIRECCIÓN DE LA FACULTAD =================
    n3_data = [
        [Paragraph("NIVEL 3: TITULAR OFICIAL DE LA UNIDAD RECEPTORA", badge_white)],
        [Paragraph("DIRECCIÓN DE LA UNIDAD ACADÉMICA DE DERECHO Y CIENCIA POLÍTICA", card_h1_white)],
        [Paragraph("<b>Titular: Dr. Víctor Sepúlveda Álvarez</b> &nbsp;|&nbsp; Autoridad Ejecutiva de la Unidad Académica Receptora", ParagraphStyle('VDirSub', fontName='Helvetica', fontSize=7.5, leading=10, textColor=colors.HexColor("#FEF08A"), alignment=TA_CENTER))]
    ]
    t_n3 = Table(n3_data, colWidths=[p_width])
    t_n3.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), c_gold_dark),
        ('BACKGROUND', (0,1), (-1,-1), c_blue),
        ('ALIGN', (0,0), (-1,-1), 'CENTER'),
        ('TOPPADDING', (0,0), (-1,-1), 2),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
        ('BOX', (0,0), (-1,-1), 1, c_blue),
    ]))
    story.append(t_n3)
    story.append(Spacer(1, 2))
    story.append(Paragraph("▼ <i>Desconcentración Administrativa y Articulación Académica</i> ▼", ParagraphStyle('VSplitArr', fontName='Helvetica-Oblique', fontSize=6.5, leading=8.5, textColor=c_gold, alignment=TA_CENTER)))
    story.append(Spacer(1, 2))

    # ================= NIVEL 4 Y 5: PARALELOS (SECRETARÍAS Y VINCULACIÓN vs POSGRADO E INVESTIGACIÓN) =================
    # Izquierda: Vinculación & Secretarías (276 pt)
    card_4_data = [
        [Paragraph("NIVEL 4: VINCULACIÓN Y APOYO ADMINISTRATIVO", ParagraphStyle('H4Title', fontName='Helvetica-Bold', fontSize=7, leading=8.5, textColor=colors.white, alignment=TA_CENTER))],
        [Paragraph("<b>COORDINACIÓN DE SERVICIO SOCIAL Y VINCULACIÓN</b>", card_text_bold)],
        [Paragraph("• Asignación, registro de cartas de aceptación y convenios<br/>• Supervisión de informes bimestrales y constancias oficiales<br/>• Secretaría Académica (planes de estudio) y Administrativa (recursos)", card_body_left)]
    ]
    t_c4 = Table(card_4_data, colWidths=[276])
    t_c4.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#08338F")),
        ('BACKGROUND', (0,1), (-1,-1), colors.white),
        ('BOX', (0,0), (-1,-1), 1, c_blue),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor("#E2E8F0")),
        ('TOPPADDING', (0,0), (-1,-1), 2.5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
        ('LEFTPADDING', (0,0), (-1,-1), 5),
        ('RIGHTPADDING', (0,0), (-1,-1), 5),
    ]))

    # Derecha: Coordinación de Posgrado e Investigación (276 pt)
    card_5_data = [
        [Paragraph("NIVEL 5: CONDUCCIÓN CIENTÍFICA Y POSGRADO", ParagraphStyle('H5Title', fontName='Helvetica-Bold', fontSize=7, leading=8.5, textColor=colors.white, alignment=TA_CENTER))],
        [Paragraph("<b>COORDINACIÓN DE POSGRADO E INVESTIGACIÓN (UADyCP)</b>", card_text_bold)],
        [Paragraph("• Registro formal de Cuerpos Académicos ante PRODEP-SEP<br/>• Articulación con programas de Maestría y Doctorado<br/>• Fomento de proyectos editoriales, líneas LGAC y fondos", card_body_left)]
    ]
    t_c5 = Table(card_5_data, colWidths=[276])
    t_c5.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#334155")),
        ('BACKGROUND', (0,1), (-1,-1), colors.white),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#334155")),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor("#E2E8F0")),
        ('TOPPADDING', (0,0), (-1,-1), 2.5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
        ('LEFTPADDING', (0,0), (-1,-1), 5),
        ('RIGHTPADDING', (0,0), (-1,-1), 5),
    ]))

    row_mid = Table([[t_c4, Spacer(1,1), t_c5]], colWidths=[276, 12, 276])
    row_mid.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(row_mid)
    story.append(Spacer(1, 2))
    story.append(Paragraph("▼ <i>Adscripción Directa del Colectivo de Investigación (PRODEP / UAS)</i> ▼", ParagraphStyle('VArrCA', fontName='Helvetica-Oblique', fontSize=6.5, leading=8.5, textColor=c_gold, alignment=TA_CENTER)))
    story.append(Spacer(1, 2))

    # ================= NIVEL 6: CUERPO ACADÉMICO UAS-0356 (DESTACADO CENTRAL) =================
    ca_header = [
        [Paragraph("NIVEL 6: UNIDAD ESPECÍFICA RECEPTORA DIRECTA DE SERVICIO SOCIAL", ParagraphStyle('VBadgeCA', fontName='Helvetica-Bold', fontSize=7.5, leading=9.5, textColor=colors.white, alignment=TA_CENTER))],
        [Paragraph("CUERPO ACADÉMICO C.A. UAS - 0356<br/><font size=9.5 color='#C49E0D'>ESTUDIOS SOCIOCULTURALES POLÍTICO E INSTITUCIONES</font>", ParagraphStyle('VH6CA', fontName='Helvetica-Bold', fontSize=10.5, leading=13, textColor=c_blue, alignment=TA_CENTER))]
    ]
    t_ca_header = Table(ca_header, colWidths=[p_width])
    t_ca_header.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#B08D08")),
        ('BACKGROUND', (0,1), (-1,-1), c_gold_light),
        ('ALIGN', (0,0), (-1,-1), 'CENTER'),
        ('TOPPADDING', (0,0), (-1,-1), 2),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
    ]))

    ca_content_data = [
        [
            Paragraph("<b>Investigadores Integrantes (Núcleo Académico Básico):</b><br/>"
                      "• <b>Dra. Janeth Yolanda Gastélum Urquidy</b> (Responsable Colegiada)<br/>"
                      "• <b>Dr. Pedro Cázares Aboytes</b> &nbsp;|&nbsp; • <b>Dr. Ulises Suárez Estavillo</b><br/>"
                      "• <b>Dr. Rafael Santos Cenobio</b> &nbsp;|&nbsp; • <b>Dr. Luis Felipe Bernal Hernández</b>", card_body_left),
            Paragraph("<b>Líneas de Generación y Aplicación del Conocimiento (LGAC):</b><br/>"
                      "• <i>Dinámica Sociocultural, Democracia e Instituciones Políticas</i><br/>"
                      "• <i>Derechos Humanos, Análisis Jurídico y Políticas Públicas</i><br/>"
                      "• <i>Historia Regional y Cultura Cívica en el Noroeste Mexicano</i>", card_body_left)
        ]
    ]
    t_ca_content = Table(ca_content_data, colWidths=[282, 282])
    t_ca_content.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
        ('TOPPADDING', (0,0), (-1,-1), 3),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
    ]))

    ca_full = Table([[t_ca_header], [t_ca_content]], colWidths=[p_width])
    ca_full.setStyle(TableStyle([
        ('BACKGROUND', (0,1), (0,1), colors.white),
        ('BOX', (0,0), (-1,-1), 1.5, c_gold),
        ('LINEBELOW', (0,0), (0,0), 1, c_gold),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(ca_full)
    story.append(Spacer(1, 2))
    story.append(Paragraph("▼ <i>Inserción Operativa Directa y Tutoría Científica Continua</i> ▼", ParagraphStyle('VArrSS', fontName='Helvetica-Oblique', fontSize=6.5, leading=8.5, textColor=c_green, alignment=TA_CENTER)))
    story.append(Spacer(1, 2))

    # ================= NIVEL 7: PRESTADORES DE SERVICIO SOCIAL Y TESISTAS (VERDE) =================
    ss_header = [
        [Paragraph("NIVEL 7: EQUIPO OPERATIVO Y ESTUDIANTIL ADSCRITO A LA UNIDAD RECEPTORA", ParagraphStyle('VBadgeSS', fontName='Helvetica-Bold', fontSize=7.5, leading=9.5, textColor=colors.white, alignment=TA_CENTER))],
        [Paragraph("PRESTADORES DE SERVICIO SOCIAL • PRÁCTICAS PROFESIONALES • TESISTAS", ParagraphStyle('VH7SS', fontName='Helvetica-Bold', fontSize=9.5, leading=12, textColor=c_green, alignment=TA_CENTER))]
    ]
    t_ss_header = Table(ss_header, colWidths=[p_width])
    t_ss_header.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#0D7A5F")),
        ('BACKGROUND', (0,1), (-1,-1), c_green_light),
        ('ALIGN', (0,0), (-1,-1), 'CENTER'),
        ('TOPPADDING', (0,0), (-1,-1), 2),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
    ]))

    ss_tasks_grid = [
        [
            Paragraph("<b>1. Sistematización Documental y Hemerográfica:</b><br/>"
                      "Catalogación bibliográfica, archivo temático de notas de prensa, leyes y fuentes históricas sobre Sinaloa.", card_body_left),
            Paragraph("<b>2. Apoyo en Investigación Empírica:</b><br/>"
                      "Captura, codificación y procesamiento de datos cualitativos y cuantitativos vinculados a las LGAC.", card_body_left),
        ],
        [
            Paragraph("<b>3. Soporte Logístico Académico:</b><br/>"
                      "Organización de mesas redondas, relatoría técnica en seminarios y enlace con instituciones cívicas.", card_body_left),
            Paragraph("<b>4. Asistencia Editorial y Revisión de Estilo:</b><br/>"
                      "Cotejo de referencias en normas APA, revisión ortotipográfica y apoyo en maquetación de libros y ponencias.", card_body_left),
        ]
    ]
    t_ss_tasks = Table(ss_tasks_grid, colWidths=[282, 282])
    t_ss_tasks.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
        ('TOPPADDING', (0,0), (-1,-1), 3),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor("#E2E8F0")),
    ]))

    ss_full = Table([[t_ss_header], [t_ss_tasks]], colWidths=[p_width])
    ss_full.setStyle(TableStyle([
        ('BACKGROUND', (0,1), (0,1), colors.white),
        ('BOX', (0,0), (-1,-1), 1.5, c_green),
        ('LINEBELOW', (0,0), (0,0), 1, c_green),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(ss_full)
    story.append(Spacer(1, 4))

    # ================= 5. FOOTER INFORMATIVO Y SIMBOLOGÍA =================
    footer_text = [
        Paragraph("<b>Simbología de Flujos:</b> <b>[Azul]</b> Jerarquía Institucional UAS &nbsp;|&nbsp; <b>[Dorado]</b> Dirección y Núcleo Científico CA-UAS-0356 &nbsp;|&nbsp; <b>[Verde]</b> Estructura de Servicio Social", ParagraphStyle('VSim', fontName='Helvetica', fontSize=6.5, leading=8.5, textColor=colors.HexColor("#475569"))),
        Paragraph("Documento elaborado conforme a la Guía Oficial de Servicio Social • UADyCP Mochis • UAS", ParagraphStyle('VCopy', fontName='Helvetica-Oblique', fontSize=6, leading=8, textColor=colors.HexColor("#94A3B8"), alignment=TA_RIGHT))
    ]
    footer_table = Table([[footer_text[0], footer_text[1]]], colWidths=[350, 214])
    footer_table.setStyle(TableStyle([
        ('LINEABOVE', (0,0), (-1,-1), 0.5, colors.HexColor("#CBD5E1")),
        ('TOPPADDING', (0,0), (-1,-1), 2),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(footer_table)

    # Build PDF
    doc.build(story)
    print("Temporary vertical PDF generated.")

    # Convert to high-resolution PNG
    doc_fitz = pymupdf.open(pdf_path)
    page_count = len(doc_fitz)
    print(f"Total pages in vertical PDF: {page_count}")
    
    # Render page 1
    page = doc_fitz[0]
    pix = page.get_pixmap(dpi=220)
    pix.save(png_path)
    print(f"Organigram Vertical PNG generated successfully: {png_path} ({pix.width}x{pix.height} px)")

    # Also save to public/
    pix.save(os.path.join("public", "Organigrama_Unidad_Receptora_UAS_0356_Vertical.png"))

    doc_fitz.close()
    if os.path.exists(pdf_path):
        os.remove(pdf_path)

if __name__ == "__main__":
    create_organigrama_vertical()
