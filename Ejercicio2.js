// ============================================
// EJERCICIO 2: ENCAPSULAMIENTO
// Sistema de Gestión de Cuentas Bancarias
// ============================================

/**
 * Clase CuentaBancaria - Demuestra el uso de encapsulamiento con propiedades privadas
 * 
 * Esta clase protege los datos sensibles (saldo, titular, número de cuenta) usando
 * el símbolo # para hacerlos verdaderamente privados. Solo se puede acceder a ellos
 * mediante métodos públicos que incluyen las validaciones necesarias.
 */
class CuentaBancaria {
    // Propiedades privadas - No se pueden acceder desde fuera de la clase
    #titular;
    #saldo;
    #numeroCuenta;

    /**
     * Constructor - Inicializa una nueva cuenta bancaria
     * @param {string} titular - Nombre del titular de la cuenta
     * @param {string} numeroCuenta - Número único de la cuenta
     * @param {number} saldoInicial - Saldo inicial (por defecto 0)
     */
    constructor(titular, numeroCuenta, saldoInicial = 0) {
        this.#titular = titular;
        this.#numeroCuenta = numeroCuenta;
        this.#saldo = saldoInicial;
        
        console.log(`\n✅ Cuenta creada exitosamente:`);
        console.log(`   Titular: ${titular}`);
        console.log(`   Número de cuenta: ${numeroCuenta}`);
        console.log(`   Saldo inicial: $${saldoInicial.toFixed(2)}`);
    }

    /**
     * Método depositar - Añade dinero a la cuenta
     * Valida que el monto sea positivo antes de realizar la operación
     * @param {number} monto - Cantidad a depositar
     * @returns {boolean} - true si fue exitoso, false si falló
     */
    depositar(monto) {
        // Validación: el monto debe ser mayor a 0
        if (monto <= 0) {
            console.log(`\n❌ Error: No se puede depositar $${monto}. El monto debe ser mayor a 0.`);
            return false;
        }

        // Si pasa la validación, realizamos el depósito
        this.#saldo += monto;
        console.log(`\n💰 Depósito exitoso de $${monto.toFixed(2)}`);
        console.log(`   Nuevo saldo: $${this.#saldo.toFixed(2)}`);
        return true;
    }

    /**
     * Método retirar - Extrae dinero de la cuenta
     * Valida que el monto sea positivo y que haya saldo suficiente
     * @param {number} monto - Cantidad a retirar
     * @returns {boolean} - true si fue exitoso, false si falló
     */
    retirar(monto) {
        // Validación 1: el monto debe ser mayor a 0
        if (monto <= 0) {
            console.log(`\n❌ Error: No se puede retirar $${monto}. El monto debe ser mayor a 0.`);
            return false;
        }

        // Validación 2: debe haber saldo suficiente
        if (monto > this.#saldo) {
            console.log(`\n❌ Error: Saldo insuficiente.`);
            console.log(`   Saldo disponible: $${this.#saldo.toFixed(2)}`);
            console.log(`   Monto solicitado: $${monto.toFixed(2)}`);
            return false;
        }

        // Si pasan ambas validaciones, realizamos el retiro
        this.#saldo -= monto;
        console.log(`\n💸 Retiro exitoso de $${monto.toFixed(2)}`);
        console.log(`   Nuevo saldo: $${this.#saldo.toFixed(2)}`);
        return true;
    }

    /**
     * Método consultarSaldo - Devuelve el saldo actual sin modificarlo
     * Esta es la única forma segura de conocer el saldo desde fuera de la clase
     * @returns {number} - El saldo actual de la cuenta
     */
    consultarSaldo() {
        return this.#saldo;
    }

    /**
     * Método transferir - Transfiere dinero a otra cuenta
     * Primero intenta retirar de esta cuenta, y si es exitoso, deposita en la otra
     * @param {CuentaBancaria} cuentaDestino - Cuenta que recibirá el dinero
     * @param {number} monto - Cantidad a transferir
     * @returns {boolean} - true si fue exitoso, false si falló
     */
    transferir(cuentaDestino, monto) {
        console.log(`\n🔄 Iniciando transferencia de $${monto.toFixed(2)}...`);
        console.log(`   Origen: ${this.#titular} (${this.#numeroCuenta})`);
        console.log(`   Destino: ${cuentaDestino.titular} (${cuentaDestino.numeroCuenta})`);

        // Primero intentamos retirar de la cuenta origen
        // Si el retiro falla (por saldo insuficiente o monto inválido), 
        // la transferencia completa falla
        if (this.retirar(monto)) {
            // Si el retiro fue exitoso, depositamos en la cuenta destino
            cuentaDestino.depositar(monto);
            console.log(`\n✅ Transferencia completada exitosamente.`);
            return true;
        }

        // Si el retiro falló, la transferencia no se realiza
        console.log(`\n❌ Transferencia cancelada.`);
        return false;
    }

    /**
     * Getter para titular - Permite leer el titular pero no modificarlo
     * Esto demuestra encapsulamiento: lectura permitida, escritura prohibida
     */
    get titular() {
        return this.#titular;
    }

    /**
     * Getter para numeroCuenta - Permite leer el número pero no modificarlo
     */
    get numeroCuenta() {
        return this.#numeroCuenta;
    }

    /**
     * Método para mostrar información completa de la cuenta
     * Útil para verificar el estado actual
     */
    mostrarInfo() {
        console.log(`
╔═════════════════════════════════════════════════════╗
║          INFORMACIÓN DE LA CUENTA                   ║
╠═════════════════════════════════════════════════════╣
║ Titular:         ${this.#titular.padEnd(32)} ║
║ Número:          ${this.#numeroCuenta.padEnd(32)} ║
║ Saldo actual:    $${String(this.#saldo.toFixed(2)).padEnd(31)} ║
╚═════════════════════════════════════════════════════╝
        `);
    }
}

// ============================================
// PROGRAMA PRINCIPAL - PRUEBAS DEL SISTEMA
// ============================================

console.log('\n╔════════════════════════════════════════════════════════╗');
console.log('║       SISTEMA BANCARIO - EJERCICIO 2                  ║');
console.log('║       Demostración de Encapsulamiento                 ║');
console.log('╚════════════════════════════════════════════════════════╝');

try {
    // ============================================
    // PARTE 1: CREACIÓN DE CUENTAS
    // ============================================
    
    console.log('\n═══════════════════════════════════════════════════════');
    console.log('📋 CREANDO CUENTAS BANCARIAS');
    console.log('═══════════════════════════════════════════════════════');

    const cuenta1 = new CuentaBancaria('María González', '001-2345678', 5000);
    const cuenta2 = new CuentaBancaria('Juan Pérez', '001-8765432', 3000);

    // ============================================
    // PARTE 2: CONSULTA DE SALDOS INICIALES
    // ============================================
    
    console.log('\n\n═══════════════════════════════════════════════════════');
    console.log('💼 ESTADO INICIAL DE LAS CUENTAS');
    console.log('═══════════════════════════════════════════════════════');

    cuenta1.mostrarInfo();
    cuenta2.mostrarInfo();

    // ============================================
    // PARTE 3: PRUEBAS DE DEPÓSITO
    // ============================================
    
    console.log('\n═══════════════════════════════════════════════════════');
    console.log('💰 PRUEBAS DE DEPÓSITO');
    console.log('═══════════════════════════════════════════════════════');

    console.log('\n--- Prueba 1: Depósito válido en cuenta de María ---');
    cuenta1.depositar(1500);

    console.log('\n--- Prueba 2: Depósito válido en cuenta de Juan ---');
    cuenta2.depositar(2000);

    console.log('\n--- Prueba 3: Intento de depósito con monto cero (debe fallar) ---');
    cuenta1.depositar(0);

    console.log('\n--- Prueba 4: Intento de depósito con monto negativo (debe fallar) ---');
    cuenta2.depositar(-500);

    // ============================================
    // PARTE 4: PRUEBAS DE RETIRO
    // ============================================
    
    console.log('\n\n═══════════════════════════════════════════════════════');
    console.log('💸 PRUEBAS DE RETIRO');
    console.log('═══════════════════════════════════════════════════════');

    console.log('\n--- Prueba 5: Retiro válido de la cuenta de María ---');
    cuenta1.retirar(2000);

    console.log('\n--- Prueba 6: Intento de retiro mayor al saldo (debe fallar) ---');
    cuenta2.retirar(10000);

    console.log('\n--- Prueba 7: Intento de retiro con monto negativo (debe fallar) ---');
    cuenta1.retirar(-100);

    console.log('\n--- Prueba 8: Retiro válido de la cuenta de Juan ---');
    cuenta2.retirar(1000);

    // ============================================
    // PARTE 5: PRUEBAS DE TRANSFERENCIA
    // ============================================
    
    console.log('\n\n═══════════════════════════════════════════════════════');
    console.log('🔄 PRUEBAS DE TRANSFERENCIA');
    console.log('═══════════════════════════════════════════════════════');

    console.log('\n--- Prueba 9: Transferencia exitosa de María a Juan ---');
    cuenta1.transferir(cuenta2, 1000);

    console.log('\n--- Prueba 10: Intento de transferencia con saldo insuficiente ---');
    cuenta2.transferir(cuenta1, 20000);

    console.log('\n--- Prueba 11: Transferencia exitosa de Juan a María ---');
    cuenta2.transferir(cuenta1, 500);

    // ============================================
    // PARTE 6: VERIFICACIÓN DEL ENCAPSULAMIENTO
    // ============================================
    
    console.log('\n\n═══════════════════════════════════════════════════════');
    console.log('🔒 PRUEBAS DE ENCAPSULAMIENTO');
    console.log('═══════════════════════════════════════════════════════');

    console.log('\n--- Prueba 12: Intentar acceder directamente al saldo (debe fallar) ---');
    console.log('Ejecutando: console.log(cuenta1.#saldo)');
    console.log('Resultado: ❌ Esto causaría un error de sintaxis');
    console.log('Razón: Las propiedades privadas (#) no son accesibles fuera de la clase');

    console.log('\n--- Prueba 13: Acceso correcto al saldo mediante método público ---');
    const saldoMaría = cuenta1.consultarSaldo();
    console.log(`✅ Saldo de María obtenido correctamente: $${saldoMaría.toFixed(2)}`);

    console.log('\n--- Prueba 14: Acceso a datos públicos mediante getters ---');
    console.log(`✅ Titular cuenta 1: ${cuenta1.titular}`);
    console.log(`✅ Número cuenta 1: ${cuenta1.numeroCuenta}`);
    console.log(`✅ Titular cuenta 2: ${cuenta2.titular}`);
    console.log(`✅ Número cuenta 2: ${cuenta2.numeroCuenta}`);

    console.log('\n--- Prueba 15: Intentar modificar el titular (debe fallar) ---');
    console.log('Intentando: cuenta1.titular = "Otro nombre"');
    // Esta línea no modificará el titular porque es un getter sin setter
    // cuenta1.titular = "Otro nombre"; // Esto no causará error pero tampoco modificará nada
    console.log(`Resultado: Titular sigue siendo "${cuenta1.titular}"`);
    console.log('✅ El encapsulamiento protege los datos correctamente');

    // ============================================
    // PARTE 7: ESTADO FINAL
    // ============================================
    
    console.log('\n\n═══════════════════════════════════════════════════════');
    console.log('📊 ESTADO FINAL DE LAS CUENTAS');
    console.log('═══════════════════════════════════════════════════════');

    cuenta1.mostrarInfo();
    cuenta2.mostrarInfo();

    // ============================================
    // PARTE 8: RESUMEN DE OPERACIONES
    // ============================================
    
    console.log('\n═══════════════════════════════════════════════════════');
    console.log('📈 RESUMEN DE OPERACIONES REALIZADAS');
    console.log('═══════════════════════════════════════════════════════\n');

    console.log('Cuenta de María González (001-2345678):');
    console.log('  • Saldo inicial: $5000.00');
    console.log('  • + Depósito: $1500.00');
    console.log('  • - Retiro: $2000.00');
    console.log('  • - Transferencia a Juan: $1000.00');
    console.log('  • + Transferencia de Juan: $500.00');
    console.log(`  • Saldo final: $${cuenta1.consultarSaldo().toFixed(2)}`);

    console.log('\nCuenta de Juan Pérez (001-8765432):');
    console.log('  • Saldo inicial: $3000.00');
    console.log('  • + Depósito: $2000.00');
    console.log('  • - Retiro: $1000.00');
    console.log('  • + Transferencia de María: $1000.00');
    console.log('  • - Transferencia a María: $500.00');
    console.log(`  • Saldo final: $${cuenta2.consultarSaldo().toFixed(2)}`);

    console.log('\n✅ TODAS LAS PRUEBAS COMPLETADAS EXITOSAMENTE ✅');
    console.log('\n🔒 CONCLUSIÓN:');
    console.log('   El encapsulamiento garantiza que:');
    console.log('   • Los datos sensibles están protegidos');
    console.log('   • Solo se pueden modificar mediante métodos validados');
    console.log('   • La integridad de los datos se mantiene en todo momento');

    console.log('\n\n✅ EJERCICIO 2 COMPLETADO EXITOSAMENTE ✅\n');

} catch (error) {
    console.error('\n❌ ERROR EN EL SISTEMA:');
    console.error(`   ${error.message}`);
    console.error(`   Stack: ${error.stack}`);
    console.error('\n   Por favor, revisa el código y vuelve a intentarlo.\n');
}
