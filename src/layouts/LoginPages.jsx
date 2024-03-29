import React, {Component} from 'react';
import {appReduxChange, appReduxTest} from "actions/app";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import PagesHeader from "components/Header/PagesHeader.jsx";
import Footer from "components/Footer/Footer.jsx";
import pagesRoutes from "routes/loginPages.jsx";
import pagesStyle from "assets/jss/material-dashboard-pro-react/layouts/pagesStyle.jsx";
import bgImage from "../assets/img/login.jpg";
class LoginPages extends Component {    
    componentWillMount(){
        const timer1=window.setTimeout(() => {
            if(document.getElementById("layui-layer2")===null){      
            }else{
              document.getElementById("layui-layer2").style.display='none'
              window.clearTimeout(timer1);
            }
          },500);
    }
    checkMessage = (message) =>{
         if(message==='show'){
                document.getElementById("chatDiv").setAttribute('style', 'width: 602px;height: 714px;margin-top: -714px;margin-left: 830px;');
                document.getElementById("chatIframe").setAttribute('style', 'width: 602px;height: 714px;;z-index: 9999;position: relative;border: 0px;');
            }
    }
    componentDidMount(){   
    	
    }
    render() {
        const { classes, ...rest } = this.props;
        return (
            <div>
                <PagesHeader {...rest} />
                <div className={classes.wrapper} ref="wrapper">
                    <div className={classes.fullPage}>
                        <Switch>
                            {pagesRoutes.map((prop, key) => {
                                if (prop.collapse) {
                                    return null;
                                }
                                if (prop.redirect) {
                                    return (
                                        <Redirect from={prop.path} to={prop.pathTo} key={key} />
                                    );
                                }
                                return (
                                    <Route
                                        path={prop.path}
                                        component={prop.component}
                                        key={key}
                                    />
                                );
                            })}
                        </Switch>
                        <Footer white />
                        <div
                            className={classes.fullPageBackground}
                            style={{ backgroundImage: "url(" + bgImage + ")" }}
                        />
                    </div>
                </div>
                <div id='chatDiv' style={{width:184,height:52,marginTop:-53,marginLeft:document.body.clientWidth-185}}>
                {/* <div id='chatDiv' style={{width:602,height:522,marginTop:-523,marginLeft:document.body.clientWidth-603}}> */}
                {/* <iframe id='chatIframe' style={{width:184,height:52,zIndex:9999,position:'relative',border:0}} src="http://localhost:3001/user?tenantId=502883989623668736&userId=12345&userName=uer01"> */}
                {/* <iframe id='chatIframe' style={{width:602,height:522,zIndex:9999,position:'relative',border:0,background:'#fff'}} src="http://localhost:3001/user?tenantId=502883989623668736&userId=12345&userName=uer01"> */}
                {/* <iframe style={{width:document.body.clientWidth*0.49,height:document.body.clientHeight*0.49,zIndex:9999,position:'relative',border:0,background:'#fff',right:-document.body.clientHeight,top:-document.body.clientHeight}} src="http://localhost:3001/user"> */}
                    {/* <p>浏览器不支持iframe</p> */}
                {/* </iframe> */}
                </div>              
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return{
        app: state.app
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        appReduxTest: () => {
            dispatch(appReduxTest())
        },
        appReduxChange: () => {
            dispatch(appReduxChange())
        }
    }
}
LoginPages.propTypes = {
    classes: PropTypes.object.isRequired
};
export default connect(mapStateToProps,mapDispatchToProps)(withStyles(pagesStyle)(LoginPages));
