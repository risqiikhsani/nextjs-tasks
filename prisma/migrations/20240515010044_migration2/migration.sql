/*
  Warnings:

  - You are about to drop the column `profesi` on the `HasilResponse` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[kode]` on the table `JenisKelamin` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[kode]` on the table `Profesi` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `profesi_id` to the `HasilResponse` table without a default value. This is not possible if the table is not empty.

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
    "profesi_id" INTEGER NOT NULL,
    "plain_json" TEXT,
    CONSTRAINT "HasilResponse_profesi_id_fkey" FOREIGN KEY ("profesi_id") REFERENCES "Profesi" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_HasilResponse" ("angka_kurang", "angka_lebih", "email", "id", "jenis_kelamin", "nama", "nama_jalan", "plain_json") SELECT "angka_kurang", "angka_lebih", "email", "id", "jenis_kelamin", "nama", "nama_jalan", "plain_json" FROM "HasilResponse";
DROP TABLE "HasilResponse";
ALTER TABLE "new_HasilResponse" RENAME TO "HasilResponse";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "JenisKelamin_kode_key" ON "JenisKelamin"("kode");

-- CreateIndex
CREATE UNIQUE INDEX "Profesi_kode_key" ON "Profesi"("kode");
