# Spider_Tasks
First I created Login page then went through Registration page, for these 2 I created database using mysql.
Next was the admin redirecting page and student redirecting page. I created another table in database for adding and displaying notes.

The server I use is localhost. In that I created a database name login with 2 tables namely, test and notice.
Test has the information about username, rollnumber, id and hashed passwords.
While notice has information about notice descriptions.

Build Instructions
Setup wamp server by downloading from http://www.wampserver.com/en/ and installing.
Use these SQL in localhost/phpmyadmin in your newly created database login
notice	CREATE TABLE `notice` (
 `id` int(10) NOT NULL AUTO_INCREMENT,
 `subject` varchar(50) NOT NULL,
 `note` varchar(500) NOT NULL,
 `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
 PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=latin1

test	CREATE TABLE `test` (
 `id` int(10) NOT NULL AUTO_INCREMENT,
 `rollnumber` varchar(50) NOT NULL,
 `username` varchar(50) NOT NULL,
 `password` varchar(50) NOT NULL,
 PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=24 DEFAULT CHARSET=latin1

Copy the other php codes to www directory and open it via localhost/*folder_name*
