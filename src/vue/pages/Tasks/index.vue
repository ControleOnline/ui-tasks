<template>
  <Tasks :context="context" stote="tasks" />
</template>

<script>
import Tasks from "@controleonline/ui-tasks/src/vue/components/Tasks";

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

  },

  watch: {},
};
</script>
