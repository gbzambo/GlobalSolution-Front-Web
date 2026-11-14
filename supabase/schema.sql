-- Criar tabela de usuários
create table public.usuarios (
  id uuid default gen_random_uuid() primary key,
  nome text unique not null,
  personalidade text default 'acolhedor' not null,
  criado_em timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Criar tabela de check-ins
create table public.checkins (
  id uuid default gen_random_uuid() primary key,
  usuario_id uuid references public.usuarios(id) on delete cascade not null,
  data date not null,
  nota integer check (nota >= 1 and nota <= 5) not null,
  emocao text not null,
  anotacao text,
  criado_em timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Criar tabela de diário
create table public.diario (
  id uuid default gen_random_uuid() primary key,
  usuario_id uuid references public.usuarios(id) on delete cascade not null,
  data date not null,
  texto text not null,
  criado_em timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Habilitar RLS (Row Level Security)
alter table public.usuarios enable row level security;
alter table public.checkins enable row level security;
alter table public.diario enable row level security;

-- Políticas abertas para acesso anônimo (projeto acadêmico)
create policy "Acesso livre usuarios" on public.usuarios for all using (true) with check (true);
create policy "Acesso livre checkins" on public.checkins for all using (true) with check (true);
create policy "Acesso livre diario" on public.diario for all using (true) with check (true);