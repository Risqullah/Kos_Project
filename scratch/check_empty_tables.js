import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ufkuqbiskbvtophqriyw.supabase.co';
const supabaseAnonKey = 'sb_publishable_0NSFS1HUsd7O3uWi644Z0A_u_X9DLHQ';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function inspectTable(tableName, dummyData) {
  console.log(`\n--- Inspecting Table: ${tableName} ---`);
  const { data: inserted, error: insertError } = await supabase
    .from(tableName)
    .insert(dummyData)
    .select();

  if (insertError) {
    console.error(`Failed to insert into ${tableName}:`, insertError.message, insertError);
    // If it's a column issue, let's try inserting without the potentially problematic columns
    if (insertError.message.includes('durasi_sewa')) {
      console.log('Retrying without durasi_sewa...');
      const fallbackData = { ...dummyData };
      delete fallbackData.durasi_sewa;
      const { data: insertedRetry, error: retryError } = await supabase
        .from(tableName)
        .insert(fallbackData)
        .select();
      if (retryError) {
        console.error(`Retry failed for ${tableName}:`, retryError.message);
      } else {
        console.log(`Success on retry! Row schema:`, insertedRetry[0]);
        // Cleanup
        await cleanup(tableName, insertedRetry[0]);
      }
    }
  } else {
    console.log(`Successfully inserted! Row schema:`, inserted[0]);
    // Cleanup
    await cleanup(tableName, inserted[0]);
  }
}

async function cleanup(tableName, row) {
  let idColName;
  if (tableName === 'keuangan') idColName = 'id_keuangan';
  else if (tableName === 'laporan') idColName = 'id_laporan';
  else if (tableName === 'reservasi') idColName = 'id_reservasi';

  const { error: deleteError } = await supabase
    .from(tableName)
    .delete()
    .eq(idColName, row[idColName]);

  if (deleteError) {
    console.error(`Failed to cleanup ${tableName}:`, deleteError.message);
  } else {
    console.log(`Cleaned up temp row from ${tableName}`);
  }
}

async function run() {
  await inspectTable('keuangan', {
    jenis_transaksi: 'pemasukan',
    tanggal: '2026-06-16',
    keterangan: 'Test Kategori - Test Deskripsi',
    nominal: 100000
  });

  await inspectTable('laporan', {
    judul: 'Kerusakan Test',
    deskripsi: 'Deskripsi kerusakan test',
    foto_bukti: 'https://example.com/test.jpg',
    tanggal_laporan: '2026-06-16',
    status: 'Pending',
    id_penghuni: 1
  });

  await inspectTable('reservasi', {
    tanggal_reservasi: '2026-06-16',
    tanggal_mulai: '2026-06-16',
    status_konfirmasi: 'Menunggu Konfirmasi',
    id_kamar: 10,
    id_penghuni: 1,
    durasi_sewa: 1
  });
}

run();
