-- CreateTable
CREATE TABLE "HasilResponse" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "jenis_kelamin" TEXT,
    "nama" TEXT,
    "nama_jalan" TEXT,
    "email" TEXT,
    "angka_kurang" INTEGER,
    "angka_lebih" INTEGER,
    "profesi" TEXT,
    "plain_json" TEXT
);

-- CreateTable
CREATE TABLE "JenisKelamin" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "kode" TEXT NOT NULL,
    "jenis_kelamin" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Profesi" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "kode" TEXT NOT NULL,
    "nama_profesi" TEXT NOT NULL
);
