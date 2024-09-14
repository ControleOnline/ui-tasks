export default function getConfigs(store, context, myCompany) {
  let config = {
    companyParam: "provider_id",
    filters: true,
    store: store,
    categories: [context, context + "-criticality", context + "-reason"],
    status: [context],
    add: true,
    delete: false,
    selection: false,
    search: false,
    columns: {
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
