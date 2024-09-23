const BASE_URL = "http://127.0.0.1:5000";

const API_URLS = {
  unbookedTransactions: function () {
    return BASE_URL + "/api/unbooked-transactions";
  },
  paymentTrackerWeekly: function () {
    return BASE_URL + "/api/payment-tracking-weekly";
  },
  clientSummary: function () {
    return BASE_URL + "/api/client-table";
  },
  paymentTracking: function () {
    return BASE_URL + "/api/payment-tracking";
  },
  generalDetails: function () {
    return BASE_URL + "/api/general-details";
  },
  financialTransactionPerClient: function (clientCode) {
    return BASE_URL + `/api/financial-transaction/${clientCode}`;
  },
  bankTransactionDetailPerClient: function (clientCode) {
    return BASE_URL + `/api/transaction-bank-details/${clientCode}`;
  },
  invoiceDetailPerClient: function (clientCode) {
    return BASE_URL + `/api/transaction-invoice-details/${clientCode}`;
  },
  bankAndInvoiceDetailsPerClient: function (clientCode) {
    return BASE_URL + `/api/bank-and-invoice-details-time-period/${clientCode}`;
  },
};

export { BASE_URL, API_URLS };
