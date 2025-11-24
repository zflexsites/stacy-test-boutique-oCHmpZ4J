// ===================================================================
//  SERVICE WORKER Z-FLEX (V2.1 - GRADE PRODUCTION)
// ===================================================================

const CACHE_NAME = "zflex-cache-v2.1"; // Incrémenter la version pour forcer la mise à jour
const OFFLINE_URL = "offline.html";

// Les assets critiques pour que l'app fonctionne hors ligne.
const CORE_ASSETS = [
  OFFLINE_URL,
  "/css/main.css",
  "/js/app.js",
  "/manifest.json", // Essentiel pour l'expérience PWA
  // On pourrait ajouter ici le logo principal ou des icônes critiques.
];

/**
 * À l'installation, on met en cache le coeur de l'app et notre page de fallback.
 */
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[Service Worker] Mise en cache des assets de base");
      return cache.addAll(CORE_ASSETS);
    })
  );
  self.skipWaiting(); // Force le nouveau SW à devenir actif immédiatement
});

/**
 * À l'activation, on nettoie les anciens caches pour libérer de l'espace.
 */
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log(
                "[Service Worker] Nettoyage de l'ancien cache:",
                cacheName
              );
              return caches.delete(cacheName);
            }
          })
        )
      )
      .then(() => self.clients.claim()) // Prend le contrôle de toutes les pages ouvertes
  );
});

/**
 * À chaque requête, on applique une stratégie "Cache, falling back to Network".
 */
self.addEventListener("fetch", (event) => {
  // On ignore les appels API, ils ne doivent JAMAIS être mis en cache.
  if (event.request.url.includes("/api/")) {
    return;
  }

  // On applique la stratégie pour toutes les autres requêtes (HTML, CSS, JS, images, etc.)
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Si on a la réponse en cache, on la sert immédiatement. C'est la priorité.
      if (cachedResponse) {
        return cachedResponse;
      }

      // Si la ressource n'est pas en cache, on va la chercher sur le réseau.
      return fetch(event.request).catch(() => {
        // Si le réseau est mort ET que la requête est une navigation vers une nouvelle page...
        if (event.request.mode === "navigate") {
          // ... on sert notre page offline depuis le cache. C'est notre bunker.
          console.log(
            "[Service Worker] Réseau indisponible, service de la page offline."
          );
          return caches.match(OFFLINE_URL);
        }
        // Pour les autres assets (images, fonts, etc.), si ça plante et que ce n'est pas en cache, ça plantera.
        // C'est un comportement acceptable pour les ressources non critiques.
      });
    })
  );
});
