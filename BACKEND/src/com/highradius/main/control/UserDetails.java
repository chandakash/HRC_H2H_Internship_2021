package com.highradius.main.control;

import java.io.IOException;
//import java.io.PrintStream;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

//import org.apache.jasper.tagplugins.jstl.core.Out;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
//import com.google.gson.JsonObject;
import com.highradius.main.model.InvoiceDetail;

//@WebServlet(urlPatterns= {"/users"}, name="UserServlet", description="UserServlet returns json")
@WebServlet("/secondScreen1/*")
public class UserDetails extends HttpServlet {
		
	private static final long serialVersionUID = 1L;
	String jsonObj;
	String custNum;
	protected void service(HttpServletRequest request, HttpServletResponse response)throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        custNum = request.getPathInfo().substring(1);
        try {
    	   String jsonObj1 = getJson();
    	   out.println(jsonObj1);
    	 
        }
        catch(Exception e) {
        	e.printStackTrace();
        	}
        }

	protected String getJson() throws ServletException, IOException {
   
        String url = "jdbc:mysql://localhost/h2h_internship";
        String username = "root";
        String password = "root";
        // PrintWriter out=response.getWriter();
        Connection conn=null;
     try{
       
      Class.forName("com.mysql.cj.jdbc.Driver");
      conn = DriverManager.getConnection(url,username,password);
      System.out.println(custNum);
      //Creating the Statement
      Statement stmt = conn.createStatement();
      //Retrieving the records
//      b. Customer Name
//      c. Customer Number (Customer #)
//      d. Invoice Number (Invoice #)
//      e. Invoice Amount
//      f. Due Date
//      g. Predicted Payment Date
//      h. Predicted Aging Bucket
//      i. Notes
      ResultSet rs = stmt.executeQuery("SELECT `name_customer`,`cust_number`,`invoice_id`,`total_open_amount`,`due_in_date`,`notes` from invoice_details");
      
      ArrayList<InvoiceDetail> al = new ArrayList<InvoiceDetail>();
      
      while (rs.next()) {
           
    	InvoiceDetail p= new InvoiceDetail();
        
    	p.setNameCustomer(rs.getString("name_customer"));
    	p.setCustNumber(rs.getString("cust_number"));
    	p.setInvoiceId(rs.getLong("invoice_id"));
    	p.setTotalOpenAmount(rs.getDouble("total_open_amount"));
    	p.setDueInDate(rs.getDate("due_in_date"));
    	p.setNotes(rs.getString("notes"));
    	
        al.add(p);
      }
       
      System.out.println(al);
      //builder.setPrettyPrinting(); 
         
      //Gson gson = builder.create(); 
//          Gson gson=new Gson();
//          data=gson.toJson(al);
//        
//     out.print(data);
      GsonBuilder gsonBuilder = new GsonBuilder();
      Gson gson = gsonBuilder.create();
      jsonObj = gson.toJson(al);
      return jsonObj;
     } catch (SQLException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	} catch (ClassNotFoundException e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}finally {
		try {
			conn.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	return jsonObj;
     }
}