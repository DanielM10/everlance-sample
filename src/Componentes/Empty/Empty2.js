import { Empty,Button } from 'antd';
import React from 'react';
export default class Empty2 extends React.Component {
	render() {
        return (
<Empty
image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
imageStyle={{
  height: 60,
}}
description={
  <span>
    No <a href="#API">Data</a>
  </span>
}
>
</Empty>
        )
}
}