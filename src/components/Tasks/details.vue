<template>
  <DefaultDetail
    :configs="configs"
    :id="taskId"
    :cardClass="'full-width'"
    :sectionClass="'full-width'"
  />

  <q-tabs
    v-model="tab"
    no-caps
    outside-arrows
    mobile-arrows
    class="bg-orange text-white shadow-2"
  >
    <q-tab name="interactions" label="interactions" />
    <q-tab name="proposal" label="proposal" />
  </q-tabs>

  <q-tab-panels
    v-model="tab"
    animated
    swipeable
    vertical
    transition-prev="jump-up"
    transition-next="jump-up"
  >
    <q-tab-panel name="interactions">
      <Messages :taskId="taskId" />
    </q-tab-panel>
    <q-tab-panel name="proposal"> Teste </q-tab-panel>
  </q-tab-panels>
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
    user() {
      return this.$store.getters["auth/user"];
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
  watch: {},
};
</script>
