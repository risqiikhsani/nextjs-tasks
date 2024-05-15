/*
  Warnings:

  - You are about to drop the column `profesi_id` on the `HasilResponse` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_HasilResponse" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "jenis_kelamin" TEXT,
    "nama" TEXT,
    "nama_jalan" TEXT,
    "email" TEXT,
    "angka_kurang" INTEGER,
    "angka_lebih" INTEGER,
    "profesi_kode" TEXT,
    "plain_json" TEXT,
    CONSTRAINT "HasilResponse_profesi_kode_fkey" FOREIGN KEY ("profesi_kode") REFERENCES "Profesi" ("kode") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_HasilResponse" ("angka_kurang", "angka_lebih", "email", "id", "jenis_kelamin", "nama", "nama_jalan", "plain_json") SELECT "angka_kurang", "angka_lebih", "email", "id", "jenis_kelamin", "nama", "nama_jalan", "plain_json" FROM "HasilResponse";
DROP TABLE "HasilResponse";
ALTER TABLE "new_HasilResponse" RENAME TO "HasilResponse";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
