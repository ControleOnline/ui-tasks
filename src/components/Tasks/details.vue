<template>
  <DefaultDetail
    :configs="configs"
    :id="taskId"
    :cardClass="'full-width'"
    :sectionClass="'full-width'"
  />
  <Messages :taskId="taskId" />
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
    return { taskId: null };
  },
  created() {
    this.taskId = decodeURIComponent(this.$route.params.id);
  },
  computed: {
    ...mapGetters({
      myCompany: "people/currentCompany",
    }),
    user() {
      return this.$store.getters["auth/user"];
    },
    configs() {
      return getConfigs("tasks", this.context, this.myCompany, this.user);
    },
  },
  watch: {},

  methods: {},
};
</script>
