// 1. Menu: tandai halaman aktif + tombol hamburger di HP
var halaman = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.main-nav a').forEach(function (a) {
    if (a.getAttribute('href') === halaman) a.classList.add('active');
});
document.getElementById('menu-btn').onclick = function () {
    document.getElementById('main-nav').classList.toggle('open');
};

// 2. Tombol kembali ke atas
var btnAtas = document.createElement('button');
btnAtas.id = 'btn-atas';
btnAtas.textContent = '↑';
document.body.appendChild(btnAtas);
window.onscroll = function () {
    btnAtas.style.display = window.scrollY > 300 ? 'block' : 'none';
};
btnAtas.onclick = function () { window.scrollTo({ top: 0, behavior: 'smooth' }); };

// 3. Beranda: salam sesuai jam
var salam = document.getElementById('salam');
if (salam) {
    var jam = new Date().getHours();
    var s = 'Selamat malam';
    if (jam >= 4 && jam < 11) s = 'Selamat pagi';
    else if (jam >= 11 && jam < 15) s = 'Selamat siang';
    else if (jam >= 15 && jam < 18) s = 'Selamat sore';
    salam.textContent = s + ', selamat datang di Griya Batik';
}

// 4. Produk: filter kategori + pencarian
var grid = document.getElementById('grid');
if (grid) {
    var kartu = grid.querySelectorAll('.card');
    var kategori = 'semua';
    var cari = document.getElementById('cari');

    function tampilkan() {
        var kata = cari.value.toLowerCase().trim();
        var jumlah = 0;
        kartu.forEach(function (k) {
            var cocokKategori = kategori === 'semua' || k.dataset.kategori === kategori;
            var cocokNama = k.dataset.nama.indexOf(kata) !== -1;
            var tampil = cocokKategori && cocokNama;
            k.style.display = tampil ? '' : 'none';
            if (tampil) jumlah++;
        });
        document.getElementById('jumlah').textContent = 'Menampilkan ' + jumlah + ' produk';
        document.getElementById('kosong').hidden = jumlah !== 0;
    }

    document.querySelectorAll('.chip').forEach(function (chip) {
        chip.onclick = function () {
            document.querySelectorAll('.chip').forEach(function (c) { c.classList.remove('active'); });
            chip.classList.add('active');
            kategori = chip.dataset.filter;
            tampilkan();
        };
    });
    cari.oninput = tampilkan;

    // kategori dari link di Beranda (produk.html?kategori=pria)
    var dariUrl = new URLSearchParams(location.search).get('kategori');
    if (dariUrl) {
        var chipTujuan = document.querySelector('.chip[data-filter="' + dariUrl + '"]');
        if (chipTujuan) chipTujuan.click();
    }
    tampilkan();
}

// 6. Kontak: status buka/tutup (08.00 - 20.00 WIB)
var statusToko = document.getElementById('status');
if (statusToko) {
    var jamWIB = (new Date().getUTCHours() + 7) % 24;
    var buka = jamWIB >= 8 && jamWIB < 20;
    statusToko.textContent = buka ? 'Buka sekarang' : 'Tutup';
    statusToko.className = 'badge ' + (buka ? 'buka' : 'tutup');
}

// 7. Kontak: tampilkan produk yang dipilih dari tombol "Beli Sekarang"
var pesan = document.getElementById('pesan-beli');
var produk = new URLSearchParams(location.search).get('produk');
if (pesan && produk) {
    pesan.textContent = 'Kamu tertarik pada: ' + produk + '. Hubungi kami lewat kontak di bawah untuk memesan.';
    pesan.hidden = false;
}
