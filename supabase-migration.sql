-- Create events table for Yoseph Prieto website
-- Run this SQL in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  date DATE NOT NULL,
  time TEXT,
  location TEXT NOT NULL,
  venue TEXT NOT NULL,
  description TEXT,
  image TEXT,
  ticket_url TEXT,
  status TEXT NOT NULL CHECK (status IN ('upcoming', 'past')),
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_events_date ON events(date);
CREATE INDEX IF NOT EXISTS idx_events_status ON events(status);
CREATE INDEX IF NOT EXISTS idx_events_active ON events(active);

-- Enable Row Level Security (RLS)
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to read events
CREATE POLICY "Allow public read access" ON events
  FOR SELECT
  USING (true);

-- Policy: Allow authenticated users (admin) to insert events
CREATE POLICY "Allow admin insert" ON events
  FOR INSERT
  WITH CHECK (true);

-- Policy: Allow authenticated users (admin) to update events
CREATE POLICY "Allow admin update" ON events
  FOR UPDATE
  USING (true);

-- Policy: Allow authenticated users (admin) to delete events
CREATE POLICY "Allow admin delete" ON events
  FOR DELETE
  USING (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_events_updated_at
  BEFORE UPDATE ON events
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
