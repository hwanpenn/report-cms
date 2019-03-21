import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from '@material-ui/core/Grid';
import Assignment from "@material-ui/icons/Assignment";
import Description from "@material-ui/icons/Description";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import extendedTablesStyle from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.jsx";
import {UpdateUserInfo,addUserInfoList,getUserInfoMng,queryReportVersion} from "actions/reportVersion";
import {connect} from "react-redux";
import { Table,Divider,Button,Icon,Tag } from 'antd';
import { Input,Modal,Select } from 'antd';
import { Form,Pagination,Popconfirm } from 'antd';
import { message,Row,Col,Popover } from 'antd';
import { TimePicker,DatePicker } from 'antd';
import moment from 'moment';
message.config({
    duration: 1,
});
const FormItem = Form.Item;
const Search = Input.Search;
const Option = Select.Option;
const { TextArea } = Input;
class reportVersion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: [],
            tableData: [],
            visible: false,
            visibleNull:false,
            recordAction:{},
            recordSelect:{},
            defaultSelectValue:'',
            cuSkGroupId:'',
            timeValueStartModify: '',
            timeValueEndModify: '',
            thisCategoryId:'',
            layer:'',
            thistentantId:''
        };
    }
    componentWillMount(){       
    	
    }
    componentDidMount(){
    	const obj = this.sortSearchData(this.props.location.search);
    	this.getTableData(obj,1,10);   
    	this.setState({
    		thisCategoryId:obj.categoryId,
    		layer:obj.layer,
    		thistentantId:obj.tentantId
    	})
    }
    sortSearchData =(url) =>{
    	var obj = {};
    	var keyvalue = [];
        var key = "",
            value = "";
    	var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
    	for (var i in paraString) {
            keyvalue = paraString[i].split("=");
            key = keyvalue[0];
            value = keyvalue[1];
            obj[key] = value;
        }
    	return obj
    }
    getTableData = (obj,start,size) => {
        const params = {
        	categoryId:obj.categoryId,
        	reportKey:obj.reportKey,
        	tenantId:obj.tenantId,
            pageNo:start,
            pageSize:size,
        };
        this.props.queryReportVersion(params);
    }
    onRowSelect = (record) => {
        this.setState({ recordSelect:record });
    }
    clickToUpdate = (record) => {
    	window.open(window.sessionStorage.getItem('contextPath')+"/ureport/designer?reportId=2&reportname="+record.reportname+"&id="+record.id+"&reportKey="+record.reportKey+"&tenantId="+record.tenantId+"&categoryId="+record.categoryId+"&Authorization="+window.sessionStorage.getItem("token")+"&username="+window.sessionStorage.getItem("username"))
    }
    showAllVersion = (record) => {

    }
    showModalCreate = () => {
        this.props.history.push(window.sessionStorage.getItem('contextPath')+"/ureport/designer?categoryId="+this.state.thisCategoryId)
    }
    backtoLastPage = () => {
    	this.props.history.push("/sym/home/tables/report");
    }
    activeConfirm = (record) => {
        const params = {
            status:record.status,
            windowId:record.windowId,
        }
        this.props.activeDataChatMng(params)
    }
    clickToPublish = (record) => {
    	
    }
    render() {
        let thisTemp = this
        const { classes } = this.props;       
        const columns = [{
            title: '操作',
            key: 'action',
            width: 300,
            render: (text, record) => (
                <span>
                    <a target="_blank"  onClick={() => {this.clickToUpdate(record)}}>编辑</a>             
                    <Divider type="vertical" hidden={record.status=='0'?false:true}/>
                    <a onClick={() => this.clickToPublish(record)} hidden={record.status=='0'?false:true}>发布</a>
                </span>
            ),
        },{
            title: '版本',
            dataIndex: 'version',
            key: 'version',
            width: 200,
            render:(text,record) => (
            	<span>{text}</span>
            )
        }, {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
            width:200,           
        }, {
            title: '发布时间',
            dataIndex: 'releaseTime',
            key: 'releaseTime',
            width: 200
        }];
        var dataSource = [{
        	version:'1.0.0',
        	status:'已发布',
        	releaseTime:'2019-01-01',        	
        },{
        	version:'1.0.1',
        	status:'未发布',
        	releaseTime:'2019-01-02',        	
        },{
        	version:'1.0.2',
        	status:'已发布',
        	releaseTime:'2019-01-03',        	
        },{
        	version:'1.0.3',
        	status:'未发布',
        	releaseTime:'2019-01-04',        	
        },{
        	version:'1.0.4',
        	status:'已发布',
        	releaseTime:'2019-01-05',        	
        }]
        return (
            <GridContainer>
                <GridItem xs={12}>
                    <Card>
                        <CardHeader color="rose" icon>
                            <Grid container spacing={24}>
                                <Grid item xs={6}>
                                    <CardIcon color="info">
                                        <Description />
                                    </CardIcon>
                                    <h4 className={classes.cardIconTitle}> </h4>                                   
                                </Grid>
                                <Grid style={{textAlign:'right',marginTop:10}} item xs={12}>                                   
                                    <Button shape="round"  onClick={this.backtoLastPage} style={{marginRight:10 }}>返回上一页</Button>
                                </Grid>
                            </Grid>
                        </CardHeader>
                        <CardBody>
                            <Table onRow={(record) => {
                                    return {
                                    onClick: () => {this.onRowSelect(record)},       
                                    };
                                }} key={"reportVersion"} pagination={false} columns={columns} dataSource={this.props.reportVersion.queryAllReportVersionData} />
                            <Pagination defaultCurrent={1} defaultPageSize={10} showTotal={total => `共 ${total} 条`} total={this.props.reportVersion.queryAllReportVersionTotal} style={{textAlign:'right',marginTop:25}}  onChange={(page, pageSize)=>this.getTableData('',page,10)}/>
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        );
    }
}
const mapStateToProps = (state) => {
    return{
        reportVersion: state.reportVersion,
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        getUserInfoMng: (params) => {
            dispatch(getUserInfoMng(params))
        },
        UpdateUserInfo: (params) => {
            dispatch(UpdateUserInfo(params))
        },
        addUserInfoList: (params) => {
            dispatch(addUserInfoList(params))
        },
        queryReportVersion: (params) => {
        	dispatch(queryReportVersion(params))
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withStyles(extendedTablesStyle)(reportVersion));
