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
import {addOldUserInfoList,UpdateUserInfo,getCompanyInfo,addUserInfoList,getUserInfoMng,deleteDataUserInfo} from "actions/usersMng";
import {connect} from "react-redux";
import {Table, Divider,Button } from 'antd';
import {Input,Modal,Select } from 'antd';
import {Form,Pagination,Popconfirm } from 'antd';
import { message ,Row,Col,Popover} from 'antd';
import { TimePicker,DatePicker } from 'antd';
import moment from 'moment';
message.config({
    duration: 1,
});
const FormItem = Form.Item;
const Search = Input.Search;
const Option = Select.Option;
const { TextArea } = Input;
class usersMng extends React.Component {
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
            oldvisible:false,
            searchvalue:'',
            currentpage:1,
        };
    }
    componentWillMount(){
        this.getTableData('',1,10);
        this.getComData();
    }
    componentDidMount(){    
    	   
    }
    getComData = () =>{
    	const params = {
    		pageNo:"1",
            pageSize:"999",
    	}
     if(window.sessionStorage.getItem('role')!='ROLE_ADMIN'){
     	this.props.getCompanyInfo(params);
     }    	
    }
    pageChange = (value,page,size) =>{
    	this.setState({
    		currentpage:page
    	})
    	this.getTableData(value,page,size)
    }
    getTableData = (values,start,size) => {
        const params = {
            pageNo:start,
            pageSize:size,            
        };
        if(window.sessionStorage.getItem('role')=='ROLE_ADMIN'){
        	params.tenantId=window.sessionStorage.getItem('tenantId')
        }
        if(this.state.searchtype == 'username'){
        	params.username=values
        }
        if(this.state.searchtype == 'caption'){
        	params.caption=values
        } 
        this.props.getUserInfoMng(params);
    }
    onRowSelect = (record) => {
        this.setState({ recordSelect:record });
    }
    showModifyModal = (record) => {
        this.setState({ visibleModify: true,recordAction:record });
    }
    showModalCreate = () => {
        this.setState({ visible: true });
    }
    showAddoldUser = () => {
    	this.setState({ oldvisible: true})
    }
    searchUser = (value) => {
    	this.getTableData(value,1,10);
    	this.setState({
    		searchvalue:value
    	})
    }
    searchChange =(value) =>{
    	this.setState({ searchtype: value})
    }
    handleCancelModify = () => {
        this.setState({ visibleModify: false });
    }
    handleCancelAddUser = () => {
        this.setState({ oldvisible: false });
    }
    handleCancelCreate = () => {
        this.setState({ visible: false });
    }
    handleAddUser = () => {
    	const form = this.formRefModifyAddUser.props.form;
    	 form.validateFields((err, values) => {
                if (err) {
                    return;
                }
                if(window.sessionStorage.getItem('role')=='ROLE_ADMIN'){
        	        values.tenantId=window.sessionStorage.getItem('tenantId')
                }
                this.props.addOldUserInfoList(values);
                form.resetFields();
                this.setState({ oldvisible: false });
          });
    }
    handleModify = () => {
        const form = this.formRefModifyData.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            values.pageNo = this.state.currentpage;
            values.id = this.state.recordAction.id;
            values.tenantId=window.sessionStorage.getItem('tenantId');
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
                if(window.sessionStorage.getItem('role')=='ROLE_ADMIN'){
        	        values.tenantId=window.sessionStorage.getItem('tenantId');        	        
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
    saveFormRefAddUser = (formRef) => {
    	this.formRefModifyAddUser = formRef;
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
            title: '用户id',
            dataIndex: 'id',
            key: 'id',
            width: 180,
            fixed: 'left',
            render:text => <Popover content={(
                <div style={{width:200}}>
                  <p>{text}</p>
                </div>
              )}>
             <span style={{overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    display: 'inline-block',
                    width: 150
                }}>{text}</span>
          </Popover>
        }, {
            title: '用户名',
            dataIndex: 'username',
            key: 'username',
            width:200,
            render:text => <Popover content={(
                <div style={{width:200}}>
                  <p>{text}</p>
                </div>
              )}>
             <span style={{overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    display: 'inline-block',
                    width: 150
                }}>{text}</span>
          </Popover>
        }, {
            title: '企业名称',
            dataIndex: 'tenantName',
            key: 'tenantName',
            width: 200,
            render:text => <Popover content={(
                <div style={{width:200}}>
                  <p>{text}</p>
                </div>
              )}>
             <span style={{overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    display: 'inline-block',
                    width: 150
                }}>{text}</span>
          </Popover>
        }, {
            title: '用户别名',
            key: 'caption',
            dataIndex: 'caption',
            width:200,
        },{
            title: '操作',
            key: 'action',
            width: 150,
            render: (text, record) => (
                <span>
                    <a onClick={() => this.showModifyModal(record)}>修改</a>             
                    <Divider type="vertical" />
                    <Popconfirm cancelText="取消" okText="确定" title="确定删除?" onConfirm={() => this.deleteConfirm(record)}>
                        <a>删除</a>
                    </Popconfirm>
                </span>
            ),
        }];
        let comOptions = ''
        if(this.props.usersMng.companyDatas!==undefined){
            comOptions = this.props.usersMng.companyDatas.map((item,i) => {
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
                                        rules: [{ required: true, message: '请输入正确格式的用户名!',pattern:/^[0-9a-zA-Z\.\_\?\-]+$/}],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>                              
                                <FormItem style={{marginTop:-15,display:window.sessionStorage.getItem('comselecthide')}} label="企业名称">
                                    {getFieldDecorator('tenantId', {
                                    	rules: [{ required: window.sessionStorage.getItem('comselecthide')=='none'?false:true, message: '请输入企业名称!' }],
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
                                    	rules: [{ required: false, message: '请输入用户头像路径!' }],
                                    })(
                                    	<Input />
                                    )}
                                </FormItem>      
                                <FormItem style={{marginTop:-15}} label="别名">
                                    {getFieldDecorator('caption', {
                                    	rules: [{ required: true, message: '请输入别名!' }],
                                    })(<Input/>)}
                                </FormItem>
                                <FormItem style={{marginTop:-15}} label="工号">
                                    {getFieldDecorator('jobNumber', {
                                    	rules: [{ required: false, message: '请输入工号!' }],
                                    })(<Input />)}
                                </FormItem>
                                <FormItem style={{marginTop:-15}} label="手机号码">
                                    {getFieldDecorator('iphone', {
                                    	rules: [{ required: true, message: '请输入格式正确的手机号码!' ,pattern:/^1(3|4|5|7|8)\d{9}$/}],
                                    })(<Input />)}
                                </FormItem>
                            </Form>
                        </Modal>
                    );
                }
            }
        );
        let changeCom = ''
        if(this.props.usersMng.companyDatas!==undefined){
            changeCom = this.props.usersMng.companyDatas.map((item,i) => {
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
                    return (
                       <Modal maskClosable={false}
                            visible={visible}
                            title="修改用户信息"
                            cancelText="取消" okText="确定"
                            onCancel={onCancel}
                            onOk={onCreate}
                        >
                            <Form layout="vertical">
                                
                                <FormItem style={{marginTop:-15}} label="用户头像路径">
                                    {getFieldDecorator('userIcon', {           
                                    	rules: [{ required: false, message: '请输入用户头像路径!' }],
                                    })(<Input />)}
                                </FormItem>
                                <FormItem style={{marginTop:-15}} label="别名">
                                    {getFieldDecorator('caption', {
                                    	rules: [{ required: false, message: '请输入别名!' }],
                                    	initialValue:thisTemp.state.recordAction.caption
                                    })(<Input/>)}
                                </FormItem>
                            </Form>
                        </Modal>
                    );
                }
            }
        );
        const CollectionAddUser = Form.create()(
           class extends React.Component {
                constructor(props) {
                    super(props);
                    this.state = {
                       
                    };
                }
                render() {
                    const { visible, onCancel, onCreate, form } = this.props;
                    const { getFieldDecorator } = form;
                    return (
                       <Modal maskClosable={false}
                            visible={visible}
                            title="添加旧用户信息"
                            cancelText="取消" okText="确定"
                            onCancel={onCancel}
                            onOk={onCreate}
                        >
                            <Form layout="vertical">
                                <FormItem style={{marginTop:-15}} label="手机号码">
                                    {getFieldDecorator('iphone', {
                                    	rules: [{ required: true, message: '请输入格式正确的手机号码!' ,pattern:/^1(3|4|5|7|8)\d{9}$/ }],
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
                                <Grid item xs={3}>
                                    <CardIcon color="info">
                                        <Description />
                                    </CardIcon>
                                    <h4 className={classes.cardIconTitle}> </h4>
                                </Grid>
                                <Grid style={{textAlign:'right',marginTop:10}} item xs={9}>
                                    <Select defaultValue="username" style={{ width:150,marginRight:10 }} onChange={this.searchChange}>
                                       <Option value="username">用户名</Option >
                                       <Option value="caption">用户别名</Option>
                                    </Select>
                                    <Search
                                        placeholder="搜索"
                                        onSearch={value => this.searchUser(value)}
                                        style={{ width: 240,paddingRight:10,marginRight:10 }}
                                    />
                                    <Button type="primary" shape="round" onClick={this.showModalCreate} style={{marginRight:10 }}>{window.sessionStorage.getItem('role')=="ROLE_ADMIN"?"添加新用户":"添加"}</Button>
                                    <Button style={{marginRight:10 }} hidden={window.sessionStorage.getItem('role')=="ROLE_ADMIN"?false:true} type="primary" shape="round" onClick={this.showAddoldUser}>添加旧用户</Button>
                                </Grid>
                            </Grid>
                        </CardHeader>
                        <CardBody>`
                            <Table onRow={(record) => {
                                    return {
                                    onClick: () => {this.onRowSelect(record)},       
                                    };
                                }} key={"usersMng"} pagination={false} columns={columns} dataSource={this.props.usersMng.userinfodetail} />
                            <Pagination defaultCurrent={1} defaultPageSize={10} showTotal={total => `共 ${total} 条`} total={this.props.usersMng.userinfototal} style={{textAlign:'right',marginTop:25}}  onChange={(page, pageSize)=>this.pageChange(this.state.searchvalue,page,10)}/>
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
                <CollectionAddUser
                   wrappedComponentRef={this.saveFormRefAddUser}
                   visible={this.state.oldvisible}                  
                   onCancel={this.handleCancelAddUser}
                   onCreate={this.handleAddUser}
                />
            </GridContainer>
        );
    }
}
const mapStateToProps = (state) => {
    return{
        usersMng: state.usersMng,
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
        },
        addOldUserInfoList: (params) => {
        	dispatch(addOldUserInfoList(params))
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withStyles(extendedTablesStyle)(usersMng));
