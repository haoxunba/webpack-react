# webpack+react

恰逢webpack更新到3.8.1,react更新到16.1.1，所以决定重新搭建一个项目，体会webpack和react新版的变动

## 新增高阶组件的案例

高阶组件（higher-order conponent简称hoc）简单来说就是一个函数，将被包装组件（wrappedComponent）作为参数，返回一个组件，返回的组件可以理解是被包装组件的container组件或父组件

详情见js/containers/Hoc

## 新增父子组件间传值

案例描述： 父子组件各有一个input输入框，要求无论修改任何一个input，父子组件的input value时刻保持相等，从而实现两个输入框的联动

详情见js/containers/Childtoparent