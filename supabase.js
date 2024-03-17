// supabase.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://tzfuvfxjjcywdrgivqzq.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR6ZnV2ZnhqamN5d2RyZ2l2cXpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA2ODQ0MzIsImV4cCI6MjAyNjI2MDQzMn0.j1BmlyEjuYGoA-MM5ja5moLgsLWagn46OI1yBZ29p24"; // Replace with your Supabase public key

export const supabase = createClient(supabaseUrl, supabaseKey);
