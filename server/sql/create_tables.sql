SET FOREIGN_KEY_CHECKS = 0;
drop table if exists borrowgroups;
drop table if exists users;
drop table if exists items;
drop table if exists borrowed;
drop table if exists returned;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE borrowgroups (
    groupid int PRIMARY KEY,
    groupname VARCHAR(60)
);

CREATE TABLE users (
    userid VARCHAR(60),
    groupid int,
    PRIMARY KEY (userid, groupid),
    FOREIGN KEY (groupid) REFERENCES borrowgroups(groupid)
);

CREATE TABLE items (
    itemname VARCHAR(60),
    groupid int,
    remaining int,
    total int,
    itemtype CHAR(1),
    PRIMARY KEY (itemname, groupid),
    FOREIGN KEY (groupid) REFERENCES borrowgroups(groupid)
);

CREATE TABLE borrowed (
    borrowid int PRIMARY KEY,
    itemname VARCHAR(60),
    groupid int,
    userid VARCHAR(60),
    amount int,
    borrowdate DATETIME,
    FOREIGN KEY (groupid) REFERENCES borrowgroups(groupid),
    FOREIGN KEY (userid) REFERENCES users(userid),
    FOREIGN KEY (itemname) REFERENCES items(itemname)
);

CREATE TABLE returned (
    returnid int PRIMARY KEY,
    borrowid int,
    amount int,
    returndate DATETIME,
    FOREIGN KEY (borrowid) REFERENCES borrowed(borrowid)
);