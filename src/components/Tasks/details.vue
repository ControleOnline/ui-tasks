<template>
  <DefaultDetail
    :configs="configs"
    :id="taskId"
    :cardClass="'full-width'"
    :sectionClass="'full-width'"
  />
  <div class="no-scroll q-pa-none full-height full-width">
    <Messages :taskId="taskId"  class="q-pa-none full-height full-width"/>
  </div>
</template>

<script>
import getConfigs from "./Configs";
import DefaultDetail from "@controleonline/ui-default/src/components/Default/Common/DefaultDetail.vue";
import { mapActions, mapGetters } from "vuex";
import Messages from "./Messages";

export default {
  components: {
    DefaultDetail,
    Messages,
  },

  props: {
    context: {
      required: true,
    },
  },

  data() {
    return {
      tab: "interactions",
      taskId: null,
    };
  },
  created() {
    this.taskId = decodeURIComponent(this.$route.params.id);
  },
  computed: {
    ...mapGetters({
      myCompany: "people/currentCompany",
    }),

    configs() {
      return getConfigs(
        "tasks",
        this.context,
        this.myCompany,
        this.$auth.user,
        this.$components,
        this.$store
      );
    },
  },
  watch: {},
};
</script>
