<template>
  <Tasks :context="context" stote="tasks" />
</template>

<script>
import Tasks from "@controleonline/ui-tasks/src/components/Tasks";

export default {
  components: {
    Tasks,
  },
  data() {
    return {
      context: "support",
    };
  },
  computed: {},

  created() {
    const filters = this.$copyObject(this.filters);
    filters.taskFor = { label: this.user.realname, value: this.user.id };
    this.$store.commit(this.configs.store + "/SET_FILTERS", filters);
  },

  watch: {},
};
</script>
