-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    role VARCHAR(20) CHECK (role IN ('admin', 'parent', 'staff')) NOT NULL DEFAULT 'parent',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Parents table
CREATE TABLE IF NOT EXISTS public.parents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    gender VARCHAR(10) CHECK (gender IN ('M', 'F', 'Other')),
    status VARCHAR(20) CHECK (status IN ('Active', 'Inactive')) DEFAULT 'Active',
    payment_status VARCHAR(20) CHECK (payment_status IN ('Current', 'Pending', 'Overdue')) DEFAULT 'Current',
    owing_amount DECIMAL(10,2) DEFAULT 0.00,
    user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Children table
CREATE TABLE IF NOT EXISTS public.children (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    date_of_birth DATE NOT NULL,
    gender VARCHAR(10) CHECK (gender IN ('M', 'F', 'Other')) NOT NULL,
    enrollment_date DATE NOT NULL,
    program_type VARCHAR(20) CHECK (program_type IN ('infant', 'toddler', 'preschool')) NOT NULL,
    status VARCHAR(20) CHECK (status IN ('Active', 'Inactive', 'Waitlisted')) DEFAULT 'Active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Parent-Child relationship table
CREATE TABLE IF NOT EXISTS public.parent_child (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    parent_id UUID NOT NULL REFERENCES public.parents(id) ON DELETE CASCADE,
    child_id UUID NOT NULL REFERENCES public.children(id) ON DELETE CASCADE,
    relationship VARCHAR(50) DEFAULT 'Guardian',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
    UNIQUE(parent_id, child_id)
);

-- Enrollment applications table
CREATE TABLE IF NOT EXISTS public.enrollment_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    child_full_name VARCHAR(100) NOT NULL,
    child_preferred_name VARCHAR(100),
    date_of_birth_year INTEGER NOT NULL,
    date_of_birth_month INTEGER NOT NULL,
    date_of_birth_day INTEGER NOT NULL,
    address TEXT NOT NULL,
    parent1_name VARCHAR(100) NOT NULL,
    parent1_email VARCHAR(100) NOT NULL,
    parent1_cell_phone VARCHAR(20),
    emergency_contact1_name VARCHAR(100) NOT NULL,
    emergency_contact1_home_phone VARCHAR(20) NOT NULL,
    allergies_details TEXT,
    status VARCHAR(20) CHECK (status IN ('Pending', 'Approved', 'Rejected')) DEFAULT 'Pending',
    enrollment_date_year INTEGER NOT NULL,
    enrollment_date_month INTEGER NOT NULL,
    enrollment_date_day INTEGER NOT NULL,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Payments table
CREATE TABLE IF NOT EXISTS public.payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    child_id UUID NOT NULL REFERENCES public.children(id) ON DELETE CASCADE,
    parent_id UUID NOT NULL REFERENCES public.parents(id) ON DELETE CASCADE,
    amount DECIMAL(10,2) NOT NULL,
    payment_date DATE NOT NULL,
    payment_type VARCHAR(50) DEFAULT 'Tuition',
    payment_method VARCHAR(50) DEFAULT 'Cash',
    status VARCHAR(20) CHECK (status IN ('Paid', 'Pending', 'Late')) DEFAULT 'Paid',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Announcements table
CREATE TABLE IF NOT EXISTS public.announcements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    type VARCHAR(20) CHECK (type IN ('general', 'event', 'urgent', 'reminder')) DEFAULT 'general',
    priority VARCHAR(20) CHECK (priority IN ('low', 'medium', 'high')) DEFAULT 'medium',
    target_audience VARCHAR(20) CHECK (target_audience IN ('all', 'parents', 'staff')) DEFAULT 'all',
    is_active BOOLEAN DEFAULT true,
    expires_at TIMESTAMP WITH TIME ZONE,
    created_by UUID REFERENCES public.users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Announcement reads (track which parents have read announcements)
CREATE TABLE IF NOT EXISTS public.announcement_reads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    announcement_id UUID NOT NULL REFERENCES public.announcements(id) ON DELETE CASCADE,
    parent_id UUID NOT NULL REFERENCES public.parents(id) ON DELETE CASCADE,
    read_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
    UNIQUE(announcement_id, parent_id)
);

-- Contact messages table
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(20) CHECK (status IN ('Unread', 'Read', 'Replied')) DEFAULT 'Unread',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Admins table (for admin users)
CREATE TABLE IF NOT EXISTS public.admins (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_parents_email ON public.parents(email);
CREATE INDEX IF NOT EXISTS idx_parents_user_id ON public.parents(user_id);
CREATE INDEX IF NOT EXISTS idx_children_status ON public.children(status);
CREATE INDEX IF NOT EXISTS idx_parent_child_parent ON public.parent_child(parent_id);
CREATE INDEX IF NOT EXISTS idx_parent_child_child ON public.parent_child(child_id);
CREATE INDEX IF NOT EXISTS idx_payments_parent ON public.payments(parent_id);
CREATE INDEX IF NOT EXISTS idx_payments_child ON public.payments(child_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON public.payments(status);
CREATE INDEX IF NOT EXISTS idx_announcements_active ON public.announcements(is_active);
CREATE INDEX IF NOT EXISTS idx_announcements_target ON public.announcements(target_audience);
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON public.contact_messages(status);

-- Enable Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.parents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.children ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.parent_child ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollment_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcement_reads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Users can read their own data
CREATE POLICY "Users can read own data" ON public.users
    FOR SELECT USING (auth.uid() = id);

-- Parents can read their own data
CREATE POLICY "Parents can read own data" ON public.parents
    FOR SELECT USING (auth.uid() = user_id);

-- Parents can read their own children
CREATE POLICY "Parents can read own children" ON public.children
    FOR SELECT USING (
        id IN (
            SELECT child_id FROM public.parent_child 
            WHERE parent_id IN (
                SELECT id FROM public.parents WHERE user_id = auth.uid()
            )
        )
    );

-- Parents can read their own payments
CREATE POLICY "Parents can read own payments" ON public.payments
    FOR SELECT USING (
        parent_id IN (
            SELECT id FROM public.parents WHERE user_id = auth.uid()
        )
    );

-- Parents can read announcements
CREATE POLICY "Parents can read announcements" ON public.announcements
    FOR SELECT USING (is_active = true AND (target_audience = 'all' OR target_audience = 'parents'));

-- Admins can do everything (service role will be used for admin operations)
-- Note: In production, you should create more granular policies

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc', NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_parents_updated_at BEFORE UPDATE ON public.parents
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_children_updated_at BEFORE UPDATE ON public.children
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_enrollment_applications_updated_at BEFORE UPDATE ON public.enrollment_applications
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON public.payments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_announcements_updated_at BEFORE UPDATE ON public.announcements
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
