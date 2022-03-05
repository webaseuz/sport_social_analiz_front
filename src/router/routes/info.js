export default [
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("@/views/dashboard.vue"),
    meta: {
      pageTitle: "dashboard",
      breadcrumb: [
        // {
        //   text: 'Info',
        // },
        {
          text: "dashboard",
          active: true,
        },
      ],
    },
  },
  {
    path: "/spec-service",
    name: "SpesSerice",
    component: () => import("@/views/prPages/specService.vue"),
    meta: {
      pageTitle: "SpesService",
      breadcrumb: [
        {
          text: "SpesService",
          active: true,
        },
      ],
    },
  },
  {
    path: "/rate",
    name: "Rate",
    component: () => import("@/views/prPages/rate.vue"),
    meta: {
      pageTitle: "Rate",
      breadcrumb: [
        {
          text: "Rate",
          active: true,
        },
      ],
    },
  },
  {
    path: "/socialinfo",
    name: "SocialInfo",
    component: () => import("@/views/prPages/socialinfo.vue"),
    meta: {
      pageTitle: "SocialInfo",
      breadcrumb: [
        {
          text: "SocialInfo",
          active: true,
        },
      ],
    },
  },
  {
    path: "/top10",
    name: "Top10",
    component: () => import("@/views/prPages/top10.vue"),
    meta: {
      pageTitle: "Top10",
      breadcrumb: [
        {
          text: "Top10",
          active: true,
        },
      ],
    },
  },
  {
    path: "/instructionDownload",
    name: "InstructionDownload",
    component: () => import("@/views/prPages/instruction/index.vue"),
    meta: {
      pageTitle: "Instruction",
      breadcrumb: [
        {
          text: "Instruction",
          active: true,
        },
      ],
    },
  },
  {
    path: "/instruction",
    name: "Instruction",
    component: () => import("@/views/prPages/instruction.vue"),
    meta: {
      pageTitle: "Instruction",
      breadcrumb: [
        {
          text: "Instruction",
          active: true,
        },
      ],
    },
  },
  {
    path: "/instructionEdit/id=:id",
    name: "InstructionEdit",
    component: () => import("@/views/prPages/instructionEdit.vue"),
    meta: {
      pageTitle: "Instruction",
      breadcrumb: [
        {
          text: "Instruction",
          active: true,
        },
      ],
    },
  },
  {
    path: "/connectionorg",
    name: "ConnectionOrg",
    component: () => import("@/views/prPages/connectionorg.vue"),
    meta: {
      pageTitle: "ConnectionOrg",
      breadcrumb: [
        {
          text: "ConnectionOrg",
          active: true,
        },
      ],
    },
  },
  {
    path: "/ratebypost",
    name: "RateByPost",
    component: () => import("@/views/prPages/ratebypost.vue"),
    meta: {
      pageTitle: "RateByPost",
      breadcrumb: [
        {
          text: "RateByPost",
          active: true,
        },
      ],
    },
  },
  {
    path: "/ratebyattr",
    name: "RateByAttr",
    component: () => import("@/views/prPages/ratebyattr.vue"),
    meta: {
      pageTitle: "RateByAttr",
      breadcrumb: [
        {
          text: "RateByAttr",
          active: true,
        },
      ],
    },
  },
  {
    path: "/organization",
    name: "Organization",
    component: () => import("@/views/prPages/organization/index.vue"),
    meta: {
      pageTitle: "Organization",
      breadcrumb: [
        {
          text: "Organization",
          active: true,
        },
      ],
    },
  },
  {
    path: "/organizationedit/id=:id",
    name: "EditOrganization",
    component: () => import("@/views/prPages/organization/edit.vue"),
    meta: {
      pageTitle: "EditOrganization",
      breadcrumb: [
        {
          text: "Organization",
        },
        {
          text: "EditOrganization",
          active: true,
        },
      ],
    },
  },
  {
    path: "/television",
    name: "Television",
    component: () => import("@/views/prPages/television/index.vue"),
    meta: {
      pageTitle: "Television",
      breadcrumb: [
        {
          text: "Television",
          active: true,
        },
      ],
    },
  },
  {
    path: "/television/indexMain",
    name: "TelevisionMain",
    component: () => import("@/views/prPages/television/indexMain.vue"),
    meta: {
      pageTitle: "TelevisionPosition",
      breadcrumb: [
        {
          text: "TelevisionPosition",
          active: true,
        },
      ],
    },
  },
  {
    path: "/television/indexDownload/",
    name: "IndexDownload",
    component: () => import("@/views/prPages/television/indexDownload.vue"),
    meta: {
      pageTitle: "TelevisionPosition",
      breadcrumb: [
        {
          text: "TelevisionPosition",
          active: true,
        },
      ],
    },
  },
  {
    path: "/televisionedit/id=:id",
    name: "EditTelevision",
    component: () => import("@/views/prPages/television/edit.vue"),
    meta: {
      pageTitle: "Television",
      breadcrumb: [
        {
          text: "Television",
        },
        {
          text: "Television",
          active: true,
        },
      ],
    },
  },
  {
    path: "/user",
    name: "User",
    component: () => import("@/views/prPages/user/index.vue"),
    meta: {
      pageTitle: "User",
      breadcrumb: [
        {
          text: "User",
          active: true,
        },
      ],
    },
  },
  {
    path: "/useredit/id=:id",
    name: "EditUser",
    component: () => import("@/views/prPages/user/edit.vue"),
    meta: {
      pageTitle: "EditUser",
      breadcrumb: [
        {
          text: "User",
        },
        {
          text: "EditUser",
          active: true,
        },
      ],
    },
  },
  {
    path: "/role",
    name: "Role",
    component: () => import("@/views/prPages/role/index.vue"),
    meta: {
      pageTitle: "Role",
      breadcrumb: [
        {
          text: "Role",
          active: true,
        },
      ],
    },
  },
  {
    path: "/roleedit/id=:id",
    name: "EditRole",
    component: () => import("@/views/prPages/role/edit.vue"),
    meta: {
      pageTitle: "EditRole",
      breadcrumb: [
        {
          text: "Role",
        },
        {
          text: "EditRole",
          active: true,
        },
      ],
    },
  },
  {
    path: "/contactorganization",
    name: "ContactOrganization",
    component: () => import("@/views/prPages/contactorganization.vue"),
    meta: {
      pageTitle: "ContactOrganization",
      breadcrumb: [
        {
          text: "ContactOrganization",
          active: true,
        },
      ],
    },
  },
];
  