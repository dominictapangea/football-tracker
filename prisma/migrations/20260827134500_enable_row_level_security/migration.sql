-- Enable Row Level Security on all public tables to close the Supabase
-- linter warnings (rls_disabled_in_public). This app never uses Supabase's
-- auto-generated PostgREST API — all access goes through Prisma using the
-- `postgres` role, which owns these tables and bypasses RLS regardless of
-- policies. Enabling RLS with no policies simply denies the public
-- anon/authenticated PostgREST roles, which should never have had access
-- to this data in the first place.

ALTER TABLE "public"."Player" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."Match" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "public"."_prisma_migrations" ENABLE ROW LEVEL SECURITY;
