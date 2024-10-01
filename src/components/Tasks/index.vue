<template>
  <DefaultTable :configs="configs" v-if="configs" />
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import getConfigs from "./Configs";

export default {
  components: {},
  props: {
    context: {
      required: true,
    },
    loaded: {
      type: Boolean,
      required: true,
    },
    store: {
      required: true,
      default: "tasks",
    },
    peopleId: {
      required: false,
    },
  },
  computed: {
    ...mapGetters({
      myCompany: "people/currentCompany",
    }),
    columns() {
      return this.$store.getters[this.configs.store + "/columns"] || {};
    },
    user() {
      return this.$store.getters["auth/user"];
    },
    filters() {
      return this.$store.getters[this.configs.store + "/filters"] || {};
    },

    configs() {
      return getConfigs(
        "tasks",
        this.context,
        this.myCompany,
        this.user,
        this.$components,
        this.$store
      );
    },
  },
  data() {
    return {};
  },
  created() {
    const filters = this.$copyObject(this.filters);
    filters.type = this.context;
    this.$store.commit(this.configs.store + "/SET_FILTERS", filters);
    this.setRoute();
  },
  methods: {
    setRoute() {
      const columns = this.$copyObject(this.columns);
      const columnIndex = columns.findIndex(
        (c) => c.name === "receiver" || c.name === "payer"
      );
      if (columnIndex !== -1) {
        columns[columnIndex].name =
          this.context === "expense" ? "receiver" : "payer";
        columns[columnIndex].label =
          this.context === "expense" ? "receiver" : "payer";
      }

      const columnIdIndex = columns.findIndex((c) => c.name === "id");
      if (columnIdIndex !== -1) {
        columns[columnIdIndex].to = (value) => {
          let route = this.context === "relationship" ? "RelationshipDetails" : "SupportDetails";
          return {
            name: route,
            params: {
              id: value,
            },
          };
        };

        this.$store.commit(this.configs.store + "/SET_COLUMNS", columns);
      }
    },
  },
};
</script>
