// ============================================================
// firebase-messaging-sw.js
// Coloca este archivo en la RAÍZ de tu repositorio GitHub Pages
// (al mismo nivel que index.html, cliente.html, admin.html)
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
  const { title, body, icon } = payload.notification || {};
  self.registration.showNotification(title || '🛒 Nuevo pedido', {
    body: body || 'Tienes un nuevo pedido en tu bodega.',
    icon: icon || '/bodega-digital/icon-192.png',
    badge: '/bodega-digital/icon-192.png',
    tag: 'nuevo-pedido',          // agrupa notificaciones del mismo tipo
    renotify: true,               // vibra aunque ya haya una notificación
    requireInteraction: true,     // no desaparece hasta que el usuario la toca
    data: payload.data || {}
  });
});

// Al tocar la notificación → abre o enfoca la pestaña de index.html
self.addEventListener('notificationclick', event => {
  event.notification.close();
  const url = self.location.origin + '/bodega-digital/index.html';
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
      const existing = list.find(c => c.url.includes('index.html'));
      if (existing) return existing.focus();
      return clients.openWindow(url);
    })
  );
});
