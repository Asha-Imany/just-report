const KUNCI_STORAGE = "E_REPORT_DATA";
const HALAMAN_DASHBOARD = "dashboard.html";
let daftarLaporan = [];

function muatData() {
    const dataTersimpan = localStorage.getItem(KUNCI_STORAGE);
    if (dataTersimpan) {
        daftarLaporan = JSON.parse(dataTersimpan);
    }
    else {
        daftarLaporan = typeof dataAwalLaporan !== 'undefined' ? [...dataAwalLaporan] : [];
        simpanData();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    muatData();
    tampilkanDataTabel();
})

function tampilkanDataTabel() {
    const tabelBody = document.getElementById('reports-table-body');

    if (!tabelBody) {
        return;
    }

    tabelBody.innerHTML = '';

    daftarLaporan.forEach((laporan) => {
        tabelBody.appendChild(buatBarisLaporan(laporan));
    })
}

function buatBarisLaporan(laporan) {
    const baris = document.createElement('tr');

    baris.innerHTML = `
    <td class="cell-reporter">
     <span class="name">${laporan.pelapor}</span>
     </td>
    <td class="cell-category">
     <span class="category">${laporan.kategori}</span>
     </td>
    <td class="cell-desc">
     <span class="desc-content">${laporan.deskripsi}</span>
     </td>
    <td class="cell-status">
     <span class="status-pill badge-wait">${laporan.status || "Menunggu"}</span>
     </td>
    `
    return baris;
}

function handleFormSubmit(event) {

    event.preventDefault();
    const form = event.target;
    const namaPelapor = form.reporter.value.trim();
    const kategori = form.category.value;
    const deskripsi = form.description.value.trim();

    if (!namaPelapor || !kategori || !deskripsi) {
        Swal.fire({
            icon: "warning",
            title: "Oops...",
            text: "Semua input harus diisi ya :D",
            
        });
        return;
    }

    const laporanBaru = {
        id: `rep-${Date.now()}`,
        pelapor: namaPelapor,
        kategori: kategori,
        deskripsi: deskripsi,
        status: "Menunggu",
    };

    daftarLaporan.unshift(laporanBaru);
    simpanData();
    form.reset();

    Swal.fire({
        icon: "success",
        title: "Laporan terkirim!",
        text: "Laporan kamu berstatus Menunggu.",
        timer: 1500,
        showConfirmButton: false,
    }).then(() => {
        window.location.href = HALAMAN_DASHBOARD;
    });
}

function simpanData() {
    localStorage.setItem(KUNCI_STORAGE, JSON.stringify(daftarLaporan));
}