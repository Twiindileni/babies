-- RLS Policies for contact_messages table
-- Allow anyone to send a message (needed for public contact form)
DROP POLICY IF EXISTS "Public can insert contact messages" ON public.contact_messages;
CREATE POLICY "Public can insert contact messages"
ON public.contact_messages
FOR INSERT
TO public
WITH CHECK (true);

-- Allow admins/staff to read and manage all messages
DROP POLICY IF EXISTS "Admin staff manage contact messages" ON public.contact_messages;
CREATE POLICY "Admin staff manage contact messages"
ON public.contact_messages
FOR ALL
TO authenticated
USING (public.is_admin_or_staff())
WITH CHECK (public.is_admin_or_staff());

-- Allow enrollment applications to be submitted by anyone
DROP POLICY IF EXISTS "Public can submit enrollment applications" ON public.enrollment_applications;
CREATE POLICY "Public can submit enrollment applications"
ON public.enrollment_applications
FOR INSERT
TO public
WITH CHECK (true);

-- Allow admins/staff to manage enrollment applications
DROP POLICY IF EXISTS "Admin staff manage enrollment applications" ON public.enrollment_applications;
CREATE POLICY "Admin staff manage enrollment applications"
ON public.enrollment_applications
FOR ALL
TO authenticated
USING (public.is_admin_or_staff())
WITH CHECK (public.is_admin_or_staff());
