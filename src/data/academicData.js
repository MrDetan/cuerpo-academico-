/**
 * DATOS CENTRALIZADOS DEL CUERPO ACADÉMICO UAS-CA-318
 * Universidad Autónoma de Sinaloa (UAS)
 * Unidad Académica: Facultad de Derecho y Ciencia Política (Los Mochis, Sin.)
 * Unidad Regional Norte
 */

export const academicBodyData = {
  codigo: "UAS-CA-318",
  nombre: "Estudios Políticos, Políticas Públicas y Gobernanza Democrática",
  grado: "En Consolidación (PRODEP)",
  institucion: "Universidad Autónoma de Sinaloa",
  unidadAcademica: "Facultad de Derecho y Ciencia Política",
  zona: "Unidad Regional Norte • Los Mochis, Sinaloa",
  lema: "Sursum Versus • Ciencia política rigurosa con pertinencia regional y compromiso democrático",
  descripcion: "El Cuerpo Académico UAS-CA-318 agrupa la investigación científica sobre la transformación de las instituciones democráticas, el comportamiento electoral, las políticas públicas locales y la gobernanza en los municipios del estado de Sinaloa y el noroeste de México.",
  
  metricas: [
    { numero: "48+", etiqueta: "Artículos Arbitrados", descripcion: "En revistas indexadas JCR, Scopus y SciELO" },
    { numero: "16", etiqueta: "Libros y Capítulos", descripcion: "Publicados con sellos editoriales de prestigio nacional" },
    { numero: "09", etiqueta: "Proyectos Financiados", descripcion: "Fondos Conahcyt, PROFEXCE y PROFAPI UAS" },
    { numero: "32", etiqueta: "Tesis Dirigidas", descripcion: "Posgrado en Ciencia Política y Licenciatura" }
  ],

  lgac: [
    {
      id: "lgac-1",
      codigo: "LGAC 01",
      titulo: "Gobernanza Local, Instituciones Electorales y Democracia Subnacional",
      descripcion: "Análisis sistemático de los procesos electorales, la alternancia política, el desempeño de los organismos públicos electorales (IEES) y la rendición de cuentas horizontal en los 18 municipios de Sinaloa y el noroeste mexicano.",
      proyectosClave: ["Alternancia partidista y élites políticas en el norte de Sinaloa (2010-2024)", "Evaluación del impacto del voto electrónico y mecanismos de participación cívica en Ahome y Guasave."]
    },
    {
      id: "lgac-2",
      codigo: "LGAC 02",
      titulo: "Políticas Públicas, Desarrollo Municipal y Participación Ciudadana",
      descripcion: "Evaluación del diseño, implementación y resultados de políticas públicas orientadas al combate a la desigualdad, la seguridad ciudadana y la gestión participativa del presupuesto en los gobiernos municipales del norte de Sinaloa.",
      proyectosClave: ["Presupuesto participativo y deliberación comunitaria en el Municipio de Ahome", "Capacidad institucional y modernización administrativa en ayuntamientos agrícolas y pesqueros."]
    },
    {
      id: "lgac-3",
      codigo: "LGAC 03",
      titulo: "Cultura Política, Comunicación de Gobierno y Transparencia Institucional",
      descripcion: "Estudio de las narrativas gubernamentales, la fiscalización de los recursos públicos, la evolución de los órganos garantes de transparencia (CEAIP) y el surgimiento de nuevos liderazgos de opinión pública.",
      proyectosClave: ["Transparencia proactiva y combate a la corrupción en la administración pública estatal", "Discurso electoral y redes sociodigitales en las campañas contemporáneas."]
    }
  ],

  contacto: {
    direccion: "Av. Universidad y Ángel Flores s/n, Ciudad Universitaria, Los Mochis, Sinaloa, C.P. 81223",
    edificio: "Edificio de Posgrado e Investigación, Cubículos 14 y 19, Facultad de Derecho y Ciencia Política",
    telefono: "+52 (668) 812-4520 ext. 114",
    email: "cuerpoacademico.politica.lm@uas.edu.mx",
    horario: "Lunes a Viernes: 08:00 - 15:00 hrs"
  }
};

export const professorsData = [
  {
    id: "dra-celia-gastelum",
    nombreCompleto: "Dra. Celia Margarita Gastélum Norzagaray",
    tituloCorto: "Dra. Celia M. Gastélum",
    cargo: "Profesora-Investigadora Titular C • Responsable del Cuerpo Académico",
    snii: "SNII Nivel I (Conahcyt)",
    prodep: "Perfil Deseable PRODEP Vigente",
    foto: "/assets/dra_celia_gastelum.jpg",
    email: "celia.gastelum@uas.edu.mx",
    orcid: "0000-0002-8419-7201",
    scholar: "https://scholar.google.com/citations?user=UAS_Celia_Gastelum",
    citasTotales: 342,
    indiceH: 11,
    resumen: "Especialista en instituciones democráticas subnacionales, alternancia electoral y gobernanza municipal. Doctora en Ciencia Política por la UNAM con mención honorífica. Líder de proyectos sobre comportamiento cívico y elecciones en el norte de Sinaloa.",
    biografia: `La Dra. Celia Margarita Gastélum Norzagaray es Profesora-Investigadora de Tiempo Completo Titular C adscrita a la Facultad de Derecho y Ciencia Política de la Universidad Autónoma de Sinaloa (Unidad Regional Norte, Los Mochis). Cuenta con el reconocimiento de Investigadora Nacional Nivel I por el Sistema Nacional de Investigadoras e Investigadores (SNII) del Conahcyt y mantiene Perfil Deseable PRODEP de forma ininterrumpida desde 2017.

Obtuvo el grado de Doctora en Ciencia Política con Mención Honorífica por la Universidad Nacional Autónoma de México (UNAM), la Maestría en Estudios Regionales por El Colegio de Sonora (COLSON) y la Licenciatura en Ciencia Política por la Universidad Autónoma de Sinaloa. Es miembro activo de la Asociación Mexicana de Ciencia Política (AMECIP) y de la Red de Investigadores sobre Gobiernos Locales Mexicanos (IGLOM).

Sus líneas de trabajo abordan la arquitectura institucional electoral en entidades federativas, los patrones de alternancia partidista municipal en Sinaloa y el papel de las mujeres en los espacios de decisión pública local. Ha sido evaluadora de proyectos científicos para el Conahcyt y dictaminadora en revistas arbitradas como 'Revista Mexicana de Sociología', 'Polis' y 'Región y Sociedad'.`,
    
    educacion: [
      { grado: "Doctorado en Ciencia Política", institucion: "Universidad Nacional Autónoma de México (UNAM)", anio: "2016", distincion: "Mención Honorífica y Medalla Alfonso Caso" },
      { grado: "Maestría en Estudios Regionales", institucion: "El Colegio de Sonora (COLSON)", anio: "2011", distincion: "Beca de Excelencia Conacyt" },
      { grado: "Licenciatura en Ciencia Política", institucion: "Universidad Autónoma de Sinaloa (UAS)", anio: "2007", distincion: "Mención al Mérito Académico Generacional" }
    ],

    lineasInvestigacion: [
      "Instituciones Electorales y Comportamiento Electoral en Sinaloa",
      "Gobernanza Municipal, Autonomía Local y Presupuesto Participativo",
      "Representación Política de las Mujeres en Gobiernos Locales"
    ],

    distinciones: [
      "Miembro del Sistema Nacional de Investigadoras e Investigadores (SNII Nivel I, Conahcyt).",
      "Reconocimiento a Perfil Deseable PRODEP (Secretaría de Educación Pública).",
      "Premio a la Mejor Tesis Doctoral en Estudios Políticos Regionales (Mención AMECIP).",
      "Docente del Año 2023 por la Facultad de Derecho y Ciencia Política, UAS Los Mochis."
    ],

    trabajos: [
      {
        id: "cg-art-1",
        tipo: "Artículo",
        tipoDetalle: "Revista Indexada (Scopus / SciELO)",
        titulo: "Alternancia política y fragmentación del voto municipal en el norte de Sinaloa: una perspectiva diacrónica (2001-2024)",
        revista: "Revista Mexicana de Ciencias Políticas y Sociales",
        volumen: "Vol. LXVIII, Núm. 250, pp. 115-144",
        anio: 2024,
        doi: "10.22201/fcpys.2448492x.2024.250.81290",
        resumen: "Este artículo examina las fluctuaciones del índice de número efectivo de partidos electorales y la volatilidad en los comicios para presidencias municipales en Ahome, El Fuerte y Choix. Los hallazgos revelan una creciente heterogeneidad del electorado sinaloense y el debilitamiento de las lealtades corporativas tradicionales.",
        autores: "Gastélum Norzagaray, C. M. y Valenzuela Cázarez, J. R.",
        citas: 18,
        enlace: "https://doi.org/10.22201/fcpys.2448492x.2024.250.81290",
        bibtex: `@article{gastelum2024alternancia,
  title={Alternancia política y fragmentación del voto municipal en el norte de Sinaloa: una perspectiva diacrónica (2001-2024)},
  author={Gastélum Norzagaray, Celia Margarita and Valenzuela Cázarez, Jesús Roberto},
  journal={Revista Mexicana de Ciencias Políticas y Sociales},
  volume={68},
  number={250},
  pages={115--144},
  year={2024},
  doi={10.22201/fcpys.2448492x.2024.250.81290}
}`
      },
      {
        id: "cg-art-2",
        tipo: "Artículo",
        tipoDetalle: "Revista Indexada (JCR Q2)",
        titulo: "Democracia participativa en municipios periféricos: lecciones del presupuesto participativo en el noroeste de México",
        revista: "Gestión y Política Pública (CIDE)",
        volumen: "Vol. XXXII, Núm. 2, pp. 89-122",
        anio: 2023,
        doi: "10.29265/gypp.v32i2.1104",
        resumen: "Se analiza el modelo de asambleas deliberativas implementado en sindicaturas rurales del municipio de Ahome, evaluando la cooptación clientelar frente al empoderamiento cívico efectivo y la distribución de obra pública comunitaria.",
        autores: "Gastélum Norzagaray, C. M.",
        citas: 32,
        enlace: "https://doi.org/10.29265/gypp.v32i2.1104",
        bibtex: `@article{gastelum2023democracia,
  title={Democracia participativa en municipios periféricos: lecciones del presupuesto participativo en el noroeste de México},
  author={Gastélum Norzagaray, Celia Margarita},
  journal={Gestión y Política Pública},
  volume={32},
  number={2},
  pages={89--122},
  year={2023},
  doi={10.29265/gypp.v32i2.1104}
}`
      },
      {
        id: "cg-lib-1",
        tipo: "Libro",
        tipoDetalle: "Libro de Investigación con Arbitraje Ciego",
        titulo: "Poder Local y Ciudadanía en Sinaloa: De la Hegemonía a la Competitividad Democrática",
        editorial: "Editorial UAS & Siglo XXI Editores",
        lugar: "Culiacán / Ciudad de México",
        paginas: "312 págs. ISBN: 978-607-8845-12-8",
        anio: 2022,
        resumen: "Obra monográfica que sistematiza dos décadas de transformaciones en el régimen político de Sinaloa, articulando el papel de los movimientos cívicos, el periodismo de investigación y la reconfiguración de los cabildos municipales.",
        autores: "Gastélum Norzagaray, C. M. (Coordinadora y Autora)",
        citas: 44,
        enlace: "#",
        bibtex: `@book{gastelum2022poder,
  title={Poder Local y Ciudadanía en Sinaloa: De la Hegemonía a la Competitividad Democrática},
  author={Gastélum Norzagaray, Celia Margarita},
  year={2022},
  publisher={Editorial UAS / Siglo XXI Editores},
  isbn={978-607-8845-12-8}
}`
      },
      {
        id: "cg-art-3",
        tipo: "Artículo",
        tipoDetalle: "Revista Indexada (SciELO)",
        titulo: "Paridad sustantiva en los cabildos de Sinaloa: avances legislativos y barreras informales",
        revista: "Región y Sociedad (El Colegio de Sonora)",
        volumen: "Vol. 33, e1458, pp. 1-28",
        anio: 2021,
        doi: "10.22198/rys.2021.33.e1458",
        resumen: "Investigación cuantitativa y cualitativa que documenta la eficacia de las reformas de paridad de género en los 18 municipios de Sinaloa, evidenciando las persistentes asimetrías en la asignación de comisiones edilicias clave.",
        autores: "Gastélum Norzagaray, C. M.",
        citas: 27,
        enlace: "https://doi.org/10.22198/rys.2021.33.e1458",
        bibtex: `@article{gastelum2021paridad,
  title={Paridad sustantiva en los cabildos de Sinaloa: avances legislativos y barreras informales},
  author={Gastélum Norzagaray, Celia Margarita},
  journal={Región y Sociedad},
  volume={33},
  pages={e1458},
  year={2021},
  doi={10.22198/rys.2021.33.e1458}
}`
      },
      {
        id: "cg-cap-1",
        tipo: "Capítulo",
        tipoDetalle: "Capítulo en Libro Dictaminado",
        titulo: "La geografía del abstencionismo: causas socioeconómicas del desinterés electoral en el norte de Sinaloa",
        libro: "Geopolítica y Elecciones en el México Contemporáneo",
        coordinadores: "Merino, M. y Reveles, F. (Coords.), Tirant lo Blanch",
        paginas: "pp. 203-234",
        anio: 2023,
        resumen: "Mapeo georreferenciado de secciones electorales urbanas y rurales con abstencionismo superior al 65%, correlacionando variables de marginación, violencia y lejanía de casillas.",
        autores: "Gastélum Norzagaray, C. M.",
        citas: 14,
        enlace: "#",
        bibtex: `@incollection{gastelum2023geografia,
  title={La geografía del abstencionismo: causas socioeconómicas del desinterés electoral en el norte de Sinaloa},
  author={Gastélum Norzagaray, Celia Margarita},
  booktitle={Geopolítica y Elecciones en el México Contemporáneo},
  editor={Merino, Mauricio and Reveles, Francisco},
  pages={203--234},
  publisher={Tirant lo Blanch},
  year={2023}
}`
      },
      {
        id: "cg-proy-1",
        tipo: "Proyecto",
        tipoDetalle: "Proyecto Financiado Conahcyt (Ciencia Básica)",
        titulo: "Observatorio de Gobernanza Municipal y Cultura Democrática en la Región del Valle del Fuerte (Sinaloa)",
        institucionFinanciadora: "Conahcyt - Fondos de Ciencia de Frontera / UAS (PROFAPI)",
        periodo: "2022 - 2025 (En ejecución)",
        rol: "Responsable Técnica",
        resumen: "Generación de una batería de 34 indicadores cuantitativos y cualitativos para monitorear el desempeño institucional de los ayuntamientos de Ahome, Guasave, El Fuerte, Sinaloa de Leyva y Choix, disponible para acceso ciudadano.",
        autores: "Gastélum Norzagaray, C. M. (Líder) y Valenzuela Cázarez, J. R. (Asociado)",
        enlace: "#"
      },
      {
        id: "cg-tes-1",
        tipo: "Tesis",
        tipoDetalle: "Dirección de Tesis de Maestría en Ciencia Política",
        titulo: "Comportamiento legislativo y coaliciones parlamentarias en el Congreso del Estado de Sinaloa (LXIII y LXIV Legislaturas)",
        estudiante: "Mtro. Álvaro Daniel Bojórquez Soto",
        programa: "Maestría en Estudios Sociales y Humanidades, UAS Los Mochis",
        anio: 2023,
        distincion: "Aprobada por Unanimidad con Mención Honorífica"
      },
      {
        id: "cg-conf-1",
        tipo: "Conferencia",
        tipoDetalle: "Conferencia Magistral Internacional",
        titulo: "Los retos del federalismo electoral y la autonomía de los OPLEs ante el nuevo mapa político mexicano",
        evento: "XI Congreso Latinoamericano de Ciencia Política (ALACIP), Santiago de Chile",
        anio: 2023,
        resumen: "Ponencia magistral sobre las implicaciones de las reformas electorales centralizadoras en la fiscalización de los procesos locales.",
        autores: "Gastélum Norzagaray, C. M."
      }
    ]
  },

  {
    id: "dr-jesus-valenzuela",
    nombreCompleto: "Dr. Jesús Roberto Valenzuela Cázarez",
    tituloCorto: "Dr. Jesús R. Valenzuela",
    cargo: "Profesor-Investigador Titular B • Integrante del Cuerpo Académico",
    snii: "SNII Nivel I (Conahcyt)",
    prodep: "Perfil Deseable PRODEP Vigente",
    foto: "/assets/dr_roberto_valenzuela.jpg",
    email: "j.valenzuela@uas.edu.mx",
    orcid: "0000-0003-1288-4492",
    scholar: "https://scholar.google.com/citations?user=UAS_Roberto_Valenzuela",
    citasTotales: 289,
    indiceH: 9,
    resumen: "Experto en transparencia gubernamental, análisis del discurso político y relaciones intergubernamentales. Doctor en Ciencias Sociales (FLACSO México) y Maestro en Asuntos Públicos por el CIDE. Consultor y analista de políticas públicas.",
    biografia: `El Dr. Jesús Roberto Valenzuela Cázarez es Profesor-Investigador de Tiempo Completo Titular B adscrito a la Facultad de Derecho y Ciencia Política de la Universidad Autónoma de Sinaloa (Los Mochis). Es miembro del Sistema Nacional de Investigadoras e Investigadores (SNII Nivel I) y cuenta con Perfil Deseable PRODEP.

Cursó su Doctorado en Ciencias Sociales con especialidad en Ciencia Política en la Facultad Latinoamericana de Ciencias Sociales (FLACSO Sede México), graduándose con una investigación sobre el diseño de los órganos constitucionales autónomos de transparencia en México. Realizó su Maestría en Asuntos Públicos y Gobierno en el Centro de Investigación y Docencia Económicas (CIDE, CDMX) y es Licenciado en Ciencia Política y Administración Pública por la UAS.

Su agenda de investigación examina la fiscalización superior, el derecho a la información pública como contrapeso a la discrecionalidad del poder, el análisis cuantitativo de iniciativas de ley en congresos estatales y los efectos de la comunicación digital en la polarización política. Es evaluador del padrón Conahcyt y consultor académico en diseño de reglamentos municipales.`,
    
    educacion: [
      { grado: "Doctorado en Ciencias Sociales (Ciencia Política)", institucion: "Facultad Latinoamericana de Ciencias Sociales (FLACSO México)", anio: "2017", distincion: "Grado con Felicitación del Jurado" },
      { grado: "Maestría en Asuntos Públicos y Políticas", institucion: "Centro de Investigación y Docencia Económicas (CIDE)", anio: "2012", distincion: "Tesis Destacada en Políticas Públicas" },
      { grado: "Licenciatura en Ciencia Política y Admón. Pública", institucion: "Universidad Autónoma de Sinaloa (UAS)", anio: "2008", distincion: "Mención Honorífica" }
    ],

    lineasInvestigacion: [
      "Transparencia, Acceso a la Información y Órganos Autónomos (CEAIP)",
      "Análisis del Discurso Político y Comunicación Gubernamental",
      "Poder Legislativo Subnacional y Disciplina de Partidos en Sinaloa"
    ],

    distinciones: [
      "Miembro del Sistema Nacional de Investigadoras e Investigadores (SNII Nivel I).",
      "Reconocimiento al Perfil Deseable PRODEP (SEP).",
      "Investigador Anual UAS 2022 en el Área de Ciencias Sociales y Humanidades.",
      "Miembro Regular de la Asociación Mexicana de Ciencia Política (AMECIP)."
    ],

    trabajos: [
      {
        id: "jv-art-1",
        tipo: "Artículo",
        tipoDetalle: "Revista Indexada (Scopus Q1 / SciELO)",
        titulo: "Autonomía bajo asedio: diseño institucional y presiones políticas en los órganos garantes de transparencia estatales en México",
        revista: "Foro Internacional (El Colegio de México)",
        volumen: "Vol. LXIII, Núm. 4, pp. 621-660",
        anio: 2023,
        doi: "10.24201/fi.v63i4.2981",
        resumen: "A partir de un índice original de independencia formal y de facto aplicado a 32 órganos garantes (incluyendo la CEAIP Sinaloa), este trabajo demuestra cómo las reformas de captura presupuestal y cuotas partidistas reducen la resolución de recursos de revisión a favor de los ciudadanos.",
        autores: "Valenzuela Cázarez, J. R.",
        citas: 24,
        enlace: "https://doi.org/10.24201/fi.v63i4.2981",
        bibtex: `@article{valenzuela2023autonomia,
  title={Autonomía bajo asedio: diseño institucional y presiones políticas en los órganos garantes de transparencia estatales en México},
  author={Valenzuela Cázarez, Jesús Roberto},
  journal={Foro Internacional},
  volume={63},
  number={4},
  pages={621--660},
  year={2023},
  doi={10.24201/fi.v63i4.2981}
}`
      },
      {
        id: "jv-art-2",
        tipo: "Artículo",
        tipoDetalle: "Revista Indexada (JCR Q2)",
        titulo: "Polarización afectiva y narrativas de confrontación en las elecciones para gubernaturas en el norte de México: análisis de Twitter/X (2021-2024)",
        revista: "Comunicación y Sociedad (Universidad de Guadalajara)",
        volumen: "Núm. 21, e8290, pp. 1-31",
        anio: 2024,
        doi: "10.32870/cys.v2024.8290",
        resumen: "Se aplicaron modelos de procesamiento de lenguaje natural (NLP) sobre 180,000 tweets de candidatos a cargos de elección popular en Sinaloa, Sonora y Baja California, midiendo la frecuencia de apelaciones a la identidad tribal vs. propuestas programáticas.",
        autores: "Valenzuela Cázarez, J. R. y Gastélum Norzagaray, C. M.",
        citas: 15,
        enlace: "https://doi.org/10.32870/cys.v2024.8290",
        bibtex: `@article{valenzuela2024polarizacion,
  title={Polarización afectiva y narrativas de confrontación en las elecciones para gubernaturas en el norte de México: análisis de Twitter/X (2021-2024)},
  author={Valenzuela Cázarez, Jesús Roberto and Gastélum Norzagaray, Celia Margarita},
  journal={Comunicación y Sociedad},
  volume={21},
  pages={e8290},
  year={2024},
  doi={10.32870/cys.v2024.8290}
}`
      },
      {
        id: "jv-lib-1",
        tipo: "Libro",
        tipoDetalle: "Libro de Autor Único",
        titulo: "La Transparencia Simulada: Rendición de Cuentas y Gobiernos Estatales en el Federalismo Mexicano",
        editorial: "Editorial Tirant lo Blanch / Universidad Autónoma de Sinaloa",
        lugar: "Valencia / Los Mochis",
        paginas: "284 págs. ISBN: 978-84-1147-302-6",
        anio: 2023,
        resumen: "Un estudio riguroso sobre las brechas entre la hiper-regulación de la transparencia en México y su ineficacia para inhibir actos de corrupción en contrataciones públicas a nivel estatal y municipal.",
        autores: "Valenzuela Cázarez, J. R.",
        citas: 38,
        enlace: "#",
        bibtex: `@book{valenzuela2023transparencia,
  title={La Transparencia Simulada: Rendición de Cuentas y Gobiernos Estatales en el Federalismo Mexicano},
  author={Valenzuela Cázarez, Jesús Roberto},
  year={2023},
  publisher={Tirant lo Blanch / Universidad Autónoma de Sinaloa},
  isbn={978-84-1147-302-6}
}`
      },
      {
        id: "jv-cap-1",
        tipo: "Capítulo",
        tipoDetalle: "Capítulo en Libro Internacional",
        titulo: "Discurso populista y legitimación política: el caso de los ejecutivos locales en Sinaloa",
        libro: "Populismos y Democracias en América Latina: Nuevos Enfoques Críticos",
        coordinadores: "Laclau, G. y Barreda, M. (Coords.), CLACSO",
        paginas: "pp. 145-178",
        anio: 2022,
        resumen: "Desconstrucción retórica de los informes de gobierno y discursos en plazas públicas, identificando la dicotomía pueblo vs. élite tradicional en la construcción de hegemonía regional.",
        autores: "Valenzuela Cázarez, J. R.",
        citas: 19,
        enlace: "#",
        bibtex: `@incollection{valenzuela2022discurso,
  title={Discurso populista y legitimación política: el caso de los ejecutivos locales en Sinaloa},
  author={Valenzuela Cázarez, Jesús Roberto},
  booktitle={Populismos y Democracias en América Latina: Nuevos Enfoques Críticos},
  editor={Laclau, Germán and Barreda, Mikel},
  pages={145--178},
  publisher={CLACSO},
  year={2022}
}`
      },
      {
        id: "jv-proy-1",
        tipo: "Proyecto",
        tipoDetalle: "Proyecto Financiado PROFAPI UAS",
        titulo: "Digitalización de trámites y combate a la corrupción en la administración municipal de Los Mochis y Guasave",
        institucionFinanciadora: "Programa de Fomento y Apoyo a Proyectos de Investigación (PROFAPI UAS 2023-2025)",
        periodo: "2023 - 2025 (En curso)",
        rol: "Responsable Técnico",
        resumen: "Investigación aplicada orientada a diseñar un protocolo de ventanilla única digital con tecnología de código abierto para reducir espacios de extorsión y discrecionalidad en licencias comerciales de uso de suelo.",
        autores: "Valenzuela Cázarez, J. R.",
        enlace: "#"
      },
      {
        id: "jv-tes-1",
        tipo: "Tesis",
        tipoDetalle: "Dirección de Tesis de Licenciatura",
        titulo: "Eficacia de las solicitudes de acceso a la información pública en el Ayuntamiento de Ahome (2018-2022)",
        estudiante: "Lic. Miriam Valeria López Cota",
        programa: "Licenciatura en Ciencia Política, UAS Los Mochis",
        anio: 2024,
        distincion: "Aprobada con Mención Honorífica"
      },
      {
        id: "jv-conf-1",
        tipo: "Conferencia",
        tipoDetalle: "Ponencia en Congreso Nacional",
        titulo: "La crisis de credibilidad de los órganos de fiscalización superior en las entidades federativas mexicanas",
        evento: "XIII Congreso Nacional de Ciencia Política (AMECIP), Guadalajara, Jalisco",
        anio: 2024,
        resumen: "Evaluación del marco jurídico y político de las Auditorías Superiores de los Estados.",
        autores: "Valenzuela Cázarez, J. R."
      }
    ]
  }
];

export const eventsData = [
  {
    id: "evento-1",
    titulo: "Coloquio Nacional: Elecciones, Alternancia y Calidad Democrática en Sinaloa",
    fecha: "24 y 25 de Octubre de 2026",
    hora: "09:30 - 18:00 hrs (Hora del Pacífico)",
    modalidad: "Híbrida (Presencial y Transmisión en Vivo)",
    sede: "Auditorio 'Dr. José Vasconcelos', Facultad de Derecho y Ciencia Política, UAS Los Mochis",
    organizador: "Cuerpo Académico UAS-CA-318 en colaboración con AMECIP",
    descripcion: "Encuentro académico de primer nivel que reunirá a investigadores, consejeros electorales y sociedad civil para debatir sobre la fiscalización, la violencia política en razón de género y las tendencias de votación en el noroeste mexicano.",
    estado: "Próximo Evento",
    ponentePrincipal: "Conferencia inaugural impartida por la Dra. Celia Gastélum y especialistas invitados de UNAM y CIDE."
  },
  {
    id: "evento-2",
    titulo: "Seminario Permanente: Transparencia, Datos Abiertos y Rendición de Cuentas Municipal",
    fecha: "18 de Noviembre de 2026",
    hora: "11:00 - 13:30 hrs",
    modalidad: "Virtual vía Zoom Institucional UAS",
    sede: "Sala Virtual de Posgrado de Ciencia Política Los Mochis",
    organizador: "Cuerpo Académico UAS-CA-318",
    descripcion: "Taller teórico-práctico sobre el uso de la Plataforma Nacional de Transparencia (PNT) para investigaciones periodísticas y académicas en la región norte de Sinaloa.",
    estado: "Registro Abierto",
    ponentePrincipal: "Coordinado por el Dr. Jesús Roberto Valenzuela Cázarez."
  },
  {
    id: "evento-3",
    titulo: "Presentación Editorial: 'Poder Local y Ciudadanía en Sinaloa' (UAS / Siglo XXI)",
    fecha: "12 de Septiembre de 2026",
    hora: "17:00 hrs",
    modalidad: "Presencial",
    sede: "Biblioteca Central Unidad Regional Norte, Los Mochis",
    organizador: "Cuerpo Académico UAS-CA-318",
    descripcion: "Presentación formal del libro coordinado por la Dra. Celia Margarita Gastélum, con comentarios de reconocidos politólogos regionales y debate con la comunidad estudiantil.",
    estado: "Concluido",
    ponentePrincipal: "Comentaristas invitados de El Colegio de Sonora y Universidad de Guadalajara."
  }
];
