import * as actions from "@controleonline/ui-default/src/store/default/actions";
import * as getters from "@controleonline/ui-default/src/store/default/getters";
import mutations from "@controleonline/ui-default/src/store/default/mutations";
import Formatter from "@controleonline/ui-common/src/utils/formatter.js";

export default {
  namespaced: true,
  state: {
    item: {},
    items: [],
    resourceEndpoint: "tasks",
    isLoading: false,
    error: "",
    violations: null,
    totalItems: 0,
    filters: {},
    columns: [
      {
        isIdentity: true,
        externalFilter: false,
        sortable: true,
        editable: true,
        name: "id",
        align: "center",
        label: "id",
        to: function (value) {
          return {
            name: "SupportDetails",
            params: { id: value },
          };
        },

        format: function (value) {
          return "#" + value;
        },
      },
      {
        externalFilter: false,
        sortable: true,
        editable: true,
        name: "name",
        align: "center",
        label: "name",
      },
      {
        externalFilter: false,
        sortable: true,
        editable: true,
        name: "taskStatus",
        align: "center",
        label: "taskStatus",
        list: "status/getItems",
        style: function (row) {
          return { color: row?.taskStatus?.color };
        },
        format: function (value) {
          return value?.status;
        },

        saveFormat: function (value) {
          return value ? "/statuses/" + (value.value || value) : null;
        },
      },
      {
        externalFilter: false,

        sortable: true,
        editable: false,
        name: "client",
        align: "center",
        label: "client",
        list: "people/getItems",
        format: function (value) {
          return value ? value?.name + " - " + value?.alias : " - ";
        },

        saveFormat: function (value) {
          return value ? "/people/" + (value.value || value) : null;
        },
      },
      {
        externalFilter: false,

        sortable: true,
        editable: true,
        name: "criticality",
        align: "center",
        label: "criticality",
        externalFilter: false,
        list: "categories/getItems",
        searchParam: "name",
        format: function (value) {
          return value?.name;
        },
        saveFormat: function (value) {
          return value ? "/categories/" + parseInt(value.value || value) : null;
        },
      },
      {
        externalFilter: false,

        sortable: true,
        editable: true,
        name: "category",
        align: "center",
        label: "category",
        externalFilter: false,
        list: "categories/getItems",
        searchParam: "name",
        format: function (value) {
          return value?.name;
        },
        saveFormat: function (value) {
          return value ? "/categories/" + parseInt(value.value || value) : null;
        },
      },
      {
        externalFilter: false,

        sortable: true,
        editable: true,
        name: "reason",
        align: "center",
        label: "reason",
        externalFilter: false,
        list: "categories/getItems",
        searchParam: "name",
        format: function (value) {
          return value?.name;
        },
        saveFormat: function (value) {
          return value ? "/categories/" + parseInt(value.value || value) : null;
        },
      },
      {
        externalFilter: false,
        sortable: true,
        editable: false,
        name: "registeredBy",
        align: "center",
        label: "registeredBy",
        list: "people/getItems",
        format: function (value) {
          return value ? value?.name + " - " + value?.alias : " - ";
        },

        saveFormat: function (value) {
          return value ? "/people/" + (value.value || value) : null;
        },
      },
      {
        externalFilter: false,

        sortable: true,
        editable: true,
        name: "taskFor",
        align: "center",
        label: "taskFor",
        list: "people/getItems",
        format: function (value) {
          return value ? value?.name + " - " + value?.alias : " - ";
        },
        formatList: function (value) {
          if (value && value["@id"])
            return {
              value: value["@id"].split("/").pop(),
              label: value?.name + " - " + value?.alias,
            };
        },
        saveFormat: function (value) {
          return value ? "/people/" + (value.value || value) : null;
        },
      },
      {
        externalFilter: false,
        inputType: "date-range",
        sortable: true,
        editable: true,
        name: "dueDate",
        align: "center",
        label: "dueDate",
        saveFormat: function (value) {
          return undefined;
        },
        format: function (value) {
          return Formatter.formatDateYmdTodmY(value, true);
        },
      },
      {
        externalFilter: false,
        inputType: "date-range",
        sortable: true,
        editable: false,
        add: false,
        name: "alterDate",
        align: "center",
        label: "alterDate",
        saveFormat: function (value) {
          return undefined;
        },
        format: function (value) {
          return Formatter.formatDateYmdTodmY(value, true);
        },
      },
    ],
  },
  actions: actions,
  getters,
  mutations,
};
