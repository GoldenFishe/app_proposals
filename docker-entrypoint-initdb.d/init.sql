--
-- PostgreSQL database dump
--

-- Dumped from database version 13.4
-- Dumped by pg_dump version 13.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: comment_attachments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.comment_attachments (
    id integer NOT NULL,
    filename text NOT NULL,
    comment_id integer NOT NULL
);


--
-- Name: comment_attachments_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.comment_attachments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: comment_attachments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.comment_attachments_id_seq OWNED BY public.comment_attachments.id;


--
-- Name: comments_dislikes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.comments_dislikes (
    id integer NOT NULL,
    comment_id integer NOT NULL,
    user_id integer NOT NULL
);


--
-- Name: comment_dislikes_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.comment_dislikes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: comment_dislikes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.comment_dislikes_id_seq OWNED BY public.comments_dislikes.id;


--
-- Name: comments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.comments (
    id integer NOT NULL,
    comment text NOT NULL,
    author_id integer NOT NULL,
    proposal_id integer NOT NULL,
    create_date timestamp without time zone DEFAULT now() NOT NULL,
    parent_comment_id integer
);


--
-- Name: comments_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.comments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.comments_id_seq OWNED BY public.comments.id;


--
-- Name: comments_likes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.comments_likes (
    id integer NOT NULL,
    comment_id integer NOT NULL,
    user_id integer NOT NULL
);


--
-- Name: comments_likes_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.comments_likes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: comments_likes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.comments_likes_id_seq OWNED BY public.comments_likes.id;


--
-- Name: proposal_attachments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.proposal_attachments (
    id integer NOT NULL,
    filename text NOT NULL,
    proposal_id integer NOT NULL
);


--
-- Name: proposal_attahments_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.proposal_attahments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: proposal_attahments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.proposal_attahments_id_seq OWNED BY public.proposal_attachments.id;


--
-- Name: proposals; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.proposals (
    id integer NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    author_id integer NOT NULL,
    create_date timestamp without time zone DEFAULT now() NOT NULL,
    tags_ids integer[] DEFAULT ARRAY[]::integer[] NOT NULL
);


--
-- Name: proposals_dislikes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.proposals_dislikes (
    id integer NOT NULL,
    proposal_id integer NOT NULL,
    user_id integer NOT NULL
);


--
-- Name: proposals_dislikes_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.proposals_dislikes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: proposals_dislikes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.proposals_dislikes_id_seq OWNED BY public.proposals_dislikes.id;


--
-- Name: proposals_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.proposals_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: proposals_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.proposals_id_seq OWNED BY public.proposals.id;


--
-- Name: proposals_likes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.proposals_likes (
    id integer NOT NULL,
    proposal_id integer NOT NULL,
    user_id integer NOT NULL
);


--
-- Name: proposals_likes_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.proposals_likes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: proposals_likes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.proposals_likes_id_seq OWNED BY public.proposals_likes.id;


--
-- Name: refresh_sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.refresh_sessions (
    id integer NOT NULL,
    user_id integer NOT NULL,
    refresh_token text NOT NULL,
    expires_in integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: refresh_sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.refresh_sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: refresh_sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.refresh_sessions_id_seq OWNED BY public.refresh_sessions.id;


--
-- Name: tags; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tags (
    id integer NOT NULL,
    tag text NOT NULL,
    proposal_id integer NOT NULL
);


--
-- Name: tags_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.tags_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: tags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.tags_id_seq OWNED BY public.tags.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    login text NOT NULL,
    password text NOT NULL,
    access_token text,
    username text NOT NULL,
    avatar_filename text
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: comment_attachments id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comment_attachments ALTER COLUMN id SET DEFAULT nextval('public.comment_attachments_id_seq'::regclass);


--
-- Name: comments id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments ALTER COLUMN id SET DEFAULT nextval('public.comments_id_seq'::regclass);


--
-- Name: comments_dislikes id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments_dislikes ALTER COLUMN id SET DEFAULT nextval('public.comment_dislikes_id_seq'::regclass);


--
-- Name: comments_likes id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments_likes ALTER COLUMN id SET DEFAULT nextval('public.comments_likes_id_seq'::regclass);


--
-- Name: proposal_attachments id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.proposal_attachments ALTER COLUMN id SET DEFAULT nextval('public.proposal_attahments_id_seq'::regclass);


--
-- Name: proposals id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.proposals ALTER COLUMN id SET DEFAULT nextval('public.proposals_id_seq'::regclass);


--
-- Name: proposals_dislikes id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.proposals_dislikes ALTER COLUMN id SET DEFAULT nextval('public.proposals_dislikes_id_seq'::regclass);


--
-- Name: proposals_likes id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.proposals_likes ALTER COLUMN id SET DEFAULT nextval('public.proposals_likes_id_seq'::regclass);


--
-- Name: refresh_sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.refresh_sessions ALTER COLUMN id SET DEFAULT nextval('public.refresh_sessions_id_seq'::regclass);


--
-- Name: tags id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tags ALTER COLUMN id SET DEFAULT nextval('public.tags_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: comment_attachments; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.comment_attachments (id, filename, comment_id) FROM stdin;
\.


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.comments (id, comment, author_id, proposal_id, create_date, parent_comment_id) FROM stdin;
28	wow	14	45	2021-08-08 23:51:36.245142	\N
29	test	14	46	2021-08-16 21:49:42.429644	\N
30	test	14	46	2021-08-16 21:49:44.861923	\N
31	test	14	46	2021-08-16 21:49:48.616582	\N
32	test	14	46	2021-08-16 21:49:50.525143	\N
33	test	14	46	2021-08-16 21:49:55.318562	\N
34	test	14	46	2021-08-16 21:49:58.472222	\N
\.


--
-- Data for Name: comments_dislikes; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.comments_dislikes (id, comment_id, user_id) FROM stdin;
\.


--
-- Data for Name: comments_likes; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.comments_likes (id, comment_id, user_id) FROM stdin;
23	28	14
\.


--
-- Data for Name: proposal_attachments; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.proposal_attachments (id, filename, proposal_id) FROM stdin;
17	rcn7iKxeVZahMwl7DFsV2	46
18	y5upbmXtPM-5-KqNpmPkv	46
19	ZL-Urja63cT7PjDPtPvAM	46
20	tYzD4Mo7dJLwJ0yrzG7tK	46
21	BL51215JTZanI3fMJbFXX	46
22	Zs64L47N8XY2RXD_vmGy2	46
\.


--
-- Data for Name: proposals; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.proposals (id, title, description, author_id, create_date, tags_ids) FROM stdin;
45	Lorem ipsum dolor si	Praesent blandit turpis eu ligula aliquet sagittis. Vivamus aliquam mauris sit amet tempus scelerisque. Aenean sed nibh augue. Suspendisse at purus nec magna dapibus consectetur non in nibh. Morbi et mattis velit. Nunc tempor quam nec arcu convallis conse	14	2021-08-07 23:27:14.600155	{0,1}
46	Maecenas sed mauris 	Donec et maximus orci. Phasellus nibh massa, sagittis at auctor vitae, tincidunt sed nulla. Suspendisse laoreet quis mi ac semper. Nullam egestas et mi quis vestibulum. Mauris id tincidunt ex. Mauris vitae velit eu purus aliquet cursus. Nunc pharetra, dol	14	2021-08-07 23:29:35.126863	{0,1}
\.


--
-- Data for Name: proposals_dislikes; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.proposals_dislikes (id, proposal_id, user_id) FROM stdin;
\.


--
-- Data for Name: proposals_likes; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.proposals_likes (id, proposal_id, user_id) FROM stdin;
20	46	14
\.


--
-- Data for Name: refresh_sessions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.refresh_sessions (id, user_id, refresh_token, expires_in, created_at) FROM stdin;
328	14	1628368010188	123	2021-08-07 23:26:50.190331
329	14	1628368043872	123	2021-08-07 23:27:23.873984
330	14	1628368327351	123	2021-08-07 23:32:07.354351
331	14	1628368639617	123	2021-08-07 23:37:19.619651
332	14	1628455884656	123	2021-08-08 23:51:24.658622
333	14	1628455907604	123	2021-08-08 23:51:47.608703
334	14	1628455912724	123	2021-08-08 23:51:52.726878
335	14	1629136566619	123	2021-08-16 20:56:06.620332
336	14	1629136573030	123	2021-08-16 20:56:13.031294
337	14	1629136828848	123	2021-08-16 21:00:28.849031
338	14	1629136848634	123	2021-08-16 21:00:48.635285
339	14	1629139065440	123	2021-08-16 21:37:45.440834
340	14	1629139773815	123	2021-08-16 21:49:33.815641
341	14	1629139828912	123	2021-08-16 21:50:28.912955
342	14	1629139834080	123	2021-08-16 21:50:34.080816
343	14	1629139927328	123	2021-08-16 21:52:07.330372
344	14	1629139930045	123	2021-08-16 21:52:10.047042
345	14	1629139943628	123	2021-08-16 21:52:23.629601
346	14	1629139959593	123	2021-08-16 21:52:39.593621
347	14	1629140036686	123	2021-08-16 21:53:56.687973
348	14	1629140075000	123	2021-08-16 21:54:35.000788
349	14	1629140149720	123	2021-08-16 21:55:49.720488
350	14	1629140349760	123	2021-08-16 21:59:09.760301
351	14	1629140380201	123	2021-08-16 21:59:40.207893
352	14	1629141406412	123	2021-08-16 22:16:46.413182
353	14	1629142253230	123	2021-08-16 22:30:53.230498
354	14	1629142560153	123	2021-08-16 22:36:00.15372
355	14	1629142707196	123	2021-08-16 22:38:27.19693
356	14	1629142897776	123	2021-08-16 22:41:37.777067
357	14	1629142932947	123	2021-08-16 22:42:12.949872
358	14	1629142993242	123	2021-08-16 22:43:13.24351
359	14	1629144040186	123	2021-08-16 23:00:40.18785
360	14	1629144215662	123	2021-08-16 23:03:35.662272
361	14	1629144320427	123	2021-08-16 23:05:20.427563
362	14	1629144382852	123	2021-08-16 23:06:22.85338
\.


--
-- Data for Name: tags; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.tags (id, tag, proposal_id) FROM stdin;
0	mobile	45
1	desktop	46
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (id, login, password, access_token, username, avatar_filename) FROM stdin;
14	test	1234	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE0LCJpYXQiOjE2MjkxNDQzODIsImV4cCI6MTYyOTc0NDM4Mn0.DhXYi6wpLce9xjMVHExI-c_38BbQ4J4inbFuso3yceM	test	7Z8mYCBxuEaKqYyK0f9CQ
\.


--
-- Name: comment_attachments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.comment_attachments_id_seq', 11, true);


--
-- Name: comment_dislikes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.comment_dislikes_id_seq', 13, true);


--
-- Name: comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.comments_id_seq', 34, true);


--
-- Name: comments_likes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.comments_likes_id_seq', 23, true);


--
-- Name: proposal_attahments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.proposal_attahments_id_seq', 22, true);


--
-- Name: proposals_dislikes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.proposals_dislikes_id_seq', 18, true);


--
-- Name: proposals_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.proposals_id_seq', 46, true);


--
-- Name: proposals_likes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.proposals_likes_id_seq', 20, true);


--
-- Name: refresh_sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.refresh_sessions_id_seq', 362, true);


--
-- Name: tags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.tags_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 14, true);


--
-- Name: comment_attachments comment_attachments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comment_attachments
    ADD CONSTRAINT comment_attachments_pkey PRIMARY KEY (id);


--
-- Name: comments_dislikes comment_dislikes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments_dislikes
    ADD CONSTRAINT comment_dislikes_pkey PRIMARY KEY (id);


--
-- Name: comments_likes comments_likes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments_likes
    ADD CONSTRAINT comments_likes_pkey PRIMARY KEY (id);


--
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- Name: proposal_attachments proposal_attahments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.proposal_attachments
    ADD CONSTRAINT proposal_attahments_pkey PRIMARY KEY (id);


--
-- Name: proposals_dislikes proposals_dislikes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.proposals_dislikes
    ADD CONSTRAINT proposals_dislikes_pkey PRIMARY KEY (id);


--
-- Name: proposals_likes proposals_likes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.proposals_likes
    ADD CONSTRAINT proposals_likes_pkey PRIMARY KEY (id);


--
-- Name: proposals proposals_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.proposals
    ADD CONSTRAINT proposals_pkey PRIMARY KEY (id);


--
-- Name: tags tags_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: proposals author_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.proposals
    ADD CONSTRAINT author_id FOREIGN KEY (author_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: comments author_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT author_id FOREIGN KEY (author_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: comments_likes comment_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments_likes
    ADD CONSTRAINT comment_id FOREIGN KEY (comment_id) REFERENCES public.comments(id) ON DELETE CASCADE;


--
-- Name: comments_dislikes comment_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments_dislikes
    ADD CONSTRAINT comment_id FOREIGN KEY (comment_id) REFERENCES public.comments(id) ON DELETE CASCADE;


--
-- Name: comment_attachments comment_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comment_attachments
    ADD CONSTRAINT comment_id FOREIGN KEY (comment_id) REFERENCES public.comments(id) ON DELETE CASCADE;


--
-- Name: comments parent_comment_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT parent_comment_id FOREIGN KEY (parent_comment_id) REFERENCES public.comments(id) ON DELETE CASCADE NOT VALID;


--
-- Name: comments proposal_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT proposal_id FOREIGN KEY (proposal_id) REFERENCES public.proposals(id) ON DELETE CASCADE;


--
-- Name: proposals_likes proposal_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.proposals_likes
    ADD CONSTRAINT proposal_id FOREIGN KEY (proposal_id) REFERENCES public.proposals(id) ON DELETE CASCADE;


--
-- Name: proposals_dislikes proposal_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.proposals_dislikes
    ADD CONSTRAINT proposal_id FOREIGN KEY (proposal_id) REFERENCES public.proposals(id) ON DELETE CASCADE;


--
-- Name: proposal_attachments proposal_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.proposal_attachments
    ADD CONSTRAINT proposal_id FOREIGN KEY (proposal_id) REFERENCES public.proposals(id) ON DELETE CASCADE;


--
-- Name: tags proposal_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tags
    ADD CONSTRAINT proposal_id FOREIGN KEY (proposal_id) REFERENCES public.proposals(id) NOT VALID;


--
-- Name: refresh_sessions user_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.refresh_sessions
    ADD CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: comments_likes user_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments_likes
    ADD CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: comments_dislikes user_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments_dislikes
    ADD CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: proposals_likes user_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.proposals_likes
    ADD CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: proposals_dislikes user_id; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.proposals_dislikes
    ADD CONSTRAINT user_id FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

