package com.highradius.main.control;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import com.google.gson.Gson;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.highradius.main.database.JdbcConnectionFactory;
import com.highradius.main.model.InvoiceDetail;

public class UpdatePage extends HttpServlet{
	public void doGet(HttpServletRequest req, HttpServletResponse res) throws IOException
	{
		res.setContentType("text/html;charset=UTF-8");
		
		int len = 1;
		Gson g=new Gson();
		int PgNo = (int) Long.parseLong(req.getParameter("PageNo"));
		ArrayList<InvoiceDetail> values=new ArrayList<>();
		try{
			Connection conn = JdbcConnectionFactory.getConnection();
			Statement stmt=null;
			stmt=conn.createStatement();
			String sql;
			sql="SELECT * FROM invoice_details";
			ResultSet rs=stmt.executeQuery(sql);
			System.out.println(PgNo);
			 
			 while(rs.next()) {
				 InvoiceDetail temp=new InvoiceDetail();
					        
				 	temp.setNameCustomer(rs.getString("name_customer"));
				 	temp.setCustNumber(rs.getString("cust_number"));
				 	temp.setInvoiceId(rs.getLong("invoice_id"));
				 	temp.setTotalOpenAmount(rs.getDouble("total_open_amount"));
				 	temp.setDueInDate(rs.getDate("due_in_date"));
			    	temp.setNotes(rs.getString("notes"));
						
				 values.add(temp);
			 }
			rs = stmt.executeQuery("SELECT COUNT(*) FROM invoice_details");
			rs.next();
			len = rs.getInt(1);
			rs.close();
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
		if (PgNo>len/50)
		{
			List<InvoiceDetail> subset = new ArrayList<>();
			subset = values.subList(len-50,len);
			PrintWriter out= res.getWriter();
			String d=g.toJson(subset);
			out.println(d);
			out.flush();
			out.close();
		}
		else {
			List<InvoiceDetail> subset = new ArrayList<>();
			subset = values.subList((PgNo-1)*50,PgNo*50);
			PrintWriter out= res.getWriter();
			String d=g.toJson(subset);
			out.println(d);
			out.flush();
			out.close();
		}
	}
}
