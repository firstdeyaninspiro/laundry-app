function setEyeCatchingTitle() {
    const title = document.querySelector('h1');
    title.style.color = "#fff"; // Mengatur warna teks menjadi putih
    title.style.textShadow = "2px 2px 4px rgba(0, 0, 0, 0.5)"; // Menambahkan bayangan teks
    title.style.padding = "10px 20px"; // Menambahkan padding untuk judul teks
    title.style.backgroundColor = "rgba(0, 0, 0, 0.5)"; // Menambahkan kotak belakang dengan warna hitam transparan
    title.style.borderRadius = "8px"; // Mengatur sudut kotak belakang

    const titles = document.querySelectorAll('h2, h3, h4'); // Pilih semua elemen h2, h3, dan h4

    titles.forEach(title => {
        title.style.color = "#fff"; // Mengatur warna teks menjadi putih
        title.style.textShadow = "2px 2px 4px rgba(0, 0, 0, 0.5)"; // Menambahkan bayangan teks
        title.style.padding = "10px 20px"; // Menambahkan padding untuk judul teks
        title.style.backgroundColor = "rgba(0, 0, 0, 0.5)"; // Menambahkan kotak belakang dengan warna hitam transparan
        title.style.borderRadius = "8px"; // Mengatur sudut kotak belakang
        title.style.display = "inline-block"; // Membuat judul teks menjadi inline block agar kotak belakangnya mengikuti panjang teks
    });
}

function setStylishBackground() {
    document.body.style.backgroundImage = "url('img/bg.jpg')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundBlendMode = "darken";
}
function loadBookings(filteredBookings) {
    const bookingsContainer = document.getElementById('bookings');
    let bookings = localStorage.getItem('bookings');
    bookings = bookings ? JSON.parse(bookings) : [];

    bookingsContainer.innerHTML = '';

    const bookingsToDisplay = filteredBookings || bookings;

    // Membuat card atau blok untuk form filter
    const filterCard = document.createElement('div');
    filterCard.className = 'card mb-3';
    const filterCardBody = document.createElement('div');
    filterCardBody.className = 'card-body';

    // Membuat form filter
    const filterForm = document.createElement('form');
    filterForm.className = 'form-inline';

    // Menambahkan elemen form filter
    filterForm.innerHTML = `
            <div class="form-group mr-2" >
            <input type="text" class="form-control" id="filterName" placeholder="Nama">
        </div>
        <div class="form-group mr-2" >
            <input type="text" class="form-control" id="filterKodeBooking" placeholder="Kode Pesanan">
        </div>
        <div class="form-group mr-2" >
            <select class="form-control" id="filterStatus" style="margin-right: 10px;">
                <option value="">Semua Status</option>
                <option value="Belum Disetujui">Belum Disetujui</option>
                <option value="Disetujui">Disetujui</option>
                <option value="Sedang Diproses">Sedang Diproses</option>
                <option value="Selesai">Selesai</option>
                <option value="Dibatalkan">Dibatalkan</option>
            </select>
        </div>

        <button type="button" class="btn btn-primary" onclick="filterBookings()">Filter</button>
        <button type="button" class="btn btn-secondary ml-2" onclick="resetFilter()">Reset</button>
    `;

    // Menambahkan form filter ke dalam card atau blok
    filterCardBody.appendChild(filterForm);
    filterCard.appendChild(filterCardBody);

    // Menambahkan card atau blok filter ke dalam container daftar pesanan
    bookingsContainer.appendChild(filterCard);

    // Memproses dan menampilkan daftar pesanan
    bookingsToDisplay.forEach((booking, index) => {
        const bookingDiv = document.createElement('div');
        bookingDiv.className = 'booking';
        bookingDiv.innerHTML = `
            <div class="card mb-3 ">
                <div class="card-body">
                    <strong>Nama:</strong> ${booking.name}<br>
                    <strong>Paket:</strong> ${booking.package}<br>
                    <strong>Kode Pesanan:</strong> ${booking.kodebooking ? booking.kodebooking : 'Belum Disetujui'}<br>
                    <strong>Status:</strong> ${booking.status}<br>
                    <strong>Jadwal Penyerahan Cucian:</strong> ${booking.date}<br>
                    <button class="btn btn-info btn-sm mt-2" onclick="showBookingDetail(${booking.originalIndex})">Detail</button>
                </div>
            </div>
        `;
        bookingsContainer.appendChild(bookingDiv);
    });

    // Menyesuaikan lebar button Filter dan Reset
    const filterButton = filterCardBody.querySelector('.btn-primary');
    const resetButton = filterCardBody.querySelector('.btn-secondary');

    // Set lebar button
    filterButton.style.width = '80px'; // Ubah nilai '100px' sesuai kebutuhan
    resetButton.style.width = '80px'; // Ubah nilai '100px' sesuai kebutuhan

    setEyeCatchingTitle();
    setStylishBackground();
}


function filterBookings() {
    const filterName = document.getElementById('filterName').value.toLowerCase();
    const filterKodeBooking = document.getElementById('filterKodeBooking').value.toLowerCase();
    const filterStatus = document.getElementById('filterStatus').value;

    let bookings = localStorage.getItem('bookings');
    bookings = bookings ? JSON.parse(bookings) : [];

    if (!filterName && !filterKodeBooking && !filterStatus) {
        loadBookings();
        return;
    }

    const filteredBookings = bookings.filter(booking => {
        const nameMatch = booking.name.toLowerCase().includes(filterName);
        const kodeBookingMatch = booking.kodebooking ? booking.kodebooking.toLowerCase().includes(filterKodeBooking) : true;
        const statusMatch = filterStatus ? booking.status === filterStatus : true;

        return nameMatch && kodeBookingMatch && statusMatch;
    });

    loadBookings(filteredBookings);
}

function resetFilter() {
    document.getElementById('filterName').value = '';
    document.getElementById('filterKodeBooking').value = '';
    document.getElementById('filterStatus').value = '';
    loadBookings();
}

function showBookingDetail(originalIndex) {
    const bookingDetailPage = document.getElementById('booking-detail-page');
    const bookingListPage = document.getElementById('booking-list-page');
    const bookingDetailContainer = document.getElementById('booking-detail');
    
    bookingListPage.style.display = 'none';
    bookingDetailPage.style.display = 'block';

    let bookings = localStorage.getItem('bookings');
    bookings = bookings ? JSON.parse(bookings) : [];
    const booking = bookings[originalIndex];

    bookingDetailContainer.innerHTML = `
        <div class="card">
            <div class="card-body">
                <strong>Nama:</strong> ${booking.name}<br>
                <strong>No. Telepon:</strong> ${booking.phone}<br>
                <strong>Paket:</strong> ${booking.package}<br>
                <strong>Harga:</strong> Rp${booking.price}<br>
                <strong>Jadwal Penyerahan Cucian:</strong> ${booking.date}<br>
                <strong>Estimasi Jadwal Pengambilan:</strong> ${booking.waktuPengambilan ? booking.waktuPengambilan : '-'}<br>
                <strong>Waktu Pemesanan:</strong> ${booking.waktuPemesanan ? booking.waktuPemesanan : '-'}<br>
                <strong>Status:</strong> ${booking.status}<br>
                <strong>Kode Pesanan:</strong> ${booking.kodebooking ? booking.kodebooking : 'Belum Disetujui'}<br>
                <strong>Waktu Disetujui:</strong> ${booking.waktuDisetujui ? booking.waktuDisetujui : 'Belum Disetujui'}<br>
                <strong>Waktu Konfirmasi:</strong> ${booking.waktuKonfimasi ? booking.waktuKonfimasi : 'Belum Dikonfirmasi'}<br>
                <strong>Waktu Selesai:</strong> ${booking.waktuSelesai ? booking.waktuSelesai : 'Belum Selesai'}<br>
                <strong>Waktu Dibatalkan:</strong> ${booking.waktuDibatalkan ? booking.waktuDibatalkan : '-'}<br>
                <strong>Chat Konfirmasi:</strong><br>
                <textarea id="chatKonfirmasi${originalIndex}" rows="6" class="form-control mb-2" readonly>${booking.chatKonfirmasi ? booking.chatKonfirmasi : ''}</textarea>
                <button class="btn btn-info btn-sm mb-2" onclick="copyToClipboard(${originalIndex})">Copy</button><br>
                <button class="btn btn-primary btn-sm mt-2" onclick="approveBooking(${originalIndex})">Setujui</button>
                <button class="btn btn-warning btn-sm mt-2" onclick="confirmLaundry(${originalIndex})">Konfirmasi</button>
                <button class="btn btn-success btn-sm mt-2" onclick="finishBooking(${originalIndex})">Selesaikan</button>
                <button class="btn btn-danger btn-sm mt-2" onclick="cancelBooking(${originalIndex})">Batalkan</button>
            </div>
        </div>
    `;
}

function showBookingList() {
    const bookingDetailPage = document.getElementById('booking-detail-page');
    const bookingListPage = document.getElementById('booking-list-page');

    bookingDetailPage.style.display = 'none';
    bookingListPage.style.display = 'block';
}

function approveBooking(index) {
    let bookings = localStorage.getItem('bookings');
    bookings = bookings ? JSON.parse(bookings) : [];
    bookings[index].status = 'Disetujui';
    bookings[index].kodebooking = generateKodeBooking();
    bookings[index].waktuDisetujui = new Date().toLocaleString();
    bookings[index].chatKonfirmasi = generateChatKonfirmasi(bookings[index]);
    localStorage.setItem('bookings', JSON.stringify(bookings));
    loadBookings();
    showBookingDetail(index);
}

function confirmLaundry(index) {
    let bookings = localStorage.getItem('bookings');
    bookings = bookings ? JSON.parse(bookings) : [];
    bookings[index].status = 'Sedang Diproses';
    bookings[index].waktuKonfimasi = new Date().toLocaleString();
    localStorage.setItem('bookings', JSON.stringify(bookings));
    loadBookings();
    showBookingDetail(index);
}

function finishBooking(index) {
    let bookings = localStorage.getItem('bookings');
    bookings = bookings ? JSON.parse(bookings) : [];
    bookings[index].status = 'Selesai';
    bookings[index].waktuSelesai = new Date().toLocaleString();
    localStorage.setItem('bookings', JSON.stringify(bookings));
    loadBookings();
    showBookingDetail(index);
}

function cancelBooking(index) {
    let bookings = localStorage.getItem('bookings');
    bookings = bookings ? JSON.parse(bookings) : [];
    bookings[index].status = 'Dibatalkan';
    localStorage.setItem('bookings', JSON.stringify(bookings));
    loadBookings();
    showBookingDetail(index);
}

function generateKodeBooking() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

function generateChatKonfirmasi(booking) {
    return `Rincian Pesanan Toko Laundry\n\n` +
        `Halo, ${booking.name} pesanan anda telah disetujui. Berikut data pesanan anda:\n\n` +
        `Paket: ${booking.package}\n` +
        `Kode Pesanan: ${booking.kodebooking}\n` +
        `Harga: Rp${booking.price}\n` +
        `Jadwal Penyerahan Cucian: ${booking.date}\n` +
        `Estimasi Jadwal Pengambilan: ${booking.waktuPengambilan}\n` +
        `Waktu Pemesanan: ${booking.waktuPemesanan}\n\n` +

        `Anda dapat melakukan pembayaran non-tunai melalui transfer ke rekening berikut:\n` +
        `BCA: 21345364646 a.n Toko Laundry\n` +
        `ShopeePay: 08917483358 a.n Toko Laundry\n` +
        `Gopay: 08917483358 a.n Toko Laundry\n\n` +
        `Kirimkan bukti pembayaran anda untuk proses berikutnya.\n\n` +
        `Jika anda ingin melakukan pembayaran tunai, silahkan datang ke toko sesuai jadwal diatas dengan menunjukan pesan ini.\n` +
        `Pastikan datang sesuai jadwal yang telah dipesan. Jika datang melebihi jadwal maka pesanan hangus.\n\n` +
        `Terimakasih.`;
}

function copyToClipboard(index) {
    const chatField = document.getElementById(`chatKonfirmasi${index}`);
    chatField.select();
    chatField.setSelectionRange(0, 99999); // For mobile devices
    document.execCommand('copy');
    alert('Teks telah disalin ke clipboard');
}

window.onload = function() {
    loadBookings();
};
``
