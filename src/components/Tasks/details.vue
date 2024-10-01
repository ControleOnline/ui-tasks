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
  <div class="full-width sticky-bottom bg row">
    <div class="col-11">
      <q-editor
        :style="{ 'max-height': '80px', height: '80px' }"
        v-model="editor"
        :toolbar="false"
        class="full-width"
      />
    </div>
    <div class="col-1">
      <q-btn
        class="btn-primary justify-end right"
        icon="person"
        label="teste"
      />
    </div>
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
      editor: "",
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
