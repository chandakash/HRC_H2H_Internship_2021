//This is our POJO 
package com.highradius.main.model;

import java.sql.Date;
import java.sql.Timestamp;


public class InvoiceDetail {
	private String businessCode;
	private String custNumber;
	private String nameCustomer;
	private Timestamp clearDate;
	private Short businessYear;
	private Long docId;
	private Date postingDate;
	private Date documentCreateDate;
	private Date dueInDate;
	private String invoiceCurrency;
	private String documentType;
	private Short postingId;
	private String areaBusiness;
	private Double totalOpenAmount;
	private Date baselineCreateDate;
	private String custPaymentTerms;
	private Long invoiceId;
	private Byte isOpen;
	private String notes;
	
	public String getNotes() {
		return notes;
	}

	public void setNotes(String notes) {
		this.notes = notes;
	}

	public InvoiceDetail()
	{
		
	}
	
	public InvoiceDetail(String businessCode, String custNumber, String nameCustomer, Timestamp clearDate,
			Short businessYear, Long docId, Date posting_date, Date documentCreateDate, Date dueInDate,
			String invoiceCurrency, String documentType, Short postingId, String areaBusiness, Double totalOpenAmount,
			Date baselineCreateDate, String custPaymentTerms, Long invoiceId, Byte isOpen, String notes) {
		
		super();
		
		this.businessCode = businessCode;
		this.custNumber = custNumber;
		this.nameCustomer = nameCustomer;
		this.clearDate = clearDate;
		this.businessYear = businessYear;
		this.docId = docId;
		this.postingDate = posting_date;
		this.documentCreateDate = documentCreateDate;
		this.dueInDate = dueInDate;
		this.invoiceCurrency = invoiceCurrency;
		this.documentType = documentType;
		this.postingId = postingId;
		this.areaBusiness = areaBusiness;
		this.totalOpenAmount = totalOpenAmount;
		this.baselineCreateDate = baselineCreateDate;
		this.custPaymentTerms = custPaymentTerms;
		this.invoiceId = invoiceId;
		this.isOpen = isOpen;
		this.notes = notes;
	}

	public String getBusinessCode() {
		return businessCode;
	}

	public void setBusinessCode(String businessCode) {
		this.businessCode = businessCode;
	}

	public String getCustNumber() {
		return custNumber;
	}

	public void setCustNumber(String custNumber) {
		this.custNumber = custNumber;
	}

	public String getNameCustomer() {
		return nameCustomer;
	}

	public void setNameCustomer(String nameCustomer) {
		this.nameCustomer = nameCustomer;
	}

	public Timestamp getClearDate() {
		return clearDate;
	}

	public void setClearDate(Timestamp clearDate) {
		this.clearDate = clearDate;
	}

	public Short getBusinessYear() {
		return businessYear;
	}

	public void setBusinessYear(Short businessYear) {
		this.businessYear = businessYear;
	}

	public Long getDocId() {
		return docId;
	}

	public void setDocId(Long docId) {
		this.docId = docId;
	}

	public Date getPostingDate() {
		return postingDate;
	}

	public void setPostingDate(Date posting_date) {
		this.postingDate = posting_date;
	}

	public Date getDocumentCreateDate() {
		return documentCreateDate;
	}

	public void setDocumentCreateDate(Date documentCreateDate) {
		this.documentCreateDate = documentCreateDate;
	}

	public Date getDueInDate() {
		return dueInDate;
	}

	public void setDueInDate(Date dueInDate) {
		this.dueInDate = dueInDate;
	}

	public String getInvoiceCurrency() {
		return invoiceCurrency;
	}

	public void setInvoiceCurrency(String invoiceCurrency) {
		this.invoiceCurrency = invoiceCurrency;
	}

	public String getDocumentType() {
		return documentType;
	}

	public void setDocumentType(String documentType) {
		this.documentType = documentType;
	}

	public Short getPostingId() {
		return postingId;
	}

	public void setPostingId(Short postingId) {
		this.postingId = postingId;
	}

	public String getAreaBusiness() {
		return areaBusiness;
	}

	public void setAreaBusiness(String areaBusiness) {
		this.areaBusiness = areaBusiness;
	}

	public Double getTotalOpenAmount() {
		return totalOpenAmount;
	}

	public void setTotalOpenAmount(Double totalOpenAmount) {
		this.totalOpenAmount = totalOpenAmount;
	}

	public Date getBaselineCreateDate() {
		return baselineCreateDate;
	}

	public void setBaselineCreateDate(Date baselineCreateDate) {
		this.baselineCreateDate = baselineCreateDate;
	}

	public String getCustPaymentTerms() {
		return custPaymentTerms;
	}

	public void setCustPaymentTerms(String custPaymentTerms) {
		this.custPaymentTerms = custPaymentTerms;
	}

	public Long getInvoiceId() {
		return invoiceId;
	}

	public void setInvoiceId(Long invoiceId) {
		this.invoiceId = invoiceId;
	}

	public Byte getIsOpen() {
		return isOpen;
	}

	public void setIsOpen(Byte isOpen) {
		this.isOpen = isOpen;
	}

}
