// ====== main.js ======
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(reg => console.log(' Service Worker registrado:', reg))
    .catch(err => console.error('Error al registrar Service Worker:', err));
}

document.addEventListener('DOMContentLoaded', () => {
  const btnPermiso = document.getElementById('btnPermiso');
  const btnProbar = document.getElementById('btnProbarNoti');

  if (btnPermiso) {
    btnPermiso.addEventListener('click', async () => {
      let permiso = await Notification.requestPermission();
      alert("Permiso de notificación: " + permiso);
    });
  }

  if (btnProbar) {
    btnProbar.addEventListener('click', () => {
      if (Notification.permission === 'granted') {
        new Notification('🌌 Wakfu', {
          body: 'El Wakfu fluye en ti. ¡Sigue explorando el Mundo de los Doce!',
          icon: 'logo.png'
        });
      } else {
        alert('Primero da permiso para las notificaciones.');
      }
    });
  }
});
