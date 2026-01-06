// ============================================
// EJERCICIO 5: COMPOSICIÓN
// Sistema de Gestión Universitaria
// ============================================

/**
 * Clase Profesor - Representa a un profesor de la universidad
 * 
 * Un profesor puede impartir múltiples cursos. Esta clase mantiene
 * una lista de los cursos que imparte, demostrando composición:
 * un objeto Profesor "tiene" (contiene) una lista de objetos Curso.
 */
class Profesor {
    /**
     * Constructor de Profesor
     * @param {string} nombre - Nombre completo del profesor
     * @param {string} id - Identificador único del profesor
     * @param {string} departamento - Departamento al que pertenece
     */
    constructor(nombre, id, departamento) {
        this.nombre = nombre;
        this.id = id;
        this.departamento = departamento;
        this.cursos = []; // Array que contendrá objetos Curso
    }

    /**
     * Método asignarCurso - Agrega un curso a la lista del profesor
     * 
     * Este método demuestra composición: el Profesor contiene referencias
     * a objetos Curso. La relación es "has-a" (el profesor TIENE cursos).
     * @param {Curso} curso - El curso a asignar
     */
    asignarCurso(curso) {
        // Verificamos que el curso no esté ya asignado
        if (!this.cursos.includes(curso)) {
            this.cursos.push(curso);
            console.log(`✅ Curso "${curso.nombre}" asignado al profesor ${this.nombre}`);
        } else {
            console.log(`⚠️  El curso "${curso.nombre}" ya está asignado al profesor ${this.nombre}`);
        }
    }

    /**
     * Método listarCursos - Muestra todos los cursos que imparte
     */
    listarCursos() {
        console.log(`\n📚 Cursos impartidos por ${this.nombre}:`);
        
        if (this.cursos.length === 0) {
            console.log('   No tiene cursos asignados');
        } else {
            this.cursos.forEach((curso, index) => {
                console.log(`   ${index + 1}. ${curso.nombre} (${curso.codigo}) - ${curso.creditos} créditos`);
            });
        }
    }

    /**
     * Método mostrarInfo - Muestra información completa del profesor
     */
    mostrarInfo() {
        console.log(`
╔═══════════════════════════════════════════════════════╗
║          INFORMACIÓN DEL PROFESOR                     ║
╠═══════════════════════════════════════════════════════╣
║ Nombre:           ${this.nombre.padEnd(32)} ║
║ ID:               ${this.id.padEnd(32)} ║
║ Departamento:     ${this.departamento.padEnd(32)} ║
║ Cursos asignados: ${String(this.cursos.length).padEnd(32)} ║
╚═══════════════════════════════════════════════════════╝
        `);
    }
}

/**
 * Clase Curso - Representa un curso académico
 * 
 * Un curso tiene un profesor asignado y una lista de estudiantes inscritos.
 * Esta clase demuestra composición bidireccional: el Curso contiene
 * referencias a un Profesor y a múltiples Estudiantes.
 */
class Curso {
    /**
     * Constructor de Curso
     * @param {string} nombre - Nombre del curso
     * @param {string} codigo - Código único del curso
     * @param {number} creditos - Número de créditos académicos
     */
    constructor(nombre, codigo, creditos) {
        this.nombre = nombre;
        this.codigo = codigo;
        this.creditos = creditos;
        this.profesor = null; // Inicialmente sin profesor
        this.estudiantes = []; // Array que contendrá objetos Estudiante
    }

    /**
     * Método asignarProfesor - Asigna un profesor al curso
     * 
     * Este método establece una relación bidireccional:
     * - El curso conoce a su profesor
     * - El profesor conoce este curso (llamando a profesor.asignarCurso)
     * @param {Profesor} profesor - El profesor a asignar
     */
    asignarProfesor(profesor) {
        this.profesor = profesor;
        profesor.asignarCurso(this); // Relación bidireccional
        console.log(`✅ Profesor ${profesor.nombre} asignado al curso "${this.nombre}"`);
    }

    /**
     * Método inscribirEstudiante - Agrega un estudiante al curso
     * 
     * Este método mantiene la lista de estudiantes inscritos.
     * Es parte de la composición: el Curso contiene Estudiantes.
     * @param {Estudiante} estudiante - El estudiante a inscribir
     */
    inscribirEstudiante(estudiante) {
        // Verificamos que el estudiante no esté ya inscrito
        if (!this.estudiantes.includes(estudiante)) {
            this.estudiantes.push(estudiante);
            console.log(`✅ Estudiante ${estudiante.nombre} inscrito en "${this.nombre}"`);
        } else {
            console.log(`⚠️  El estudiante ${estudiante.nombre} ya está inscrito en "${this.nombre}"`);
        }
    }

    /**
     * Método listarEstudiantes - Muestra todos los estudiantes del curso
     */
    listarEstudiantes() {
        console.log(`\n👥 Estudiantes inscritos en ${this.nombre} (${this.codigo}):`);
        
        if (this.estudiantes.length === 0) {
            console.log('   No hay estudiantes inscritos');
        } else {
            this.estudiantes.forEach((estudiante, index) => {
                console.log(`   ${index + 1}. ${estudiante.nombre} (${estudiante.id}) - ${estudiante.carrera}`);
            });
        }
    }

    /**
     * Método mostrarInfo - Muestra información completa del curso
     */
    mostrarInfo() {
        const nombreProfesor = this.profesor ? this.profesor.nombre : 'Sin asignar';
        console.log(`
╔═══════════════════════════════════════════════════════╗
║          INFORMACIÓN DEL CURSO                        ║
╠═══════════════════════════════════════════════════════╣
║ Nombre:           ${this.nombre.padEnd(32)} ║
║ Código:           ${this.codigo.padEnd(32)} ║
║ Créditos:         ${String(this.creditos).padEnd(32)} ║
║ Profesor:         ${nombreProfesor.padEnd(32)} ║
║ Estudiantes:      ${String(this.estudiantes.length).padEnd(32)} ║
╚═══════════════════════════════════════════════════════╝
        `);
    }
}

/**
 * Clase Estudiante - Representa a un estudiante universitario
 * 
 * Un estudiante puede inscribirse en múltiples cursos. Esta clase
 * mantiene una lista de los cursos en los que está inscrito,
 * demostrando composición: el Estudiante "tiene" cursos.
 */
class Estudiante {
    /**
     * Constructor de Estudiante
     * @param {string} nombre - Nombre completo del estudiante
     * @param {string} id - Matrícula o ID único
     * @param {string} carrera - Carrera que estudia
     */
    constructor(nombre, id, carrera) {
        this.nombre = nombre;
        this.id = id;
        this.carrera = carrera;
        this.cursos = []; // Array que contendrá objetos Curso
    }

    /**
     * Método inscribirCurso - Inscribe al estudiante en un curso
     * 
     * Este método establece una relación bidireccional:
     * - El estudiante conoce sus cursos
     * - El curso conoce a este estudiante (llamando a curso.inscribirEstudiante)
     * @param {Curso} curso - El curso en el que se inscribe
     */
    inscribirCurso(curso) {
        // Verificamos que no esté ya inscrito
        if (!this.cursos.includes(curso)) {
            this.cursos.push(curso);
            curso.inscribirEstudiante(this); // Relación bidireccional
            console.log(`✅ ${this.nombre} se inscribió en "${curso.nombre}"`);
        } else {
            console.log(`⚠️  ${this.nombre} ya está inscrito en "${curso.nombre}"`);
        }
    }

    /**
     * Método listarCursos - Muestra todos los cursos del estudiante
     */
    listarCursos() {
        console.log(`\n📖 Cursos de ${this.nombre} (${this.id}):`);
        
        if (this.cursos.length === 0) {
            console.log('   No tiene cursos inscritos');
        } else {
            let totalCreditos = 0;
            this.cursos.forEach((curso, index) => {
                console.log(`   ${index + 1}. ${curso.nombre} (${curso.codigo}) - ${curso.creditos} créditos`);
                totalCreditos += curso.creditos;
            });
            console.log(`   📊 Total de créditos: ${totalCreditos}`);
        }
    }

    /**
     * Método mostrarInfo - Muestra información completa del estudiante
     */
    mostrarInfo() {
        const totalCreditos = this.cursos.reduce((sum, curso) => sum + curso.creditos, 0);
        console.log(`
╔═══════════════════════════════════════════════════════╗
║          INFORMACIÓN DEL ESTUDIANTE                   ║
╠═══════════════════════════════════════════════════════╣
║ Nombre:           ${this.nombre.padEnd(32)} ║
║ ID:               ${this.id.padEnd(32)} ║
║ Carrera:          ${this.carrera.padEnd(32)} ║
║ Cursos inscritos: ${String(this.cursos.length).padEnd(32)} ║
║ Total créditos:   ${String(totalCreditos).padEnd(32)} ║
╚═══════════════════════════════════════════════════════╝
        `);
    }
}

/**
 * Clase Universidad - Clase contenedora principal
 * 
 * Esta clase demuestra composición a gran escala. La Universidad
 * contiene todos los objetos del sistema (estudiantes, profesores, cursos)
 * y proporciona métodos para gestionarlos de manera centralizada.
 * 
 * Esta es una composición compleja: la Universidad "tiene" múltiples
 * objetos de diferentes tipos que a su vez tienen relaciones entre sí.
 */
class Universidad {
    /**
     * Constructor de Universidad
     * @param {string} nombre - Nombre de la universidad
     */
    constructor(nombre) {
        this.nombre = nombre;
        this.estudiantes = []; // Lista de todos los estudiantes
        this.profesores = [];  // Lista de todos los profesores
        this.cursos = [];      // Lista de todos los cursos
    }

    /**
     * Método agregarEstudiante - Registra un nuevo estudiante
     * @param {Estudiante} estudiante - El estudiante a agregar
     */
    agregarEstudiante(estudiante) {
        // Verificamos que no exista ya un estudiante con ese ID
        const existe = this.estudiantes.some(e => e.id === estudiante.id);
        
        if (!existe) {
            this.estudiantes.push(estudiante);
            console.log(`✅ Estudiante ${estudiante.nombre} registrado en ${this.nombre}`);
        } else {
            console.log(`❌ Ya existe un estudiante con ID ${estudiante.id}`);
        }
    }

    /**
     * Método agregarProfesor - Registra un nuevo profesor
     * @param {Profesor} profesor - El profesor a agregar
     */
    agregarProfesor(profesor) {
        const existe = this.profesores.some(p => p.id === profesor.id);
        
        if (!existe) {
            this.profesores.push(profesor);
            console.log(`✅ Profesor ${profesor.nombre} registrado en ${this.nombre}`);
        } else {
            console.log(`❌ Ya existe un profesor con ID ${profesor.id}`);
        }
    }

    /**
     * Método agregarCurso - Registra un nuevo curso
     * @param {Curso} curso - El curso a agregar
     */
    agregarCurso(curso) {
        const existe = this.cursos.some(c => c.codigo === curso.codigo);
        
        if (!existe) {
            this.cursos.push(curso);
            console.log(`✅ Curso "${curso.nombre}" registrado en ${this.nombre}`);
        } else {
            console.log(`❌ Ya existe un curso con código ${curso.codigo}`);
        }
    }

    /**
     * Método inscribirEstudianteEnCurso - Inscribe a un estudiante en un curso
     * 
     * Este método busca tanto al estudiante como al curso por sus IDs
     * y luego realiza la inscripción. Es una operación de alto nivel
     * que coordina objetos dentro de la composición.
     * 
     * @param {string} idEstudiante - ID del estudiante
     * @param {string} codigoCurso - Código del curso
     * @returns {boolean} - true si la inscripción fue exitosa
     */
    inscribirEstudianteEnCurso(idEstudiante, codigoCurso) {
        // Buscamos al estudiante en la lista
        const estudiante = this.estudiantes.find(e => e.id === idEstudiante);
        
        // Buscamos al curso en la lista
        const curso = this.cursos.find(c => c.codigo === codigoCurso);

        // Validamos que ambos existan
        if (!estudiante) {
            console.log(`❌ No se encontró estudiante con ID ${idEstudiante}`);
            return false;
        }

        if (!curso) {
            console.log(`❌ No se encontró curso con código ${codigoCurso}`);
            return false;
        }

        // Si ambos existen, realizamos la inscripción
        estudiante.inscribirCurso(curso);
        return true;
    }

    /**
     * Método generarReporte - Genera un reporte completo de la universidad
     */
    generarReporte() {
        console.log(`
╔═══════════════════════════════════════════════════════╗
║          REPORTE DE ${this.nombre.toUpperCase().padEnd(32)} ║
╠═══════════════════════════════════════════════════════╣
║ Total Estudiantes: ${String(this.estudiantes.length).padEnd(31)} ║
║ Total Profesores:  ${String(this.profesores.length).padEnd(31)} ║
║ Total Cursos:      ${String(this.cursos.length).padEnd(31)} ║
╚═══════════════════════════════════════════════════════╝
        `);
    }

    /**
     * Método listarTodo - Lista todos los elementos de la universidad
     */
    listarTodo() {
        console.log('\n📊 LISTADO COMPLETO DE LA UNIVERSIDAD\n');
        
        console.log('👨‍🏫 PROFESORES:');
        this.profesores.forEach((profesor, index) => {
            console.log(`   ${index + 1}. ${profesor.nombre} (${profesor.id}) - ${profesor.departamento}`);
            console.log(`      Cursos: ${profesor.cursos.length}`);
        });

        console.log('\n📚 CURSOS:');
        this.cursos.forEach((curso, index) => {
            const nombreProf = curso.profesor ? curso.profesor.nombre : 'Sin profesor';
            console.log(`   ${index + 1}. ${curso.nombre} (${curso.codigo})`);
            console.log(`      Profesor: ${nombreProf}`);
            console.log(`      Estudiantes: ${curso.estudiantes.length}`);
        });

        console.log('\n👨‍🎓 ESTUDIANTES:');
        this.estudiantes.forEach((estudiante, index) => {
            console.log(`   ${index + 1}. ${estudiante.nombre} (${estudiante.id}) - ${estudiante.carrera}`);
            console.log(`      Cursos inscritos: ${estudiante.cursos.length}`);
        });
    }
}

// ============================================
// PROGRAMA PRINCIPAL - PRUEBAS DEL SISTEMA
// ============================================

console.log('\n╔════════════════════════════════════════════════════════╗');
console.log('║     SISTEMA UNIVERSITARIO - EJERCICIO 5               ║');
console.log('║     Demostración de Composición                       ║');
console.log('╚════════════════════════════════════════════════════════╝');

try {
    // ============================================
    // PARTE 1: CREACIÓN DE LA UNIVERSIDAD
    // ============================================
    
    console.log('\n═══════════════════════════════════════════════════════');
    console.log('🏛️  CREANDO UNIVERSIDAD');
    console.log('═══════════════════════════════════════════════════════\n');

    const universidad = new Universidad('Universidad Nacional de Tecnología');
    console.log(`✅ Universidad creada: ${universidad.nombre}\n`);

    // ============================================
    // PARTE 2: CREACIÓN DE PROFESORES
    // ============================================
    
    console.log('═══════════════════════════════════════════════════════');
    console.log('👨‍🏫 REGISTRANDO PROFESORES');
    console.log('═══════════════════════════════════════════════════════\n');

    const profesor1 = new Profesor(
        'Dr. Pedro López García',
        'PROF001',
        'Ciencias de la Computación'
    );

    const profesor2 = new Profesor(
        'Dra. María Elena Rodríguez',
        'PROF002',
        'Matemáticas'
    );

    const profesor3 = new Profesor(
        'Ing. Carlos Hernández Díaz',
        'PROF003',
        'Ingeniería de Software'
    );

    // Registramos los profesores en la universidad
    universidad.agregarProfesor(profesor1);
    universidad.agregarProfesor(profesor2);
    universidad.agregarProfesor(profesor3);

    // ============================================
    // PARTE 3: CREACIÓN DE CURSOS
    // ============================================
    
    console.log('\n═══════════════════════════════════════════════════════');
    console.log('📚 REGISTRANDO CURSOS');
    console.log('═══════════════════════════════════════════════════════\n');

    const curso1 = new Curso(
        'Programación Orientada a Objetos',
        'CS201',
        4
    );

    const curso2 = new Curso(
        'Estructuras de Datos',
        'CS202',
        4
    );

    const curso3 = new Curso(
        'Bases de Datos',
        'CS301',
        3
    );

    const curso4 = new Curso(
        'Cálculo Diferencial',
        'MAT101',
        4
    );

    // Registramos los cursos en la universidad
    universidad.agregarCurso(curso1);
    universidad.agregarCurso(curso2);
    universidad.agregarCurso(curso3);
    universidad.agregarCurso(curso4);

    // ============================================
    // PARTE 4: ASIGNACIÓN DE PROFESORES A CURSOS
    // ============================================
    
    console.log('\n═══════════════════════════════════════════════════════');
    console.log('🔗 ASIGNANDO PROFESORES A CURSOS');
    console.log('═══════════════════════════════════════════════════════\n');

    curso1.asignarProfesor(profesor1);
    curso2.asignarProfesor(profesor1); // Un profesor puede dar varios cursos
    curso3.asignarProfesor(profesor3);
    curso4.asignarProfesor(profesor2);

    // ============================================
    // PARTE 5: CREACIÓN DE ESTUDIANTES
    // ============================================
    
    console.log('\n═══════════════════════════════════════════════════════');
    console.log('👨‍🎓 REGISTRANDO ESTUDIANTES');
    console.log('═══════════════════════════════════════════════════════\n');

    const estudiante1 = new Estudiante(
        'María Sánchez Torres',
        '20230001',
        'Ingeniería en Sistemas'
    );

    const estudiante2 = new Estudiante(
        'Juan Ramírez Castro',
        '20230002',
        'Ingeniería en Sistemas'
    );

    const estudiante3 = new Estudiante(
        'Ana Laura Martínez',
        '20230003',
        'Ciencias de la Computación'
    );

    const estudiante4 = new Estudiante(
        'Carlos Gómez Pérez',
        '20230004',
        'Ingeniería en Software'
    );

    // Registramos los estudiantes en la universidad
    universidad.agregarEstudiante(estudiante1);
    universidad.agregarEstudiante(estudiante2);
    universidad.agregarEstudiante(estudiante3);
    universidad.agregarEstudiante(estudiante4);

    // ============================================
    // PARTE 6: INSCRIPCIÓN DE ESTUDIANTES EN CURSOS
    // ============================================
    
    console.log('\n═══════════════════════════════════════════════════════');
    console.log('📝 INSCRIBIENDO ESTUDIANTES EN CURSOS');
    console.log('═══════════════════════════════════════════════════════\n');

    console.log('--- Inscripciones usando método directo ---\n');
    estudiante1.inscribirCurso(curso1);
    estudiante1.inscribirCurso(curso2);
    estudiante1.inscribirCurso(curso4);

    estudiante2.inscribirCurso(curso1);
    estudiante2.inscribirCurso(curso3);

    console.log('\n--- Inscripciones usando método de Universidad ---\n');
    universidad.inscribirEstudianteEnCurso('20230003', 'CS201');
    universidad.inscribirEstudianteEnCurso('20230003', 'CS202');
    universidad.inscribirEstudianteEnCurso('20230003', 'CS301');
    universidad.inscribirEstudianteEnCurso('20230003', 'MAT101');

    universidad.inscribirEstudianteEnCurso('20230004', 'CS201');
    universidad.inscribirEstudianteEnCurso('20230004', 'CS301');

    // ============================================
    // PARTE 7: LISTADOS INDIVIDUALES
    // ============================================
    
    console.log('\n\n═══════════════════════════════════════════════════════');
    console.log('📋 INFORMACIÓN DETALLADA');
    console.log('═══════════════════════════════════════════════════════');

    // Cursos de cada profesor
    console.log('\n--- CURSOS POR PROFESOR ---');
    profesor1.listarCursos();
    profesor2.listarCursos();
    profesor3.listarCursos();

    // Estudiantes por curso
    console.log('\n--- ESTUDIANTES POR CURSO ---');
    curso1.listarEstudiantes();
    curso2.listarEstudiantes();
    curso3.listarEstudiantes();
    curso4.listarEstudiantes();

    // Cursos por estudiante
    console.log('\n--- CURSOS POR ESTUDIANTE ---');
    estudiante1.listarCursos();
    estudiante2.listarCursos();
    estudiante3.listarCursos();
    estudiante4.listarCursos();

    // ============================================
    // PARTE 8: INFORMACIÓN COMPLETA DE OBJETOS
    // ============================================
    
    console.log('\n\n═══════════════════════════════════════════════════════');
    console.log('🔍 INFORMACIÓN COMPLETA DE CADA ENTIDAD');
    console.log('═══════════════════════════════════════════════════════');

    console.log('\n--- PROFESORES ---');
    profesor1.mostrarInfo();
    profesor2.mostrarInfo();
    profesor3.mostrarInfo();

    console.log('\n--- CURSOS ---');
    curso1.mostrarInfo();
    curso2.mostrarInfo();
    curso3.mostrarInfo();
    curso4.mostrarInfo();

    console.log('\n--- ESTUDIANTES ---');
    estudiante1.mostrarInfo();
    estudiante2.mostrarInfo();
    estudiante3.mostrarInfo();
    estudiante4.mostrarInfo();

    // ============================================
    // PARTE 9: REPORTE DE LA UNIVERSIDAD
    // ============================================
    
    console.log('\n\n═══════════════════════════════════════════════════════');
    console.log('📊 REPORTE GENERAL DE LA UNIVERSIDAD');
    console.log('═══════════════════════════════════════════════════════');

    universidad.generarReporte();
    universidad.listarTodo();

    // ============================================
    // PARTE 10: ANÁLISIS ESTADÍSTICO
    // ============================================
    
    console.log('\n\n═══════════════════════════════════════════════════════');
    console.log('📈 ANÁLISIS ESTADÍSTICO');
    console.log('═══════════════════════════════════════════════════════\n');

    // Curso más popular
    const cursoMasPopular = universidad.cursos.reduce((max, curso) => 
        curso.estudiantes.length > max.estudiantes.length ? curso : max
    );
    console.log(`🏆 Curso más popular: ${cursoMasPopular.nombre}`);
    console.log(`   Estudiantes inscritos: ${cursoMasPopular.estudiantes.length}`);

    // Profesor con más cursos
    const profesorMasCursos = universidad.profesores.reduce((max, prof) => 
        prof.cursos.length > max.cursos.length ? prof : max
    );
    console.log(`\n🏆 Profesor con más cursos: ${profesorMasCursos.nombre}`);
    console.log(`   Cursos asignados: ${profesorMasCursos.cursos.length}`);

    // Estudiante con más cursos
    const estudianteMasCursos = universidad.estudiantes.reduce((max, est) => 
        est.cursos.length > max.cursos.length ? est : max
    );
    console.log(`\n🏆 Estudiante con más cursos: ${estudianteMasCursos.nombre}`);
    console.log(`   Cursos inscritos: ${estudianteMasCursos.cursos.length}`);

    // Promedio de estudiantes por curso
    const promedioEstudiantes = universidad.cursos.reduce((sum, curso) => 
        sum + curso.estudiantes.length, 0) / universidad.cursos.length;
    console.log(`\n📊 Promedio de estudiantes por curso: ${promedioEstudiantes.toFixed(2)}`);

    // Promedio de cursos por estudiante
    const promedioCursosPorEstudiante = universidad.estudiantes.reduce((sum, est) => 
        sum + est.cursos.length, 0) / universidad.estudiantes.length;
    console.log(`📊 Promedio de cursos por estudiante: ${promedioCursosPorEstudiante.toFixed(2)}`);

    // Total de créditos ofrecidos
    const totalCreditos = universidad.cursos.reduce((sum, curso) => sum + curso.creditos, 0);
    console.log(`📊 Total de créditos ofrecidos: ${totalCreditos}`);

    // ============================================
    // PARTE 11: VERIFICACIÓN DE COMPOSICIÓN
    // ============================================
    
    console.log('\n\n═══════════════════════════════════════════════════════');
    console.log('🔍 VERIFICACIÓN DE COMPOSICIÓN');
    console.log('═══════════════════════════════════════════════════════\n');

    console.log('La composición se demuestra en las siguientes relaciones:\n');
    
    console.log('1. Universidad "tiene" (contiene):');
    console.log(`   • ${universidad.estudiantes.length} estudiantes`);
    console.log(`   • ${universidad.profesores.length} profesores`);
    console.log(`   • ${universidad.cursos.length} cursos`);
    
    console.log('\n2. Profesor "tiene" (contiene):');
    console.log(`   • ${profesor1.nombre}: ${profesor1.cursos.length} cursos`);
    console.log(`   • ${profesor2.nombre}: ${profesor2.cursos.length} cursos`);
    console.log(`   • ${profesor3.nombre}: ${profesor3.cursos.length} cursos`);
    
    console.log('\n3. Curso "tiene" (contiene):');
    console.log(`   • ${curso1.nombre}: ${curso1.estudiantes.length} estudiantes`);
    console.log(`   • ${curso2.nombre}: ${curso2.estudiantes.length} estudiantes`);
    console.log(`   • ${curso3.nombre}: ${curso3.estudiantes.length} estudiantes`);
    console.log(`   • ${curso4.nombre}: ${curso4.estudiantes.length} estudiantes`);
    
    console.log('\n4. Estudiante "tiene" (contiene):');
    console.log(`   • ${estudiante1.nombre}: ${estudiante1.cursos.length} cursos`);
    console.log(`   • ${estudiante2.nombre}: ${estudiante2.cursos.length} cursos`);
    console.log(`   • ${estudiante3.nombre}: ${estudiante3.cursos.length} cursos`);
    console.log(`   • ${estudiante4.nombre}: ${estudiante4.cursos.length} cursos`);

    console.log('\n✅ Relaciones bidireccionales establecidas correctamente:');
    console.log('   • Cuando un estudiante se inscribe en un curso, el curso lo registra');
    console.log('   • Cuando un curso asigna un profesor, el profesor lo registra');
    console.log('   • La Universidad mantiene referencias a todos los objetos');

    console.log('\n\n✅ EJERCICIO 5 COMPLETADO EXITOSAMENTE ✅');
    console.log('\n🎓 CONCLUSIÓN:');
    console.log('   La composición nos permite:');
    console.log('   • Crear objetos complejos a partir de objetos más simples');
    console.log('   • Establecer relaciones "tiene-un" entre objetos');
    console.log('   • Mantener relaciones bidireccionales cuando es necesario');
    console.log('   • Organizar sistemas complejos de manera natural y mantenible');
    console.log('   • Modelar el mundo real donde los objetos contienen otros objetos\n');

} catch (error) {
    console.error('\n❌ ERROR EN EL SISTEMA:');
    console.error(`   ${error.message}`);
    console.error(`   Stack: ${error.stack}`);
    console.error('\n   Por favor, revisa el código y vuelve a intentarlo.\n');
}
