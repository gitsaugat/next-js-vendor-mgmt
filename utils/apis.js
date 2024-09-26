const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const API_URLS = {
  finance: {
    unbookedTransactions: function () {
      return BASE_URL + "/financial/unbooked-transactions/";
    },
    paymentTrackerWeekly: function () {
      return BASE_URL + "/api/payment-tracking-weekly";
    },
    clientSummary: function () {
      return BASE_URL + "/financial-overview-General-client-table/";
    },
    paymentTracking: function () {
      return BASE_URL + "/client/payment-tracking/";
    },
    generalDetails: function () {
      return BASE_URL + "/financial-overview-General/";
    },
    financialTransactionPerClient: function (clientCode) {
      return (
        BASE_URL +
        `/financial-transaction-data-perclient/?account_code=${clientCode}`
      );
    },
    bankTransactionDetailPerClient: function (clientCode) {
      return (
        BASE_URL +
        `/transaction-bank-details-perclient/?account_code=${clientCode}`
      );
    },
    invoiceDetailPerClient: function (clientCode) {
      return (
        BASE_URL +
        `/transaction-invoice-detail-perclient/?account_code=${clientCode}`
      );
    },
    bankAndInvoiceDetailsPerClient: function (clientCode) {
      return (
        BASE_URL +
        `/api/bank-and-invoice-details-time-period?account_code=${clientCode}`
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
