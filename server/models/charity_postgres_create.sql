--
-- PostgreSQL database dump
--

-- Started on 2022-03-30

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

CREATE TABLE public.charities (
    "_id" serial NOT NULL,
    "name" varchar NOT NULL,
)

CREATE TABLE public.users (
    "_id" serial NOT NULL,
    "name" varchar NOT NULL,
    "username" varchar NOT NULL,
    "password" varchar NOT NULL,
)

CREATE TABLE public.bank_accounts (
    "_id" serial NOT NULL,
    "account_number" varchar NOT NULL,
    "bank_name" varchar NOT NULL,
)

CREATE TABLE public.user_bank_accounts (
    "_id" serial NOT NULL,
    "user_id" bigint NOT NULL,
    "bank_account_id" bigint NOT NULL,
)


