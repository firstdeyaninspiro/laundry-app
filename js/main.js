document.addEventListener('DOMContentLoaded', function() {
    loadPackages();
    setStylishBackground(); // Tambahkan fungsi untuk mengatur latar belakang
    setEyeCatchingTitle(); 
});

function setStylishBackground() {
    document.body.style.backgroundImage = "url('img/bg.jpg')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundBlendMode = "darken";
}

// Fungsi untuk mengatur teks judul agar lebih eye-catching
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

function loadPackages() {
    const packagesContainer = document.getElementById('packages');
    const packageSelect = document.getElementById('package');

    const packages = [
        {   
            id: 1,
            name: 'Paket Reguler - 1 kg 3 Hari', 
            price: 6000,
            image: 'img/paketReguler1kg.jpg' 
        },
        { 
            id: 2,
            name: 'Paket Reguler - 2-3 kg 3 Hari', 
            price: 15000,
            image: 'img/paketReguler3kg.jpg' 
        },
        { 
            id: 3,
            name: 'Paket Express - 1 kg 1 Hari', 
            price: 9000,
            image: 'img/paketExpress1kg.jpg'
        },
        { 
            id: 4,
            name: 'Paket Express - 2-3 kg 1 Hari', 
            price: 20000,
            image: 'img/paketExpress3kg.jpg' 
        },
    ];

    packages.forEach((pkg, index) => {
        const packageDiv = document.createElement('div');
        packageDiv.className = 'col-md-4';
        packageDiv.innerHTML = `
        <a href="#booking-form">
            <div class="card mb-3">
            <img src="${pkg.image}" class="card-img-top" alt="${pkg.name}">
                <div class="card-body">
                    <h5 class="card-title">${pkg.name}</h5>
                    <p class="card-text">Harga: Rp ${pkg.price}</p>
                </div>
            </div>
        </a>
        `;
        packagesContainer.appendChild(packageDiv);

        const option = document.createElement('option');
        option.value = index;
        option.text = pkg.name;
        packageSelect.add(option);
    });

    localStorage.setItem('packages', JSON.stringify(packages));
}

function submitBooking() {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const packageIndex = document.getElementById('package').value;
    const date = document.getElementById('date').value;

    if (!name || !phone || !packageIndex || !date) {
        alert('Semua field harus diisi!');
        return;
    }

    const packages = JSON.parse(localStorage.getItem('packages'));
    const selectedPackage = packages[packageIndex];

    let bookings = localStorage.getItem('bookings');
    bookings = bookings ? JSON.parse(bookings) : [];

    const bookingDate = new Date(date);
    const currentDate = new Date().toLocaleString();
    const originalIndex = bookings ? bookings.length : 0;

    const newBooking = {
        originalIndex: originalIndex,
        name: name,
        phone: phone,
        package: selectedPackage.name,
        price: selectedPackage.price,
        date: bookingDate.toLocaleString(),
        waktuPemesanan: currentDate,
        waktuPengambilan: '',
        status: 'Belum Disetujui',
        kodebooking: '',
        waktuDisetujui: '',
        waktuKonfimasi: '',
        waktuSelesai: '',
        waktuDibatalkan: ''
    };

    if (selectedPackage.id === 1 || selectedPackage.id === 2) {
        bookingDate.setDate(bookingDate.getDate() + 3);
    } else if (selectedPackage.id === 3 || selectedPackage.id === 4) {
        bookingDate.setDate(bookingDate.getDate() + 1);
    }

    newBooking.waktuPengambilan = bookingDate.toLocaleString();

    bookings.push(newBooking);
    localStorage.setItem('bookings', JSON.stringify(bookings));
    alert('Pesanan berhasil disubmit! Kami akan segera mengirim pesan konfirmasi ke WhatsApp anda');

    // Refresh the page
    window.location.reload();
}
