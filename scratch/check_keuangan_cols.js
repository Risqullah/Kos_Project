import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ufkuqbiskbvtophqriyw.supabase.co';
const supabaseAnonKey = 'sb_publishable_0NSFS1HUsd7O3uWi644Z0A_u_X9DLHQ';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function test() {
  const { data, error } = await supabase
    .from('keuangan')
    .select('*')
    .limit(1);

  if (error) {
    console.error('Error fetching financial record:', error.message);
  } else {
    console.log('Financial data structure:', data[0]);
  }
}

test();
