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
      columns: "orders/columns",
    }),

    filters() {
      return this.$store.getters[this.configs.store + "/filters"] || {};
    },

    configs() {
      return getConfigs("tasks", this.context, this.myCompany);
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
