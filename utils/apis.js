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
      return (
        BASE_URL + `/api/financial-transaction-data-perclient/${clientCode}`
      );
    },
    bankTransactionDetailPerClient: function (clientCode) {
      return BASE_URL + `/api/transaction-bank-details-perclient/${clientCode}`;
    },
    invoiceDetailPerClient: function (clientCode) {
      return (
        BASE_URL + `/api/transaction-invoice-detail-perclient/${clientCode}`
      );
    },
    bankAndInvoiceDetailsPerClient: function (clientCode) {
      return (
        BASE_URL +
        `/api/financial-bank-and-invoice-data-per-client-time-period/${clientCode}`
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

  clientGeneral: {
    listCitiesWithClientCounts: () => {
      return BASE_URL + "/client-city-postal-count/";
    },

    clientGeoData: () => {
      return BASE_URL + "/client-geo-data/";
    },
    top10Clients: (interval) => {
      return BASE_URL + `/top10customers/${interval}`;
    },
  },
  clientDetail: {
    clientFinancialDetail: (clientCode) => {
      return BASE_URL + `/client-financial-data/${clientCode}`;
    },
    clientDetail: (clientCode) => {
      return BASE_URL + `/client-details/${clientCode}`;
    },

    top10Products: (clientCode) => {
      return BASE_URL + `/order-pattern/top-10-products/${clientCode}`;
    },

    allProducts: (clientCode) => {
      return BASE_URL + `/order-pattern/top-all-ordered-products/${clientCode}`;
    },
    setClosedDays: () => {
      return BASE_URL + "/set-closed-days/";
    },
    setClientLabels: () => {
      return BASE_URL + "/set-client-labels/";
    },
    removeClientLabels: () => {
      return BASE_URL + "/remove-client-labels/";
    },
    setBankruptcyStatus: () => {
      return BASE_URL + "/set-bankruptcy/";
    },
  },
};

export { BASE_URL, API_URLS };
