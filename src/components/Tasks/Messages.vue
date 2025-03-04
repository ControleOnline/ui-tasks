<template>
  <div class="q-pa-md row justify-center">
    <div
      ref="scrollContainer"
      style="width: 100%; height: 400px; overflow-y: auto"
      @scroll="onScroll"
    >
      <q-chat-message label="Sunday, 19th" />

      <!-- Exibir interações de baixo para cima -->
      <div v-for="(interation, index) in interations" :key="index">
        <q-chat-message
          :name="interation.registeredBy.alias"
          :avatar="$image(interation.registeredBy.image)"
          :text="[interation.id, interation.body]"
          :sent="interation.registeredBy.id == this.$auth.user.id"
          stamp="7 minutes ago"
        />
      </div>
    </div>
  </div>

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
      <Menus />

      <q-btn
        class="btn-primary justify-end right"
        icon="send"
        @click="sendMessage"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Menus from "./Menus";

export default {
  components: {
    Menus,
  },
  props: {
    taskId: {
      required: true,
    },
  },

  data() {
    return {
      interations: [],
      editor: "",
      page: 1,
      isLoading: false,
      file: null,
    };
  },
  mounted() {
    // Acessando o elemento de rolagem diretamente quando o componente é montado
    this.scrollContainer = this.$refs.scrollContainer;
  },

  computed: {
    ...mapGetters({
      task: "tasks/item",
      totalItems: "task_interations/totalItems",
    }),

    lastPage() {
      return Math.ceil(this.totalItems / 30);
    },
  },

  created() {
    this.loadInterations("last");
  },

  methods: {
    ...mapActions({
      getInterations: "task_interations/getItems",
      send: "task_interations/save",
    }),

    loadInterations(direction) {
      if (this.page < 1) this.page = 1;
      if (this.isLoading) return;
      this.isLoading = true;

      return this.getInterations({
        task: this.taskId,
        page: this.page,
      })
        .then((data) => {
          if (data && data.length) {
            this.interations = [
              //...this.interations,
              ...data,
            ];
          }
        })
        .finally(() => {
          this.isLoading = false;
          const el = this.scrollContainer;

          if (direction == "top") {
            el.scrollTop = 50;
          }
          if (direction == "last") {
            this.page = this.lastPage;
            this.loadInterations("botton");
          }
          if (direction == "botton")
            el.scrollTop = el.scrollHeight - el.clientHeight - 500;
        });
    },

    onScroll(e) {
      const el = this.scrollContainer;
      if (el.scrollHeight - el.scrollTop === el.clientHeight) {
        if (this.page >= this.lastPage) return;
        this.page += 1;
        this.loadInterations("botton");
      }
      if (el.scrollTop === 0) {
        if (this.page == 1) return;
        this.page -= 1;
        this.loadInterations("top");
      }
    },

    sendMessage() {
      let params = {};
      params.body = this.editor;
      params.file = this.file;
      params.task = "/tasks/" + this.taskId;
      params.visibility = "private";
      params.type = "comment";
      this.send(params).then((data) => {
        this.interations.push(data);
        this.editor = "";
        this.file = null;
        setTimeout(() => {
          const el = this.scrollContainer;
          el.scrollTop = 9999;
        }, 300);
      });
    },
  },
};
</script>
