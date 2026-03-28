-- Add street2 column to store address line 2 separately
alter table public.submissions
  add column if not exists street2 text;
