//Starting application
package com.highradius.main;

import com.highradius.main.control.DataLoader;

public class InvoiceDetailApplication {
	public static void main(String args[])
	{
		DataLoader dataLoader = new DataLoader();
		boolean isCsvUploaded = dataLoader.isFileAlreadyUploaded();
		if(isCsvUploaded)
			System.out.println("The file has been already uploaded.");
		else {
			System.out.println("Inserting data.........Please Wait!");
			dataLoader.uploadCsvToDatabase();
		}
	System.out.println("That's all done ....");
	}
}
