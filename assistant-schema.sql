-- Ejecuta este archivo una sola vez si ya habías ejecutado supabase-schema.sql.
create table if not exists public.store_info (
  id integer primary key default 1 check (id = 1),
  shipping text not null default '',
  payment text not null default '',
  hours text not null default '',
  location text not null default '',
  customization text not null default '',
  whatsapp text not null default '',
  updated_at timestamptz not null default now()
);

insert into public.store_info (id)
values (1)
on conflict (id) do nothing;

alter table public.store_info enable row level security;

grant select on table public.store_info to anon;
grant select, insert, update on table public.store_info to authenticated;

drop policy if exists "Public can read store info" on public.store_info;
drop policy if exists "Authenticated admins can manage store info" on public.store_info;

create policy "Public can read store info"
  on public.store_info for select
  using (true);

create policy "Authenticated admins can manage store info"
  on public.store_info for all to authenticated
  using (true) with check (true);
