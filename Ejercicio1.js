// ============================================
// EJERCICIO 1: CLASES Y OBJETOS BÁSICOS
// Sistema de Biblioteca
// ============================================

/**
 * Clase Libro - Representa un libro en la biblioteca
 * Demuestra el uso de clases, constructores y métodos básicos
 */
class Libro {
    /**
     * Constructor de la clase Libro
     * @param {string} titulo - Título del libro
     * @param {string} autor - Autor del libro
     * @param {number} anioPublicacion - Año de publicación
     * @param {string} isbn - Código ISBN del libro
     */
    constructor(titulo, autor, anioPublicacion, isbn) {
        this.titulo = titulo;
        this.autor = autor;
        this.anioPublicacion = anioPublicacion;
        this.isbn = isbn;
        this.disponible = true; // Por defecto, el libro está disponible
    }

    /**
     * Método para prestar el libro
     * Cambia la disponibilidad a false si está disponible
     */
    prestar() {
        if (this.disponible) {
            this.disponible = false;
            console.log(`✅ El libro "${this.titulo}" ha sido prestado exitosamente.`);
        } else {
            console.log(`❌ El libro "${this.titulo}" no está disponible en este momento.`);
        }
    }

    /**
     * Método para devolver el libro
     * Cambia la disponibilidad a true
     */
    devolver() {
        if (!this.disponible) {
            this.disponible = true;
            console.log(`✅ El libro "${this.titulo}" ha sido devuelto exitosamente.`);
        } else {
            console.log(`ℹ️  El libro "${this.titulo}" ya estaba disponible en la biblioteca.`);
        }
    }

    /**
     * Método para mostrar toda la información del libro
     * Muestra todos los atributos del libro en la consola
     */
    mostrarInfo() {
        console.log(`
╔════════════════════════════════════════════════════════════╗
║              INFORMACIÓN DEL LIBRO                         ║
╠════════════════════════════════════════════════════════════╣
║ Título:           ${this.titulo.padEnd(38)} ║
║ Autor:            ${this.autor.padEnd(38)} ║
║ Año Publicación:  ${String(this.anioPublicacion).padEnd(38)} ║
║ ISBN:             ${this.isbn.padEnd(38)} ║
║ Estado:           ${(this.disponible ? '🟢 Disponible' : '🔴 Prestado').padEnd(38)} ║
╚════════════════════════════════════════════════════════════╝
        `);
    }
}

// ============================================
// PROGRAMA PRINCIPAL - PRUEBAS DEL SISTEMA
// ============================================

console.log('\n╔══════════════════════════════════════════════════════════════╗');
console.log('║       SISTEMA DE GESTIÓN DE BIBLIOTECA - EJERCICIO 1        ║');
console.log('╚══════════════════════════════════════════════════════════════╝\n');

try {
    // ============================================
    // CREACIÓN DE LIBROS (MÍNIMO 3 DIFERENTES)
    // ============================================
    
    console.log('📚 CREANDO LIBROS EN EL SISTEMA...\n');

    const libro1 = new Libro(
        'Cien años de soledad',
        'Gabriel García Márquez',
        1967,
        '978-0307474728'
    );

    const libro2 = new Libro(
        'Don Quijote de la Mancha',
        'Miguel de Cervantes',
        1605,
        '978-8424936464'
    );

    const libro3 = new Libro(
        '1984',
        'George Orwell',
        1949,
        '978-0451524935'
    );

    const libro4 = new Libro(
        'El principito',
        'Antoine de Saint-Exupéry',
        1943,
        '978-0156012195'
    );

    console.log('✅ Se han creado 4 libros en el sistema.\n');

    // ============================================
    // MOSTRAR INFORMACIÓN INICIAL DE TODOS LOS LIBROS
    // ============================================
    
    console.log('═══════════════════════════════════════════════════════════════');
    console.log('📖 INFORMACIÓN INICIAL DE TODOS LOS LIBROS');
    console.log('═══════════════════════════════════════════════════════════════\n');

    libro1.mostrarInfo();
    libro2.mostrarInfo();
    libro3.mostrarInfo();
    libro4.mostrarInfo();

    // ============================================
    // PRUEBAS DE PRÉSTAMO Y DEVOLUCIÓN
    // ============================================
    
    console.log('\n═══════════════════════════════════════════════════════════════');
    console.log('🔄 PRUEBAS DE PRÉSTAMO Y DEVOLUCIÓN');
    console.log('═══════════════════════════════════════════════════════════════\n');

    // Prueba 1: Prestar libro disponible
    console.log('--- Prueba 1: Prestar "Cien años de soledad" ---');
    libro1.prestar();
    console.log('');

    // Prueba 2: Intentar prestar el mismo libro (debe fallar)
    console.log('--- Prueba 2: Intentar prestar "Cien años de soledad" nuevamente ---');
    libro1.prestar();
    console.log('');

    // Prueba 3: Prestar otro libro
    console.log('--- Prueba 3: Prestar "1984" ---');
    libro3.prestar();
    console.log('');

    // Prueba 4: Devolver un libro
    console.log('--- Prueba 4: Devolver "Cien años de soledad" ---');
    libro1.devolver();
    console.log('');

    // Prueba 5: Intentar devolver un libro ya disponible
    console.log('--- Prueba 5: Intentar devolver "Don Quijote" (ya disponible) ---');
    libro2.devolver();
    console.log('');

    // Prueba 6: Prestar el libro recién devuelto
    console.log('--- Prueba 6: Prestar "Cien años de soledad" nuevamente ---');
    libro1.prestar();
    console.log('');

    // Prueba 7: Prestar múltiples libros
    console.log('--- Prueba 7: Prestar "Don Quijote" y "El principito" ---');
    libro2.prestar();
    libro4.prestar();
    console.log('');

    // ============================================
    // ESTADO FINAL DE TODOS LOS LIBROS
    // ============================================
    
    console.log('\n═══════════════════════════════════════════════════════════════');
    console.log('📊 ESTADO FINAL DE TODOS LOS LIBROS');
    console.log('═══════════════════════════════════════════════════════════════\n');

    libro1.mostrarInfo();
    libro2.mostrarInfo();
    libro3.mostrarInfo();
    libro4.mostrarInfo();

    // ============================================
    // RESUMEN ESTADÍSTICO
    // ============================================
    
    console.log('\n═══════════════════════════════════════════════════════════════');
    console.log('📈 RESUMEN ESTADÍSTICO DE LA BIBLIOTECA');
    console.log('═══════════════════════════════════════════════════════════════\n');

    const libros = [libro1, libro2, libro3, libro4];
    const disponibles = libros.filter(libro => libro.disponible).length;
    const prestados = libros.filter(libro => !libro.disponible).length;

    console.log(`📚 Total de libros en el sistema: ${libros.length}`);
    console.log(`🟢 Libros disponibles: ${disponibles}`);
    console.log(`🔴 Libros prestados: ${prestados}`);
    
    console.log('\n📋 Lista de libros prestados:');
    libros.filter(libro => !libro.disponible).forEach(libro => {
        console.log(`   • "${libro.titulo}" - ${libro.autor}`);
    });

    console.log('\n📋 Lista de libros disponibles:');
    libros.filter(libro => libro.disponible).forEach(libro => {
        console.log(`   • "${libro.titulo}" - ${libro.autor}`);
    });

    console.log('\n\n✅ EJERCICIO 1 COMPLETADO EXITOSAMENTE ✅\n');

} catch (error) {
    console.error('\n❌ ERROR EN EL SISTEMA:');
    console.error(`   ${error.message}`);
    console.error('\n   Por favor, revisa el código y vuelve a intentarlo.\n');
}
