export const menus = [
  {
    id: '1',
    pid: -1,
    path: '/home',
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
    name: '子菜单',
    icon: 'fa-solid fa-clock',
    children: [
      {
        id: '4',
        pid: 3,
        path: '/about2',
        name: '子菜单',
        icon: '',
        children: [],
      },
      {
        id: '5',
        pid: 3,
        path: '/about3',
        name: '子菜单2',
        icon: '',
        children: [],
      },
    ],
  },
]
