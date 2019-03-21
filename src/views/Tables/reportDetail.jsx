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
import { UpdateUserInfo,getCompanyInfo,addUserInfoList,getUserInfoMng,deleteDataUserInfo } from "actions/reportDetail";
import { connect } from "react-redux";
import { Table,Divider,Button,Icon,Tag } from 'antd';
import { Input,Modal,Select } from 'antd';
import { Form,Pagination,Popconfirm } from 'antd';
import { message,Popover } from 'antd';
message.config({
    duration: 1,
});
const FormItem = Form.Item;
const Search = Input.Search;
const Option = Select.Option;
const { TextArea } = Input;
class reportDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: [],
            tableData: [],
            visible: false,
            visibleModify: false,
            visibleNull:false,
            recordAction:{},
            recordSelect:{},
            defaultSelectValue:'',
            cuSkGroupId:'',
            timeValueStartModify: '',
            timeValueEndModify: '',
            searchtype:'username',
        };
    }
    componentWillMount(){
        this.getTableData('',1,10);
        this.getComData();
    }
    componentDidMount(){
    	const obj = this.sortSearchData(this.props.location.search);
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
    getComData = () =>{
    	const params = {
    		pageNo:"1",
            pageSize:"999",
    	}
    	this.props.getCompanyInfo(params);
    }
    getTableData = (values,start,size) => {
        const params = {
            pageNo:start,
            pageSize:size,
        };
        if(this.state.searchtype == 'username'){
        	params.username=values
        }
        if(this.state.searchtype == 'caption'){
        	params.caption=values
        }
        if(this.state.searchtype == 'tenantName'){
        	params.tenantName=values
        }      
        this.props.getUserInfoMng(params);
    }
    onRowSelect = (record) => {
        this.setState({ recordSelect:record });
    }
    showModifyModal = (record) => {
        this.setState({ visibleModify: true,recordAction:record });
    }
    showAllVersion = (record) => {
    	this.props.history.push("/sym/home/tables/version");
    }
    clickToPublish = (record) => {
    }
    showModalCreate = () => {
        this.setState({ visible: true });
    }
    backtoLastPage = () => {
    	this.props.history.push("/sym/home/tables/report");
    }
    searchChange =(value) =>{
    	this.setState({ searchtype: value})
    }
    handleCancelModify = () => {
        this.setState({ visibleModify: false });
    }
    handleCancelCreate = () => {
        this.setState({ visible: false });
    }
    handleModify = () => {
        const form = this.formRefModifyData.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            values.id = this.state.recordAction.id
          this.props.UpdateUserInfo(values);
          
          form.resetFields();
            this.setState({ visibleModify: false });
        });
    }
    handleCreate = () => {
            const form = this.formRefDataCreate.props.form;
            form.validateFields((err, values) => {
                if (err) {
                    return;
                }
                this.props.addUserInfoList(values)
                form.resetFields();
                this.setState({ visible: false });
            });
    }
    saveFormRefModify = (formRef) => {
        this.formRefModifyData = formRef;
    }
    saveFormRefCreate = (formRef) => {
        this.formRefDataCreate = formRef;
    }
    activeConfirm = (record) => {
        const params = {
            status:record.status,
            windowId:record.windowId,
        }
        this.props.activeDataChatMng(params)
    }
    deleteConfirm = (record) => {
        const params = {
            id:record.id,
        }
        this.props.deleteDataUserInfo(params)
    }
    render() {
        let thisTemp = this
        const { classes } = this.props;       
        const columns = [{
            title: '报表名称',
            dataIndex: 'reportname',
            key: 'reportname',
            width: 200,
            render:(text,record) => (
            	<a >{text}</a>
            )
        }, {
            title: '发布状态',
            dataIndex: 'status',
            key: 'status',
            width:200,
            render:status => (
            	<span>{
            		<Tag color={status=='已发布'?'blue':'red'} key={status}>{status}</Tag>            		
            		}
            	</span>
            )
        }, {
            title: '发布日期',
            dataIndex: 'releaseTime',
            key: 'releaseTime',
            width: 200
        } ,{
            title: '发布版本号',
            dataIndex: 'version',
            key: 'version',
            width: 200
        },{
            title: '操作',
            key: 'action',
            width: 300,
            fixed:'right',
            render: (text, record) => (
                <span>
                    <a onClick={() => this.showModifyModal(record)}>编辑</a>             
                    <Divider type="vertical" />
                    <Popconfirm cancelText="取消" okText="确定" title="确定删除?" onConfirm={() => this.deleteConfirm(record)}>
                        <a>删除</a>
                    </Popconfirm>
                    <Divider type="vertical" />
                    <a onClick={() => this.showAllVersion(record)}>查看所有版本</a>
                    <Divider type="vertical" />
                    <a onClick={() => this.clickToPublish(record)} hidden={record.status=='未发布'?false:true}>发布</a>
                </span>
            ),
        }];
        var dataSource = [{
        	reportname:'报表一',
        	status:'已发布',
        	releaseTime:'2019-01-01',
        	version:'1.0.0'
        },{
        	reportname:'报表二',
        	status:'未发布',
        	releaseTime:'2019-01-02',
        	version:'1.0.1'
        },{
        	reportname:'报表三',
        	status:'已发布',
        	releaseTime:'2019-01-03',
        	version:'1.0.2'
        },{
        	reportname:'报表四',
        	status:'未发布',
        	releaseTime:'2019-01-04',
        	version:'1.0.3'
        },{
        	reportname:'报表五',
        	status:'已发布',
        	releaseTime:'2019-01-05',
        	version:'1.0.4'
        }]
        let comOptions = ''
        if(this.props.reportDetail.companyDatas!==undefined){
            comOptions = this.props.reportDetail.companyDatas.map((item,i) => {
                return <Option value={item.id}>{item.tenantName}</Option>
            })
        }
        const CollectionCreateForm = Form.create()(
            class extends React.Component {
                constructor(props) {
                    super(props);
                    this.state = {
                        cuSkGroupId:'',
                        robotId:'',
                        tenantId:''
                    };
                }
                handleChange = (value) => {
                	this.setState({ tenantId: value})
                }
                render() {
                    const { visible, onCancel, onCreate, form } = this.props;
                    const { getFieldDecorator } = form;
                    const dateFormat = 'YYYY/MM/DD';
                    return (
                       <Modal maskClosable={false}
                            visible={visible}
                            title="新增用户信息"
                            cancelText="取消" okText="确定"
                            onCancel={onCancel}
                            onOk={onCreate}
                        >
                            <Form layout="vertical">                  
                                <FormItem style={{marginTop:-15}} label="用户名">
                                    {getFieldDecorator('username', {                             
                                        rules: [{ required: true, message: '请输入修改用户名!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>                              
                                <FormItem style={{marginTop:-15}} label="企业名称">
                                    {getFieldDecorator('tenantId', {
                                    	rules: [{ required: true, message: '请输入企业名称!' }],
                                    })(
                                    	<Select
                                    	   showSearch
                                    	   placeholder="请选择所属企业"
                                    	   optionFilterProp="children"
                                    	   onChange={this.handleChange}
                                    	   filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    	>
                                    	  {comOptions}
                                    	</Select>
                                    	)}
                                </FormItem>
                                <FormItem style={{marginTop:-15}} label="用户头像路径">
                                    {getFieldDecorator('userIcon', {
                                    	rules: [{ required: true, message: '请输入用户头像路径!' }],
                                    })(
                                    	<Input />
                                    )}
                                </FormItem>      
                                <FormItem style={{marginTop:-15}} label="别名">
                                    {getFieldDecorator('caption', {
                                    	rules: [{ required: true, message: '请输入别名!' }],
                                    })(<Input />)}
                                </FormItem>
                                <FormItem style={{marginTop:-15}} label="工号">
                                    {getFieldDecorator('jobNumber', {
                                    	rules: [{ required: false, message: '请输入工号!' }],
                                    })(<Input />)}
                                </FormItem>
                            </Form>
                        </Modal>
                    );
                }
            }
        );
        let changeCom = ''
        if(this.props.reportDetail.companyDatas!==undefined){
            changeCom = this.props.reportDetail.companyDatas.map((item,i) => {
                return <Option value={item.id}>{item.tenantName}</Option>
            })
        }
        const CollectionModifyForm = Form.create()(
            class extends React.Component {
                constructor(props) {
                    super(props);
                    this.state = {
                        cuSkGroupId:'',
                        robotId:''
                    };
                }
                render() {
                    const { visible, onCancel, onCreate, form } = this.props;
                    const { getFieldDecorator } = form;
                    const dateFormat = 'YYYY/MM/DD';
                    return (
                       <Modal maskClosable={false}
                            visible={visible}
                            title="修改用户信息"
                            cancelText="取消" okText="确定"
                            onCancel={onCancel}
                            onOk={onCreate}
                        >
                            <Form layout="vertical">
                                <FormItem style={{marginTop:-15}} label="企业名称">
                                    {getFieldDecorator('tenantId', {
                                    	rules: [{ required: true, message: '请输入企业名称!' }],
                                    })(
                                    	<Select
                                    	   showSearch
                                    	   placeholder="请选择所属企业"
                                    	   optionFilterProp="children"
                                    	   onChange={this.handleChange}
                                    	   filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    	>
                                    	  {changeCom}
                                    	</Select>
                                    )}
                                </FormItem>
                                <FormItem style={{marginTop:-15}} label="用户头像路径">
                                    {getFieldDecorator('userIcon', {
                                    	rules: [{ required: true, message: '请输入用户头像路径!' }],
                                    })(<Input />)}
                                </FormItem>
                                <FormItem style={{marginTop:-15}} label="别名">
                                    {getFieldDecorator('caption', {
                                    	rules: [{ required: true, message: '请输入别名!' }],
                                    })(<Input />)}
                                </FormItem>
                            </Form>
                        </Modal>
                    );
                }
            }
        );
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
                                    <Select defaultValue="username" style={{ width:150,marginRight:10 }} onChange={this.searchChange}>
                                       <Option value="username">用户名</Option >
                                       <Option value="tenantName">企业名称</Option>
                                       <Option value="caption">用户别名</Option>
                                    </Select>
                                    <Search
                                        placeholder="搜索"
                                        onSearch={value => this.getTableData(value,1,10)}
                                        enterButton="搜索"
                                        style={{ width: 240,paddingRight:10,marginRight:10 }}
                                    />
                                    <Button type="primary" shape="round" onClick={this.showModalCreate} style={{marginRight:10 }}>添加</Button>
                                    <Button shape="round"  onClick={this.backtoLastPage} style={{marginRight:10 }}>返回上一页</Button>
                                </Grid>
                            </Grid>
                        </CardHeader>
                        <CardBody>
                            <Table onRow={(record) => {
                                    return {
                                    onClick: () => {this.onRowSelect(record)},       
                                    };
                                }} key={"reportDetail"} pagination={false} columns={columns} dataSource={dataSource} scroll={{ x: 1000 , y: 360}} />
                            <Pagination defaultCurrent={1} defaultPageSize={10} showTotal={total => `共 ${total} 条`} total={dataSource.length} style={{textAlign:'right',marginTop:25}}  onChange={(page, pageSize)=>this.getTableData('',page,10)}/>
                        </CardBody>
                    </Card>
                </GridItem>
                <CollectionCreateForm
                    wrappedComponentRef={this.saveFormRefCreate}
                    visible={this.state.visible}
                    onCancel={this.handleCancelCreate}
                    onCreate={this.handleCreate}
                />
                <CollectionModifyForm
                    wrappedComponentRef={this.saveFormRefModify}
                    visible={this.state.visibleModify}
                    onCancel={this.handleCancelModify}
                    onCreate={this.handleModify}
                />
            </GridContainer>
        );
    }
}
const mapStateToProps = (state) => {
    return{
        reportDetail: state.reportDetail,
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        getUserInfoMng: (params) => {
            dispatch(getUserInfoMng(params))
        },
        deleteDataUserInfo: (params) => {
            dispatch(deleteDataUserInfo(params))
        },
        UpdateUserInfo: (params) => {
            dispatch(UpdateUserInfo(params))
        },
        getCompanyInfo: (params) => {
            dispatch(getCompanyInfo(params))
        },
        addUserInfoList: (params) => {
            dispatch(addUserInfoList(params))
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withStyles(extendedTablesStyle)(reportDetail));
