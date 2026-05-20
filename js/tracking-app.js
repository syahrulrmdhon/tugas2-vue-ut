new Vue({
    el: "#app",

    data: {
        pengirimanList: sumberData.pengirimanList,
        paket: sumberData.paket,
        tracking: JSON.parse(JSON.stringify(sumberData.tracking)),

        formDO: {
            nim: "",
            nama: "",
            ekspedisi: "",
            paket: "",
            tanggalKirim: ""
        },

        errorForm: [],

        nomorCari: "",
        nomorCariAktif: "",
        hasilCari: null,
        pesanCari: ""
    },

    computed: {
        tahunBerjalan: function () {
            return new Date().getFullYear();
        },

        nomorDOBaru: function () {
            var prefix = "DO" + this.tahunBerjalan + "-";
            var jumlah = Object.keys(this.tracking).filter(key => key.startsWith(prefix)).length + 1;
            return prefix + String(jumlah).padStart(3, "0");
        },

        paketTerpilih: function () {
            return this.paket.find(item => item.kode === this.formDO.paket);
        },

        totalHarga: function () {
            return this.paketTerpilih ? this.paketTerpilih.harga : 0;
        }
    },

    watch: {
        "formDO.paket": function () {
            console.log("Paket berubah menjadi:", this.formDO.paket);
        },

        "formDO.ekspedisi": function () {
            console.log("Ekspedisi berubah menjadi:", this.formDO.ekspedisi);
        },

        nomorCari: function () {
            this.pesanCari = "";
        }
    },

    methods: {
        setTanggalHariIni: function () {
            var hariIni = new Date();
            var tahun = hariIni.getFullYear();
            var bulan = String(hariIni.getMonth() + 1).padStart(2, "0");
            var tanggal = String(hariIni.getDate()).padStart(2, "0");
            this.formDO.tanggalKirim = tahun + "-" + bulan + "-" + tanggal;
        },

        formatRupiah: function (angka) {
            return new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0
            }).format(angka || 0);
        },

        validasiDO: function () {
            this.errorForm = [];

            if (!this.formDO.nim) this.errorForm.push("NIM wajib diisi.");
            if (!this.formDO.nama) this.errorForm.push("Nama mahasiswa wajib diisi.");
            if (!this.formDO.ekspedisi) this.errorForm.push("Ekspedisi wajib dipilih.");
            if (!this.formDO.paket) this.errorForm.push("Paket bahan ajar wajib dipilih.");
            if (!this.formDO.tanggalKirim) this.errorForm.push("Tanggal kirim wajib diisi.");

            return this.errorForm.length === 0;
        },

        tambahDO: function () {
            if (!this.validasiDO()) {
                return;
            }

            var nomor = this.nomorDOBaru;

            this.$set(this.tracking, nomor, {
                nim: this.formDO.nim,
                nama: this.formDO.nama,
                status: "Dalam Proses",
                ekspedisi: this.formDO.ekspedisi,
                tanggalKirim: this.formDO.tanggalKirim,
                paket: this.formDO.paket,
                total: this.totalHarga,
                perjalanan: [
                    {
                        waktu: this.formDO.tanggalKirim + " 09:00:00",
                        keterangan: "Delivery Order dibuat oleh sistem SITTA UT"
                    },
                    {
                        waktu: this.formDO.tanggalKirim + " 10:30:00",
                        keterangan: "Paket sedang diproses untuk pengiriman"
                    }
                ]
            });

            this.nomorCari = nomor;
            this.cariDO();

            this.formDO = {
                nim: "",
                nama: "",
                ekspedisi: "",
                paket: "",
                tanggalKirim: ""
            };

            this.setTanggalHariIni();
            this.errorForm = [];
        },

        cariDO: function () {
            if (!this.nomorCari) {
                this.pesanCari = "Silakan masukkan nomor Delivery Order.";
                this.hasilCari = null;
                return;
            }

            var hasil = this.tracking[this.nomorCari];

            if (!hasil) {
                this.pesanCari = "Nomor Delivery Order tidak ditemukan.";
                this.hasilCari = null;
                return;
            }

            this.nomorCariAktif = this.nomorCari;
            this.hasilCari = hasil;
            this.pesanCari = "";
        },

        pilihDO: function (nomor) {
            this.nomorCari = nomor;
            this.cariDO();
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    },

    mounted: function () {
        this.setTanggalHariIni();
        this.nomorCari = Object.keys(this.tracking)[0] || "";
        if (this.nomorCari) {
            this.cariDO();
        }
    }
});