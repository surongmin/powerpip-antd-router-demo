import {
    BasicTables,
    DndTable,
    TreeTable,
    Plan,
    ProjectApproval,
    Schedule,
    Summary,
    Task
} from '../pages'


export const projectRoutes = [
    {
        path: '/project/basicTables',
        component: BasicTables,
        title: "基础表格"
    },

    {
        path: '/project/dndTable',
        component: DndTable,
        title: "可拖拽表格"
    },
    {
        path: '/project/treeTable',
        component: TreeTable,
        title: "树形数据表格"
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