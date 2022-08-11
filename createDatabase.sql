
-- Meu Banco de dados sysmanager
-- ------------------------------
CREATE SCHEMA IF NOT EXISTS sysManager;

-- marcar banco de dados para uso
-- ------------------------------
USE sysManager;

-- menha tabela de banco de dados
-- ------------------------------
CREATE TABLE IF NOT EXISTS sysManager.user
(
 `id` char(36) NOT NULL Default 'uuid()' COMMENT 'Identificador unico do registro',
 `userName` varchar(50) NOT NULL COMMENT 'nome de usuário',
 `email` varchar(100) NOT NULL COMMENT 'email do usuário',
 `password` varchar(50) NOT NULL COMMENT 'senha do usuário',
 `active` bit NOT NULL DEFAULT false COMMENT 'indicador se o usuário esta ativo ou inativo',
 `createdDate` DateTime NOT NULL DEFAULT NOW() COMMENT 'Data de criação do usuário',
 `updatedDate` Datetime NULL COMMENT 'Data de alteração do reguistro',
 PRIMARY KEY(`id`)
);

-- -----------------------------------------------------
-- Table `sysManager`.`unity`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS sysManager.unity (
  `id` CHAR(36) not null default 'uuid()' comment 'Identificador do registro',
  `name` varchar(100) not null comment 'Nome do Unidade de produto',
  `active` bit NOT NULL default false comment 'Ativo ou inativo',
  `createdDate` datetime not null default NOW() comment 'data de criação do registro',
  `updatedDate` datetime null  comment 'data de atualização do registro',
  PRIMARY KEY (`id`)
  );

-- ---------------------------
-- tabela de produtos
-- ---------------------------
CREATE TABLE IF NOT EXISTS sysManager.product
(
`id` char(36) NOT NULL DEFAULT 'uuid()' COMMENT 'Identificador unico do registro',
`productCode` varchar(50) NOT NULL COMMENT 'Codigo do produto',
`name` varchar(50) NOT NULL COMMENT 'nome/Descrição do produto',
`productTypeId`  varchar(50) NOT NULL COMMENT 'tipo do produto',
`categoryId`  varchar(50) NOT NULL COMMENT 'categoria do produto',
`unityId`  varchar(50) NOT NULL COMMENT 'unidade de medida do produto',
`costPrice` decimal(15,9) DEFAULT 0  COMMENT 'preço de custo do produto',
`percentage` decimal(15,9) DEFAULT 0  COMMENT 'percentual de venda do produto',
`price` decimal(15,9) DEFAULT 0  COMMENT 'preço final do produto',
`active` bit NOT NULL DEFAULT false COMMENT 'indicador se o usuário esta ativo ou inativo',
`creationDate` DateTime NOT NULL DEFAULT NOW() COMMENT 'data de criação do registro',
`updateDate` DateTime NULL COMMENT 'data de atualização do registro',
PRIMARY KEY(`id`),
CONSTRAINT `fk_producType` FOREIGN KEY (`productTypeId`) REFERENCES sysManager.productType(`id`),
CONSTRAINT `fk_category` FOREIGN KEY (`categoryId`) REFERENCES sysManager.category(`id`),
CONSTRAINT `fk_unity` FOREIGN KEY (`unityId`) REFERENCES sysManager.unity(`id`)
ON DELETE NO ACTION
ON UPDATE NO ACTION
);
