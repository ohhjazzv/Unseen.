create extension if not exists "pgcrypto";
create table public.experiences (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references auth.users (id) on delete cascade,
    raw_text text not null check (char_length(raw_text)between 1 and 8000),
    created_at timestamptz not null default now()
)

create table public.analyses (
    id uuid primary key default gen_random_uuid(),
    experiences_id uuid not null references public.experiences (id) on delete cascade,
    verdict text not null check (verdict in ('strong' , 'moderate' , 'weak')),
    overall_score numeric(3,1) not null check (overall_score between 0 and 10),
    resume_bullets jsonb not null default '[]'::jsonb,
    star_story jsonb not null default '{}'::jsonb,
    linkedin_description text,
    skill_gaps jsonb not null default '[]'::jsonb,
    pitch text,
    created _at timestamptz not null default now()
)