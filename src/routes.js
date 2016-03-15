/**
 * @file    提供路由组件的定义，主要包括组件和url的映射以及添加对登录状态的检查
 */

import React from 'react';
import {IndexRoute, Route} from 'react-router';
import {isLoaded as isAuthLoaded, load as loadAuth} from 'redux/modules/auth';
import {
    App, Landing, Signin, Signup, Forgot, ForgotSuccess, PasswordReset, PasswordResetInvalid, PasswordResetSuccess, Portal, Home, Forbidden, NotFound,
    DataModel, DataModelList, DataModelForm, DataModelInvoke, Industry, IndustryList, IndustryForm,
    IdCardValidity, BankCardValidity, BankCardUsage, IndividualPortrait, EnterprisePortrait,
    PhoneNumberValidity, PhoneNumberAmount, PhoneNumberCreditLevel, PhoneNumberExpense, PhoneNumberArrearage, PhoneNumberDowntime,
    IndustryCommerceIndividual, IndustryCommerceEnterprise, DishonestDebtor, CourtEnforcement,
    UserList, User, UserProfile, UserPassword, RoleList, Role
} from 'containers';

export default (store) => {

    /**
     * 检查登录状态
     *
     * @param nextState {Object} 下一个状态
     * @param replace {Function} react router提供跳转路由的方法
     * @param cb {Function} 回调函数
     */
    const requireLogin = (nextState, replace, cb) => {

        /**
         * 检查鉴权，当没有登录时跳转到相应页面
         */
        const checkAuth = () => {
            /**
            const { auth: { user }} = store.getState();
            if (!user) {
                // 没有登录，跳转到主页
                replace('/signin');
            }*/
            cb();
        };

        if (!isAuthLoaded(store.getState())) {
            store.dispatch(loadAuth()).then(checkAuth);
        } else {
            checkAuth();
        }
    };

    return (
        <Route path="/" component={App}>
            { /* 主页路由 */ }
            <IndexRoute component={Landing}/>

            { /* 需要登录的路由 */ }
            <Route onEnter={requireLogin}>
                <Route path="portal" component={Portal}>

                    { /* 首页 */ }
                    <Route path="home" component={Home} />

                    { /* 模型管理 */ }
                    <Route path="datamodels" component={DataModelList} />
                    <Route path="datamodels/new" component={DataModelForm} />
                    <Route path="datamodels/:id" component={DataModel} />
                    <Route path="datamodels/:id/edit" component={DataModelForm} />
                    <Route path="datamodels/:id/invoke" component={DataModelInvoke} />

                    { /* 行业管理 */ }
                    <Route path="industries" component={IndustryList} />
                    <Route path="industries/new" component={IndustryForm} />
                    <Route path="industries/:id" component={Industry} />
                    <Route path="industries/:id/edit" component={IndustryForm} />

                    { /* 银联数据 */ }
                    <Route path="unionpay/idcard/validity" component={IdCardValidity} />
                    <Route path="unionpay/bankcard/validity" component={BankCardValidity} />
                    <Route path="unionpay/bankcard/usage" component={BankCardUsage} />
                    <Route path="unionpay/individual/portrait" component={IndividualPortrait} />
                    <Route path="unionpay/enterprise/portrait" component={EnterprisePortrait} />

                    { /* 电信运营商数据 */ }
                    <Route path="telecom/phonenumber/validity" component={PhoneNumberValidity} />
                    <Route path="telecom/phonenumber/amount" component={PhoneNumberAmount} />
                    <Route path="telecom/phonenumber/creditlevel" component={PhoneNumberCreditLevel} />
                    <Route path="telecom/phonenumber/expense" component={PhoneNumberExpense} />
                    <Route path="telecom/phonenumber/arrearage" component={PhoneNumberArrearage} />
                    <Route path="telecom/phonenumber/downtime" component={PhoneNumberDowntime} />

                    { /* 工商数据 */ }
                    <Route path="industrycommerce/individual" component={IndustryCommerceIndividual} />
                    <Route path="industrycommerce/enterprise" component={IndustryCommerceEnterprise} />

                    { /* 法院黑名单数据 */ }
                    <Route path="courtblacklist/dishonestdebtor" component={DishonestDebtor} />
                    <Route path="courtblacklist/enforcement" component={CourtEnforcement} />

                    { /* 用户管理 */ }
                    <Route path="users" component={UserList} />
                    <Route path="users/profile" component={UserProfile} />
                    <Route path="users/password" component={UserPassword} />
                    <Route path="users/:id" component={User} />

                    { /* 角色管理 */ }
                    <Route path="roles" component={RoleList} />
                    <Route path="roles/:id" component={Role} />

                </Route>
            </Route>

            { /* 登录与注册 */ }
            <Route path="signin" component={Signin}/>
            <Route path="signup" component={Signup}/>

            { /* 找回密码与重置密码 */ }
            <Route path="forgot" component={Forgot}/>
            <Route path="forgot/success" component={ForgotSuccess}/>
            <Route path="reset/invalid" component={PasswordResetInvalid}/>
            <Route path="reset/success" component={PasswordResetSuccess}/>
            <Route path="reset/:token" component={PasswordReset}/>

            { /* 未授权 */ }
            <Route path="/forbidden" component={Forbidden} />

            { /* 都不匹配时的默认路由 */ }
            <Route path="*" component={NotFound} status={404} />
        </Route>
    );
};
