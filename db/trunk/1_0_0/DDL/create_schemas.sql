--liquibase formatted sql
--changeset Ananda:create_schema
CREATE SCHEMA inv;
--rollback drop schema inv

CREATE SCHEMA notices;
--rollback drop schema notices

CREATE SCHEMA plans;
--rollback drop schema plans
