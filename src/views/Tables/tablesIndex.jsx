import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from '@material-ui/core/Grid';
import Description from "@material-ui/icons/Description";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import 'App.css'
import extendedTablesStyle from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.jsx";
import { getDataCompany, updateDataCompany, deleteDataCompany, createDataCompany } from "actions/tablesIndex";
import { connect } from "react-redux";
import { Table, Divider, Button, Icon } from 'antd';
import { Tabs } from 'antd';
import { Input, Modal } from 'antd';
import { Form, Pagination, Popconfirm, Select, Popover } from 'antd';
const FormItem = Form.Item;
const Search = Input.Search;
const Option = Select.Option;
class tablesIndex extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			addvisible:false,
			recordAction: {},
			changevisible:false,
			searchvalues:'',
			currentPage:1
		}
	}
	componentWillMount() {
		this.getTableData('',1,10)
	}
	componentDidMount() {		
		
	}
	pageChange = (value,page,size) =>{
		this.getTableData(value,page,size);
		this.setState({
			currentPage:page
		})
	}
	getTableData = (caption,start,size) => {
      const params = {
      	    tenantName:caption,
            pageNo:start,
            pageSize:size,
        };
      this.props.getDataCompany(params);      
    }
	clickTochangecomInfo = (record) => {
		this.setState({
			changevisible:true,
			recordAction:record
		})
	}
	deleteConfirm = (record) => {
		const params = {
			id:record.id
		}
		this.props.deleteDataCompany(params);
	}
	clickToAdd = () => {
		this.setState({
			addvisible:true
		})
	}
	saveFormRefCompany = (formRef) =>{
		this.formRefComData = formRef;
	}
	saveFormRefModify = (formRef) =>{
		this.formRefModifyData = formRef
	}
	changeCancelAddlist = () =>{
	   this.setState({
			changevisible:false
		})
	}
	changeAddlist = () =>{
		const form = this.formRefModifyData.props.form;
		form.validateFields((err, values) => {
            if (err) {
                return;
            }
            values.id=this.state.recordAction.id;
            values.pageNo = this.state.currentPage;
            this.props.updateDataCompany(values);
            form.resetFields();
            this.setState({
			   changevisible:false,			
		    })
       });		
	}
	handleCancelAddList = () =>{
		this.setState({
			addvisible:false
		})
	}
	searchCompany = (value) =>{
		this.getTableData(value,1,10)
		this.setState({
			searchvalues:value
		})
	}
	handleAddList = () =>{
		const form = this.formRefComData.props.form;	
		form.validateFields((err,values)=>{
			if(err){
				return;
			}
			form.resetFields();
			this.props.createDataCompany(values)
			this.setState({
				addvisible:false
			})
		})
	}
	render() {		
		let thisTemp = this
		const columns = [{
            title: '企业名称',
            dataIndex: 'tenantName',
            key: 'tenantName',
            width: '30%',
            render: text => <Popover content={(
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
        },{
			title:'企业id',
			dataIndex: 'id',
			key: 'id',
			width: '40%',
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
		},{
			title:'操作',
			dataIndex: 'operate',
			key:'operate',
			render:(text,record)=>(
				<span>
				 <a onClick={()=>this.clickTochangecomInfo(record)}>修改</a>
				 <Divider type="vertical"/>
				 <Popconfirm cancelText="取消" onText="确定" title="确定删除企业信息?" onConfirm={() => this.deleteConfirm(record)}>
				   <a>删除</a>
				 </Popconfirm>
				</span>
			)			
		}];
		const dataSource = [{
			tenantName:'企业一',
			id:'110011'
		},{
			tenantName:'企业二',
			id:'110012'
		},{
			tenantName:'企业三',
			id:'110013'
		},{
			tenantName:'企业四',
			id:'110014'
		},{
			tenantName:'企业五',
			id:'110015'
		},{
			tenantName:'企业六',
			id:'110016'
		},{
			tenantName:'企业七',
			id:'110017'
		},{
			tenantName:'企业八',
			id:'110018'
		},{
			tenantName:'企业九',
			id:'110019'
		},{
			tenantName:'企业十',
			id:'110020'
		},{
			tenantName:'企业十一',
			id:'110021'
		},{
			tenantName:'企业十二',
			id:'110022'
		}]	
		const AddCompanyModal = Form.create()(
			class extends React.Component{
				constructor(props){
					super(props);
					this.state = {
						addvisible:false,
					};					
				}							
				render(){
					const {
						addvisible,	
						onCancel,
						onCreate,
						form
					} = this.props
					const {
						getFieldDecorator
					} = form;
					return(
						<Modal
						 visible={addvisible}
						 title="新增企业" cancelText="取消" okText="确定"
						 onCancel={onCancel}
						  onOk={onCreate}
						>
						<Form layout="vertical">
                                <FormItem label="企业名称">
                                    {getFieldDecorator('tenantName', {
                                        rules: [{ required: true, message: '请输入新增企业用户名称!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                            </Form>
						</Modal>
					)
				}				
			}			
		)
	   const ChangeCompanyModal = Form.create()(
			class extends React.Component{
				constructor(props){
					super(props);
					this.state = {
						changevisible:false,
						recordAction:{}
					};					
				}				
				render(){
					const {
						changevisible,	
						onCancel,
						onCreate,
						form
					} = this.props
					const {
						getFieldDecorator
					} = form;
					return(
						<Modal
						 visible={changevisible}
						 title="修改企业" cancelText="取消" okText="确定"
						 onCancel={onCancel}
						  onOk={onCreate}
						>
						<Form layout="vertical">
                                <FormItem label="企业名称">
                                    {getFieldDecorator('tenantName', {
                                    	initialValue:  thisTemp.state.recordAction.tenantName ,
                                        rules: [{ required: true, message: '请输入新增企业用户名称!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                            </Form>
						</Modal>
					)
				}				
			}			
		)		
		return(
			<GridContainer>
			<Card>
			<CardHeader color="rose" icon>
                     <Grid container spacing={24}>
                          <Grid item xs={6}>
                               <CardIcon color="info">
                                    <Description/>
                               </CardIcon>
                               <h4></h4>
                          </Grid> 
                          <Grid item style={{textAlign:'right',marginTop:10}} xs={6}>                          
                            <Search 
                            onSearch={value => this.searchCompany(value)} 
                            style={{width:220,marginRight:10}}
                            placeholder="企业名称搜索"/>
                            <Button type="primary" shape="round" onClick={this.clickToAdd} style={{marginRight:10}}>添加</Button>
                          </Grid>
                      </Grid>
            </CardHeader>
            <CardBody>    
               <Table onRow={(record)=>{
               	return {
               		onClick: () =>{}
               	}
               }} key={'tableIndex'} pagination={false} columns={columns} dataSource={this.props.tablesIndex.tableDataCompany}/>
               <Pagination showTotal={total => `共 ${total} 条`} defaultCurrent={1} defaultPageSize={10} total={this.props.tablesIndex.tableCountCompany} style={{textAlign:'right',marginTop:25}} onChange={(page,size)=>this.pageChange(this.state.searchvalues,page,10)}/>
            </CardBody>			
			</Card>	
			<AddCompanyModal 
			  wrappedComponentRef={this.saveFormRefCompany}
			  addvisible={this.state.addvisible}
			  onCancel={this.handleCancelAddList}
			  onCreate={this.handleAddList}
			/>
			<ChangeCompanyModal
			 wrappedComponentRef={this.saveFormRefModify}
			 changevisible={this.state.changevisible}
			 onCancel={this.changeCancelAddlist}
			 onCreate={this.changeAddlist}
			/>
            </GridContainer>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		tablesIndex: state.tablesIndex,
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		getDataCompany: (params) => {
			dispatch(getDataCompany(params))
		},
		updateDataCompany: (params) => {
			dispatch(updateDataCompany(params))
		},
		deleteDataCompany: (params) => {
			dispatch(deleteDataCompany(params))
		},
		createDataCompany: (params) => {
			dispatch(createDataCompany(params))
		},
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(extendedTablesStyle)(tablesIndex));