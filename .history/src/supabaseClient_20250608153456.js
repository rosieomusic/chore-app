// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kuifvftsbrsiezbespzg.supabase.co';
const supabaseAnonKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt1aWZ2ZnRzYnJzaWV6YmVzcHpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk0MDE4MzEsImV4cCI6MjA2NDk3NzgzMX0.miFwdZT5puXqjOl3EsSnvVgXaFHLg5pYHmHz62r7bj8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
