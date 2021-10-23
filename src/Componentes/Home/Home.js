import { Layout, Menu, Breadcrumb,Empty,Input,Button, Tooltip,List, Avatar,Modal,Divider,Card, Col, Row,Image,Spin, Space } from 'antd';
import { SearchOutlined,RightCircleTwoTone} from '@ant-design/icons';
import React, { useEffect} from "react";
import Api from '../Utilities/Api'
import './Home.css';
import Empty2 from '../Empty/Empty2';
import {useDocumentTitle} from '../Titulo/Title'
import 'antd/dist/antd.css';
import {busquedadedatos,api_handleErrors,busquedadedatosdeatil} from '../Utilities/Api';

const { Header, Footer, Sider, Content } = Layout;
const { Search } = Input;

export default class Home extends React.Component {
 
   
    constructor(props) {
		super(props);
		this.state = {
            queryresult : [],
            title : "Home of Weather",
            searchactivated : false,
            qrysearch : '',
            city: '',
            Celsius : '',
            stateofw :'',
            nameofw:'',
            min :'',
            max : '',
            wind : '',
            isModalVisible : false,
            isloading : false
        }
          
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    
    changetitle(newtitle){
        this.setState({title:newtitle});
    }
    closemodal(){
        this.setState({city:'',nameofw:'',Celsius:'',stateofw:'',min:'',max:'',wind:'',isModalVisible:false, title : "Home of Weather"});
    }
    openmodal(){
        this.setState({isModalVisible:true});
    }
    searchdata(){
        // //inicio de busqueda
        busquedadedatos(this.state.qrysearch)		
		.then(res => {
            console.log(res);
            this.setState({queryresult:res.data,isloading:false});
          
        }).catch(err => {
            this.setState({isloading:false});
            console.log("error:", err);
          });
    }
    searchdetailsof(data){
        busquedadedatosdeatil(data)
        .then(res => {
            console.log(res);
            this.setState({title:"Weather of "+res.data.title,city:res.data.title,Celsius:res.data.consolidated_weather[0].the_temp,stateofw:"https://www.metaweather.com/static/img/weather/png/"+res.data.consolidated_weather[0].weather_state_abbr.toString()+".png",nameofw:res.data.consolidated_weather[0].weather_state_name,min:res.data.consolidated_weather[0].min_temp,max:res.data.consolidated_weather.max_temp,wind:res.data.consolidated_weather[0].wind_speed});
          
        })
        
          this.openmodal();
 
        
    }
    //cuando el componente este montado
    componentDidMount(){
        document.title = this.state.title; 
    }
    handleInputChange = event => {
		
		
		this.setState({[event.target.name]: event.target.value});
	};

	render() {
        
        return (
    <div>
     <Layout className="layout">
      <Header className="centered-header"><h1>How is the weather?</h1></Header>
      <Content>
          <div id="Busqueda" className="Busqueda">
          <Search type="primary" name="qrysearch" id='qrysearch' placeholder="input search text" onChange={this.handleInputChange} enterButton="Search" size="large" onSearch={()=> this.searchdata()} loading={this.state.searchactivated} />
          </div>
      <div className="site-layout-content">{this.state.queryresult.length==0 &&this.state.isloading==false?<Empty2></Empty2>:this.state.isloading==true? <div className="centeredspin"> <Space size="middle">
    <Spin size="large" />
    <h2>Loading</h2>
  </Space>
  </div>
  :<List
    itemLayout="horizontal"
    dataSource={this.state.queryresult}
    renderItem={item => (
      <List.Item>
        <List.Item.Meta
          avatar={<RightCircleTwoTone />}
          title={<a href="https://ant.design">{item.title}</a>}
          description="City"
        />
        <a onClick={() =>this.searchdetailsof(item.woeid)}> see details...</a>
      </List.Item>
    )}
    />}</div>
          {/* //modal */}
          <div>
          <Modal title={this.state.city + " Today"} visible={this.state.isModalVisible} onOk={()=>this.closemodal()} onCancel={() =>this.closemodal()}>          
          <div className="site-card-wrapper">
    <Row gutter={16}>
      <Col span={12}>
        <Card bordered={false}>
           <h3 className="Celsius"> {Math.round(this.state.Celsius)} ° C </h3>
        </Card>
      </Col>
      <Col span={12}>
        <Card bordered={false}>
            
            <Image
      width={50}
      src={this.state.stateofw}
    />
    <br></br>
    <strong>{this.state.nameofw}</strong>
        </Card>
      </Col>
    </Row>        
  </div>
  <Row className="centered-we"  gutter={16}>
      <Col span={22}>   
    <h3>Min:{Math.round(this.state.min)} |Max:{Math.round(this.state.max)}</h3>     
      </Col>
  </Row>
  <Row className="centered-we-V2" gutter={16}>
      <Col span={22}>   
    <h4>{Math.round(this.state.wind)} MPH</h4>          
      </Col>
  </Row>
      </Modal>
          </div>
          </Content>
      <Footer>Everlance exercise by Daniel Morgado 2021</Footer>
    </Layout>

        
    </div>
        )
    }
        
}

	
