// ============================================
// EJERCICIO 3: HERENCIA
// Sistema de Gestión de Vehículos
// ============================================

/**
 * Clase Vehiculo - Clase base que representa un vehículo genérico
 * 
 * Esta es la clase padre de la cual heredan Auto, Motocicleta y Camion.
 * Contiene los atributos y métodos comunes a todos los vehículos.
 * Esto demuestra el principio DRY (Don't Repeat Yourself) - escribimos
 * el código común una sola vez y las clases hijas lo reutilizan.
 */
class Vehiculo {
    /**
     * Constructor de la clase base Vehiculo
     * @param {string} marca - Marca del vehículo
     * @param {string} modelo - Modelo del vehículo
     * @param {number} anio - Año de fabricación
     */
    constructor(marca, modelo, anio) {
        this.marca = marca;
        this.modelo = modelo;
        this.anio = anio;
        this.velocidadActual = 0; // Todos los vehículos inician detenidos
    }

    /**
     * Método acelerar - Aumenta la velocidad del vehículo
     * @param {number} incremento - Cantidad de km/h a aumentar
     */
    acelerar(incremento) {
        this.velocidadActual += incremento;
        console.log(`🚀 Acelerando... Velocidad actual: ${this.velocidadActual} km/h`);
    }

    /**
     * Método frenar - Disminuye la velocidad del vehículo
     * La velocidad nunca puede ser negativa (validación importante)
     * @param {number} decremento - Cantidad de km/h a disminuir
     */
    frenar(decremento) {
        // Usamos Math.max para asegurar que la velocidad nunca sea negativa
        // Si el decremento es mayor que la velocidad actual, la velocidad queda en 0
        this.velocidadActual = Math.max(0, this.velocidadActual - decremento);
        console.log(`🛑 Frenando... Velocidad actual: ${this.velocidadActual} km/h`);
    }

    /**
     * Método mostrarInfo - Muestra la información básica del vehículo
     * Este método será sobrescrito en las clases hijas para agregar información adicional
     */
    mostrarInfo() {
        console.log(`
╔═══════════════════════════════════════════════════════╗
║              INFORMACIÓN DEL VEHÍCULO                 ║
╠═══════════════════════════════════════════════════════╣
║ Marca:            ${this.marca.padEnd(32)} ║
║ Modelo:           ${this.modelo.padEnd(32)} ║
║ Año:              ${String(this.anio).padEnd(32)} ║
║ Velocidad actual: ${String(this.velocidadActual).padEnd(32)} km/h ║
╚═══════════════════════════════════════════════════════╝
        `);
    }
}

// ============================================
// CLASES DERIVADAS - HEREDAN DE VEHICULO
// ============================================

/**
 * Clase Auto - Hereda de Vehiculo
 * 
 * Representa un automóvil con características específicas como
 * número de puertas y tipo de combustible.
 * Usa 'extends' para heredar y 'super()' para llamar al constructor padre.
 */
class Auto extends Vehiculo {
    /**
     * Constructor de Auto
     * @param {string} marca 
     * @param {string} modelo 
     * @param {number} anio 
     * @param {number} numeroPuertas - Número de puertas (2, 4, 5, etc.)
     * @param {string} tipoCombustible - Tipo de combustible (Gasolina, Diesel, Eléctrico, Híbrido)
     */
    constructor(marca, modelo, anio, numeroPuertas, tipoCombustible) {
        // super() llama al constructor de la clase padre (Vehiculo)
        // Esto inicializa los atributos heredados: marca, modelo, anio, velocidadActual
        super(marca, modelo, anio);
        
        // Después de super(), agregamos los atributos específicos de Auto
        this.numeroPuertas = numeroPuertas;
        this.tipoCombustible = tipoCombustible;
    }

    /**
     * Sobrescritura del método mostrarInfo
     * 
     * Primero llama a super.mostrarInfo() para mostrar la info básica,
     * y luego agrega la información específica de Auto.
     * Esto es un ejemplo de polimorfismo: mismo método, comportamiento diferente.
     */
    mostrarInfo() {
        console.log(`
╔═══════════════════════════════════════════════════════╗
║              INFORMACIÓN DEL AUTO                     ║
╠═══════════════════════════════════════════════════════╣
║ Marca:            ${this.marca.padEnd(32)} ║
║ Modelo:           ${this.modelo.padEnd(32)} ║
║ Año:              ${String(this.anio).padEnd(32)} ║
║ Velocidad actual: ${String(this.velocidadActual).padEnd(32)} km/h ║
║ Número de puertas:${String(this.numeroPuertas).padEnd(32)} ║
║ Combustible:      ${this.tipoCombustible.padEnd(32)} ║
╚═══════════════════════════════════════════════════════╝
        `);
    }
}

/**
 * Clase Motocicleta - Hereda de Vehiculo
 * 
 * Representa una motocicleta con su cilindrada y tipo específico.
 * Demuestra cómo diferentes clases pueden heredar del mismo padre
 * pero tener atributos completamente diferentes.
 */
class Motocicleta extends Vehiculo {
    /**
     * Constructor de Motocicleta
     * @param {string} marca 
     * @param {string} modelo 
     * @param {number} anio 
     * @param {number} cilindrada - Cilindrada en cc (ej: 150, 250, 1000)
     * @param {string} tipo - Tipo de moto (deportiva, crucero, touring, etc.)
     */
    constructor(marca, modelo, anio, cilindrada, tipo) {
        super(marca, modelo, anio);
        this.cilindrada = cilindrada;
        this.tipo = tipo;
    }

    /**
     * Sobrescritura de mostrarInfo para Motocicleta
     * Incluye cilindrada y tipo de motocicleta
     */
    mostrarInfo() {
        console.log(`
╔═══════════════════════════════════════════════════════╗
║           INFORMACIÓN DE LA MOTOCICLETA               ║
╠═══════════════════════════════════════════════════════╣
║ Marca:            ${this.marca.padEnd(32)} ║
║ Modelo:           ${this.modelo.padEnd(32)} ║
║ Año:              ${String(this.anio).padEnd(32)} ║
║ Velocidad actual: ${String(this.velocidadActual).padEnd(32)} km/h ║
║ Cilindrada:       ${String(this.cilindrada).padEnd(32)} cc ║
║ Tipo:             ${this.tipo.padEnd(32)} ║
╚═══════════════════════════════════════════════════════╝
        `);
    }
}

/**
 * Clase Camion - Hereda de Vehiculo
 * 
 * Representa un camión con capacidad de carga y número de ejes.
 * Los camiones son vehículos pesados con características industriales.
 */
class Camion extends Vehiculo {
    /**
     * Constructor de Camion
     * @param {string} marca 
     * @param {string} modelo 
     * @param {number} anio 
     * @param {number} capacidadCarga - Capacidad en toneladas
     * @param {number} numeroEjes - Número de ejes (2, 3, 4, etc.)
     */
    constructor(marca, modelo, anio, capacidadCarga, numeroEjes) {
        super(marca, modelo, anio);
        this.capacidadCarga = capacidadCarga;
        this.numeroEjes = numeroEjes;
    }

    /**
     * Sobrescritura de mostrarInfo para Camion
     * Incluye capacidad de carga y número de ejes
     */
    mostrarInfo() {
        console.log(`
╔═══════════════════════════════════════════════════════╗
║            INFORMACIÓN DEL CAMIÓN                     ║
╠═══════════════════════════════════════════════════════╣
║ Marca:            ${this.marca.padEnd(32)} ║
║ Modelo:           ${this.modelo.padEnd(32)} ║
║ Año:              ${String(this.anio).padEnd(32)} ║
║ Velocidad actual: ${String(this.velocidadActual).padEnd(32)} km/h ║
║ Capacidad carga:  ${String(this.capacidadCarga).padEnd(32)} ton ║
║ Número de ejes:   ${String(this.numeroEjes).padEnd(32)} ║
╚═══════════════════════════════════════════════════════╝
        `);
    }
}

// ============================================
// PROGRAMA PRINCIPAL - PRUEBAS DEL SISTEMA
// ============================================

console.log('\n╔════════════════════════════════════════════════════════╗');
console.log('║       SISTEMA DE VEHÍCULOS - EJERCICIO 3              ║');
console.log('║       Demostración de Herencia                        ║');
console.log('╚════════════════════════════════════════════════════════╝');

try {
    // ============================================
    // PARTE 1: CREACIÓN DE VEHÍCULOS
    // ============================================
    
    console.log('\n═══════════════════════════════════════════════════════');
    console.log('🚗 CREANDO VEHÍCULOS DE DIFERENTES TIPOS');
    console.log('═══════════════════════════════════════════════════════\n');

    // Creamos un auto deportivo
    const auto1 = new Auto('Toyota', 'Corolla', 2023, 4, 'Gasolina');
    console.log('✅ Auto creado: Toyota Corolla 2023');

    // Creamos una motocicleta deportiva
    const moto1 = new Motocicleta('Yamaha', 'R1', 2022, 1000, 'Deportiva');
    console.log('✅ Motocicleta creada: Yamaha R1 2022');

    // Creamos un camión de carga pesada
    const camion1 = new Camion('Volvo', 'FH16', 2021, 25, 3);
    console.log('✅ Camión creado: Volvo FH16 2021');

    // Creamos vehículos adicionales para más variedad
    const auto2 = new Auto('Tesla', 'Model 3', 2024, 4, 'Eléctrico');
    console.log('✅ Auto creado: Tesla Model 3 2024');

    const moto2 = new Motocicleta('Harley-Davidson', 'Street 750', 2023, 750, 'Crucero');
    console.log('✅ Motocicleta creada: Harley-Davidson Street 750 2023');

    // ============================================
    // PARTE 2: INFORMACIÓN INICIAL
    // ============================================
    
    console.log('\n\n═══════════════════════════════════════════════════════');
    console.log('📋 INFORMACIÓN INICIAL DE TODOS LOS VEHÍCULOS');
    console.log('═══════════════════════════════════════════════════════');

    auto1.mostrarInfo();
    moto1.mostrarInfo();
    camion1.mostrarInfo();
    auto2.mostrarInfo();
    moto2.mostrarInfo();

    // ============================================
    // PARTE 3: PRUEBAS DE ACELERACIÓN
    // ============================================
    
    console.log('\n═══════════════════════════════════════════════════════');
    console.log('🚀 PRUEBAS DE ACELERACIÓN');
    console.log('═══════════════════════════════════════════════════════\n');

    console.log('--- Prueba 1: Acelerando el Toyota Corolla ---');
    auto1.acelerar(50);
    auto1.acelerar(30);
    console.log(`Velocidad final del auto: ${auto1.velocidadActual} km/h\n`);

    console.log('--- Prueba 2: Acelerando la Yamaha R1 (más rápida) ---');
    moto1.acelerar(80);
    moto1.acelerar(60);
    console.log(`Velocidad final de la moto: ${moto1.velocidadActual} km/h\n`);

    console.log('--- Prueba 3: Acelerando el Volvo FH16 (más lento) ---');
    camion1.acelerar(40);
    camion1.acelerar(20);
    console.log(`Velocidad final del camión: ${camion1.velocidadActual} km/h\n`);

    console.log('--- Prueba 4: Acelerando el Tesla Model 3 ---');
    auto2.acelerar(70);
    console.log(`Velocidad actual del Tesla: ${auto2.velocidadActual} km/h\n`);

    // ============================================
    // PARTE 4: PRUEBAS DE FRENADO
    // ============================================
    
    console.log('\n═══════════════════════════════════════════════════════');
    console.log('🛑 PRUEBAS DE FRENADO');
    console.log('═══════════════════════════════════════════════════════\n');

    console.log('--- Prueba 5: Frenando el Toyota Corolla ---');
    console.log(`Velocidad antes de frenar: ${auto1.velocidadActual} km/h`);
    auto1.frenar(30);
    auto1.frenar(20);
    console.log(`Velocidad después de frenar: ${auto1.velocidadActual} km/h\n`);

    console.log('--- Prueba 6: Frenado total de la Yamaha R1 ---');
    console.log(`Velocidad antes de frenar: ${moto1.velocidadActual} km/h`);
    moto1.frenar(100);
    moto1.frenar(50); // Intentamos frenar más, pero ya está en 0
    console.log(`Velocidad después de frenar: ${moto1.velocidadActual} km/h\n`);

    console.log('--- Prueba 7: Frenando el camión (frenado gradual) ---');
    console.log(`Velocidad antes de frenar: ${camion1.velocidadActual} km/h`);
    camion1.frenar(25);
    camion1.frenar(15);
    camion1.frenar(30); // Este lo llevará a 0 (validación de velocidad negativa)
    console.log(`Velocidad después de frenar: ${camion1.velocidadActual} km/h`);
    console.log('✅ La velocidad nunca es negativa (validación correcta)\n');

    // ============================================
    // PARTE 5: PRUEBAS DE ACELERACIÓN Y FRENADO COMBINADOS
    // ============================================
    
    console.log('\n═══════════════════════════════════════════════════════');
    console.log('🔄 PRUEBAS COMBINADAS (ACELERAR Y FRENAR)');
    console.log('═══════════════════════════════════════════════════════\n');

    console.log('--- Prueba 8: Harley-Davidson en carretera ---');
    console.log('Iniciando viaje...');
    moto2.acelerar(60);
    moto2.acelerar(20);
    console.log('Llegando a zona urbana, reduciendo velocidad...');
    moto2.frenar(40);
    console.log('Deteniéndose en semáforo...');
    moto2.frenar(40);
    console.log(`Velocidad final: ${moto2.velocidadActual} km/h\n`);

    console.log('--- Prueba 9: Tesla en autopista ---');
    console.log('Acelerando en autopista...');
    auto2.acelerar(50);
    auto2.acelerar(30);
    console.log('Tomando salida, frenando...');
    auto2.frenar(60);
    console.log(`Velocidad actual: ${auto2.velocidadActual} km/h\n`);

    // ============================================
    // PARTE 6: INFORMACIÓN FINAL DE TODOS LOS VEHÍCULOS
    // ============================================
    
    console.log('\n═══════════════════════════════════════════════════════');
    console.log('📊 ESTADO FINAL DE TODOS LOS VEHÍCULOS');
    console.log('═══════════════════════════════════════════════════════');

    auto1.mostrarInfo();
    moto1.mostrarInfo();
    camion1.mostrarInfo();
    auto2.mostrarInfo();
    moto2.mostrarInfo();

    // ============================================
    // PARTE 7: VERIFICACIÓN DE HERENCIA
    // ============================================
    
    console.log('\n═══════════════════════════════════════════════════════');
    console.log('🔍 VERIFICACIÓN DE HERENCIA');
    console.log('═══════════════════════════════════════════════════════\n');

    console.log('Comprobando que todos los vehículos heredan de Vehiculo:\n');
    
    console.log(`¿auto1 es instancia de Auto? ${auto1 instanceof Auto}`);
    console.log(`¿auto1 es instancia de Vehiculo? ${auto1 instanceof Vehiculo}`);
    console.log('✅ Auto hereda correctamente de Vehiculo\n');

    console.log(`¿moto1 es instancia de Motocicleta? ${moto1 instanceof Motocicleta}`);
    console.log(`¿moto1 es instancia de Vehiculo? ${moto1 instanceof Vehiculo}`);
    console.log('✅ Motocicleta hereda correctamente de Vehiculo\n');

    console.log(`¿camion1 es instancia de Camion? ${camion1 instanceof Camion}`);
    console.log(`¿camion1 es instancia de Vehiculo? ${camion1 instanceof Vehiculo}`);
    console.log('✅ Camion hereda correctamente de Vehiculo\n');

    // ============================================
    // PARTE 8: RESUMEN Y CONCLUSIONES
    // ============================================
    
    console.log('\n═══════════════════════════════════════════════════════');
    console.log('📈 RESUMEN DEL EJERCICIO');
    console.log('═══════════════════════════════════════════════════════\n');

    console.log('🎯 CONCEPTOS DEMOSTRADOS:');
    console.log('  1. Herencia con extends');
    console.log('  2. Uso de super() en constructores');
    console.log('  3. Sobrescritura de métodos (mostrarInfo)');
    console.log('  4. Validación de datos (velocidad no negativa)');
    console.log('  5. Reutilización de código (métodos heredados)');

    console.log('\n📊 ESTADÍSTICAS:');
    const vehiculos = [auto1, moto1, camion1, auto2, moto2];
    const enMovimiento = vehiculos.filter(v => v.velocidadActual > 0).length;
    const detenidos = vehiculos.filter(v => v.velocidadActual === 0).length;

    console.log(`  • Total de vehículos: ${vehiculos.length}`);
    console.log(`  • En movimiento: ${enMovimiento}`);
    console.log(`  • Detenidos: ${detenidos}`);

    console.log('\n✅ Vehículos en movimiento:');
    vehiculos.filter(v => v.velocidadActual > 0).forEach(v => {
        console.log(`   • ${v.marca} ${v.modelo} - ${v.velocidadActual} km/h`);
    });

    console.log('\n🛑 Vehículos detenidos:');
    vehiculos.filter(v => v.velocidadActual === 0).forEach(v => {
        console.log(`   • ${v.marca} ${v.modelo}`);
    });

    console.log('\n\n✅ EJERCICIO 3 COMPLETADO EXITOSAMENTE ✅');
    console.log('\n🎓 CONCLUSIÓN:');
    console.log('   La herencia nos permite:');
    console.log('   • Reutilizar código común en la clase padre');
    console.log('   • Especializar comportamiento en las clases hijas');
    console.log('   • Mantener el código organizado y fácil de mantener');
    console.log('   • Aplicar el principio DRY (Don\'t Repeat Yourself)\n');

} catch (error) {
    console.error('\n❌ ERROR EN EL SISTEMA:');
    console.error(`   ${error.message}`);
    console.error(`   Stack: ${error.stack}`);
    console.error('\n   Por favor, revisa el código y vuelve a intentarlo.\n');
}
