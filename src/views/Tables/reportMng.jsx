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
import { deleteDataReportDetail, updateReportStatus, getReportDetail, addReportSort, UpdateReportSort, addUserInfoList, getReportSort, deleteDataReportSort } from "actions/reportMng";
import { connect } from "react-redux";
import { Table, Divider, Button, Tree } from 'antd';
import { Input, Modal, Select, Icon, Menu, Radio } from 'antd';
import { Form, Pagination, Popconfirm, Tag } from 'antd';
import { message, Popover } from 'antd';
message.config({
	duration: 1,
});
const DirectoryTree = Tree.DirectoryTree;
const FormItem = Form.Item;
const Search = Input.Search;
const Option = Select.Option;
const TreeNode = Tree.TreeNode;
const RadioGroup = Radio.Group;
const {
	TextArea
} = Input;
class reportMng extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			checked: [],
			tableData: [],
			visible: false,
			visibleModify: false,
			ReportvisibleModify: false,
			visibleNull: false,
			recordAction: {},
			recordReportAction: {},
			recordSelect: {},
			defaultSelectValue: '',
			cuSkGroupId: '',
			timeValueStartModify: '',
			timeValueEndModify: '',
			thiscatagoryId: '',
			selectedKeys: [''],
			selectcomvisible: false,
			companyRadio: [],
			selectedComId: '',
			href: ''
		};
	}
	componentWillMount() {

	}
	componentDidMount() {
		var href = window.location.href;
		var hrefs = href.slice(0, href.indexOf('/sym'));
		const obj = this.sortSearchData(this.props.location.search);
		if(window.sessionStorage.getItem('role') == 'ROLE_USER') {
			var tenantData = window.localStorage.getItem('tenantArr');
			var tenantArr = [];
			if(tenantData != '') {
				var datas = tenantData.slice(1, tenantData.length - 1);
				var dataArr = datas.split('Tenant(');
				for(var i = 0; i < dataArr.length; i++) {
					if(dataArr[i].indexOf('id') != -1) {
						var nodot = dataArr[i].replace(/,/g, "");
						var dataid = nodot.slice(nodot.indexOf('id') + 3, nodot.indexOf('tenant') - 1)
						var dataname = nodot.slice(nodot.indexOf('tenant') + 11, nodot.indexOf(')'))
						var params = {
							id: dataid,
							tenantName: dataname
						}
						tenantArr.push(params);
					}
				}
			}
			if(tenantArr.length == 1) {
				this.setState({
					selectedComId: tenantArr[0].id
				})
				this.getTableData('', 1, 10, tenantArr[0].id);
				this.getReportTableData('', '', 1, 10, tenantArr[0].id);
			}
			if(tenantArr.length > 1) {
				this.setState({
					selectcomvisible: true,
					companyRadio: tenantArr
				})
			} else {

			}
		} else if(window.sessionStorage.getItem('role') == 'ROLE_ADMIN') {
			this.setState({
				selectedComId: window.sessionStorage.getItem('tenantId')
			})
			this.getTableData('', 1, 10, window.sessionStorage.getItem('tenantId'));
			this.getReportTableData('', '', 1, 10, window.sessionStorage.getItem('tenantId'));
		}
	}
	sortSearchData = (url) => {
		var obj = {};
		var keyvalue = [];
		var key = "",
			value = "";
		var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
		for(var i in paraString) {
			keyvalue = paraString[i].split("=");
			key = keyvalue[0];
			value = keyvalue[1];
			obj[key] = value;
		}
		this.setState({
			selectedKeys: [obj.layer],
		})
		return obj
	}
	getTableData = (values, start, size, id) => {
		const params = {
			pageNo: start,
			pageSize: size,
		};
		if(window.sessionStorage.getItem('role') == 'ROLE_ADMIN') {
			params.tenantId = window.sessionStorage.getItem('tenantId')
		}
		if(window.sessionStorage.getItem('role') == 'ROLE_USER') {
			params.tenantId = id
		}
		this.props.getReportSort(params);
	}
	onRowSelect = (record) => {
		this.setState({
			recordSelect: record
		});
	}
	showModifyModal = (record) => {
		this.setState({
			visibleModify: true,
			recordAction: record
		});
	}
	showReportModifyModal = (record) => {
		this.setState({
			ReportvisibleModify: true,
			recordReportAction: record
		});
	}
	showModalCreate = () => {
		this.setState({
			visible: true
		});
	}
	handleCancelModify = () => {
		this.setState({
			visibleModify: false
		});
	}
	handleReportCancelModify = () => {
		this.setState({
			ReportvisibleModify: false
		});
	}
	handleCancelCreate = () => {
		this.setState({
			visible: false
		});
	}
	handleModify = () => {
		const form = this.formRefModifyData.props.form;
		form.validateFields((err, values) => {
			if(err) {
				return;
			}
			values.categoryId = this.state.recordAction.categoryId;
			values.tenantId = this.state.recordAction.tenantId;
			this.props.UpdateReportSort(values);
			form.resetFields();
			this.setState({
				visibleModify: false
			});
		});
	}
	handleCreate = () => {
		const form = this.formRefDataCreate.props.form;
		form.validateFields((err, values) => {
			if(err) {
				return;
			}
			if(window.sessionStorage.getItem('role') == 'ROLE_ADMIN') {
				values.tenantId = window.sessionStorage.getItem('tenantId')
			} else if(window.sessionStorage.getItem('role') == 'ROLE_USER') {
				values.tenantId = this.state.selectedComId
			}
			this.props.addReportSort(values)
			form.resetFields();
			this.setState({
				visible: false
			});
		});
	}
	saveFormRefModify = (formRef) => {
		this.formRefModifyData = formRef;
	}
	saveFormRefCreate = (formRef) => {
		this.formRefDataCreate = formRef;
	}
	showReportDetail = (record) => {
		this.props.history.push("/sym/home/tables/version?id=" + record.categoryId + '&detail=' + record.categoryDesc)
	}
	showAllVersion = (record) => {
		this.props.history.push("/sym/home/tables/version?categoryId=" + record.categoryId + '&reportKey=' + record.reportKey + '&tenantId=' + this.state.selectedComId);
	}
	activeConfirm = (record) => {
		const params = {
			status: record.status,
			windowId: record.windowId,
		}
		this.props.activeDataChatMng(params)
	}
	queryReportTable = (record) => {
		this.setState({
			thiscatagoryId: record.categoryId
		})
		this.getReportTableData(record.categoryId, '', 1, 10, this.state.selectedComId)
	}
	getReportTableData = (values, name, start, size, id) => {
		const params = {
			categoryId: values,
			reportname: name,
			pageNo: start,
			pageSize: size,
		}
		if(window.sessionStorage.getItem('role') == 'ROLE_ADMIN') {
			params.tenantId = window.sessionStorage.getItem('tenantId')
		}
		if(window.sessionStorage.getItem('role') == 'ROLE_USER') {
			params.tenantId = id;
		}
		this.props.getReportDetail(params);
	}
	deleteConfirm = (record) => {
		const params = {
			categoryId: record.categoryId,
		}
		if(window.sessionStorage.getItem('role') == 'ROLE_ADMIN') {
			params.tenantId = window.sessionStorage.getItem('tenantId')
		} else if(window.sessionStorage.getItem('role') == 'ROLE_USER') {
			params.tenantId = this.state.selectedComId
		}
		this.props.deleteDataReportSort(params)
	}
	deleteReportConfirm = (record) => {
		const params = {
			id: record.id,
			reportKey: record.reportKey
		}
		if(window.sessionStorage.getItem('role') == 'ROLE_ADMIN') {
			params.tenantId = window.sessionStorage.getItem('tenantId')
		} else if(window.sessionStorage.getItem('role') == 'ROLE_USER') {
			params.tenantId = this.state.selectedComId
		}
		this.props.deleteDataReportDetail(params);
	}
	clickToPublish = (record) => {
		const params = {
			categoryId: record.categoryId,
			reportKey: record.reportKey,
			tenantId: record.tenantId,
			pageNo: '1',
			pageSize: '999'
		}
		this.props.updateReportStatus(params)
	}
	onSelectTree = (selectedKeys, info) => {
		var categoryId = info.node.props.content.categoryId;
		this.setState({
			recordSelect: info.node.props.content,
			thiscatagoryId: categoryId,
			selectedKeys: selectedKeys
		})
		this.getReportTableData(categoryId, '', 1, 10, this.state.selectedComId)
	}
	onRightClick = (e, key, keyPath) => {
		this.setState({
			recordSelect: e.node.props.content,
			rightClickNodeTreeItem: {
				pageX: e.event.pageX,
				pageY: e.event.pageY,
			}
		})
		this.getNodeTreeRightClickMenu()
	}
	handleModalClicked = () => {
		this.setState({
			rightClickNodeTreeItem: null
		});
	}
	cancelSelectCom = () => {
		message.info("必须选择企业")
	}
	sureSelectcom = () => {
		if(this.state.selectedComId == '') {
			message.info("选择不能为空")
		} else {
			this.setState({
				selectcomvisible: false
			})
		}
		this.getTableData('', 1, 10, this.state.selectedComId);
		this.getReportTableData('', '', 1, 10, this.state.selectedComId);
	}
	onChangeCompany = (e) => {
		this.setState({
			selectedComId: e.target.value
		})
	}
	getNodeTreeRightClickMenu = () => {
		const record = this.state.recordSelect
		const {
			pageX,
			pageY
		} = { ...this.state.rightClickNodeTreeItem
		};
		const tmpStyle = {
			position: 'absolute',
			left: `${pageX - 270}px`,
			top: `${pageY - 107}px`
		};
		const menu = (
			<div style={{width: '100%',
                height: '100%',
                position: 'absolute',zIndex:11}} onClick={this.handleModalClicked}>
                <div className="box" onClick={e => e.stopPropagation()}>
                    <Menu
                    onClick={(item)=>this.handleMenuClick(item)}
                    style={tmpStyle}
                    >
                        <Menu.Item key='1'><Icon type='plus-circle-o'/>{'添加分类'}</Menu.Item>
                        {record.children===undefined?'':  <Menu.Item style={{marginTop:-10}} key='5'><Icon type='plus'/>{'添加子节点'}</Menu.Item>}
                        <Menu.Item style={{marginTop:-10}} key='2'><Icon type='edit'/>{'修改分类'}</Menu.Item>
                        <Menu.Item style={{marginTop:-10}} key='3'><Icon type='minus-circle-o'/>{'删除分类'}</Menu.Item>
                        <Menu.Item style={{marginTop:-10}} key='11'><Icon type='plus'/><a target="_blank"  onClick={() => this.clicktoadd(record)}>{'新增报表'}</a></Menu.Item>
                        <Menu.Item style={{marginTop:-10}} key='4'><Icon type='rollback'/>{'取消操作'}</Menu.Item>                        
                    </Menu>
                </div>
            </div>
		);
		return(this.state.rightClickNodeTreeItem == null) ? '' : menu;
	}	
	clicktoedit = (record) => {
		window.open(window.sessionStorage.getItem('contextPath')+"/ureport/designer?reportId=1&reportname="+record.reportname+"&reportKey="+record.reportKey+"&id="+record.id+"&tenantId="+record.tenantId+"&categoryId="+record.categoryId+"&Authorization="+window.sessionStorage.getItem("token")+"&username="+window.sessionStorage.getItem("username"))
	}
	clicktoadd = (record) => {
		window.open(window.sessionStorage.getItem('contextPath')+"/ureport/designer?categoryId="+record.categoryId+"&tenantId="+this.state.selectedComId+"&Authorization="+window.sessionStorage.getItem("token")+"&username="+window.sessionStorage.getItem("username"))
	}
	handleMenuClick = (item) => {
		const record = this.state.recordSelect
		if(record.children === undefined) {
			this.setState({
				layerStatus: 'layer2'
			});
		} else {
			this.setState({
				layerStatus: 'layer1'
			});
		}
		if(item.key === '1') {
			this.setState({
				layerStatus: 'layer2-add2'
			});
			this.showModalCreate(record)
			this.setState({
				rightClickNodeTreeItem: null
			});
		} else if(item.key === '2') {
			this.showModifyModal(record)
			this.setState({
				rightClickNodeTreeItem: null
			});
		} else if(item.key === '3') {
			this.deleteConfirm(record)
			this.setState({
				rightClickNodeTreeItem: null
			});
		} else if(item.key === '5') {
			this.setState({
				layerStatus: 'layer1-add2'
			});
			this.showModalCreate(record)
			this.setState({
				rightClickNodeTreeItem: null
			});
		} else if(item.key === '11') {} else {
			this.setState({
				rightClickNodeTreeItem: null
			});
		}
	}
	render() {
		let thisTemp = this
		const {
			classes
		} = this.props;
		var reportcolumns = [{
			title: '操作',
			key: 'action',
			width: 270,
			render: (text, record) => (
				<span>   
				    <a target="_blank" onClick={() => this.clicktoedit(record)}>编辑</a>                             
                    <Divider type="vertical" hidden={record.status=='0'?false:true}/>
                    <Popconfirm cancelText="取消" okText="确定" title="确定删除该报表?" onConfirm={() => this.deleteReportConfirm(record)}>
                        <Icon type="delete" theme="twoTone" hidden={record.status=='0'?false:true}/>
                    </Popconfirm>
                    <Divider type="vertical" />
                    <a onClick={() => this.showAllVersion(record)}>查看所有版本</a>
                    <Divider type="vertical" hidden={record.status=='0'?false:true}/>
                    <a onClick={() => this.clickToPublish(record)} hidden={record.status=='0'?false:true}>发布</a>
                </span>
			),
		},{
			title: '报表名称',
			dataIndex: 'reportname',
			key: 'reportname',
			width: 140,
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
		}, {
			title: 'key',
			dataIndex: 'reportKey',
			key: 'reportKey',
			width: 140,
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
		}, {
			title: '企业id',
			dataIndex: 'tenantId',
			key: 'tenantId',
			width: 140,
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
		}, {
			title: '发布状态',
			dataIndex: 'status',
			key: 'status',
			width: 90,
			render: status => (
				<span>{
            		<Tag color={status=='1'?'blue':'red'} key={status}>{status=='1'?'已发布':'未发布'}</Tag>            		
            		}
            	</span>
			)
		}, {
			title: '发布时间',
			dataIndex: 'releaseTime',
			key: 'releaseTime',
			width: 200,
			render: (text, record) => (
				<span>
				  {record.status == '0'?'':record.releaseTime}
				</span>
			)
		}, {
			title: '版本号',
			dataIndex: 'version',
			key: 'version',
			width: 100,
			render: version => (
				<span>{version}</span>
			)
		}]
		let comOptions = ''
		if(this.props.reportMng.companyDatas !== undefined) {
			comOptions = this.props.reportMng.companyDatas.map((item, i) => {
				return <Option value={item.id}>{item.tenantName}</Option>
			})
		}
		const CollectionCreateForm = Form.create()(
			class extends React.Component {
				constructor(props) {
					super(props);
					this.state = {
						cuSkGroupId: '',
						robotId: '',
						tenantId: ''
					};
				}
				handleChange = (value) => {
					this.setState({
						tenantId: value
					})
				}
				render() {
					const {
						visible,
						onCancel,
						onCreate,
						form
					} = this.props;
					const {
						getFieldDecorator
					} = form;
					const dateFormat = 'YYYY/MM/DD';
					return(
						<Modal maskClosable={false}
                            visible={visible}
                            title="新增报表分类"
                            cancelText="取消" okText="确定"
                            onCancel={onCancel}
                            onOk={onCreate}
                        >
                            <Form layout="vertical">                  
                                <FormItem style={{marginTop:-15}} label="报表分类名称">
                                    {getFieldDecorator('categoryName', {                             
                                        rules: [{ required: true, message: '请输入报表分类名称!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>                                
                                <FormItem style={{marginTop:-15}} label="报表分类描述">
                                    {getFieldDecorator('categoryDesc', {
                                    	rules: [{ required: false, message: '请输入分类描述!' }],
                                    })(
                                    	<Input />
                                    )}
                                </FormItem>
                            </Form>
                        </Modal>
					);
				}
			}
		);
		let changeCom = ''
		if(this.props.reportMng.companyDatas !== undefined) {
			changeCom = this.props.reportMng.companyDatas.map((item, i) => {
				return <Option value={item.id}>{item.tenantName}</Option>
			})
		}
		const CollectionModifyForm = Form.create()(
			class extends React.Component {
				constructor(props) {
					super(props);
					this.state = {
						cuSkGroupId: '',
						robotId: ''
					};
				}
				render() {
					const {
						visible,
						onCancel,
						onCreate,
						form
					} = this.props;
					const {
						getFieldDecorator
					} = form;
					const dateFormat = 'YYYY/MM/DD';
					return(
						<Modal maskClosable={false}
                            visible={visible}
                            title="修改报表分类信息"
                            cancelText="取消" okText="确定"
                            onCancel={onCancel}
                            onOk={onCreate}
                        >
                            <Form layout="vertical">      
                                <FormItem style={{marginTop:-15}} label="报表分类名称">
                                    {getFieldDecorator('categoryName', {
                                    	initialValue:  thisTemp.state.recordAction.categoryName ,
                                    	rules: [{ required: false, message: '请输入报表分类名称!' }],
                                    })(<Input />)}
                                </FormItem>
                                <FormItem style={{marginTop:-15}} label="报表分类描述">
                                    {getFieldDecorator('categoryDesc', {
                                    	initialValue:  thisTemp.state.recordAction.categoryDesc ,
                                    	rules: [{ required: false, message: '请输入别名描述!' }],
                                    })(<Input />)}
                                </FormItem>
                            </Form>
                        </Modal>
					);
				}
			}
		);
		var tenantArrs = '';
		if(this.state.companyRadio != []) {
			tenantArrs = this.state.companyRadio.map((item, i) => {
				return <Radio style={{display:'block',height:36,fontSize:16}} value={item.id}>{item.tenantName}</Radio>
			})
		}
		let treelist = '';
		if(this.props.reportMng.reportSortdetail != undefined) {
			treelist = thisTemp.props.reportMng.reportSortdetail.map((item, i) => {
					return <TreeNode icon={<Icon style={{fontSize:14}} type="file" />
				}
				content = {
					item
				}
				title = {
					item.categoryName
				}
				key = {
					'layer1-' + i
				}
				style = {
					{
						height: 45,
						fontSize: 16,
						marginLeft: -20,
						width: 200,
						overflow: 'hidden',
						textOverflow: 'ellipsis',
						whiteSpace: 'nowrap',
						display: 'inline-block',
					}
				} >
				</TreeNode>
			})
	}
	return(
		<GridContainer>
                <GridItem xs={2}>
                <Grid container spacing={0}>                  
                  <Grid style={{textAlign:'right'}} item xs={12}>
                  </Grid>
                </Grid>
               <text style={{fontSize:17,marginTop:0}}>分类列表</text>
               <Icon type='plus-circle-o' style={{fontSize:18,marginLeft:10,cursor:'pointer'}} onClick={this.showModalCreate}/>
               <DirectoryTree 
                style={{marginLeft:0.1*window.screen.width,marginTop:0.2*window.screen.height}}
                onSelect={this.onSelectTree}
                onRightClick={this.onRightClick}
                defaultSelectedKeys={this.state.selectedKeys}>
                  {treelist}
                </DirectoryTree>
                </GridItem>
                <GridItem xs={10}>
                    <Card>
                        <CardHeader color="rose" icon>
                            <Grid container spacing={0}>
                                <Grid item xs={3}>
                                    <CardIcon color="info">
                                        <Description />
                                    </CardIcon>
                                    <h4 className={classes.cardIconTitle}></h4>
                                </Grid>
                                <Grid style={{textAlign:'right',marginTop:10}} item xs={9}>                                 
                                   <Search
                                        placeholder="报表名称搜索"
                                        onSearch={value => this.getReportTableData(this.state.thiscatagoryId,value,1,10,this.state.selectedComId)}                                     
                                        style={{ width: 240,paddingRight:10 }}
                                    />                                    
                                </Grid>
                            </Grid>
                        </CardHeader>
                        <CardBody>
                           <Table key={"reportDetail"} pagination={false} columns={reportcolumns} dataSource={this.props.reportMng.getReportDetailData} scroll={{x:1180}}/>
                           <Pagination defaultCurrent={1} defaultPageSize={10} showTotal={total => `共 ${total} 条`} total={this.props.reportMng.getReportDetailTotal} style={{textAlign:'right',marginTop:25}}  onChange={(page, pageSize)=>this.getReportTableData(this.state.thiscatagoryId,'',page,10,this.state.selectedComId)}/>
                        </CardBody>
                    </Card>
                </GridItem>               
                <Modal maskClosable={false}
                            visible={this.state.selectcomvisible}
                            title="选择企业"
                            cancelText="取消" okText="确定"
                            onCancel={this.cancelSelectCom}
                            onOk={this.sureSelectcom}>
                    <RadioGroup onChange={this.onChangeCompany}>
                        {tenantArrs}  
                    </RadioGroup>
                </Modal>
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
                {this.getNodeTreeRightClickMenu()}
       </GridContainer>
	);
}
}
const mapStateToProps = (state) => {
	return {
		reportMng: state.reportMng,
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		getReportSort: (params) => {
			dispatch(getReportSort(params))
		},
		addReportSort: (params) => {
			dispatch(addReportSort(params))
		},
		deleteDataReportSort: (params) => {
			dispatch(deleteDataReportSort(params))
		},
		UpdateReportSort: (params) => {
			dispatch(UpdateReportSort(params))
		},
		addUserInfoList: (params) => {
			dispatch(addUserInfoList(params))
		},
		getReportDetail: (params) => {
			dispatch(getReportDetail(params))
		},
		updateReportStatus: (params) => {
			dispatch(updateReportStatus(params))
		},
		deleteDataReportDetail: (params) => {
			dispatch(deleteDataReportDetail(params))
		}
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(extendedTablesStyle)(reportMng));