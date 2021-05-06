//Controller of Application
package com.highradius.main.control;

import java.io.File;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import com.highradius.main.database.JdbcConnectionFactory;
import com.highradius.main.serviceImpl.InvoiceServiceImpl;

public class DataLoader {

	private InvoiceServiceImpl invoiceServiceimpl;
	private final String FILE_NAME = "resources/csv/1805096.csv";

	public DataLoader() {
		this.invoiceServiceimpl = new InvoiceServiceImpl();//memory allocation
	}

	public void uploadCsvToDatabase() {
		File csvFile = new File(FILE_NAME);
		invoiceServiceimpl.insertAllInvoiceRecords(csvFile);
	}

	public boolean isFileAlreadyUploaded() {
		Connection conn = JdbcConnectionFactory.getConnection();
		Statement statement = null;
		ResultSet resultSet = null;
		try {
			statement = conn.createStatement();
			resultSet = statement.executeQuery("SELECT COUNT(*) AS 'rows_num' FROM invoice_details");
			if (resultSet.next()) {
				int numberOfRows = resultSet.getInt("rows_num");
				if (numberOfRows == 0)
					return false;
			}

		} catch (SQLException ex) {
			ex.printStackTrace();
		} finally {
			try {
				conn.close();
				statement.close();
				resultSet.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}

		}
		return true;
	}
}
