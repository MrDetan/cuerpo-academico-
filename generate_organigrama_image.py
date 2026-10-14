import os
import pymupdf
from reportlab.lib.pagesizes import landscape, letter
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, Image, HRFlowable, KeepTogether
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY, TA_RIGHT
from reportlab.lib.units import inch

def create_organigrama_graphic():
    pdf_path = "temp_organigrama.pdf"
    png_path = "Organigrama_Unidad_Receptora_UAS_0356.png"

    # Letter landscape: 11 x 8.5 inches = 792 x 612 pt
    margin = 25
    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=landscape(letter),
        leftMargin=margin,
        rightMargin=margin,
        topMargin=margin,
        bottomMargin=margin
    )

    # Color Palette UAS Official
    c_blue = colors.HexColor("#08338F")       # Pantone 661 C
    c_gold = colors.HexColor("#C49E0D")       # Pantone 117 C
    c_gold_light = colors.HexColor("#FDF9EE")
    c_blue_light = colors.HexColor("#F0F4FC")
    c_dark = colors.HexColor("#1A202C")
    c_border = colors.HexColor("#CBD5E1")
    c_card_bg = colors.HexColor("#F8FAFC")
    c_green = colors.HexColor("#0D7A5F")
    c_green_light = colors.HexColor("#EBFBF5")

    styles = getSampleStyleSheet()

    # Typography styles
    title_style = ParagraphStyle(
        'OrgTitle',
        fontName='Helvetica-Bold',
        fontSize=15,
        leading=18,
        textColor=c_blue,
        alignment=TA_LEFT
    )

    subtitle_style = ParagraphStyle(
        'OrgSubtitle',
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=13,
        textColor=c_gold,
        alignment=TA_LEFT
    )

    meta_header_style = ParagraphStyle(
        'MetaHeader',
        fontName='Helvetica',
        fontSize=8,
        leading=11,
        textColor=colors.HexColor("#4A5568"),
        alignment=TA_RIGHT
    )

    card_title_blue = ParagraphStyle(
        'CardTitleBlue',
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=12.5,
        textColor=colors.white,
        alignment=TA_CENTER
    )

    card_sub_white = ParagraphStyle(
        'CardSubWhite',
        fontName='Helvetica',
        fontSize=7.5,
        leading=10,
        textColor=colors.HexColor("#E2E8F0"),
        alignment=TA_CENTER
    )

    card_title_gold = ParagraphStyle(
        'CardTitleGold',
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=13,
        textColor=colors.HexColor("#5D4700"),
        alignment=TA_CENTER
    )

    card_text_bold = ParagraphStyle(
        'CardTextBold',
        fontName='Helvetica-Bold',
        fontSize=8,
        leading=11,
        textColor=c_dark,
        alignment=TA_CENTER
    )

    card_text_small = ParagraphStyle(
        'CardTextSmall',
        fontName='Helvetica',
        fontSize=7.5,
        leading=10,
        textColor=colors.HexColor("#4A5568"),
        alignment=TA_CENTER
    )

    card_body_left = ParagraphStyle(
        'CardBodyLeft',
        fontName='Helvetica',
        fontSize=7.5,
        leading=10.5,
        textColor=c_dark,
        alignment=TA_LEFT
    )

    badge_style = ParagraphStyle(
        'BadgeStyle',
        fontName='Helvetica-Bold',
        fontSize=7,
        leading=9,
        textColor=colors.white,
        alignment=TA_CENTER
    )

    arrow_style = ParagraphStyle(
        'Arrow',
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=12,
        textColor=c_gold,
        alignment=TA_CENTER
    )

    story = []

    # ================= 1. HEADER BRANDING =================
    logo_path = "public/assets/uas_logo_clean.png"
    if not os.path.exists(logo_path):
        logo_path = "public/assets/uas_imago.png"

    logo_img = Image(logo_path, width=1.4*inch, height=0.85*inch) if os.path.exists(logo_path) else Paragraph("<b>UAS</b>", title_style)

    header_text = [
        Paragraph("ORGANIGRAMA Y ESTRUCTURA FUNCIONAL DE LA UNIDAD RECEPTORA", title_style),
        Paragraph("UNIVERSIDAD AUTÓNOMA DE SINALOA • UNIDAD ACADÉMICA DE DERECHO Y CIENCIA POLÍTICA MOCHIS", subtitle_style),
        Paragraph("Estructura de Coordinación Académica, Operativa y de Servicio Social / Prácticas Profesionales", ParagraphStyle('SubSub', fontName='Helvetica', fontSize=7.5, leading=10, textColor=colors.HexColor("#64748B")))
    ]

    header_meta = [
        Paragraph("<b>Clave Entidad:</b> CA-UAS-0356", meta_header_style),
        Paragraph("<b>Sede:</b> Cd. Universitaria Los Mochis, URN", meta_header_style),
        Paragraph("<b>Área:</b> Posgrado e Investigación", meta_header_style),
    ]

    header_table = Table(
        [[logo_img, header_text, header_meta]],
        colWidths=[1.5*inch, 6.2*inch, 2.5*inch]
    )
    header_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(header_table)
    story.append(Spacer(1, 4))
    story.append(HRFlowable(width="100%", thickness=1.5, color=c_blue, spaceBefore=3, spaceAfter=8))

    # ================= 2. NIVEL INSTITUCIONAL SUPERIOR (3 CARDS HORIZONTALES) =================
    # Card 1: Rectoría General
    c1 = [
        [Paragraph("NIVEL 1: GOBIERNO INSTITUCIONAL", badge_style)],
        [Paragraph("<b>RECTORÍA GENERAL DE LA UAS</b>", card_title_blue)],
        [Paragraph("Órgano Central de Conducción Universitaria y Normativa", card_sub_white)]
    ]
    t_c1 = Table(c1, colWidths=[3.1*inch])
    t_c1.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#052366")),
        ('BACKGROUND', (0,1), (-1,-1), c_blue),
        ('ALIGN', (0,0), (-1,-1), 'CENTER'),
        ('TOPPADDING', (0,0), (-1,-1), 3),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
        ('BOX', (0,0), (-1,-1), 1, c_blue),
    ]))

    # Card 2: Vicerrectoría URN
    c2 = [
        [Paragraph("NIVEL 2: COORDINACIÓN REGIONAL", badge_style)],
        [Paragraph("<b>VICERRECTORÍA UNIDAD REGIONAL NORTE</b>", card_title_blue)],
        [Paragraph("Supervisión Académica y Enlace Regional (Zona Los Mochis)", card_sub_white)]
    ]
    t_c2 = Table(c2, colWidths=[3.2*inch])
    t_c2.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#052366")),
        ('BACKGROUND', (0,1), (-1,-1), c_blue),
        ('ALIGN', (0,0), (-1,-1), 'CENTER'),
        ('TOPPADDING', (0,0), (-1,-1), 3),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
        ('BOX', (0,0), (-1,-1), 1, c_blue),
    ]))

    # Card 3: Dirección UADyCP
    c3 = [
        [Paragraph("NIVEL 3: TITULAR UNIDAD RECEPTORA", badge_style)],
        [Paragraph("<b>DIRECCIÓN DE LA FACULTAD (UADyCP)</b>", card_title_blue)],
        [Paragraph("<b>Titular: Dr. Víctor Sepúlveda Álvarez</b><br/>Autoridad Máxima de la Unidad Académica y Receptora", card_sub_white)]
    ]
    t_c3 = Table(c3, colWidths=[3.5*inch])
    t_c3.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#9E7D07")),
        ('BACKGROUND', (0,1), (-1,-1), c_blue),
        ('ALIGN', (0,0), (-1,-1), 'CENTER'),
        ('TOPPADDING', (0,0), (-1,-1), 3),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
        ('BOX', (0,0), (-1,-1), 1, c_blue),
    ]))

    row_top = Table([[t_c1, Paragraph("➜", arrow_style), t_c2, Paragraph("➜", arrow_style), t_c3]],
                    colWidths=[3.1*inch, 0.2*inch, 3.2*inch, 0.2*inch, 3.5*inch])
    row_top.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('ALIGN', (0,0), (-1,-1), 'CENTER'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(row_top)
    story.append(Spacer(1, 7))

    # Connector down arrow to sub-levels
    down_split = Table(
        [[Paragraph("▼ ENLACE INSTITUCIONAL Y ADMINISTRATIVO ▼", ParagraphStyle('Div1', fontName='Helvetica-Bold', fontSize=8, leading=10, textColor=c_blue, alignment=TA_CENTER)),
          Paragraph("▼ ADSCRIPCIÓN SUSTANTIVA Y CIENTÍFICA ▼", ParagraphStyle('Div2', fontName='Helvetica-Bold', fontSize=8, leading=10, textColor=c_gold, alignment=TA_CENTER))]],
        colWidths=[3.3*inch, 6.9*inch]
    )
    down_split.setStyle(TableStyle([
        ('ALIGN', (0,0), (-1,-1), 'CENTER'),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2),
    ]))
    story.append(down_split)
    story.append(Spacer(1, 3))

    # ================= 3. CUERPO PRINCIPAL: 2 COLUMNAS (ADMINISTRATIVO vs INVESTIGACIÓN) =================
    
    # --- COLUMNA IZQUIERDA: Apoyo, Secretaría y Vinculación ---
    col_left_data = [
        [Paragraph("NIVEL 4A: GESTIÓN Y VINCULACIÓN NORMATIVA", ParagraphStyle('H4A', fontName='Helvetica-Bold', fontSize=8, leading=10, textColor=colors.white, alignment=TA_CENTER))],
        [Paragraph("<b>COORDINACIÓN DE SERVICIO SOCIAL Y VINCULACIÓN</b>", card_text_bold)],
        [Paragraph("• Registro, validación de cartas y asignación oficial<br/>• Control de seguimiento normativo y acreditación<br/>• Supervisión de informes bimestrales y final", card_body_left)],
        [Spacer(1, 3)],
        [Paragraph("<b>SECRETARÍAS DE APOYO INSTITUCIONAL</b>", card_text_bold)],
        [Paragraph("• <b>Secretaría Académica:</b> Planes de estudio y validación curricular<br/>• <b>Secretaría Administrativa:</b> Recursos, espacios e infraestructura", card_body_left)]
    ]
    t_col_left = Table(col_left_data, colWidths=[3.3*inch])
    t_col_left.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#08338F")),
        ('BACKGROUND', (0,1), (-1,-1), colors.white),
        ('BOX', (0,0), (-1,-1), 1, c_blue),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor("#F1F5F9")),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
    ]))

    # --- COLUMNA DERECHA: Coordinación de Posgrado -> CUERPO ACADÉMICO -> PRESTADORES DE SERVICIO SOCIAL ---
    
    # Sub-card: Coordinación de Posgrado
    posgrado_card = [
        [Paragraph("NIVEL 5: ÁREA SUSTANTIVA DE INVESTIGACIÓN", ParagraphStyle('H5', fontName='Helvetica-Bold', fontSize=7.5, leading=9.5, textColor=colors.white, alignment=TA_CENTER))],
        [Paragraph("<b>COORDINACIÓN DE POSGRADO E INVESTIGACIÓN (UADyCP)</b>", ParagraphStyle('H5b', fontName='Helvetica-Bold', fontSize=8.5, leading=11, textColor=c_blue, alignment=TA_CENTER))],
        [Paragraph("Instancia que articula la investigación científica, programas de posgrado y registro formal de Cuerpos Académicos PRODEP.", card_text_small)]
    ]
    t_posgrado = Table(posgrado_card, colWidths=[6.9*inch])
    t_posgrado.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#334155")),
        ('BACKGROUND', (0,1), (-1,-1), colors.HexColor("#F8FAFC")),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#CBD5E1")),
        ('TOPPADDING', (0,0), (-1,-1), 2),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2),
        ('ALIGN', (0,0), (-1,-1), 'CENTER'),
    ]))

    # Sub-card: CUERPO ACADÉMICO UAS-0356 (DESTACADO EN DORADO Y AZUL)
    ca_header = [
        [Paragraph("NIVEL 6: UNIDAD ESPECÍFICA RECEPTORA DIRECTA (PRODEP / UAS)", ParagraphStyle('BadgeCA', fontName='Helvetica-Bold', fontSize=8, leading=10, textColor=colors.white, alignment=TA_CENTER))],
        [Paragraph("CUERPO ACADÉMICO C.A. UAS - 0356<br/><font size=9.5 color='#C49E0D'>ESTUDIOS SOCIOCULTURALES POLÍTICO E INSTITUCIONES</font>", ParagraphStyle('H6CA', fontName='Helvetica-Bold', fontSize=11, leading=14, textColor=c_blue, alignment=TA_CENTER))],
    ]
    t_ca_header = Table(ca_header, colWidths=[6.9*inch])
    t_ca_header.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#B08D08")),
        ('BACKGROUND', (0,1), (-1,-1), c_gold_light),
        ('ALIGN', (0,0), (-1,-1), 'CENTER'),
        ('TOPPADDING', (0,0), (-1,-1), 2),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
    ]))

    ca_team_data = [
        [
            Paragraph("<b>Investigadores Integrantes del Núcleo Básico:</b><br/>"
                      "• <b>Dra. Janeth Yolanda Gastélum Urquidy</b> (Responsable / Representante)<br/>"
                      "• <b>Dr. Pedro Cázares Aboytes</b> • <b>Dr. Ulises Suárez Estavillo</b><br/>"
                      "• <b>Dr. Rafael Santos Cenobio</b> • <b>Dr. Luis Felipe Bernal Hernández</b>", card_body_left),
            Paragraph("<b>Líneas de Generación y Aplicación (LGAC):</b><br/>"
                      "• <i>Dinámica Sociocultural, Democracia e Instituciones Políticas</i><br/>"
                      "• <i>Derechos Humanos, Análisis Jurídico y Políticas Públicas</i><br/>"
                      "• <i>Estudios Históricos, Regionales y Cultura Cívica en Sinaloa</i>", card_body_left)
        ]
    ]
    t_ca_team = Table(ca_team_data, colWidths=[3.6*inch, 3.1*inch])
    t_ca_team.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 4),
        ('RIGHTPADDING', (0,0), (-1,-1), 4),
        ('TOPPADDING', (0,0), (-1,-1), 2),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2),
    ]))

    ca_full_table = Table([
        [t_ca_header],
        [t_ca_team]
    ], colWidths=[6.9*inch])
    ca_full_table.setStyle(TableStyle([
        ('BACKGROUND', (0,1), (0,1), colors.white),
        ('BOX', (0,0), (-1,-1), 1.5, c_gold),
        ('LINEBELOW', (0,0), (0,0), 1, c_gold),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))

    # Sub-card: PRESTADORES DE SERVICIO SOCIAL Y TESISTAS (NIVEL 7)
    ss_header = [
        [Paragraph("NIVEL 7: EQUIPO OPERATIVO Y ESTUDIANTIL ADSCRITO", ParagraphStyle('BadgeSS', fontName='Helvetica-Bold', fontSize=8, leading=10, textColor=colors.white, alignment=TA_CENTER))],
        [Paragraph("PRESTADORES DE SERVICIO SOCIAL • PRÁCTICAS PROFESIONALES • TESISTAS", ParagraphStyle('H7SS', fontName='Helvetica-Bold', fontSize=10, leading=13, textColor=c_green, alignment=TA_CENTER))]
    ]
    t_ss_header = Table(ss_header, colWidths=[6.9*inch])
    t_ss_header.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#0D7A5F")),
        ('BACKGROUND', (0,1), (-1,-1), c_green_light),
        ('ALIGN', (0,0), (-1,-1), 'CENTER'),
        ('TOPPADDING', (0,0), (-1,-1), 2),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
    ]))

    ss_tasks_data = [
        [
            Paragraph("<b>1. Sistematización Documental:</b><br/>"
                      "Catalogación bibliográfica, fichas hemerográficas y archivo histórico de fuentes primarias.", card_body_left),
            Paragraph("<b>2. Apoyo en Investigación Empírica:</b><br/>"
                      "Captura y procesamiento de bases de datos cualitativas y cuantitativas sobre Sinaloa.", card_body_left),
        ],
        [
            Paragraph("<b>3. Soporte Logístico Académico:</b><br/>"
                      "Organización y relatoría en coloquios, foros de debate y seminarios metodológicos.", card_body_left),
            Paragraph("<b>4. Asistencia Editorial:</b><br/>"
                      "Revisión de estilo, cotejo de citas bibliográficas (APA) y apoyo en maquetación de libros y artículos.", card_body_left),
        ]
    ]
    t_ss_tasks = Table(ss_tasks_data, colWidths=[3.35*inch, 3.35*inch])
    t_ss_tasks.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 4),
        ('RIGHTPADDING', (0,0), (-1,-1), 4),
        ('TOPPADDING', (0,0), (-1,-1), 2),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor("#E2E8F0")),
    ]))

    ss_full_table = Table([
        [t_ss_header],
        [t_ss_tasks]
    ], colWidths=[6.9*inch])
    ss_full_table.setStyle(TableStyle([
        ('BACKGROUND', (0,1), (0,1), colors.white),
        ('BOX', (0,0), (-1,-1), 1.5, c_green),
        ('LINEBELOW', (0,0), (0,0), 1, c_green),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
    ]))

    # Ensamblar Columna Derecha con flechas de conexión
    col_right_elements = [
        [t_posgrado],
        [Paragraph("▼ <i>Adscripción de Cuerpos Colegiados de Investigación</i> ▼", ParagraphStyle('Arr1', fontName='Helvetica-Oblique', fontSize=7, leading=9, textColor=c_gold, alignment=TA_CENTER))],
        [ca_full_table],
        [Paragraph("▼ <i>Inserción Operativa Directa y Asesoría Científica Continua</i> ▼", ParagraphStyle('Arr2', fontName='Helvetica-Oblique', fontSize=7, leading=9, textColor=c_green, alignment=TA_CENTER))],
        [ss_full_table]
    ]
    t_col_right = Table(col_right_elements, colWidths=[6.9*inch])
    t_col_right.setStyle(TableStyle([
        ('ALIGN', (0,0), (-1,-1), 'CENTER'),
        ('TOPPADDING', (0,0), (-1,-1), 1),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))

    # Juntar Columna Izquierda y Derecha
    main_body = Table([[t_col_left, t_col_right]], colWidths=[3.3*inch, 6.9*inch])
    main_body.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
        ('TOPPADDING', (0,0), (-1,-1), 0),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(main_body)
    story.append(Spacer(1, 5))

    # ================= 4. FOOTER INFORMATIVO Y SIMBOLOGÍA =================
    footer_text = [
        Paragraph("<b>Simbología de Flujos:</b> <b>[Azul]</b> Jerarquía Institucional y Normativa UAS &nbsp;|&nbsp; <b>[Dorado]</b> Dirección y Núcleo Científico CA-UAS-0356 &nbsp;|&nbsp; <b>[Verde]</b> Equipo Operativo de Servicio Social", ParagraphStyle('Sim', fontName='Helvetica', fontSize=7, leading=9, textColor=colors.HexColor("#475569"))),
        Paragraph("Documento de diagnóstico y estructura organizacional elaborado conforme a la Guía Oficial de Servicio Social y Prácticas Profesionales • UADyCP Mochis", ParagraphStyle('Copy', fontName='Helvetica-Oblique', fontSize=6.5, leading=8.5, textColor=colors.HexColor("#94A3B8"), alignment=TA_RIGHT))
    ]
    footer_table = Table([[footer_text[0], footer_text[1]]], colWidths=[6.0*inch, 4.2*inch])
    footer_table.setStyle(TableStyle([
        ('LINEABOVE', (0,0), (-1,-1), 0.5, colors.HexColor("#CBD5E1")),
        ('TOPPADDING', (0,0), (-1,-1), 3),
        ('BOTTOMPADDING', (0,0), (-1,-1), 0),
        ('LEFTPADDING', (0,0), (-1,-1), 0),
        ('RIGHTPADDING', (0,0), (-1,-1), 0),
    ]))
    story.append(footer_table)

    # Construir PDF
    doc.build(story)
    print("Temporary organigram PDF generated successfully.")

    # Convertir a imagen PNG de alta resolución usando PyMuPDF
    doc_fitz = pymupdf.open(pdf_path)
    page = doc_fitz[0]
    # DPI 200 para excelente calidad gráfica y texto nítido
    pix = page.get_pixmap(dpi=220)
    pix.save(png_path)
    print(f"Organigram graphic image generated successfully: {png_path} ({pix.width}x{pix.height} px)")

    # Copiar también a public/ para disponibilidad web si se requiere
    pix.save(os.path.join("public", "Organigrama_Unidad_Receptora_UAS_0356.png"))
    
    # Limpieza
    doc_fitz.close()
    if os.path.exists(pdf_path):
        os.remove(pdf_path)

if __name__ == "__main__":
    create_organigrama_graphic()
