document.addEventListener('DOMContentLoaded', function() {
    loadPackages();
});

function loadPackages() {
    const packagesContainer = document.getElementById('packages');
    const packageSelect = document.getElementById('package');

    const packages = [
        { name: 'Paket A - 1 kg 1 Hari', price: 10000 },
        { name: 'Paket B - 1 kg 2 Hari', price: 8000 },
        { name: 'Paket C - 1-3 kg 1 Hari', price: 18000 },
        { name: 'Paket D - 1-3 kg 2 Hari', price: 15000 },
    ];

    packages.forEach((pkg, index) => {
        const packageDiv = document.createElement('div');
        packageDiv.className = 'col-md-4';
        packageDiv.innerHTML = `
            <div class="card mb-4">
                <div class="card-body">
                    <h5 class="card-title">${pkg.name}</h5>
                    <p class="card-text">Harga: Rp ${pkg.price}</p>
                </div>
            </div>
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
    const estimateCompletionDate = new Date(bookingDate);
    estimateCompletionDate.setDate(bookingDate.getDate() + 1);

    const newBooking = {
        name: name,
        phone: phone,
        package: selectedPackage.name,
        price: selectedPackage.price,
        date: bookingDate.toLocaleString(),
        estimateCompletionDate: estimateCompletionDate.toLocaleString(),
        status: 'Belum Disetujui',
        kodebooking: '',
        waktuDisetujui: '',
        waktuKonfimasi: '',
        waktuSelesai: ''
    };

    bookings.push(newBooking);
    localStorage.setItem('bookings', JSON.stringify(bookings));
    alert('Pesanan berhasil disubmit! Kami akan segera mengirim pesan konfirmasi ke WhatsApp anda');
}
