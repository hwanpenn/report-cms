import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Person from "@material-ui/icons/Person";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import loginPageStyle from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.jsx";
import Keyboard from "@material-ui/icons/Keyboard";
// import axios from 'axios';
import axios from '../../Utils/axios';
import { message } from 'antd';
import VCode from '../../variables/VCode'

import 'jsencrypt';



let  publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCEzFQe2lrG++hcZDkbrZstjnMKjUc8IBk07mRC0fc6DyTlbwwnB9MMkhvkJAUtZo02kARHeH5HWoxPpdWuHmF7lYeEma9m6z4uyFc4e0hVpXI1qdjToylOpPgI66Yge0mcvyd/FyWCFl7LrzrALPQ9qIqvUKmp7CwzISoa6IToSwIDAQAB'

message.config({
    duration: 1,
});

let documentObj =''
class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        // we use this to make the card to appear after the page has been rendered
        this.state = {
            cardAnimaton: "cardHidden",
            username:'1'
        };
    }
    componentWillMount(){
        // documentObj=document
         document.addEventListener("keydown",this.handleEnterKey);
        const userSession = window.sessionStorage.getItem('token');
        if(userSession===null||userSession===undefined||userSession===''){

        }else {
            this.props.history.push("/sym/home");
        }
    }
    handleEnterKey = (e) => {
        if(e.keyCode === 13){
            this.handleClick()
        }
    }
    componentWillUmount(){
        // document.removeEventListener("keydown",this.handleEenterKey);
    }
    removeEvt(){
        document.removeEventListener("keydown",this.handleEenterKey);
    }
    componentDidMount() {
        // we add a hidden class to the card and after 700 ms we delete it and the transition appears
        setTimeout(
            function() {
                this.setState({ cardAnimaton: "" });
            }.bind(this),
            500
        );
    }
    handleClick = (event) =>{
        const thisTemp = this;
        const username = window.sessionStorage.getItem('username');
        const password = window.sessionStorage.getItem('password');
        const checked = window.sessionStorage.getItem('checked');
        const check = window.sessionStorage.getItem('check');
        const {JSEncrypt} = require('jsencrypt')
        // const JSEncrypt=JSEncryptExports.JSEncrypt;
        let encrypt = new JSEncrypt();
        encrypt.setPublicKey(publicKey);
        // encrypt.setPublicKey('-----BEGIN PUBLIC KEY-----'+'\n' + publicKey + '\n'+'-----END PUBLIC KEY-----');
        let encrypted = encrypt.encrypt(password);
        if(checked !== check ){
            message.info("验证码有误请重新输入");
        }else{
            // this.props.history.push("/cms/home");
            // axios.defaults.headers.common['Authorization'] = '';
            axios.post('/sreport/login',
                {
                    username: username,
                    password: encrypted,
                }
           ).then( (response) => {
                if(response.data.status==='success'){
                    // const uuid = thisTemp.guid();
                    // 全局修改axios默认配置
                    axios.defaults.headers.common['Authorization'] = response.data.Authorization;
                    // axios.defaults.headers.common['uuid'] = uuid;
                    // window.sessionStorage.setItem('uuid',uuid)
                    //存储
                    window.sessionStorage.setItem('contextPath',response.data.contextPath)
                    window.sessionStorage.setItem('userId',response.data.userId)
                    window.sessionStorage.setItem('username',username)
                    window.sessionStorage.setItem('token',response.data.Authorization)
                    window.sessionStorage.setItem('role',response.data.role)
                    if(response.data.tenantId){
                    	window.sessionStorage.setItem('tenantId',response.data.tenantId)
                    }
                    if(response.data.role == 'ROLE_USER'){
                    	window.sessionStorage.setItem('identify','用户')
                    	window.sessionStorage.setItem('comselecthide','none') 
                    	window.localStorage.setItem('tenantArr',response.data.tenantId);                    	
                    }else if(response.data.role == 'ROLE_SUPERADMIN'){
                    	window.sessionStorage.setItem('identify','超级管理员')
                    	window.sessionStorage.setItem('comselecthide','block')
                    	window.sessionStorage.setItem('initialvalue','企业管理员')
                    }else if(response.data.role == 'ROLE_ADMIN'){
                    	window.sessionStorage.setItem('identify','企业管理员')
                    	window.sessionStorage.setItem('comselecthide','none')
                    	window.sessionStorage.setItem('initialvalue','用户')
                    	window.sessionStorage.setItem('tenantId',response.data.tenantId)
                    }
                    window.sessionStorage.setItem('realName',response.data.name)
                    window.sessionStorage.setItem('userId',response.data.userId)
                    window.sessionStorage.setItem('userName',response.data.name)
                    window.sessionStorage.setItem('caption',response.data.caption)                 
                    window.sessionStorage.setItem('customerFlag',response.data.customerFlag)
                    window.sessionStorage.setItem('password','')
                    thisTemp.props.history.push("/sym/home");
                }else {
                    message.info(response.data.msg);
                }

            })
            //post遭到拒绝时执行
                .catch(function (error) {
                    console.log(error);
                });
        }

    }
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.content}>
                <div className={classes.container}>
                    <GridContainer justify="center">
                        {/*GridContainer:网格容器*/}
                        {/*响应式*/}
                        <GridItem xs={12} sm={6} md={4}>
                            <form>
                                <Card login className={classes[this.state.cardAnimaton]}>
                                    <CardBody>
                                        <CustomInput
                                            labelText="用户名"
                                            id="username"
                                            type="username"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            // valueTemp={(event)=>this.handleClick(event)}
                                            inputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <Person className={classes.inputAdornmentIcon} />
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                        <CustomInput
                                            labelText="密码"
                                            id="password"
                                            type="password"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            // onChange={this.handleChange('password')}
                                            inputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        {/*<LockOutline*/}
                                                        <Keyboard className={classes.inputAdornmentIcon} />
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                        <CustomInput
                                            labelText="验证码"
                                            id="checked"
                                            type="checked"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        {/*<LockOutline*/}
                                                        <VCode/>
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                    </CardBody>
                                    <CardFooter className={classes.justifyContentCenter}>
                                        <Button onClick={() =>{this.handleClick()}}  simple size="lg" style={{fontSize:18,background:"#0976b4"}} block>
                                            登 录
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </form>
                        </GridItem>
                    </GridContainer>
                </div>
            </div>
        );
    }
}

LoginPage.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(loginPageStyle)(LoginPage);
