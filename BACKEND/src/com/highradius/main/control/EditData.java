package com.highradius.main.control;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.*;
import com.google.gson.Gson;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.highradius.main.database.JdbcConnectionFactory;

public class EditData extends HttpServlet{
	public void doPost(HttpServletRequest req, HttpServletResponse res) throws IOException
	{
		Gson g=new Gson();
		Long DocId = Long.parseLong(req.getParameter("DocId"));
		Double amt = Double.parseDouble(req.getParameter("Amount"));
		String notes = req.getParameter("Notes");
		try{
			Connection conn = JdbcConnectionFactory.getConnection();
			Statement stmt=null;
			stmt=conn.createStatement();
			String sql;
			sql="UPDATE invoice_details set notes ='"+notes+"',total_open_amount  ="+amt +" WHERE doc_id = "+DocId;
			stmt.executeUpdate(sql);
			stmt.close();
			conn.close();
			System.out.println("Done!");
		}
		catch (SQLException se) {
			se.printStackTrace();
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		PrintWriter out= res.getWriter();
		out.println("Data Updated successfully!!! ");
		out.flush();
		out.close();
	}
}
