create database brumu;
use brumu;

 use brumu;

create table contato (
id_contato int primary key auto_increment,
nome varchar(200) not null,    
email varchar(200) not null,
telefone varchar(200),
assunto varchar(200) not null,
mensagem varchar (500) not null);

create table cadastro (
id_cadastro int primary key auto_increment,
nomecompleto varchar(200) not null,
email varchar(200) not null,
telefone varchar(200),
cpf varchar(200),
senha varchar(200) not null,
confirmarsenha varchar(200) not null,
id_login int);

create table contato2 (
id_contato int primary key auto_increment,
nome varchar(200) not null,    
email varchar(200) not null,
assunto varchar(200) not null,
mensagem varchar (500) not null);


