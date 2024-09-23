const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

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
    return BASE_URL + `/api/financial-transaction?account_code=${clientCode}`;
  },
  bankTransactionDetailPerClient: function (clientCode) {
    return (
      BASE_URL + `/api/transaction-bank-details?account_code=${clientCode}`
    );
  },
  invoiceDetailPerClient: function (clientCode) {
    return (
      BASE_URL + `/api/transaction-invoice-details?account_code=${clientCode}`
    );
  },
  bankAndInvoiceDetailsPerClient: function (clientCode) {
    return (
      BASE_URL +
      `/api/bank-and-invoice-details-time-period?account_code=${clientCode}`
    );
  },
};

export { BASE_URL, API_URLS };
