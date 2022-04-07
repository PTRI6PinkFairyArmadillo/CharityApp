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
CREATE EXTENSION pgcrypto;

CREATE TABLE public.charities (
    "_id" serial PRIMARY KEY,
    "name" varchar NOT NULL,
    "city" varchar NOT NULL,
    "country" varchar NOT NULL,
    "logoURL" varchar NOT NULL,
    "url" varchar NOT NULL,
);
CREATE TABLE public.users (
    "_id" serial PRIMARY KEY,
    "first_name" varchar NOT NULL,
    "last_name" varchar NOT NULL,
    "username" varchar NOT NULL,
    "password" TEXT NOT NULL,
);
CREATE TABLE public.bank_accounts (
    "_id" serial PRIMARY KEY,
    "account_id" varchar NOT NULL,
    "account_number" varchar NOT NULL,
    "bank_name" varchar NOT NULL,
    "official_name" varchar NOT NULL,
    "routing" varchar NOT NULL,
    "wire_routing" varchar NOT NULL
);

-- JOIN TABLES
CREATE TABLE public.user_bank_accounts (
    "_id" serial PRIMARY KEY,
    "user_id" bigint NOT NULL,
    "bank_account_id" bigint NOT NULL
);
CREATE TABLE public.user_favorited_charities (
    "_id" serial PRIMARY KEY,
    "user_id" bigint NOT NULL,
    "charity_id" bigint NOT NULL
);