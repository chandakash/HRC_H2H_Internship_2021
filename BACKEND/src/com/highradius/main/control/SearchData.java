package com.highradius.main.control;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.*;
import java.util.ArrayList;
import com.google.gson.Gson;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.highradius.main.model.InvoiceDetail;
import com.highradius.main.database.JdbcConnectionFactory;


public class SearchData extends HttpServlet{
	public void doGet(HttpServletRequest req, HttpServletResponse res) throws IOException
	{
		Gson g=new Gson();
		Long DocId = Long.parseLong(req.getParameter("DocId"));
		System.out.println(DocId);
		ArrayList<InvoiceDetail> values=new ArrayList<>();
		try{
			Connection conn = JdbcConnectionFactory.getConnection();
			Statement stmt=null;
			stmt=conn.createStatement();
			String sql;
			String s= Long.toString(DocId);
			sql="SELECT * FROM invoice_details WHERE doc_id LIKE '"+s+"%'";
			
			ResultSet rs=stmt.executeQuery(sql);
			System.out.println(sql);
			
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
			System.out.println(values);
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
		PrintWriter out= res.getWriter();
		String d=g.toJson(values);
		out.println(d);
		out.flush();
		out.close();
	}
}
