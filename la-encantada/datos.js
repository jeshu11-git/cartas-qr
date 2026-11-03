/* =========================================================
   DATOS DE LA CARTA — Huarique Piurano "La Encantada"
   Para un cliente nuevo: copia la carpeta, cambia SOLO este
   archivo y las fotos. La plantilla no se toca.
   ========================================================= */
window.CARTA = {

  negocio: {
    nombre: "Huarique Piurano",
    subtitulo: "La Encantada",
    etiqueta: "Cocina piurana",
    lema: "Sabor norteño de verdad",
    logo: "fotos/logo.webp",          // FOTO PENDIENTE
    portada: "fotos/portada.webp"     // FOTO PENDIENTE (fachada o mesa con platos)
  },

  // Colores de la marca del cliente
  tema: {
    principal: "#1565A8",       // Azul marino
    principalOscuro: "#0E4A7E",
    secundario: "#2FA9C4",      // Turquesa
    accion: "#C4622D",          // Terracota
    destacado: "#D6362C",       // Rojo piurano
    promo: "#F2B705",           // Amarillo arena
    fondo: "#FBF6EE",           // Crema
    textoSuave: "#5C5750"       // Gris piedra
  },

  contacto: {
    whatsapp: "51919474879",    // CONFIRMAR con el dueño
    telefonos: ["919474879", "901602083"],
    mensajeWhatsapp: "Hola, quisiera hacer una reserva",
    textoBoton: "Reservar",
    direccion: "",              // PENDIENTE: dirección del local
    mapa: "",                   // PENDIENTE: link de Google Maps del local
    instagram: "",
    facebook: "",
    tiktok: ""
  },

  // Pedidos por WhatsApp desde la carta
  pedidos: {
    activo: true,
    whatsapp: "51919474879",   // número donde llegan los pedidos
    modos: ["Recojo en el local", "Envío mi motorizado a recogerlo"],
    aviso: "El delivery lo coordinas tú con tu motorizado. Nosotros lo dejamos empacado y listo."
  },

  // PENDIENTE: horario real. Ejemplo de formato:
  // horario: { lun: ["10:00","17:00"], mar: ["10:00","17:00"], mie: null, ... }
  // (null = cerrado ese día). Mientras sea null, no se muestra "Abierto ahora".
  horario: null,

  moneda: "S/",

  categorias: [
    {
      id: "chef", nombre: "Recomendaciones del Chef", corto: "Del día",
      nota: "Un plato especial cada día de la semana",
      platos: [
        { dia: "lun", nombre: "Arroz con mondonguito", precio: 30 },
        { dia: "mar", nombre: "Atamalado", precio: 30 },
        { dia: "mie", nombre: "Tollito aliñado", precio: 30 },
        { dia: "jue", nombre: "Sopa de novios", precio: 30 },
        { dia: "vie", nombre: "Mala rabia", precio: 30 }
      ]
    },
    {
      id: "ceviches", nombre: "Cevichería", corto: "Ceviches",
      platos: [
        { nombre: "Ceviche clásico", precio: 35, opciones: ["Con ají", "Sin ají"],
          destacado: true, foto: "fotos/ceviche-clasico.webp" },          // FOTO PENDIENTE
        { nombre: "Ceviche de caballa", precio: 35, opciones: ["Con ají", "Sin ají"] },
        { nombre: "Ceviche de filete", precio: 35, opciones: ["Con ají", "Sin ají"] },
        { nombre: "Ceviche norteño", precio: 35, opciones: ["Con ají", "Sin ají"] },
        { nombre: "Ceviche mixto", precio: 35, opciones: ["Con ají", "Sin ají"] },
        { nombre: "Ceviche de conchas negras", precio: 40, opciones: ["Con ají", "Sin ají"] },
        { nombre: "Ceviche tiradito", precio: 40 },
        { nombre: "Ceviche tricolor", precio: 40 }
      ]
    },
    {
      id: "leche", nombre: "Leche de Tigre", corto: "Leche de tigre",
      platos: [
        { nombre: "Leche de tigre", precio: 25 },
        { nombre: "Leche de tigre en pasta de ají amarillo", precio: 25 },
        { nombre: "Leche de pantera", precio: 30 },
        { nombre: "Leche de tigre mixta", precio: 30 }
      ]
    },
    {
      id: "jaleas", nombre: "Chicharrones y Jaleas", corto: "Jaleas",
      platos: [
        { nombre: "Jalea al estilo Huarique", precio: 40, etiqueta: "De la casa",
          destacado: true, foto: "fotos/jalea-huarique.webp" },           // FOTO PENDIENTE
        { nombre: "Jalea mixta", precio: 35 },
        { nombre: "Jalea de pescado", precio: 35 },
        { nombre: "Chicharrón de pescado", precio: 35 },
        { nombre: "Chicharrón mixto", precio: 35 },
        { nombre: "Chicharrón de pota", precio: 35 }
      ]
    },
    {
      id: "arroces", nombre: "Arroces", corto: "Arroces",
      platos: [
        { nombre: "Arroz al estilo Huarique", precio: 35, etiqueta: "De la casa",
          destacado: true, foto: "fotos/arroz-huarique.webp" },           // FOTO PENDIENTE
        { nombre: "Arroz con mariscos", precio: 35,
          destacado: true, foto: "fotos/arroz-mariscos.webp" },           // FOTO PENDIENTE
        { nombre: "Arroz con langostinos", precio: 40 },
        { nombre: "Arroz con conchas negras", precio: 40 },
        { nombre: "Arroz chaufa de mariscos", precio: 35 },
        { nombre: "Arroz chaufa de pescado", precio: 35 },
        { nombre: "Arroz en salsa de mariscos", precio: 40 },
        { nombre: "Picante de mariscos", precio: 35 }
      ]
    },
    {
      id: "fritos", nombre: "Pescado Frito", corto: "Pescado frito",
      platos: [
        { nombre: "Cabrilla frita", precio: 35 },
        { nombre: "Cachema frita", precio: 35 },
        { nombre: "Filete frito", precio: 35 },
        { nombre: "Pescado a lo macho", precio: 40 }
      ]
    },
    {
      id: "sudados", nombre: "Sudados y Parihuelas", corto: "Sudados",
      platos: [
        { nombre: "Sudado de cabrilla", precio: 30 },
        { nombre: "Parihuela de cabrilla", precio: 35 },
        { nombre: "Sudado de cachema", precio: 30 },
        { nombre: "Parihuela de cachema", precio: 35 },
        { nombre: "Sudado de filete", precio: 30 },
        { nombre: "Parihuela de filete", precio: 35 }
      ]
    },
    {
      id: "piuranos", nombre: "Platos Piuranos", corto: "Piuranos",
      platos: [
        { nombre: "Seco de cabrito", precio: 35,
          destacado: true, foto: "fotos/seco-cabrito.webp" },             // FOTO PENDIENTE
        { nombre: "Seco de chabelo", precio: 35 },
        { nombre: "Arroz con pato", precio: 35 },
        { nombre: "Atamalado", precio: 35 },
        { nombre: "Carne aliñada", precio: 35 },
        { nombre: "Tamalitos verdes", precio: 3 }
      ]
    },
    {
      id: "especialidades", nombre: "Especialidades de la Casa", corto: "De la casa",
      platos: [
        { nombre: "Costillas de chancho con patacones", precio: 40,
          destacado: true, foto: "fotos/costillas.webp" },                // FOTO PENDIENTE
        { nombre: "Cachema encebollada", precio: 35 },
        { nombre: "Majado de yuca con costillas de chancho", precio: 40 },
        { nombre: "Caballas pasadas por agua", precio: 35 },
        { nombre: "Caballas jaladas con limón y ají", precio: 35 }
      ]
    },
    {
      id: "trios", nombre: "Tríos y Dúos", corto: "Tríos y dúos", tipo: "combo",
      platos: [
        { nombre: "Trío #1", precio: 35, incluye: ["Arroz con mariscos", "Ceviche de pescado", "Chicharrón de pescado"] },
        { nombre: "Trío #2", precio: 35, incluye: ["Chaufa de mariscos", "Ceviche de pescado", "Chicharrón de pota"] },
        { nombre: "Trío #3", precio: 35, incluye: ["Ceviche de pescado", "Leche de tigre", "Chicharrón de pescado"] },
        { nombre: "Trío #4", precio: 40, incluye: ["Ceviche de caballa", "Arroz con mariscos", "Causa de pescado"] },
        { nombre: "Dúo #1", precio: 35, incluye: ["Arroz con mariscos", "Ceviche de pescado"] },
        { nombre: "Dúo #2", precio: 35, incluye: ["Arroz chaufa de mariscos", "Ceviche de pescado"] },
        { nombre: "Dúo #3", precio: 35, incluye: ["Ceviche de pescado", "Chicharrón de pescado"] }
      ]
    },
    {
      id: "rondas", nombre: "Rondas", corto: "Rondas", tipo: "combo",
      nota: "Ideales para compartir",
      platos: [
        { nombre: "Ronda Marina", precio: 70, foto: "fotos/ronda-marina.webp",  // FOTO PENDIENTE
          incluye: ["Ceviche", "Chaufa de mariscos", "Arroz con mariscos", "Causa", "Chicharrón de pescado"] },
        { nombre: "Ronda #1 \"La Encantada\"", precio: 75, etiqueta: "Especial",
          incluye: ["Seco de chabelo", "Majado de yuca", "Tamalitos verdes", "Carne aliñada"] },
        { nombre: "Ronda #2 \"Huarique Piurano\"", precio: 80,
          incluye: ["Seco de chabelo", "Majado de yuca", "Tamalitos verdes", "Carne aliñada", "Ceviche de caballa"] },
        { nombre: "Ronda #3 \"Sport Liberal\"", precio: 80,
          incluye: ["Arroz con pato", "Arroz con mariscos", "Carne aliñada", "Ceviche de caballa"] },
        { nombre: "Ronda #4 \"Mar y Tierra\"", precio: 85,
          incluye: ["Arroz con mariscos", "Chicharrón de pescado", "Seco de chabelo", "Costillas de chancho", "Ceviche de caballa"] }
      ]
    },
    {
      id: "combos", nombre: "Combos y Promociones", corto: "Combos", tipo: "combo",
      platos: [
        { nombre: "Combo Cevichero", precio: 100, incluye: ["Ceviche de conchas negras", "Ceviche mixto", "Ceviche de filete", "Ceviche de caballa"] },
        { nombre: "Combo Norteño", precio: 100, incluye: ["Arroz con pato", "Seco de cabrito", "Seco de chabelo", "Ceviche de caballa"] },
        { nombre: "Combo Marino", precio: 100, incluye: ["Arroz con mariscos", "Chaufa de mariscos", "Chicharrón de pescado", "Ceviche de pescado"] }
      ]
    },
    {
      id: "porciones", nombre: "Porciones", corto: "Porciones",
      platos: [
        { nombre: "Arroz", precio: 5 },
        { nombre: "Sarandajas", precio: 5 },
        { nombre: "Frijol de palo", precio: 5 },
        { nombre: "Salsa criolla", precio: 5 },
        { nombre: "Yuca", precio: 5 },
        { nombre: "Camote", precio: 5 },
        { nombre: "Choclo", precio: 5 }
      ]
    },
    {
      id: "bebidas", nombre: "Bebidas", corto: "Bebidas",
      platos: [
        { nombre: "Chicha de jora", precio: 10 },
        { nombre: "Clarito helado", precio: 10 },
        { nombre: "Gaseosa 1.5 L", precio: 12 },
        { nombre: "Gaseosa 1 L", precio: 10 },
        { nombre: "Gaseosa 600 ml", precio: 4 },
        { nombre: "Gaseosa gordita", precio: 5 },
        { nombre: "Agua mineral", precio: 3 },
        { nombre: "Cerveza Pilsen", precio: 10 },
        { nombre: "Cerveza Trigo", precio: 10 },
        { nombre: "Cerveza Cristal", precio: 10 },
        { nombre: "Cerveza Negra", precio: 12 }
      ]
    }
  ]
};
