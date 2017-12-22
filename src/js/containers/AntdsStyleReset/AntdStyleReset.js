import React,{Component} from 'react';
import {Button, NavBar, Icon} from 'antd-mobile';
import CreateCSSModules from 'react-css-modules';
import style from './antdStyleReset.scss';

class AntdStyleReset extends React.Component {

  render() {
    return (
      <div>
        <div className="antdStyleReset">
          <NavBar
            mode="light"
            className={style.nav1}
            styleName = 'nav2'
            style={{color: 'red'}}
            prefixCls="antdStyleReset-navbar"
            icon={<Icon type="left" />}
            onLeftClick={() => console.log('onLeftClick')}
            rightContent={[
              <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
              <Icon key="1" type="ellipsis" />,
            ]}
          >NavBar</NavBar>
      
          <NavBar
            mode="dark"
            leftContent="Back"
            rightContent={[
              <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
              <Icon key="1" type="ellipsis" />,
            ]}
          >NavBar</NavBar>
        </div>
        
        <Button  className={style.button} style={{color: 'red'}}>test1</Button>
      </div>
    )
  }
}

export default CreateCSSModules(AntdStyleReset, style, {
  allowMultiple: true
})