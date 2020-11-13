import {
    Decompose,
    Feedback,
    Investment,
    Plan,
    ProjectApproval,
    Schedule,
    Summary,
    Task
} from '../pages'


export const projectRoutes = [
    {
        path: '/project/decompose',
        component: Decompose,
        title: "投资计划分解"
    },

    {
        path: '/project/feedback',
        component: Feedback,
        title: "投资计划反馈"
    },
    {
        path: '/project/investment',
        component: Investment,
        title: "年度投资计划"
    },
    {
        path: '/project/projectApproval',
        component: ProjectApproval,
        title: "项目立项申请"
    },
    {
        path: '/project/summary',
        component: Summary,
        title: "投资项目汇总"
    },
    {
        path: '/project/task',
        component: Task,
        title: "前期工作任务",
        exact: false,
    },
    {
        path: '/project/plan',
        component: Plan,
        title: "项目策划",
    },
    {
        path: '/project/schedule',
        component: Schedule,
        title: "进度管理",
    },
]