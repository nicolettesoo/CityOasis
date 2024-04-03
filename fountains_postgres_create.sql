-- CREATE TABLE public.fountains(
--     "fountaintype" varchar,
--     "position" varchar,
--     "propname" varchar,
--     "borough" varchar,
--     "fountaincount" integer,
--     "district" varchar,
--     "point" point
-- );

CREATE TABLE public.water_fountains(
    "fountain_id" serial primary key,
    "fountaintype" varchar,
    "position" varchar,
    "propname" varchar,
    "borough" varchar,
    "fountaincount" integer,
    "district" varchar,
    "point" point
);

insert into water_fountains values select row_number() OVER (), * from fountains;