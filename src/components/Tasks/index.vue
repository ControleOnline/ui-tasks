<template>
  <DefaultTable :configs="configs" v-if="configs" />
</template>
<script>

import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    
  },
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
      columns: "orders/columns",
    }),

    filters() {
      return this.$store.getters[this.configs.store + "/filters"] || {};
    },
    configs() {
      let config = {
        companyParam: "provider_id",
        filters: true,
        store: this.store,
        categories: [
          this.context,
          this.context + "-criticality",
          this.context + "-reason",
        ],
        status: [this.context],
        add: true,
        delete: false,
        selection: false,
        search: false,
        columns: {
          category: {
            filters: {
              context: this.context,
              company: "/people/" + this.myCompany.id,
            },
          },
          criticality: {
            filters: {
              context: this.context + "-criticality",
              company: "/people/" + this.myCompany.id,
            },
          },
          reason: {
            filters: {
              context: this.context + "-reason",
              company: "/people/" + this.myCompany.id,
            },
          },
          taskStatus: {
            filters: {
              context: this.context,
            },
          },
        },
      };

      if (this.peopleId) {
        config.externalFilters = false;
        config["full-height"] = false;
      }
      return config;
    },
  },
  data() {
    return {};
  },
  created() {
    const filters = this.$copyObject(this.filters);
    filters.task_type = this.context;
    this.$store.commit(this.configs.store + "/SET_FILTERS", filters);
  },
  methods: {},
};
</script>
