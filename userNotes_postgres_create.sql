CREATE TABLE public.userNotes(
    "usernote_id" serial primary key,
    "username" varchar,
    "notes" varchar,
    "fountain_id" INT REFERENCES public.water_fountains(fountain_id)
);
