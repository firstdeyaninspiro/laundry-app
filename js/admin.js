function loadBookings(filteredBookings) {
    const bookingsContainer = document.getElementById('bookings');
    let bookings = localStorage.getItem('bookings');
    bookings = bookings ? JSON.parse(bookings) : [];

    bookingsContainer.innerHTML = '';

    const bookingsToDisplay = filteredBookings || bookings;

    bookingsToDisplay.forEach((booking, index) => {
        const bookingDiv = document.createElement('div');
        bookingDiv.className = 'booking';
        bookingDiv.innerHTML = `
            <div class="card mb-3">
                <div class="card-body">
                    <strong>Nama:</strong> ${booking.name}<br>
                    <strong>Paket:</strong> ${booking.package}<br>
                    <strong>Kode Pesanan:</strong> ${booking.kodebooking ? booking.kodebooking : 'Belum Disetujui'}<br>
                    <strong>Status:</strong> ${booking.status}<br>
                    <strong>Jadwal:</strong> ${booking.date}<br>
                    <button class="btn btn-info btn-sm mt-2" onclick="showBookingDetail(${index})">Detail</button>
                </div>
            </div>
        `;
        bookingsContainer.appendChild(bookingDiv);
    });
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

function showBookingDetail(index) {
    const bookingDetailPage = document.getElementById('booking-detail-page');
    const bookingListPage = document.getElementById('booking-list-page');
    const bookingDetailContainer = document.getElementById('booking-detail');
    
    bookingListPage.style.display = 'none';
    bookingDetailPage.style.display = 'block';

    let bookings = localStorage.getItem('bookings');
    bookings = bookings ? JSON.parse(bookings) : [];
    const booking = bookings[index];

    bookingDetailContainer.innerHTML = `
        <div class="card">
            <div class="card-body">
                <strong>Nama:</strong> ${booking.name}<br>
                <strong>No. Telepon:</strong> ${booking.phone}<br>
                <strong>Paket:</strong> ${booking.package}<br>
                <strong>Harga:</strong> Rp${booking.price}<br>
                <strong>Jadwal:</strong> ${booking.date}<br>
                <strong>Status:</strong> ${booking.status}<br>
                <strong>Kode Pesanan:</strong> ${booking.kodebooking ? booking.kodebooking : 'Belum Disetujui'}<br>
                <strong>Waktu Disetujui:</strong> ${booking.waktuDisetujui ? booking.waktuDisetujui : 'Belum Disetujui'}<br>
                <strong>Waktu Konfirmasi:</strong> ${booking.waktuKonfimasi ? booking.waktuKonfimasi : 'Belum Dikonfirmasi'}<br>
                <strong>Waktu Selesai:</strong> ${booking.waktuSelesai ? booking.waktuSelesai : 'Belum Selesai'}<br>
                <strong>Chat Konfirmasi:</strong><br>
                <textarea id="chatKonfirmasi${index}" rows="6" class="form-control mb-2" readonly>${booking.chatKonfirmasi ? booking.chatKonfirmasi : ''}</textarea>
                <button class="btn btn-info btn-sm mb-2" onclick="copyToClipboard(${index})">Copy</button><br>
                <button class="btn btn-primary btn-sm mt-2" onclick="approveBooking(${index})">Setujui</button>
                <button class="btn btn-warning btn-sm mt-2" onclick="confirmLaundry(${index})">Konfirmasi</button>
                <button class="btn btn-success btn-sm mt-2" onclick="finishBooking(${index})">Selesaikan</button>
                <button class="btn btn-danger btn-sm mt-2" onclick="cancelBooking(${index})">Batalkan</button>
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
        `Jadwal: ${booking.date}\n\n` +
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
