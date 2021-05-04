-- Table: public.users

-- DROP TABLE public.users;

CREATE TABLE public.users
(
    id SERIAL PRIMARY KEY,
    login text COLLATE pg_catalog."default" NOT NULL,
    password text COLLATE pg_catalog."default" NOT NULL,
    access_token text COLLATE pg_catalog."default"
)

TABLESPACE pg_default;

ALTER TABLE public.users
    OWNER to admin;

-- Table: public.topics

-- DROP TABLE public.topics;

CREATE TABLE public.topics
(
    id SERIAL PRIMARY KEY,
    topic text COLLATE pg_catalog."default" NOT NULL
)

TABLESPACE pg_default;

ALTER TABLE public.topics
    OWNER to admin;

-- Table: public.refresh_sessions

-- DROP TABLE public.refresh_sessions;

CREATE TABLE public.refresh_sessions
(
    id SERIAL PRIMARY KEY,
    user_id integer NOT NULL,
    refresh_token text COLLATE pg_catalog."default" NOT NULL,
    expires_in integer NOT NULL,
    created_at timestamp without time zone NOT NULL DEFAULT '2021-02-27 19:14:09.252102'::timestamp without time zone,
    CONSTRAINT user_id FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE public.refresh_sessions
    OWNER to admin;

-- Table: public.proposals

-- DROP TABLE public.proposals;

CREATE TABLE public.proposals
(
    id SERIAL PRIMARY KEY,
    title text COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default" NOT NULL,
    author_id integer NOT NULL,
    rating integer NOT NULL DEFAULT 0,
    topic_id integer NOT NULL,
    CONSTRAINT author_id FOREIGN KEY (author_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT topic_id FOREIGN KEY (topic_id)
        REFERENCES public.topics (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE public.proposals
    OWNER to admin;

-- Table: public.comments

-- DROP TABLE public.comments;

CREATE TABLE public.comments
(
    id SERIAL PRIMARY KEY,
    comment text COLLATE pg_catalog."default" NOT NULL,
    author_id integer NOT NULL,
    proposal_id integer NOT NULL,
    rating integer NOT NULL DEFAULT 0,
    CONSTRAINT author_id FOREIGN KEY (author_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE,
    CONSTRAINT proposal_id FOREIGN KEY (proposal_id)
        REFERENCES public.proposals (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE public.comments
    OWNER to admin;