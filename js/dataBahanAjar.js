var sumberData = {
    upbjjList: ["Jakarta", "Surabaya", "Makassar", "Padang", "Denpasar"],

    kategoriList: ["MK Wajib", "MK Pilihan", "Praktikum", "Problem-Based"],

    pengirimanList: [
        { kode: "REG", nama: "JNE Regular" },
        { kode: "EXP", nama: "JNE Express" }
    ],

    paket: [
        {
            kode: "PAKET-UT-001",
            nama: "PAKET IPS Dasar",
            isi: ["EKMA4116", "EKMA4115"],
            harga: 120000
        },
        {
            kode: "PAKET-UT-002",
            nama: "PAKET IPA Dasar",
            isi: ["BIOL4201", "FISIP4001"],
            harga: 140000
        }
    ],

    stok: [
        {
            kode: "EKMA4116",
            judul: "Pengantar Manajemen",
            kategori: "MK Wajib",
            upbjj: "Jakarta",
            lokasiRak: "R1-A3",
            harga: 65000,
            qty: 28,
            safety: 20,
            catatanHTML: "<em>Edisi 2024, cetak ulang</em>"
        },
        {
            kode: "EKMA4115",
            judul: "Pengantar Akuntansi",
            kategori: "MK Wajib",
            upbjj: "Jakarta",
            lokasiRak: "R1-A4",
            harga: 60000,
            qty: 7,
            safety: 15,
            catatanHTML: "<strong>Cover baru</strong>"
        },
        {
            kode: "BIOL4201",
            judul: "Biologi Umum (Praktikum)",
            kategori: "Praktikum",
            upbjj: "Surabaya",
            lokasiRak: "R3-B2",
            harga: 80000,
            qty: 12,
            safety: 10,
            catatanHTML: "Butuh <u>pendingin</u> untuk kit basah"
        },
        {
            kode: "FISIP4001",
            judul: "Dasar-Dasar Sosiologi",
            kategori: "MK Pilihan",
            upbjj: "Makassar",
            lokasiRak: "R2-C1",
            harga: 55000,
            qty: 2,
            safety: 8,
            catatanHTML: "Stok <i>menipis</i>, prioritaskan reorder"
        }
    ],

    tracking: {
        "DO2025-0001": {
            nim: "123456789",
            nama: "Rina Wulandari",
            status: "Dalam Perjalanan",
            ekspedisi: "JNE Regular",
            tanggalKirim: "2025-08-25",
            paket: "PAKET-UT-001",
            total: 120000,
            perjalanan: [
                { waktu: "2025-08-25 10:12:20", keterangan: "Penerimaan di Loket: TANGSEL" },
                { waktu: "2025-08-25 14:07:56", keterangan: "Tiba di Hub: JAKSEL" },
                { waktu: "2025-08-26 08:44:01", keterangan: "Diteruskan ke Kantor Tujuan" }
            ]
        },
        // "DO2025-0002": {
        //     nim: "987654321",
        //     nama: "Agus Pranoto",
        //     status: "Diproses",
        //     ekspedisi: "JNE Express",
        //     tanggalKirim: "2025-08-26",
        //     paket: "PAKET-UT-002",
        //     total: 140000,
        //     perjalanan: [
        //         { waktu: "2025-08-26 09:15:00", keterangan: "Delivery Order dibuat oleh sistem SITTA UT" },
        //         { waktu: "2025-08-26 10:05:00", keterangan: "Paket sedang disiapkan di gudang bahan ajar" }
        //     ]
        // },

        // "DO2025-0003": {
        //     nim: "112233445",
        //     nama: "Siti Marlina",
        //     status: "Selesai",
        //     ekspedisi: "JNE Regular",
        //     tanggalKirim: "2025-08-20",
        //     paket: "PAKET-UT-001",
        //     total: 120000,
        //     perjalanan: [
        //         { waktu: "2025-08-20 08:30:00", keterangan: "Penerimaan di Loket: Universitas Terbuka" },
        //         { waktu: "2025-08-20 13:20:00", keterangan: "Tiba di Hub: Jakarta Selatan" },
        //         { waktu: "2025-08-21 09:45:00", keterangan: "Paket diteruskan ke kantor tujuan" },
        //         { waktu: "2025-08-21 16:10:00", keterangan: "Paket telah diterima oleh Siti Marlina" }
        //     ]
        // },

        // "DO2025-0004": {
        //     nim: "556677889",
        //     nama: "Doni Setiawan",
        //     status: "Tertunda",
        //     ekspedisi: "JNE Express",
        //     tanggalKirim: "2025-08-27",
        //     paket: "PAKET-UT-002",
        //     total: 140000,
        //     perjalanan: [
        //         { waktu: "2025-08-27 11:00:00", keterangan: "Delivery Order dibuat oleh sistem SITTA UT" },
        //         { waktu: "2025-08-27 15:30:00", keterangan: "Paket tertunda karena menunggu konfirmasi alamat penerima" }
        //     ]
        // }
    }
};