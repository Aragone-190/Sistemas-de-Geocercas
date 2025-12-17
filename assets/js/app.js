const html = document.documentElement;
const loader = document.getElementById('loader');
const contador = document.getElementById('contador');
const statusBadge = document.getElementById('statusBadge');
const resetBtn = document.getElementById('resetBtn');
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
document.getElementById('year').textContent = new Date().getFullYear();

const VERSION = '1.0.0';
document.querySelector('.app-footer .badge').textContent = `v${VERSION}`;


/* =======================
   TEMA (Bootstrap + Mapa)
======================= */
const temaGuardado = localStorage.getItem('tema') || 'light';
html.setAttribute('data-bs-theme', temaGuardado);
themeIcon.className = temaGuardado === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-fill';

/* =======================
   MAPA
======================= */
const tileLight = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap'
});

const tileDark = L.tileLayer(
  'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
  { attribution: '© OpenStreetMap © CartoDB' }
);

const tileDarkBase = L.tileLayer(
  'https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png',
  { attribution: '© OpenStreetMap © CartoDB' }
);

const tileDarkLabels = L.tileLayer(
  'https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png',
  { attribution: '© OpenStreetMap © CartoDB' }
);


const map = L.map('map', {
  layers: temaGuardado === 'dark'
    ? [tileDarkBase, tileDarkLabels]
    : [tileLight]
}).setView([25.6866, -100.3161], 12);
const capas = L.featureGroup().addTo(map);

function cambiarTemaMapa(tema) {
  map.eachLayer(l => map.removeLayer(l));

  if (tema === 'dark') {
    tileDarkBase.addTo(map);
    tileDarkLabels.addTo(map);
  } else {
    tileLight.addTo(map);
  }

  capas.addTo(map); // volver a agregar polígonos
}

themeToggle.onclick = () => {
  const nuevo = html.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-bs-theme', nuevo);
  localStorage.setItem('tema', nuevo);
  themeIcon.className = nuevo === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-fill';
  cambiarTemaMapa(nuevo);
};

/* =======================
   EXCEL
======================= */
document.getElementById('excelFile').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;

  loader.classList.remove('d-none');
  statusBadge.innerHTML = `<i class="bi bi-hourglass-split me-1"></i> Cargando`;
  statusBadge.className = 'badge bg-warning text-dark';

  const delay = new Promise(r => setTimeout(r, 1500));
  const reader = new FileReader();

  reader.onload = async (evt) => {
    const data = new Uint8Array(evt.target.result);
    const workbook = XLSX.read(data, { type: 'array' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    capas.clearLayers();
    let total = 0;

    rows.forEach((row, i) => {
      if (i === 0) return;
      const secc = row[0];
      const texto = row[1];
      if (!secc || !texto) return;

      const limpio = texto.replace(/'/g, '').trim().split(',');
      const geo = [];

      for (let j = 0; j < limpio.length - 1; j += 2) {
        const lat = parseFloat(limpio[j]);
        const lng = parseFloat(limpio[j + 1]);
        if (!isNaN(lat) && !isNaN(lng)) geo.push([lat, lng]);
      }

      if (geo.length < 3) return;
      geo.push(geo[0]);

      const color = generarColor(secc);

      L.polygon(geo, {
        color,
        fillColor: color,
        fillOpacity: html.getAttribute('data-bs-theme') === 'dark' ? 0.35 : 0.25,
        weight: 2
      }).bindPopup(`<strong>Sección:</strong> ${secc}`)
        .addTo(capas);

      total++;
    });

    await delay;

    contador.textContent = total;
    statusBadge.innerHTML = `<i class="bi bi-check-circle me-1"></i> Cargado`;
    statusBadge.className = 'badge bg-success';
    loader.classList.add('d-none');

    if (total > 0) map.fitBounds(capas.getBounds());
  };

  reader.readAsArrayBuffer(file);
});

/* =======================
   RESET
======================= */
resetBtn.onclick = () => {
  capas.clearLayers();
  contador.textContent = '0';
  statusBadge.innerHTML = `<i class="bi bi-check-circle me-1"></i> Listo`;
  statusBadge.className = 'badge bg-success';
};

/* =======================
   COLOR
======================= */
function generarColor(secc) {
  const texto = String(secc);
  let hash = 0;
  for (let i = 0; i < texto.length; i++) {
    hash = texto.charCodeAt(i) + ((hash << 5) - hash);
  }
  return `hsl(${hash % 360}, 70%, 45%)`;
}
