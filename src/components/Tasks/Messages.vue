<template>
  <div
    class="q-pa-md row justify-center"
    :style="{ 'padding-button': '100px' }"
  >
    <div style="width: 100%; max-width: 90%">
      <q-chat-message label="Sunday, 19th" />

      <templete v-for="(interation, index) in interations" :key="index">
        <q-chat-message
          :name="interation.registeredBy.alias"
          :avatar="getImage(interation.registeredBy.image)"
          :text="[interation.body]"
          :sent="interation.registeredBy.id == user.id"
          stamp="7 minutes ago"
        />
      </templete>
    </div>
   
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { ENTRYPOINT } from "app/config/entrypoint";

export default {
  components: {},

  props: {
    taskId: {
      required: true,
    },
  },

  data() {
    return { interations: [] };
  },
  created() {
    this.getInterations({ task: this.taskId }).then((data) => {
      this.interations = data;
    });
  },
  computed: {
    ...mapGetters({}),
    user() {
      return this.$store.getters["auth/user"];
    },
  },
  watch: {},

  methods: {
    ...mapActions({
      getInterations: "task_interations/getItems",
    }),

    getImage(file) {
      if (!file) return "https://cdn.quasar.dev/img/avatar4.jpg";

      return (
        ENTRYPOINT +
        "/files/download/" +
        file.replace(/\D/g, "") +
        "?_=" +
        btoa(file.file_name)
      );
    },
  },
};
</script>
