export const menus = [
  {
    id: '1',
    pid: -1,
    path: '/admin',
    name: '首页',
    icon: 'fa-solid fa-house',
    children: [],
  },
  {
    id: '2',
    pid: -1,
    path: '/about',
    name: '关于',
    icon: 'fa-solid fa-clock',
    children: [],
  },
  {
    id: '3',
    pid: -1,
    path: '',
    name: '系统管理',
    icon: 'fa-solid fa-clock',
    children: [
      {
        id: '4',
        pid: 3,
        path: '/menu',
        name: '菜单管理',
        icon: '',
        children: [],
      },
      {
        id: '5',
        pid: 3,
        path: '/role',
        name: '角色管理',
        icon: '',
        children: [],
      },
    ],
  },
]