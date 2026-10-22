/*
  Repara textos importados con mojibake sin cambiar la codificación de la BD.
  Ejecutar una sola vez en Supabase SQL Editor.
  Esta versión no usa LATIN1/WIN1252, por lo que también soporta el símbolo €.
*/

create or replace function public.repair_mojibake(value text)
returns text
language plpgsql
immutable
as $$
begin
  value := replace(value, 'Ã¡', 'á');
  value := replace(value, 'Ã©', 'é');
  value := replace(value, 'Ã­', 'í');
  value := replace(value, 'Ã³', 'ó');
  value := replace(value, 'Ãº', 'ú');
  value := replace(value, 'Ã±', 'ñ');
  value := replace(value, 'Ã¼', 'ü');
  value := replace(value, 'Ã‰', 'É');
  value := replace(value, 'Ã“', 'Ó');
  value := replace(value, 'Ãš', 'Ú');
  value := replace(value, 'Ã‘', 'Ñ');
  value := replace(value, 'Ãœ', 'Ü');
  value := replace(value, 'â€”', '—');
  value := replace(value, 'â€“', '–');
  value := replace(value, 'â€œ', '“');
  value := replace(value, 'â€', '”');
  value := replace(value, 'â€˜', '‘');
  value := replace(value, 'â€™', '’');
  value := replace(value, 'â€¦', '…');
  value := replace(value, 'Â ', ' ');
  value := replace(value, 'â‚¬', '€');
  return value;
end;
$$;

update public.products
set
  name = public.repair_mojibake(name),
  offer_text = public.repair_mojibake(offer_text),
  "desc" = public.repair_mojibake("desc")
where name ~ '[ÃÂâ]' or offer_text ~ '[ÃÂâ]' or "desc" ~ '[ÃÂâ]';

update public.products
set colors = (
  select jsonb_agg(to_jsonb(public.repair_mojibake(value)))
  from jsonb_array_elements_text(colors)
)
where colors::text ~ '[ÃÂâ]';

drop function public.repair_mojibake(text);
