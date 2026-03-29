import { createClient } from '@supabase/supabase-js';

// Replace these with your Supabase project credentials
const supabaseUrl = 'https://ruqwwyvjkydcknhntadx.supabase.co';
const supabaseAnonKey = 'sb_publishable_FLGlZZ2GHcjUDI3ArD3DyA_euZ2t1jP';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);