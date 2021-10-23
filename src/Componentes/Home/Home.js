import { Layout, Menu, Breadcrumb,Empty,Input,Button, Tooltip,List, Avatar,Modal,Divider,Card, Col, Row,Image} from 'antd';
import { SearchOutlined,RightCircleTwoTone} from '@ant-design/icons';
import React, { useEffect} from "react";
import Api from '../Utilities/Api'
import './Home.css';
import Empty2 from '../Empty/Empty2';
import {useDocumentTitle} from '../Titulo/Title'
import 'antd/dist/antd.css';
import {busquedadedatos,busquedadedatosdeatil} from '../Utilities/Api';

const { Header, Footer, Sider, Content } = Layout;
const { Search } = Input;
// const data=[{"title":"San Francisco","location_type":"City","woeid":2487956,"latt_long":"37.777119, -122.41964"},{"title":"San Diego","location_type":"City","woeid":2487889,"latt_long":"32.715691,-117.161720"},{"title":"San Jose","location_type":"City","woeid":2488042,"latt_long":"37.338581,-121.885567"},{"title":"San Antonio","location_type":"City","woeid":2487796,"latt_long":"29.424580,-98.494614"},{"title":"Santa Cruz","location_type":"City","woeid":2488853,"latt_long":"36.974018,-122.030952"},{"title":"Santiago","location_type":"City","woeid":349859,"latt_long":"-33.463039,-70.647942"},{"title":"Santorini","location_type":"City","woeid":56558361,"latt_long":"36.406651,25.456530"},{"title":"Santander","location_type":"City","woeid":773964,"latt_long":"43.461498,-3.810010"},{"title":"Busan","location_type":"City","woeid":1132447,"latt_long":"35.170429,128.999481"},{"title":"Santa Cruz de Tenerife","location_type":"City","woeid":773692,"latt_long":"28.46163,-16.267059"},{"title":"Santa Fe","location_type":"City","woeid":2488867,"latt_long":"35.666431,-105.972572"}]
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
            isModalVisible : false
        }
        this.alertadatos = this.alertadatos.bind(this);        
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    
    alertadatos() {
        alert(this.state.queryresult.length);
    }
    changetitle(newtitle){
        this.setState({title:newtitle});
    }
    closemodal(){
        this.setState({city:'',nameofw:'',Celsius:'',stateofw:'',min:'',max:'',wind:'',isModalVisible:false});
    }
    openmodal(){
        this.setState({isModalVisible:true});
    }
    searchdata(){
        
        // this.setState({queryresult:this});
        // alert(this.state.qrysearch);
        console.log(this.state.queryresult);
        //inicio de busqueda
        busquedadedatos(this.state.qrysearch)		
		.then(results =>{
			return results.json();
		})
		.then(data => {
			this.setState({city:data[0].title,Celsius:data[0].the_temp,stateofw:"https://www.metaweather.com/static/img/weather/png/"+data[0].weather_state_abbr+".png",nameofw:data[0].weather_state_name,min:data[0].min_temp,max:data[0].max_temp,wind:data[0].wind_speed,isModalVisible:false});
		}).catch(err => {
            console.log("error:", err);
          });
    }
    searchdetailsof(data){
        
         busquedadedatos(data)		
		.then(results =>{
			return results.json();
		})
		.then(data => {
        	this.setState({'filterByPo': !this.state.filterByPo});
         this.openmodal();
        }).catch(err => {
            console.log("error:", err);
          });
        
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
      <div className="site-layout-content">{this.state.queryresult.length==0?<Empty2></Empty2>:<List
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
          <Modal title={this.state.city} visible={this.state.isModalVisible} onOk={()=>this.closemodal()} onCancel={() =>this.closemodal()}>
          <Divider plain>Today</Divider>
          <div className="site-card-wrapper">
    <Row gutter={16}>
      <Col span={12}>
        <Card bordered={false}>
            {this.state.Celsius}  
        </Card>
      </Col>
      <Col span={12}>
        <Card bordered={false}>
            {this.weather_state_name}
            <Image
      width={200}
      src={this.state.weather_state_abbr}
    />
        </Card>
      </Col>
    </Row>        
  </div>
  <Row className="centered-we"  gutter={16}>
      <Col span={20}>   
    <h2>Min:{this.state.min} |Max:{this.state.max}</h2>     
      </Col>
  </Row>
  <Row className="centered-we" gutter={16}>
      <Col span={12}>   
    <h2>{this.state.wind}</h2>          
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

	
