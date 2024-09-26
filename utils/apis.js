const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const API_URLS = {
  finance: {
    unbookedTransactions: function () {
      return BASE_URL + "/api/financial/unbooked-transactions/";
    },
    paymentTrackerWeekly: function () {
      return BASE_URL + "/api/paymenttracker-Weekly-payment-term/";
    },
    clientSummary: function () {
      return BASE_URL + "/api/financial-overview-General-client-table/";
    },
    paymentTracking: function () {
      return BASE_URL + "/api/paymenttracker-Weekly-payment-term/";
    },
    generalDetails: function () {
      return BASE_URL + "/api/financial-overview-General/";
    },
    financialTransactionPerClient: function (clientCode) {
      return ( BASE_URL + `/api/financial-transaction-data-perclient/${clientCode}` 
      );
    },
    bankTransactionDetailPerClient: function (clientCode) {
      return (
        BASE_URL + `/api/transaction-bank-details-perclient/${clientCode}`
      );
    },
    invoiceDetailPerClient: function (clientCode) {
      return (
        BASE_URL + `/api/transaction-invoice-detail-perclient/${clientCode}`
      );
    },
    bankAndInvoiceDetailsPerClient: function (clientCode) {
      return (
        BASE_URL + `/api/financial-bank-and-invoice-data-per-client-time-period/${clientCode}`
      );
    },
  },
  labels: {
    listAllLabelsByGroup: () => {
      return BASE_URL + "/api/list-all-labels-grouped-by-type/";
    },
    updateLabels: () => {
      return BASE_URL + "/api/Edit-Label-name-for-type/";
    },
    deleteLabels: () => {
      return BASE_URL + "/api/Delete-label-for-type/";
    },
    createLabels: () => {
      return BASE_URL + "/api/Create-New-label-for-type/";
    },
  },
};

export { BASE_URL, API_URLS };
