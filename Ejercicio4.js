// ============================================
// EJERCICIO 4: POLIMORFISMO
// Sistema de Gestión de Empleados y Nómina
// ============================================

/**
 * Clase Empleado - Clase base abstracta para todos los tipos de empleados
 * 
 * Esta clase define la estructura común de todos los empleados, pero el método
 * calcularSalario() debe ser implementado por cada clase derivada.
 * Esto demuestra polimorfismo: diferentes tipos de empleados calculan su salario
 * de manera diferente, pero todos responden al mismo método.
 */
class Empleado {
    /**
     * Constructor de la clase Empleado
     * @param {string} nombre - Nombre completo del empleado
     * @param {string} idEmpleado - Identificador único del empleado
     * @param {number} salarioBase - Salario base del empleado
     */
    constructor(nombre, idEmpleado, salarioBase) {
        this.nombre = nombre;
        this.idEmpleado = idEmpleado;
        this.salarioBase = salarioBase;
    }

    /**
     * Método abstracto calcularSalario
     * 
     * Este método DEBE ser implementado por todas las clases derivadas.
     * Si una clase hija no lo implementa, se lanzará este error.
     * Esto garantiza que todas las clases derivadas tengan su propia
     * lógica de cálculo de salario.
     */
    calcularSalario() {
        throw new Error(`El método calcularSalario() debe ser implementado en la clase ${this.constructor.name}`);
    }

    /**
     * Método mostrarInfo - Muestra la información del empleado
     * 
     * Este método es común para todos los empleados, pero llama a calcularSalario()
     * que se comporta diferente según el tipo de empleado (polimorfismo).
     */
    mostrarInfo() {
        const salario = this.calcularSalario();
        console.log(`
╔═══════════════════════════════════════════════════════╗
║          INFORMACIÓN DEL EMPLEADO                     ║
╠═══════════════════════════════════════════════════════╣
║ Nombre:           ${this.nombre.padEnd(32)} ║
║ ID Empleado:      ${this.idEmpleado.padEnd(32)} ║
║ Tipo:             ${this.constructor.name.padEnd(32)} ║
║ Salario:          $${String(salario.toFixed(2)).padEnd(31)} ║
╚═══════════════════════════════════════════════════════╝
        `);
    }
}

// ============================================
// CLASES DERIVADAS - DIFERENTES TIPOS DE EMPLEADOS
// ============================================

/**
 * Clase EmpleadoTiempoCompleto - Empleado con salario fijo mensual
 * 
 * Este tipo de empleado recibe un salario fijo cada mes, sin importar
 * las horas trabajadas o las ventas realizadas.
 */
class EmpleadoTiempoCompleto extends Empleado {
    /**
     * Constructor - Solo necesita los parámetros básicos
     * @param {string} nombre 
     * @param {string} idEmpleado 
     * @param {number} salarioBase 
     */
    constructor(nombre, idEmpleado, salarioBase) {
        super(nombre, idEmpleado, salarioBase);
    }

    /**
     * Implementación de calcularSalario para empleado tiempo completo
     * 
     * Para estos empleados, el salario es simplemente el salarioBase
     * que se definió en el constructor. Es el caso más simple.
     * @returns {number} - El salario base sin modificaciones
     */
    calcularSalario() {
        return this.salarioBase;
    }
}

/**
 * Clase EmpleadoPorHoras - Empleado que cobra por hora trabajada
 * 
 * Este tipo de empleado no tiene un salario fijo, sino que se le paga
 * según las horas que trabajó en el período. Es común en trabajos
 * de medio tiempo o freelance.
 */
class EmpleadoPorHoras extends Empleado {
    /**
     * Constructor - Requiere información adicional sobre horas
     * @param {string} nombre 
     * @param {string} idEmpleado 
     * @param {number} pagoPorHora - Tarifa por hora trabajada
     * @param {number} horasTrabajadas - Total de horas trabajadas en el período
     */
    constructor(nombre, idEmpleado, pagoPorHora, horasTrabajadas) {
        // Para este tipo de empleado, el salarioBase no aplica, así que lo ponemos en 0
        super(nombre, idEmpleado, 0);
        this.pagoPorHora = pagoPorHora;
        this.horasTrabajadas = horasTrabajadas;
    }

    /**
     * Implementación de calcularSalario para empleado por horas
     * 
     * El salario se calcula multiplicando las horas trabajadas por la tarifa.
     * Ejemplo: 160 horas × $15/hora = $2,400
     * @returns {number} - Pago total basado en horas trabajadas
     */
    calcularSalario() {
        return this.pagoPorHora * this.horasTrabajadas;
    }

    /**
     * Sobrescritura de mostrarInfo para incluir detalles de horas
     * 
     * Agregamos información adicional relevante para este tipo de empleado
     */
    mostrarInfo() {
        const salario = this.calcularSalario();
        console.log(`
╔═══════════════════════════════════════════════════════╗
║       INFORMACIÓN DEL EMPLEADO POR HORAS              ║
╠═══════════════════════════════════════════════════════╣
║ Nombre:           ${this.nombre.padEnd(32)} ║
║ ID Empleado:      ${this.idEmpleado.padEnd(32)} ║
║ Tipo:             ${this.constructor.name.padEnd(32)} ║
║ Pago por hora:    $${String(this.pagoPorHora.toFixed(2)).padEnd(31)} ║
║ Horas trabajadas: ${String(this.horasTrabajadas).padEnd(32)} ║
║ Salario total:    $${String(salario.toFixed(2)).padEnd(31)} ║
╚═══════════════════════════════════════════════════════╝
        `);
    }
}

/**
 * Clase EmpleadoComision - Empleado con salario base + comisión por ventas
 * 
 * Este tipo de empleado tiene un salario base garantizado, pero además
 * gana una comisión basada en sus ventas. Es común en roles de ventas.
 * Esto motiva a los empleados a vender más para ganar más.
 */
class EmpleadoComision extends Empleado {
    /**
     * Constructor - Requiere información sobre ventas y comisión
     * @param {string} nombre 
     * @param {string} idEmpleado 
     * @param {number} salarioBase - Salario fijo garantizado
     * @param {number} ventas - Total de ventas realizadas en el período
     * @param {number} porcentajeComision - Porcentaje de comisión (ej: 5 para 5%)
     */
    constructor(nombre, idEmpleado, salarioBase, ventas, porcentajeComision) {
        super(nombre, idEmpleado, salarioBase);
        this.ventas = ventas;
        this.porcentajeComision = porcentajeComision;
    }

    /**
     * Implementación de calcularSalario para empleado con comisión
     * 
     * El salario total es: salario base + (ventas × porcentaje / 100)
     * Ejemplo: $2,000 base + ($50,000 ventas × 5%) = $2,000 + $2,500 = $4,500
     * @returns {number} - Salario base más comisión por ventas
     */
    calcularSalario() {
        const comision = this.ventas * (this.porcentajeComision / 100);
        return this.salarioBase + comision;
    }

    /**
     * Sobrescritura de mostrarInfo para incluir detalles de ventas
     */
    mostrarInfo() {
        const comision = this.ventas * (this.porcentajeComision / 100);
        const salarioTotal = this.calcularSalario();
        console.log(`
╔═══════════════════════════════════════════════════════╗
║       INFORMACIÓN DEL EMPLEADO CON COMISIÓN           ║
╠═══════════════════════════════════════════════════════╣
║ Nombre:           ${this.nombre.padEnd(32)} ║
║ ID Empleado:      ${this.idEmpleado.padEnd(32)} ║
║ Tipo:             ${this.constructor.name.padEnd(32)} ║
║ Salario base:     $${String(this.salarioBase.toFixed(2)).padEnd(31)} ║
║ Ventas totales:   $${String(this.ventas.toFixed(2)).padEnd(31)} ║
║ % Comisión:       ${String(this.porcentajeComision).padEnd(32)}% ║
║ Comisión ganada:  $${String(comision.toFixed(2)).padEnd(31)} ║
║ Salario total:    $${String(salarioTotal.toFixed(2)).padEnd(31)} ║
╚═══════════════════════════════════════════════════════╝
        `);
    }
}

// ============================================
// FUNCIÓN POLIMÓRFICA - PROCESAR NÓMINA
// ============================================

/**
 * Función procesarNomina - Demuestra el poder del polimorfismo
 * 
 * Esta función puede recibir un array con CUALQUIER tipo de empleado
 * (TiempoCompleto, PorHoras, Comision) y procesar a todos de la misma manera.
 * No necesita saber el tipo específico de cada empleado porque todos
 * responden al método calcularSalario(), aunque cada uno lo calcula diferente.
 * 
 * Esto es POLIMORFISMO: "muchas formas" - un solo método (calcularSalario)
 * pero múltiples implementaciones según el tipo de objeto.
 * 
 * @param {Array<Empleado>} arrayEmpleados - Array con empleados de cualquier tipo
 * @returns {number} - Total de la nómina
 */
function procesarNomina(arrayEmpleados) {
    console.log('\n╔════════════════════════════════════════════════════════╗');
    console.log('║           PROCESAMIENTO DE NÓMINA                      ║');
    console.log('╚════════════════════════════════════════════════════════╝\n');

    let totalNomina = 0;
    let contador = 1;

    // Recorremos cada empleado sin importar su tipo específico
    arrayEmpleados.forEach(empleado => {
        console.log(`\n--- Empleado ${contador} ---`);
        
        // Aquí está el polimorfismo en acción:
        // Llamamos a calcularSalario() sin saber si es TiempoCompleto,
        // PorHoras o Comision. Cada uno usa su propia implementación.
        const salario = empleado.calcularSalario();
        
        totalNomina += salario;
        empleado.mostrarInfo();
        
        contador++;
    });

    // Mostramos el resumen final
    console.log('\n═══════════════════════════════════════════════════════');
    console.log('💰 RESUMEN DE NÓMINA');
    console.log('═══════════════════════════════════════════════════════\n');
    
    console.log(`📊 Total de empleados procesados: ${arrayEmpleados.length}`);
    console.log(`💵 Total de nómina a pagar: $${totalNomina.toFixed(2)}`);
    console.log(`📈 Salario promedio: $${(totalNomina / arrayEmpleados.length).toFixed(2)}`);

    return totalNomina;
}

// ============================================
// PROGRAMA PRINCIPAL - PRUEBAS DEL SISTEMA
// ============================================

console.log('\n╔════════════════════════════════════════════════════════╗');
console.log('║       SISTEMA DE EMPLEADOS - EJERCICIO 4              ║');
console.log('║       Demostración de Polimorfismo                    ║');
console.log('╚════════════════════════════════════════════════════════╝');

try {
    // ============================================
    // PARTE 1: CREACIÓN DE EMPLEADOS
    // ============================================
    
    console.log('\n═══════════════════════════════════════════════════════');
    console.log('👥 CREANDO EMPLEADOS DE DIFERENTES TIPOS');
    console.log('═══════════════════════════════════════════════════════\n');

    // Empleado 1: Tiempo Completo (Gerente)
    const empleado1 = new EmpleadoTiempoCompleto(
        'Ana García Martínez',
        'EMP001',
        3500 // Salario mensual fijo
    );
    console.log('✅ Empleado Tiempo Completo creado: Ana García (Gerente)');

    // Empleado 2: Por Horas (Desarrollador Freelance)
    const empleado2 = new EmpleadoPorHoras(
        'Carlos Ruiz López',
        'EMP002',
        25,  // $25 por hora
        160  // 160 horas trabajadas este mes
    );
    console.log('✅ Empleado Por Horas creado: Carlos Ruiz (Desarrollador)');

    // Empleado 3: Comisión (Vendedor)
    const empleado3 = new EmpleadoComision(
        'Laura Martínez Sánchez',
        'EMP003',
        2000,   // Salario base
        50000,  // $50,000 en ventas
        5       // 5% de comisión
    );
    console.log('✅ Empleado con Comisión creado: Laura Martínez (Vendedora)');

    // Empleados adicionales para enriquecer el ejemplo
    const empleado4 = new EmpleadoTiempoCompleto(
        'Pedro Hernández Díaz',
        'EMP004',
        2800
    );
    console.log('✅ Empleado Tiempo Completo creado: Pedro Hernández (Analista)');

    const empleado5 = new EmpleadoPorHoras(
        'Sofia Torres Ramírez',
        'EMP005',
        18,
        120
    );
    console.log('✅ Empleado Por Horas creado: Sofia Torres (Diseñadora)');

    const empleado6 = new EmpleadoComision(
        'Miguel Ángel Castro',
        'EMP006',
        1800,
        75000,
        6
    );
    console.log('✅ Empleado con Comisión creado: Miguel Ángel (Ejecutivo de Ventas)');

    // ============================================
    // PARTE 2: INFORMACIÓN INDIVIDUAL DE CADA EMPLEADO
    // ============================================
    
    console.log('\n\n═══════════════════════════════════════════════════════');
    console.log('📋 INFORMACIÓN DETALLADA DE CADA EMPLEADO');
    console.log('═══════════════════════════════════════════════════════');

    console.log('\n--- Empleado 1: Tiempo Completo ---');
    empleado1.mostrarInfo();

    console.log('\n--- Empleado 2: Por Horas ---');
    empleado2.mostrarInfo();

    console.log('\n--- Empleado 3: Con Comisión ---');
    empleado3.mostrarInfo();

    console.log('\n--- Empleado 4: Tiempo Completo ---');
    empleado4.mostrarInfo();

    console.log('\n--- Empleado 5: Por Horas ---');
    empleado5.mostrarInfo();

    console.log('\n--- Empleado 6: Con Comisión ---');
    empleado6.mostrarInfo();

    // ============================================
    // PARTE 3: PROCESAMIENTO DE NÓMINA (POLIMORFISMO)
    // ============================================
    
    console.log('\n\n═══════════════════════════════════════════════════════');
    console.log('🎯 DEMOSTRACIÓN DE POLIMORFISMO');
    console.log('═══════════════════════════════════════════════════════\n');

    console.log('Creando array con todos los empleados (tipos mixtos)...');
    
    // Este array contiene empleados de diferentes tipos
    // Esto demuestra polimorfismo: todos son tratados como "Empleado"
    const empleados = [
        empleado1,  // EmpleadoTiempoCompleto
        empleado2,  // EmpleadoPorHoras
        empleado3,  // EmpleadoComision
        empleado4,  // EmpleadoTiempoCompleto
        empleado5,  // EmpleadoPorHoras
        empleado6   // EmpleadoComision
    ];

    console.log(`✅ Array creado con ${empleados.length} empleados de diferentes tipos\n`);

    // Llamamos a la función polimórfica
    // Esta función NO necesita saber el tipo específico de cada empleado
    const totalNomina = procesarNomina(empleados);

    // ============================================
    // PARTE 4: ANÁLISIS POR TIPO DE EMPLEADO
    // ============================================
    
    console.log('\n\n═══════════════════════════════════════════════════════');
    console.log('📊 ANÁLISIS POR TIPO DE EMPLEADO');
    console.log('═══════════════════════════════════════════════════════\n');

    // Separamos por tipo de empleado
    const tiempoCompleto = empleados.filter(e => e instanceof EmpleadoTiempoCompleto);
    const porHoras = empleados.filter(e => e instanceof EmpleadoPorHoras);
    const conComision = empleados.filter(e => e instanceof EmpleadoComision);

    console.log('👔 EMPLEADOS TIEMPO COMPLETO:');
    console.log(`   Cantidad: ${tiempoCompleto.length}`);
    const totalTC = tiempoCompleto.reduce((sum, e) => sum + e.calcularSalario(), 0);
    console.log(`   Total a pagar: $${totalTC.toFixed(2)}`);
    console.log(`   Promedio: $${(totalTC / tiempoCompleto.length).toFixed(2)}`);
    tiempoCompleto.forEach(e => {
        console.log(`   • ${e.nombre}: $${e.calcularSalario().toFixed(2)}`);
    });

    console.log('\n⏰ EMPLEADOS POR HORAS:');
    console.log(`   Cantidad: ${porHoras.length}`);
    const totalPH = porHoras.reduce((sum, e) => sum + e.calcularSalario(), 0);
    console.log(`   Total a pagar: $${totalPH.toFixed(2)}`);
    console.log(`   Promedio: $${(totalPH / porHoras.length).toFixed(2)}`);
    porHoras.forEach(e => {
        console.log(`   • ${e.nombre}: $${e.calcularSalario().toFixed(2)} (${e.horasTrabajadas}h × $${e.pagoPorHora}/h)`);
    });

    console.log('\n💰 EMPLEADOS CON COMISIÓN:');
    console.log(`   Cantidad: ${conComision.length}`);
    const totalCC = conComision.reduce((sum, e) => sum + e.calcularSalario(), 0);
    console.log(`   Total a pagar: $${totalCC.toFixed(2)}`);
    console.log(`   Promedio: $${(totalCC / conComision.length).toFixed(2)}`);
    conComision.forEach(e => {
        const comision = e.ventas * (e.porcentajeComision / 100);
        console.log(`   • ${e.nombre}: $${e.calcularSalario().toFixed(2)} (Base: $${e.salarioBase} + Comisión: $${comision.toFixed(2)})`);
    });

    // ============================================
    // PARTE 5: VERIFICACIÓN DE POLIMORFISMO
    // ============================================
    
    console.log('\n\n═══════════════════════════════════════════════════════');
    console.log('🔍 VERIFICACIÓN DEL POLIMORFISMO');
    console.log('═══════════════════════════════════════════════════════\n');

    console.log('El polimorfismo permite que:');
    console.log('✅ Todos los tipos de empleados se almacenen en el mismo array');
    console.log('✅ Todos respondan al método calcularSalario()');
    console.log('✅ Cada tipo calcule su salario de manera diferente');
    console.log('✅ El código cliente (procesarNomina) no necesite saber el tipo específico\n');

    console.log('Probando que todos son instancias de Empleado:');
    empleados.forEach((e, index) => {
        console.log(`   Empleado ${index + 1}: ${e instanceof Empleado ? '✅' : '❌'} es instancia de Empleado`);
    });

    // ============================================
    // PARTE 6: RESUMEN FINAL
    // ============================================
    
    console.log('\n\n═══════════════════════════════════════════════════════');
    console.log('📈 RESUMEN EJECUTIVO');
    console.log('═══════════════════════════════════════════════════════\n');

    console.log(`💼 Total de empleados en la empresa: ${empleados.length}`);
    console.log(`💵 Nómina total del mes: $${totalNomina.toFixed(2)}`);
    console.log(`📊 Salario promedio: $${(totalNomina / empleados.length).toFixed(2)}`);
    console.log(`📈 Salario más alto: $${Math.max(...empleados.map(e => e.calcularSalario())).toFixed(2)}`);
    console.log(`📉 Salario más bajo: $${Math.min(...empleados.map(e => e.calcularSalario())).toFixed(2)}`);

    console.log('\n\n✅ EJERCICIO 4 COMPLETADO EXITOSAMENTE ✅');
    console.log('\n🎓 CONCLUSIÓN:');
    console.log('   El polimorfismo nos permite:');
    console.log('   • Tratar objetos de diferentes clases de manera uniforme');
    console.log('   • Escribir código más flexible y mantenible');
    console.log('   • Implementar comportamientos específicos en cada clase');
    console.log('   • Procesar colecciones heterogéneas de objetos fácilmente\n');

} catch (error) {
    console.error('\n❌ ERROR EN EL SISTEMA:');
    console.error(`   ${error.message}`);
    console.error(`   Stack: ${error.stack}`);
    console.error('\n   Por favor, revisa el código y vuelve a intentarlo.\n');
}
