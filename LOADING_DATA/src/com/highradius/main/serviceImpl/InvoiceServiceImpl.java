// Here main logic implementation of parsing and uploading.
package com.highradius.main.serviceImpl;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.sql.Types;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.Map;
import com.highradius.main.database.JdbcConnectionFactory;
import com.highradius.main.model.InvoiceDetail;



public class InvoiceServiceImpl {

	private final int BATCH_SIZE = 50;
	String value = "";

	public boolean insertAllInvoiceRecords(File file) {
		try {
			FileReader fileReader = new FileReader(file);
			BufferedReader br = new BufferedReader(fileReader);
			String row[] = br.readLine().split(",");// to get table headers.
			row[8] = "document_create_date.1";//to rename document_create_date to document_create_date.1
			System.out.println(row.length);
			
			// to map each column name to an index.
			Map<String, Integer> columnNameToIndexMapper = new HashMap<>();
			for (int i = 0; i < row.length; i++) {
				columnNameToIndexMapper.put(row[i], i);
			}
			insertAllInvoiceRecordsBatch(br, columnNameToIndexMapper);
		} catch (FileNotFoundException fle) {
			System.out.println("The " + file.getName() + " cannot be read");
		} catch (IOException e) {
			// TODO: handle exception
		}
		return false;
	}

	
	private void insertAllInvoiceRecordsBatch(BufferedReader br, Map<String, Integer> columnNameToIndexMapper) {
		// main sql insert query to perform.
		final String query = "INSERT INTO invoice_details "
				+ "(business_code, cust_number, name_customer, clear_date, business_year, doc_id, posting_date, "
				+ "document_create_date, due_in_date, invoice_currency, document_type, "
				+ "posting_id, area_business, total_open_amount, baseline_create_date, cust_payment_terms, "
				+ "invoice_id, isOpen) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?)";
		Connection conn = null;
		PreparedStatement psInsert = null;
		InvoiceDetail invoiceDetail = null;
		
		String line = null;
		String row[] = null;
		
		int countBatchSize = 0;// to keep count of our batch size
		try {
			conn = JdbcConnectionFactory.getConnection();
			psInsert = conn.prepareStatement(query);
			while ((line = br.readLine()) != null) {
				row = line.split(","); // splitting at , to store string array for each row.
				invoiceDetail = setInvoiceDetails(row, columnNameToIndexMapper);//setting each row value into our pojo
				if(invoiceDetail!=null)
				{
					countBatchSize++;

					psInsert.setString(1, invoiceDetail.getBusinessCode());
					psInsert.setString(2, invoiceDetail.getCustNumber());
					psInsert.setString(3, invoiceDetail.getNameCustomer());
					psInsert.setTimestamp(4, invoiceDetail.getClearDate());

					if (invoiceDetail.getBusinessYear() == null)
						psInsert.setNull(5, Types.SMALLINT);// to tell the original datatype is smallint
					else
						psInsert.setShort(5, invoiceDetail.getBusinessYear());

					psInsert.setLong(6, invoiceDetail.getDocId());
					psInsert.setDate(7, invoiceDetail.getPostingDate());
					psInsert.setDate(8, invoiceDetail.getDocumentCreateDate());
					psInsert.setDate(9, invoiceDetail.getDueInDate());
					psInsert.setString(10, invoiceDetail.getInvoiceCurrency());
					psInsert.setString(11, invoiceDetail.getDocumentType());

					if (invoiceDetail.getPostingId() == null)
						psInsert.setNull(12, Types.TINYINT);
					else
						psInsert.setShort(12, invoiceDetail.getPostingId());

					psInsert.setString(13, invoiceDetail.getAreaBusiness());

					if (invoiceDetail.getTotalOpenAmount() == null)
						psInsert.setNull(14, Types.DOUBLE);
					else
						psInsert.setDouble(14, invoiceDetail.getTotalOpenAmount());

					psInsert.setDate(15, invoiceDetail.getBaselineCreateDate());
					psInsert.setString(16, invoiceDetail.getCustPaymentTerms());

					if (invoiceDetail.getInvoiceId() == null)
						psInsert.setNull(17, Types.BIGINT);
					else
						psInsert.setLong(17, invoiceDetail.getInvoiceId());

					if (invoiceDetail.getIsOpen() == null)
						psInsert.setNull(18, Types.SMALLINT);
					else
						psInsert.setByte(18, invoiceDetail.getIsOpen());

					psInsert.addBatch();

					if (countBatchSize % BATCH_SIZE == 0) {
						psInsert.executeBatch();
						System.out.println(countBatchSize + " Records Uploaded..");
					}

				}
				psInsert.executeBatch();
	
			}
				
		} catch (NullPointerException ne) {
			ne.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (NumberFormatException nfe) {
			System.out.println("Unable to parse string.");
			nfe.printStackTrace();
		} catch (SQLException se) {
			se.printStackTrace();
		} finally {
			try {
				conn.close();
				psInsert.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}

		}
	}

	// 
	private InvoiceDetail setInvoiceDetails(String row[], Map<String, Integer> columnNameToIndexMapper) {

		InvoiceDetail invoiceDetail = null;
		String docId = row[columnNameToIndexMapper.get("doc_id")];
		try {
			if (!docId.isEmpty()) {// because primary key can't be null so we will fill data only of not null docID.

				invoiceDetail = new InvoiceDetail();
				docId = docId.substring(0, docId.lastIndexOf('.'));//to prevent NumberFormatException
				invoiceDetail.setDocId(Long.parseLong(docId));

				value = row[columnNameToIndexMapper.get("business_code")];

				if (!value.isEmpty())
					invoiceDetail.setBusinessCode(value);
				else
					invoiceDetail.setBusinessCode(null);

				value = row[columnNameToIndexMapper.get("name_customer")];
				
				if (!value.isEmpty())
					invoiceDetail.setNameCustomer(value);
				else
					invoiceDetail.setNameCustomer(null);
				value = row[columnNameToIndexMapper.get("cust_number")];
				
				if (!value.isEmpty())

					invoiceDetail.setCustNumber(value);
				else
					invoiceDetail.setCustNumber(null);

				value = row[columnNameToIndexMapper.get("clear_date")];
				if (!value.isEmpty()) {
					Timestamp clearDateTimestamp = Timestamp.valueOf(value);
					invoiceDetail.setClearDate(clearDateTimestamp);
				} else
					invoiceDetail.setClearDate(null);

				value = row[columnNameToIndexMapper.get("buisness_year")];
				if (!value.isEmpty()) {

					value = value.substring(0, value.lastIndexOf('.'));
					invoiceDetail.setBusinessYear(Short.parseShort(value));
				} else
					invoiceDetail.setBusinessYear(null);
				value = row[columnNameToIndexMapper.get("posting_date")];
				if (!value.isEmpty()) {
					Date postingDate = Date.valueOf(value);
					invoiceDetail.setPostingDate(postingDate);
				} else
					invoiceDetail.setPostingDate(null);

				value = row[columnNameToIndexMapper.get("document_create_date.1")];
				if (!value.isEmpty()) {
					Date date = toDateFormat(value);
					invoiceDetail.setDocumentCreateDate(date);
				} else
					invoiceDetail.setDocumentCreateDate(null);

				value = row[columnNameToIndexMapper.get("due_in_date")];
				if (!value.isEmpty()) {
					Date date = toDateFormat(value);
					invoiceDetail.setDueInDate(date);
				} else
					invoiceDetail.setDueInDate(null);

				value = row[columnNameToIndexMapper.get("invoice_currency")];
				if (!value.isEmpty()) {
					invoiceDetail.setInvoiceCurrency(value);
				} else
					invoiceDetail.setInvoiceCurrency(null);

				value = row[columnNameToIndexMapper.get("document type")];
				if (!value.isEmpty()) {
					invoiceDetail.setDocumentType(value);
				} else
					invoiceDetail.setDocumentType(null);

			}

			value = row[columnNameToIndexMapper.get("posting_id")];
			if (!value.isEmpty()) {
				value = value.substring(0, value.lastIndexOf('.'));
				invoiceDetail.setPostingId(Short.parseShort(value));
			} else
				invoiceDetail.setPostingId(null);

			value = row[columnNameToIndexMapper.get("area_business")];
			if (!value.isEmpty()) {

				invoiceDetail.setAreaBusiness(value);
			} else
				invoiceDetail.setAreaBusiness(null);

			value = row[columnNameToIndexMapper.get("total_open_amount")];
			if (!value.isEmpty()) {

				invoiceDetail.setTotalOpenAmount(Double.parseDouble(value));
			} else
				invoiceDetail.setTotalOpenAmount(null);

			value = row[columnNameToIndexMapper.get("baseline_create_date")];
			if (!value.isEmpty()) {
				Date date = toDateFormat(value);
				invoiceDetail.setBaselineCreateDate(date);
			} else
				invoiceDetail.setBaselineCreateDate(null);

			value = row[columnNameToIndexMapper.get("cust_payment_terms")];
			if (!value.isEmpty()) {

				invoiceDetail.setCustPaymentTerms(value);
			} else
				invoiceDetail.setCustNumber(null);

			value = row[columnNameToIndexMapper.get("invoice_id")];
			if (!value.isEmpty()) {
				value = value.substring(0, value.lastIndexOf('.'));
				invoiceDetail.setInvoiceId(Long.parseLong(value));
			} else
				invoiceDetail.setInvoiceId(null);

			value = row[columnNameToIndexMapper.get("isOpen")];
			if (!value.isEmpty()) {
				invoiceDetail.setIsOpen(Byte.parseByte(value));
			} else
				invoiceDetail.setIsOpen(null);
		} catch (NullPointerException e) {
			System.out.println(value);
		}
		return invoiceDetail;
	}

	// to change the raw date to desired date format yyyy-mm-dd
	private Date toDateFormat(String dateTime) {
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
		java.util.Date convertedDate = null;
		Date sqlDate = null;
		try {
			convertedDate = dateFormat.parse(dateTime);
			SimpleDateFormat sdfnewformat = new SimpleDateFormat("yyyy-MM-dd");
			String finalDateString = sdfnewformat.format(convertedDate);
			sqlDate = Date.valueOf(finalDateString);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return sqlDate;
	}
}
