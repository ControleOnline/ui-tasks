<template>
  <q-btn class="btn-primary justify-end right" icon="attachment">
    <q-menu transition-show="flip-right" transition-hide="flip-left">
      <q-list style="min-width: 100px">
        <q-item clickable v-for="(item, index) in menus">
          <q-item-section>
            <div
              class="row q-col-gutter-md"
              :style="{ 'background-color': item.background }"
            >
              <div
                class="q-pa-md col-6 col-md-2 col-lg-2 col-xl-2 d-flex justify-center"
              >
                <q-card class="icon-card" @click="openModule(item)">
                  <q-card-section class="q-pa-md">
                    <q-avatar class="big-icon">
                      <q-icon :name="item.icon" color="white" size="20px" />
                    </q-avatar>
                  </q-card-section>
                  <q-card-section class="q-pa-md">
                    <div
                      class="text-center larger-text text-weight-medium text-white"
                    >
                      {{ item.name }}
                    </div>
                  </q-card-section>
                </q-card>
              </div>
            </div>
          </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>

  <q-dialog v-model="openModal" full-width full-height>
    <q-card class="">
      <q-card-section
        class="row col-12 q-pa-sm fixed bg-primary sticky-top full-width"
      >
        <q-toolbar class="">
          <q-toolbar-title class="">
            {{ item.name }}
          </q-toolbar-title>
          <q-btn
            class="btn-primary"
            no-caps
            flat
            v-close-popup
            round
            dense
            icon="close"
          />
        </q-toolbar>
      </q-card-section>
      <q-card-section class="row q-pa-md" :style="{ 'padding-top': '80px' }">
        <component :is="module" />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import Explorer from "@controleonline/ui-contracts/src/components/Explorer";

export default {
  components: { Explorer },
  props: {},

  data() {
    return {
      openModal: false,
      module: false,
      menus: [
        {
          name: this.$tt("crm", "btn", "proposal"),
          background: "#000",
          icon: "person",
          module: Explorer,
          context: "proposal",
        },
        {
          name: this.$tt("crm", "btn", "contract"),
          background: "#ccc",
          icon: "person",
          module: Explorer,
          context: "contract",
        },
        {
          name: this.$tt("crm", "btn", "content"),
          background: "red",
          icon: "person",
          module: Explorer,
          context: "content",
        },
      ],
    };
  },

  computed: {
    task() {
      return this.$store.getters["tasks/item"];
    },
  },

  created() {},

  methods: {
    openModule(item) {
      this.item = item;
      this.openModal = true;
      this.module = item.module;
    },
  },
};
</script>
