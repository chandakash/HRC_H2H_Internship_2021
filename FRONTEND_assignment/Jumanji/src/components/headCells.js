export const headCells = [
    {
      id: "customer_name",
      numeric: false,
      disablePadding: true,
      label: "Customer Name",
    },
    {
      id: "customer_no",
      numeric: false,
      disablePadding: false,
      label: "Customer #",
    },
    {
      id: "invoiceId",
      numeric: false,
      disablePadding: false,
      label: "Bill #",
    },
    {
      id: "invoice_amt",
      numeric: true,
      disablePadding: false,
      label: "Bill Amount",
    },
    {
    id: "due_in_date",
    numeric: true,
    disablePadding: false,
    label: "Due In Date",
    },
    {
        id: "Predicted_payment_date",
        numeric: true,
        disablePadding: false,
        label: "Predicted Payment Date",
    },
    {
        id: "Predicted_aging_bucket",
        numeric: false,
        disablePadding: false,
        label: "Predicted Aging Bucket",
    },
    { id: "notes",
      numeric: false,
      disablePadding: false,
      label: "Notes" 
    },
  ];
