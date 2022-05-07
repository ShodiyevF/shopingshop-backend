create database shopingshop;


drop table if exists users cascade;
create table users(
    user_id int generated always as identity primary key,
    user_name varchar(30) not null,
    user_surname varchar(33) not null,
    user_phone text not null,
    user_role smallint default 1
);

drop table if exists products cascade;
create table products(
    products_id int generated always as identity primary key,
    products_name varchar(30) not null,
    products_description text not null,
    products_price text not null
);

drop table if exists orders cascade;
create table orders(
    order_id int generated always as identity primary key,
    order_gettime timestamp with time zone default current_timestamp,
    order_address text not null,
    order_count smallint not null,
    products_id int not null references products(products_id)
);