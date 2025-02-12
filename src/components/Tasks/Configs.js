import getModelConfigs from "@controleonline/ui-crm/src/components/Model/Configs";

export default function getConfigs(
  store,
  context,
  myCompany,
  user,
  $components,
  $store
) {
  let config = {
    companyParam: "provider_id",
    filters: true,
    store: store,
    categories: [context, context + "-criticality", context + "-reason"],
    status: [context],
    add: true,
    delete: false,
    selection: false,
    search: true,
    initialData: {
      registeredBy: {
        label: user.realname,
        id: user.id,
      },
    },

    components: {
      headerActions: [
        {
          component: $components.DefaultButtonDialog,
          configs: getModelConfigs("proposal", myCompany, $components, $store),
        },
      ],
    },

    columns: {
      client: {
        filters: {
          company: "/people/" + myCompany.id,
          link_type: "client",
        },
      },
      taskFor: {
        filters: {
          company: "/people/" + myCompany.id,
          link_type: "employee",
        },
      },
      registeredBy: {
        filters: {
          company: "/people/" + myCompany.id,
          link_type: "employee",
        },
      },
      category: {
        filters: {
          context: context,
          company: "/people/" + myCompany.id,
        },
      },
      criticality: {
        filters: {
          context: context + "-criticality",
          company: "/people/" + myCompany.id,
        },
      },
      reason: {
        filters: {
          context: context + "-reason",
          company: "/people/" + myCompany.id,
        },
      },
      taskStatus: {
        filters: {
          context: context,
        },
      },
    },
  };

  return config;
}
