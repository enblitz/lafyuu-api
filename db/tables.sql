-- table name : user
CREATE TABLE user (
    userid int,
    firstname varchar(255),
    lastname varchar(255),
    email varchar(255),
    phoneno varchar(255),
    address varchar(255),
    city varchar(255),
    verified_email varchar(255),
    verified_phone varchar(255),
    profilepic varchar(255)
);

CREATE TABLE user_token (
    usertokenid int,
    userid int,
    access_token varchar(255)
);

