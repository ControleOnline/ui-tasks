import * as actions from "@controleonline/ui-default/src/store/default/actions";
import * as getters from "@controleonline/ui-default/src/store/default/getters";
import mutations from "@controleonline/ui-default/src/store/default/mutations";
import Formatter from "@controleonline/ui-common/src/utils/formatter.js";

export default {
  namespaced: true,
  state: {
    resourceEndpoint: "task_interations",
    isLoading: false,
    error: "",
    violations: null,
    totalItems: 0,
    filters: {},
    columns: [
      {
        isIdentity: true,
        externalFilter: true,
        sortable: true,
        name: "id",
        align: "center",
        label: "id",
        format: function (value) {
          return "#" + value;
        },
      },
      {
        externalFilter: true,
        sortable: true,
        editable: true,
        name: "body",
        align: "center",
        label: "body",
      },
    ],
  },
  actions: actions,
  getters,
  mutations,
};