// supabase.js
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = "https://jmfbwqvyyiogjtywszfd.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImptZmJ3cXZ5eWlvZ2p0eXdzemZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjExMzk4NjQsImV4cCI6MjA3NjcxNTg2NH0.ArccKuGvsyw_qMuzvBC8_AsG-u0deuGZ3PH67Miz_sk";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
