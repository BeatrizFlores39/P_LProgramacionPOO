//Flores Aycaya Blanca Beatriz
// ============================================
// EJERCICIO 7: PROYECTO INTEGRADOR
// Sistema Completo de Gestión de Tienda
// Integra: Herencia, Encapsulamiento, Polimorfismo y Composición
// ============================================

// ============================================
// PARTE 1: JERARQUÍA DE PRODUCTOS (Herencia + Encapsulamiento)
// ============================================

/**
 * Clase Producto - Clase base para todos los productos
 * Demuestra encapsulamiento con propiedades privadas (#)
 */
class Producto {
    #precio;
    #stock;

    constructor(nombre, codigo, precio, stock) {
        this.nombre = nombre;
        this.codigo = codigo;
        this.#precio = precio;
        this.#stock = stock;
    }

    // Getters para acceder a propiedades privadas
    getPrecio() {
        return this.#precio;
    }

    getStock() {
        return this.#stock;
    }

    // Método para reducir stock (con validación)
    reducirStock(cantidad) {
        if (cantidad <= this.#stock) {
            this.#stock -= cantidad;
            return true;
        }
        return false;
    }

    // Método para aumentar stock
    aumentarStock(cantidad) {
        this.#stock += cantidad;
    }

    // Método para mostrar info básica
    mostrarInfo() {
        return `${this.nombre} - $${this.#precio} (Stock: ${this.#stock})`;
    }
}

/**
 * Clase Electronico - Hereda de Producto
 */
class Electronico extends Producto {
    constructor(nombre, codigo, precio, stock, garantiaMeses, marca) {
        super(nombre, codigo, precio, stock);
        this.garantiaMeses = garantiaMeses;
        this.marca = marca;
    }

    mostrarInfo() {
        return `${super.mostrarInfo()} | ${this.marca} - Garantía: ${this.garantiaMeses} meses`;
    }
}

/**
 * Clase Ropa - Hereda de Producto
 */
class Ropa extends Producto {
    constructor(nombre, codigo, precio, stock, talla, color) {
        super(nombre, codigo, precio, stock);
        this.talla = talla;
        this.color = color;
    }

    mostrarInfo() {
        return `${super.mostrarInfo()} | Talla: ${this.talla}, Color: ${this.color}`;
    }
}

/**
 * Clase Alimento - Hereda de Producto
 */
class Alimento extends Producto {
    constructor(nombre, codigo, precio, stock, fechaVencimiento) {
        super(nombre, codigo, precio, stock);
        this.fechaVencimiento = fechaVencimiento;
    }

    mostrarInfo() {
        return `${super.mostrarInfo()} | Vence: ${this.fechaVencimiento}`;
    }
}

// ============================================
// PARTE 2: SISTEMA DE CLIENTES (Composición)
// ============================================

/**
 * Clase Cliente - Representa a un cliente de la tienda
 */
class Cliente {
    constructor(nombre, id) {
        this.nombre = nombre;
        this.id = id;
        this.historialCompras = [];
        this.puntos = 0;
    }

    agregarCompra(compra) {
        this.historialCompras.push(compra);
        // 1 punto por cada $10 de compra
        this.puntos += Math.floor(compra.total / 10);
    }

    obtenerPuntos() {
        return this.puntos;
    }

    mostrarInfo() {
        console.log(`\n👤 Cliente: ${this.nombre} (${this.id})`);
        console.log(`   💳 Puntos acumulados: ${this.puntos}`);
        console.log(`   🛒 Compras realizadas: ${this.historialCompras.length}`);
    }
}

// ============================================
// PARTE 3: CARRITO DE COMPRAS (Composición)
// ============================================

/**
 * Clase Carrito - Maneja el carrito de compras
 */
class Carrito {
    constructor(cliente) {
        this.cliente = cliente;
        this.productos = []; // Array de {producto, cantidad}
    }

    agregarProducto(producto, cantidad) {
        // Validar que hay stock suficiente
        if (producto.getStock() < cantidad) {
            console.log(`❌ Stock insuficiente de ${producto.nombre}. Disponible: ${producto.getStock()}`);
            return false;
        }

        // Buscar si el producto ya está en el carrito
        const productoExistente = this.productos.find(item => item.producto.codigo === producto.codigo);

        if (productoExistente) {
            // Si existe, aumentar cantidad
            const nuevaCantidad = productoExistente.cantidad + cantidad;
            if (producto.getStock() >= nuevaCantidad) {
                productoExistente.cantidad = nuevaCantidad;
                console.log(`✅ ${cantidad}x ${producto.nombre} agregado al carrito`);
                return true;
            } else {
                console.log(`❌ Stock insuficiente para agregar más ${producto.nombre}`);
                return false;
            }
        } else {
            // Si no existe, agregarlo
            this.productos.push({ producto, cantidad });
            console.log(`✅ ${cantidad}x ${producto.nombre} agregado al carrito`);
            return true;
        }
    }

    calcularTotal() {
        return this.productos.reduce((total, item) => {
            return total + (item.producto.getPrecio() * item.cantidad);
        }, 0);
    }

    aplicarDescuento(descuento) {
        const total = this.calcularTotal();
        return descuento.aplicar(total);
    }

    vaciar() {
        this.productos = [];
    }

    mostrarContenido() {
        console.log(`\n🛒 Carrito de ${this.cliente.nombre}:`);
        if (this.productos.length === 0) {
            console.log('   (vacío)');
        } else {
            this.productos.forEach((item, index) => {
                const subtotal = item.producto.getPrecio() * item.cantidad;
                console.log(`   ${index + 1}. ${item.cantidad}x ${item.producto.nombre} - $${subtotal.toFixed(2)}`);
            });
            console.log(`   💰 Total: $${this.calcularTotal().toFixed(2)}`);
        }
    }
}

// ============================================
// PARTE 4: SISTEMA DE DESCUENTOS (Polimorfismo)
// ============================================

/**
 * Clase base Descuento
 */
class Descuento {
    aplicar(total) {
        return total; // Sin descuento por defecto
    }
}

/**
 * Descuento por porcentaje
 */
class DescuentoPorcentaje extends Descuento {
    constructor(porcentaje) {
        super();
        this.porcentaje = porcentaje;
    }

    aplicar(total) {
        const descuento = total * (this.porcentaje / 100);
        return total - descuento;
    }

    getDescripcion() {
        return `${this.porcentaje}% de descuento`;
    }
}

/**
 * Descuento fijo
 */
class DescuentoFijo extends Descuento {
    constructor(monto) {
        super();
        this.monto = monto;
    }

    aplicar(total) {
        return Math.max(0, total - this.monto);
    }

    getDescripcion() {
        return `$${this.monto} de descuento`;
    }
}

// ============================================
// PARTE 5: MÉTODOS DE PAGO (Polimorfismo)
// ============================================

/**
 * Clase base MetodoPago
 */
class MetodoPago {
    procesar(monto) {
        return true;
    }
}

/**
 * Pago en efectivo
 */
class PagoEfectivo extends MetodoPago {
    procesar(monto) {
        console.log(`\n💵 Procesando pago en efectivo: $${monto.toFixed(2)}`);
        console.log('✅ Pago en efectivo procesado exitosamente');
        return true;
    }
}

/**
 * Pago con tarjeta
 */
class PagoTarjeta extends MetodoPago {
    constructor(numeroTarjeta) {
        super();
        this.numeroTarjeta = numeroTarjeta;
    }

    procesar(monto) {
        const ultimos4 = this.numeroTarjeta.slice(-4);
        console.log(`\n💳 Procesando pago con tarjeta **** ${ultimos4}: $${monto.toFixed(2)}`);
        console.log('✅ Pago con tarjeta procesado exitosamente');
        return true;
    }
}

// ============================================
// PARTE 6: LA TIENDA (Composición + Integración)
// ============================================

/**
 * Clase Tienda - Clase principal que integra todo el sistema
 */
class Tienda {
    constructor(nombre) {
        this.nombre = nombre;
        this.inventario = [];
        this.clientes = [];
    }

    agregarProducto(producto) {
        this.inventario.push(producto);
        console.log(`✅ Producto "${producto.nombre}" agregado al inventario`);
    }

    registrarCliente(cliente) {
        this.clientes.push(cliente);
        console.log(`✅ Cliente "${cliente.nombre}" registrado`);
    }

    buscarProducto(codigo) {
        return this.inventario.find(p => p.codigo === codigo);
    }

    procesarCompra(carrito, metodoPago, descuento = null) {
        console.log('\n' + '═'.repeat(60));
        console.log('🛍️  PROCESANDO COMPRA');
        console.log('═'.repeat(60));

        // 1. Validar que hay stock suficiente
        for (let item of carrito.productos) {
            if (item.producto.getStock() < item.cantidad) {
                console.log(`\n❌ Stock insuficiente de ${item.producto.nombre}`);
                return false;
            }
        }

        // 2. Calcular total
        let total = carrito.calcularTotal();
        let totalOriginal = total;

        // 3. Aplicar descuento si existe
        if (descuento) {
            total = descuento.aplicar(total);
            console.log(`\n💰 Subtotal: $${totalOriginal.toFixed(2)}`);
            console.log(`🎁 Descuento aplicado: ${descuento.getDescripcion()}`);
            console.log(`💵 Total con descuento: $${total.toFixed(2)}`);
        } else {
            console.log(`\n💵 Total: $${total.toFixed(2)}`);
        }

        // 4. Procesar pago
        if (!metodoPago.procesar(total)) {
            console.log('\n❌ Error al procesar el pago');
            return false;
        }

        // 5. Reducir stock
        for (let item of carrito.productos) {
            item.producto.reducirStock(item.cantidad);
        }

        // 6. Registrar compra
        const compra = {
            fecha: new Date(),
            productos: [...carrito.productos],
            total: total,
            totalOriginal: totalOriginal,
            descuento: descuento
        };
        carrito.cliente.agregarCompra(compra);

        // 7. Generar factura
        this.generarFactura(compra, carrito.cliente);

        // 8. Vaciar carrito
        carrito.vaciar();

        console.log('\n✅ Compra procesada exitosamente\n');
        return true;
    }

    generarFactura(compra, cliente) {
        console.log('\n' + '═'.repeat(60));
        console.log('📄 FACTURA');
        console.log('═'.repeat(60));
        console.log(`🏪 ${this.nombre}`);
        console.log(`📅 Fecha: ${compra.fecha.toLocaleString()}`);
        console.log(`👤 Cliente: ${cliente.nombre} (${cliente.id})`);
        console.log('─'.repeat(60));
        console.log('PRODUCTOS:');
        
        compra.productos.forEach((item, index) => {
            const subtotal = item.producto.getPrecio() * item.cantidad;
            console.log(`${index + 1}. ${item.cantidad}x ${item.producto.nombre.padEnd(30)} $${subtotal.toFixed(2)}`);
        });
        
        console.log('─'.repeat(60));
        
        if (compra.descuento) {
            console.log(`Subtotal:                                  $${compra.totalOriginal.toFixed(2)}`);
            console.log(`Descuento (${compra.descuento.getDescripcion()}):                   -$${(compra.totalOriginal - compra.total).toFixed(2)}`);
        }
        
        console.log(`TOTAL:                                     $${compra.total.toFixed(2)}`);
        console.log(`💳 Puntos ganados: ${Math.floor(compra.total / 10)}`);
        console.log(`🎁 Puntos acumulados: ${cliente.puntos}`);
        console.log('═'.repeat(60));
    }

    mostrarInventario() {
        console.log(`\n📦 INVENTARIO DE ${this.nombre.toUpperCase()}`);
        console.log('─'.repeat(60));
        this.inventario.forEach((producto, index) => {
            console.log(`${index + 1}. ${producto.mostrarInfo()}`);
        });
        console.log('─'.repeat(60));
    }
}

// ============================================
// PROGRAMA PRINCIPAL - PRUEBA COMPLETA
// ============================================

console.log('\n╔════════════════════════════════════════════════════════╗');
console.log('║     SISTEMA DE TIENDA - EJERCICIO 7                   ║');
console.log('║     Proyecto Integrador (Todos los conceptos POO)     ║');
console.log('╚════════════════════════════════════════════════════════╝');

try {
    // ============================================
    // 1. CREAR LA TIENDA
    // ============================================
    
    console.log('\n' + '═'.repeat(60));
    console.log('🏪 PASO 1: CREANDO LA TIENDA');
    console.log('═'.repeat(60) + '\n');

    const tienda = new Tienda('TechStore');
    console.log(`✅ Tienda "${tienda.nombre}" creada exitosamente\n`);

    // ============================================
    // 2. AGREGAR PRODUCTOS AL INVENTARIO
    // ============================================
    
    console.log('═'.repeat(60));
    console.log('📦 PASO 2: AGREGANDO PRODUCTOS AL INVENTARIO');
    console.log('═'.repeat(60) + '\n');

    // Electrónicos
    const laptop = new Electronico('Laptop HP Pavilion', 'ELEC001', 850, 10, 24, 'HP');
    const celular = new Electronico('iPhone 15', 'ELEC002', 1200, 5, 12, 'Apple');
    const audifonos = new Electronico('AirPods Pro', 'ELEC003', 250, 15, 12, 'Apple');

    // Ropa
    const camisa = new Ropa('Camisa Polo', 'ROP001', 35, 50, 'M', 'Azul');
    const pantalon = new Ropa('Jeans Levis', 'ROP002', 60, 30, 'L', 'Negro');

    // Alimentos
    const cereal = new Alimento('Cereal Fitness', 'ALI001', 5, 100, '2025-06-15');
    const cafe = new Alimento('Café Nescafé', 'ALI002', 8, 80, '2025-12-20');

    tienda.agregarProducto(laptop);
    tienda.agregarProducto(celular);
    tienda.agregarProducto(audifonos);
    tienda.agregarProducto(camisa);
    tienda.agregarProducto(pantalon);
    tienda.agregarProducto(cereal);
    tienda.agregarProducto(cafe);

    tienda.mostrarInventario();

    // ============================================
    // 3. REGISTRAR CLIENTES
    // ============================================
    
    console.log('\n' + '═'.repeat(60));
    console.log('👥 PASO 3: REGISTRANDO CLIENTES');
    console.log('═'.repeat(60) + '\n');

    const cliente1 = new Cliente('María González', 'CLI001');
    const cliente2 = new Cliente('Juan Pérez', 'CLI002');

    tienda.registrarCliente(cliente1);
    tienda.registrarCliente(cliente2);

    // ============================================
    // 4. COMPRA DEL CLIENTE 1
    // ============================================
    
    console.log('\n\n' + '═'.repeat(60));
    console.log('🛒 PASO 4: COMPRA DEL CLIENTE 1 (María González)');
    console.log('═'.repeat(60));

    const carrito1 = new Carrito(cliente1);
    console.log('\n--- Agregando productos al carrito ---');
    carrito1.agregarProducto(laptop, 1);
    carrito1.agregarProducto(audifonos, 2);
    carrito1.agregarProducto(camisa, 1);

    carrito1.mostrarContenido();

    // Aplicar descuento del 10%
    const descuento1 = new DescuentoPorcentaje(10);
    
    // Pagar con tarjeta
    const pago1 = new PagoTarjeta('4532-1234-5678-9010');
    
    tienda.procesarCompra(carrito1, pago1, descuento1);

    cliente1.mostrarInfo();

    // ============================================
    // 5. COMPRA DEL CLIENTE 2
    // ============================================
    
    console.log('\n\n' + '═'.repeat(60));
    console.log('🛒 PASO 5: COMPRA DEL CLIENTE 2 (Juan Pérez)');
    console.log('═'.repeat(60));

    const carrito2 = new Carrito(cliente2);
    console.log('\n--- Agregando productos al carrito ---');
    carrito2.agregarProducto(celular, 1);
    carrito2.agregarProducto(pantalon, 2);
    carrito2.agregarProducto(cereal, 5);
    carrito2.agregarProducto(cafe, 3);

    carrito2.mostrarContenido();

    // Aplicar descuento fijo de $50
    const descuento2 = new DescuentoFijo(50);
    
    // Pagar en efectivo
    const pago2 = new PagoEfectivo();
    
    tienda.procesarCompra(carrito2, pago2, descuento2);

    cliente2.mostrarInfo();

    // ============================================
    // 6. VERIFICAR INVENTARIO ACTUALIZADO
    // ============================================
    
    console.log('\n\n' + '═'.repeat(60));
    console.log('📊 PASO 6: INVENTARIO ACTUALIZADO');
    console.log('═'.repeat(60));

    tienda.mostrarInventario();

    // ============================================
    // 7. RESUMEN FINAL
    // ============================================
    
    console.log('\n\n' + '═'.repeat(60));
    console.log('📈 RESUMEN FINAL DEL SISTEMA');
    console.log('═'.repeat(60) + '\n');

    console.log(`🏪 Tienda: ${tienda.nombre}`);
    console.log(`📦 Productos en inventario: ${tienda.inventario.length}`);
    console.log(`👥 Clientes registrados: ${tienda.clientes.length}`);
    
    const totalVentas = tienda.clientes.reduce((sum, c) => {
        return sum + c.historialCompras.reduce((s, compra) => s + compra.total, 0);
    }, 0);
    
    console.log(`💰 Total de ventas: $${totalVentas.toFixed(2)}`);
    console.log(`🎁 Puntos totales otorgados: ${tienda.clientes.reduce((sum, c) => sum + c.puntos, 0)}`);

    console.log('\n👥 RESUMEN DE CLIENTES:');
    tienda.clientes.forEach(cliente => {
        const totalGastado = cliente.historialCompras.reduce((sum, compra) => sum + compra.total, 0);
        console.log(`   • ${cliente.nombre}: ${cliente.historialCompras.length} compras, $${totalGastado.toFixed(2)} gastados, ${cliente.puntos} puntos`);
    });

    console.log('\n\n✅ EJERCICIO 7 COMPLETADO EXITOSAMENTE ✅');
    console.log('\n🎓 CONCEPTOS INTEGRADOS:');
    console.log('   ✔️  Herencia: Producto → Electronico, Ropa, Alimento');
    console.log('   ✔️  Encapsulamiento: Propiedades privadas (#precio, #stock)');
    console.log('   ✔️  Polimorfismo: Descuentos y Métodos de Pago');
    console.log('   ✔️  Composición: Tienda contiene Productos, Clientes, Carritos');
    console.log('   ✔️  Abstracción: Interfaces comunes para diferentes tipos\n');

} catch (error) {
    console.error('\n❌ ERROR EN EL SISTEMA:');
    console.error(`   ${error.message}`);
    console.error(`   Stack: ${error.stack}`);
    console.error('\n   Por favor, revisa el código y vuelve a intentarlo.\n');
}
