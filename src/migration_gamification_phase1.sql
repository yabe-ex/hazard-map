-- 1. Create Profiles table (if not exists) to store public user data like score
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  contribution_score integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Add verification flag to posts
alter table public.hazard_posts add column if not exists is_location_verified boolean default false;

-- 3. Function to handle New User -> Profile creation
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id)
  values (new.id);
  return new;
end;
$$ language plpgsql security definer;

-- Trigger for new user creation (Safe to run even if exists, but checking existence is hard in simple SQL. 
-- Supabase UI usually handles this, but for SQL run:
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 4. Sync existing users (Backfill profiles for existing users who don't have one)
insert into public.profiles (id)
select id from auth.users
where id not in (select id from public.profiles);


-- 5. Score Calculation Functions

-- Function: On Post Created/Deleted
create or replace function public.update_score_on_post()
returns trigger as $$
declare
  score_change integer := 0;
  target_user_id uuid;
  post_record record;
begin
  -- Determine if Insert or Delete
  if (TG_OP = 'DELETE') then
    post_record := OLD;
    target_user_id := OLD.user_id;
  else
    post_record := NEW;
    target_user_id := NEW.user_id;
  end if;

  -- Base Score (Text)
  score_change := 10;

  -- Photo Bonus
  if (post_record.image_url is not null and post_record.image_url != '') then
    score_change := score_change + 20; -- Total 30 for photo
  end if;

  -- Verification Bonus
  if (post_record.is_location_verified = true) then
    score_change := score_change + 50;
  end if;

  -- Apply Change (Add for Insert, Subtract for Delete)
  if (TG_OP = 'DELETE') then
    update public.profiles
    set contribution_score = contribution_score - score_change
    where id = target_user_id;
  else
    update public.profiles
    set contribution_score = contribution_score + score_change
    where id = target_user_id;
  end if;

  return null;
end;
$$ language plpgsql security definer;

-- Trigger: Post Changes
drop trigger if exists on_post_change_score on public.hazard_posts;
create trigger on_post_change_score
  after insert or delete on public.hazard_posts
  for each row execute procedure public.update_score_on_post();


-- Function: On Empathy (Handshake) Created/Deleted
create or replace function public.update_score_on_empathy()
returns trigger as $$
declare
  target_user_id uuid;
begin
  if (TG_OP = 'DELETE') then
    -- Find author of the post
    select user_id into target_user_id from public.hazard_posts where id = OLD.post_id;
    
    if (target_user_id is not null) then
      update public.profiles
      set contribution_score = contribution_score - 5
      where id = target_user_id;
    end if;
  else
    -- Find author of the post
    select user_id into target_user_id from public.hazard_posts where id = NEW.post_id;
    
    if (target_user_id is not null) then
      update public.profiles
      set contribution_score = contribution_score + 5
      where id = target_user_id;
    end if;
  end if;

  return null;
end;
$$ language plpgsql security definer;

-- Trigger: Empathy Changes
drop trigger if exists on_empathy_change_score on public.hazard_empathies;
create trigger on_empathy_change_score
  after insert or delete on public.hazard_empathies
  for each row execute procedure public.update_score_on_empathy();
