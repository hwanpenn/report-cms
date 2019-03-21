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
import { resetUserPassword,getUserPassword} from "actions/passwordMng";
import {connect} from "react-redux";
import {Table, Divider,Button } from 'antd';
import {Input,Modal,Select } from 'antd';
import {Form,Pagination,Popconfirm } from 'antd';
import { message,Popover } from 'antd';
import moment from 'moment';
message.config({
    duration: 1,
});
const FormItem = Form.Item;
const Search = Input.Search;
const Option = Select.Option;
const { TextArea } = Input;
class passwordMng extends React.Component {
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
            robotId:'',
            timeValueStart: '',
            timeValueEnd: '',
            timeValueStartModify: '',
            timeValueEndModify: '',
            searchtype:'username',
            searchValue:''
        };
    }
    componentWillMount(){
        this.getTableData('',1,10);
    }
    componentDidMount(){
    	
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
        this.props.getUserPassword(params);
    }
    searchChange = (value) => {
    	this.setState({ searchtype: value})
    }
    searchPassword = (value) => {
    	this.getTableData(value,1,10);
    	this.setState({
    		searchValue:value
    	})
    }
    onRowSelect = (record) => {
        this.setState({ recordSelect:record });
    }
    showModifyModal = (record) => {
        this.setState({ visibleModify: true,recordAction:record });
    }
    handleCancelModify = () => {
        this.setState({ visibleModify: false });
    }
    handleCancelCreate = () => {
        this.setState({ visible: false });
    }
    handleModify = () => {
        const thisObj = this;
        const form = this.formRefModifyData.props.form;
        form.validateFields((err, values) => {
        	if (err) {
        		return;
        	}
        	const uPattern = /^[a-zA-Z0-9_-]{4,16}$/
        	if(uPattern.test(values.newPassword)==false){
        		message.Info("密码需要4位以上的字母或数字");
        	}else{
        		if(values.newPassword==values.password){        			
        			values.id = this.state.recordAction.id;
        			form.resetFields();
        			this.props.resetUserPassword(values);
        			thisObj.setState({
        				visibleModify:false
        			})
        		}else{
        			message.info("两次密码输入不一致")
        		}
        	}
        });
    }
    saveFormRefModify = (formRef) => {
        this.formRefModifyData = formRef;
    }
    resetConfirm = (record) => {
        const params = {
        	id:record.id
        }
        this.props.resetUserPassword(params);
    }
    render() {
        let thisTemp = this
        const { classes } = this.props;       
        const columns = [{
            title: '用户id',
            dataIndex: 'id',
            key: 'id',
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
            key: 'tenantName',
            dataIndex: 'tenantName',
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
            title: '用户身份',
            key: 'caption',
            dataIndex: 'caption',
            width: 200
        },       
        {
            title: '操作',
            key: 'action',
            width: 200,
            fixed: 'right',
            render: (text, record) => (
                <span>
                    <a onClick={() => this.showModifyModal(record)} >修改密码</a>             
                    <Divider type="vertical" />
                    <Popconfirm cancelText="取消" okText="确定" title="确定重置密码?" onConfirm={() => this.resetConfirm(record)}>
                        <a>重置密码</a>
                    </Popconfirm>
                </span>
            ),
        }];
        const CollectionModifyForm = Form.create()(
            class extends React.Component {
                constructor(props) {
                    super(props);
                    this.state = {
                        cuSkGroupId:'',
                        robotId:''
                    };
                }
                onChangeStartModify = (time, timeString) => {
                    this.setState({ timeValueStartModify: timeString });
                }
                onChangeEndModify = (time, timeString) => {
                    this.setState({ timeValueEndModify: timeString });
                }
                render() {
                    const { visible, onCancel, onCreate, form } = this.props;
                    const { getFieldDecorator } = form;
                    return (
                       <Modal maskClosable={false}
                            visible={visible}
                            title="修改密码"
                            cancelText="取消" okText="确定"
                            onCancel={onCancel}
                            onOk={onCreate}
                        >
                            <Form layout="vertical">
                                <FormItem label="旧用户密码">
                                    {getFieldDecorator('oldPassword', {                                    
                                        rules: [{ required: true, message: '请输入旧用户密码!' }],
                                    })(
                                        <Input type="password"/>
                                    )}
                                </FormItem>
                                <FormItem style={{marginTop:-15}} label="新用户密码">
                                    {getFieldDecorator('newPassword', {                                     
                                        rules: [{ required: true, message: '请输入新用户密码!' }],
                                    })(
                                        <Input type="password" />
                                    )}
                                </FormItem>
                                <FormItem style={{marginTop:-15}} label="确认新用户密码">
                                    {getFieldDecorator('password', {                        
                                        rules: [{ required: true, message: '请输入确认密码!' }],
                                    })(<Input type="password" />)}
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
                                <Grid style={{textAlign:'right',marginTop:10}} item xs={6}>
                                    <Select defaultValue="username" style={{ width:150,marginRight:10 }} onChange={this.searchChange}>
                                       <Option value="username">用户名</Option >
                                       <Option value="tenantName">企业名称</Option>
                                       <Option value="caption">用户别名</Option>
                                    </Select>
                                    <Search
                                        placeholder="名称搜索"
                                        onSearch={value => this.searchPassword(value)}
                                       style={{width:250,marginRight:10}}
                                    />
                                </Grid>
                            </Grid>
                        </CardHeader>
                        <CardBody>
                            <Table onRow={(record) => {
                                    return {
                                    onClick: () => {this.onRowSelect(record)},       
                                    };
                                }} key={"passwordMng"} pagination={false} columns={columns} dataSource={this.props.passwordMng.UserInfoDetail} scroll={{ x: 800 , y: 360}} />
                            <Pagination defaultCurrent={1} defaultPageSize={10} showTotal={total => `共 ${total} 条`} total={this.props.passwordMng.UserInfoAccount} style={{textAlign:'right',marginTop:25}}  onChange={(page, pageSize)=>this.getTableData(this.state.searchValue,page,10)}/>
                        </CardBody>
                    </Card>
                </GridItem>
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
        passwordMng: state.passwordMng,
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        getUserPassword: (params) => {
        	dispatch(getUserPassword(params))
        },
        resetUserPassword: (params) => {
            dispatch(resetUserPassword(params))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(extendedTablesStyle)(passwordMng));
