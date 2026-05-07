-- Admin/staff helpers and RLS so dashboard can manage payments and related records.
-- Apply in Supabase SQL editor or via `supabase db push` after review.

CREATE OR REPLACE FUNCTION public.is_admin_or_staff()
RETURNS boolean
LANGUAGE sql
STABLE
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.users u
    WHERE u.id = auth.uid()
      AND u.role IN ('admin', 'staff')
  );
$$;

-- Payments: admins/staff full access (parent policy still allows parents to read own)
DROP POLICY IF EXISTS "Admin staff manage payments" ON public.payments;
CREATE POLICY "Admin staff manage payments"
ON public.payments
FOR ALL
TO authenticated
USING (public.is_admin_or_staff())
WITH CHECK (public.is_admin_or_staff());

-- Parents: read all + update (e.g. balance after recording payment)
DROP POLICY IF EXISTS "Admin staff read all parents" ON public.parents;
CREATE POLICY "Admin staff read all parents"
ON public.parents
FOR SELECT
TO authenticated
USING (public.is_admin_or_staff());

DROP POLICY IF EXISTS "Admin staff update parents" ON public.parents;
CREATE POLICY "Admin staff update parents"
ON public.parents
FOR UPDATE
TO authenticated
USING (public.is_admin_or_staff())
WITH CHECK (public.is_admin_or_staff());

-- Children + links: needed to pick child per parent
DROP POLICY IF EXISTS "Admin staff read all children" ON public.children;
CREATE POLICY "Admin staff read all children"
ON public.children
FOR SELECT
TO authenticated
USING (public.is_admin_or_staff());

DROP POLICY IF EXISTS "Admin staff read parent_child" ON public.parent_child;
CREATE POLICY "Admin staff read parent_child"
ON public.parent_child
FOR SELECT
TO authenticated
USING (public.is_admin_or_staff());
