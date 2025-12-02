/* ===============================
   FORMAT RUPIAH
================================*/
function formatRupiah(angka) {
    if (isNaN(angka)) return "Rp 0";
    return "Rp " + angka.toLocaleString("id-ID");
}

/* ===============================
   KALKULATOR TOTAL BELANJA (INDEX2)
================================*/
const harga = document.getElementById("harga");
const jumlah = document.getElementById("jumlah");
const diskon = document.getElementById("diskon");

const outSubtotal = document.getElementById("outSubtotal");
const outDiskon = document.getElementById("outDiskon");
const outLayanan = document.getElementById("outLayanan");
const outOngkir = document.getElementById("outOngkir");
const outAplikasi = document.getElementById("outAplikasi");
const outTotal = document.getElementById("outTotal");

const btnHitungBelanja = document.getElementById("hitung");
const btnResetBelanja = document.getElementById("reset");

if (btnHitungBelanja) {
    btnHitungBelanja.onclick = function() {
        let h = parseFloat(harga?.value) || 0;
        let j = parseFloat(jumlah?.value) || 0;
        let d = parseFloat(diskon?.value) || 0;
        
        let subtotal = h * j;
        let potDiskon = subtotal * (d / 100);
        let layanan = subtotal * 0.02;
        let ongkir = 10000;
        let aplikasi = 2000;
        let total = subtotal - potDiskon + layanan + ongkir + aplikasi;
        
        outSubtotal.textContent = formatRupiah(subtotal);
        outDiskon.textContent = formatRupiah(potDiskon);
        outLayanan.textContent = formatRupiah(layanan);
        outOngkir.textContent = formatRupiah(ongkir);
        outAplikasi.textContent = formatRupiah(aplikasi);
        outTotal.textContent = formatRupiah(total);
    };
}

if (btnResetBelanja) {
    btnResetBelanja.onclick = function() {
        harga.value = "";
        jumlah.value = "";
        diskon.value = "";
        
        outSubtotal.textContent = "Rp 0";
        outDiskon.textContent = "Rp 0";
        outLayanan.textContent = "Rp 0";
        outOngkir.textContent = "Rp 0";
        outAplikasi.textContent = "Rp 0";
        outTotal.textContent = "Rp 0";
    };
}

/* ===============================
   KALKULATOR BMI (INDEX3)
================================*/
const hitungBMIbtn = document.getElementById("hitungBMI");
const resetBMIbtn = document.getElementById("resetBMI");

if (hitungBMIbtn) {
    hitungBMIbtn.onclick = function() {
        let gender = document.getElementById("gender").value;
        let tinggi = parseFloat(document.getElementById("tinggi").value);
        let berat = parseFloat(document.getElementById("berat").value);
        let hasil = document.getElementById("hasilBMI");
        
        if (!gender || !tinggi || !berat) {
            hasil.innerHTML = "Mohon isi semua data!";
            return;
        }
        
        let t = tinggi / 100;
        let bmi = berat / (t * t);
        let kategori = "";
        
        if (bmi < 18.5)
            kategori = gender === "L" ? "Kurus - Perlu menambah berat badan" :
            "Kurus - Perlu menjaga pola makan";
        else if (bmi < 24.9)
            kategori = "Normal - Berat badan ideal";
        else if (bmi < 29.9)
            kategori = "Kelebihan Berat Badan - Perlu Olahraga!";
        else
            kategori = "Obesitas - Perlu konsultasi ke Dokter";
        
        hasil.innerHTML = `<b>BMI: ${bmi.toFixed(1)}</b><br>${kategori}`;
    };
}

if (resetBMIbtn) {
    resetBMIbtn.onclick = function() {
        document.getElementById("gender").value = "";
        document.getElementById("tinggi").value = "";
        document.getElementById("berat").value = "";
        document.getElementById("hasilBMI").innerHTML = "Hasil BMI akan tampil di sini...";
    };
}

/* ===============================
   KALKULATOR ZAKAT (INDEX4)
================================*/
const hitungZakatBtn = document.getElementById("hitungZakat");
const resetZakatBtn = document.getElementById("resetZakat");

if (hitungZakatBtn) {
    hitungZakatBtn.onclick = function() {
        let gaji = parseFloat(document.getElementById("gaji").value);
        let pokok = parseFloat(document.getElementById("pokok").value);
        let hasil = document.getElementById("hasilZakat");
        
        if (!gaji || !pokok) {
            hasil.innerHTML = "Mohon isi semua data!";
            return;
        }
        
        let bersih = gaji - pokok;
        let nisab = 85 * 84000;
        let wajib = bersih >= nisab;
        let zakat = Math.round(bersih * 0.025);
        
        let teks = `
            <b>📊 HASIL PERHITUNGAN ZAKAT</b><br><br>
            Penghasilan bulanan: ${formatRupiah(gaji)}<br>
            Pengeluaran pokok: ${formatRupiah(pokok)}<br>
            Penghasilan bersih: ${formatRupiah(bersih)}<br><br>
            Nisab: ${formatRupiah(nisab)}<br><br>
        `;
        
        teks += wajib ?
            `<b>☑ ANDA WAJIB ZAKAT</b><br>Zakat per bulan: <b>${formatRupiah(zakat)}</b>` :
            `<b>☒ ANDA TIDAK WAJIB ZAKAT</b><br>Penghasilan belum mencapai nisab.`;
        
        hasil.innerHTML = teks;
    };
}

if (resetZakatBtn) {
    resetZakatBtn.onclick = function() {
        document.getElementById("gaji").value = "";
        document.getElementById("pokok").value = "";
        document.getElementById("hasilZakat").innerHTML =
            "Hasil perhitungan akan tampil di sini…";
    };
}