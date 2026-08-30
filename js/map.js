// ==================== LEAFLET MAP INITIALIZATION ====================

function initMap() {
    const mapElement = document.getElementById('map');

    if (!mapElement) {
        console.error('Map element not found');
        return;
    }

    // Cek apakah Leaflet sudah dimuat
    if (typeof L === 'undefined') {
        console.error('Leaflet library not loaded');
        mapElement.innerHTML = '<p style="padding: 20px; text-align: center; color: #999;">Peta sedang memuat...</p>';
        setTimeout(initMap, 1000);
        return;
    }

    try {
        // Koordinat Desa Semparuk Sutera
        const desaLocation = [1.1828505, 109.0722672];

        // Buat map dengan Leaflet (zoomControl diset false agar tidak duplikat)
        const map = L.map('map', {
            center: desaLocation,
            zoom: 14,
            scrollWheelZoom: true,
            touchZoom: true,
            zoomControl: false 
        });

        // Layer 1: OpenStreetMap
        const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19,
            minZoom: 2,
            errorTileUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256"><rect fill="%23f0f0f0" width="256" height="256"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%23999" font-size="14">Tile Error</text></svg>'
        }).addTo(map);

        // Layer 2: Satelit (Menggunakan Esri World Imagery)
        const satelitLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
            maxZoom: 18,
            minZoom: 2
        });

        // Layer 3: Peta Topografi
        const topoLayer = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data: &copy; OpenStreetMap contributors, SRTM | Map style: &copy; OpenTopoMap',
            maxZoom: 17,
            minZoom: 2
        });

        // Marker untuk desa pusat (Warna Pin & Judul Diubah ke Oranye)
        const desaMarker = L.marker(desaLocation, {
            icon: L.icon({
                // ganti fill="%232c5f2d" menjadi fill="%23ff6b00" (%23 adalah kode URL-encode untuk tanda #)
                iconUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40"><circle cx="20" cy="20" r="18" fill="%23ff6b00" stroke="white" stroke-width="2"/><text x="20" y="25" font-size="24" text-anchor="middle" fill="white" font-weight="bold">◎</text></svg>',
                iconSize: [40, 40],
                iconAnchor: [20, 40],
                popupAnchor: [0, -40]
            })
        }).addTo(map).bindPopup(`
            <div style="color: #333; font-family: Arial; font-size: 12px;">
                <!-- ganti color: #2c5f2d; menjadi color: #ff6b00; -->
                <h3 style="margin: 0 0 10px 0; color: #ff6b00; font-size: 16px;">📍 Desa Semparuk Sutera</h3>
                <p style="margin: 5px 0;"><strong>Kecamatan:</strong> Semparuk</p>
                <p style="margin: 5px 0;"><strong>Kabupaten:</strong> Sambas</p>
                <p style="margin: 5px 0;"><strong>Provinsi:</strong> Kalimantan Barat</p>
                <p style="margin: 5px 0;"><strong>Negara:</strong> Indonesia</p>
                <p style="margin: 8px 0 0 0; border-top: 1px solid #ccc; padding-top: 8px;">
                    <strong>Lat:</strong> 1.1829° | <strong>Lon:</strong> 109.0728°
                </p>
            </div>
        `);

        // Buka popup otomatis
        desaMarker.openPopup();

        // Tambahkan kontrol layer
        const baseLayers = {
            "🗺️ Peta Jalan": osmLayer,
            "🏔️ Topografi": topoLayer,
            "🛰️ Satelit": satelitLayer
        };

        L.control.layers(baseLayers, null, {
            position: 'topright',
            collapsed: true
        }).addTo(map);

        // Tambahkan kontrol zoom
        L.control.zoom({
            position: 'bottomright'
        }).addTo(map);

        // FIX TILE GLITCH: Rekalkulasi ukuran elemen peta setelah render
        setTimeout(() => {
            map.invalidateSize();
        }, 300);

        console.log('Map initialized successfully at', desaLocation);

    } catch (error) {
        console.error('Error initializing map:', error);
        mapElement.innerHTML = '<p style="padding: 20px; text-align: center; color: #d32f2f;">Gagal memuat peta. Silakan refresh halaman.</p>';
    }
}

// Panggil initMap saat window load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMap);
} else {
    initMap();
}