CREATE TABLE public.profiles (
  id uuid PRIMARY KEY,
  full_name text,
  email text UNIQUE NOT NULL,
  role text NOT NULL DEFAULT 'requester' CHECK (role IN ('requester', 'admin')),
  department text,
  avatar_url text,
  created_at timestamptz DEFAULT now()
);
