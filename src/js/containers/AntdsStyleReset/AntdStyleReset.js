import React,{Component} from 'react';
import {Button} from 'antd-mobile';
import style from './antdStyleReset.scss';
export default class AntdStyleReset extends React.Component {

  render() {
    return (
      <div>
        <Button  className={style.button} style={{color: 'red'}}>test1</Button>
      </div>
    )
  }
}