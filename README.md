# webpack+react

恰逢webpack更新到3.8.1,react更新到16.1.1，所以决定重新搭建一个项目，体会webpack和react新版的变动

## 新增高阶组件的案例

高阶组件（higher-order conponent简称hoc）简单来说就是一个函数，将被包装组件（wrappedComponent）作为参数，返回一个组件，返回的组件可以理解是被包装组件的container组件或父组件

详情见js/container/hoc