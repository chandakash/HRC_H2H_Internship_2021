package com.highradius.main.control;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.*;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.highradius.main.database.JdbcConnectionFactory;
import com.highradius.main.model.InvoiceDetail;

public class AddData extends HttpServlet{
	public void doPost(HttpServletRequest req, HttpServletResponse res) throws IOException
	{
		InvoiceDetail temp = new InvoiceDetail();
		temp.setDocId(Long.parseLong(req.getParameter("DocId")));
		temp.setNameCustomer(req.getParameter("CName"));
		temp.setCustNumber(req.getParameter("CNo"));
		temp.setTotalOpenAmount(Double.parseDouble(req.getParameter("Amount")));
		temp.setClearDate(Timestamp.valueOf(req.getParameter("ClearDate")));
		String Note = req.getParameter("Notes");
		try{
			Connection conn = JdbcConnectionFactory.getConnection();
			Statement stmt=null;
			stmt=conn.createStatement();
			String sql;
			
			sql="INSERT INTO invoice_details(invoice_id,doc_id,name_customer,cust_number,total_open_amount,clear_date,notes)VALUES(";
			sql=sql+temp.getDocId()+",";
			sql=sql+temp.getDocId()+",'";
			sql=sql+temp.getNameCustomer()+"','";
			sql=sql+temp.getCustNumber()+"',";
			sql=sql+temp.getTotalOpenAmount()+",'";
			sql=sql+temp.getClearDate()+"','";
			sql=sql+Note+"')";
			System.out.println(sql);
			stmt.executeUpdate(sql);
			
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
		out.println("Successfully Added!!");
		out.flush();
		out.close();
	}
}
