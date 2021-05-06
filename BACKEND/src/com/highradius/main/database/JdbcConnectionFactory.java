// Here JDBC is done
package com.highradius.main.database;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;


public class JdbcConnectionFactory {

	static final String JDBC_DRIVER = "com.mysql.cj.jdbc.Driver";
	static final String DB_URL = "jdbc:mysql://localhost/h2h_internship";
	// Database credentials
	static final String USER = "root";
	static final String PASS = "root";
	
	public static Connection getConnection() {
		try {
			
			
			//Register JDBC driver
			Class.forName("com.mysql.cj.jdbc.Driver"); // this might throw classNotFoundException
			//Open a connection 
			return DriverManager.getConnection(DB_URL,USER,PASS);
			
			
		} catch (ClassNotFoundException ce) {//checked exception
			//generally JVM internally throw the exception .
			throw new RuntimeException("MySql Driver Not found"); //custom exception to manually throw it.
		} catch (SQLException ex) {
			throw new RuntimeException("Error connecting to the database", ex);
		}
		catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException("Error!");
		}
		
	}
}
