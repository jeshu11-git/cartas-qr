/* =========================================================
   PLANTILLA DE CARTA DIGITAL — Sistemas Pimpo
   Lee los datos de window.CARTA (archivo datos.js de cada
   cliente) y arma toda la carta. No hace falta tocar este
   archivo para un cliente nuevo.
   ========================================================= */
(function () {
  var C = window.CARTA;
  if (!C) { document.body.innerHTML = '<p style="padding:20px">Falta el archivo datos.js</p>'; return; }

  var MONEDA = C.moneda || 'S/';
  var DIAS = ['dom', 'lun', 'mar', 'mie', 'jue', 'vie', 'sab'];
  var NOMBRE_DIA = { lun: 'Lunes', mar: 'Martes', mie: 'Miércoles', jue: 'Jueves', vie: 'Viernes', sab: 'Sábado', dom: 'Domingo' };

  // ---------- utilidades ----------
  function esc(t) {
    return String(t == null ? '' : t).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function precio(p) { return MONEDA + ' ' + Number(p).toFixed(2); }
  function normal(t) { return String(t).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); }

  var ICONO_PLATO = '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="24" cy="26" r="14"/><circle cx="24" cy="26" r="8"/><path d="M8 10v10M5 10v6a3 3 0 0 0 6 0v-6M40 10c-3 2-4 6-4 10h4V10zM40 20v18"/></svg>';

  // Imagen con espacio de reserva: si la foto todavía no existe, se ve un recuadro bonito
  function foto(src, alt, texto) {
    var ph = '<div class="ph">' + ICONO_PLATO + '<span>' + esc(texto || 'Foto pronto') + '</span></div>';
    if (!src) return ph;
    return '<img src="' + esc(src) + '" alt="' + esc(alt) + '" loading="lazy" decoding="async" ' +
           'onerror="this.outerHTML=this.dataset.ph" data-ph="' + esc(ph) + '">';
  }

  function badges(p) {
    var h = '';
    if (p.etiqueta) h += ' <span class="badge">' + esc(p.etiqueta) + '</span>';
    if (p.nuevo) h += ' <span class="badge nuevo">Nuevo</span>';
    if (p.agotado && !(C.pedidos && C.pedidos.activo)) h += ' <span class="badge gris">Agotado</span>';
    return h;
  }

  // ---------- colores del cliente ----------
  var T = C.tema || {};
  var mapa = { principal: '--principal', principalOscuro: '--principal-osc', secundario: '--secundario',
               accion: '--accion', destacado: '--destacado', promo: '--promo', fondo: '--fondo', textoSuave: '--suave' };
  Object.keys(mapa).forEach(function (k) { if (T[k]) document.documentElement.style.setProperty(mapa[k], T[k]); });
  if (T.principal) {
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', T.principal);
  }

  var N = C.negocio || {};
  document.title = 'Carta — ' + (N.nombre || '') + (N.subtitulo ? ' ' + N.subtitulo : '');

  // ---------- horario y estado ----------
  var ahora = new Date();
  var hoyClave = DIAS[ahora.getDay()];
  function aMin(hhmm) { var p = hhmm.split(':'); return (+p[0]) * 60 + (+p[1]); }
  function estadoHTML() {
    var H = C.horario;
    if (!H) return '';
    var t = H[hoyClave];
    var min = ahora.getHours() * 60 + ahora.getMinutes();
    if (!t) return '<span class="estado cerrado">Hoy cerrado</span>';
    var abre = aMin(t[0]), cierra = aMin(t[1]);
    if (cierra <= abre) cierra += 24 * 60;
    if (min >= abre && min < cierra) return '<span class="estado abierto">Abierto ahora · hasta ' + esc(t[1]) + '</span>';
    if (min < abre) return '<span class="estado cerrado">Cerrado · abre a las ' + esc(t[0]) + '</span>';
    return '<span class="estado cerrado">Cerrado por hoy</span>';
  }

  // ---------- armar HTML ----------
  var cats = C.categorias || [];
  var PED = C.pedidos && C.pedidos.activo ? C.pedidos : null;
  var ITEMS = {};
  cats.forEach(function (c) {
    (c.platos || []).forEach(function (p, i) {
      p._k = c.id + '-' + i;
      ITEMS[p._k] = { nombre: (p.dia ? NOMBRE_DIA[p.dia] + ' · ' : '') + p.nombre, precio: Number(p.precio), opciones: p.opciones || null };
    });
  });
  function ctrl(p) {
    if (!PED) return '';
    if (p.agotado) return '<span class="agotado-txt">Agotado</span>';
    return '<span class="ctrl" data-k="' + esc(p._k) + '"></span>';
  }
  var h = '';

  // Portada
  h += '<header class="portada">';
  if (N.portada) h += '<img class="fondo-img" src="' + esc(N.portada) + '" alt="" onerror="this.remove()">';
  h += '<div class="portada-info">';
  h += '<div class="logo">' + foto(N.logo, 'Logo ' + N.nombre, 'Logo') + '</div>';
  h += '<div>';
  if (N.etiqueta) h += '<span class="etiqueta-sup">' + esc(N.etiqueta) + '</span>';
  h += '<h1 class="serif">' + esc(N.nombre) + '</h1>';
  if (N.subtitulo) h += '<p class="sub serif">' + esc(N.subtitulo) + '</p>';
  if (N.lema) h += '<p class="lema">' + esc(N.lema) + '</p>';
  h += estadoHTML();
  h += '</div></div></header>';

  // Barra fija: buscador + chips
  var hayDestacados = cats.some(function (c) { return (c.platos || []).some(function (p) { return p.destacado; }); });
  h += '<div class="barra">';
  h += '<label class="buscador"><svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg>' +
       '<input id="buscar" type="search" placeholder="Buscar un plato o bebida…" autocomplete="off">' +
       '<button class="limpiar" type="button" aria-label="Borrar">✕</button></label>';
  h += '<nav class="chips">';
  if (hayDestacados) h += '<a href="#destacados">Lo más pedido</a>';
  cats.forEach(function (c) { h += '<a href="#' + esc(c.id) + '">' + esc(c.corto || c.nombre) + '</a>'; });
  h += '</nav></div>';

  h += '<main>';

  // Destacados
  if (hayDestacados) {
    h += '<section class="bloque" id="destacados"><h2 class="serif">Lo más pedido</h2><div class="carrusel">';
    cats.forEach(function (c) {
      (c.platos || []).forEach(function (p) {
        if (!p.destacado) return;
        h += '<article class="destacado" data-buscar="' + esc(normal(p.nombre + ' ' + (p.desc || ''))) + '">' +
             '<div class="foto">' + foto(p.foto, p.nombre) + (p.etiqueta ? '<span class="badge">' + esc(p.etiqueta) + '</span>' : '') + '</div>' +
             '<div class="cuerpo"><div class="nombre">' + esc(p.nombre) + '</div>' +
             (p.desc ? '<div class="desc">' + esc(p.desc) + '</div>' : '') +
             '<div class="fila"><span class="precio">' + precio(p.precio) + '</span>' + ctrl(p) + '</div></div></article>';
      });
    });
    h += '</div></section>';
  }

  // Categorías
  cats.forEach(function (c) {
    h += '<section class="bloque" id="' + esc(c.id) + '"><h2 class="serif">' + esc(c.nombre) + '</h2>';
    if (c.nota) h += '<p class="nota">' + esc(c.nota) + '</p>';
    h += '<div class="tarjeta">';
    (c.platos || []).forEach(function (p) {
      var busca = esc(normal(p.nombre + ' ' + (p.desc || '') + ' ' + (p.incluye || []).join(' ')));
      if (c.tipo === 'combo') {
        h += '<div class="combo' + (p.agotado ? ' agotado' : '') + '" data-buscar="' + busca + '"><div class="cabecera">' +
             '<span class="nombre">' + esc(p.nombre) + badges(p) + '</span><div class="lado"><span class="precio">' + precio(p.precio) + '</span>' + ctrl(p) + '</div></div>';
        if (p.foto) h += '<div class="foto-combo">' + foto(p.foto, p.nombre) + '</div>';
        if (p.incluye) h += '<ul class="incluye">' + p.incluye.map(function (i) { return '<li>' + esc(i) + '</li>'; }).join('') + '</ul>';
        h += '</div>';
      } else {
        var esHoy = p.dia && p.dia === hoyClave;
        var nombre = (p.dia ? NOMBRE_DIA[p.dia] + ' · ' : '') + p.nombre;
        h += '<div class="plato' + (esHoy ? ' hoy' : '') + (p.agotado ? ' agotado' : '') + '" data-buscar="' + busca + '">';
        if (p.foto) h += '<div class="miniatura">' + foto(p.foto, p.nombre) + '</div>';
        h += '<div class="info"><div class="nombre">' + esc(nombre) + badges(p) + (esHoy ? ' <span class="badge hoy">Hoy</span>' : '') + '</div>';
        if (p.desc) h += '<div class="desc">' + esc(p.desc) + '</div>';
        if (p.opciones) h += '<div class="opciones">' + p.opciones.map(function (o) { return '<span>' + esc(o) + '</span>'; }).join('') + '</div>';
        h += '</div><div class="lado"><span class="precio">' + precio(p.precio) + '</span>' + ctrl(p) + '</div></div>';
      }
    });
    h += '</div></section>';
  });

  h += '<p class="vacio" id="vacio">No encontramos ese plato. Prueba con otra palabra.</p>';
  h += '</main>';

  // Pie
  var K = C.contacto || {};
  h += '<footer><h2 class="serif">Consultas y Reservaciones</h2><div class="contactos">';
  (K.telefonos || []).forEach(function (t) {
    var bonito = String(t).replace(/(\d{3})(\d{3})(\d{3})/, '$1 $2 $3');
    h += '<a href="tel:' + esc(t) + '">Llamar ' + esc(bonito) + '</a>';
  });
  if (K.mapa) h += '<a href="' + esc(K.mapa) + '" target="_blank" rel="noopener">Cómo llegar</a>';
  if (K.instagram) h += '<a href="' + esc(K.instagram) + '" target="_blank" rel="noopener">Instagram</a>';
  if (K.facebook) h += '<a href="' + esc(K.facebook) + '" target="_blank" rel="noopener">Facebook</a>';
  if (K.tiktok) h += '<a href="' + esc(K.tiktok) + '" target="_blank" rel="noopener">TikTok</a>';
  h += '</div>';
  if (K.direccion) h += '<p class="pie-dato">' + esc(K.direccion) + '</p>';
  if (C.horario) {
    h += '<div class="horario">';
    ['lun', 'mar', 'mie', 'jue', 'vie', 'sab', 'dom'].forEach(function (d) {
      var t = C.horario[d];
      h += '<div class="' + (d === hoyClave ? 'hoy' : '') + '"><span>' + NOMBRE_DIA[d] + '</span><span>' + (t ? esc(t[0]) + ' – ' + esc(t[1]) : 'Cerrado') + '</span></div>';
    });
    h += '</div>';
  }
  h += '<p class="creditos">Carta digital por Sistemas Pimpo</p></footer>';

  // Botones flotantes
  if (K.whatsapp) {
    var msg = encodeURIComponent(K.mensajeWhatsapp || 'Hola, quisiera hacer una reserva');
    h += '<a class="flotante" href="https://wa.me/' + esc(K.whatsapp) + '?text=' + msg + '" target="_blank" rel="noopener">' +
         '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 2s.8 2.3.9 2.5c.1.2 1.6 2.5 4 3.5 1.5.6 2.1.7 2.8.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3z"/></svg>' +
         esc(K.textoBoton || 'Reservar') + '</a>';
  }
  h += '<button class="arriba" type="button" aria-label="Volver arriba">↑</button>';
  if (PED) {
    h += '<button class="barra-pedido" type="button" id="verPedido"><span class="bp-cant" id="bpCant"></span>' +
         '<span>Ver mi pedido</span><span class="bp-total" id="bpTotal"></span></button>';
    h += '<div class="capa" id="capa"></div>';
    h += '<div class="hoja" id="hojaOpcion" role="dialog" aria-modal="true"><div class="hoja-asa"></div>' +
         '<h3 id="opTitulo"></h3><p class="nota">Elige una opción</p><div class="op-botones" id="opBotones"></div></div>';
    h += '<div class="hoja" id="hojaPedido" role="dialog" aria-modal="true"><div class="hoja-asa"></div>' +
         '<div class="hoja-cab"><h3>Tu pedido</h3><button class="cerrar" type="button" data-cerrar>✕</button></div>' +
         '<div id="lineas"></div>' +
         '<div class="total-fila"><span>Total</span><b id="totalPedido"></b></div>' +
         '<label class="campo">Tu nombre<input id="pNombre" type="text" autocomplete="name" placeholder="Ej. María"></label>' +
         '<div class="campo">¿Cómo lo recibes?<div class="modos" id="modos">' +
         (PED.modos || ['Recojo en el local']).map(function (m, i) {
           return '<label><input type="radio" name="modo" value="' + esc(m) + '"' + (i === 0 ? ' checked' : '') + '><span>' + esc(m) + '</span></label>';
         }).join('') + '</div></div>' +
         (PED.aviso ? '<p class="aviso">' + esc(PED.aviso) + '</p>' : '') +
         '<label class="campo">Nota (opcional)<textarea id="pNota" rows="2" placeholder="Ej. sin cebolla, paso a las 2 pm"></textarea></label>' +
         '<button class="enviar" type="button" id="enviar">Enviar pedido por WhatsApp</button>' +
         '<button class="vaciar" type="button" id="vaciar">Vaciar pedido</button></div>';
  }

  document.getElementById('app').innerHTML = h;

  // ---------- interacciones ----------
  // 1) Categoría activa al bajar
  var chips = document.querySelectorAll('.chips a');
  var barraChips = document.querySelector('.chips');
  function activar(id) {
    chips.forEach(function (c) {
      var ok = c.getAttribute('href') === '#' + id;
      c.classList.toggle('activo', ok);
      if (ok) barraChips.scrollTo({ left: c.offsetLeft - barraChips.clientWidth / 2 + c.clientWidth / 2, behavior: 'smooth' });
    });
  }
  if ('IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) activar(e.target.id); });
    }, { rootMargin: '-35% 0px -60% 0px' });
    document.querySelectorAll('main .bloque').forEach(function (s) { obs.observe(s); });
  }

  // 2) Buscador
  var input = document.getElementById('buscar');
  var caja = document.querySelector('.buscador');
  function filtrar() {
    var q = normal(input.value.trim());
    caja.classList.toggle('con-texto', q.length > 0);
    if (q) chips.forEach(function (c) { c.classList.remove('activo'); });
    var total = 0;
    document.querySelectorAll('main .bloque').forEach(function (sec) {
      var visibles = 0;
      sec.querySelectorAll('[data-buscar]').forEach(function (el) {
        var ok = !q || el.dataset.buscar.indexOf(q) !== -1;
        el.classList.toggle('oculto', !ok);
        if (ok) visibles++;
      });
      if (sec.id === 'destacados' && q) { sec.classList.add('oculto'); return; }
      sec.classList.toggle('oculto', visibles === 0);
      total += visibles;
    });
    document.getElementById('vacio').classList.toggle('ver', total === 0);
  }
  input.addEventListener('input', filtrar);
  caja.querySelector('.limpiar').addEventListener('click', function () { input.value = ''; filtrar(); input.focus(); });

  // 3) Botón volver arriba
  var arriba = document.querySelector('.arriba');
  window.addEventListener('scroll', function () { arriba.classList.toggle('ver', window.scrollY > 700); }, { passive: true });
  arriba.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });

  // 4) Pedido por WhatsApp
  if (PED) (function () {
    var CLAVE = 'pedido-' + location.pathname;
    var lineas = [];
    try { lineas = JSON.parse(localStorage.getItem(CLAVE) || '[]').filter(function (l) { return ITEMS[l.k]; }); } catch (e) { lineas = []; }
    function guardar() { try { localStorage.setItem(CLAVE, JSON.stringify(lineas)); } catch (e) {} }
    function cuenta(k) { return lineas.reduce(function (s, l) { return s + (l.k === k ? l.n : 0); }, 0); }
    function total() { return lineas.reduce(function (s, l) { return s + ITEMS[l.k].precio * l.n; }, 0); }
    function unidades() { return lineas.reduce(function (s, l) { return s + l.n; }, 0); }
    function sumar(k, op, d) {
      var l = lineas.filter(function (x) { return x.k === k && x.op === op; })[0];
      if (!l) { if (d < 0) return; l = { k: k, op: op || '', n: 0 }; lineas.push(l); }
      l.n += d;
      lineas = lineas.filter(function (x) { return x.n > 0; });
      guardar(); pintar();
    }
    var capa = document.getElementById('capa');
    var hojaOp = document.getElementById('hojaOpcion');
    var hojaPed = document.getElementById('hojaPedido');
    var barraPed = document.getElementById('verPedido');
    var reservar = document.querySelector('.flotante');
    function abrir(hoja) { capa.classList.add('ver'); hoja.classList.add('ver'); document.body.classList.add('sin-scroll'); }
    function cerrar() { capa.classList.remove('ver'); hojaOp.classList.remove('ver'); hojaPed.classList.remove('ver'); document.body.classList.remove('sin-scroll'); }
    capa.addEventListener('click', cerrar);
    document.querySelectorAll('[data-cerrar]').forEach(function (b) { b.addEventListener('click', cerrar); });

    function pintar() {
      document.querySelectorAll('.ctrl').forEach(function (el) {
        var n = cuenta(el.dataset.k);
        el.innerHTML = n
          ? '<button type="button" data-acc="menos" aria-label="Quitar">−</button><b>' + n + '</b><button type="button" data-acc="mas" aria-label="Agregar">+</button>'
          : '<button type="button" class="solo" data-acc="mas" aria-label="Agregar">+</button>';
        el.classList.toggle('con', n > 0);
      });
      var u = unidades();
      barraPed.classList.toggle('ver', u > 0);
      if (reservar) reservar.classList.toggle('oculto', u > 0);
      document.getElementById('bpCant').textContent = u;
      document.getElementById('bpTotal').textContent = precio(total());
      document.getElementById('totalPedido').textContent = precio(total());
      document.getElementById('lineas').innerHTML = lineas.length ? lineas.map(function (l, i) {
        var it = ITEMS[l.k];
        return '<div class="linea"><div><div class="l-nom">' + esc(it.nombre) + '</div>' +
               (l.op ? '<div class="l-op">' + esc(l.op) + '</div>' : '') +
               '<div class="l-pre">' + precio(it.precio * l.n) + '</div></div>' +
               '<div class="ctrl con"><button type="button" data-linea="' + i + '" data-d="-1">−</button><b>' + l.n + '</b>' +
               '<button type="button" data-linea="' + i + '" data-d="1">+</button></div></div>';
      }).join('') : '<p class="nota">Aún no agregas platos.</p>';
      if (!lineas.length && hojaPed.classList.contains('ver')) cerrar();
    }

    document.addEventListener('click', function (e) {
      var b = e.target.closest('.ctrl button[data-acc]');
      if (!b) return;
      var k = b.parentNode.dataset.k, it = ITEMS[k];
      if (b.dataset.acc === 'menos') {
        var ult = lineas.filter(function (x) { return x.k === k; }).pop();
        if (ult) sumar(k, ult.op, -1);
        return;
      }
      if (it.opciones && it.opciones.length) {
        document.getElementById('opTitulo').textContent = it.nombre;
        document.getElementById('opBotones').innerHTML = it.opciones.map(function (o) {
          return '<button type="button" data-op="' + esc(o) + '">' + esc(o) + '</button>';
        }).join('');
        hojaOp.dataset.k = k;
        abrir(hojaOp);
      } else sumar(k, '', 1);
    });
    document.getElementById('opBotones').addEventListener('click', function (e) {
      var b = e.target.closest('button[data-op]');
      if (!b) return;
      sumar(hojaOp.dataset.k, b.dataset.op, 1);
      cerrar();
    });
    document.getElementById('lineas').addEventListener('click', function (e) {
      var b = e.target.closest('button[data-linea]');
      if (!b) return;
      var l = lineas[+b.dataset.linea];
      sumar(l.k, l.op, +b.dataset.d);
    });
    barraPed.addEventListener('click', function () { abrir(hojaPed); });
    document.getElementById('vaciar').addEventListener('click', function () { lineas = []; guardar(); pintar(); cerrar(); });

    document.getElementById('enviar').addEventListener('click', function () {
      var nom = document.getElementById('pNombre');
      if (!nom.value.trim()) { nom.focus(); nom.classList.add('error'); return; }
      nom.classList.remove('error');
      var modo = (document.querySelector('input[name="modo"]:checked') || {}).value || '';
      var nota = document.getElementById('pNota').value.trim();
      var txt = '*Pedido — ' + (N.nombre || '') + (N.subtitulo ? ' ' + N.subtitulo : '') + '*\n\n' +
        'Nombre: ' + nom.value.trim() + '\n' + (modo ? 'Entrega: ' + modo + '\n' : '') + '\n' +
        lineas.map(function (l) {
          var it = ITEMS[l.k];
          return '• ' + l.n + ' x ' + it.nombre + (l.op ? ' (' + l.op + ')' : '') + ' — ' + precio(it.precio * l.n);
        }).join('\n') +
        '\n\n*Total: ' + precio(total()) + '*' + (nota ? '\n\nNota: ' + nota : '');
      window.open('https://wa.me/' + (PED.whatsapp || K.whatsapp) + '?text=' + encodeURIComponent(txt), '_blank');
    });
    pintar();
  })();
})();
