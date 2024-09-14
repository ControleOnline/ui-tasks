<template>
  <TasksDetails :context="context" />
</template>

<script>
import TasksDetails from "@controleonline/ui-tasks/src/components/Tasks/details.vue";

import { mapGetters } from "vuex";

export default {
  components: {
    TasksDetails,
  },
  data() {
    return {
      context: "support",
    };
  },
  computed: {
    ...mapGetters({}),
  },

  watch: {},

  created() {},

  methods: {},
};
</script>
