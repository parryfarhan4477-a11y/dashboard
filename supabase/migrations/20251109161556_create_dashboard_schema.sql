/*
  # NSDC JHSC Dashboard Schema

  ## Overview
  Creates the complete database schema for the NSDC JHSC personalized dashboard application.

  ## New Tables

  ### 1. users
  User profile information and authentication data
  - `id` (uuid, primary key) - User unique identifier
  - `email` (text, unique) - User email address
  - `full_name` (text) - User's full name
  - `profile_picture` (text) - URL to profile picture
  - `coins_balance` (integer) - Current NSDC coins balance
  - `created_at` (timestamptz) - Account creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 2. events
  Event information and details
  - `id` (uuid, primary key) - Event unique identifier
  - `title` (text) - Event title
  - `description` (text) - Event description
  - `event_date` (timestamptz) - When the event occurs
  - `location` (text) - Event location
  - `image_url` (text) - Event banner/image URL
  - `coins_reward` (integer) - Coins awarded for participation
  - `status` (text) - Event status (upcoming, ongoing, completed)
  - `created_at` (timestamptz) - Record creation timestamp

  ### 3. user_events
  Junction table linking users to events they've registered for
  - `id` (uuid, primary key) - Record unique identifier
  - `user_id` (uuid, foreign key) - Reference to users table
  - `event_id` (uuid, foreign key) - Reference to events table
  - `registration_date` (timestamptz) - When user registered
  - `attendance_status` (text) - Registration status (registered, attended, missed)
  - `created_at` (timestamptz) - Record creation timestamp

  ### 4. coin_transactions
  History of all coin transactions for users
  - `id` (uuid, primary key) - Transaction unique identifier
  - `user_id` (uuid, foreign key) - Reference to users table
  - `amount` (integer) - Coins earned/spent (positive or negative)
  - `transaction_type` (text) - Type of transaction (event, hackathon, workshop, redemption)
  - `description` (text) - Transaction description
  - `event_id` (uuid, foreign key, nullable) - Reference to related event if applicable
  - `created_at` (timestamptz) - Transaction timestamp

  ## Security
  - Enable Row Level Security (RLS) on all tables
  - Users can only read and update their own data
  - Public read access for events table
  - Secure policies for all operations

  ## Important Notes
  1. All tables use UUID primary keys for security and scalability
  2. Timestamps are automatically managed with defaults
  3. Foreign key constraints ensure data integrity
  4. RLS policies follow principle of least privilege
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  profile_picture text DEFAULT 'https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg',
  coins_balance integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  event_date timestamptz NOT NULL,
  location text NOT NULL,
  image_url text DEFAULT 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg',
  coins_reward integer DEFAULT 10,
  status text DEFAULT 'upcoming',
  created_at timestamptz DEFAULT now()
);

-- Create user_events junction table
CREATE TABLE IF NOT EXISTS user_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  event_id uuid REFERENCES events(id) ON DELETE CASCADE,
  registration_date timestamptz DEFAULT now(),
  attendance_status text DEFAULT 'registered',
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, event_id)
);

-- Create coin_transactions table
CREATE TABLE IF NOT EXISTS coin_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  amount integer NOT NULL,
  transaction_type text NOT NULL,
  description text NOT NULL,
  event_id uuid REFERENCES events(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE coin_transactions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- RLS Policies for events table (public read)
CREATE POLICY "Anyone can view events"
  ON events FOR SELECT
  TO authenticated
  USING (true);

-- RLS Policies for user_events table
CREATE POLICY "Users can view own event registrations"
  ON user_events FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can register for events"
  ON user_events FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own event registrations"
  ON user_events FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for coin_transactions table
CREATE POLICY "Users can view own transactions"
  ON coin_transactions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_user_events_user_id ON user_events(user_id);
CREATE INDEX IF NOT EXISTS idx_user_events_event_id ON user_events(event_id);
CREATE INDEX IF NOT EXISTS idx_coin_transactions_user_id ON coin_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_events_status ON events(status);
CREATE INDEX IF NOT EXISTS idx_events_date ON events(event_date);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update updated_at
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
