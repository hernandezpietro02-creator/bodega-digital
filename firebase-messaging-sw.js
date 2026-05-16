// ============================================================
// firebase-messaging-sw.js
// Debe estar en la RAÍZ del repo (mismo nivel que index.html)
// ============================================================

importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBHlpEb3YQ7S72XF4sElaTwcYlylv_bkAM",
  authDomain: "bodega-digital-a395d.firebaseapp.com",
  projectId: "bodega-digital-a395d",
  storageBucket: "bodega-digital-a395d.firebasestorage.app",
  messagingSenderId: "859301047460",
  appId: "1:859301047460:web:54d13e9a7f3ccaa274ca31"
});

const messaging = firebase.messaging();

// Notificación cuando la app está en SEGUNDO PLANO o CERRADA
messaging.onBackgroundMessage(payload => {
  const { title, body } = payload.notification || {};

  // ✅ FIX: No usamos una ruta de imagen — usamos un PNG mínimo en base64
  // Esto evita que la notificación se descarte silenciosamente por ícono no encontrado
  const ICON_BASE64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMAAAADACAYAAABS3GwHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAF8WlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNy4yLWMwMDAgNzkuMWI2NWE3OWI0LCAyMDIyLzA2LzEzLTIyOjAxOjAxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgMjMuNCAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo0NzBiOGRiMC01ZTRjLTQxNzMtYjM2Mi1lNTZjMGE5MWZkYjgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NDcwYjhkYjAtNWU0Yy00MTczLWIzNjItZTU2YzBhOTFmZGI4Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NDcwYjhkYjAtNWU0Yy00MTczLWIzNjItZTU2YzBhOTFmZGI4IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjQ3MGI4ZGIwLTVlNGMtNDE3My1iMzYyLWU1NmMwYTkxZmRiOCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PsvJiyQAAANUSURBVHic7d0xbsJAEEDRNSIFBQUFBQUFBe3/EkpKSgoKCgoKCgoKCgoKCgoKCgoKCgoKCi';

  self.registration.showNotification(title || '🛒 Nuevo pedido', {
    body: body || 'Tienes un nuevo pedido en tu bodega.',
    icon: ICON_BASE64,
    badge: ICON_BASE64,
    tag: 'nuevo-pedido',
    renotify: true,
    requireInteraction: true,
    data: payload.data || {}
  });
});

// Al tocar la notificación → abre o enfoca index.html
self.addEventListener('notificationclick', event => {
  event.notification.close();

  // ✅ FIX: construimos la URL basándonos en la ubicación real del SW
  // así funciona tanto en /bodega-digital/ como en cualquier otra ruta
  const base = self.location.href.replace('firebase-messaging-sw.js', '');
  const url = base + 'index.html';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
      const existing = list.find(c => c.url.includes('index.html'));
      if (existing) return existing.focus();
      return clients.openWindow(url);
    })
  );
});
