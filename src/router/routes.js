export const routes = [
  {
    path: "/tasks/",
    component: () =>
      import("@controleonline/ui-layout/src/layouts/AdminLayout.vue"),
    children: [
      {
        name: "SupportIndex",
        path: "",
        component: () => import("../pages/Tasks"),
      },
      {
        name: "SupportDetails",
        path: "id/:id",
        component: () => import("../pages/Tasks/details.vue"),
      },
    ],
  }
];
