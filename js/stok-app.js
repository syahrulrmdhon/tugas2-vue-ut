new Vue({
    el: "#app",

    data: {
        upbjjList: sumberData.upbjjList,
        kategoriList: sumberData.kategoriList,
        stok: JSON.parse(JSON.stringify(sumberData.stok)),

        stokTampil: [],

        filter: {
            upbjj: "",
            kategori: "",
            reorder: ""
        },

        sortBy: "",

        tampilForm: false,

        formBaru: {
            kode: "",
            judul: "",
            kategori: "",
            upbjj: "",
            lokasiRak: "",
            harga: null,
            qty: null,
            safety: null,
            catatanHTML: ""
        },

        errorForm: [],

        editIndex: null,
        editData: {}
    },

    computed: {
        kategoriTersedia: function () {
            if (!this.filter.upbjj) {
                return this.kategoriList;
            }

            var kategori = this.stok
                .filter(item => item.upbjj === this.filter.upbjj)
                .map(item => item.kategori);

            return [...new Set(kategori)];
        },

        jumlahAman: function () {
            return this.stok.filter(item => item.qty >= item.safety).length;
        },

        jumlahMenipis: function () {
            return this.stok.filter(item => item.qty > 0 && item.qty < item.safety).length;
        },

        jumlahKosong: function () {
            return this.stok.filter(item => item.qty === 0).length;
        }
    },

    watch: {
        "filter.upbjj": function () {
            this.filter.kategori = "";
            this.terapkanFilter();
        },

        "filter.kategori": function () {
            this.terapkanFilter();
        },

        "filter.reorder": function () {
            this.terapkanFilter();
        },

        sortBy: function () {
            this.terapkanFilter();
        },

        stok: {
            handler: function () {
                this.terapkanFilter();
            },
            deep: true
        }
    },

    methods: {
        terapkanFilter: function () {
            var hasil = [...this.stok];

            if (this.filter.upbjj) {
                hasil = hasil.filter(item => item.upbjj === this.filter.upbjj);
            }

            if (this.filter.kategori) {
                hasil = hasil.filter(item => item.kategori === this.filter.kategori);
            }

            if (this.filter.reorder === "menipis") {
                hasil = hasil.filter(item => item.qty < item.safety);
            }

            if (this.filter.reorder === "kosong") {
                hasil = hasil.filter(item => item.qty === 0);
            }

            if (this.sortBy === "judul") {
                hasil.sort((a, b) => a.judul.localeCompare(b.judul));
            }

            if (this.sortBy === "qty") {
                hasil.sort((a, b) => a.qty - b.qty);
            }

            if (this.sortBy === "harga") {
                hasil.sort((a, b) => a.harga - b.harga);
            }

            this.stokTampil = hasil;
        },

        resetFilter: function () {
            this.filter.upbjj = "";
            this.filter.kategori = "";
            this.filter.reorder = "";
            this.sortBy = "";
            this.terapkanFilter();
        },

        statusClass: function (item) {
            if (item.qty === 0) {
                return "kosong";
            }

            if (item.qty < item.safety) {
                return "menipis";
            }

            return "aman";
        },

        formatRupiah: function (angka) {
            return new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0
            }).format(angka || 0);
        },

        toggleForm: function () {
            this.tampilForm = !this.tampilForm;
        },

        validasiForm: function () {
            this.errorForm = [];

            if (!this.formBaru.kode) this.errorForm.push("Kode mata kuliah wajib diisi.");
            if (!this.formBaru.judul) this.errorForm.push("Nama mata kuliah wajib diisi.");
            if (!this.formBaru.kategori) this.errorForm.push("Kategori wajib dipilih.");
            if (!this.formBaru.upbjj) this.errorForm.push("UT Daerah wajib dipilih.");
            if (!this.formBaru.lokasiRak) this.errorForm.push("Lokasi rak wajib diisi.");
            if (!this.formBaru.harga || this.formBaru.harga <= 0) this.errorForm.push("Harga harus lebih dari 0.");
            if (this.formBaru.qty === null || this.formBaru.qty < 0) this.errorForm.push("Jumlah stok tidak boleh kosong atau negatif.");
            if (this.formBaru.safety === null || this.formBaru.safety < 0) this.errorForm.push("Safety stock tidak boleh kosong atau negatif.");

            return this.errorForm.length === 0;
        },

        tambahStok: function () {
            if (!this.validasiForm()) {
                return;
            }

            this.stok.push({
                kode: this.formBaru.kode,
                judul: this.formBaru.judul,
                kategori: this.formBaru.kategori,
                upbjj: this.formBaru.upbjj,
                lokasiRak: this.formBaru.lokasiRak,
                harga: this.formBaru.harga,
                qty: this.formBaru.qty,
                safety: this.formBaru.safety,
                catatanHTML: this.formBaru.catatanHTML || "-"
            });

            this.formBaru = {
                kode: "",
                judul: "",
                kategori: "",
                upbjj: "",
                lokasiRak: "",
                harga: null,
                qty: null,
                safety: null,
                catatanHTML: ""
            };

            this.errorForm = [];
            this.tampilForm = false;
            this.terapkanFilter();
        },

        getIndexAsli: function (item) {
            return this.stok.indexOf(item);
        },

        mulaiEdit: function (item) {
            this.editIndex = this.getIndexAsli(item);
            this.editData = Object.assign({}, item);
        },

        simpanEdit: function () {
            if (this.editIndex !== null) {
                this.$set(this.stok, this.editIndex, Object.assign({}, this.editData));
                this.editIndex = null;
                this.editData = {};
                this.terapkanFilter();
            }
        },

        batalEdit: function () {
            this.editIndex = null;
            this.editData = {};
        }
    },

    mounted: function () {
        this.terapkanFilter();
    }
});