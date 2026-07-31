// Hub Service Worker — BẢN TỰ HUỶ (Sếp 2026-07-30)
// SW cũ cache icon từ GitHub. Nó sống dai ở origin kể cả khi đóng tab, nên khi
// hub gặp sự cố thì không loại trừ được vai trò của nó từ xa (máy test luôn chạy
// context sạch, không tái hiện được). Lợi ích cache icon nhỏ hơn nhiều so với
// rủi ro phục vụ nội dung cũ, nên bản này dọn sạch cache và tự gỡ đăng ký.
self.addEventListener('install', (e) => self.skipWaiting());
self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) await caches.delete(k);
    await self.registration.unregister();
    for (const c of await self.clients.matchAll({ type: 'window' })) c.navigate(c.url);
  })());
});
// Không chặn fetch nữa: mọi request đi thẳng ra mạng.
