package com.highradius.main.control;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.*;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.highradius.main.database.JdbcConnectionFactory;

public class DeleteData extends HttpServlet{
	public void doPost(HttpServletRequest req, HttpServletResponse res) throws IOException
	{
		res.setContentType("text/html;charset=UTF-8");
		String[] DocId = req.getParameterValues("ids");
		
//		System.out.println("old"+DocId[0]);
//		System.out.println("new"+DocId);
		try{
			Connection conn = JdbcConnectionFactory.getConnection();
			Statement stmt=null;
			stmt=conn.createStatement();
			String sql;
			for(int i=0;i< DocId.length ;i++)
			{
				sql="DELETE FROM invoice_details WHERE invoice_id = "+DocId[i];
				stmt.executeUpdate(sql);
			}
			
			stmt.close();
			conn.close();
		}
		catch (SQLException se) {
			se.printStackTrace();
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		PrintWriter out= res.getWriter();
//		out.println("Successfully Deleted!!");
		out.flush();
		out.close();
	}
}
